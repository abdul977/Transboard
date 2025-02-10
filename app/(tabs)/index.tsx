import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  ActivityIndicator,
  NativeSyntheticEvent,
  TextInputSelectionChangeEventData,
  Dimensions,
} from 'react-native';
import { useTranscription } from '@/context/transcription';
import Colors, { gradients } from '@/constants/Colors';
import { FloatingButton } from '@/components/FloatingButton';
import { FontAwesome } from '@expo/vector-icons';
import { TranscriptionRecord } from '@/types/transcription';
import { format } from 'date-fns';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

// Convert gradient arrays to tuples
const primaryGradient = gradients.primary as [string, string];
const secondaryGradient = gradients.secondary as [string, string];
const accentGradient = gradients.accent as [string, string];
const successGradient = gradients.success as [string, string];
const infoGradient = gradients.info as [string, string];

export default function TranscriptionScreen() {
  const { 
    state, 
    playRecord, 
    copyToClipboard, 
    copySelectedText,
    deleteRecord, 
    spellCheckTranscription 
  } = useTranscription();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedText, setSelectedText] = useState('');

  const filteredHistory = searchQuery
    ? state.history.filter(record =>
        record.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.correctedText?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : state.history;

  const renderItem = ({ item }: { item: TranscriptionRecord }) => (
    <View style={styles.recordItem}>
      <LinearGradient
        colors={[Colors.light.surface, Colors.light.background]}
        style={styles.recordGradient}
      >
        <View style={styles.recordHeader}>
          <Text style={styles.timestamp}>
            {format(new Date(item.timestamp), 'MMM d, yyyy h:mm a')}
          </Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity
              onPress={() => playRecord(item.audioUri)}
              style={[styles.actionButton, styles.primaryButton]}
            >
              <FontAwesome name="play" size={16} color={Colors.light.surface} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => copyToClipboard(item.text)}
              style={[styles.actionButton, styles.secondaryButton]}
            >
              <FontAwesome name="copy" size={16} color={Colors.light.surface} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => deleteRecord(item.id)}
              style={[styles.actionButton, styles.dangerButton]}
            >
              <FontAwesome name="trash" size={16} color={Colors.light.surface} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.transcriptionContent}>
          <View style={styles.selectableTextContainer}>
            <Text 
              style={styles.selectableText}
              selectable={true}
            >
              {item.text}
            </Text>
          </View>
          {selectedText && (
            <TouchableOpacity 
              style={styles.copySelectedButton}
              onPress={() => {
                copySelectedText(selectedText);
                setSelectedText('');
              }}
            >
              <LinearGradient
                colors={accentGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientButton}
              >
                <FontAwesome name="scissors" size={14} color={Colors.light.surface} />
                <Text style={styles.buttonText}>Copy selected text</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
          {item.isSpellChecked && (
            <View style={styles.correctedTextContainer}>
              <LinearGradient
                colors={successGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.correctedGradient}
              >
                <Text style={styles.correctedLabel}>Corrected version</Text>
                <View style={styles.selectableTextContainer}>
                  <Text 
                    style={styles.selectableText}
                    selectable={true}
                  >
                    {item.correctedText}
                  </Text>
                </View>
              </LinearGradient>
            </View>
          )}
        </View>
        {!item.isSpellChecked && (
          <TouchableOpacity 
            style={styles.spellCheckButton}
            onPress={() => spellCheckTranscription(item.id)}
          >
            <LinearGradient
              colors={primaryGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientButton}
            >
              <FontAwesome name="magic" size={14} color={Colors.light.surface} />
              <Text style={styles.buttonText}>Correct spelling</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
        {state.isProcessing && item.isSpellChecked && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color={Colors.light.primary} />
            <Text style={styles.loadingText}>Correcting spelling...</Text>
          </View>
        )}
      </LinearGradient>
    </View>
  );

  return (
    <LinearGradient
      colors={[Colors.light.background, Colors.light.surface]}
      style={styles.container}
    >
      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={16} color={Colors.light.tabIconDefault} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search transcriptions..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={Colors.light.tabIconDefault}
        />
      </View>

      {state.error && (
        <View style={styles.errorContainer}>
          <LinearGradient
            colors={['#FFE5E5', '#FFD1D1'] as [string, string]}
            style={styles.errorGradient}
          >
            <FontAwesome name="exclamation-circle" size={20} color={Colors.light.error} />
            <Text style={styles.errorText}>{state.error}</Text>
          </LinearGradient>
        </View>
      )}

      {state.isRecording && (
        <View style={styles.recordingIndicator}>
          <LinearGradient
            colors={primaryGradient}
            style={styles.recordingGradient}
          >
            <ActivityIndicator color={Colors.light.surface} />
            <Text style={styles.recordingText}>Recording...</Text>
          </LinearGradient>
        </View>
      )}

      <FlatList
        data={filteredHistory}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <LinearGradient
              colors={infoGradient}
              style={styles.emptyGradient}
            >
              <FontAwesome name="microphone" size={32} color={Colors.light.surface} />
              <Text style={styles.emptyText}>
                No transcriptions yet. Tap the microphone button to start recording.
              </Text>
            </LinearGradient>
          </View>
        )}
      />

      <FloatingButton />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.surface,
    margin: 16,
    padding: 16,
    borderRadius: 20,
    shadowColor: Colors.light.text,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  searchIcon: {
    marginHorizontal: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.light.text,
    padding: 8,
  },
  listContent: {
    padding: 16,
  },
  recordItem: {
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
  },
  recordGradient: {
    padding: 20,
  },
  recordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  timestamp: {
    fontSize: 14,
    color: Colors.light.tabIconDefault,
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    padding: 10,
    borderRadius: 12,
    shadowColor: Colors.light.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButton: {
    backgroundColor: Colors.light.primary,
  },
  secondaryButton: {
    backgroundColor: Colors.light.secondary,
  },
  dangerButton: {
    backgroundColor: Colors.light.error,
  },
  transcriptionContent: {
    gap: 12,
  },
  selectableTextContainer: {
    backgroundColor: Colors.light.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.light.border,
    padding: 16,
    marginBottom: 8,
    position: 'relative',
  },
  selectableText: {
    fontSize: 16,
    color: Colors.light.text,
    lineHeight: 24,
    padding: 0,
    backgroundColor: 'transparent',
  },
  copySelectedButton: {
    alignSelf: 'flex-start',
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  buttonText: {
    color: Colors.light.surface,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  correctedTextContainer: {
    marginTop: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  correctedGradient: {
    padding: 16,
  },
  correctedLabel: {
    fontSize: 14,
    color: Colors.light.surface,
    marginBottom: 8,
    fontWeight: '600',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  loadingText: {
    fontSize: 14,
    color: Colors.light.primary,
    marginLeft: 8,
    fontWeight: '500',
  },
  errorContainer: {
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  errorGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  errorText: {
    color: Colors.light.error,
    fontSize: 14,
    marginLeft: 8,
    fontWeight: '500',
  },
  recordingIndicator: {
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  recordingGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  recordingText: {
    marginLeft: 8,
    color: Colors.light.surface,
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
    padding: 32,
    alignItems: 'center',
  },
  emptyGradient: {
    padding: 32,
    borderRadius: 20,
    alignItems: 'center',
    width: width - 64,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.light.surface,
    textAlign: 'center',
    lineHeight: 24,
    marginTop: 16,
    fontWeight: '500',
  },
  spellCheckButton: {
    alignSelf: 'flex-start',
    marginTop: 16,
  },
});
