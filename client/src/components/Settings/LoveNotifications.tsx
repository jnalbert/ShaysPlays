import React, { FC, useState, useEffect } from 'react'
import { View } from 'react-native';
import styled from 'styled-components/native'
import { Black, Jet, Nunito, Poppins, Text100, Text200, Text300 } from '../../shared/colors';
import LoveCouponComp from './LoveCouponComp';
import Collapsible from 'react-native-collapsible';
import BasicButton from '../../shared/BasicButton';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { deleteNotifications, scheduleNotification } from '../../../Notifications';
import { getLoveNotificationData, setLoveNotificationData } from '../../../firebase/FirestoreFunctions';

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

export const makeDate = (time: string) => {
    const date = new Date();
    let hours = parseInt(time.substring(0, 2))
    hours = time.includes("pm") ? hours + 12 : hours;
    const minutes = parseInt(time.substring(time.indexOf(":") + 2, time.indexOf(":") + 4));
    // console.log(hours, minutes)
    date.setHours(hours)
    date.setMinutes(minutes)
    return date;
}


const LoveNotifications: FC = () => {

    const [loveNotification, setLoveNotification] = useState<LoveNotificationProps | any>({ isCheck: false, time: "" });
    const [isPickingTime, setIsPickingTime] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    const LoveNotificationPress = () => {
        // triggerLoveNotification()
        setLoveNotificationData(!loveNotification.isCheck, loveNotification.time)
        loveNotification.isCheck ? deleteNotifications() : scheduleNotification(loveNotification.time)
        // deleteNotifications()
        setLoveNotification({isCheck: !loveNotification.isCheck, time: loveNotification.time});
        // console.log(loveNotification);
    }


    const ChangeTimePress = () => {
        setIsPickingTime(true)
    }

    const onConfirmTime = (time: any) => {
        setIsPickingTime(false)
       
        let hours = time.getHours() % 12;
        hours = hours === 0 ? 12 : hours;
        let minutes = time.getMinutes();
        minutes = minutes < 10 ? '0' + minutes : minutes;
        const ampm = time.getHours() >= 12 ? 'pm' : 'am';
        // console.log(hours, minutes, ampm);
        const timeFormatted = `${hours} : ${minutes}  ${ampm}`

        setLoveNotificationData(loveNotification.isCheck, timeFormatted)
        scheduleNotification(timeFormatted)
        setLoveNotification({isCheck: loveNotification.isCheck, time: timeFormatted});
    }

  

    const getInitialData = async () => {
        setIsLoading(true)
        const data = await getLoveNotificationData()
        data && setLoveNotification({isCheck: data.isCheck, time: data.time})
        setIsLoading(false)
    }

    useEffect(() => {
        getInitialData()
    }, [])

  return (
    <SectionWrapper>
        <HeaderWrapper>
            <HeaderText>Information</HeaderText>
        </HeaderWrapper>

        {!isLoading && (
        <InnerContainer>
            <LoveCouponComp onCheckPress={LoveNotificationPress} text={"Love Notifications"} isCheck={loveNotification.isCheck} circleSize={20} />
        </InnerContainer>
        )}
        
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
                        date={makeDate(loveNotification.time)}
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