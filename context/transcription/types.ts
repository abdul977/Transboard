import { TranscriptionSegment, TranscriptionMetadata } from '../../types/transcription';

export interface AudioSettings {
  autoDeleteAfterPlayback: boolean;
  confirmBeforeDelete: boolean;
  usePermanentStorage: boolean;
}

export interface TranscriptionState {
  isRecording: boolean;
  currentText: string;
  previewText: string;
  history: TranscriptionRecord[];
  error: string | null;
  isProcessing: boolean;
  isFloatingButtonVisible: boolean;
  audioSettings: AudioSettings;
}

export interface TranscriptionRecord {
  id: string;
  text: string;
  audioUri: string;
  timestamp: number;
  duration: number;
  metadata: TranscriptionMetadata;
  editedText?: string;
  isEdited?: boolean;
  correctedText?: string;
  isSpellChecked?: boolean;
}

export interface TranscriptionResponse {
  text: string;
  language?: string;
  duration?: number;
  segments?: TranscriptionSegment[];
}

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
  | { type: 'CLEANUP_AUDIO_FILES'; payload: void };

export interface TranscriptionContextType {
  state: TranscriptionState;
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<void>;
  copyToClipboard: (text: string) => Promise<void>;
  copySelectedText: (text: string) => Promise<void>;
  sendToApp: (text: string, appPackage?: string) => Promise<void>;
  searchHistory: (query: string) => TranscriptionRecord[];
  deleteRecord: (id: string) => Promise<void>;
  playRecord: (audioUri: string) => Promise<void>;
  clearAllTranscriptions: () => Promise<void>;
  editTranscription: (id: string, newText: string) => Promise<void>;
  shareTranscription: (id: string) => Promise<void>;
  toggleFloatingButton: (visible: boolean) => void;
  setLanguage: (language: string) => void;
  setModel: (model: string) => void;
  updateAudioSettings: (settings: Partial<AudioSettings>) => Promise<void>;
  cleanupAudioFiles: () => Promise<void>;
  spellCheckTranscription: (id: string) => Promise<void>;
}
