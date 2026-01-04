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

export interface Horario {
  id: string;
  diaSemana: 'Segunda-Feira' | 'Terça-Feira' | 'Quarta-Feira' | 'Quinta-Feira' | 'Sexta-Feira';
  materiaId: string;
  horaInicio: string;
  horaFim: string;
  local?: string;
}