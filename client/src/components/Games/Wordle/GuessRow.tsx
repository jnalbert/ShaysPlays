import React, { FC } from 'react'
import { View } from 'react-native';
import styled from 'styled-components/native'
import Block from './Block';

const RowWrapper = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: center;
`

interface Props {
    guess: string;
    word: string;
    guessed: boolean;
}

const GuessRow: FC<Props> = ({
    guess,
    word,
    guessed,
}) => {

  return (
    <RowWrapper>
      <Block index={0} guess={guess} word={word} guessed={guessed}/>
      <Block index={1} guess={guess} word={word} guessed={guessed}/>
      <Block index={2} guess={guess} word={word} guessed={guessed}/>
      <Block index={3} guess={guess} word={word} guessed={guessed}/>
      <Block index={4} guess={guess} word={word} guessed={guessed}/>
    </RowWrapper>
  )
}

export default GuessRow