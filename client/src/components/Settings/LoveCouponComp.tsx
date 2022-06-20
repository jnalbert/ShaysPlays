import React, { FC } from 'react'
import { View } from 'react-native';
import styled from 'styled-components/native'
import { Black, Poppins, Text100 } from '../../shared/colors';
import RadioButtonComp from './RadioButtonComp';

const OverallWrapper = styled.View`
    width: 100%;
    height: 40px;
    background-color: ${Text100};
    border-radius: 8px;
    flex-direction: row;
    align-items: center;
    padding-left: 16px;
    /* padding-right: 16px; */
`

const TextWrapper = styled.View`
    width: 86%;
`

const Text = styled.Text`
    text-align: left;
    color: ${Black};
    font-size: 20px;
    line-height: 28px;
    letter-spacing: -0.25px;
    font-family: ${Poppins};
`
const RadioButtonWrapper = styled.Text`
    width: 12%;
`

interface Props {
    text: string;
    isCheck: boolean;
    circleSize?: number;
    onCheckPress?: () => void;
}

const LoveCouponComp: FC<Props> = ({
    text,
    isCheck,
    circleSize,
    onCheckPress= () => {return}
}) => {


  return (
    <OverallWrapper>
        <TextWrapper>
            <Text>{text}</Text>
        </TextWrapper>
        <RadioButtonWrapper>
            <RadioButtonComp isChecked={isCheck} size={circleSize} onPressPass={onCheckPress}/>
        </RadioButtonWrapper>
    </OverallWrapper>
  )
}

export default LoveCouponComp