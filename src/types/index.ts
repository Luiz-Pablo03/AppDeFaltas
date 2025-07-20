export interface Falta {
    id: string;
    data: string;
    descricao?: string;
}

export interface Materia {
    id: string;
    nome: string;
    nomeProfessor?: string;
    limiteFaltas: number;
    faltas: Falta[];
}
