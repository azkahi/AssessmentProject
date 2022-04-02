import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from 'screen/homeScreen';
import FavScreen from 'screen/favScreen';

/* TabBarBottom */
export const TabBottom = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favourites" component={FavScreen} />
    </Tab.Navigator>
  );
};
