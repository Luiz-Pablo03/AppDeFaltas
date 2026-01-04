import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Horario } from '../types';
import { carregarHorarios, salvarHorarios } from '../data/storage';

interface HorariosContextData {
  horarios: Horario[];
  loading: boolean;
  adicionarHorario: (diaSemana: 'Segunda-Feira' | 'Terça-Feira' | 'Quarta-Feira' | 'Quinta-Feira' | 'Sexta-Feira', materiaId: string, horaInicio: string, horaFim: string, local?: string) => Promise<void>;
  removerHorario: (horarioId: string) => Promise<void>;
}

export const HorariosContext = createContext<HorariosContextData>({} as HorariosContextData);

export const HorariosProvider = ({ children }: { children: ReactNode }) => {
  const [horarios, setHorarios] = useState<Horario[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHorarios() {
      try {
        const horariosArmazenados = await carregarHorarios();
        setHorarios(horariosArmazenados);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadHorarios();
  }, []);

  const adicionarHorario = async (diaSemana: 'Segunda-Feira' | 'Terça-Feira' | 'Quarta-Feira' | 'Quinta-Feira' | 'Sexta-Feira', materiaId: string, horaInicio: string, horaFim: string, local?: string) => {
    const newHorario: Horario = {
      id: new Date().toISOString(),
      diaSemana,
      materiaId,
      horaInicio,
      horaFim,
      local,
    };
    const newHorarios = [...horarios, newHorario];
    setHorarios(newHorarios);
    await salvarHorarios(newHorarios);
  };

  const removerHorario = async (horarioId: string) => {
    const newHorarios = horarios.filter(h => h.id !== horarioId);
    setHorarios(newHorarios);
    await salvarHorarios(newHorarios);
  };

  return (
    <HorariosContext.Provider value={{ horarios, loading, adicionarHorario, removerHorario }}>
      {children}
    </HorariosContext.Provider>
  );
};
