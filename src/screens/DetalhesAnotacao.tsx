import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAnotacoes } from '../context/AnotacoesContext';
import { DetalhesAnotacaoScreenProps } from '../navigation/types';
import { COLORS, SIZES } from '../constants/theme';
import { Feather } from '@expo/vector-icons';

export const DetalhesAnotacao = ({ route, navigation }: DetalhesAnotacaoScreenProps) => {
  const { anotacaoId } = route.params;
  const { anotacoes, excluirAnotacao } = useAnotacoes();
  const anotacao = anotacoes.find(a => a.id === anotacaoId);

  const handleExcluir = () => {
    Alert.alert(
      "Confirmar Exclusão",
      `Você tem certeza que deseja excluir a anotação "${anotacao?.title}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Excluir", 
          style: "destructive",
          onPress: () => {
            excluirAnotacao(anotacaoId);
            navigation.goBack();
          }
        }
      ]
    );
  };

  if (!anotacao) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <Text style={{ color: COLORS.textPrimary }}>Anotação não encontrada.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>{anotacao.title}</Text>
          <Text style={styles.subtitle}>{new Date(anotacao.date).toLocaleDateString('pt-BR')} - {anotacao.time}</Text>
          
          <Text style={styles.details}>{anotacao.details}</Text>
        </View>

        <View style={styles.actionsContainer}>
            <TouchableOpacity 
                style={[styles.actionButton, styles.editButton]} 
                onPress={() => navigation.navigate('AdicionarAnotacao', { anotacaoId: anotacao.id })}
            >
                <Feather name="edit" size={20} color={COLORS.textPrimary} />
                <Text style={[styles.actionButtonText, { color: COLORS.textPrimary }]}>Editar Anotação</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={[styles.actionButton, styles.deleteButton]} 
                onPress={handleExcluir}
            >
                <Feather name="trash" size={20} color={COLORS.textPrimary} />
                <Text style={[styles.actionButtonText, { color: COLORS.textPrimary }]}>Excluir Anotação</Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    headerContainer: { padding: SIZES.padding, paddingTop: 30, },
    title: { fontSize: SIZES.title, fontWeight: 'bold', color: COLORS.textPrimary, marginBottom: 4, marginTop: 5, },
    subtitle: { fontSize: SIZES.cardTitle, color: COLORS.textSecondary, marginBottom: SIZES.marginVertical },
    details: { fontSize: SIZES.textNormal, color: COLORS.textPrimary, marginTop: SIZES.padding, lineHeight: SIZES.textNormal * 1.5 },
    actionsContainer: { 
        paddingHorizontal: SIZES.padding,
        marginTop: SIZES.marginVertical,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    actionButton: {
        padding: SIZES.padding,
        borderRadius: SIZES.borderRadius,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1, // Makes buttons take equal width
    },
    actionButtonText: {
        fontSize: SIZES.textNormal,
        fontWeight: 'bold',
        marginLeft: SIZES.padding / 2,
    },
    editButton: {
        backgroundColor: COLORS.surface,
        marginRight: SIZES.padding / 2, // Space between buttons
    },
    deleteButton: {
        backgroundColor: COLORS.statusDanger,
        marginLeft: SIZES.padding / 2, // Space between buttons
    },
});
