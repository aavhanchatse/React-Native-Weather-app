//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Search from '../screens/Search';
import {Icon} from 'native-base';

const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: () => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'weather-cloudy';
            } else if (route.name === 'Search') {
              iconName = 'city-variant-outline';
            }

            return <Icon type="MaterialCommunityIcons" name={iconName} />;
          },
        })}
        tabBarOptions={{
          showLabel: false,
          style: {
            backgroundColor: 'transparent',
            borderTopWidth: 0,
            position: 'absolute',
            elevation: 0,
          },
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          initialParams={{city: 'aurangabad'}}
        />
        <Tab.Screen name="Search" component={Search} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

//make this component available to the app
export default Navigation;
