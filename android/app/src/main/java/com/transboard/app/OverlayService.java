package com.transboard.app;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.Service;
import android.content.Intent;
import android.graphics.PixelFormat;
import android.media.MediaRecorder;
import android.os.Bundle;
import android.os.Environment;
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
import androidx.core.app.NotificationCompat;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class OverlayService extends Service {
    private WindowManager windowManager;
    private View overlayView;
    private WindowManager.LayoutParams params;
    private TextView timerView;
    private ImageView recordButton;
    private boolean isRecording = false;
    private boolean isTranscribing = false;
    private int recordingSeconds = 0;
    private Handler timerHandler;
    private float touchX, touchY;
    private int initialX, initialY;
    private static final String CHANNEL_ID = "TransboardOverlayChannel";
    private static final int NOTIFICATION_ID = 1;

    private MediaRecorder mediaRecorder;
    private String currentRecordingPath;
    
    private static final MutableLiveData<Bundle> recordingState = new MutableLiveData<>();

    public static LiveData<Bundle> getRecordingState() {
        return recordingState;
    }

    private void updateRecordingState(String state, Bundle params) {
        if (params == null) {
            params = new Bundle();
        }
        params.putString("state", state);
        recordingState.postValue(params);
    }

    @Override
    public void onCreate() {
        super.onCreate();
        windowManager = (WindowManager) getSystemService(WINDOW_SERVICE);
        setupOverlayView();
        setupDragListener();
        createNotificationChannel();
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

    private void createNotificationChannel() {
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(
                CHANNEL_ID,
                "Transboard Overlay",
                NotificationManager.IMPORTANCE_LOW
            );
            channel.setDescription("Keeps overlay recording active");
            NotificationManager notificationManager = getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(channel);
        }
    }

    private void startForeground() {
        Notification notification = new NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle("Transboard Recording")
            .setContentText("Recording in progress...")
            .setSmallIcon(android.R.drawable.ic_btn_speak_now)
            .setPriority(NotificationCompat.PRIORITY_LOW)
            .setOngoing(true)
            .build();

        startForeground(NOTIFICATION_ID, notification);
    }

    private void initializeTimer() {
        timerHandler = new Handler(Looper.getMainLooper());
    }

    private void toggleRecording() {
        if (!isTranscribing) {
            isRecording = !isRecording;
            if (isRecording) {
                startRecording();
            } else {
                stopRecording();
            }
        }
    }

    private void startRecording() {
        try {
            // Remove FLAG_NOT_FOCUSABLE to keep overlay active
            params.flags = WindowManager.LayoutParams.FLAG_NOT_TOUCH_MODAL | 
                          WindowManager.LayoutParams.FLAG_WATCH_OUTSIDE_TOUCH;
            windowManager.updateViewLayout(overlayView, params);

            // Set up MediaRecorder
            currentRecordingPath = generateRecordingPath();
            mediaRecorder = new MediaRecorder();
            mediaRecorder.setAudioSource(MediaRecorder.AudioSource.MIC);
            mediaRecorder.setOutputFormat(MediaRecorder.OutputFormat.MPEG_4);
            mediaRecorder.setAudioEncoder(MediaRecorder.AudioEncoder.AAC);
            mediaRecorder.setOutputFile(currentRecordingPath);
            mediaRecorder.prepare();
            mediaRecorder.start();

            recordButton.setImageResource(android.R.drawable.ic_media_pause);
            timerView.setVisibility(View.VISIBLE);
            recordingSeconds = 0;
            updateTimer();
            
            startForeground();
            
            updateRecordingState("START_RECORDING", null);
        } catch (IOException e) {
            e.printStackTrace();
            stopRecording();
        }
    }

    private String generateRecordingPath() {
        String timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss", Locale.getDefault()).format(new Date());
        File storageDir = new File(getExternalFilesDir(Environment.DIRECTORY_RECORDINGS), "Transboard");
        if (!storageDir.exists()) {
            storageDir.mkdirs();
        }
        return new File(storageDir, "RECORDING_" + timeStamp + ".m4a").getAbsolutePath();
    }

    private void stopRecording() {
        isRecording = false;
        isTranscribing = true;
        recordButton.setEnabled(false);
        timerView.setText("Transcribing...");
        timerHandler.removeCallbacksAndMessages(null);
        
        try {
            if (mediaRecorder != null) {
                mediaRecorder.stop();
                mediaRecorder.release();
                mediaRecorder = null;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        // Restore FLAG_NOT_FOCUSABLE
        params.flags = WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE;
        windowManager.updateViewLayout(overlayView, params);
        
        // Send recording path with stop event
        Bundle params = new Bundle();
        params.putString("recordingPath", currentRecordingPath);
        updateRecordingState("STOP_RECORDING", params);

        // Wait for transcription completion
        new Handler(Looper.getMainLooper()).postDelayed(() -> {
            completeTranscription();
        }, 1000);
    }

    private void completeTranscription() {
        isTranscribing = false;
        recordButton.setEnabled(true);
        recordButton.setImageResource(android.R.drawable.ic_btn_speak_now);
        timerView.setVisibility(View.GONE);
        
        Bundle params = new Bundle();
        params.putString("recordingPath", currentRecordingPath);
        updateRecordingState("TRANSCRIPTION_COMPLETE", params);
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
        if (mediaRecorder != null) {
            try {
                mediaRecorder.stop();
                mediaRecorder.release();
            } catch (Exception e) {
                e.printStackTrace();
            }
            mediaRecorder = null;
        }
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}
