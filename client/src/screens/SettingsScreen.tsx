import React, { FC, useState } from 'react'
import { View } from 'react-native';
import styled from 'styled-components/native'
import LoveNotifications from '../components/Settings/LoveNotifications';
import ScreenWrapperComp from '../shared/ScreenWrapperComp';
import LoveCouponsDisplay from '../components/Settings/LoveCouponsDisplay';


const SettingsScreen: FC = () => {

  return (
    <ScreenWrapperComp>
      <LoveNotifications />
      <LoveCouponsDisplay />
    </ScreenWrapperComp>
  )
}

export default SettingsScreen