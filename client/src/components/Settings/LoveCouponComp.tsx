import React, { FC } from 'react'
import { View } from 'react-native';
import styled from 'styled-components/native'
import { Black, Poppins, Text100 } from '../../shared/colors';
import RadioButtonComp from './RadioButtonComp';

const OverallWrapper = styled.View`
    width: 100%;
    min-height: 40px;
    background-color: ${Text100};
    border-radius: 8px;
    flex-direction: row;
    align-items: center;
    padding-left: 16px;
    /* justify-content: center; */
    /* padding-right: 16px; */
`

const TextWrapper = styled.View`
    width: 86%;
`

const TextWidth = styled.View`
    padding-top: 5px;
    padding-bottom: 5px;
    width: 90%;
`

const Text = styled.Text`
    text-align: left;
    color: ${Black};
    font-size: 20px;
    line-height: 28px;
    letter-spacing: -0.4px;
    font-family: ${Poppins};
`
const RadioButtonWrapper = styled.Text`
    width: 12%;
    /* align-self: center; */
`

interface Props {
    text: string;
    isCheck: boolean;
    circleSize?: number;
    onCheckPress?: () => void;
    textStyle?: {}
    height?: number;
    backgroundColor?: string;
    inList?: boolean;
}

const LoveCouponComp: FC<Props> = ({
    text,
    isCheck,
    circleSize,
    onCheckPress,
    textStyle,
    height,
    inList,
    backgroundColor
}) => {

    let isDisabled = (!onCheckPress) ? true : false;

  return (
    <OverallWrapper style={{height: height ? height : "auto", backgroundColor: backgroundColor ? backgroundColor : Text100, minHeight: inList ? 70 : 40, paddingTop: inList ? 10 : 0, paddingBottom: inList ? 10 : 0}}>
        <TextWrapper>
            <TextWidth>
                <Text style={textStyle}>{text}</Text>
            </TextWidth>
        </TextWrapper>
        <RadioButtonWrapper>
            <RadioButtonComp isDisabled={isDisabled} isChecked={isCheck} size={circleSize} onPressPass={onCheckPress}/>
        </RadioButtonWrapper>
    </OverallWrapper>
  )
}

export default LoveCouponComp