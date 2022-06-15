import React, { FC, useRef } from 'react'
import { View } from 'react-native';
import styled from 'styled-components/native'
import Carousel from 'react-native-snap-carousel';
import { Pink, Purple, ShayBlue } from '../../shared/colors';
import GameCardComp, { GameCardType } from './GameCardComp';


const GamesCarousel: FC = () => {

    const gamesData: GameCardType[] = [
        {
            name: "Wordle",
            gamesWon: 5,
            totalGames: 5,
            playScreenName: "WordleScreen",
            backgroundColor: Purple,
            textColor: Pink
        },
        {
            name: "Sudoku",
            gamesWon: 5,
            totalGames: 5,
            playScreenName: "SudokuScreen",
            backgroundColor: Pink,
            textColor: ShayBlue
        },
        {
            name: "Memory",
            gamesWon: 5,
            totalGames: 5,
            playScreenName: "MemoryScreen",
            backgroundColor: ShayBlue,
            textColor: Pink
        }
    ]
    const carouselRef = useRef<any>(null)
    
    const renderItem = ({ item, index }: {item: GameCardType, index: number}) => {
        return <GameCardComp {...item} />
    }

  return (
      <Carousel
          layout={"default"}
          layoutCardOffset={30}
          ref={carouselRef}
          data={gamesData}
          sliderWidth={300}
          itemWidth={240}
          itemHeight={400}
          renderItem={renderItem}
          loop={true}
        />
  )
}

export default GamesCarousel