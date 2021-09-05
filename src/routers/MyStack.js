import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { EmailScreen } from '../screens/EmailScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { PasswordScreen } from '../screens/PasswordScreen';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Stack = createStackNavigator();

export const MyStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: '#FFFFFF'
        },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
      }}
    >
      <Stack.Screen
        options={{headerShown: false}}
        name="Email"
        component={EmailScreen}
      />
      <Stack.Screen
        options={{
          header: ({ navigation }) => {
            return (
              <TouchableOpacity 
                style={{
                  borderColor: '#707070',
                  borderWidth: 1,
                  borderRadius: 20,
                  width: 80,
                  position: 'relative',
                  top: 10,
                  left: 10,
                  paddingLeft: 10,
                  paddingTop: 5,
                  paddingBottom: 5,
                  paddingRight: 15,
                }}
                onPress={() => navigation.goBack()}
                activeOpacity={.7}
              >
                <View>
                  <Text style={{fontSize: 16, fontWeight: 'bold', color: '#707070'}}>Back</Text>
                </View>
              </TouchableOpacity>
            );
          }
        }}
        name="Password"
        component={PasswordScreen}
      />
      <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};