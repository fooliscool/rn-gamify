/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { Animated, StatusBar, StyleSheet, useColorScheme, View, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect, useRef } from 'react';
import { ErrorBoundary } from './ErrorBoundary';

function AnimatedBall() {
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    // Bouncing animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -200,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Rotating animation
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    ).start();

    // Fade animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.5,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [bounceAnim, rotateAnim, fadeAnim]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View
      style={[
        styles.animatedBall,
        {
          transform: [{ translateY: bounceAnim }, { rotate: spin }],
          opacity: fadeAnim,
        },
      ]}
    />
  );
}

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const bgColor = isDarkMode ? '#1a1a1a' : '#fff';
  const textColor = isDarkMode ? '#fff' : '#000';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={[styles.container, { backgroundColor: bgColor }]}>
        <Text style={[styles.title, { color: textColor }]}>React Native Animations</Text>
        <Text style={[styles.subtitle, { color: textColor }]}>Bouncing & Rotating Ball</Text>

        <View style={styles.animationContainer}>
          <AnimatedBall />
        </View>

        <Text style={[styles.description, { color: textColor }]}>
          This component demonstrates React Native's Animated API with:
        </Text>
        <View style={styles.featureList}>
          <Text style={[styles.feature, { color: textColor }]}>
            ✓ Bouncing Animation (Y-axis translation)
          </Text>
          <Text style={[styles.feature, { color: textColor }]}>
            ✓ Rotating Animation (360° spin)
          </Text>
          <Text style={[styles.feature, { color: textColor }]}>✓ Fade In/Out (Opacity)</Text>
          <Text style={[styles.feature, { color: textColor }]}>✓ Loop Sequences</Text>
          <Text style={[styles.feature, { color: textColor }]}>
            ✓ Native Driver (60 FPS Performance)
          </Text>
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
    textAlign: 'center',
    opacity: 0.7,
  },
  animationContainer: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  animatedBall: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FF6B6B',
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  description: {
    fontSize: 14,
    marginBottom: 15,
    textAlign: 'center',
  },
  featureList: {
    alignItems: 'flex-start',
  },
  feature: {
    fontSize: 13,
    marginVertical: 6,
  },
});

export default () => (
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
