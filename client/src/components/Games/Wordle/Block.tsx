import React, { FC } from 'react'
import { View } from 'react-native';
import styled from 'styled-components/native'
import { Jet } from '../../../shared/colors';

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
    letter: string;
}

const Block: FC<Props> = ({letter}) => {
  return (
    <BlockWrapper>
      <BlockText>{letter}</BlockText>
    </BlockWrapper>
  )
}

export default Block