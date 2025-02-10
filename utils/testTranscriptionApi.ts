import axios from 'axios';
import { Alert } from 'react-native';
import { GROQ_API_KEY } from '../context/transcription/reducer';

export async function testGroqApiConnection() {
  try {
    const response = await axios.get('https://api.groq.com/healthz', {
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
      }
    });

    if (response.status === 200) {
      console.log('✅ Groq API connection successful');
      Alert.alert('Success', 'API connection test successful');
    } else {
      throw new Error(`API returned status ${response.status}`);
    }
  } catch (error) {
    console.error('❌ Groq API connection failed:', error);
    Alert.alert('Error', 'API connection test failed. Please check your API key and internet connection.');
  }
}

export function logTranscriptionRequest(formData: FormData) {
  console.log('🔍 Transcription Request:');
  console.log('- Model:', formData.get('model'));
  console.log('- Language:', formData.get('language'));
  console.log('- Response Format:', formData.get('response_format'));
  console.log('- File:', formData.get('file'));
}

export function validateAudioFile(uri: string, fileInfo: any) {
  console.log('📁 Audio File Info:');
  console.log('- URI:', uri);
  console.log('- Size:', fileInfo.size);
  console.log('- Exists:', fileInfo.exists);
  console.log('- isDirectory:', fileInfo.isDirectory);

  if (!fileInfo.exists) {
    throw new Error('Audio file not found');
  }

  if (fileInfo.size > 25 * 1024 * 1024) { // 25MB limit
    throw new Error('Audio file too large (max 25MB)');
  }
}

export function formatErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error) && error.response) {
    return `API Error: ${error.response.status} - ${error.response.data?.error || error.message}`;
  } else if (error instanceof Error) {
    return error.message;
  }
  return 'An unknown error occurred';
}
