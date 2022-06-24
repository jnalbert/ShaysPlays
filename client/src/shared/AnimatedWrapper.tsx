import React, { FC, useImperativeHandle, useRef } from 'react'
import { View, Animated } from 'react-native';
import styled from 'styled-components/native'

interface Props {
    children: React.ReactNode;
    duration: number;
    fadeRef: any;
}

const AnimatedWrapper: FC<Props> = ({children, duration, fadeRef}) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;


    useImperativeHandle(fadeRef, () => ({
        fadeInFunc() {
            fadeInFunc()
        },
        fadeOutFunc() {
            fadeOutFunc()
        }
      }))
    

    const fadeInFunc = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
        toValue: 1, 
        duration: duration,
        useNativeDriver: true
    }).start();
  };

  const fadeOutFunc = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: duration,
      useNativeDriver: true
    }).start();
  };

  return (
    <Animated.View
        style={
          {
            // Bind opacity to animated value
            opacity: fadeAnim
          }
        }
      >
        {children}
    </Animated.View>
  )
}

export default AnimatedWrapper