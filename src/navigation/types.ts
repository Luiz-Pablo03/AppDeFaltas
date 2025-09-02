import { StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  AdicionarMateria: undefined;
  DetalhesMateria: { materiaId: string };
};

export type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;
export type AdicionarMateriaScreenProps = StackScreenProps<RootStackParamList, 'AdicionarMateria'>;
export type DetalhesMateriaScreenProps = StackScreenProps<RootStackParamList, 'DetalhesMateria'>;