package com.transboard.app

import android.app.Service
import android.content.Intent
import android.graphics.PixelFormat
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

    override fun onCreate() {
        super.onCreate()
        windowManager = getSystemService(WINDOW_SERVICE) as WindowManager
        setupOverlayView()
        setupDragListener()
        initializeTimer()
    }

    private fun setupOverlayView() {
        overlayView = LayoutInflater.from(this).inflate(R.layout.overlay_view, null)
        recordButton = overlayView.findViewById(R.id.record_button)
        timerView = overlayView.findViewById(R.id.recording_timer)

        params = WindowManager.LayoutParams().apply {
            width = WindowManager.LayoutParams.WRAP_CONTENT
            height = WindowManager.LayoutParams.WRAP_CONTENT
            type = WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY
            flags = WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE
            format = PixelFormat.TRANSLUCENT
            gravity = Gravity.TOP or Gravity.START
            x = 0
            y = 100
        }

        recordButton.setOnClickListener { toggleRecording() }
    }

    private fun setupDragListener() {
        overlayView.setOnTouchListener { _, event ->
            when (event.action) {
                MotionEvent.ACTION_DOWN -> {
                    touchX = event.rawX
                    touchY = event.rawY
                    initialX = params.x
                    initialY = params.y
                    true
                }
                MotionEvent.ACTION_MOVE -> {
                    params.x = initialX + (event.rawX - touchX).toInt()
                    params.y = initialY + (event.rawY - touchY).toInt()
                    windowManager.updateViewLayout(overlayView, params)
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
        if (isRecording) startRecording() else stopRecording()
    }

    private fun startRecording() {
        recordButton.setImageResource(android.R.drawable.ic_media_pause)
        timerView.visibility = View.VISIBLE
        recordingSeconds = 0
        updateTimer()
        sendBroadcast(Intent("com.transboard.app.START_RECORDING"))
    }

    private fun stopRecording() {
        recordButton.setImageResource(android.R.drawable.ic_btn_speak_now)
        timerView.visibility = View.GONE
        timerHandler.removeCallbacksAndMessages(null)
        sendBroadcast(Intent("com.transboard.app.STOP_RECORDING"))
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
    }

    override fun onBind(intent: Intent?): IBinder? = null
}