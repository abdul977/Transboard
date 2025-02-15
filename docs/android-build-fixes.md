# Android Build Fixes for React Native and Reanimated

## Core Configuration

### 1. Gradle Configuration
In `android/gradle.properties`:
```properties
# Increase Gradle heap size
org.gradle.jvmargs=-Xmx4096m -XX:MaxMetaspaceSize=1024m -Dfile.encoding=UTF-8 -XX:+UseParallelGC

# Enable build cache and optimizations
org.gradle.caching=true
org.gradle.parallel=true
org.gradle.configureondemand=true
org.gradle.daemon=true
android.enableBuildCache=true

# Enable PNG crunching for release builds
android.enablePngCrunchInReleaseBuilds=true
```

### 2. CMake Configuration for Reanimated
In `android/app/src/main/jni/CMakeLists.txt`:
```cmake
# Set max path length for Windows build issues
set(CMAKE_OBJECT_PATH_MAX 259)  # Add 9 to default 250 if using arm64-v8a
```

### 3. Release Build Configuration
In `android/app/build.gradle`:
```gradle
release {
    signingConfig signingConfigs.debug
    buildConfigField "boolean", "IS_NEW_ARCHITECTURE_ENABLED", "false"
    buildConfigField "boolean", "IS_HERMES_ENABLED", "true"
    minifyEnabled true
    proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
    crunchPngs (findProperty('android.enablePngCrunchInReleaseBuilds')?.toBoolean() ?: true)
}
```

## Environment Setup

### 1. Android SDK Configuration
In `android/local.properties`:
```properties
sdk.dir=C:\\Users\\ABDULGANIYU IBRAHIM\\AppData\\Local\\Android\\Sdk
```

Common SDK locations:
- Windows: C:\Users\USERNAME\AppData\Local\Android\Sdk
- macOS: ~/Library/Android/sdk
- Linux: ~/Android/Sdk

### 2. Environment Variables
Recommended approaches for environment configuration:
1. `.env` files with react-native-config
2. JavaScript/TypeScript environment configuration
3. Build-specific constants through `buildConfigField`

## Dependency Management

### 1. Check for Duplicates
```bash
npm ls react-native-reanimated
```

### 2. Resolve Version Conflicts
Add to package.json if needed:
```json
{
  "resolutions": {
    "react-native-reanimated": "3.16.0"
  }
}
```

### 3. Update Dependencies
```bash
npm install react-native-reanimated@latest
```

## Build System Cleanup and Optimization

### 1. Clean Build Files
```bash
# Navigate to android directory
cd android

# Clean Gradle build
./gradlew clean

# Remove native build files
del /q/s .cxx build

# Return to project root
cd ..
```

### 2. Optimized Rebuild
```bash
npx react-native run-android --active-arch-only
```

## Build Release Version
1. Verify SDK configuration in local.properties
2. Clean project: `cd android && ./gradlew clean`
3. Build release: `./gradlew assembleRelease`

## Important Notes
- Do not commit local.properties to version control
- Verify SDK paths match your system configuration
- Release builds have code minification enabled
- Configure ProGuard rules in proguard-rules.pro
- Windows users: See windows-long-paths.md for path length solutions

## Troubleshooting

### Common Issues
1. Long path errors
   - See windows-long-paths.md for solutions
   - Consider using WSL2 for builds

2. Build failures
   - Verify Gradle and CMake configurations
   - Check for dependency conflicts
   - Clear .gradle and .cxx directories
   - Ensure SDK paths are correct

3. Memory issues
   - Increase Gradle heap size
   - Enable build cache
   - Use parallel builds

4. SDK-related issues
   - Verify SDK installation
   - Check local.properties paths
   - Set ANDROID_HOME environment variable
   - Run Android Studio SDK manager
