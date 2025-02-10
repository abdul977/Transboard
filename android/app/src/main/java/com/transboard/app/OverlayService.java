package com.transboard.app;

import android.app.Service;
import android.content.Intent;
import android.graphics.PixelFormat;
import android.os.IBinder;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.WindowManager;
import android.widget.ImageView;
import android.widget.TextView;
import android.os.Handler;
import android.os.Looper;

public class OverlayService extends Service {
    private WindowManager windowManager;
    private View overlayView;
    private WindowManager.LayoutParams params;
    private TextView timerView;
    private ImageView recordButton;
    private boolean isRecording = false;
    private int recordingSeconds = 0;
    private Handler timerHandler;
    private float touchX, touchY;
    private int initialX, initialY;

    @Override
    public void onCreate() {
        super.onCreate();
        windowManager = (WindowManager) getSystemService(WINDOW_SERVICE);
        setupOverlayView();
        setupDragListener();
        initializeTimer();
    }

    private void setupOverlayView() {
        overlayView = LayoutInflater.from(this).inflate(R.layout.overlay_view, null);
        recordButton = overlayView.findViewById(R.id.record_button);
        timerView = overlayView.findViewById(R.id.recording_timer);

        params = new WindowManager.LayoutParams(
            WindowManager.LayoutParams.WRAP_CONTENT,
            WindowManager.LayoutParams.WRAP_CONTENT,
            WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY,
            WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE,
            PixelFormat.TRANSLUCENT
        );
        
        params.gravity = Gravity.TOP | Gravity.START;
        params.x = 0;
        params.y = 100;

        recordButton.setOnClickListener(v -> toggleRecording());
    }

    private void setupDragListener() {
        overlayView.setOnTouchListener((v, event) -> {
            switch (event.getAction()) {
                case MotionEvent.ACTION_DOWN:
                    touchX = event.getRawX();
                    touchY = event.getRawY();
                    initialX = params.x;
                    initialY = params.y;
                    return true;

                case MotionEvent.ACTION_MOVE:
                    params.x = initialX + (int) (event.getRawX() - touchX);
                    params.y = initialY + (int) (event.getRawY() - touchY);
                    windowManager.updateViewLayout(overlayView, params);
                    return true;
            }
            return false;
        });
    }

    private void initializeTimer() {
        timerHandler = new Handler(Looper.getMainLooper());
    }

    private void toggleRecording() {
        isRecording = !isRecording;
        if (isRecording) {
            startRecording();
        } else {
            stopRecording();
        }
    }

    private void startRecording() {
        recordButton.setImageResource(android.R.drawable.ic_media_pause);
        timerView.setVisibility(View.VISIBLE);
        recordingSeconds = 0;
        updateTimer();
        // Send broadcast to start recording
        sendBroadcast(new Intent("com.transboard.app.START_RECORDING"));
    }

    private void stopRecording() {
        recordButton.setImageResource(android.R.drawable.ic_btn_speak_now);
        timerView.setVisibility(View.GONE);
        timerHandler.removeCallbacksAndMessages(null);
        // Send broadcast to stop recording
        sendBroadcast(new Intent("com.transboard.app.STOP_RECORDING"));
    }

    private void updateTimer() {
        if (!isRecording) return;
        
        int minutes = recordingSeconds / 60;
        int seconds = recordingSeconds % 60;
        String time = String.format("%02d:%02d", minutes, seconds);
        timerView.setText(time);
        recordingSeconds++;

        timerHandler.postDelayed(this::updateTimer, 1000);
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        if (overlayView.getParent() == null) {
            windowManager.addView(overlayView, params);
        }
        return START_STICKY;
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        if (overlayView.getParent() != null) {
            windowManager.removeView(overlayView);
        }
        if (timerHandler != null) {
            timerHandler.removeCallbacksAndMessages(null);
        }
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}