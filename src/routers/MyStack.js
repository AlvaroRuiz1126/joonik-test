import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { EmailScreen } from '../screens/EmailScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { PasswordScreen } from '../screens/PasswordScreen';

const Stack = createStackNavigator();

export const MyStack = () => {
    return (
        <Stack.Navigator>
          <Stack.Screen name="Email" component={EmailScreen} />
          <Stack.Screen name="Password" component={PasswordScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
    );
};