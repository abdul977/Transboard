import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import { Alert } from 'react-native';
import { TranscriptionRecord, AudioSettings } from '../types';

const STORAGE_KEY = '@transcriptions';
const AUDIO_SETTINGS_KEY = '@audio_settings';

export class StorageService {
  private audioSettings: AudioSettings;

  constructor(audioSettings: AudioSettings) {
    this.audioSettings = audioSettings;
  }

  async loadHistory(): Promise<TranscriptionRecord[]> {
    try {
      const storedHistory = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedHistory) {
        return JSON.parse(storedHistory);
      }
      return [];
    } catch (error) {
      console.error('Error loading history:', error);
      throw new Error('Failed to load history');
    }
  }

  async saveHistory(history: TranscriptionRecord[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (error) {
      console.error('Error saving history:', error);
      throw new Error('Failed to save history');
    }
  }

  async loadAudioSettings(): Promise<AudioSettings | null> {
    try {
      const stored = await AsyncStorage.getItem(AUDIO_SETTINGS_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.warn('Failed to load audio settings:', error);
      return null;
    }
  }

  async saveAudioSettings(settings: Partial<AudioSettings>): Promise<void> {
    try {
      const newSettings = { ...this.audioSettings, ...settings };
      await AsyncStorage.setItem(AUDIO_SETTINGS_KEY, JSON.stringify(newSettings));
      this.audioSettings = newSettings;
    } catch (error) {
      console.error('Error saving audio settings:', error);
      throw new Error('Failed to save audio settings');
    }
  }

  async getPermanentStoragePath(): Promise<string> {
    const directory = `${FileSystem.documentDirectory}audio/`;
    const dirInfo = await FileSystem.getInfoAsync(directory);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(directory, { intermediates: true });
    }
    return directory;
  }

  async moveToStorage(tempUri: string): Promise<string> {
    if (this.audioSettings.usePermanentStorage) {
      const directory = await this.getPermanentStoragePath();
      const filename = `recording-${Date.now()}.m4a`;
      const newUri = `${directory}${filename}`;
      await FileSystem.moveAsync({
        from: tempUri,
        to: newUri
      });
      return newUri;
    }
    return tempUri;
  }

  async deleteRecord(record: TranscriptionRecord): Promise<void> {
    if (this.audioSettings.confirmBeforeDelete) {
      return new Promise((resolve, reject) => {
        Alert.alert(
          'Delete Recording',
          'Are you sure you want to delete this recording?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
              onPress: () => resolve()
            },
            {
              text: 'Delete',
              style: 'destructive',
              onPress: async () => {
                try {
                  await this.performDeletion(record);
                  resolve();
                } catch (error) {
                  reject(error);
                }
              }
            }
          ]
        );
      });
    } else {
      await this.performDeletion(record);
    }
  }

  private async performDeletion(record: TranscriptionRecord): Promise<void> {
    if (record.audioUri) {
      try {
        await FileSystem.deleteAsync(record.audioUri);
      } catch (error) {
        console.warn('Failed to delete audio file:', error);
      }
    }
  }

  async cleanupAudioFiles(): Promise<void> {
    try {
      const directory = await this.getPermanentStoragePath();
      const files = await FileSystem.readDirectoryAsync(directory);
      
      if (this.audioSettings.confirmBeforeDelete) {
        return new Promise((resolve, reject) => {
          Alert.alert(
            'Delete All Audio Files',
            `Are you sure you want to delete ${files.length} audio files?`,
            [
              {
                text: 'Cancel',
                style: 'cancel',
                onPress: () => resolve()
              },
              {
                text: 'Delete All',
                style: 'destructive',
                onPress: async () => {
                  try {
                    await this.deleteAllFiles(directory, files);
                    resolve();
                  } catch (error) {
                    reject(error);
                  }
                }
              }
            ]
          );
        });
      } else {
        await this.deleteAllFiles(directory, files);
      }
    } catch (error) {
      console.error('Cleanup audio files error:', error);
      throw new Error('Failed to cleanup audio files');
    }
  }

  private async deleteAllFiles(directory: string, files: string[]): Promise<void> {
    for (const file of files) {
      await FileSystem.deleteAsync(`${directory}${file}`).catch(console.warn);
    }
  }
}
