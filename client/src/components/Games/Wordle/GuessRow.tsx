import React, { FC } from 'react'
import { View } from 'react-native';
import styled from 'styled-components/native'
import Block from './Block';

const RowWrapper = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: center;
`

const GuessRow: FC = () => {
  return (
    <RowWrapper>
      <Block letter='A'/>
      <Block letter='A'/>
      <Block letter='A'/>
      <Block letter='A'/>
      <Block letter='A'/>
    </RowWrapper>
  )
}

export default GuessRow