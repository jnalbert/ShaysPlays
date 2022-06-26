import React, { FC, useRef, useState } from 'react'
import { View } from 'react-native';
import styled from 'styled-components/native'
import Carousel from 'react-native-snap-carousel';
import GameCardComp from './GameCardComp';
import { GameCardType } from '../../screens/Games/GamesScreen';


interface Props {
    games: GameCardType[]
}

const GamesCarousel: FC<Props> = ({games}) => {
   

    const carouselRef = useRef<any>(null)
    
    const renderItem = ({ item, index }: {item: GameCardType, index: number}) => {
        return <GameCardComp {...item} key={index}/>
    }

  return (
      <Carousel
          layout={"default"}
          layoutCardOffset={30}
          ref={carouselRef}
          data={games}
          sliderWidth={300}
          itemWidth={240}
          itemHeight={400}
          renderItem={renderItem}
          loop={true}
        />
  )
}

export default GamesCarousel