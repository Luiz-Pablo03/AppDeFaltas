import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAnotacoes } from '../context/AnotacoesContext';
import { AdicionarAnotacaoScreenProps } from '../navigation/types';
import { COLORS, SIZES } from '../constants/theme';

export const AdicionarAnotacao = ({ route, navigation }: AdicionarAnotacaoScreenProps) => {
  const { anotacaoId } = route.params || {};
  const { anotacoes, adicionarAnotacao, editarAnotacao } = useAnotacoes();
  
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [details, setDetails] = useState('');
  
  const isEditing = !!anotacaoId;

  useEffect(() => {
    if (isEditing) {
      const anotacao = anotacoes.find(a => a.id === anotacaoId);
      if (anotacao) {
        setTitle(anotacao.title);
        setDate(anotacao.date);
        setTime(anotacao.time);
        setDetails(anotacao.details || '');
      }
    }
  }, [anotacaoId, anotacoes, isEditing]);

  const handleSalvar = async () => {
    if (!title.trim() || !date.trim() || !time.trim()) {
      Alert.alert('Campos Obrigatórios', 'Por favor, preencha o título, a data e o horário.');
      return;
    }

    const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const dateMatch = date.match(dateRegex);

    if (!dateMatch) {
      Alert.alert("Formato de Data Inválido", "Por favor, insira a data no formato DD/MM/AAAA.");
      return;
    }

    const [_, dia, mes, ano] = dateMatch;
    const diaNum = parseInt(dia, 10);
    const mesNum = parseInt(mes, 10);

    if (diaNum < 1 || diaNum > 31) {
      Alert.alert("Data Inválida", "O dia deve estar entre 1 e 31.");
      return;
    }

    if (mesNum < 1 || mesNum > 12) {
      Alert.alert("Data Inválida", "O mês deve estar entre 1 e 12.");
      return;
    }

    const timeRegex = /^(\d{2}):(\d{2})$/;
    const timeMatch = time.match(timeRegex);

    if (!timeMatch) {
      Alert.alert("Formato de Hora Inválido", "Por favor, insira a hora no formato HH:MM.");
      return;
    }

    const [__, hora, minuto] = timeMatch;
    const horaNum = parseInt(hora, 10);
    const minutoNum = parseInt(minuto, 10);

    if (horaNum < 0 || horaNum > 23) {
      Alert.alert("Hora Inválida", "A hora deve estar entre 0 e 23.");
      return;
    }

    if (minutoNum < 0 || minutoNum > 59) {
      Alert.alert("Hora Inválida", "O minuto deve estar entre 0 e 59.");
      return;
    }

    const anotacaoData = { 
      title: title.trim(), 
      date: date.trim(), 
      time: time.trim(), 
      details: details.trim() 
    };

    if (isEditing) {
      await editarAnotacao({ id: anotacaoId, ...anotacaoData });
    } else {
      await adicionarAnotacao(anotacaoData);
    }
    navigation.goBack();
  };

  const formatDate = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, '');
    const match = cleaned.match(/^(\d{0,2})(\d{0,2})(\d{0,4})$/);
    if (!match) {
      return '';
    }
    const part1 = match[1];
    const part2 = match[2];
    const part3 = match[3];
  
    if (part3.length > 0) {
      return `${part1}/${part2}/${part3}`;
    }
    if (part2.length > 0) {
      return `${part1}/${part2}`;
    }
    return part1;
  };
  
  const formatTime = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, '');
    if (cleaned.length <= 2) {
      return cleaned;
    }
    return `${cleaned.slice(0, 2)}:${cleaned.slice(2, 4)}`;
  };

  const isLightTheme = COLORS.background === '#f5f5f5';

  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar barStyle={isLightTheme ? 'dark-content' : 'light-content'} />
      <View style={styles.innerContainer}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
          <ScrollView>
            <Text style={styles.title}>{isEditing ? 'Editar Anotação' : 'Nova Anotação'}</Text>
            <View style={styles.form}>
              <Text style={styles.label}>Título</Text>
              <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Ex: Fui ao trabalho" placeholderTextColor={COLORS.textTertiary}/>

              <Text style={styles.label}>Data</Text>
              <TextInput
                style={styles.input}
                value={date}
                onChangeText={(text) => setDate(formatDate(text))}
                placeholder="DD/MM/AAAA"
                keyboardType="numeric"
                maxLength={10}
                placeholderTextColor={COLORS.textTertiary}
              />
              
              <Text style={styles.label}>Horário</Text>
              <TextInput
                style={styles.input}
                value={time}
                onChangeText={(text) => setTime(formatTime(text))}
                placeholder="HH:MM"
                keyboardType="numeric"
                maxLength={5}
                placeholderTextColor={COLORS.textTertiary}
              />

              <Text style={styles.label}>Detalhes (Opcional)</Text>
              <TextInput style={[styles.input, { height: 100 }]} value={details} onChangeText={setDetails} placeholder="Ex: Fiz hora extra" multiline placeholderTextColor={COLORS.textTertiary}/>

              <TouchableOpacity style={styles.buttonSave} onPress={handleSalvar}>
                <Text style={{ color: COLORS.textPrimary, fontSize: SIZES.textNormal, fontWeight: '600', textAlign: 'center' }}>Salvar Anotação</Text>
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
