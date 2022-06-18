import React, { FC } from 'react'
import { View } from 'react-native';
import styled from 'styled-components/native'

const OverallWrapper = styled.View`
    /* flex: 1; */
    width: 50%;
    height: 100%;
    padding: 7px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Photo = styled.Image`
    width: 100%;
    height: 45%;
    margin-bottom: 8px;
    margin-top: 8px;
    border-radius: 5px
`


interface Props {
    imgUrls: string[];
    width?: number;
}
const PhotoPieceType2: FC<Props> = ({imgUrls, width = 50}) => {
  return (
    <OverallWrapper style={{width:`${width}%`}}>
        {imgUrls.map((imgUrl, index) => {
            return <Photo key={index} source={{uri: imgUrl}} />
        })}
    </OverallWrapper>
  )
}

export default PhotoPieceType2