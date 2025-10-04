import React from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useMaterias } from '../hooks/useMaterias';
import { HomeScreenProps } from '../navigation/types';
import { calcularMaximoFaltas } from '../utils/calculation';
import { COLORS, SIZES } from '../constants/theme'; // Importando nosso tema centralizado

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { materias, loading } = useMaterias();

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={{ color: COLORS.textSecondary }}>Carregando matérias...</Text>
      </View>
    );
  }

  // Define o estilo da barra de status (ícones de bateria, hora, etc.) com base no tema
  // Se o fundo for claro, os ícones ficam escuros. Se o fundo for escuro, ficam claros.
  const isLightTheme = COLORS.background === '#f5f5f5';

  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar barStyle={isLightTheme ? 'dark-content' : 'light-content'} />

      <View style={styles.innerContainer}>
        <Text style={styles.title}>Faltep</Text>
        <FlatList
          data={materias}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item }) => {
            const maxFaltas = calcularMaximoFaltas(
              item.totalDeAulas,
              item.percentualMinimoPresenca
            );
            const faltasAtuais = item.faltas.length;
            const faltasRestantes = maxFaltas - faltasAtuais;
            const statusColor = faltasRestantes > 5 ? COLORS.statusSuccess : faltasRestantes > 2 ? COLORS.statusWarning : COLORS.statusDanger;

            return (
              <TouchableOpacity onPress={() => navigation.navigate('DetalhesMateria', { materiaId: item.id })}>
                {/* Voltamos a usar uma View normal com o estilo 'card' */}
                <View style={styles.card}>
                  <View style={styles.cardTextContent}>
                    <Text style={styles.cardTitle}>{item.nome}</Text>
                    {item.nomeProfessor ? (<Text style={styles.cardSubtitle}>Prof: {item.nomeProfessor}</Text>) : null}
                    <Text style={[styles.remainingAbsencesText, { color: statusColor }]}>
                      Pode faltar mais {faltasRestantes} {faltasRestantes === 1 ? 'vez' : 'vezes'}
                    </Text>
                  </View>
                  <View style={styles.absenceContainer}>
                    <Text style={styles.absenceCount}>{faltasAtuais}</Text>
                    <Text style={styles.absenceLabel}>de {maxFaltas} faltas</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          ListEmptyComponent={
            <View style={styles.center}>
              <Text style={{ color: COLORS.textSecondary }}>Nenhuma matéria cadastrada ainda.</Text>
              <Text style={{ color: COLORS.textSecondary }}>Clique no '+' para começar!</Text>
            </View>
          }
        />

        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate('AdicionarMateria')}
        >
          <Text style={styles.fabIcon}>+</Text>
        </TouchableOpacity>
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
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50
  },
  title: {
    fontSize: SIZES.title,
    fontWeight: 'bold',
    marginTop: SIZES.padding * 2,
    marginBottom: SIZES.marginVertical,
    color: COLORS.textPrimary
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: SIZES.borderRadius,
    padding: SIZES.padding,
    marginBottom: SIZES.marginVertical,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  cardTextContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: SIZES.cardTitle,
    fontWeight: 'bold',
    color: COLORS.textPrimary
  },
  cardSubtitle: {
    fontSize: SIZES.cardSubtitle,
    color: COLORS.textSecondary,
    marginTop: 4
  },
  remainingAbsencesText: {
    fontSize: SIZES.textNormal,
    fontWeight: '600',
    marginTop: 8
  },
  absenceContainer: {
    minWidth: 80,
    height: 80,
    backgroundColor: COLORS.background,
    borderRadius: SIZES.borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SIZES.padding,
    padding: 8,
    borderWidth: 1,
    borderColor: COLORS.textTertiary,
  },
  absenceCount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  absenceLabel: {
    fontSize: SIZES.textSmall,
    color: COLORS.textSecondary,
    marginTop: -4
  },
  fab: {
    position: 'absolute',
    width: SIZES.fabSize,
    height: SIZES.fabSize,
    borderRadius: SIZES.fabSize / 2,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: SIZES.fabBottom,
    right: SIZES.fabRight,
    elevation: 8,
  },
  fabIcon: {
    fontSize: SIZES.fabIconSize,
    color: '#FFFFFF',
    lineHeight: SIZES.fabIconSize + 2,
  },
});