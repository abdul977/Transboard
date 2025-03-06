package com.transboard.app

import android.accessibilityservice.AccessibilityService
import android.accessibilityservice.AccessibilityServiceInfo
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.view.accessibility.AccessibilityEvent
import android.view.accessibility.AccessibilityNodeInfo
import android.os.Bundle
import android.util.Log

class TransboardAccessibilityService : AccessibilityService() {
    companion object {
        private const val TAG = "TransboardAccService"
        private const val ACTION_INSERT_TEXT = "com.transboard.app.INSERT_TEXT"
        private var instance: TransboardAccessibilityService? = null
        
        fun getInstance(): TransboardAccessibilityService? = instance
    }

    private var textInsertReceiver: BroadcastReceiver? = null
    private var lastFocusedNode: AccessibilityNodeInfo? = null

    override fun onServiceConnected() {
        super.onServiceConnected()
        instance = this
        
        val info = AccessibilityServiceInfo().apply {
            eventTypes = AccessibilityEvent.TYPE_VIEW_FOCUSED or 
                        AccessibilityEvent.TYPE_VIEW_TEXT_CHANGED
            feedbackType = AccessibilityServiceInfo.FEEDBACK_GENERIC
            flags = AccessibilityServiceInfo.FLAG_RETRIEVE_INTERACTIVE_WINDOWS or
                    AccessibilityServiceInfo.FLAG_REQUEST_ENHANCED_WEB_ACCESSIBILITY
            notificationTimeout = 100
        }
        
        serviceInfo = info
        setupTextInsertReceiver()
        Log.d(TAG, "Accessibility Service Connected")
    }

    private fun setupTextInsertReceiver() {
        textInsertReceiver = object : BroadcastReceiver() {
            override fun onReceive(context: Context?, intent: Intent?) {
                if (intent?.action == ACTION_INSERT_TEXT) {
                    val text = intent.getStringExtra("text")
                    if (text != null) {
                        insertTextIntoFocusedField(text)
                    }
                }
            }
        }

        val filter = IntentFilter(ACTION_INSERT_TEXT)
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.TIRAMISU) {
            registerReceiver(textInsertReceiver, filter, Context.RECEIVER_NOT_EXPORTED)
        } else {
            registerReceiver(textInsertReceiver, filter)
        }
    }

    override fun onAccessibilityEvent(event: AccessibilityEvent) {
        when (event.eventType) {
            AccessibilityEvent.TYPE_VIEW_FOCUSED -> {
                event.source?.let { source ->
                    try {
                        if (source.isEditable()) {
                            // Recycle old node if it exists
                            lastFocusedNode?.recycle()
                            // Store new node
                            lastFocusedNode = source
                            Log.d(TAG, "Stored new focused editable node: ${source.className}, ${source.viewIdResourceName}")
                        } else {
                            Log.d(TAG, "Focused node is not editable: ${source.className}")
                        }
                    } catch (e: Exception) {
                        Log.e(TAG, "Error handling focus event", e)
                    }
                } ?: Log.w(TAG, "Received focus event with null source")
            }
            AccessibilityEvent.TYPE_VIEW_TEXT_CHANGED -> {
                Log.d(TAG, "Text changed in view: ${event.source?.className}")
            }
        }
    }

    private fun insertTextIntoFocusedField(text: String) {
        if (text.isEmpty()) {
            Log.w(TAG, "Attempted to insert empty text")
            return
        }

        lastFocusedNode?.let { node ->
            try {
                // Check if node is editable and return early if not
                if (!node.isEditable()) {
                    Log.e(TAG, "Last focused node is not editable: ${node.className}")
                    return@let
                }

                // Try direct text insertion first and track result
                val setTextSuccess = performDirectTextInsertion(node, text)

                // Handle direct insertion result and try clipboard as fallback
                if (!setTextSuccess) {
                    val pasteSuccess = performClipboardPaste(node, text)
                    if (!pasteSuccess) {
                        Log.e(TAG, "Both direct insertion and paste fallback failed")
                    } else {
                        Log.d(TAG, "Successfully inserted text using clipboard paste")
                    }
                } else {
                    Log.d(TAG, "Successfully inserted text using direct method")
                }
            } catch (e: Exception) {
                Log.e(TAG, "Error during text insertion", e)
            }
        } ?: Log.e(TAG, "No focused node available for text insertion")
    }

    override fun onInterrupt() {
        Log.d(TAG, "Accessibility Service Interrupted")
    }

    private fun performDirectTextInsertion(node: AccessibilityNodeInfo, text: String): Boolean {
        return try {
            val arguments = Bundle()
            arguments.putCharSequence(
                AccessibilityNodeInfo.ACTION_ARGUMENT_SET_TEXT_CHARSEQUENCE,
                text
            )
            val result = node.performAction(AccessibilityNodeInfo.ACTION_SET_TEXT, arguments)
            Log.d(TAG, "Direct text insertion result: $result")
            result
        } catch (e: Exception) {
            Log.e(TAG, "Failed to perform SET_TEXT action", e)
            false
        }
    }

    private fun performClipboardPaste(node: AccessibilityNodeInfo, text: String): Boolean {
        Log.d(TAG, "Falling back to clipboard paste method")
        return try {
            val clipboard = getSystemService(Context.CLIPBOARD_SERVICE) as android.content.ClipboardManager
            val clip = android.content.ClipData.newPlainText("transcribed_text", text)
            clipboard.setPrimaryClip(clip)
            
            // Try to paste
            val pasteResult = node.performAction(AccessibilityNodeInfo.ACTION_PASTE)
            Log.d(TAG, "Paste action result: $pasteResult")
            
            if (!pasteResult) {
                Log.e(TAG, "Failed to paste text")
            }
            pasteResult
        } catch (e: Exception) {
            Log.e(TAG, "Error during paste fallback", e)
            false
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        instance = null
        textInsertReceiver?.let {
            unregisterReceiver(it)
            textInsertReceiver = null
        }
        lastFocusedNode?.recycle()
        lastFocusedNode = null
    }
}
