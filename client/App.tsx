import React, { useEffect } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { useFonts } from "expo-font";
import { Poppins_600SemiBold } from "@expo-google-fonts/poppins";
import { WorkSans_400Regular } from "@expo-google-fonts/work-sans";
import { Nunito_400Regular } from "@expo-google-fonts/nunito";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import MainTabNavigator from "./src/navigators/MainTabNavigator";
import { Auth } from "./config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  getPermissionsAsync,
  requestPermissionsAsync,
  setNotificationHandler,
} from "expo-notifications";
import { checkNotificationsOnStart } from "./Notifications";

// notification
setNotificationHandler({
  handleNotification: async () => {
    return {
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    };
  },
});

const AppWrapperView = styled.View`
  flex: 1;
`;

const App = () => {
  let [isFontLoaded] = useFonts({
    Poppins: Poppins_600SemiBold,
    WorkSans: WorkSans_400Regular,
    Nunito: Nunito_400Regular,
  });

  const things = { email: "jnalbert879@gmail.com", pass: "TEST2098?" };

  const LoginIn = async () => {
    const currentUser = await Auth.currentUser;
    if (!currentUser) {
      console.log("does not have suer");
      signInWithEmailAndPassword(Auth, things.email, things.pass);
    }
    // createUserWithEmailAndPassword(Auth, things.email, things.pass)
    // signInWithEmailAndPassword(Auth, things.email, things.pass)
  };

  const getNotificationPermission = async () => {
    const { status: existingStatus } = await getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }

    checkNotificationsOnStart()
  };

  useEffect(() => {
    LoginIn();
    getNotificationPermission();
  }, []);

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
};

export default App;
