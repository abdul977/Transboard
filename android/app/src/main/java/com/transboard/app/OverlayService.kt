package com.transboard.app

import android.app.Service
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.graphics.PixelFormat
import android.os.Bundle
import android.os.Handler
import android.os.IBinder
import android.os.Looper
import android.view.Gravity
import android.view.LayoutInflater
import android.view.MotionEvent
import android.view.View
import android.view.WindowManager
import android.widget.ImageView
import android.widget.TextView

class OverlayService : Service() {
    companion object {
        private const val ACTION_INSERT_TEXT = "com.transboard.app.INSERT_TEXT"
        private const val ACTION_START_RECORDING = "com.transboard.app.START_RECORDING"
        private const val ACTION_STOP_RECORDING = "com.transboard.app.STOP_RECORDING"
    }
    private lateinit var windowManager: WindowManager
    private lateinit var overlayView: View
    private lateinit var params: WindowManager.LayoutParams
    private lateinit var timerView: TextView
    private lateinit var recordButton: ImageView
    private lateinit var timerHandler: Handler
    
    private var isRecording = false
    private var recordingSeconds = 0
    private var touchX = 0f
    private var touchY = 0f
    private var initialX = 0
    private var initialY = 0
    private var lastTouchDownTime = 0L
    private var hasMovedBeyondThreshold = false

    private var textInsertReceiver: BroadcastReceiver? = null

    override fun onCreate() {
        super.onCreate()
        windowManager = getSystemService(WINDOW_SERVICE) as WindowManager
        setupOverlayView()
        setupDragListener()
        initializeTimer()
        setupTextInsertReceiver()
    }

    private fun setupTextInsertReceiver() {
        textInsertReceiver = object : BroadcastReceiver() {
            override fun onReceive(context: Context?, intent: Intent?) {
                if (intent?.action == ACTION_INSERT_TEXT) {
                    val text = intent.getStringExtra("text")
                    if (text != null) {
                        insertTextIntoFocusedInput(text)
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

    private fun insertTextIntoFocusedInput(text: String) {
        val intent = Intent(ACTION_INSERT_TEXT)
        intent.setPackage(applicationContext.packageName)
        intent.putExtra("text", text)
        sendBroadcast(intent)
    }

    private fun setupOverlayView() {
        overlayView = LayoutInflater.from(this).inflate(R.layout.overlay_view, null)
        recordButton = overlayView.findViewById(R.id.record_button)
        timerView = overlayView.findViewById(R.id.recording_timer)

        params = WindowManager.LayoutParams().apply {
            width = WindowManager.LayoutParams.WRAP_CONTENT
            height = WindowManager.LayoutParams.WRAP_CONTENT
            type = WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY
            flags = WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE or
                    WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS or
                    WindowManager.LayoutParams.FLAG_LAYOUT_IN_SCREEN
            format = PixelFormat.TRANSLUCENT
            gravity = Gravity.TOP or Gravity.START
            x = 0
            y = 100
        }

        // Initialize button state
        updateRecordButtonState()
    }

    private val CLICK_DURATION_THRESHOLD = 200L // milliseconds
    private val MOVE_THRESHOLD = 15f // pixels

    private fun setupDragListener() {
        overlayView.setOnTouchListener { _, event ->
            when (event.action) {
                MotionEvent.ACTION_DOWN -> {
                    touchX = event.rawX
                    touchY = event.rawY
                    initialX = params.x
                    initialY = params.y
                    lastTouchDownTime = System.currentTimeMillis()
                    hasMovedBeyondThreshold = false
                    true
                }
                MotionEvent.ACTION_MOVE -> {
                    val deltaX = event.rawX - touchX
                    val deltaY = event.rawY - touchY
                    
                    if (!hasMovedBeyondThreshold && 
                        (Math.abs(deltaX) > MOVE_THRESHOLD || Math.abs(deltaY) > MOVE_THRESHOLD)) {
                        hasMovedBeyondThreshold = true
                    }
                    
                    // Always update position for smooth movement
                    params.x = initialX + deltaX.toInt()
                    params.y = initialY + deltaY.toInt()
                    try {
                        windowManager.updateViewLayout(overlayView, params)
                    } catch (e: Exception) {
                        android.util.Log.e("OverlayService", "Error updating view layout", e)
                    }
                    true
                }
                MotionEvent.ACTION_UP -> {
                    val touchDuration = System.currentTimeMillis() - lastTouchDownTime
                    if (!hasMovedBeyondThreshold && touchDuration < CLICK_DURATION_THRESHOLD) {
                        android.util.Log.d("OverlayService", "Click detected, toggling recording")
                        toggleRecording()
                    }
                    true
                }
                else -> false
            }
        }
    }

    private fun initializeTimer() {
        timerHandler = Handler(Looper.getMainLooper())
    }

    private fun toggleRecording() {
        isRecording = !isRecording
        updateRecordButtonState()
        
        if (isRecording) {
            startRecording()
        } else {
            stopRecording()
        }
    }

    private fun updateRecordButtonState() {
        recordButton.setImageResource(
            if (isRecording) {
                android.R.drawable.ic_media_pause
            } else {
                android.R.drawable.ic_btn_speak_now
            }
        )
        timerView.visibility = if (isRecording) View.VISIBLE else View.GONE
    }

    private fun startRecording() {
        android.util.Log.d("OverlayService", "Starting recording...")
        try {
            recordingSeconds = 0
            updateTimer()

            val intent = Intent(ACTION_START_RECORDING)
            intent.setPackage(applicationContext.packageName)
            sendBroadcast(intent)
        } catch (e: Exception) {
            android.util.Log.e("OverlayService", "Error starting recording", e)
            isRecording = false
            updateRecordButtonState()
        }
    }

    private fun stopRecording() {
        android.util.Log.d("OverlayService", "Stopping recording...")
        try {
            timerHandler.removeCallbacksAndMessages(null)

            val intent = Intent(ACTION_STOP_RECORDING)
            intent.setPackage(applicationContext.packageName)
            sendBroadcast(intent)
        } catch (e: Exception) {
            android.util.Log.e("OverlayService", "Error stopping recording", e)
        }
    }

    private fun updateTimer() {
        if (!isRecording) return

        val minutes = recordingSeconds / 60
        val seconds = recordingSeconds % 60
        timerView.text = String.format("%02d:%02d", minutes, seconds)
        recordingSeconds++

        timerHandler.postDelayed(::updateTimer, 1000)
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        if (overlayView.parent == null) {
            windowManager.addView(overlayView, params)
        }
        return START_STICKY
    }

    override fun onDestroy() {
        super.onDestroy()
        if (overlayView.parent != null) {
            windowManager.removeView(overlayView)
        }
        timerHandler.removeCallbacksAndMessages(null)
        textInsertReceiver?.let {
            unregisterReceiver(it)
            textInsertReceiver = null
        }
    }

    override fun onBind(intent: Intent?): IBinder? = null
}
