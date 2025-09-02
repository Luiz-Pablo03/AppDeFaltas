import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types';

import { HomeScreen } from '../screens/HomeScreen';
import { AdicionarMateria } from '../screens/AdicionarMateria';
// Import atualizado para o novo nome de arquivo
import { DetalhesMateria } from '../screens/DetalhesMateria';

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      // A MÁGICA ACONTECE AQUI, NO "PAI"
      screenOptions={{
        headerShown: false,
      }}

    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Visão Geral' }}
      />
      <Stack.Screen
        name="AdicionarMateria"
        component={AdicionarMateria}
        options={{
          title: 'Nova Matéria',
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="DetalhesMateria"
        // Componente atualizado para o novo nome
        component={DetalhesMateria}
        options={{ title: 'Detalhes da Matéria' }}
      />
    </Stack.Navigator>
  );
};