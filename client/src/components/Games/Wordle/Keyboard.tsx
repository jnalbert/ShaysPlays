import React, { FC } from 'react'
import { View } from 'react-native';
import styled from 'styled-components/native'
import KeyboardRow from './KeyboardRow';

const OverallWrapper = styled.View`
    flex-direction: column;
`

interface Props {
    onKeyPress: (letter: string) => void;
}

const Keyboard: FC<Props> = ({onKeyPress}) => {

    const row1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"]
    const row2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"]
    const row3 = ["Z", "X", "C", "V", "B", "N", "M", "⌫"]

  return (
    <OverallWrapper>
      <KeyboardRow onKeyPress={onKeyPress} letters={row1} />
      <KeyboardRow onKeyPress={onKeyPress} letters={row2} />
      <KeyboardRow onKeyPress={onKeyPress} letters={row3} />
      <KeyboardRow onKeyPress={onKeyPress} letters={["ENTER"]} />
    </OverallWrapper>
  )
}

export default Keyboard