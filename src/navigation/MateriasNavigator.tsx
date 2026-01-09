import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MateriasStackParamList } from './types';
import { MateriasScreen } from '../screens/MateriasScreen';
import { AdicionarMateria } from '../screens/AdicionarMateria';
import { DetalhesMateria } from '../screens/DetalhesMateria';

const Stack = createStackNavigator<MateriasStackParamList>();

export const MateriasNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Materias"
      // A MÁGICA ACONTECE AQUI, NO "PAI", MUITO LEGAAAAAAAL
      screenOptions={{
        headerShown: false,
      }}

    >
      <Stack.Screen
        name="Materias"
        component={MateriasScreen}
        options={{ title: 'Visão Geral' }}
      />
      <Stack.Screen
        name="AdicionarMateria"
        component={AdicionarMateria}
        options={{
          title: 'Nova Matéria',
        }}
      />
      <Stack.Screen
        name="DetalhesMateria"
        component={DetalhesMateria}
        options={{ title: 'Detalhes da Matéria' }}
      />
    </Stack.Navigator>
  );
};