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
      
      formData.append('file', {
        uri: `data:audio/m4a;base64,${base64Audio}`,
        type: 'audio/m4a',
        name: 'recording.m4a'
      } as any);
      
      formData.append('model', this.config.model);
      formData.append('language', this.config.language);
      formData.append('response_format', 'verbose_json');

      logTranscriptionRequest(formData);

      console.log('Sending request to API...');
      const response = await axios.post<TranscriptionResponse>(
        this.config.baseURL,
        formData,
        { 
          headers: {
            ...this.config.headers,
            'Content-Type': 'multipart/form-data',
          },
          timeout: 30000
        }
      );

      return response.data;

    } catch (err) {
      const errorMessage = formatErrorMessage(err);
      throw new Error(errorMessage);
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
