import React, { FC } from 'react'
import { View } from 'react-native';
import styled from 'styled-components/native'

const OverallRowWrapper = styled.View`
    flex-direction: row;
    justify-content: center;
    margin-bottom: 8px;
`

const KeyWrapper = styled.TouchableOpacity`
    backgroundColor: #d3d6da;
    padding: 15px 12.8px;
    border-radius: 5px;
    margin: 2.5px;
`

const KeyText = styled.Text`
    font-weight: 500;
    fontSize: 15px;
`

interface Props {
    letters: string[];
}

const KeyboardRow: FC<Props> = ({letters}) => {
  return (
    <OverallRowWrapper>
        {letters.map((letter, index) => {
            return (
                <KeyWrapper key={index}>
                    <KeyText>{letter}</KeyText>
                </KeyWrapper>
            )
        })}
    </OverallRowWrapper>
  )
}

export default KeyboardRow