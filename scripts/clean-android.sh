#!/bin/bash

cd android

# Clean gradle caches
./gradlew clean

# Clean C++ build directories
find . -type d -name ".cxx" -exec rm -rf {} +
find . -type d -name "build" -exec rm -rf {} +

# Clean build files
rm -rf app/build

# Rebuild
./gradlew assembleDebug
