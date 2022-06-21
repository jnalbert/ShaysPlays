import React, { FC, useState } from 'react'
import { View } from 'react-native';
import styled from 'styled-components/native'
import { Black, Jet, Nunito, Poppins, Text100, Text200, Text300 } from '../../shared/colors';
import LoveCouponComp from './LoveCouponComp';
import Collapsible from 'react-native-collapsible';
import BasicButton from '../../shared/BasicButton';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const SectionWrapper = styled.View`
    flex-direction: column;
    justify-content: flex-start;
    margin-top: 5%;
    width: 100%;
`

const HeaderWrapper = styled.View`
    border-bottom-width: 1px;
    border-color: ${Text200};
    width: 100%;
    justify-content: flex-start;
    height: 32px;
`

const HeaderText = styled.Text`
    color: #5D6470;
    font-size: 20px;
    line-height: 28px;
    letter-spacing: -0.25px;
    font-family: ${Nunito};
`

const InnerContainer = styled.View`
    flex-direction: column;
    width: 96%;
    margin-left: 4%;
    justify-content: flex-end;
    padding-top: 4%;
`

const OverallTimeWrapper = styled.View`
    width: 80%;
    margin-left: 10%;
    margin-top: 12px;
`


const TimeHeaderText = styled.Text`
    color: ${Text300};
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.25px;
    font-family: ${Nunito};
`

const DataPickerWrapper = styled.View`
    width: 109%;
    margin-left: 2%;
    margin-top: 12px;
    background-color: ${Text100};
    height: 60px;
    border-radius: 12px;
    flex-direction: row;
    align-items: center;
    padding-left: 15px;
`

const TimeTextWrapper = styled.View`
    width: 63%;

`

const TimeText = styled.Text`
    color: ${Black};
    font-size: 25px;
    /* line-height: 24px; */
    letter-spacing: -0.25px;
    font-family: ${Poppins};
`

const ChangeTimeButtonWrapper = styled.View`
    width: 100px;
`




interface LoveNotificationProps {
    isCheck: boolean;
    time: string;
}


const LoveNotifications: FC = () => {

    const [loveNotification, setLoveNotification] = useState<LoveNotificationProps>({isCheck: true, time: "12 : 00  am"});
    const [isPickingTime, setIsPickingTime] = useState(false);

    const LoveNotificationPress = () => {
        setLoveNotification({isCheck: !loveNotification.isCheck, time: loveNotification.time});
        // console.log(loveNotification);
    }


    const ChangeTimePress = () => {
        setIsPickingTime(true)
    }

    const onConfirmTime = (time: any) => {
        setIsPickingTime(false)
       
        const hours = time.getHours() % 12;
        let minutes = time.getMinutes();
        minutes = minutes < 10 ? '0' + minutes : minutes;
        const ampm = time.getHours() >= 12 ? 'pm' : 'am';
        // console.log(hours, minutes, ampm);
        setLoveNotification({isCheck: loveNotification.isCheck, time: `${hours} : ${minutes}  ${ampm}`});
    }

    const makeDate = () => {
        const date = new Date();
        let hours = parseInt(loveNotification.time.substring(0, 2))
        hours = loveNotification.time.includes("pm") ? hours + 12 : hours;
        const minutes = parseInt(loveNotification.time.substring(4, 6));
        // console.log(hours, minutes)
        date.setHours(hours)
        date.setMinutes(minutes)
        return date;
    }

  return (
    <SectionWrapper>
        <HeaderWrapper>
            <HeaderText>Information</HeaderText>
        </HeaderWrapper>

        <InnerContainer>
            <LoveCouponComp onCheckPress={LoveNotificationPress} text={"Love Notifications"} isCheck={loveNotification.isCheck} circleSize={20} />
        </InnerContainer>

        <Collapsible collapsed={!loveNotification.isCheck}>
            <OverallTimeWrapper>
                <TimeHeaderText>Time</TimeHeaderText>
                <DataPickerWrapper>
                    <TimeTextWrapper>
                        <TimeText>{loveNotification.time}</TimeText>
                    </TimeTextWrapper>
                    <ChangeTimeButtonWrapper>
                    <BasicButton
                        title={"Change"}
                        onPress={ChangeTimePress}
                        style={{ width: "100%", height: 35, backgroundColor: Jet }}
                        buttonTextStyle={{ fontSize: 18 }}
                    />
                    </ChangeTimeButtonWrapper>

                    <DateTimePickerModal
                        date={makeDate()}
                        isVisible={isPickingTime}
                        mode="time"
                        onConfirm={onConfirmTime}
                        onCancel={() => {
                            setIsPickingTime(false)
                        }}
                    />
                </DataPickerWrapper>
            </OverallTimeWrapper>
        </Collapsible>

    </SectionWrapper>
  )
}

export default LoveNotifications