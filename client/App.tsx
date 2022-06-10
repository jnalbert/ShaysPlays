import {View } from 'react-native';
import styled from 'styled-components/native';
import { useFonts } from 'expo-font';
import { Poppins_600SemiBold } from "@expo-google-fonts/poppins"
import { WorkSans_400Regular } from "@expo-google-fonts/work-sans"
import { Nunito_400Regular } from '@expo-google-fonts/nunito';
import { NavigationContainer } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import MainTabNavigator from './src/navigators/MainTabNavigator';

const AppWrapperView = styled.View`
  flex: 1;
`;


const App = () => {

  let [isFontLoaded] = useFonts({
    "Poppins": Poppins_600SemiBold,
    "WorkSans": WorkSans_400Regular,
    "Nunito": Nunito_400Regular,
  });


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