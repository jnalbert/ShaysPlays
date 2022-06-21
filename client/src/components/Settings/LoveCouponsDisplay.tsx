import React, { FC, useState } from 'react'
import { RefreshControl, View } from 'react-native';
import styled from 'styled-components/native'
import { Nunito, Text200, Text300 } from '../../shared/colors';
import LoveCouponComp from './LoveCouponComp';



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
    max-height: 78%;
`

const InnerHeaderWrapper = styled.View`
    border-bottom-width: 1px;
    border-color: ${Text200};
    flex-direction: row;
    justify-content: space-between;
    height: 24px;
    margin-bottom: 10px;
`

const InnerHeaderText = styled.Text`
    color: ${Text300};
    font-size: 16px;
    letter-spacing: -0.25px;

`

const LoveCouponsWrapper = styled.ScrollView`
    flex-direction: column;
    /* max-height: 40%; */
`

const CouponWrapper = styled.View`
    margin-top: 7px;
    margin-bottom: 7px;
`

interface CouponType {
    description: string;
    isCompleted: boolean;
}

const LoveCouponsDisplay: FC = () => {

    const couponsData: CouponType[] = [
        {
            description: "One Free Book from anywhere",
            isCompleted: false
        },
        {
            description: "One Free Book from anywhere",
            isCompleted: true
        },
        {
            description: "One Free Book from anywhere",
            isCompleted: true
        },
        {
            description: "One Free Book from anywhere",
            isCompleted: false
        },
        {
            description: "One Free Book from anywhere",
            isCompleted: false
        },
        {
            description: "One Free Book from anywhere",
            isCompleted: false
        }
    ]

    const [coupons, setCoupons] = useState<CouponType[]>(couponsData)


    const getCouponData = async () => {

    }

    const [isRefreshing, setIsRefreshing] = useState(false)


  return (
   <SectionWrapper>
        <HeaderWrapper>
            <HeaderText>
                Prizes
            </HeaderText>
        </HeaderWrapper>

        <InnerContainer>
            <InnerHeaderWrapper>
                <InnerHeaderText style={{paddingLeft: 3}}>
                    Description
                </InnerHeaderText>
                <InnerHeaderText style={{paddingRight: 7}}>
                    Completed
                </InnerHeaderText>
            </InnerHeaderWrapper>

            <LoveCouponsWrapper refreshControl={
                <RefreshControl refreshing={isRefreshing} onRefresh={async () => {
                    await getCouponData()
                  }} />
            }>
                    {coupons.map((coupon, index) => {
                        return (
                            <CouponWrapper key={index}>
                                <LoveCouponComp textStyle={{fontFamily: Nunito}} text={coupon.description} isCheck={coupon.isCompleted} circleSize={30} />
                            </CouponWrapper>
                        )
                    })}
                
                </LoveCouponsWrapper>
        </InnerContainer>
   </SectionWrapper>
  )
}

export default LoveCouponsDisplay