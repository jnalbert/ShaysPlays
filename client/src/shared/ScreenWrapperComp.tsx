import React, { FC } from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";
import { backgroundColor } from './colors';
const BackgroundColor = backgroundColor

const ScreenWrapper = styled.View`
  flex: 1;
  background-color: ${backgroundColor};
  flex-direction: column;
  align-items: center;
  margin: 0px 24px;
`;

const ScreenBackgroundColor = styled.View`
  background-color: ${backgroundColor};
  flex: 1;
`;

interface ScreenWrapperCompProps {
  children: React.ReactNode;
  scrollView?: boolean;
  refreshControl?: any;
    backgroundColor?: string;
}

const ScreenWrapperComp: FC<ScreenWrapperCompProps> = ({
  children,
  scrollView,
  refreshControl,
  backgroundColor = BackgroundColor
}) => {
  return (
    <ScreenBackgroundColor style={{backgroundColor: backgroundColor}}>
      {scrollView ? (
        <ScrollView refreshControl={refreshControl}>
          <ScreenWrapper>{children}</ScreenWrapper>
        </ScrollView>
      ) : (
        <ScreenWrapper style={{backgroundColor: backgroundColor}}>{children}</ScreenWrapper>
      )}
    </ScreenBackgroundColor>
  );
};

export default ScreenWrapperComp;
