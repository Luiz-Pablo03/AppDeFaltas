import React, { createContext, useState, useEffect, ReactNode, Children } from 'react';
import { Materia } from '../types/index';
import * as storage from '../data/storage';

interface MateriasContextData {
  materias: Materia[];
  loading: boolean;
  adicionarMateria: (nome: string, limiteFaltas: number, nomeProfessor: string) => Promise<void>;
  // no futuro, posso adicionar,  tipo:
  // removerMateria: (id: string) => Promise<void>;
  // adicionarFalta: (materiaId: string, falta: Falta) => Promise<void>;
}

// Criamos o contexto com um valor padrão inicial.
// O "as MateriasContextData" é para o TypeScript confiar em nós por enquanto.
export const MateriasContext = createContext<MateriasContextData>({} as MateriasContextData);

export const MateriasProvider = ({ children }: { children: React.ReactNode }) => {

  //estado pra guardar a lista de matérias que o app usa
  const [materias, setMaterias] = useState<Materia[]>([]);
  //estado pra ver se os dados iniciais ainda estão sendo carregados ou nao, pra evitar problema
  const [loading, setLoading] = useState(true);

  //carregar os dados do storage assim que o app abre, e somente uma vez
  useEffect(() => {
    async function carregarDados() {
      try {
        const materiasSalvas = await storage.carregarMaterias();
        setMaterias(materiasSalvas);
      }
      catch (error) {
        console.error("falha ao carregar os dados do contexto, fudeu", error);
      }
      //com sucesso ou falha, para de carregar
      finally {
        setLoading(false)
      }
    }
    carregarDados();
  }, []);

  //função pra outras telas poderem adiionar matérias
  const adicionarMateria = async (nome: string, limiteFaltas: number) => {
    try {
      const novaMateria: Materia = {
        id: String(Date.now()),
        nome,
        limiteFaltas,
        faltas: [],
      };

      const novaLista = [...materias, novaMateria];
      setMaterias(novaLista);

      await storage.salvarMaterias(novaLista);

    } catch (error) {
      console.error("erro ao adicionar matéria, fodeo", error);
    }
  };

  return(
    //renderiza o provider de mais acima aí
    <MateriasContext.Provider value={{materias, loading, adicionarMateria}}>
      {children}
    </MateriasContext.Provider>
  );
};