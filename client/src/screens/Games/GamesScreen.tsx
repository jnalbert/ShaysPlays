import { useNavigation } from '@react-navigation/native';
import React, { FC, useEffect, useState } from 'react'
import { RefreshControl, View } from 'react-native';
import styled from 'styled-components/native'
import DonutChart from '../../components/Games/DonutChart';
import BasicButton from '../../shared/BasicButton';
import { Black, Purple, WorkSans } from '../../shared/colors';
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

const AddPurchaseWrapper = styled.View`
  justify-content: center;
  width: 77%;
  /* padding-top: 6%; */
`

const BasicButtonWrapper = styled.View`
  
`

const MAX_POINTS = 5;

const GamesScreen: FC = () => {

    const [points, setPoints] = useState(0)
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [claimReward, setClaimReward] = useState(false);

      const GetPoints = async () => {
        setIsRefreshing(true)
        // const uuid = await _getStoredUuid() as string

        // *** uncomment this line to get real data ***
        // const resPoints = await GetRewardsData(uuid) as number
        const resPoints = 3;

        // console.log('first', resPoints)

        setPoints(resPoints || 0)
        setIsRefreshing(false)
        if (resPoints >= MAX_POINTS) {
          setClaimReward(true);
        } else {
          setClaimReward(false);
        }
      }

      useEffect(() => {
        GetPoints()
      }, [])

      const navigator: any = useNavigation()

      const goToClaimRewards = async () => {
        navigator.navigate("ClaimRewardScreen")

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
      
    </ScreenWrapperComp>
  )
}

export default GamesScreen