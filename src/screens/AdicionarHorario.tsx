import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HorariosContext } from '../context/HorariosContext';
import { MateriasContext } from '../context/MateriasContext';
import { AdicionarHorarioScreenProps } from '../navigation/types';
import { COLORS, SIZES } from '../constants/theme';
import { CustomPicker } from '../components/CustomPicker';

const diasDaSemanaOptions = [
  { key: 'Segunda-Feira', label: 'Segunda-Feira' },
  { key: 'Terça-Feira', label: 'Terça-Feira' },
  { key: 'Quarta-Feira', label: 'Quarta-Feira' },
  { key: 'Quinta-Feira', label: 'Quinta-Feira' },
  { key: 'Sexta-Feira', label: 'Sexta-Feira' },
];

export const AdicionarHorario = ({ navigation }: AdicionarHorarioScreenProps) => {
  const { adicionarHorario } = useContext(HorariosContext);
  const { materias } = useContext(MateriasContext);

  const [diaSemana, setDiaSemana] = useState('Segunda-Feira');
  const [materiaId, setMateriaId] = useState<string | undefined>();
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFim, setHoraFim] = useState('');
  const [local, setLocal] = useState('');

  const handleTimeChange = (text: string, setter: (value: string) => void) => {
    const cleaned = text.replace(/[^0-9]/g, '');
    if (cleaned.length <= 2) {
      setter(cleaned);
    } else if (cleaned.length <= 4) {
      setter(`${cleaned.slice(0, 2)}:${cleaned.slice(2)}`);
    }
  };

  const handleSalvar = async () => {
    if (!materiaId || !horaInicio.trim() || !horaFim.trim()) {
      Alert.alert('Campos Obrigatórios', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    await adicionarHorario(diaSemana, materiaId, horaInicio, horaFim, local);
    navigation.goBack();
  };

  const materiasOptions = materias.map(m => ({ key: m.id, label: m.nome }));
  const selectedMateria = materiasOptions.find(m => m.key === materiaId);
  const selectedDiaSemana = diasDaSemanaOptions.find(d => d.key === diaSemana);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Adicionar Horário</Text>

        <Text style={styles.label}>Dia da Semana</Text>
        <CustomPicker
          data={diasDaSemanaOptions}
          onSelect={(option) => setDiaSemana(option.key)}
          placeholder="Selecione um dia"
          selectedValue={selectedDiaSemana}
        />

        <Text style={styles.label}>Matéria</Text>
        <CustomPicker
          data={materiasOptions}
          onSelect={(option) => setMateriaId(option.key)}
          placeholder="Selecione uma matéria"
          selectedValue={selectedMateria}
        />


        <Text style={styles.label}>Hora de Início</Text>
        <TextInput
          style={styles.input}
          value={horaInicio}
          onChangeText={(text) => handleTimeChange(text, setHoraInicio)}
          placeholder="HH:MM"
          placeholderTextColor={COLORS.textTertiary}
          keyboardType="numeric"
          maxLength={5}
        />

        <Text style={styles.label}>Hora de Fim</Text>
        <TextInput
          style={styles.input}
          value={horaFim}
          onChangeText={(text) => handleTimeChange(text, setHoraFim)}
          placeholder="HH:MM"
          placeholderTextColor={COLORS.textTertiary}
          keyboardType="numeric"
          maxLength={5}
        />

        <Text style={styles.label}>Local (Opcional)</Text>
        <TextInput
          style={styles.input}
          value={local}
          onChangeText={setLocal}
          placeholder="Sala, Laboratório, etc."
          placeholderTextColor={COLORS.textTertiary}
        />

        <Button title="Salvar Horário" onPress={handleSalvar} color={COLORS.primary} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: SIZES.padding,
  },
  title: {
    fontSize: SIZES.title,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SIZES.marginVertical,
    marginTop: SIZES.padding*1,
  },
  label: {
    fontSize: SIZES.textNormal,
    marginBottom: SIZES.padding / 2,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  input: {
    backgroundColor: COLORS.cardBackground,
    color: COLORS.textPrimary,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding * 0.75,
    borderRadius: SIZES.borderRadius,
    fontSize: SIZES.textNormal,
    marginBottom: SIZES.marginVertical,
    borderWidth: 1,
    borderColor: COLORS.textTertiary,
    justifyContent: 'center',
  },
  picker: {
    backgroundColor: COLORS.cardBackground,
    color: COLORS.textPrimary,
    marginBottom: SIZES.marginVertical,
  },
});