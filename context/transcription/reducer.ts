import { TranscriptionState, TranscriptionRecord, AudioSettings } from './types';

// Storage key for AsyncStorage
export const STORAGE_KEY = '@transcriptions';

// API Configuration
export const GROQ_API_KEY = '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';
export const WHISPER_MODEL = 'whisper-large-v3-turbo';

// API configuration object
export const groqConfig = {
  baseURL: 'https://api.groq.com/openai/v1/audio/transcriptions',
  headers: {
    'Authorization': `Bearer ${GROQ_API_KEY}`,
    'Content-Type': 'multipart/form-data',
    'Accept': 'application/json'
  },
  model: WHISPER_MODEL,  // Add model to config
  language: 'en'  // Default to English, can be changed via setLanguage
};

// Initial state
export const initialState: TranscriptionState = {
  isRecording: false,
  currentText: '',
  previewText: '',
  history: [],
  error: null,
  isProcessing: false,
  isFloatingButtonVisible: true,
  audioSettings: {
    autoDeleteAfterPlayback: false,
    confirmBeforeDelete: true,
    usePermanentStorage: true
  }
};

// Action Types
export type Action = 
  | { type: 'SET_RECORDING'; payload: boolean }
  | { type: 'SET_CURRENT_TEXT'; payload: string }
  | { type: 'SET_PREVIEW_TEXT'; payload: string }
  | { type: 'ADD_TO_HISTORY'; payload: TranscriptionRecord }
  | { type: 'SET_HISTORY'; payload: TranscriptionRecord[] }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_PROCESSING'; payload: boolean }
  | { type: 'SET_FLOATING_BUTTON_VISIBLE'; payload: boolean }
  | { type: 'UPDATE_TRANSCRIPTION'; payload: { id: string; text: string; isEdited: boolean } }
  | { type: 'UPDATE_SPELL_CHECK'; payload: { id: string; correctedText: string } }
  | { type: 'UPDATE_AUDIO_SETTINGS'; payload: Partial<AudioSettings> }
  | { type: 'CLEANUP_AUDIO_FILES' };

// Reducer function
export const transcriptionReducer = (state: TranscriptionState, action: Action): TranscriptionState => {
  switch (action.type) {
    case 'SET_RECORDING':
      return { ...state, isRecording: action.payload };
      
    case 'SET_CURRENT_TEXT':
      return { ...state, currentText: action.payload };
      
    case 'SET_PREVIEW_TEXT':
      return { ...state, previewText: action.payload };
      
    case 'ADD_TO_HISTORY':
      return { ...state, history: [action.payload, ...state.history] };
      
    case 'SET_HISTORY':
      return { ...state, history: action.payload };
      
    case 'SET_ERROR':
      return { ...state, error: action.payload };
      
    case 'SET_PROCESSING':
      return { ...state, isProcessing: action.payload };
      
    case 'SET_FLOATING_BUTTON_VISIBLE':
      return { ...state, isFloatingButtonVisible: action.payload };
      
    case 'UPDATE_TRANSCRIPTION':
      return {
        ...state,
        history: state.history.map(record =>
          record.id === action.payload.id
            ? { 
                ...record, 
                editedText: action.payload.text, 
                isEdited: action.payload.isEdited 
              }
            : record
        )
      };

    case 'UPDATE_SPELL_CHECK':
      return {
        ...state,
        history: state.history.map(record =>
          record.id === action.payload.id
            ? { 
                ...record, 
                correctedText: action.payload.correctedText,
                isSpellChecked: true
              }
            : record
        )
      };

    case 'UPDATE_AUDIO_SETTINGS':
      return {
        ...state,
        audioSettings: {
          ...state.audioSettings,
          ...action.payload
        }
      };

    case 'CLEANUP_AUDIO_FILES':
      return state; // State doesn't change, cleanup happens in provider
      
    default:
      return state;
  }
};

// Helper functions for working with history
export const filterHistory = (history: TranscriptionRecord[], query: string): TranscriptionRecord[] => {
  const lowercaseQuery = query.toLowerCase();
  return history.filter(record => 
    record.text.toLowerCase().includes(lowercaseQuery) ||
    (record.editedText?.toLowerCase().includes(lowercaseQuery))
  );
};

export const updateHistoryItem = (
  history: TranscriptionRecord[],
  id: string,
  updates: Partial<TranscriptionRecord>
): TranscriptionRecord[] => {
  return history.map(record =>
    record.id === id
      ? { ...record, ...updates }
      : record
  );
};
