import AsyncStorage from "@react-native-async-storage/async-storage";
import { Materia } from "../types";

const STORAGE_KEY = '@faltaApp:materias';

export async function salvarMaterias(materias: Materia[]): Promise<void> {
    try {
        const jsonValue = JSON.stringify(materias);
        await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    } catch (e) {
        console.error("Erro ao salvar matérias:", e);
        throw new Error("Não foi possível salvar as matérias.");
    }
}

export async function carregarMaterias(): Promise<Materia[]> {
    try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.error("Erro ao carregar matérias:", e);
        throw new Error("Não foi possível carregar as matérias.");
    }
}
