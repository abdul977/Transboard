# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# react-native-reanimated
-keep class com.swmansion.reanimated.** { *; }
-keep class com.facebook.react.turbomodule.** { *; }

# Keep our custom overlay module
-keep class com.transboard.app.** { *; }

# React Native Proguard Rules
-keep class com.facebook.hermes.unicode.** { *; }
-keep class com.facebook.jni.** { *; }

# Keep native methods
-keepclassmembers class * {
    @com.facebook.react.bridge.ReactMethod *;
    @com.facebook.react.bridge.ReactProp *;
}

# Keep bridge methods
-keepclassmembers class * extends com.facebook.react.bridge.ReactContextBaseJavaModule {
    @com.facebook.react.bridge.ReactMethod *;
}

# Keep custom view managers
-keepclassmembers class * extends com.facebook.react.uimanager.ViewManager {
    @com.facebook.react.uimanager.annotations.ReactProp *;
}

# Keep Expo classes
-keep class expo.modules.** { *; }

# Kotlin specific rules
-keepclassmembers class **$WhenMappings {
    <fields>;
}
-keepclassmembers class kotlin.Metadata {
    public <methods>;
}

# Ignore missing ReactNativeFlipper which is only needed in debug
-dontwarn com.transboard.app.ReactNativeFlipper
-dontwarn com.facebook.flipper.**
-dontwarn com.facebook.react.flipper.**

# Keep Kotlin metadata for proper reflection
-keepattributes *Annotation*, InnerClasses, Signature, Exceptions
