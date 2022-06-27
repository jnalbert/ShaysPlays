import { useNavigation } from '@react-navigation/native';
import React, { FC, useEffect, useState } from 'react'
import { RefreshControl, View } from 'react-native';
import styled from 'styled-components/native'
import { getIndividualGameData, getTotalGamesData } from '../../../firebase/FirestoreFunctions';
import DonutChart from '../../components/Games/DonutChart';
import GamesCarousel from '../../components/Games/GamesCarousel';
import BasicButton from '../../shared/BasicButton';
import { Black, Pink, Purple, ShayBlue, WorkSans } from '../../shared/colors';
import ScreenWrapperComp from '../../shared/ScreenWrapperComp';

const DonutWrapper = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    margin-top: 15px;
`

const MessageWrapper = styled.View`
  justify-content: center;
  align-self: center;
  margin-top: 20px;
  width: 66%;
`

const MessageText = styled.Text`
  margin-bottom: 6%;
  font-family: ${WorkSans};
  font-size: 28px;
  line-height: 40px;
  letter-spacing: -1.5px;
  align-self: center;
  color: ${Black};
  text-align: center;
`


const BasicButtonWrapper = styled.View`
  margin-bottom: 15px;
`

const CarouselWrapper = styled.View`
    flex: 1;
    margin-top: 15px;
  /* width: 100%; */
  justify-content: center;
  align-items: center;
`

export interface GameCardType {
    name: string;
    gamesWon: number;
    playScreenName: string;
    backgroundColor: string;
    textColor: string;
}


const gamesDataRaw: GameCardType[] = [
    {
        name: "Wordle",
        gamesWon: 5,
        playScreenName: "WordleScreen",
        backgroundColor: Purple,
        textColor: Pink
    },
    {
        name: "Sudoku",
        gamesWon: 5,
        playScreenName: "SudokuScreen",
        backgroundColor: Pink,
        textColor: ShayBlue
    },
    {
        name: "Memory",
        gamesWon: 5,
        playScreenName: "MemoryScreen",
        backgroundColor: ShayBlue,
        textColor: Pink
    }
]

const MAX_POINTS = 5;

const GamesScreen: FC = () => {


    const [points, setPoints] = useState(0)
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [claimReward, setClaimReward] = useState(false);

      const GetPoints = async () => {
        setIsRefreshing(true)

        const resPoints: any = await getTotalGamesData()
        getIndividualGamePoints()
        // console.log(first)

        // console.log('first', resPoints)

        setPoints(resPoints || 0)
        setIsRefreshing(false)
        if (resPoints >= MAX_POINTS) {
          setClaimReward(true);
        } else {
          setClaimReward(false);
        }
      }

      const [gamesData, setGamesData] = useState<GameCardType[]>(gamesDataRaw);

      const getIndividualGamePoints = async () => {
        const wordleGamesWon = await getIndividualGameData('wordle')
        const sudokuGamesWon = await getIndividualGameData('sudoku')
        const memoryGamesWon = await getIndividualGameData('memory')

        const newData: GameCardType[] = gamesDataRaw.map(game => {
            if (game.name === 'Wordle') {
                return {
                ...game,
                gamesWon: wordleGamesWon
                }
            } else if (game.name === 'Sudoku') {
                return {
                ...game,
                gamesWon: sudokuGamesWon
                }
            } else if (game.name === 'Memory') {
                return {
                ...game,
                gamesWon: memoryGamesWon
                }
            }
            return game;
        })

        setGamesData(newData)
    
      }

      useEffect(() => {
        GetPoints()
      }, [])

      const navigator: any = useNavigation()

      const [hasClaimed, setHasClaimed] = useState(false)

      const goToClaimRewards = async () => {
        if (hasClaimed) {
            await GetPoints()
            setHasClaimed(false)
            return
        }
        setHasClaimed(true)
        navigator.navigate("ClaimRewardsScreen")

        // *** uncomment this line to get real data ***
        // const uuid = await _getStoredUuid() as string
        // ClaimReward(uuid);
      }

  return (
    <ScreenWrapperComp scrollView refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={async () => {
          await GetPoints()
        }} />
      }>

        <DonutWrapper>
            <DonutChart percentage={points} radius={80} strokeWidth={10} duration={500} color={Purple} delay={0} max={MAX_POINTS} />
        </DonutWrapper>

        <MessageWrapper>
        {claimReward ? (
          <BasicButtonWrapper>
            <BasicButton title={"Claim Reward!"} onPress={goToClaimRewards} style={{width: "100%", height: 50, backgroundColor: Purple}}/>
          </BasicButtonWrapper>
      ) : (
            <MessageText>Play more games to get prizes</MessageText>
      )}
        
      </MessageWrapper>

      <CarouselWrapper>
        <GamesCarousel games={gamesData}/>
      </CarouselWrapper>
      
    </ScreenWrapperComp>
  )
}

export default GamesScreen