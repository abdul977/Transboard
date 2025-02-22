package com.transboard.app;

import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.provider.Settings;
import android.view.WindowManager;
import android.content.Context;
import androidx.lifecycle.Observer;
import androidx.lifecycle.LifecycleOwner;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class OverlayModule extends ReactContextBaseJavaModule {
    private static final int OVERLAY_PERMISSION_REQ_CODE = 1;
    private final ReactApplicationContext reactContext;
    private Observer<Bundle> recordingStateObserver;

    public OverlayModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        setupRecordingStateObserver();
    }

    private void setupRecordingStateObserver() {
        recordingStateObserver = new Observer<Bundle>() {
            @Override
            public void onChanged(Bundle bundle) {
                if (bundle == null) return;
                
                String state = bundle.getString("state");
                String recordingPath = bundle.getString("recordingPath");
                
                WritableMap params = Arguments.createMap();
                if (recordingPath != null) {
                    params.putString("recordingPath", recordingPath);
                }

                switch (state) {
                    case "START_RECORDING":
                        sendEvent("onStartRecording", params);
                        break;
                    case "STOP_RECORDING":
                        sendEvent("onStopRecording", params);
                        break;
                    case "TRANSCRIPTION_COMPLETE":
                        sendEvent("onTranscriptionComplete", params);
                        break;
                }
            }
        };

        OverlayService.getRecordingState().observe((LifecycleOwner) getCurrentActivity(), recordingStateObserver);
    }

    private void sendEvent(String eventName, WritableMap params) {
        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit(eventName, params);
    }

    @Override
    public String getName() {
        return "OverlayModule";
    }

    @ReactMethod
    public void checkPermission(Promise promise) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            promise.resolve(Settings.canDrawOverlays(reactContext));
        } else {
            promise.resolve(true);
        }
    }

    @ReactMethod
    public void requestPermission(Promise promise) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            if (!Settings.canDrawOverlays(reactContext)) {
                Intent intent = new Intent(
                    Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
                    Uri.parse("package:" + reactContext.getPackageName())
                );
                getCurrentActivity().startActivityForResult(intent, OVERLAY_PERMISSION_REQ_CODE);
                promise.resolve(false);
            } else {
                promise.resolve(true);
            }
        } else {
            promise.resolve(true);
        }
    }

    @ReactMethod
    public void showOverlay(Promise promise) {
        if (Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.M && !Settings.canDrawOverlays(reactContext)) {
            promise.reject("PERMISSION_DENIED", "Overlay permission not granted");
            return;
        }

        try {
            Intent intent = new Intent(reactContext, OverlayService.class);
            reactContext.startService(intent);
            promise.resolve(true);
        } catch (Exception e) {
            promise.reject("SHOW_OVERLAY_ERROR", e.getMessage());
        }
    }

    @ReactMethod
    public void hideOverlay(Promise promise) {
        try {
            Intent intent = new Intent(reactContext, OverlayService.class);
            reactContext.stopService(intent);
            promise.resolve(true);
        } catch (Exception e) {
            promise.reject("HIDE_OVERLAY_ERROR", e.getMessage());
        }
    }

    @Override
    public void onCatalystInstanceDestroy() {
        super.onCatalystInstanceDestroy();
        if (getCurrentActivity() != null && recordingStateObserver != null) {
            OverlayService.getRecordingState().removeObserver(recordingStateObserver);
            recordingStateObserver = null;
        }
    }
}
