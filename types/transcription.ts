export interface TranscriptionSegment {
  id: number;
  seek: number;
  start: number;
  end: number;
  text: string;
  tokens: number[];
  temperature: number;
  avg_logprob: number;
  compression_ratio: number;
  no_speech_prob: number;
}

export interface TranscriptionMetadata {
  model: string;
  language: string;
  segments: TranscriptionSegment[];
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

export interface GroqHealthCheckResponse {
  status: string;
  version: string;
  timestamp: string;
}

export interface TranscriptionState {
  isRecording: boolean;
  currentText: string;
  previewText: string;
  history: TranscriptionRecord[];
  error: string | null;
  isProcessing: boolean;
  isFloatingButtonVisible: boolean;
}

export interface TranscriptionContextType {
  state: TranscriptionState;
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<void>;
  copyToClipboard: (text: string) => Promise<void>;
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
  spellCheckTranscription: (id: string) => Promise<void>;
}
