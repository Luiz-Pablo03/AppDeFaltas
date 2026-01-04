import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { Anotacao } from '../types';
import { carregarAnotacoes, salvarAnotacoes } from '../data/storage';

interface AnotacoesContextData {
  anotacoes: Anotacao[];
  adicionarAnotacao: (anotacao: Omit<Anotacao, 'id'>) => Promise<void>;
  loading: boolean;
}

const AnotacoesContext = createContext<AnotacoesContextData | undefined>(undefined);

export const AnotacoesProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [anotacoes, setAnotacoes] = useState<Anotacao[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnotacoes = async () => {
      try {
        const anotacoesCarregadas = await carregarAnotacoes();
        setAnotacoes(anotacoesCarregadas);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadAnotacoes();
  }, []);

  const adicionarAnotacao = async (anotacao: Omit<Anotacao, 'id'>) => {
    try {
      const novaAnotacao = { ...anotacao, id: Date.now().toString() };
      const novasAnotacoes = [...anotacoes, novaAnotacao];
      setAnotacoes(novasAnotacoes);
      await salvarAnotacoes(novasAnotacoes);
    } catch (error) {
      console.error(error);
      // Poderíamos reverter o estado aqui se a persistência falhar
    }
  };

  return (
    <AnotacoesContext.Provider value={{ anotacoes, adicionarAnotacao, loading }}>
      {children}
    </AnotacoesContext.Provider>
  );
};

export const useAnotacoes = () => {
  const context = useContext(AnotacoesContext);
  if (context === undefined) {
    throw new Error('useAnotacoes must be used within a AnotacoesProvider');
  }
  return context;
};
