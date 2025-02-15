t/formatter_bool.h:17:
C/C++: In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__format/concepts.h:16:
C/C++: In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__format/format_parse_context.h:16:
C/C++: C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/string_view:299:43: error: implicit instantiation of undefined template 'std::char_traits<unsigned char>'
C/C++:   299 |   static_assert((is_same<_CharT, typename traits_type::char_type>::value),
C/C++:       |                                           ^
C/C++: C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__type_traits/is_constructible.h:22:79: note: in instantiation of template class 'std::basic_string_view<unsigned char>' requested here
C/C++:    22 | struct _LIBCPP_TEMPLATE_VIS is_constructible : public integral_constant<bool, __is_constructible(_Tp, _Args...)> {};
C/C++:       |                                                                               ^
C/C++: C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/folly/Traits.h:665:24: note: in instantiation of template class 'std::is_constructible<std::basic_string_view<unsigned char>, const unsigned char *const &, unsigned long>' requested here
C/C++:   665 |     : std::conditional<T::value, Conjunction<TList...>, T>::type {};
C/C++:       |                        ^
C/C++: C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/folly/Range.h:649:9: note: in instantiation of template class 'folly::Conjunction<std::is_constructible<std::basic_string_view<unsigned char>, const unsigned char *const &, unsigned long>, std::is_constructible<folly::Range<const char *>, std::basic_string_view<unsigned char>>>' requested here
C/C++:   649 |       : Conjunction<
C/C++:       |         ^
C/C++: C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/folly/Range.h:672:16: note: in instantiation of template class 'folly::Range<const unsigned char *>::IsConstructibleViaStringView<folly::Range<const char *>>' requested here   
C/C++:   672 |               !IsConstructibleViaStringView<Tgt>::value,
C/C++:       |                ^
C/C++: C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/folly/Range.h:674:22: note: while substituting prior template arguments into non-type template parameter [with Tgt = folly::Range<const char *>]
C/C++:   674 |   constexpr explicit operator Tgt() const noexcept(
C/C++:       |                      ^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
C/C++:   675 |       std::is_nothrow_constructible<Tgt, Iter const&, size_type>::value) {
C/C++:       |       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
C/C++:   676 |     return Tgt(b_, walk_size());
C/C++:       |     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
C/C++:   677 |   }
C/C++:       |   ~
C/C++: C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/folly/Range.h:1623:19: note: while substituting deduced template arguments into function template 'operator type-parameter-0-0' [with Tgt = folly::Range<const char *>, $1 = (no value)]
C/C++:  1623 |       StringPiece(haystack), StringPiece(needles));
C/C++:       |                   ^
C/C++: C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__fwd/string.h:23:29: note: template is declared here
C/C++:    23 | struct _LIBCPP_TEMPLATE_VIS char_traits;
C/C++:       |                             ^
C/C++: 1 error generated.

> Task :expo-modules-core:buildCMakeDebug[arm64-v8a] FAILED

> Task :react-native-reanimated:configureCMakeDebug[arm64-v8a]
C/C++: CMake Warning in src/main/cpp/worklets/CMakeLists.txt:
C/C++:   The object file directory
C/C++:     C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/react-native-reanimated/android/.cxx/Debug/2oeb115w/arm64-v8a/src/main/cpp/worklets/CMakeFiles/worklets.dir/./                                                                                                                                                   
C/C++:   has 194 characters.  The maximum full path to an object file is 250
C/C++:   characters (see CMAKE_OBJECT_PATH_MAX).  Object file
C/C++:     C_/Users/ABDULGANIYU_IBRAHIM/Pictures/New_folder/New_folder/Transboard/node_modules/react-native-reanimated/Common/cpp/worklets/Registries/EventHandlerRegistry.cpp. 
C/C++:   cannot be safely placed under this directory.  The build may not work
C/C++:   correctly.
C/C++: CMake Warning in src/main/cpp/reanimated/CMakeLists.txt:
C/C++:   The object file directory
C/C++:     C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/react-native-reanimated/android/.cxx/Debug/2oeb115w/arm64-v8a/src/main/cpp/reanimated/CMakeFiles/reanimated.dir/./
C/C++:   has 198 characters.  The maximum full path to an object file is 250
C/C++:   characters (see CMAKE_OBJECT_PATH_MAX).  Object file
C/C++:     C_/Users/ABDULGANIYU_IBRAHIM/Pictures/New_folder/New_folder/Transboard/node_modules/react-native-reanimated/Common/cpp/reanimated/LayoutAnimations/LayoutAnimationsUtils.cpp.o
C/C++:   cannot be safely placed under this directory.  The build may not work
C/C++:   correctly.

FAILURE: Build completed with 2 failures.

