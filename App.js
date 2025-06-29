import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import CalendarScreen from './screens/CalendarScreen';
import StudyRoomsScreen from './screens/StudyRoomsScreen';
import MaterialScreen from './screens/MaterialScreen'; // Importe a tela


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ title: 'Login' }}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Página Inicial' }}
        />
        <Stack.Screen 
          name="Calendar" 
          component={CalendarScreen} 
          options={{ title: 'Calendário de Eventos' }}
        />
        <Stack.Screen 
          name="StudyRooms" 
          component={StudyRoomsScreen} 
          options={{ title: 'Salas de Estudo' }}
        />
        <Stack.Screen 
        name="Material" 
        component={MaterialScreen} 
        options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}