import { useCallback } from 'react';
import { AudioService } from '../services/audioService';
import { StorageService } from '../services/storageService';
import { TranscriptionService } from '../services/transcriptionService';
import { 
  AudioSettings,
  TranscriptionRecord, 
  TranscriptionResponse 
} from '../types';

interface UseTranscriptionActionsConfig {
  audioService: AudioService;
  storageService: StorageService;
  transcriptionService: TranscriptionService;
  dispatch: (action: any) => void;
  state: {
    history: TranscriptionRecord[];
    isFloatingButtonVisible: boolean;
    audioSettings: AudioSettings;
  };
  config: {
    model: string;
    language: string;
  };
}

export const useTranscriptionActions = (config: UseTranscriptionActionsConfig) => {
  const { 
    audioService, 
    storageService, 
    transcriptionService,
    dispatch,
    state,
    config: apiConfig 
  } = config;

  const handleTranscriptionResponse = useCallback(async (
    transcription: TranscriptionResponse,
    audioUri: string
  ) => {
    if (!transcription || !transcription.text) {
      throw new Error('No transcription text received from API');
    }

    const finalAudioUri = await storageService.moveToStorage(audioUri);

    const newRecord: TranscriptionRecord = {
      id: Date.now().toString(),
      text: transcription.text,
      audioUri: finalAudioUri,
      timestamp: Date.now(),
      duration: transcription.duration || 0,
      metadata: {
        model: apiConfig.model,
        language: apiConfig.language,
        segments: transcription.segments || []
      }
    };

    dispatch({ type: 'ADD_TO_HISTORY', payload: newRecord });
    dispatch({ type: 'SET_CURRENT_TEXT', payload: transcription.text });

    const updatedHistory = [newRecord, ...state.history];
    await storageService.saveHistory(updatedHistory);

    if (state.isFloatingButtonVisible) {
      await transcriptionService.sendToApp(transcription.text, undefined, true);
    }
  }, [state.history, state.isFloatingButtonVisible, apiConfig]);

  const startRecording = useCallback(async () => {
    dispatch({ type: 'SET_PROCESSING', payload: true });
    await audioService.startRecording();
    dispatch({ type: 'SET_RECORDING', payload: true });
  }, []);

  const stopRecording = useCallback(async () => {
    dispatch({ type: 'SET_PROCESSING', payload: true });
    const uri = await audioService.stopRecording();
    
    if (uri) {
      try {
        const response = await transcriptionService.processRecording(uri);
        await handleTranscriptionResponse(response, uri);
      } catch (err) {
        dispatch({ type: 'SET_ERROR', payload: err instanceof Error ? err.message : 'Processing failed' });
      }
    }
    
    dispatch({ type: 'SET_RECORDING', payload: false });
    dispatch({ type: 'SET_PROCESSING', payload: false });
  }, [handleTranscriptionResponse]);

  const deleteRecord = useCallback(async (id: string) => {
    try {
      const record = state.history.find(r => r.id === id);
      if (!record) return;

      await storageService.deleteRecord(record);
      const updatedHistory = state.history.filter(r => r.id !== id);
      await storageService.saveHistory(updatedHistory);
      dispatch({ type: 'SET_HISTORY', payload: updatedHistory });
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err instanceof Error ? err.message : 'Delete failed' });
    }
  }, [state.history]);

  const editTranscription = useCallback(async (id: string, newText: string) => {
    try {
      const updatedHistory = state.history.map(record =>
        record.id === id
          ? { ...record, editedText: newText, isEdited: true }
          : record
      );

      await storageService.saveHistory(updatedHistory);
      dispatch({ type: 'SET_HISTORY', payload: updatedHistory });
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err instanceof Error ? err.message : 'Edit failed' });
    }
  }, [state.history]);

  const shareTranscription = useCallback(async (id: string) => {
    try {
      const record = state.history.find(r => r.id === id);
      if (!record) throw new Error('Record not found');

      const textToShare = record.editedText || record.text;
      await transcriptionService.shareTranscription(textToShare);
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err instanceof Error ? err.message : 'Share failed' });
    }
  }, [state.history]);

  const updateAudioSettings = useCallback(async (settings: Partial<AudioSettings>) => {
    try {
      await storageService.saveAudioSettings(settings);
      dispatch({ type: 'UPDATE_AUDIO_SETTINGS', payload: settings });
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err instanceof Error ? err.message : 'Settings update failed' });
    }
  }, []);

  const cleanupAudioFiles = useCallback(async () => {
    try {
      await storageService.cleanupAudioFiles();
      dispatch({ type: 'CLEANUP_AUDIO_FILES' });
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err instanceof Error ? err.message : 'Cleanup failed' });
    }
  }, []);

  return {
    startRecording,
    stopRecording,
    deleteRecord,
    editTranscription,
    shareTranscription,
    updateAudioSettings,
    cleanupAudioFiles
  };
};
