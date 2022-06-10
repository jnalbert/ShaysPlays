import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { FC } from 'react';
import { View } from 'react-native';
import { Jet, Purple } from '../shared/colors';

import { MaterialIcons } from '@expo/vector-icons'; 
import GamesNavigator from './GamesNavigator';
import PhotosNavigator from './PhotosNavigator';
import SettingsScreen from '../screens/SettingsScreen';
import StackHeader from '../shared/StackHeader/StackHeader';

const Tab = createBottomTabNavigator()

const MainTabNavigator: FC = () => {

    // console.log("Here")
  return (
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: Purple,
        tabBarInactiveTintColor: Jet,
        tabBarShowLabel: false,
        tabBarItemStyle: { paddingTop: "2.5%"},
        tabBarStyle: { height: "10%" },
        tabBarIcon: ({ color }) => {

            if (route.name === "GamesNav") {
              return <MaterialIcons name="videogame-asset" size={37} color={color} />
            }
            if (route.name === "PhotosNav") {
              return <MaterialIcons name="photo-library" size={33} color={color} />
            }
          
            return <MaterialIcons name="settings" size={33} color={color} />
        }
      })}
    
    >
      <Tab.Screen options={{ headerShown: false}} name="GamesNav" component={GamesNavigator} />
      <Tab.Screen options={{ headerShown: false }} name="PhotosNav" component={PhotosNavigator} />
      <Tab.Screen options={{ headerTitle: () => <StackHeader name="Settings" />,}} name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  )
}

export default MainTabNavigator