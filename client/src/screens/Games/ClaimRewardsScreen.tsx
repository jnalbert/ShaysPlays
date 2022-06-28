import React, { FC, useRef, useState } from 'react'
import { View } from 'react-native';
import styled from 'styled-components/native'
import { Poppins, Purple, WorkSans, Text500, ShayBlue, Black, backgroundColor, Pink } from '../../shared/colors';
import ScreenWrapperComp from '../../shared/ScreenWrapperComp';
import BasicButton from '../../shared/BasicButton';
import ConfettiCannon from 'react-native-confetti-cannon';
import AnimatedWrapper from '../../shared/AnimatedWrapper';
import LoveCouponComp from '../../components/Settings/LoveCouponComp';
import { getNewLoveCoupon } from '../../../firebase/FirestoreFunctions';


const HeaderWrapper = styled.View`
    margin-top: 15%;
`

const HeaderText = styled.Text`
    font-family: ${Poppins};
    font-size: 40px;
    letter-spacing: -1.5px;
    color: ${Purple};
`

const SubTextWrapper = styled.View`
    margin-top: 4%;
    width: 80%;
`

const SubText = styled.Text`
    margin-top: 9%;
    font-family: ${WorkSans};
    color: ${Text500};
    font-size: 26px;
    text-align: center;
    letter-spacing: -1.5px;
`

const Emojis = styled.Text`

    margin-top: 10%;
    font-size: 100px;
`

const ButtonWrapper = styled.View`
    margin-top: 27%;
    width: 63%;
`

const LoveCouponWrapper = styled.View`
    margin-top: 10%;
    justify-content: center;
    align-items: center;
`

const LoveCouponHeader = styled.Text`
    font-family: ${Poppins};
    color: ${Black};
    font-size: 32px;
    text-align: center;
    letter-spacing: -1.5px;
`

const CouponWrapper = styled.View`
    margin-top: 13%;
    width: 90%;
    /* height: 20%; */
`

const ClaimRewardsScreen: FC = () => {

    const confettiRef = useRef<ConfettiCannon>(null)
    const [isClaimReward, setIsClaimReward] = useState(false)
    const [loveCoupon, setLoveCoupon] = useState("")
    
    

    const fadeRef = useRef<any>(null)

    const onPressClaimPrize = async () => {
        const coupon = await getNewLoveCoupon()
        setLoveCoupon(coupon)

        setIsClaimReward(true)
        fadeRef.current.fadeInFunc()
        confettiRef?.current?.start()
    }


  return (
    <>
        <ScreenWrapperComp>
        <HeaderWrapper>
            <HeaderText>Congratulations!</HeaderText>
        </HeaderWrapper>
        <SubTextWrapper>
            <SubText>You have won enough games to received a reward</SubText>
        </SubTextWrapper>
        <Emojis>🎁 🎁 🎁</Emojis>
        {!isClaimReward && (
            <ButtonWrapper>
                <BasicButton title={"Claim Prize"} onPress={onPressClaimPrize} buttonTextStyle={{fontSize: 33}} style={{width: "100%", height: 63, backgroundColor: ShayBlue}}/>
            </ButtonWrapper>
            )
        }

         <AnimatedWrapper duration={2000} fadeRef={fadeRef} isInView={false}>
            <LoveCouponWrapper>
                <LoveCouponHeader>Love Coupon</LoveCouponHeader>
                <CouponWrapper>
                    <LoveCouponComp text={loveCoupon} isCheck={false} circleSize={25} textStyle={{fontSize: 18}} height={100} backgroundColor={Pink}/>
                </CouponWrapper>
            </LoveCouponWrapper>
        </AnimatedWrapper>
        
        </ScreenWrapperComp>
        <ConfettiCannon
            count={250}
            // fadeOut={true}
            origin={{x: 160, y: -20}}
            autoStart={false}
            ref={confettiRef}
        />
    </>
  )
}

export default ClaimRewardsScreen;