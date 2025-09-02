// src/types/index.ts

export interface Materia {
  id: string;
  nome: string;
  nomeProfessor?: string;
  faltas: Falta[];
  totalDeAulas: number;
  percentualMinimoPresenca: number; 
}

export interface Falta {  
  id: string;
  data: string;
  descricao?: string;
}