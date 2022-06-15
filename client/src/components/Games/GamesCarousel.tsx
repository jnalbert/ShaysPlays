import React, { FC } from 'react'
import { View } from 'react-native';
import styled from 'styled-components/native'
import Carousel from 'react-native-snap-carousel';
import { Pink, Purple, ShayBlue } from '../../shared/colors';
import GameCardComp from './GameCardComp';

const GamesCarousel: FC = () => {

    const gamesData = [
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

  return (
    <View>
      <GameCardComp {...gamesData[0]}  />
    </View>
  )
}

export default GamesCarousel