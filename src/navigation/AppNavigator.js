import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthenticateReddit from "../screens/AuthenticateReddit";
import HomePage from "../screens/HomePage";
import Connection from "../utils/connection";
import FeedsDetails from "../screens/FeedsDetails";
import {THEME_COLOR} from "../utils/Globals";

const Stack = createStackNavigator();

const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
        // gestureEnabled: false,
        // headerShown: false
    }} initialRouteName="AuthenticateReddit">
      <Stack.Screen
        name="AuthenticateReddit"
        options={{ headerShown: false }}
        component={AuthenticateReddit}
      />

      <Stack.Screen
        options={{
          cardStyleInterpolator: forFade,
            headerShown: true,
            title: 'Feeds',
            headerStyle: {
                backgroundColor: THEME_COLOR,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 18
            },
        }}
        name="HomePage"
        component={HomePage}
      />

        <Stack.Screen
        options={{
          cardStyleInterpolator: forFade,
            headerShown: true,
            title: 'Comments',
            headerStyle: {
                backgroundColor: THEME_COLOR,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 18
            },
        }}
        name="FeedsDetails"
        component={FeedsDetails}
      />

        <Stack.Screen
        options={{ cardStyleInterpolator: forFade, headerShown: false  }}
        name="Connection"
        component={Connection}
      />


    </Stack.Navigator>
  );
};

export default AppNavigator;