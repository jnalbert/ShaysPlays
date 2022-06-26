import React, {useEffect} from "react"
import {View} from 'react-native';
import styled from 'styled-components/native';
import { useFonts } from 'expo-font';
import { Poppins_600SemiBold } from "@expo-google-fonts/poppins"
import { WorkSans_400Regular } from "@expo-google-fonts/work-sans"
import { Nunito_400Regular } from '@expo-google-fonts/nunito';
import { NavigationContainer } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import MainTabNavigator from './src/navigators/MainTabNavigator';
import { Auth } from "./config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";



const AppWrapperView = styled.View`
  flex: 1;
`;


const App = () => {

  let [isFontLoaded] = useFonts({
    "Poppins": Poppins_600SemiBold,
    "WorkSans": WorkSans_400Regular,
    "Nunito": Nunito_400Regular,
  });

  const things = {email: "jnalbert879@gmail.com", pass: "TEST2098?"}

  const LoginIn = () => {
    // createUserWithEmailAndPassword(Auth, things.email, things.pass)
    signInWithEmailAndPassword(Auth, things.email, things.pass)
  }

  useEffect(() => {
    LoginIn()
  }, [])

  return (
    <NavigationContainer>
      {!isFontLoaded ? (
        <AppLoading />
      ) : (
          <AppWrapperView>

            
            <MainTabNavigator />
            
          </AppWrapperView>
      )}
      </NavigationContainer>
  );
}


export default App;