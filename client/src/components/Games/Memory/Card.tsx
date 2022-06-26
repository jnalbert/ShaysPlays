import React, { FC, useRef } from "react";
import { Animated, View } from "react-native";
import styled from "styled-components/native";
import { CardType } from "../../../screens/Games/MemoryScreen";

const OverallWrapper = styled.Pressable`
  margin: 8px;
`;


interface Props extends CardType {
  onCardClick: (index: number) => void;
}

const Card: FC<Props> = ({ src, index, isMatched, isFlipped, onCardClick }) => {
  const flipAnimation = useRef(new Animated.Value(0)).current;

  let flipRotation = 0;
  flipAnimation.addListener(({ value }) => (flipRotation = value));

  const flipToFrontStyle = {
    transform: [
      {
        rotateY: flipAnimation.interpolate({
          inputRange: [0, 180],
          outputRange: ["0deg", "180deg"],
        }),
      },
    ],
  };
  const flipToBackStyle = {
    transform: [
      {
        rotateY: flipAnimation.interpolate({
          inputRange: [0, 180],
          outputRange: ["180deg", "360deg"],
        }),
      },
    ],
  };

  const flipToFront = () => {
    Animated.timing(flipAnimation, {
      toValue: 180,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  const flipToBack = () => {
    Animated.timing(flipAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  if (isFlipped || isMatched) {
    flipToFront();
  } else {
    flipToBack();
  }

  const handleCardClick = () => {
    onCardClick(index);
    // !!flipRotation ? flipToBack() : flipToFront()
  }

//   console.log(isMatched);
  return (
    <OverallWrapper onPress={handleCardClick}>
      <Animated.Image
        style={{
          width: 85,
          height: 110,
          borderRadius: 5,
          position: "absolute",
          ...flipToBackStyle,
        }}
        source={{ uri: src }}
        width={80}
      />
      <Animated.Image
        style={{
          backfaceVisibility: "hidden",
          width: 85,
          height: 110,
          borderRadius: 5,
          ...flipToFrontStyle,
        }}
        source={require("../../../../assets/SmallLogoBlack.png")}
        width={80}
      />
    </OverallWrapper>
  );
};

export default Card;
