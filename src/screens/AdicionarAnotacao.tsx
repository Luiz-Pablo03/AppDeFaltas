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
        // Format date back to DD/MM/YYYY for the input
        const [year, month, day] = anotacao.date.split('-');
        setDate(`${day}/${month}/${year}`);
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
    const match = date.match(dateRegex);

    if (!match) {
        Alert.alert("Formato de Data Inválido", "Por favor, insira a data no formato DD/MM/AAAA.");
        return;
    }
    
    const [_, dia, mes, ano] = match;
    const formattedDate = `${ano}-${mes}-${dia}`;
    
    const anotacaoData = { 
      title: title.trim(), 
      date: formattedDate, 
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
              <TextInput style={styles.input} value={date} onChangeText={setDate} placeholder="DD/MM/AAAA" placeholderTextColor={COLORS.textTertiary}/>
              
              <Text style={styles.label}>Horário</Text>
              <TextInput style={styles.input} value={time} onChangeText={setTime} placeholder="Ex: 14h-16h" placeholderTextColor={COLORS.textTertiary}/>

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
