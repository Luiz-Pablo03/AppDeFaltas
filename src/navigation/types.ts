import { StackScreenProps } from '@react-navigation/stack';

export type MateriasStackParamList = {
    Materias: undefined;
    AdicionarMateria: undefined;
    DetalhesMateria: { materiaId: string };
};

export type HorariosStackParamList = {
    Horarios: undefined;
    AdicionarHorario: undefined;
};

export type AnotacoesStackParamList = {
    Anotacoes: undefined;
    AdicionarAnotacao: undefined;
};

export type AdicionarMateriaScreenProps = StackScreenProps<MateriasStackParamList, 'AdicionarMateria'>;
export type DetalhesMateriaScreenProps = StackScreenProps<MateriasStackParamList, 'DetalhesMateria'>;
export type MateriasScreenProps = StackScreenProps<MateriasStackParamList, 'Materias'>;
export type HorariosScreenProps = StackScreenProps<HorariosStackParamList, 'Horarios'>;
export type AdicionarHorarioScreenProps = StackScreenProps<HorariosStackParamList, 'AdicionarHorario'>;