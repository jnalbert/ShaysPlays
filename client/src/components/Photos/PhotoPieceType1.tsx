import React, { FC } from 'react'
import { View } from 'react-native';
import styled from 'styled-components/native'

const OverallWrapper = styled.View`
    /* flex: 1; */
    width: 50%;
    height: 100%;
    padding: 7px;
`

const Photo = styled.Image`
    width: 100%;
    height: 100%;
    border-radius: 5px;
`

interface Props {
    imgUrl: string;   
    width?: number;
}
const PhotoRowType1: FC<Props> = ({imgUrl, width = 50}) => {
  return (
    <OverallWrapper style={{width: `${width}%`}}>
        <Photo source={{uri: imgUrl}} />
    </OverallWrapper>
  )
}

export default PhotoRowType1