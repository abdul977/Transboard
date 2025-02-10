import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@transcriptions';

export interface Transcription {
  id: string;
  text: string;
  timestamp: number;
}

export const initDatabase = async (): Promise<void> => {
  // Initialize by ensuring an empty array exists
  const existing = await AsyncStorage.getItem(STORAGE_KEY);
  if (!existing) {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  }
};

export const saveTranscription = async (text: string): Promise<Transcription> => {
  const newTranscription: Transcription = {
    id: Date.now().toString(),
    text,
    timestamp: Date.now()
  };
  
  const existing = await AsyncStorage.getItem(STORAGE_KEY);
  const transcriptions = existing ? JSON.parse(existing) : [];
  transcriptions.push(newTranscription);
  
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(transcriptions));
  return newTranscription;
};

export const getTranscriptions = async (): Promise<Transcription[]> => {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const deleteTranscription = async (id: string): Promise<void> => {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  const transcriptions = data ? JSON.parse(data) : [];
  const filtered = transcriptions.filter((t: Transcription) => t.id !== id);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};
