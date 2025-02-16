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
        if (event.eventType == AccessibilityEvent.TYPE_VIEW_FOCUSED) {
            event.source?.let { source ->
                if (source.isEditable()) {
                    lastFocusedNode = source
                    Log.d(TAG, "Stored new focused editable node")
                }
            }
        }
    }

    private fun insertTextIntoFocusedField(text: String) {
        lastFocusedNode?.let { node ->
            if (node.isEditable()) {
                try {
                    // Try to insert text using ACTION_SET_TEXT
                    val arguments = Bundle()
                    arguments.putCharSequence(
                        AccessibilityNodeInfo.ACTION_ARGUMENT_SET_TEXT_CHARSEQUENCE,
                        text
                    )
                    node.performAction(AccessibilityNodeInfo.ACTION_SET_TEXT, arguments)
                    Log.d(TAG, "Text inserted successfully via accessibility")
                } catch (e: Exception) {
                    Log.e(TAG, "Failed to insert text via accessibility", e)
                    // Fallback to clipboard
                    val clipboard = getSystemService(Context.CLIPBOARD_SERVICE) as android.content.ClipboardManager
                    val clip = android.content.ClipData.newPlainText("transcribed_text", text)
                    clipboard.setPrimaryClip(clip)
                    
                    // Perform paste action
                    node.performAction(AccessibilityNodeInfo.ACTION_PASTE)
                }
            } else {
                Log.e(TAG, "Last focused node is not editable")
            }
        } ?: Log.e(TAG, "No focused node available")
    }

    override fun onInterrupt() {
        Log.d(TAG, "Accessibility Service Interrupted")
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
