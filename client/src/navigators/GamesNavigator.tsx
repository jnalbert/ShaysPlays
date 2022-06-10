import { createStackNavigator } from '@react-navigation/stack';
import React, { FC } from 'react';
import { View } from 'react-native';
import GamesScreen from '../screens/Games/GamesScreen';
import GameWinScreen from '../screens/Games/GameWinScreen';
import MemoryScreen from '../screens/Games/MemoryScreen';
import SudokuScreen from '../screens/Games/SudokuScreen';
import WordleScreen from '../screens/Games/WordleScreen';
import { backgroundColor } from '../shared/colors';
import StackHeader from '../shared/StackHeader/StackHeader';
import StackHeaderBackButton from '../shared/StackHeader/StackHeaderBackButton';

const Stack = createStackNavigator();

const GamesNavigator: FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: backgroundColor,
          borderBottomColor: backgroundColor,
          shadowColor: "transparent",
        },
        headerBackImage: () => {
          return <StackHeaderBackButton />;
        },
        headerBackTitleVisible: false,
      }}
    >

      <Stack.Screen
        name="Games"
        component={GamesScreen}
        options={{
          headerTitle: "Games",
          // headerShown: false,
        }}
      />

      <Stack.Screen
        name="WordleScreen"
        component={WordleScreen}
        options={{
            headerTitle: () => <StackHeader name="" />,
            headerShown: true,
        }}
      />

      <Stack.Screen
        name="SudokuScreen"
        component={SudokuScreen}
        options={{
          headerTitle: () => <StackHeader name="" />,
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="MemoryScreen"
        component={MemoryScreen}
        options={{
          headerTitle: () => <StackHeader name="" />,
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="GameWinScreen"
        component={GameWinScreen}
        options={{
          headerTitle: () => <StackHeader name="" />,
          headerShown: true,
        }}
      />

      
    </Stack.Navigator>
  )
}

export default GamesNavigator