import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/HomeScreen';
import LoginScreen from '../../screens/LoginScreen';
import SignUpScreen from '../../screens/SignUpScreen';
import DashboardScreen from '../../screens/DashboardScreen';
import AddExpenseScreen from '../../screens/AddExpenseScreen';
import viewreportScreen from '../../screens/viewreportScreen';
import ProfileScreen from '../../screens/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
        <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
        <Stack.Screen name="Signup" options={{ headerShown: false }} component={SignUpScreen} />
        <Stack.Screen name="Dashboard" options={{ headerShown: false }} component={DashboardScreen} />
        <Stack.Screen name="AddExpense" options={{ headerShown: false }} component={AddExpenseScreen} />
        <Stack.Screen name="ViewReport" options={{ headerShown: false }} component={viewreportScreen} />
        <Stack.Screen name="Profile" options={{ headerShown: false }} component={ProfileScreen} />
        
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
