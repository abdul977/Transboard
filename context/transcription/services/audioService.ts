import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { Alert } from 'react-native';
import { AudioSettings } from '../types';

interface AudioServiceConfig {
  onUpdatePreviewText?: (text: string) => void;
  onError?: (error: string) => void;
  audioSettings: AudioSettings;
}

export class AudioService {
  private recording: Audio.Recording | null = null;
  private previewInterval: NodeJS.Timeout | null = null;
  private config: AudioServiceConfig;

  constructor(config: AudioServiceConfig) {
    this.config = config;
  }

  async startRecording(): Promise<void> {
    try {
      const permissionResponse = await Audio.requestPermissionsAsync();
      if (!permissionResponse.granted) {
        throw new Error('Audio recording permission not granted');
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      
      this.recording = recording;
      this.config.onUpdatePreviewText?.('Tap again to stop recording');

      this.startPreviewUpdates(recording);

    } catch (err) {
      console.error('Error starting recording:', err);
      this.config.onError?.(err instanceof Error ? err.message : 'Failed to start recording');
    }
  }

  private startPreviewUpdates(recording: Audio.Recording): void {
    this.previewInterval = setInterval(async () => {
      try {
        const status = await recording.getStatusAsync();
        if (status.isDoneRecording) return;
        
        const durationMs = status.durationMillis || 0;
        const seconds = Math.floor(durationMs / 1000);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        
        this.config.onUpdatePreviewText?.(
          `Recording: ${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
        );
      } catch (error) {
        console.warn('Preview update error:', error);
      }
    }, 500);
  }

  async stopRecording(): Promise<string | null> {
    if (!this.recording) return null;

    try {
      if (this.previewInterval) {
        clearInterval(this.previewInterval);
      }

      await this.recording.stopAndUnloadAsync();
      const uri = this.recording.getURI();
      this.recording = null;
      
      if (!uri) throw new Error('No recording URI available');
      return uri;

    } catch (err) {
      console.error('Recording error:', err);
      this.config.onError?.(err instanceof Error ? err.message : 'Failed to stop recording');
      return null;
    }
  }

  async playRecord(audioUri: string): Promise<void> {
    try {
      const fileInfo = await FileSystem.getInfoAsync(audioUri);
      if (!fileInfo.exists) {
        throw new Error('Audio file not found. It may have been deleted or moved.');
      }

      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
      });
      
      const sound = new Audio.Sound();
      await sound.loadAsync({ uri: audioUri });
      await sound.playAsync();
      
      this.handlePlaybackCompletion(sound, audioUri);

    } catch (err) {
      console.error('Playback error:', err);
      this.config.onError?.(err instanceof Error ? err.message : 'Failed to play recording');
    }
  }

  private handlePlaybackCompletion(sound: Audio.Sound, audioUri: string): void {
    sound.setOnPlaybackStatusUpdate(async (status) => {
      if (status.isLoaded && !status.isPlaying && status.didJustFinish) {
        await sound.unloadAsync();
        
        if (this.config.audioSettings.autoDeleteAfterPlayback) {
          this.handleAutoDeletion(audioUri);
        }
      }
    });
  }

  private handleAutoDeletion(audioUri: string): void {
    if (this.config.audioSettings.confirmBeforeDelete) {
      Alert.alert(
        'Delete Audio',
        'Do you want to delete this audio recording?',
        [
          {
            text: 'Keep',
            style: 'cancel'
          },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: () => this.deleteAudioFile(audioUri)
          }
        ]
      );
    } else {
      this.deleteAudioFile(audioUri);
    }
  }

  private async deleteAudioFile(audioUri: string): Promise<void> {
    try {
      await FileSystem.deleteAsync(audioUri);
    } catch (error) {
      console.warn('Failed to delete audio file:', error);
    }
  }

  cleanup(): void {
    if (this.previewInterval) {
      clearInterval(this.previewInterval);
    }
  }
}
