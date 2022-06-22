import React, { FC } from 'react'
import { View } from 'react-native';
import styled from 'styled-components/native'
import { Black, Poppins } from '../../shared/colors';

const OverallWrapper = styled.View`
    width: 80%;
    background-color: #E5D8F7;
    height: 60px;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
`
const HeaderTextWrapper = styled.View`
    border-bottom-width: 3px;
    border-color: {Black};
    width: 50%;
`

const HeaderText = styled.Text`
    color: ${Black};
    font-family: ${Poppins};
    font-size: 29px;
    text-align: center;
    letter-spacing: -1.5px;
`

interface Props {
    text: string;
}

const GamesHeader: FC<Props> = ({text}) => {
  return (
    <OverallWrapper>
      <HeaderTextWrapper>
        <HeaderText>{text}</HeaderText>
      </HeaderTextWrapper>
    </OverallWrapper>
  )
}

export default GamesHeader