1: Task failed with an exception.
-----------
* What went wrong:
Execution failed for task ':react-native-screens:buildCMakeDebug[arm64-v8a]'.
> com.android.ide.common.process.ProcessException: ninja: Entering directory `C:\Users\ABDULGANIYU IBRAHIM\Pictures\New folder\New folder\Transboard\node_modules\react-native-screens\android\.cxx\Debug\5n4t5oe6\arm64-v8a'
  [1/6] Building CXX object CMakeFiles/rnscreens.dir/2b0e0d9627f377f7c8e67329f3735779/cpp/RNScreensTurboModule.cpp.o
  [2/6] Building CXX object CMakeFiles/rnscreens.dir/src/main/cpp/jni-adapter.cpp.o
  [3/6] Building CXX object CMakeFiles/rnscreens.dir/2b0e0d9627f377f7c8e67329f3735779/cpp/RNSScreenRemovalListener.cpp.o
  FAILED: CMakeFiles/rnscreens.dir/2b0e0d9627f377f7c8e67329f3735779/cpp/RNSScreenRemovalListener.cpp.o
  C:\Users\ABDULG~1\AppData\Local\Android\Sdk\ndk\280~1.130\TOOLCH~1\llvm\prebuilt\WINDOW~1\bin\CLANG_~1.EXE --target=aarch64-none-linux-android24 --sysroot="C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot" -DFOLLY_NO_CONFIG=1 -Drnscreens_EXPORTS -I"C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/react-native-screens/android/../cpp" -isystem "C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include" -isystem "C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/jsi/include" -isystem "C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/9ca3238344128cfd70a33cf330b92b9d/transformed/fbjni-0.6.0/prefab/modules/fbjni/include" -g -DANDROID -fdata-sections -ffunction-sections -funwind-tables -fstack-protector-strong -no-canonical-prefixes -D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security   -fno-limit-debug-info  -fPIC -std=c++20 -MD -MT CMakeFiles/rnscreens.dir/2b0e0d9627f377f7c8e67329f3735779/cpp/RNSScreenRemovalListener.cpp.o -MF CMakeFiles\rnscreens.dir\2b0e0d9627f377f7c8e67329f3735779\cpp\RNSScreenRemovalListener.cpp.o.d -o CMakeFiles/rnscreens.dir/2b0e0d9627f377f7c8e67329f3735779/cpp/RNSScreenRemovalListener.cpp.o -c "C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/react-native-screens/cpp/RNSScreenRemovalListener.cpp"
  In file included from C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/react-native-screens/cpp/RNSScreenRemovalListener.cpp:1:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/react-native-screens/cpp/RNSScreenRemovalListener.h:3:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/react/renderer/componentregistry/ComponentDescriptorFactory.h:12:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/react/renderer/core/ComponentDescriptor.h:10:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/react/renderer/core/EventDispatcher.h:10:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/react/renderer/core/EventBeat.h:10:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/jsi/include/jsi/jsi.h:13:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/functional:525:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__functional/boyer_moore_searcher.h:27:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/vector:325: 
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__format/formatter_bool.h:17:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__format/concepts.h:16:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__format/format_parse_context.h:16:
  C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/string_view:299:43: error: implicit instantiation of undefined template 'std::char_traits<unsigned char>'
    299 |   static_assert((is_same<_CharT, typename traits_type::char_type>::value),
        |                                           ^
  C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__type_traits/is_constructible.h:22:79: note: in instantiation of template class 'std::basic_string_view<unsigned char>' requested here
     22 | struct _LIBCPP_TEMPLATE_VIS is_constructible : public integral_constant<bool, __is_constructible(_Tp, _Args...)> {};
        |                                                                               ^
  C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/folly/Traits.h:665:24: note: in instantiation of template class 'std::is_constructible<std::basic_string_view<unsigned char>, const unsigned char *const &, unsigned long>' requested here
    665 |     : std::conditional<T::value, Conjunction<TList...>, T>::type {};
        |                        ^
  C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/folly/Range.h:649:9: note: in instantiation of template class 'folly::Conjunction<std::is_constructible<std::basic_string_view<unsigned char>, const unsigned char *const &, unsigned long>, std::is_constructible<folly::Range<const char *>, std::basic_string_view<unsigned char>>>' requested here
    649 |       : Conjunction<
        |         ^
  C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/folly/Range.h:672:16: note: in instantiation of template class 'folly::Range<const unsigned char *>::IsConstructibleViaStringView<folly::Range<const char *>>' requested here        
    672 |               !IsConstructibleViaStringView<Tgt>::value,
        |                ^
  C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/folly/Range.h:674:22: note: while substituting prior template arguments into non-type template parameter [with Tgt = folly::Range<const char *>]
    674 |   constexpr explicit operator Tgt() const noexcept(
        |                      ^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    675 |       std::is_nothrow_constructible<Tgt, Iter const&, size_type>::value) {
        |       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    676 |     return Tgt(b_, walk_size());
        |     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    677 |   }
        |   ~
  C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/folly/Range.h:1623:19: note: while substituting deduced template arguments into function template 'operator type-parameter-0-0' [with Tgt = folly::Range<const char *>, $1 = (no value)]
   1623 |       StringPiece(haystack), StringPiece(needles));
        |                   ^
  C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__fwd/string.h:23:29: note: template is declared here
     23 | struct _LIBCPP_TEMPLATE_VIS char_traits;
        |                             ^
  1 error generated.
  [4/6] Building CXX object CMakeFiles/rnscreens.dir/src/main/cpp/OnLoad.cpp.o
  FAILED: CMakeFiles/rnscreens.dir/src/main/cpp/OnLoad.cpp.o
  C:\Users\ABDULG~1\AppData\Local\Android\Sdk\ndk\280~1.130\TOOLCH~1\llvm\prebuilt\WINDOW~1\bin\CLANG_~1.EXE --target=aarch64-none-linux-android24 --sysroot="C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot" -DFOLLY_NO_CONFIG=1 -Drnscreens_EXPORTS -I"C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/react-native-screens/android/../cpp" -isystem "C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include" -isystem "C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/jsi/include" -isystem "C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/9ca3238344128cfd70a33cf330b92b9d/transformed/fbjni-0.6.0/prefab/modules/fbjni/include" -g -DANDROID -fdata-sections -ffunction-sections -funwind-tables -fstack-protector-strong -no-canonical-prefixes -D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security   -fno-limit-debug-info  -fPIC -std=c++20 -MD -MT CMakeFiles/rnscreens.dir/src/main/cpp/OnLoad.cpp.o -MF CMakeFiles\rnscreens.dir\src\main\cpp\OnLoad.cpp.o.d -o CMakeFiles/rnscreens.dir/src/main/cpp/OnLoad.cpp.o -c "C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/react-native-screens/android/src/main/cpp/OnLoad.cpp"
  In file included from C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/react-native-screens/android/src/main/cpp/OnLoad.cpp:1:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/9ca3238344128cfd70a33cf330b92b9d/transformed/fbjni-0.6.0/prefab/modules/fbjni/include/fbjni/fbjni.h:21:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/9ca3238344128cfd70a33cf330b92b9d/transformed/fbjni-0.6.0/prefab/modules/fbjni/include/fbjni/detail/Common.h:24:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/functional:525:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__functional/boyer_moore_searcher.h:27:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/vector:325: 
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__format/formatter_bool.h:17:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__format/concepts.h:16:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__format/format_parse_context.h:16:
  C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/string_view:299:43: error: implicit instantiation of undefined template 'std::char_traits<unsigned char>'
    299 |   static_assert((is_same<_CharT, typename traits_type::char_type>::value),
        |                                           ^
  C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__type_traits/is_constructible.h:22:79: note: in instantiation of template class 'std::basic_string_view<unsigned char>' requested here
     22 | struct _LIBCPP_TEMPLATE_VIS is_constructible : public integral_constant<bool, __is_constructible(_Tp, _Args...)> {};
        |                                                                               ^
  C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/folly/Traits.h:665:24: note: in instantiation of template class 'std::is_constructible<std::basic_string_view<unsigned char>, const unsigned char *const &, unsigned long>' requested here
    665 |     : std::conditional<T::value, Conjunction<TList...>, T>::type {};
        |                        ^
  C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/folly/Range.h:649:9: note: in instantiation of template class 'folly::Conjunction<std::is_constructible<std::basic_string_view<unsigned char>, const unsigned char *const &, unsigned long>, std::is_constructible<folly::Range<const char *>, std::basic_string_view<unsigned char>>>' requested here
    649 |       : Conjunction<
        |         ^
  C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/folly/Range.h:672:16: note: in instantiation of template class 'folly::Range<const unsigned char *>::IsConstructibleViaStringView<folly::Range<const char *>>' requested here        
    672 |               !IsConstructibleViaStringView<Tgt>::value,
        |                ^
  C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/folly/Range.h:674:22: note: while substituting prior template arguments into non-type template parameter [with Tgt = folly::Range<const char *>]
    674 |   constexpr explicit operator Tgt() const noexcept(
        |                      ^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    675 |       std::is_nothrow_constructible<Tgt, Iter const&, size_type>::value) {
        |       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    676 |     return Tgt(b_, walk_size());
        |     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    677 |   }
        |   ~
  C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/folly/Range.h:1623:19: note: while substituting deduced template arguments into function template 'operator type-parameter-0-0' [with Tgt = folly::Range<const char *>, $1 = (no value)]
   1623 |       StringPiece(haystack), StringPiece(needles));
        |                   ^
  C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__fwd/string.h:23:29: note: template is declared here
     23 | struct _LIBCPP_TEMPLATE_VIS char_traits;
        |                             ^
  1 error generated.
  [5/6] Building CXX object CMakeFiles/rnscreens.dir/src/main/cpp/NativeProxy.cpp.o
  FAILED: CMakeFiles/rnscreens.dir/src/main/cpp/NativeProxy.cpp.o
  C:\Users\ABDULG~1\AppData\Local\Android\Sdk\ndk\280~1.130\TOOLCH~1\llvm\prebuilt\WINDOW~1\bin\CLANG_~1.EXE --target=aarch64-none-linux-android24 --sysroot="C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot" -DFOLLY_NO_CONFIG=1 -Drnscreens_EXPORTS -I"C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/react-native-screens/android/../cpp" -isystem "C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include" -isystem "C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/jsi/include" -isystem "C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/9ca3238344128cfd70a33cf330b92b9d/transformed/fbjni-0.6.0/prefab/modules/fbjni/include" -g -DANDROID -fdata-sections -ffunction-sections -funwind-tables -fstack-protector-strong -no-canonical-prefixes -D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security   -fno-limit-debug-info  -fPIC -std=c++20 -MD -MT CMakeFiles/rnscreens.dir/src/main/cpp/NativeProxy.cpp.o -MF CMakeFiles\rnscreens.dir\src\main\cpp\NativeProxy.cpp.o.d -o CMakeFiles/rnscreens.dir/src/main/cpp/NativeProxy.cpp.o -c "C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/react-native-screens/android/src/main/cpp/NativeProxy.cpp"
  In file included from C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/react-native-screens/android/src/main/cpp/NativeProxy.cpp:1:        
  In file included from C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/9ca3238344128cfd70a33cf330b92b9d/transformed/fbjni-0.6.0/prefab/modules/fbjni/include/fbjni/fbjni.h:21:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/9ca3238344128cfd70a33cf330b92b9d/transformed/fbjni-0.6.0/prefab/modules/fbjni/include/fbjni/detail/Common.h:24:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/functional:525:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__functional/boyer_moore_searcher.h:27:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/vector:325: 
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__format/formatter_bool.h:17:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__format/concepts.h:16:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__format/format_parse_context.h:16:
  C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/string_view:299:43: error: implicit instantiation of undefined template 'std::char_traits<unsigned char>'
    299 |   static_assert((is_same<_CharT, typename traits_type::char_type>::value),
        |                                           ^
  C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__type_traits/is_constructible.h:22:79: note: in instantiation of template class 'std::basic_string_view<unsigned char>' requested here
     22 | struct _LIBCPP_TEMPLATE_VIS is_constructible : public integral_constant<bool, __is_constructible(_Tp, _Args...)> {};
        |                                                                               ^
  C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/folly/Traits.h:665:24: note: in instantiation of template class 'std::is_constructible<std::basic_string_view<unsigned char>, const unsigned char *const &, unsigned long>' requested here
    665 |     : std::conditional<T::value, Conjunction<TList...>, T>::type {};
        |                        ^
  C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/folly/Range.h:649:9: note: in instantiation of template class 'folly::Conjunction<std::is_constructible<std::basic_string_view<unsigned char>, const unsigned char *const &, unsigned long>, std::is_constructible<folly::Range<const char *>, std::basic_string_view<unsigned char>>>' requested here
    649 |       : Conjunction<
        |         ^
  C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/folly/Range.h:672:16: note: in instantiation of template class 'folly::Range<const unsigned char *>::IsConstructibleViaStringView<folly::Range<const char *>>' requested here        
    672 |               !IsConstructibleViaStringView<Tgt>::value,
        |                ^
  C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/folly/Range.h:674:22: note: while substituting prior template arguments into non-type template parameter [with Tgt = folly::Range<const char *>]
    674 |   constexpr explicit operator Tgt() const noexcept(
        |                      ^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    675 |       std::is_nothrow_constructible<Tgt, Iter const&, size_type>::value) {
        |       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    676 |     return Tgt(b_, walk_size());
        |     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    677 |   }
        |   ~
  C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/folly/Range.h:1623:19: note: while substituting deduced template arguments into function template 'operator type-parameter-0-0' [with Tgt = folly::Range<const char *>, $1 = (no value)]
   1623 |       StringPiece(haystack), StringPiece(needles));
        |                   ^
  C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__fwd/string.h:23:29: note: template is declared here
     23 | struct _LIBCPP_TEMPLATE_VIS char_traits;
        |                             ^
  1 error generated.
  ninja: build stopped: subcommand failed.

  C++ build system [build] failed while executing:
      @echo off
      "C:\\Users\\ABDULGANIYU IBRAHIM\\AppData\\Local\\Android\\Sdk\\cmake\\3.22.1\\bin\\ninja.exe" ^
        -C ^
        "C:\\Users\\ABDULGANIYU IBRAHIM\\Pictures\\New folder\\New folder\\Transboard\\node_modules\\react-native-screens\\android\\.cxx\\Debug\\5n4t5oe6\\arm64-v8a" ^
        rnscreens
    from C:\Users\ABDULGANIYU IBRAHIM\Pictures\New folder\New folder\Transboard\node_modules\react-native-screens\android

* Try:
> Run with --stacktrace option to get the stack trace.
> Run with --info or --debug option to get more log output.
> Run with --scan to get full insights.
> Get more help at https://help.gradle.org.
==============================================================================

2: Task failed with an exception.
-----------
* What went wrong:
Execution failed for task ':expo-modules-core:buildCMakeDebug[arm64-v8a]'.
> com.android.ide.common.process.ProcessException: ninja: Entering directory `C:\Users\ABDULGANIYU IBRAHIM\Pictures\New folder\New folder\Transboard\node_modules\expo-modules-core\android\.cxx\Debug\27361x4d\arm64-v8a'
  [1/47] Building CXX object CMakeFiles/expo-modules-core.dir/7e7f16b9c14c92969c33e4de85956b56/common/cpp/EventEmitter.cpp.o
  [2/47] Building CXX object CMakeFiles/expo-modules-core.dir/7e7f16b9c14c92969c33e4de85956b56/common/cpp/JSIUtils.cpp.o
  [3/47] Building CXX object CMakeFiles/expo-modules-core.dir/7e7f16b9c14c92969c33e4de85956b56/common/cpp/LazyObject.cpp.o
  [4/47] Building CXX object CMakeFiles/expo-modules-core.dir/7e7f16b9c14c92969c33e4de85956b56/common/cpp/ObjectDeallocator.cpp.o
  [5/47] Building CXX object CMakeFiles/expo-modules-core.dir/7e7f16b9c14c92969c33e4de85956b56/common/cpp/SharedObject.cpp.o
  [6/47] Building CXX object CMakeFiles/expo-modules-core.dir/7e7f16b9c14c92969c33e4de85956b56/common/cpp/NativeModule.cpp.o
  [7/47] Building CXX object CMakeFiles/expo-modules-core.dir/7e7f16b9c14c92969c33e4de85956b56/common/cpp/SharedRef.cpp.o
  [8/47] Building CXX object CMakeFiles/expo-modules-core.dir/7e7f16b9c14c92969c33e4de85956b56/common/cpp/TypedArray.cpp.o
  [9/47] Building CXX object CMakeFiles/expo-modules-core.dir/src/main/cpp/JNIDeallocator.cpp.o
  [10/47] Building CXX object CMakeFiles/expo-modules-core.dir/src/main/cpp/JSharedObject.cpp.o
  [11/47] Building CXX object CMakeFiles/expo-modules-core.dir/src/main/cpp/JSReferencesCache.cpp.o
  FAILED: CMakeFiles/expo-modules-core.dir/src/main/cpp/JSReferencesCache.cpp.o
  C:\Users\ABDULG~1\AppData\Local\Android\Sdk\ndk\280~1.130\TOOLCH~1\llvm\prebuilt\WINDOW~1\bin\CLANG_~1.EXE --target=aarch64-none-linux-android24 --sysroot="C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot" -Dexpo_modules_core_EXPORTS -I"C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/react" -I"C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/react-native/ReactAndroid/src/main/jni/react/turbomodule" -I"C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/expo-modules-core/android/../common/cpp" -I"C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/expo-modules-core/android/src/fabric" -isystem "C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/9ca3238344128cfd70a33cf330b92b9d/transformed/fbjni-0.6.0/prefab/modules/fbjni/include" -isystem "C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/jsi/include" -isystem "C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include" -g -DANDROID -fdata-sections -ffunction-sections -funwind-tables -fstack-protector-strong -no-canonical-prefixes -D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security   -DREACT_NATIVE_TARGET_VERSION=76 -fno-limit-debug-info  -fPIC -DFOLLY_NO_CONFIG=1 -DFOLLY_HAVE_CLOCK_GETTIME=1 -DFOLLY_USE_LIBCPP=1 -DFOLLY_CFG_NO_COROUTINES=1 -DFOLLY_MOBILE=1 -DFOLLY_HAVE_RECVMMSG=1 -DFOLLY_HAVE_PTHREAD=1 -DFOLLY_HAVE_XSI_STRERROR_R=1 -O2 -frtti -fexceptions -Wall -fstack-protector-all -DUSE_HERMES=0 -DUNIT_TEST=0 -DIS_NEW_ARCHITECTURE_ENABLED=1 -DRN_FABRIC_ENABLED=1 -std=gnu++20 -MD -MT CMakeFiles/expo-modules-core.dir/src/main/cpp/JSReferencesCache.cpp.o -MF CMakeFiles\expo-modules-core.dir\src\main\cpp\JSReferencesCache.cpp.o.d -o CMakeFiles/expo-modules-core.dir/src/main/cpp/JSReferencesCache.cpp.o -c "C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/expo-modules-core/android/src/main/cpp/JSReferencesCache.cpp"
  In file included from C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/expo-modules-core/android/src/main/cpp/JSReferencesCache.cpp:1:     
  In file included from C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/expo-modules-core/android/src/main/cpp/JSReferencesCache.h:5:       
  In file included from C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/expo-modules-core/android/src/main/cpp/JavaReferencesCache.h:5:     
  In file included from C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/9ca3238344128cfd70a33cf330b92b9d/transformed/fbjni-0.6.0/prefab/modules/fbjni/include/fbjni/fbjni.h:21:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/9ca3238344128cfd70a33cf330b92b9d/transformed/fbjni-0.6.0/prefab/modules/fbjni/include/fbjni/detail/Common.h:24:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/functional:525:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__functional/boyer_moore_searcher.h:27:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/vector:325: 
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__format/formatter_bool.h:17:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__format/concepts.h:16:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__format/format_parse_context.h:16:
  C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/string_view:299:43: error: implicit instantiation of undefined template 'std::char_traits<unsigned char>'
    299 |   static_assert((is_same<_CharT, typename traits_type::char_type>::value),
        |                                           ^
  C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__type_traits/is_constructible.h:22:79: note: in instantiation of template class 'std::basic_string_view<unsigned char>' requested here
     22 | struct _LIBCPP_TEMPLATE_VIS is_constructible : public integral_constant<bool, __is_constructible(_Tp, _Args...)> {};
        |                                                                               ^
  C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/folly/Traits.h:665:24: note: in instantiation of template class 'std::is_constructible<std::basic_string_view<unsigned char>, const unsigned char *const &, unsigned long>' requested here
    665 |     : std::conditional<T::value, Conjunction<TList...>, T>::type {};
        |                        ^
  C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/folly/Range.h:649:9: note: in instantiation of template class 'folly::Conjunction<std::is_constructible<std::basic_string_view<unsigned char>, const unsigned char *const &, unsigned long>, std::is_constructible<folly::Range<const char *>, std::basic_string_view<unsigned char>>>' requested here
    649 |       : Conjunction<
        |         ^
  C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/folly/Range.h:672:16: note: in instantiation of template class 'folly::Range<const unsigned char *>::IsConstructibleViaStringView<folly::Range<const char *>>' requested here        
    672 |               !IsConstructibleViaStringView<Tgt>::value,
        |                ^
  C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/folly/Range.h:674:22: note: while substituting prior template arguments into non-type template parameter [with Tgt = folly::Range<const char *>]
    674 |   constexpr explicit operator Tgt() const noexcept(
        |                      ^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    675 |       std::is_nothrow_constructible<Tgt, Iter const&, size_type>::value) {
        |       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    676 |     return Tgt(b_, walk_size());
        |     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    677 |   }
        |   ~
  C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/folly/Range.h:1623:19: note: while substituting deduced template arguments into function template 'operator type-parameter-0-0' [with Tgt = folly::Range<const char *>, $1 = (no value)]
   1623 |       StringPiece(haystack), StringPiece(needles));
        |                   ^
  C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__fwd/string.h:23:29: note: template is declared here
     23 | struct _LIBCPP_TEMPLATE_VIS char_traits;
        |                             ^
  1 error generated.
  [12/47] Building CXX object CMakeFiles/expo-modules-core.dir/src/main/cpp/Exceptions.cpp.o
  FAILED: CMakeFiles/expo-modules-core.dir/src/main/cpp/Exceptions.cpp.o
  C:\Users\ABDULG~1\AppData\Local\Android\Sdk\ndk\280~1.130\TOOLCH~1\llvm\prebuilt\WINDOW~1\bin\CLANG_~1.EXE --target=aarch64-none-linux-android24 --sysroot="C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot" -Dexpo_modules_core_EXPORTS -I"C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/react" -I"C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/react-native/ReactAndroid/src/main/jni/react/turbomodule" -I"C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/expo-modules-core/android/../common/cpp" -I"C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/expo-modules-core/android/src/fabric" -isystem "C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/9ca3238344128cfd70a33cf330b92b9d/transformed/fbjni-0.6.0/prefab/modules/fbjni/include" -isystem "C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/jsi/include" -isystem "C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include" -g -DANDROID -fdata-sections -ffunction-sections -funwind-tables -fstack-protector-strong -no-canonical-prefixes -D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security   -DREACT_NATIVE_TARGET_VERSION=76 -fno-limit-debug-info  -fPIC -DFOLLY_NO_CONFIG=1 -DFOLLY_HAVE_CLOCK_GETTIME=1 -DFOLLY_USE_LIBCPP=1 -DFOLLY_CFG_NO_COROUTINES=1 -DFOLLY_MOBILE=1 -DFOLLY_HAVE_RECVMMSG=1 -DFOLLY_HAVE_PTHREAD=1 -DFOLLY_HAVE_XSI_STRERROR_R=1 -O2 -frtti -fexceptions -Wall -fstack-protector-all -DUSE_HERMES=0 -DUNIT_TEST=0 -DIS_NEW_ARCHITECTURE_ENABLED=1 -DRN_FABRIC_ENABLED=1 -std=gnu++20 -MD -MT CMakeFiles/expo-modules-core.dir/src/main/cpp/Exceptions.cpp.o -MF CMakeFiles\expo-modules-core.dir\src\main\cpp\Exceptions.cpp.o.d -o CMakeFiles/expo-modules-core.dir/src/main/cpp/Exceptions.cpp.o -c "C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/expo-modules-core/android/src/main/cpp/Exceptions.cpp"
  In file included from C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/expo-modules-core/android/src/main/cpp/Exceptions.cpp:3:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/expo-modules-core/android/src/main/cpp/Exceptions.h:5:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/9ca3238344128cfd70a33cf330b92b9d/transformed/fbjni-0.6.0/prefab/modules/fbjni/include/fbjni/fbjni.h:21:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/9ca3238344128cfd70a33cf330b92b9d/transformed/fbjni-0.6.0/prefab/modules/fbjni/include/fbjni/detail/Common.h:24:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/functional:525:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__functional/boyer_moore_searcher.h:27:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/vector:325: 
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__format/formatter_bool.h:17:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__format/concepts.h:16:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__format/format_parse_context.h:16:
  C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/string_view:299:43: error: implicit instantiation of undefined template 'std::char_traits<unsigned char>'
    299 |   static_assert((is_same<_CharT, typename traits_type::char_type>::value),
        |                                           ^
  C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__type_traits/is_constructible.h:22:79: note: in instantiation of template class 'std::basic_string_view<unsigned char>' requested here
     22 | struct _LIBCPP_TEMPLATE_VIS is_constructible : public integral_constant<bool, __is_constructible(_Tp, _Args...)> {};
        |                                                                               ^
  C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/folly/Traits.h:665:24: note: in instantiation of template class 'std::is_constructible<std::basic_string_view<unsigned char>, const unsigned char *const &, unsigned long>' requested here
    665 |     : std::conditional<T::value, Conjunction<TList...>, T>::type {};
        |                        ^
  C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/folly/Range.h:649:9: note: in instantiation of template class 'folly::Conjunction<std::is_constructible<std::basic_string_view<unsigned char>, const unsigned char *const &, unsigned long>, std::is_constructible<folly::Range<const char *>, std::basic_string_view<unsigned char>>>' requested here
    649 |       : Conjunction<
        |         ^
  C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/folly/Range.h:672:16: note: in instantiation of template class 'folly::Range<const unsigned char *>::IsConstructibleViaStringView<folly::Range<const char *>>' requested here        
    672 |               !IsConstructibleViaStringView<Tgt>::value,
        |                ^
  C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/folly/Range.h:674:22: note: while substituting prior template arguments into non-type template parameter [with Tgt = folly::Range<const char *>]
    674 |   constexpr explicit operator Tgt() const noexcept(
        |                      ^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    675 |       std::is_nothrow_constructible<Tgt, Iter const&, size_type>::value) {
        |       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    676 |     return Tgt(b_, walk_size());
        |     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    677 |   }
        |   ~
  C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/folly/Range.h:1623:19: note: while substituting deduced template arguments into function template 'operator type-parameter-0-0' [with Tgt = folly::Range<const char *>, $1 = (no value)]
   1623 |       StringPiece(haystack), StringPiece(needles));
        |                   ^
  C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__fwd/string.h:23:29: note: template is declared here
     23 | struct _LIBCPP_TEMPLATE_VIS char_traits;
        |                             ^
  1 error generated.
  [13/47] Building CXX object CMakeFiles/expo-modules-core.dir/src/main/cpp/JNIFunctionBody.cpp.o
  FAILED: CMakeFiles/expo-modules-core.dir/src/main/cpp/JNIFunctionBody.cpp.o
  C:\Users\ABDULG~1\AppData\Local\Android\Sdk\ndk\280~1.130\TOOLCH~1\llvm\prebuilt\WINDOW~1\bin\CLANG_~1.EXE --target=aarch64-none-linux-android24 --sysroot="C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot" -Dexpo_modules_core_EXPORTS -I"C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/react" -I"C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/react-native/ReactAndroid/src/main/jni/react/turbomodule" -I"C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/expo-modules-core/android/../common/cpp" -I"C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/expo-modules-core/android/src/fabric" -isystem "C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/9ca3238344128cfd70a33cf330b92b9d/transformed/fbjni-0.6.0/prefab/modules/fbjni/include" -isystem "C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/jsi/include" -isystem "C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include" -g -DANDROID -fdata-sections -ffunction-sections -funwind-tables -fstack-protector-strong -no-canonical-prefixes -D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security   -DREACT_NATIVE_TARGET_VERSION=76 -fno-limit-debug-info  -fPIC -DFOLLY_NO_CONFIG=1 -DFOLLY_HAVE_CLOCK_GETTIME=1 -DFOLLY_USE_LIBCPP=1 -DFOLLY_CFG_NO_COROUTINES=1 -DFOLLY_MOBILE=1 -DFOLLY_HAVE_RECVMMSG=1 -DFOLLY_HAVE_PTHREAD=1 -DFOLLY_HAVE_XSI_STRERROR_R=1 -O2 -frtti -fexceptions -Wall -fstack-protector-all -DUSE_HERMES=0 -DUNIT_TEST=0 -DIS_NEW_ARCHITECTURE_ENABLED=1 -DRN_FABRIC_ENABLED=1 -std=gnu++20 -MD -MT CMakeFiles/expo-modules-core.dir/src/main/cpp/JNIFunctionBody.cpp.o -MF CMakeFiles\expo-modules-core.dir\src\main\cpp\JNIFunctionBody.cpp.o.d -o CMakeFiles/expo-modules-core.dir/src/main/cpp/JNIFunctionBody.cpp.o -c "C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/expo-modules-core/android/src/main/cpp/JNIFunctionBody.cpp"
  In file included from C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/expo-modules-core/android/src/main/cpp/JNIFunctionBody.cpp:3:       
  In file included from C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/expo-modules-core/android/src/main/cpp/JNIFunctionBody.h:5:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/9ca3238344128cfd70a33cf330b92b9d/transformed/fbjni-0.6.0/prefab/modules/fbjni/include/fbjni/fbjni.h:21:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/9ca3238344128cfd70a33cf330b92b9d/transformed/fbjni-0.6.0/prefab/modules/fbjni/include/fbjni/detail/Common.h:24:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/functional:525:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__functional/boyer_moore_searcher.h:27:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/vector:325: 
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__format/formatter_bool.h:17:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__format/concepts.h:16:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__format/format_parse_context.h:16:
  C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/string_view:299:43: error: implicit instantiation of undefined template 'std::char_traits<unsigned char>'
    299 |   static_assert((is_same<_CharT, typename traits_type::char_type>::value),
        |                                           ^
  C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__type_traits/is_constructible.h:22:79: note: in instantiation of template class 'std::basic_string_view<unsigned char>' requested here
     22 | struct _LIBCPP_TEMPLATE_VIS is_constructible : public integral_constant<bool, __is_constructible(_Tp, _Args...)> {};
        |                                                                               ^
  C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/folly/Traits.h:665:24: note: in instantiation of template class 'std::is_constructible<std::basic_string_view<unsigned char>, const unsigned char *const &, unsigned long>' requested here
    665 |     : std::conditional<T::value, Conjunction<TList...>, T>::type {};
        |                        ^
  C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/folly/Range.h:649:9: note: in instantiation of template class 'folly::Conjunction<std::is_constructible<std::basic_string_view<unsigned char>, const unsigned char *const &, unsigned long>, std::is_constructible<folly::Range<const char *>, std::basic_string_view<unsigned char>>>' requested here
    649 |       : Conjunction<
        |         ^
  C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/folly/Range.h:672:16: note: in instantiation of template class 'folly::Range<const unsigned char *>::IsConstructibleViaStringView<folly::Range<const char *>>' requested here        
    672 |               !IsConstructibleViaStringView<Tgt>::value,
        |                ^
  C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/folly/Range.h:674:22: note: while substituting prior template arguments into non-type template parameter [with Tgt = folly::Range<const char *>]
    674 |   constexpr explicit operator Tgt() const noexcept(
        |                      ^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    675 |       std::is_nothrow_constructible<Tgt, Iter const&, size_type>::value) {
        |       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    676 |     return Tgt(b_, walk_size());
        |     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    677 |   }
        |   ~
  C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/folly/Range.h:1623:19: note: while substituting deduced template arguments into function template 'operator type-parameter-0-0' [with Tgt = folly::Range<const char *>, $1 = (no value)]
   1623 |       StringPiece(haystack), StringPiece(needles));
        |                   ^
  C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__fwd/string.h:23:29: note: template is declared here
     23 | struct _LIBCPP_TEMPLATE_VIS char_traits;
        |                             ^
  1 error generated.
  [14/47] Building CXX object CMakeFiles/expo-modules-core.dir/src/main/cpp/JavaReferencesCache.cpp.o
  [15/47] Building CXX object CMakeFiles/expo-modules-core.dir/src/main/cpp/JNIUtils.cpp.o
  FAILED: CMakeFiles/expo-modules-core.dir/src/main/cpp/JNIUtils.cpp.o
  C:\Users\ABDULG~1\AppData\Local\Android\Sdk\ndk\280~1.130\TOOLCH~1\llvm\prebuilt\WINDOW~1\bin\CLANG_~1.EXE --target=aarch64-none-linux-android24 --sysroot="C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot" -Dexpo_modules_core_EXPORTS -I"C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/react" -I"C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/react-native/ReactAndroid/src/main/jni/react/turbomodule" -I"C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/expo-modules-core/android/../common/cpp" -I"C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/expo-modules-core/android/src/fabric" -isystem "C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/9ca3238344128cfd70a33cf330b92b9d/transformed/fbjni-0.6.0/prefab/modules/fbjni/include" -isystem "C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/jsi/include" -isystem "C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include" -g -DANDROID -fdata-sections -ffunction-sections -funwind-tables -fstack-protector-strong -no-canonical-prefixes -D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security   -DREACT_NATIVE_TARGET_VERSION=76 -fno-limit-debug-info  -fPIC -DFOLLY_NO_CONFIG=1 -DFOLLY_HAVE_CLOCK_GETTIME=1 -DFOLLY_USE_LIBCPP=1 -DFOLLY_CFG_NO_COROUTINES=1 -DFOLLY_MOBILE=1 -DFOLLY_HAVE_RECVMMSG=1 -DFOLLY_HAVE_PTHREAD=1 -DFOLLY_HAVE_XSI_STRERROR_R=1 -O2 -frtti -fexceptions -Wall -fstack-protector-all -DUSE_HERMES=0 -DUNIT_TEST=0 -DIS_NEW_ARCHITECTURE_ENABLED=1 -DRN_FABRIC_ENABLED=1 -std=gnu++20 -MD -MT CMakeFiles/expo-modules-core.dir/src/main/cpp/JNIUtils.cpp.o -MF CMakeFiles\expo-modules-core.dir\src\main\cpp\JNIUtils.cpp.o.d -o CMakeFiles/expo-modules-core.dir/src/main/cpp/JNIUtils.cpp.o -c "C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/expo-modules-core/android/src/main/cpp/JNIUtils.cpp"
  In file included from C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/expo-modules-core/android/src/main/cpp/JNIUtils.cpp:3:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/expo-modules-core/android/src/main/cpp/JNIUtils.h:5:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/vector:325: 
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__format/formatter_bool.h:17:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__format/concepts.h:16:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__format/format_parse_context.h:16:
  C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/string_view:299:43: error: implicit instantiation of undefined template 'std::char_traits<unsigned char>'
    299 |   static_assert((is_same<_CharT, typename traits_type::char_type>::value),
        |                                           ^
  C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__type_traits/is_constructible.h:22:79: note: in instantiation of template class 'std::basic_string_view<unsigned char>' requested here
     22 | struct _LIBCPP_TEMPLATE_VIS is_constructible : public integral_constant<bool, __is_constructible(_Tp, _Args...)> {};
        |                                                                               ^
  C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/folly/Traits.h:665:24: note: in instantiation of template class 'std::is_constructible<std::basic_string_view<unsigned char>, const unsigned char *const &, unsigned long>' requested here
    665 |     : std::conditional<T::value, Conjunction<TList...>, T>::type {};
        |                        ^
  C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/folly/Range.h:649:9: note: in instantiation of template class 'folly::Conjunction<std::is_constructible<std::basic_string_view<unsigned char>, const unsigned char *const &, unsigned long>, std::is_constructible<folly::Range<const char *>, std::basic_string_view<unsigned char>>>' requested here
    649 |       : Conjunction<
        |         ^
  C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/folly/Range.h:672:16: note: in instantiation of template class 'folly::Range<const unsigned char *>::IsConstructibleViaStringView<folly::Range<const char *>>' requested here        
    672 |               !IsConstructibleViaStringView<Tgt>::value,
        |                ^
  C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/folly/Range.h:674:22: note: while substituting prior template arguments into non-type template parameter [with Tgt = folly::Range<const char *>]
    674 |   constexpr explicit operator Tgt() const noexcept(
        |                      ^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    675 |       std::is_nothrow_constructible<Tgt, Iter const&, size_type>::value) {
        |       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    676 |     return Tgt(b_, walk_size());
        |     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    677 |   }
        |   ~
  C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/folly/Range.h:1623:19: note: while substituting deduced template arguments into function template 'operator type-parameter-0-0' [with Tgt = folly::Range<const char *>, $1 = (no value)]
   1623 |       StringPiece(haystack), StringPiece(needles));
        |                   ^
  C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__fwd/string.h:23:29: note: template is declared here
     23 | struct _LIBCPP_TEMPLATE_VIS char_traits;
        |                             ^
  1 error generated.
  [16/47] Building CXX object CMakeFiles/expo-modules-core.dir/src/main/cpp/JNIInjector.cpp.o
  FAILED: CMakeFiles/expo-modules-core.dir/src/main/cpp/JNIInjector.cpp.o
  C:\Users\ABDULG~1\AppData\Local\Android\Sdk\ndk\280~1.130\TOOLCH~1\llvm\prebuilt\WINDOW~1\bin\CLANG_~1.EXE --target=aarch64-none-linux-android24 --sysroot="C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot" -Dexpo_modules_core_EXPORTS -I"C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/react" -I"C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/react-native/ReactAndroid/src/main/jni/react/turbomodule" -I"C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/expo-modules-core/android/../common/cpp" -I"C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/expo-modules-core/android/src/fabric" -isystem "C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/9ca3238344128cfd70a33cf330b92b9d/transformed/fbjni-0.6.0/prefab/modules/fbjni/include" -isystem "C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/jsi/include" -isystem "C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include" -g -DANDROID -fdata-sections -ffunction-sections -funwind-tables -fstack-protector-strong -no-canonical-prefixes -D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security   -DREACT_NATIVE_TARGET_VERSION=76 -fno-limit-debug-info  -fPIC -DFOLLY_NO_CONFIG=1 -DFOLLY_HAVE_CLOCK_GETTIME=1 -DFOLLY_USE_LIBCPP=1 -DFOLLY_CFG_NO_COROUTINES=1 -DFOLLY_MOBILE=1 -DFOLLY_HAVE_RECVMMSG=1 -DFOLLY_HAVE_PTHREAD=1 -DFOLLY_HAVE_XSI_STRERROR_R=1 -O2 -frtti -fexceptions -Wall -fstack-protector-all -DUSE_HERMES=0 -DUNIT_TEST=0 -DIS_NEW_ARCHITECTURE_ENABLED=1 -DRN_FABRIC_ENABLED=1 -std=gnu++20 -MD -MT CMakeFiles/expo-modules-core.dir/src/main/cpp/JNIInjector.cpp.o -MF CMakeFiles\expo-modules-core.dir\src\main\cpp\JNIInjector.cpp.o.d -o CMakeFiles/expo-modules-core.dir/src/main/cpp/JNIInjector.cpp.o -c "C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/expo-modules-core/android/src/main/cpp/JNIInjector.cpp"
  In file included from C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/expo-modules-core/android/src/main/cpp/JNIInjector.cpp:3:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/expo-modules-core/android/src/main/cpp/RuntimeHolder.h:5:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/9ca3238344128cfd70a33cf330b92b9d/transformed/fbjni-0.6.0/prefab/modules/fbjni/include/fbjni/fbjni.h:21:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/9ca3238344128cfd70a33cf330b92b9d/transformed/fbjni-0.6.0/prefab/modules/fbjni/include/fbjni/detail/Common.h:24:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/functional:525:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__functional/boyer_moore_searcher.h:27:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/vector:325: 
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__format/formatter_bool.h:17:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__format/concepts.h:16:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__format/format_parse_context.h:16:
  C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/string_view:299:43: error: implicit instantiation of undefined template 'std::char_traits<unsigned char>'
    299 |   static_assert((is_same<_CharT, typename traits_type::char_type>::value),
        |                                           ^
  C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__type_traits/is_constructible.h:22:79: note: in instantiation of template class 'std::basic_string_view<unsigned char>' requested here
     22 | struct _LIBCPP_TEMPLATE_VIS is_constructible : public integral_constant<bool, __is_constructible(_Tp, _Args...)> {};
        |                                                                               ^
  C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/folly/Traits.h:665:24: note: in instantiation of template class 'std::is_constructible<std::basic_string_view<unsigned char>, const unsigned char *const &, unsigned long>' requested here
    665 |     : std::conditional<T::value, Conjunction<TList...>, T>::type {};
        |                        ^
  C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/folly/Range.h:649:9: note: in instantiation of template class 'folly::Conjunction<std::is_constructible<std::basic_string_view<unsigned char>, const unsigned char *const &, unsigned long>, std::is_constructible<folly::Range<const char *>, std::basic_string_view<unsigned char>>>' requested here
    649 |       : Conjunction<
        |         ^
  C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/folly/Range.h:672:16: note: in instantiation of template class 'folly::Range<const unsigned char *>::IsConstructibleViaStringView<folly::Range<const char *>>' requested here        
    672 |               !IsConstructibleViaStringView<Tgt>::value,
        |                ^
  C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/folly/Range.h:674:22: note: while substituting prior template arguments into non-type template parameter [with Tgt = folly::Range<const char *>]
    674 |   constexpr explicit operator Tgt() const noexcept(
        |                      ^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    675 |       std::is_nothrow_constructible<Tgt, Iter const&, size_type>::value) {
        |       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    676 |     return Tgt(b_, walk_size());
        |     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    677 |   }
        |   ~
  C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/folly/Range.h:1623:19: note: while substituting deduced template arguments into function template 'operator type-parameter-0-0' [with Tgt = folly::Range<const char *>, $1 = (no value)]
   1623 |       StringPiece(haystack), StringPiece(needles));
        |                   ^
  C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__fwd/string.h:23:29: note: template is declared here
     23 | struct _LIBCPP_TEMPLATE_VIS char_traits;
        |                             ^
  1 error generated.
  [17/47] Building CXX object CMakeFiles/expo-modules-core.dir/src/main/cpp/JSIContext.cpp.o
  FAILED: CMakeFiles/expo-modules-core.dir/src/main/cpp/JSIContext.cpp.o
  C:\Users\ABDULG~1\AppData\Local\Android\Sdk\ndk\280~1.130\TOOLCH~1\llvm\prebuilt\WINDOW~1\bin\CLANG_~1.EXE --target=aarch64-none-linux-android24 --sysroot="C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot" -Dexpo_modules_core_EXPORTS -I"C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/react" -I"C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/react-native/ReactAndroid/src/main/jni/react/turbomodule" -I"C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/expo-modules-core/android/../common/cpp" -I"C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/expo-modules-core/android/src/fabric" -isystem "C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/9ca3238344128cfd70a33cf330b92b9d/transformed/fbjni-0.6.0/prefab/modules/fbjni/include" -isystem "C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/jsi/include" -isystem "C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include" -g -DANDROID -fdata-sections -ffunction-sections -funwind-tables -fstack-protector-strong -no-canonical-prefixes -D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security   -DREACT_NATIVE_TARGET_VERSION=76 -fno-limit-debug-info  -fPIC -DFOLLY_NO_CONFIG=1 -DFOLLY_HAVE_CLOCK_GETTIME=1 -DFOLLY_USE_LIBCPP=1 -DFOLLY_CFG_NO_COROUTINES=1 -DFOLLY_MOBILE=1 -DFOLLY_HAVE_RECVMMSG=1 -DFOLLY_HAVE_PTHREAD=1 -DFOLLY_HAVE_XSI_STRERROR_R=1 -O2 -frtti -fexceptions -Wall -fstack-protector-all -DUSE_HERMES=0 -DUNIT_TEST=0 -DIS_NEW_ARCHITECTURE_ENABLED=1 -DRN_FABRIC_ENABLED=1 -std=gnu++20 -MD -MT CMakeFiles/expo-modules-core.dir/src/main/cpp/JSIContext.cpp.o -MF CMakeFiles\expo-modules-core.dir\src\main\cpp\JSIContext.cpp.o.d -o CMakeFiles/expo-modules-core.dir/src/main/cpp/JSIContext.cpp.o -c "C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/expo-modules-core/android/src/main/cpp/JSIContext.cpp"
  In file included from C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/expo-modules-core/android/src/main/cpp/JSIContext.cpp:3:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/expo-modules-core/android/src/main/cpp/JSIContext.h:5:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/expo-modules-core/android/src/main/cpp/JavaScriptRuntime.h:5:       
  In file included from C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/expo-modules-core/android/src/main/cpp/JNIDeallocator.h:5:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/9ca3238344128cfd70a33cf330b92b9d/transformed/fbjni-0.6.0/prefab/modules/fbjni/include/fbjni/fbjni.h:21:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/9ca3238344128cfd70a33cf330b92b9d/transformed/fbjni-0.6.0/prefab/modules/fbjni/include/fbjni/detail/Common.h:24:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/functional:525:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__functional/boyer_moore_searcher.h:27:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/vector:325: 
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__format/formatter_bool.h:17:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__format/concepts.h:16:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__format/format_parse_context.h:16:
  C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/string_view:299:43: error: implicit instantiation of undefined template 'std::char_traits<unsigned char>'
    299 |   static_assert((is_same<_CharT, typename traits_type::char_type>::value),
        |                                           ^
  C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__type_traits/is_constructible.h:22:79: note: in instantiation of template class 'std::basic_string_view<unsigned char>' requested here
     22 | struct _LIBCPP_TEMPLATE_VIS is_constructible : public integral_constant<bool, __is_constructible(_Tp, _Args...)> {};
        |                                                                               ^
  C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/folly/Traits.h:665:24: note: in instantiation of template class 'std::is_constructible<std::basic_string_view<unsigned char>, const unsigned char *const &, unsigned long>' requested here
    665 |     : std::conditional<T::value, Conjunction<TList...>, T>::type {};
        |                        ^
  C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/folly/Range.h:649:9: note: in instantiation of template class 'folly::Conjunction<std::is_constructible<std::basic_string_view<unsigned char>, const unsigned char *const &, unsigned long>, std::is_constructible<folly::Range<const char *>, std::basic_string_view<unsigned char>>>' requested here
    649 |       : Conjunction<
        |         ^
  C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/folly/Range.h:672:16: note: in instantiation of template class 'folly::Range<const unsigned char *>::IsConstructibleViaStringView<folly::Range<const char *>>' requested here        
    672 |               !IsConstructibleViaStringView<Tgt>::value,
        |                ^
  C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/folly/Range.h:674:22: note: while substituting prior template arguments into non-type template parameter [with Tgt = folly::Range<const char *>]
    674 |   constexpr explicit operator Tgt() const noexcept(
        |                      ^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    675 |       std::is_nothrow_constructible<Tgt, Iter const&, size_type>::value) {
        |       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    676 |     return Tgt(b_, walk_size());
        |     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    677 |   }
        |   ~
  C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/folly/Range.h:1623:19: note: while substituting deduced template arguments into function template 'operator type-parameter-0-0' [with Tgt = folly::Range<const char *>, $1 = (no value)]
   1623 |       StringPiece(haystack), StringPiece(needles));
        |                   ^
  C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__fwd/string.h:23:29: note: template is declared here
     23 | struct _LIBCPP_TEMPLATE_VIS char_traits;
        |                             ^
  1 error generated.
  [18/47] Building CXX object CMakeFiles/expo-modules-core.dir/src/main/cpp/ExpoModulesHostObject.cpp.o
  FAILED: CMakeFiles/expo-modules-core.dir/src/main/cpp/ExpoModulesHostObject.cpp.o
  C:\Users\ABDULG~1\AppData\Local\Android\Sdk\ndk\280~1.130\TOOLCH~1\llvm\prebuilt\WINDOW~1\bin\CLANG_~1.EXE --target=aarch64-none-linux-android24 --sysroot="C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot" -Dexpo_modules_core_EXPORTS -I"C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/react" -I"C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/react-native/ReactAndroid/src/main/jni/react/turbomodule" -I"C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/expo-modules-core/android/../common/cpp" -I"C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/expo-modules-core/android/src/fabric" -isystem "C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/9ca3238344128cfd70a33cf330b92b9d/transformed/fbjni-0.6.0/prefab/modules/fbjni/include" -isystem "C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/jsi/include" -isystem "C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include" -g -DANDROID -fdata-sections -ffunction-sections -funwind-tables -fstack-protector-strong -no-canonical-prefixes -D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security   -DREACT_NATIVE_TARGET_VERSION=76 -fno-limit-debug-info  -fPIC -DFOLLY_NO_CONFIG=1 -DFOLLY_HAVE_CLOCK_GETTIME=1 -DFOLLY_USE_LIBCPP=1 -DFOLLY_CFG_NO_COROUTINES=1 -DFOLLY_MOBILE=1 -DFOLLY_HAVE_RECVMMSG=1 -DFOLLY_HAVE_PTHREAD=1 -DFOLLY_HAVE_XSI_STRERROR_R=1 -O2 -frtti -fexceptions -Wall -fstack-protector-all -DUSE_HERMES=0 -DUNIT_TEST=0 -DIS_NEW_ARCHITECTURE_ENABLED=1 -DRN_FABRIC_ENABLED=1 -std=gnu++20 -MD -MT CMakeFiles/expo-modules-core.dir/src/main/cpp/ExpoModulesHostObject.cpp.o -MF CMakeFiles\expo-modules-core.dir\src\main\cpp\ExpoModulesHostObject.cpp.o.d -o CMakeFiles/expo-modules-core.dir/src/main/cpp/ExpoModulesHostObject.cpp.o -c "C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/expo-modules-core/android/src/main/cpp/ExpoModulesHostObject.cpp"
  In file included from C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/expo-modules-core/android/src/main/cpp/ExpoModulesHostObject.cpp:3: 
  In file included from C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/expo-modules-core/android/src/main/cpp/ExpoModulesHostObject.h:5:   
  In file included from C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/expo-modules-core/android/src/main/cpp/JSIContext.h:5:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/expo-modules-core/android/src/main/cpp/JavaScriptRuntime.h:5:       
  In file included from C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/expo-modules-core/android/src/main/cpp/JNIDeallocator.h:5:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/9ca3238344128cfd70a33cf330b92b9d/transformed/fbjni-0.6.0/prefab/modules/fbjni/include/fbjni/fbjni.h:21:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/9ca3238344128cfd70a33cf330b92b9d/transformed/fbjni-0.6.0/prefab/modules/fbjni/include/fbjni/detail/Common.h:24:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/functional:525:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__functional/boyer_moore_searcher.h:27:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/vector:325: 
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__format/formatter_bool.h:17:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__format/concepts.h:16:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__format/format_parse_context.h:16:
  C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/string_view:299:43: error: implicit instantiation of undefined template 'std::char_traits<unsigned char>'
    299 |   static_assert((is_same<_CharT, typename traits_type::char_type>::value),
        |                                           ^
  C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__type_traits/is_constructible.h:22:79: note: in instantiation of template class 'std::basic_string_view<unsigned char>' requested here
     22 | struct _LIBCPP_TEMPLATE_VIS is_constructible : public integral_constant<bool, __is_constructible(_Tp, _Args...)> {};
        |                                                                               ^
  C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/folly/Traits.h:665:24: note: in instantiation of template class 'std::is_constructible<std::basic_string_view<unsigned char>, const unsigned char *const &, unsigned long>' requested here
    665 |     : std::conditional<T::value, Conjunction<TList...>, T>::type {};
        |                        ^
  C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/folly/Range.h:649:9: note: in instantiation of template class 'folly::Conjunction<std::is_constructible<std::basic_string_view<unsigned char>, const unsigned char *const &, unsigned long>, std::is_constructible<folly::Range<const char *>, std::basic_string_view<unsigned char>>>' requested here
    649 |       : Conjunction<
        |         ^
  C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/folly/Range.h:672:16: note: in instantiation of template class 'folly::Range<const unsigned char *>::IsConstructibleViaStringView<folly::Range<const char *>>' requested here        
    672 |               !IsConstructibleViaStringView<Tgt>::value,
        |                ^
  C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/folly/Range.h:674:22: note: while substituting prior template arguments into non-type template parameter [with Tgt = folly::Range<const char *>]
    674 |   constexpr explicit operator Tgt() const noexcept(
        |                      ^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    675 |       std::is_nothrow_constructible<Tgt, Iter const&, size_type>::value) {
        |       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    676 |     return Tgt(b_, walk_size());
        |     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    677 |   }
        |   ~
  C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/folly/Range.h:1623:19: note: while substituting deduced template arguments into function template 'operator type-parameter-0-0' [with Tgt = folly::Range<const char *>, $1 = (no value)]
   1623 |       StringPiece(haystack), StringPiece(needles));
        |                   ^
  C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__fwd/string.h:23:29: note: template is declared here
     23 | struct _LIBCPP_TEMPLATE_VIS char_traits;
        |                             ^
  1 error generated.
  [19/47] Building CXX object CMakeFiles/expo-modules-core.dir/src/main/cpp/JavaScriptObject.cpp.o
  FAILED: CMakeFiles/expo-modules-core.dir/src/main/cpp/JavaScriptObject.cpp.o
  C:\Users\ABDULG~1\AppData\Local\Android\Sdk\ndk\280~1.130\TOOLCH~1\llvm\prebuilt\WINDOW~1\bin\CLANG_~1.EXE --target=aarch64-none-linux-android24 --sysroot="C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot" -Dexpo_modules_core_EXPORTS -I"C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/react" -I"C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/react-native/ReactAndroid/src/main/jni/react/turbomodule" -I"C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/expo-modules-core/android/../common/cpp" -I"C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/expo-modules-core/android/src/fabric" -isystem "C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/9ca3238344128cfd70a33cf330b92b9d/transformed/fbjni-0.6.0/prefab/modules/fbjni/include" -isystem "C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/jsi/include" -isystem "C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include" -g -DANDROID -fdata-sections -ffunction-sections -funwind-tables -fstack-protector-strong -no-canonical-prefixes -D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security   -DREACT_NATIVE_TARGET_VERSION=76 -fno-limit-debug-info  -fPIC -DFOLLY_NO_CONFIG=1 -DFOLLY_HAVE_CLOCK_GETTIME=1 -DFOLLY_USE_LIBCPP=1 -DFOLLY_CFG_NO_COROUTINES=1 -DFOLLY_MOBILE=1 -DFOLLY_HAVE_RECVMMSG=1 -DFOLLY_HAVE_PTHREAD=1 -DFOLLY_HAVE_XSI_STRERROR_R=1 -O2 -frtti -fexceptions -Wall -fstack-protector-all -DUSE_HERMES=0 -DUNIT_TEST=0 -DIS_NEW_ARCHITECTURE_ENABLED=1 -DRN_FABRIC_ENABLED=1 -std=gnu++20 -MD -MT CMakeFiles/expo-modules-core.dir/src/main/cpp/JavaScriptObject.cpp.o -MF CMakeFiles\expo-modules-core.dir\src\main\cpp\JavaScriptObject.cpp.o.d -o CMakeFiles/expo-modules-core.dir/src/main/cpp/JavaScriptObject.cpp.o -c "C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/expo-modules-core/android/src/main/cpp/JavaScriptObject.cpp"
  In file included from C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/expo-modules-core/android/src/main/cpp/JavaScriptObject.cpp:3:      
  In file included from C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/expo-modules-core/android/src/main/cpp/JavaScriptObject.h:5:        
  In file included from C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/expo-modules-core/android/src/main/cpp/JSIObjectWrapper.h:5:        
  In file included from C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/jsi/include/jsi/jsi.h:13:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/functional:525:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__functional/boyer_moore_searcher.h:27:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/vector:325: 
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__format/formatter_bool.h:17:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__format/concepts.h:16:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__format/format_parse_context.h:16:
  C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/string_view:299:43: error: implicit instantiation of undefined template 'std::char_traits<unsigned char>'
    299 |   static_assert((is_same<_CharT, typename traits_type::char_type>::value),
        |                                           ^
  C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__type_traits/is_constructible.h:22:79: note: in instantiation of template class 'std::basic_string_view<unsigned char>' requested here
     22 | struct _LIBCPP_TEMPLATE_VIS is_constructible : public integral_constant<bool, __is_constructible(_Tp, _Args...)> {};
        |                                                                               ^
  C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/folly/Traits.h:665:24: note: in instantiation of template class 'std::is_constructible<std::basic_string_view<unsigned char>, const unsigned char *const &, unsigned long>' requested here
    665 |     : std::conditional<T::value, Conjunction<TList...>, T>::type {};
        |                        ^
  C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/folly/Range.h:649:9: note: in instantiation of template class 'folly::Conjunction<std::is_constructible<std::basic_string_view<unsigned char>, const unsigned char *const &, unsigned long>, std::is_constructible<folly::Range<const char *>, std::basic_string_view<unsigned char>>>' requested here
    649 |       : Conjunction<
        |         ^
  C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/folly/Range.h:672:16: note: in instantiation of template class 'folly::Range<const unsigned char *>::IsConstructibleViaStringView<folly::Range<const char *>>' requested here
    672 |               !IsConstructibleViaStringView<Tgt>::value,
        |                ^
  C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/folly/Range.h:674:22: note: while substituting prior template arguments into non-type template parameter [with Tgt = folly::Range<const char *>]
    674 |   constexpr explicit operator Tgt() const noexcept(
        |                      ^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    675 |       std::is_nothrow_constructible<Tgt, Iter const&, size_type>::value) {
        |       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    676 |     return Tgt(b_, walk_size());
        |     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    677 |   }
        |   ~
  C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/folly/Range.h:1623:19: note: while substituting deduced template arguments into function template 'operator type-parameter-0-0' [with Tgt = folly::Range<const char *>, $1 = (no value)]
   1623 |       StringPiece(haystack), StringPiece(needles));
        |                   ^
  C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__fwd/string.h:23:29: note: template is declared here
     23 | struct _LIBCPP_TEMPLATE_VIS char_traits;
        |                             ^
  1 error generated.
  [20/47] Building CXX object CMakeFiles/expo-modules-core.dir/src/main/cpp/JavaCallback.cpp.o
  FAILED: CMakeFiles/expo-modules-core.dir/src/main/cpp/JavaCallback.cpp.o
  C:\Users\ABDULG~1\AppData\Local\Android\Sdk\ndk\280~1.130\TOOLCH~1\llvm\prebuilt\WINDOW~1\bin\CLANG_~1.EXE --target=aarch64-none-linux-android24 --sysroot="C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot" -Dexpo_modules_core_EXPORTS -I"C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/react" -I"C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/react-native/ReactAndroid/src/main/jni/react/turbomodule" -I"C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/expo-modules-core/android/../common/cpp" -I"C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/expo-modules-core/android/src/fabric" -isystem "C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/9ca3238344128cfd70a33cf330b92b9d/transformed/fbjni-0.6.0/prefab/modules/fbjni/include" -isystem "C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/jsi/include" -isystem "C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include" -g -DANDROID -fdata-sections -ffunction-sections -funwind-tables -fstack-protector-strong -no-canonical-prefixes -D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security   -DREACT_NATIVE_TARGET_VERSION=76 -fno-limit-debug-info  -fPIC -DFOLLY_NO_CONFIG=1 -DFOLLY_HAVE_CLOCK_GETTIME=1 -DFOLLY_USE_LIBCPP=1 -DFOLLY_CFG_NO_COROUTINES=1 -DFOLLY_MOBILE=1 -DFOLLY_HAVE_RECVMMSG=1 -DFOLLY_HAVE_PTHREAD=1 -DFOLLY_HAVE_XSI_STRERROR_R=1 -O2 -frtti -fexceptions -Wall -fstack-protector-all -DUSE_HERMES=0 -DUNIT_TEST=0 -DIS_NEW_ARCHITECTURE_ENABLED=1 -DRN_FABRIC_ENABLED=1 -std=gnu++20 -MD -MT CMakeFiles/expo-modules-core.dir/src/main/cpp/JavaCallback.cpp.o -MF CMakeFiles\expo-modules-core.dir\src\main\cpp\JavaCallback.cpp.o.d -o CMakeFiles/expo-modules-core.dir/src/main/cpp/JavaCallback.cpp.o -c "C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/expo-modules-core/android/src/main/cpp/JavaCallback.cpp"
  In file included from C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/expo-modules-core/android/src/main/cpp/JavaCallback.cpp:3:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/expo-modules-core/android/src/main/cpp/JavaCallback.h:5:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/Pictures/New folder/New folder/Transboard/node_modules/expo-modules-core/android/src/main/cpp/JNIDeallocator.h:5:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/9ca3238344128cfd70a33cf330b92b9d/transformed/fbjni-0.6.0/prefab/modules/fbjni/include/fbjni/fbjni.h:21:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/9ca3238344128cfd70a33cf330b92b9d/transformed/fbjni-0.6.0/prefab/modules/fbjni/include/fbjni/detail/Common.h:24:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/functional:525:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__functional/boyer_moore_searcher.h:27:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/vector:325: 
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__format/formatter_bool.h:17:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__format/concepts.h:16:
  In file included from C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__format/format_parse_context.h:16:
  C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/string_view:299:43: error: implicit instantiation of undefined template 'std::char_traits<unsigned char>'
    299 |   static_assert((is_same<_CharT, typename traits_type::char_type>::value),
        |                                           ^
  C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__type_traits/is_constructible.h:22:79: note: in instantiation of template class 'std::basic_string_view<unsigned char>' requested here
     22 | struct _LIBCPP_TEMPLATE_VIS is_constructible : public integral_constant<bool, __is_constructible(_Tp, _Args...)> {};
        |                                                                               ^
  C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/folly/Traits.h:665:24: note: in instantiation of template class 'std::is_constructible<std::basic_string_view<unsigned char>, const unsigned char *const &, unsigned long>' requested here
    665 |     : std::conditional<T::value, Conjunction<TList...>, T>::type {};
        |                        ^
  C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/folly/Range.h:649:9: note: in instantiation of template class 'folly::Conjunction<std::is_constructible<std::basic_string_view<unsigned char>, const unsigned char *const &, unsigned long>, std::is_constructible<folly::Range<const char *>, std::basic_string_view<unsigned char>>>' requested here
    649 |       : Conjunction<
        |         ^
  C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/folly/Range.h:672:16: note: in instantiation of template class 'folly::Range<const unsigned char *>::IsConstructibleViaStringView<folly::Range<const char *>>' requested here        
    672 |               !IsConstructibleViaStringView<Tgt>::value,
        |                ^
  C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/folly/Range.h:674:22: note: while substituting prior template arguments into non-type template parameter [with Tgt = folly::Range<const char *>]
    674 |   constexpr explicit operator Tgt() const noexcept(
        |                      ^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    675 |       std::is_nothrow_constructible<Tgt, Iter const&, size_type>::value) {
        |       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    676 |     return Tgt(b_, walk_size());
        |     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    677 |   }
        |   ~
  C:/Users/ABDULGANIYU IBRAHIM/.gradle/caches/8.10.2/transforms/3d5643d0c2a9b74df9675307b121d2fc/transformed/react-android-0.76.7-debug/prefab/modules/reactnative/include/folly/Range.h:1623:19: note: while substituting deduced template arguments into function template 'operator type-parameter-0-0' [with Tgt = folly::Range<const char *>, $1 = (no value)]
   1623 |       StringPiece(haystack), StringPiece(needles));
        |                   ^
  C:/Users/ABDULGANIYU IBRAHIM/AppData/Local/Android/Sdk/ndk/28.0.13004108/toolchains/llvm/prebuilt/windows-x86_64/sysroot/usr/include/c++/v1/__fwd/string.h:23:29: note: template is declared here
     23 | struct _LIBCPP_TEMPLATE_VIS char_traits;
        |                             ^
  1 error generated.
  ninja: build stopped: subcommand failed.

  C++ build system [build] failed while executing:
      @echo off
      "C:\\Users\\ABDULGANIYU IBRAHIM\\AppData\\Local\\Android\\Sdk\\cmake\\3.22.1\\bin\\ninja.exe" ^
        -C ^
        "C:\\Users\\ABDULGANIYU IBRAHIM\\Pictures\\New folder\\New folder\\Transboard\\node_modules\\expo-modules-core\\android\\.cxx\\Debug\\27361x4d\\arm64-v8a" ^
        expo-modules-core
    from C:\Users\ABDULGANIYU IBRAHIM\Pictures\New folder\New folder\Transboard\node_modules\expo-modules-core\android

* Try:
> Run with --stacktrace option to get the stack trace.
> Run with --info or --debug option to get more log output.
> Run with --scan to get full insights.
> Get more help at https://help.gradle.org.
==============================================================================

BUILD FAILED in 4m 11s
527 actionable tasks: 238 executed, 279 from cache, 10 up-to-date
PS C:\Users\ABDULGANIYU IBRAHIM\Pictures\New folder\New folder\Transboard\android> 








