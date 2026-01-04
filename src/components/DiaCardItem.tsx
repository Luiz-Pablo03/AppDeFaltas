import React, { useMemo } from 'react';
import { DiaCard } from './DiaCard';
import { Horario } from '../types';

interface DiaCardItemProps {
  dia: string;
  horarios: Horario[];
}

export const DiaCardItem = ({ dia, horarios }: DiaCardItemProps) => {
  const filteredHorarios = useMemo(() => {
    return horarios.filter(h => h.diaSemana === dia);
  }, [horarios, dia]);

  return <DiaCard dia={dia} horarios={filteredHorarios} />;
};
