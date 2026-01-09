import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AnotacoesScreen } from '../screens/AnotacoesScreen';
import { AdicionarAnotacao } from '../screens/AdicionarAnotacao';
import { DetalhesAnotacao } from '../screens/DetalhesAnotacao';
import { AnotacoesStackParamList } from './types';


const Stack = createStackNavigator<AnotacoesStackParamList>();

export const AnotacoesNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Anotacoes" component={AnotacoesScreen} />
      <Stack.Screen name="AdicionarAnotacao" component={AdicionarAnotacao} />
      <Stack.Screen name="DetalhesAnotacao" component={DetalhesAnotacao} />
    </Stack.Navigator>
  );
};
