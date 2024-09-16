import { View, Text, StyleSheet, Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const TypingIndicator = () => {
  const dot1 = useRef(new Animated.Value(0.2)).current;
  const dot2 = useRef(new Animated.Value(0.2)).current;
  const dot3 = useRef(new Animated.Value(0.2)).current;

  useEffect(() => {
    const animateDot = (dot) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(dot, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0.2,
            duration: 300,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    animateDot(dot1);
    setTimeout(() => animateDot(dot2), 150);
    setTimeout(() => animateDot(dot3), 300);
  }, []);

  const { theme } = useTheme();

  const styles = StyleSheet.create({
    typingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 8,
      alignSelf: 'flex-start',
      marginLeft: 20,
    },
    typingText: {
      color: theme === 'dark' ? '#aaa' : '#666',
      marginRight: 6,
    },
    dotContainer: {
      flexDirection: 'row',
    },
    dot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: theme === 'dark' ? '#aaa' : '#666',
      marginHorizontal: 2,
      opacity: dot1, // animate opacity instead of animation
    },
  });

  return (
    <View style={styles.typingContainer}>
      <Text style={styles.typingText}>Typing</Text>
      <View style={styles.dotContainer}>
        <Animated.View style={[styles.dot, { opacity: dot1 }]} />
        <Animated.View style={[styles.dot, { opacity: dot2 }]} />
        <Animated.View style={[styles.dot, { opacity: dot3 }]} />
      </View>
    </View>
  );
};

export default TypingIndicator;