import { useContext } from 'react';
import { MateriasContext, MateriasContextData } from '../context/MateriasContext';

export function useMaterias(): MateriasContextData {
  const context = useContext(MateriasContext);

  if (!context) {
    throw new Error('useMaterias deve ser usado dentro de um MateriasProvider');
  }

  return context;
}