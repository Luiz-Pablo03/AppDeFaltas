import AsyncStorage from "@react-native-async-storage/async-storage";
import { salvarMaterias, carregarMaterias } from "../../data/storage";
import { Materia } from "../../types";

const STORAGE_KEY = '@faltaApp:materias';

//dados fictícios para o teste
const mockMaterias: Materia[] = [
    {
        id: 'materia-01',
        nome: 'Cálculo 1',
        limiteFaltas: 10,
        faltas:
            [
                { id: 'falta-01', data: '21/07/2025' },
                { id: 'falta-02', data: '22/07/2025' },
                { id: 'falta-03', data: '23/07/2025' }
            ]
    },

    {
        id: 'materia-02',
        nome: 'Física 1',
        limiteFaltas: 10,
        faltas:
            [
                { id: 'falta-01', data: '21/07/2025' },
                { id: 'falta-02', data: '22/07/2025' },
                { id: 'falta-03', data: '23/07/2025' }
            ]
    },

    {
        id: 'materia-03',
        nome: 'Algébra 1',
        limiteFaltas: 10,
        faltas:
            [
                { id: 'falta-01', data: '21/07/2025' },
                { id: 'falta-02', data: '22/07/2025' },
                { id: 'falta-03', data: '23/07/2025' }
            ]
    },
];

describe('storage functions', () => {

  // Limpa o mock do AsyncStorage antes de cada teste para garantir isolamento
  beforeEach(() => {
    (AsyncStorage.clear as jest.Mock)();
  });

  describe('salvarMaterias', () => {
    it('deve chamar AsyncStorage.setItem com a chave e os valores corretos', async () => {
      await salvarMaterias(mockMaterias);

      const expectedValue = JSON.stringify(mockMaterias);

      expect(AsyncStorage.setItem).toHaveBeenCalledTimes(1);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(STORAGE_KEY, expectedValue);
    });

    it('deve lançar um erro quando AsyncStorage.setItem falhar', async () => {
      const errorMessage = 'Erro de escrita no disco';
      (AsyncStorage.setItem as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

      await expect(salvarMaterias(mockMaterias)).rejects.toThrow("Não foi possível salvar as matérias.");
    });
  });

  describe('carregarMaterias', () => {
    it('deve retornar um array de matérias quando houver dados salvos', async () => {
      const jsonValue = JSON.stringify(mockMaterias);
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(jsonValue);
      
      const materias = await carregarMaterias();

      expect(AsyncStorage.getItem).toHaveBeenCalledWith(STORAGE_KEY);
      expect(materias).toEqual(mockMaterias);
    });

    it('deve retornar um array vazio quando não houver dados salvos', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);

      const materias = await carregarMaterias();

      expect(materias).toEqual([]);
    });

    it('deve lançar um erro quando AsyncStorage.getItem falhar', async () => {
      const errorMessage = 'Erro de leitura do disco';
      (AsyncStorage.getItem as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

      await expect(carregarMaterias()).rejects.toThrow("Não foi possível carregar as matérias.");
    });
  });
});