package com.transboard.app

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.net.Uri
import android.os.Build
import android.provider.Settings
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
    }

    private var recordingReceiver: BroadcastReceiver? = null

    init {
        setupBroadcastReceiver()
    }

    private fun setupBroadcastReceiver() {
        recordingReceiver = object : BroadcastReceiver() {
            override fun onReceive(context: Context?, intent: Intent?) {
                when (intent?.action) {
                    ACTION_START_RECORDING -> sendEvent("onStartRecording", null)
                    ACTION_STOP_RECORDING -> sendEvent("onStopRecording", null)
                }
            }
        }

        val filter = IntentFilter().apply {
            addAction(ACTION_START_RECORDING)
            addAction(ACTION_STOP_RECORDING)
        }
        reactContext.registerReceiver(recordingReceiver, filter)
    }

    private fun sendEvent(eventName: String, params: Any?) {
        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit(eventName, params)
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
            Intent(reactContext, OverlayService::class.java).also { intent ->
                reactContext.startService(intent)
            }
            promise.resolve(true)
        } catch (e: Exception) {
            promise.reject("SHOW_OVERLAY_ERROR", e.message)
        }
    }

    @ReactMethod
    fun hideOverlay(promise: Promise) {
        try {
            Intent(reactContext, OverlayService::class.java).also { intent ->
                reactContext.stopService(intent)
            }
            promise.resolve(true)
        } catch (e: Exception) {
            promise.reject("HIDE_OVERLAY_ERROR", e.message)
        }
    }

    override fun onCatalystInstanceDestroy() {
        super.onCatalystInstanceDestroy()
        recordingReceiver?.let {
            reactContext.unregisterReceiver(it)
            recordingReceiver = null
        }
    }
}