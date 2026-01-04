import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HorariosScreen } from '../screens/HorariosScreen';
import { AdicionarHorario } from '../screens/AdicionarHorario';
import { HorariosStackParamList } from './types';

const Stack = createStackNavigator<HorariosStackParamList>();

export const HorariosNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Horarios" component={HorariosScreen} />
      <Stack.Screen name="AdicionarHorario" component={AdicionarHorario} />
    </Stack.Navigator>
  );
};
