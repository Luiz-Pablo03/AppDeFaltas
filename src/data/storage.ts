import AsyncStorage from "@react-native-async-storage/async-storage";
import { Materia, Horario, Anotacao } from "../types";

const MATERIAS_STORAGE_KEY = '@faltaApp:materias';
const HORARIOS_STORAGE_KEY = '@faltaApp:horarios';
const ANOTACOES_STORAGE_KEY = '@faltaApp:anotacoes';

export async function salvarMaterias(materias: Materia[]): Promise<void> {
    try {
        const jsonValue = JSON.stringify(materias);
        await AsyncStorage.setItem(MATERIAS_STORAGE_KEY, jsonValue);
    } catch (e) {
        console.error("Erro ao salvar matérias:", e);
        throw new Error("Não foi possível salvar as matérias.");
    }
}

export async function carregarMaterias(): Promise<Materia[]> {
    try {
        const jsonValue = await AsyncStorage.getItem(MATERIAS_STORAGE_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.error("Erro ao carregar matérias:", e);
        throw new Error("Não foi possível carregar as matérias.");
    }
}

export async function salvarHorarios(horarios: Horario[]): Promise<void> {
    try {
        const jsonValue = JSON.stringify(horarios);
        await AsyncStorage.setItem(HORARIOS_STORAGE_KEY, jsonValue);
    } catch (e) {
        console.error("Erro ao salvar horários:", e);
        throw new Error("Não foi possível salvar os horários.");
    }
}

export async function carregarHorarios(): Promise<Horario[]> {
    try {
        const jsonValue = await AsyncStorage.getItem(HORARIOS_STORAGE_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.error("Erro ao carregar horários:", e);
        throw new Error("Não foi possível carregar os horários.");
    }
}

export async function salvarAnotacoes(anotacoes: Anotacao[]): Promise<void> {
    try {
        const jsonValue = JSON.stringify(anotacoes);
        await AsyncStorage.setItem(ANOTACOES_STORAGE_KEY, jsonValue);
    } catch (e) {
        console.error("Erro ao salvar anotações:", e);
        throw new Error("Não foi possível salvar as anotações.");
    }
}

export async function carregarAnotacoes(): Promise<Anotacao[]> {
    try {
        const jsonValue = await AsyncStorage.getItem(ANOTACOES_STORAGE_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.error("Erro ao carregar anotações:", e);
        throw new Error("Não foi possível carregar as anotações.");
    }
}
