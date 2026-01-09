import { StackScreenProps } from '@react-navigation/stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

// Tipos para o Navegador de Matérias
export type MateriasStackParamList = {
  Materias: undefined;
  AdicionarMateria: undefined;
  DetalhesMateria: { materiaId: string };
};

// Tipos para o Navegador de Horários
export type HorariosStackParamList = {
  Horarios: undefined;
  AdicionarHorario: undefined;
};

// Tipos para o Navegador de Anotações
export type AnotacoesStackParamList = {
  Anotacoes: undefined;
  AdicionarAnotacao: { anotacaoId?: string };
  DetalhesAnotacao: { anotacaoId: string };
};

// Tipos para o Navegador Principal (Bottom Tabs)
export type AppTabParamList = {
  Matérias: undefined;
  Horários: undefined;
  Anotações: undefined;
};

// Props para cada tela do Stack de Matérias
export type MateriasScreenProps = StackScreenProps<MateriasStackParamList, 'Materias'>;
export type AdicionarMateriaScreenProps = StackScreenProps<MateriasStackParamList, 'AdicionarMateria'>;
export type DetalhesMateriaScreenProps = StackScreenProps<MateriasStackParamList, 'DetalhesMateria'>;

// Props para cada tela do Stack de Horários
export type HorariosScreenProps = StackScreenProps<HorariosStackParamList, 'Horarios'>;
export type AdicionarHorarioScreenProps = StackScreenProps<HorariosStackParamList, 'AdicionarHorario'>;

// Props para cada tela do Stack de Anotações
export type AnotacoesScreenProps = StackScreenProps<AnotacoesStackParamList, 'Anotacoes'>;
export type AdicionarAnotacaoScreenProps = StackScreenProps<AnotacoesStackParamList, 'AdicionarAnotacao'>;
export type DetalhesAnotacaoScreenProps = StackScreenProps<AnotacoesStackParamList, 'DetalhesAnotacao'>;

// Props para cada tela do Tab Navigator
export type AppTabScreenProps<T extends keyof AppTabParamList> = BottomTabScreenProps<AppTabParamList, T>;
