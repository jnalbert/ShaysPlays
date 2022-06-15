import React, { FC, useEffect, useRef } from 'react';
import {
  View,
  Easing,
  TextInput,
  Animated,
  StyleSheet,
} from 'react-native';
import Svg, { G, Circle } from 'react-native-svg';
import { Pink } from '../../shared/colors';

const MAX_POINTS = 5;

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

interface Props {
  percentage: number;
  radius: number;
  strokeWidth: number;
  duration: number;
  color: string;
  delay: number;
  max: number;
}

const DonutChart: FC<Props> = ({
  percentage,
  radius,
  strokeWidth,
  duration,
  color,
  delay,
  max,
}) => {

  const animated = useRef<any>(new Animated.Value(0)).current;
  const circleRef = useRef<any>();
  const inputRef = useRef<any>();
  const circumference = 2 * Math.PI * radius;
  const halfCircle = radius + strokeWidth;

  const animation = (toValue: number) => {
    return Animated.timing(animated, {
      delay: 300,
      toValue,
      duration,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  };

  useEffect(() => {
    animation((percentage > MAX_POINTS ? MAX_POINTS : percentage));
    // animation(percentage);
    animated.addListener((v: any) => {
      const maxPerc = 100 * v.value / max;
      const strokeDashoffset = circumference - (circumference * maxPerc) / 100;
      if (inputRef?.current) {
        inputRef.current.setNativeProps({
          text: `${Math.round(percentage)}/${MAX_POINTS}`,
        });
      }
      if (circleRef?.current) {
        circleRef.current.setNativeProps({
          strokeDashoffset,
        });
      }
    }, [max, percentage]);

    return () => {
      animated.removeAllListeners();
    };
  });

  return (
    <View style={{ width: radius * 2, height: radius * 2 }}>
      <Svg
        height={radius * 2}
        width={radius * 2}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
        <G
          rotation="-90"
          origin={`${halfCircle}, ${halfCircle}`}>
          <Circle
            ref={circleRef}
            cx="50%"
            cy="50%"
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDashoffset={circumference}
            strokeDasharray={circumference}
          />
          <Circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
            strokeOpacity=".1"
          />
        </G>
      </Svg>
      <AnimatedTextInput
        ref={inputRef}
        underlineColorAndroid="transparent"
        editable={false}
        defaultValue="0"
        style={[
          StyleSheet.absoluteFillObject,
          { fontSize: radius / 2.0, color: Pink ?? color },
          styles.text,
        ]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  text: { fontWeight: '800', textAlign: 'center' },
});

export default DonutChart