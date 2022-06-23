import React, { FC, useState } from 'react'
import { View } from 'react-native';
import styled from 'styled-components/native'
import { Jet, Pink, Purple } from '../../../shared/colors';

const BlockWrapper = styled.View`
    /* border-color: #d3d6da; */
    background-color: #e1e4e9;
    /* border-width: 2px; */
    width: 63px;
    height: 58px;
    align-items: center;
    justify-content: center;
    margin: 3px;
    margin-left: 4px;
    margin-right: 4px;
    border-radius: 5px;
`

const BlockText = styled.Text`
    font-size: 27px;
    font-weight: bold;
    color: ${Jet};
`

interface Props {
    index: number;
    guess: string;
    word: string;
    guessed: boolean;
}

const Block: FC<Props> = ({
    index,
    guess,
    word,
    guessed,
}) => {
    const letter = guess[index]
    const wordLetter = word[index]

    const blockStyles: any = {}
    const textStyles: any = {}

    const letterCompare = letter ? letter.toLowerCase() : letter

    if (guessed && letterCompare === wordLetter) {
        blockStyles.backgroundColor = Purple
        textStyles.color = "#fff"
        // console.log("Here")
    } else if (guessed && word.includes(letterCompare)) {
        blockStyles.backgroundColor = Pink
        textStyles.color = "#fff"
      } else if (guessed) {
        blockStyles.backgroundColor = "#787c7e"
        textStyles.color = "#fff"
      }

  return (
    <BlockWrapper style={blockStyles}>
      <BlockText style={textStyles}>{letter}</BlockText>
    </BlockWrapper>
  )
}

export default Block