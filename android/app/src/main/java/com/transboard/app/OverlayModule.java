package com.transboard.app;

import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.provider.Settings;
import android.view.WindowManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.IntentFilter;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class OverlayModule extends ReactContextBaseJavaModule {
    private static final int OVERLAY_PERMISSION_REQ_CODE = 1;
    private final ReactApplicationContext reactContext;
    private BroadcastReceiver recordingReceiver;

    public OverlayModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        setupBroadcastReceiver();
    }

    private void setupBroadcastReceiver() {
        recordingReceiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                String action = intent.getAction();
                if ("com.transboard.app.START_RECORDING".equals(action)) {
                    sendEvent("onStartRecording", null);
                } else if ("com.transboard.app.STOP_RECORDING".equals(action)) {
                    sendEvent("onStopRecording", null);
                }
            }
        };

        IntentFilter filter = new IntentFilter();
        filter.addAction("com.transboard.app.START_RECORDING");
        filter.addAction("com.transboard.app.STOP_RECORDING");
        reactContext.registerReceiver(recordingReceiver, filter);
    }

    private void sendEvent(String eventName, Object params) {
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
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && !Settings.canDrawOverlays(reactContext)) {
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
        if (recordingReceiver != null) {
            reactContext.unregisterReceiver(recordingReceiver);
            recordingReceiver = null;
        }
    }
}