import React from 'react';
import { View, Text, StyleSheet, FlatList, Alert, SafeAreaView, TouchableOpacity } from 'react-native';
import { useMaterias } from '../hooks/useMaterias';
import { DetalhesMateriaScreenProps } from '../navigation/types';
import { calcularMaximoFaltas } from '../utils/calculation';
import { COLORS, SIZES } from '../constants/theme';
import { Feather } from '@expo/vector-icons';

export const DetalhesMateria = ({ route, navigation }: DetalhesMateriaScreenProps) => {
  const { materiaId } = route.params;
  const { materias, adicionarFalta, removerFalta, excluirMateria } = useMaterias();
  const materia = materias.find(m => m.id === materiaId);

  const handleExcluir = () => {
    Alert.alert(
      "Confirmar Exclusão",
      `Você tem certeza que deseja excluir a matéria "${materia?.nome}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Excluir", 
          style: "destructive",
          onPress: () => {
            excluirMateria(materiaId);
            navigation.goBack();
          }
        }
      ]
    );
  };

  if (!materia) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <Text style={{ color: COLORS.textPrimary }}>Matéria não encontrada.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const maxFaltas = calcularMaximoFaltas(materia.totalDeAulas, materia.percentualMinimoPresenca);
  const faltasAtuais = materia.faltas.length;
  const faltasRestantes = maxFaltas - faltasAtuais;
  const progresso = maxFaltas > 0 ? (faltasAtuais / maxFaltas) * 100 : 0;
  const statusColor = faltasRestantes > 5 ? COLORS.statusSuccess : faltasRestantes > 2 ? COLORS.statusWarning : COLORS.statusDanger;

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>{materia.nome}</Text>
      {materia.nomeProfessor ? <Text style={styles.subtitle}>Prof: {materia.nomeProfessor}</Text> : null}
      
      <View style={styles.statusPanel}>
        <View style={styles.statusItem}>
          {/* --- CORREÇÃO APLICADA AQUI --- */}
          <Text style={[styles.statusValue, { color: statusColor }]}>{faltasAtuais}</Text>
          <Text style={styles.statusLabel}>Faltas Atuais</Text>
        </View>
        <View style={styles.statusItem}>
          <Text style={styles.statusValue}>{maxFaltas}</Text>
          <Text style={styles.statusLabel}>Faltas Limite</Text>
        </View>
        <View style={styles.statusItem}>
          <Text style={[styles.statusValue, { color: statusColor }]}>{faltasRestantes}</Text>
          <Text style={styles.statusLabel}>Faltas Restantes</Text>
        </View>
      </View>

      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progresso}%`, backgroundColor: statusColor }]} />
      </View>
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={() => adicionarFalta(materia.id)}>
          <Feather name="plus-circle" size={20} color={COLORS.primary} />
          <Text style={styles.actionButtonText}>Adicionar Falta</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.listTitle}>Histórico de Faltas</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={materia.faltas}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <View style={styles.faltaItem}>
            <View>
              <Text style={styles.faltaText}>Falta registrada em:</Text>
              <Text style={styles.faltaDate}>{new Date(item.data).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</Text>
            </View>
            <TouchableOpacity onPress={() => removerFalta(materia.id, item.id)}>
              <Feather name="trash-2" size={24} color={COLORS.statusDanger} />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum registro de falta.</Text>}
        ListFooterComponent={
          <View style={styles.deleteButtonContainer}>
            <TouchableOpacity style={[styles.actionButton, styles.deleteButton]} onPress={handleExcluir}>
              <Feather name="trash" size={20} color={COLORS.textPrimary} />
              <Text style={[styles.actionButtonText, { color: COLORS.textPrimary }]}>Excluir Matéria</Text>
            </TouchableOpacity>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerContainer: { padding: SIZES.padding, paddingTop: 30, },
  title: { fontSize: SIZES.title, fontWeight: 'bold', color: COLORS.textPrimary, marginBottom: 4, marginTop: 5, },
  subtitle: { fontSize: SIZES.cardTitle, color: COLORS.textSecondary, marginBottom: SIZES.marginVertical },
  statusPanel: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: SIZES.borderRadius,
    padding: SIZES.padding,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  statusItem: { alignItems: 'center' },
  statusValue: { fontSize: 24, fontWeight: 'bold', color: COLORS.textPrimary },
  statusLabel: { fontSize: SIZES.textSmall, color: COLORS.textTertiary, marginTop: 4 },
  progressBarContainer: {
    height: 8,
    backgroundColor: COLORS.progressBackground,
    borderRadius: 4,
    marginTop: SIZES.marginVertical,
    overflow: 'hidden',
  },
  progressBar: { height: '100%', borderRadius: 4 },
  actionsContainer: { marginTop: SIZES.marginVertical },
  actionButton: {
    backgroundColor: COLORS.surface,
    padding: SIZES.padding,
    borderRadius: SIZES.borderRadius,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    color: COLORS.primary,
    fontSize: SIZES.textNormal,
    fontWeight: 'bold',
    marginLeft: SIZES.padding / 2,
  },
  listTitle: { fontSize: 20, fontWeight: 'bold', marginTop: SIZES.marginVertical, color: COLORS.textPrimary },
  faltaItem: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: SIZES.borderRadius,
    padding: SIZES.padding,
    marginBottom: SIZES.padding / 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faltaText: { color: COLORS.textTertiary },
  faltaDate: { color: COLORS.textPrimary, fontSize: SIZES.textNormal, fontWeight: '500' },
  emptyText: { textAlign: 'center', color: COLORS.textTertiary, marginTop: 20 },
  deleteButtonContainer: { padding: SIZES.padding, marginTop: SIZES.marginVertical },
  deleteButton: { backgroundColor: COLORS.statusDanger },
});