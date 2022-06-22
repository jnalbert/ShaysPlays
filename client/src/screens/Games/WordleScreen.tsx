import React, { FC } from 'react'
import { View } from 'react-native';
import styled from 'styled-components/native'
import GamesHeader from '../../components/Games/GamesHeader';
import GuessRow from '../../components/Games/Wordle/GuessRow';
import Keyboard from '../../components/Games/Wordle/Keyboard';
import ScreenWrapperComp from '../../shared/ScreenWrapperComp';

const HeaderWrapper = styled.View`
    width: 100%;
    align-items: center;
    margin-top: 2%;
    margin-bottom: 5%;
`

const GuessRowsWrapper = styled.View`
    width: 90%;
`

const KeyBoardWrapper = styled.View`
    margin-top: 7%;
`

const WordleScreen: FC = () => {
  return (
    <ScreenWrapperComp>
        <HeaderWrapper>
            <GamesHeader text='Shaydle'/>
        </HeaderWrapper>
        
        <GuessRowsWrapper>
            <GuessRow/>
            <GuessRow/>
            <GuessRow/>
            <GuessRow/>
            <GuessRow/>
            <GuessRow/>
        </GuessRowsWrapper>

        <KeyBoardWrapper>
            <Keyboard />
        </KeyBoardWrapper>
    </ScreenWrapperComp>
  )
}

export default WordleScreen