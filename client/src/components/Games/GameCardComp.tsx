import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react'
import { View } from 'react-native';
import styled from 'styled-components/native'
import { Black, Jet, Poppins, Text500, WorkSans } from '../../shared/colors';
import BasicButton from '../../shared/BasicButton';

const OverallWrapper = styled.View`
    height: 355px;
    width: 240px;
    flex-direction: column;
    align-items: center;
    border-radius: 15px;
`

const HeaderTextWrapper = styled.View`
    padding-top: 20px;
    border-bottom-width: 3px;
    border-bottom-color: ${Jet};
    width: 150px;
    height: 60px;
`

const HeaderText = styled.Text`
    font-family: ${Poppins};
    font-size: 29px;
    /* line-height: 50px; */
    text-align: center;
    color: ${Black}
    /* letter-spacing: -1.5px; */
`


const LogoWrapper = styled.View`
    margin-top: 14px;
    border-radius: 5px;
    overflow: hidden;
`

const Logo = styled.Image`
    
`

const SubText = styled.Text`
    font-family: ${WorkSans};
    color: ${Text500};
    font-size: 24px;
    text-align: center;
    letter-spacing: -1.0px;
    padding-top: 15px;
`

const GamesWonText = styled.Text`
    font-family: ${Poppins};
    font-size: 35px;
    line-height: 48px;
    text-align: center;
    letter-spacing: 2px;
    margin-top: 8px;
`

const PlayButtonWrapper = styled.View`
    width: 140px;
    margin-top: 1px;
`

interface GameCardType {
    name: string;
    gamesWon: number;
    totalGames: number;
    playScreenName: string;
    backgroundColor: string;
    textColor: string;
}

const GameCardComp: FC<GameCardType> = ({name, gamesWon, totalGames, playScreenName, backgroundColor, textColor}) => {

    const displayLogo = () => {
        if (name === "Wordle") return <Logo source={require("../../../assets/WordleLogo.png")} style={{width: 170, height: 98}} />
        if (name === "Sudoku") return <Logo source={require( "../../../assets/SudokuLogo.png")} style={{width: 100, height: 100, borderRadius: 15}}/>
        if (name === "Memory") return <Logo source={require("../../../assets/MemoryLogo.png")} style={{width: 134, height: 100}}/>
    }

    const navigator: any = useNavigation()

      const goToPlayGame = async () => {
        navigator.navigate(playScreenName)
      }

  return (
    <OverallWrapper style={{backgroundColor: backgroundColor}}>
        <HeaderTextWrapper>
            <HeaderText>{name}</HeaderText>
        </HeaderTextWrapper>
      

      <LogoWrapper>
        {displayLogo()}
      </LogoWrapper>

      <SubText>
        Games Won
      </SubText>

      <GamesWonText style={{color: textColor}}>
        {gamesWon}/{totalGames}
      </GamesWonText>

      <PlayButtonWrapper>
        <BasicButton title={"Play"} onPress={goToPlayGame} style={{width: "100%", height: 50, backgroundColor: Jet}}/>
      </PlayButtonWrapper>
    </OverallWrapper>
  )
}

export default GameCardComp