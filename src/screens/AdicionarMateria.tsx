import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  StyleSheet, 
  Alert, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMaterias } from '../hooks/useMaterias';
import { AdicionarMateriaScreenProps } from '../navigation/types';
import { COLORS, SIZES } from '../constants/theme';

export const AdicionarMateria = ({ navigation }: AdicionarMateriaScreenProps) => {
  const { adicionarMateria } = useMaterias();
  const [nome, setNome] = useState('');
  const [nomeProfessor, setNomeProfessor] = useState('');
  const [totalDeAulas, setTotalDeAulas] = useState('');
  const [percentual, setPercentual] = useState('');

  const handleSalvar = async () => {
    if (!nome.trim() || !totalDeAulas.trim() || !percentual.trim()) {
      Alert.alert('Campos Obrigatórios', 'Por favor, preencha o nome da matéria, o total de aulas e o percentual de presença.');
      return;
    }
    const totalAulasNum = Number(totalDeAulas);
    const percentualNum = Number(percentual);
    if (isNaN(totalAulasNum) || isNaN(percentualNum) || totalAulasNum <= 0 || percentualNum <= 0 || percentualNum > 100) {
        Alert.alert("Valores Inválidos", "Por favor, insira valores numéricos válidos para as aulas e o percentual (o percentual deve ser entre 1 e 100).");
        return;
    }
    await adicionarMateria(nome.trim(), nomeProfessor.trim(), totalAulasNum, percentualNum);
    navigation.goBack();
  };

  const isLightTheme = COLORS.background === '#f5f5f5';

  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar barStyle={isLightTheme ? 'dark-content' : 'light-content'} />
      <View style={styles.innerContainer}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
          <ScrollView>
            <Text style={styles.title}>Nova Matéria</Text>
            <View style={styles.form}>
              <Text style={styles.label}>Nome da Matéria</Text>
              <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Ex: Engenharia de Software" placeholderTextColor={COLORS.textTertiary}/>

              <Text style={styles.label}>Nome do Professor (Opcional)</Text>
              <TextInput style={styles.input} value={nomeProfessor} onChangeText={setNomeProfessor} placeholder="Ex: Prof.ª Ada Lovelace" placeholderTextColor={COLORS.textTertiary}/>
              
              <Text style={styles.label}>Carga Horária no Semestre</Text>
              <TextInput style={styles.input} value={totalDeAulas} onChangeText={setTotalDeAulas} placeholder="Ex: 80" keyboardType="numeric" placeholderTextColor={COLORS.textTertiary}/>

              <Text style={styles.label}>Presença Mínima Obrigatória (%)</Text>
              <TextInput style={styles.input} value={percentual} onChangeText={setPercentual} placeholder="Ex: 75" keyboardType="numeric" placeholderTextColor={COLORS.textTertiary}/>

              <TouchableOpacity style={styles.buttonSave} onPress={handleSalvar}>
                <Text style={{ color: COLORS.textPrimary, fontSize: SIZES.textNormal, fontWeight: '600', textAlign: 'center' }}>Salvar Matéria</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
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
    marginTop: SIZES.padding * 1,
    marginBottom: SIZES.marginVertical,
  },
  form: {
    paddingVertical: SIZES.padding,
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
  },
  buttonSave: {
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.padding * 0.75,
    paddingHorizontal: SIZES.padding,
    borderRadius: SIZES.borderRadius,
    marginTop: SIZES.marginVertical,
  },
});