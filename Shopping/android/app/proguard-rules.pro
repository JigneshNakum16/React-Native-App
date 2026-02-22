# ShopHub ProGuard Rules

# React Native

-keep class com.facebook.hermes.** { *; }
-keep class com.facebook.jni.** { *; }

# Keep React Native native methods
-keepclasseswithmembernames class * {
  native <methods>;
}

# Keep names of methods called from external JavaScript code
-keepclassmembers class * {
  @android.webkit.JavascriptInterface <methods>;
}

# Remove logging in production
-assumenosideeffects class android.util.Log {
  public static *** d(...);
  public static *** v(...);
  public static *** i(...);
}

# Keep Retrofit API models (when implemented)
-keepattributes Signature
-keepattributes Exceptions
-keep class com.shophub.api.model.** { *; }
-keep interface com.shophub.api.model.** { *; }

# Keep Gson classes
-keepattributes Signature
-keepattributes *Annotation*
-dontwarn sun.misc.**
-keep class * implements com.google.gson.TypeAdapter
-keep class * implements com.google.gson.TypeAdapterFactory
-keep class * implements com.google.gson.JsonSerializer
-keep class * implements com.google.gson.JsonDeserializer

# Keep OkHttp classes
-dontwarn okhttp3.**
-dontwarn okio.**
-keep class okhttp3.** { *; }
-keep interface okhttp3.** { *; }

# Keep React Navigation
-keep class com.reactnavigation.** { *; }
-keep interface com.reactnavigation.** { *; }

# Keep Vector Icons
-keep class com.facebook.react.views.viewhelper.** { *; }

# Optimization
-optimizationpasses 5
-dontusemixedcaseclassnames
-dontskipnonpubliclibraryclasses
-dontpreverify
-verbose

