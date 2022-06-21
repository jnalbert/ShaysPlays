import React, { FC, useState } from 'react'
import { View } from 'react-native';
import styled from 'styled-components/native'
import { Purple, backgroundColor } from '../../shared/colors';

const checkedColor = Purple;
const uncheckedColor = '#818181';

const Wrapper = styled.TouchableOpacity`
    width: 35px;
    height: 35px;
    border: 1px;
    border-color: ${uncheckedColor};
    border-radius: 50%;
    justify-content: center;
    align-items: center;
`


const InnerCircle = styled.View`
    width: 70%;
    height: 70%;
    border-radius: 50%;
`

interface Props {
    isChecked: boolean;
    size?: number;
    onPressPass?: () => void;
    isDisabled: boolean;
}

const RadioButtonComp: FC<Props> = ({isChecked, size, onPressPass = () => {return}, isDisabled}) => {

    const [colorOuter, setColorOuter] = useState(isChecked ? checkedColor : uncheckedColor);
    const [colorInner, setColorInner] = useState(isChecked ? checkedColor : "transparent");

    const onPressFunc = () => {
        onPressPass()

        setColorOuter(colorOuter === uncheckedColor ? checkedColor : uncheckedColor);
        setColorInner(colorInner === "transparent" ? checkedColor : "transparent");
    }

  return (
    <Wrapper style={{width: size, height: size, borderColor: colorOuter}} disabled={isDisabled} onPress={onPressFunc}>
        <InnerCircle style={{backgroundColor: colorInner}}>
        </InnerCircle>
    </Wrapper>
  )
}

export default RadioButtonComp