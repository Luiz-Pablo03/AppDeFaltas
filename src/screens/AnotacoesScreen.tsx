import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAnotacoes } from '../context/AnotacoesContext';
import { COLORS, SIZES } from '../constants/theme';
import { StackScreenProps } from '@react-navigation/stack';
import { AnotacoesStackParamList } from '../navigation/types';

type Props = StackScreenProps<AnotacoesStackParamList, 'Anotacoes'>;

export const AnotacoesScreen = ({ navigation }: Props) => {
  const { anotacoes, loading } = useAnotacoes();

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={{ color: COLORS.textSecondary }}>Carregando anotações...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Minhas Anotações</Text>
        <FlatList
          data={anotacoes}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardTextContent}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSubtitle}>{new Date(item.date).toLocaleDateString()} - {item.time}</Text>
                <Text style={styles.cardDetails}>{item.details}</Text>
              </View>
            </View>
          )}
          ListEmptyComponent={
            <View style={styles.center}>
              <Text style={{ color: COLORS.textSecondary }}>Nenhuma anotação cadastrada ainda.</Text>
              <Text style={{ color: COLORS.textSecondary }}>Clique no '+' para começar!</Text>
            </View>
          }
        />
        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate('AdicionarAnotacao')}
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
    marginTop: SIZES.padding * 1,
    marginBottom: SIZES.marginVertical,
    color: COLORS.textPrimary
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: SIZES.borderRadius,
    padding: SIZES.padding,
    marginBottom: SIZES.marginVertical,
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
  cardDetails: {
    fontSize: SIZES.textNormal,
    marginTop: 8,
    color: COLORS.textPrimary,
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
