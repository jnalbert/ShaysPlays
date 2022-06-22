import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react'
import { View } from 'react-native';
import styled from 'styled-components/native'
import BasicButton from '../../shared/BasicButton';
import { Jet, Poppins, Purple, Text500, WorkSans } from '../../shared/colors';
import ScreenWrapperComp from '../../shared/ScreenWrapperComp';

const LogoWrapper = styled.View`
    margin-top: 30%;
`

const Logo = styled.Image`
    width: 280px;
    height: 200px;
`

const MainBodyWrapper = styled.View`
    margin-top: 2.5%;
    align-items: center;
`

const HeaderText = styled.Text`
    font-family: ${Poppins};
    font-size: 40px;
    letter-spacing: -1.5px;
    color: ${Purple};
`

const SubHeaderTextWrapper = styled.View`

`

const SubheaderText = styled.Text`
    margin-top: 9%;
    font-family: ${WorkSans};
    color: ${Text500};
    font-size: 26px;
    text-align: center;
    letter-spacing: -1.5px;
`

const EmojiText = styled.Text` 
    margin-top: 6%;
    font-size: 68px;
`

const ButtonWrapper = styled.View`
    margin-top: 8%;
    width: 63%;
`


const GameWinScreen: FC = () => {

    const navigation: any = useNavigation();

    const gotToGamesScreen = () => {
        navigation.navigate('Games');
    }

  return (
    <ScreenWrapperComp>
      <LogoWrapper>
        <Logo source={require("../../../assets/SmallLogo.png")}  />
      </LogoWrapper>
      <MainBodyWrapper>
        <HeaderText>
            Congratulations!
        </HeaderText>
        <SubHeaderTextWrapper style={{width: "80%"}}>
            <SubheaderText>
                You have solved the puzzle 
            </SubheaderText>
        </SubHeaderTextWrapper>
        <EmojiText>
        🥳 🥳 🥳
        </EmojiText>
        <SubHeaderTextWrapper style={{width: "85%"}}>
            <SubheaderText style={{fontSize: 22, lineHeight: 30}}>
                That was hard but I mean you are a genus so im not surprised
            </SubheaderText>
        </SubHeaderTextWrapper>
       
      </MainBodyWrapper>

      <ButtonWrapper>
        <BasicButton title={"Home"} onPress={gotToGamesScreen} buttonTextStyle={{fontSize: 33}} style={{width: "100%", height: 63, backgroundColor: Jet}}/>
      </ButtonWrapper>
    </ScreenWrapperComp>
  )
}

export default GameWinScreen