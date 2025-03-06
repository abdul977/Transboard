package com.transboard.app

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.net.Uri
import android.os.Build
import android.provider.Settings
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule

class OverlayModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    companion object {
        private const val OVERLAY_PERMISSION_REQ_CODE = 1
        private const val ACTION_START_RECORDING = "com.transboard.app.START_RECORDING"
        private const val ACTION_STOP_RECORDING = "com.transboard.app.STOP_RECORDING"
        private const val ACTION_ERROR = "com.transboard.app.RECORDING_ERROR"
        private const val ACTION_INSERT_TEXT = "com.transboard.app.INSERT_TEXT"
    }

    private var recordingReceiver: BroadcastReceiver? = null
    private var errorReceiver: BroadcastReceiver? = null
    private var isRecordingActive = false

    init {
        setupBroadcastReceivers()
    }

    private fun setupBroadcastReceivers() {
        // Recording events receiver
        recordingReceiver = object : BroadcastReceiver() {
            override fun onReceive(context: Context?, intent: Intent?) {
                android.util.Log.d("OverlayModule", "Received broadcast: ${intent?.action}")
                
                when (intent?.action) {
                    ACTION_START_RECORDING -> {
                        android.util.Log.d("OverlayModule", "Sending onStartRecording event")
                        try {
                            isRecordingActive = true
                            sendEvent("onStartRecording", null)
                        } catch (e: Exception) {
                            android.util.Log.e("OverlayModule", "Error starting recording", e)
                            handleError("Failed to start recording: ${e.message}")
                        }
                    }
                    ACTION_STOP_RECORDING -> {
                        android.util.Log.d("OverlayModule", "Sending onStopRecording event")
                        try {
                            sendEvent("onStopRecording", null)
                            isRecordingActive = false
                        } catch (e: Exception) {
                            android.util.Log.e("OverlayModule", "Error stopping recording", e)
                            handleError("Failed to stop recording: ${e.message}")
                        }
                    }
                }
            }
        }

        // Error events receiver
        errorReceiver = object : BroadcastReceiver() {
            override fun onReceive(context: Context?, intent: Intent?) {
                if (intent?.action == ACTION_ERROR) {
                    val error = intent.getStringExtra("error")
                    error?.let {
                        android.util.Log.e("OverlayModule", "Recording error: $it")
                        handleError(it)
                    }
                }
            }
        }

        // Register receivers with appropriate filters
        val recordingFilter = IntentFilter().apply {
            addAction(ACTION_START_RECORDING)
            addAction(ACTION_STOP_RECORDING)
        }

        val errorFilter = IntentFilter(ACTION_ERROR)

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            reactContext.registerReceiver(recordingReceiver, recordingFilter, Context.RECEIVER_NOT_EXPORTED)
            reactContext.registerReceiver(errorReceiver, errorFilter, Context.RECEIVER_NOT_EXPORTED)
        } else {
            reactContext.registerReceiver(recordingReceiver, recordingFilter)
            reactContext.registerReceiver(errorReceiver, errorFilter)
        }
    }

    private fun handleError(errorMessage: String) {
        android.util.Log.e("OverlayModule", "Error: $errorMessage")
        isRecordingActive = false
        sendEvent("onRecordingError", errorMessage)

        // Notify the overlay service to reset its state
        currentActivity?.let { activity ->
            val intent = Intent(ACTION_ERROR)
            intent.setPackage(activity.packageName)
            intent.putExtra("error", errorMessage)
            activity.sendBroadcast(intent)
        }
    }

    private fun sendEvent(eventName: String, params: Any?) {
        android.util.Log.d("OverlayModule", "Emitting event: $eventName")
        try {
            reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit(eventName, params)
        } catch (e: Exception) {
            android.util.Log.e("OverlayModule", "Error sending event: $eventName", e)
        }
    }

    override fun getName(): String = "OverlayModule"

    @ReactMethod
    fun checkPermission(promise: Promise) {
        val hasPermission = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            Settings.canDrawOverlays(reactContext)
        } else {
            true
        }
        promise.resolve(hasPermission)
    }

    @ReactMethod
    fun requestPermission(promise: Promise) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            if (!Settings.canDrawOverlays(reactContext)) {
                val intent = Intent(
                    Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
                    Uri.parse("package:${reactContext.packageName}")
                )
                currentActivity?.startActivityForResult(intent, OVERLAY_PERMISSION_REQ_CODE)
                promise.resolve(false)
                return
            }
        }
        promise.resolve(true)
    }

    @ReactMethod
    fun showOverlay(promise: Promise) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && !Settings.canDrawOverlays(reactContext)) {
            promise.reject("PERMISSION_DENIED", "Overlay permission not granted")
            return
        }

        try {
            currentActivity?.let { activity ->
                val intent = Intent(activity, OverlayService::class.java)
                activity.startService(intent)
                promise.resolve(true)
            } ?: run {
                promise.reject("NO_ACTIVITY", "No activity available")
            }
        } catch (e: Exception) {
            promise.reject("SHOW_OVERLAY_ERROR", e.message ?: "Failed to show overlay", e)
        }
    }

    @ReactMethod
    fun hideOverlay(promise: Promise) {
        try {
            if (isRecordingActive) {
                // Stop recording if active
                val stopIntent = Intent(ACTION_STOP_RECORDING)
                stopIntent.setPackage(reactContext.packageName)
                reactContext.sendBroadcast(stopIntent)
            }

            currentActivity?.let { activity ->
                val intent = Intent(activity, OverlayService::class.java)
                activity.stopService(intent)
                promise.resolve(true)
            } ?: run {
                promise.reject("NO_ACTIVITY", "No activity available")
            }
        } catch (e: Exception) {
            promise.reject("HIDE_OVERLAY_ERROR", e.message ?: "Failed to hide overlay", e)
        }
    }

    @ReactMethod
    fun onRecordingError(error: String?) {
        error?.let { handleError(it) }
    }

    @ReactMethod
    fun insertTextIntoFocusedInput(text: String, promise: Promise) {
        try {
            val activity = currentActivity
            if (activity == null) {
                promise.reject("NO_ACTIVITY", "No activity available")
                return
            }

            // Send text insertion request to accessibility service
            val intent = Intent(ACTION_INSERT_TEXT)
            intent.putExtra("text", text)
            intent.setPackage(activity.packageName)
            activity.sendBroadcast(intent)
            promise.resolve(true)
        } catch (e: Exception) {
            promise.reject("INPUT_ERROR", "Failed to insert text: ${e.message}")
        }
    }

    @ReactMethod
    fun transcribeAndInsertText(audioUri: String, promise: Promise) {
        try {
            // Transcribe the audio and insert the text into the focused input
            val transcriptionService = TranscriptionService()
            val transcribedText = transcriptionService.transcribeAudio(audioUri)
            insertTextIntoFocusedInput(transcribedText, promise)
        } catch (e: Exception) {
            promise.reject("TRANSCRIPTION_ERROR", "Failed to transcribe audio: ${e.message}")
        }
    }

    override fun onCatalystInstanceDestroy() {
        super.onCatalystInstanceDestroy()
        try {
            recordingReceiver?.let {
                reactContext.unregisterReceiver(it)
                recordingReceiver = null
            }
            errorReceiver?.let {
                reactContext.unregisterReceiver(it)
                errorReceiver = null
            }
            isRecordingActive = false
        } catch (e: Exception) {
            android.util.Log.e("OverlayModule", "Error during cleanup", e)
        }
    }
}
