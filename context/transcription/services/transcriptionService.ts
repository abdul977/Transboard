import axios from 'axios';
import { Buffer } from 'buffer';
import * as FileSystem from 'expo-file-system';
import * as Clipboard from 'expo-clipboard';
import * as Sharing from 'expo-sharing';
import * as IntentLauncher from 'expo-intent-launcher';
import { Alert, Platform } from 'react-native';
import Groq from 'groq-sdk';
import { 
  TranscriptionResponse, 
  TranscriptionRecord 
} from '../types';
import { 
  validateAudioFile, 
  logTranscriptionRequest, 
  formatErrorMessage 
} from '../../../utils/testTranscriptionApi';

interface TranscriptionConfig {
  baseURL: string;
  headers: {
    Authorization: string;
    'Content-Type': string;
    Accept: string;
  };
  model: string;
  language: string;
}

export class TranscriptionService {
  private config: TranscriptionConfig;
  private groq: Groq;

  constructor(config: TranscriptionConfig) {
    this.config = config;
    this.groq = new Groq({
      apiKey: this.config.headers.Authorization.replace('Bearer ', '')
    });
  }

  async spellCheckText(text: string): Promise<string> {
    try {
      const completion = await this.groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are a professional spell checker and grammar corrector. Your task is to correct any spelling or grammatical errors in the text while preserving the original meaning. Only make necessary corrections and keep the text as close to the original as possible. Only respond with the corrected text, nothing else."
          },
          {
            role: "user",
            content: text
          }
        ],
        model: "mixtral-8x7b-32768",
        temperature: 0.3,
        max_tokens: 1024
      });

      return completion.choices[0]?.message?.content || text;
    } catch (err) {
      console.error('Spell check error:', err);
      throw new Error(formatErrorMessage(err));
    }
  }

  async processRecording(uri: string): Promise<TranscriptionResponse> {
    try {
      const fileInfo = await FileSystem.getInfoAsync(uri);
      validateAudioFile(uri, fileInfo);

      console.log('Reading audio file...');
      const base64Audio = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64
      });

      console.log('Creating form data...');
      const formData = new FormData();
      
      const blob = await fetch(`data:audio/m4a;base64,${base64Audio}`).then(r => r.blob());
      formData.append('file', blob, 'recording.m4a');
      
      formData.append('model', 'whisper-large-v3-turbo');
      formData.append('response_format', 'verbose_json');
      formData.append('language', 'en'); // Optional but recommended for better accuracy
      formData.append('temperature', '0'); // Add temperature parameter

      logTranscriptionRequest(formData);

      console.log('Sending request to API...');
      const maxRetries = 3;
      let lastError: Error | null = null;

      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          console.log(`Attempt ${attempt} of ${maxRetries}...`);
          const response = await axios.post<TranscriptionResponse>(
            this.config.baseURL,
            formData,
            { 
              headers: {
                ...this.config.headers,
                'Content-Type': 'multipart/form-data',
              },
              timeout: 30000,
              onUploadProgress: (progressEvent) => {
                console.log('Upload Progress:', Math.round((progressEvent.loaded / progressEvent.total!) * 100), '%');
              }
            }
          );

          if (!response.data) {
            throw new Error('No response data received from API');
          }

          console.log('API Response:', response.status, response.statusText);
          return response.data;

        } catch (err) {
          lastError = err as Error;
          console.error(`Attempt ${attempt} failed:`, err);
          
          if (attempt === maxRetries) {
            if (axios.isAxiosError(err)) {
              console.error('API Error Details:', {
                status: err.response?.status,
                statusText: err.response?.statusText,
                data: err.response?.data
              });
              throw new Error(`API Error: ${err.response?.data?.error || err.message}`);
            }
            throw err;
          }
          
          // Wait before retrying (exponential backoff)
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
        }
      }

      // If we get here, all retries failed
      throw lastError || new Error('All transcription attempts failed');
    } catch (err) {
      console.error('Transcription Error:', err);
      throw err;
    }
  }

  async copyToClipboard(text: string): Promise<void> {
    try {
      await Clipboard.setStringAsync(text);
      Alert.alert('Success', 'Text copied to clipboard');
    } catch (err) {
      console.error('Clipboard error:', err);
      throw new Error(formatErrorMessage(err));
    }
  }

  async sendToApp(text: string, appPackage?: string): Promise<void> {
    try {
      if (Platform.OS === 'ios') {
        await Clipboard.setStringAsync(text);
        Alert.alert('Success', 'Text copied to clipboard. Please paste in your desired app.');
      } else {
        if (appPackage) {
          await IntentLauncher.startActivityAsync('android.intent.action.SEND', {
            type: 'text/plain',
            extra: { 'android.intent.extra.TEXT': text },
            data: appPackage
          });
        } else {
          await Sharing.shareAsync('data:text/plain;base64,' + Buffer.from(text).toString('base64'), {
            mimeType: 'text/plain',
            dialogTitle: 'Share transcribed text'
          });
        }
      }
    } catch (err) {
      console.error('Send to app error:', err);
      throw new Error(formatErrorMessage(err));
    }
  }

  async shareTranscription(text: string): Promise<void> {
    try {
      await Sharing.shareAsync('data:text/plain;base64,' + Buffer.from(text).toString('base64'), {
        mimeType: 'text/plain',
        dialogTitle: 'Share transcription'
      });
    } catch (err) {
      console.error('Share transcription error:', err);
      throw new Error(formatErrorMessage(err));
    }
  }

  filterHistory(history: TranscriptionRecord[], query: string): TranscriptionRecord[] {
    const lowercaseQuery = query.toLowerCase();
    return history.filter(record => 
      record.text.toLowerCase().includes(lowercaseQuery) ||
      (record.editedText?.toLowerCase().includes(lowercaseQuery))
    );
  }
}
