import { createStackNavigator } from '@react-navigation/stack';
import React, { FC } from 'react';
import { View } from 'react-native';
import PhotoGalleryScreen from '../screens/Photos/PhotoGalleryScreen';
import PhotosScreen from '../screens/Photos/PhotosScreen';
import { backgroundColor } from '../shared/colors';
import StackHeader from '../shared/StackHeader/StackHeader';
import StackHeaderBackButton from '../shared/StackHeader/StackHeaderBackButton';

const Stack = createStackNavigator();

const PhotosNavigator: FC = () => {
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
      name="Photos"
      component={PhotosScreen}
      options={{
        headerTitle: () => <StackHeader name="Photos" />,
        // headerShown: false,
      }}
    />

    <Stack.Screen
      name="PhotoGallery"
      component={PhotoGalleryScreen}
      options={{
          headerTitle: () => <StackHeader name="" />,
          headerShown: true,
      }}
    />

  </Stack.Navigator>
  )
}

export default PhotosNavigator