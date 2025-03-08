import axios from 'axios';
import { Alert } from 'react-native';
import { GROQ_API_KEY } from '../context/transcription/reducer';

export async function testGroqApiConnection() {
  try {
    // First test basic connectivity
    const healthResponse = await axios.get('https://api.groq.com/healthz', {
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
      }
    });

    if (healthResponse.status !== 200) {
      throw new Error(`Health check failed: ${healthResponse.status}`);
    }

    // Then test audio transcription endpoint with a small test file
    const testAudio = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA='; // Empty WAV file
    const formData = new FormData();
    
    const blob = await fetch(testAudio).then(r => r.blob());
    formData.append('file', blob, 'test.wav');
    formData.append('model', 'whisper-large-v3-turbo');
    formData.append('response_format', 'verbose_json');

    const testResponse = await axios.post('https://api.groq.com/openai/v1/audio/transcriptions', 
      formData,
      {
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'multipart/form-data',
        }
      }
    );

    console.log('✅ Groq API connection successful');
    console.log('📝 Transcription endpoint test:', testResponse.status);
    
    Alert.alert('Success', 'API connection and transcription endpoint test successful');
    
  } catch (error: unknown) {
    console.error('❌ Groq API connection failed:', error);
    if (axios.isAxiosError(error)) {
      console.error('API Error Details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data
      });
      Alert.alert('Error', `API test failed: ${error.response?.data?.error || error.message}`);
    } else if (error instanceof Error) {
      Alert.alert('Error', `API test failed: ${error.message}`);
    } else {
      Alert.alert('Error', 'An unknown error occurred while testing the API connection');
    }
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
