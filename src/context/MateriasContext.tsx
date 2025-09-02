import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Materia, Falta } from '../types'; // Importando Falta também
import * as storage from '../data/storage';

export interface MateriasContextData {
  materias: Materia[];
  loading: boolean;
  adicionarMateria: (
    nome: string,
    nomeProfessor: string,
    totalDeAulas: number,
    percentualMinimoPresenca: number
  ) => Promise<void>
  excluirMateria: (materiaId: string) => Promise<void>;
  adicionarFalta: (materiaId: string) => Promise<void>;
  removerFalta: (materiaId: string, faltaId: string) => Promise<void>;
}

export const MateriasContext = createContext<MateriasContextData>({} as MateriasContextData);

export const MateriasProvider = ({ children }: { children: React.ReactNode }) => {
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [loading, setLoading] = useState(true);

  // Carrega os dados iniciais do storage (sem alterações)
  useEffect(() => {
    async function carregarDados() {
      try {
        const materiasSalvas = await storage.carregarMaterias();
        setMaterias(materiasSalvas);
      } catch (error) {
        console.error("Falha ao carregar dados no contexto", error);
      } finally {
        setLoading(false);
      }
    }
    carregarDados();
  }, []);

  // Função para adicionar uma matéria inteira (sem alterações)
  const adicionarMateria = async (
    nome: string,
    nomeProfessor: string,
    totalDeAulas: number,
    percentualMinimoPresenca: number
  ) => {
    try {
      const novaMateria: Materia = {
        id: String(Date.now()),
        nome,
        nomeProfessor,
        faltas: [],
        totalDeAulas,
        percentualMinimoPresenca,
      };
      const novaLista = [...materias, novaMateria];
      setMaterias(novaLista);
      await storage.salvarMaterias(novaLista);
    } catch (error) {
      console.error("Erro ao adicionar matéria", error);
    }
  };

  // --- NOVAS FUNÇÕES IMPLEMENTADAS ---

  const excluirMateria = async (materiaId: string) => {
    const novaLista = materias.filter(m => m.id !== materiaId);
    setMaterias(novaLista);
    await storage.salvarMaterias(novaLista);
  };

  const adicionarFalta = async (materiaId: string) => {
    const novaFalta: Falta = {
      id: String(Date.now()),
      data: new Date().toISOString(), // Salva a data e hora atual
    };
    const novaLista = materias.map(materia => 
      materia.id === materiaId 
        ? { ...materia, faltas: [...materia.faltas, novaFalta] } 
        : materia
    );
    setMaterias(novaLista);
    await storage.salvarMaterias(novaLista);
  };

  const removerFalta = async (materiaId: string, faltaId: string) => {
    const novaLista = materias.map(materia => {
      if (materia.id === materiaId) {
        const novasFaltas = materia.faltas.filter(falta => falta.id !== faltaId);
        return { ...materia, faltas: novasFaltas };
      }
      return materia;
    });
    setMaterias(novaLista);
    await storage.salvarMaterias(novaLista);
  };

  return (
    <MateriasContext.Provider
      value={{
        materias,
        loading,
        adicionarMateria,
        // Adicionando as novas funções para serem compartilhadas
        excluirMateria,
        adicionarFalta,
        removerFalta,
      }}
    >
      {children}
    </MateriasContext.Provider>
  );
};
