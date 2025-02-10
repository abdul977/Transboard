import React, { createContext, useReducer, useContext } from 'react';
import { Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { TranscriptionContextType, TranscriptionState, AudioSettings } from '../types';
import { initialState, transcriptionReducer, WHISPER_MODEL, groqConfig } from '../reducer';
import { AudioService } from '../services/audioService';
import { StorageService } from '../services/storageService';
import { TranscriptionService } from '../services/transcriptionService';
import { useTranscriptionActions } from '../hooks/useTranscriptionActions';

const TranscriptionContext = createContext<TranscriptionContextType | undefined>(undefined);

let currentLanguage = 'en';

export const TranscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(transcriptionReducer, initialState);

  // Initialize services
  const audioService = React.useMemo(() => new AudioService({
    onUpdatePreviewText: (text) => dispatch({ type: 'SET_PREVIEW_TEXT', payload: text }),
    onError: (error) => dispatch({ type: 'SET_ERROR', payload: error }),
    audioSettings: state.audioSettings
  }), [state.audioSettings]);

  const storageService = React.useMemo(() => new StorageService(
    state.audioSettings
  ), [state.audioSettings]);

  const transcriptionService = React.useMemo(() => new TranscriptionService({
    baseURL: groqConfig.baseURL,
    headers: groqConfig.headers,
    model: WHISPER_MODEL,
    language: currentLanguage
  }), []);

  // Initialize actions
  const actions = useTranscriptionActions({
    audioService,
    storageService,
    transcriptionService,
    dispatch,
    state,
    config: {
      model: WHISPER_MODEL,
      language: currentLanguage
    }
  });

  // Load initial data
  React.useEffect(() => {
    const loadInitialData = async () => {
      try {
        const history = await storageService.loadHistory();
        dispatch({ type: 'SET_HISTORY', payload: history });

        const settings = await storageService.loadAudioSettings();
        if (settings) {
          dispatch({ type: 'UPDATE_AUDIO_SETTINGS', payload: settings });
        }
      } catch (error) {
        console.error('Error loading initial data:', error);
      }
    };

    loadInitialData();

    // Cleanup on unmount
    return () => {
      audioService.cleanup();
    };
  }, []);

  // Additional utility functions
  const setLanguage = (language: string) => {
    currentLanguage = language;
  };

  const setModel = (model: string) => {
    console.log('Model setting is handled through WHISPER_MODEL constant');
  };

  const searchHistory = (query: string) => {
    return transcriptionService.filterHistory(state.history, query);
  };

  const toggleFloatingButton = (visible: boolean) => {
    dispatch({ type: 'SET_FLOATING_BUTTON_VISIBLE', payload: visible });
  };

  const playRecord = async (audioUri: string) => {
    await audioService.playRecord(audioUri);
  };

  const clearAllTranscriptions = async () => {
    try {
      await storageService.saveHistory([]);
      dispatch({ type: 'SET_HISTORY', payload: [] });
      await actions.cleanupAudioFiles();
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to clear transcriptions' });
    }
  };

  const spellCheckTranscription = async (id: string) => {
    try {
      const record = state.history.find(r => r.id === id);
      if (!record) {
        throw new Error('Transcription not found');
      }

      dispatch({ type: 'SET_PROCESSING', payload: true });
      
      const textToCheck = record.editedText || record.text;
      const correctedText = await transcriptionService.spellCheckText(textToCheck);
      
      dispatch({
        type: 'UPDATE_SPELL_CHECK',
        payload: { id, correctedText }
      });

      // Save to storage
      const updatedHistory = state.history.map(r =>
        r.id === id
          ? { ...r, correctedText, isSpellChecked: true }
          : r
      );
      await storageService.saveHistory(updatedHistory);

    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to spell check transcription' });
    } finally {
      dispatch({ type: 'SET_PROCESSING', payload: false });
    }
  };

  const copySelectedText = async (text: string) => {
    try {
      await Clipboard.setStringAsync(text);
      Alert.alert('Success', 'Selected text copied to clipboard');
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to copy selected text' });
    }
  };

  const value: TranscriptionContextType = {
    state,
    startRecording: actions.startRecording,
    stopRecording: actions.stopRecording,
    deleteRecord: actions.deleteRecord,
    editTranscription: actions.editTranscription,
    shareTranscription: actions.shareTranscription,
    updateAudioSettings: actions.updateAudioSettings,
    cleanupAudioFiles: actions.cleanupAudioFiles,
    searchHistory,
    toggleFloatingButton,
    setLanguage,
    setModel,
    copyToClipboard: transcriptionService.copyToClipboard,
    copySelectedText,
    sendToApp: transcriptionService.sendToApp,
    playRecord,
    clearAllTranscriptions,
    spellCheckTranscription
  };

  return (
    <TranscriptionContext.Provider value={value}>
      {children}
    </TranscriptionContext.Provider>
  );
};

export const useTranscription = () => {
  const context = useContext(TranscriptionContext);
  if (context === undefined) {
    throw new Error('useTranscription must be used within a TranscriptionProvider');
  }
  return context;
};
