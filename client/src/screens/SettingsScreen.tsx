import React, { FC, useState } from 'react'
import { View } from 'react-native';
import styled from 'styled-components/native'
import LoveNotifications from '../components/Settings/LoveNotifications';
import ScreenWrapperComp from '../shared/ScreenWrapperComp';


const SectionWrapperBottom = styled.View`

`


const SettingsScreen: FC = () => {

   

  return (
    <ScreenWrapperComp>
      <LoveNotifications />
    </ScreenWrapperComp>
  )
}

export default SettingsScreen