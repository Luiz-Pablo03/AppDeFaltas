import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HorariosContext } from '../context/HorariosContext';
import { DiaCardItem } from '../components/DiaCardItem';
import { HorariosScreenProps } from '../navigation/types';
import { COLORS, SIZES } from '../constants/theme';

const diasDaSemana = ['Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado', 'Domingo'];

export const HorariosScreen = ({ navigation }: HorariosScreenProps) => {
  const { horarios, loading } = useContext(HorariosContext);

  if (loading) {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.innerContainer}>
          <Text>Carregando...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Meus Horários</Text>
        <FlatList
          data={diasDaSemana}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <DiaCardItem
              dia={item}
              horarios={horarios}
            />
          )}
          ListEmptyComponent={<Text>Nenhum horário cadastrado.</Text>}
        />
        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate('AdicionarHorario')}
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
  title: {
    fontSize: SIZES.title,
    fontWeight: 'bold',
    marginTop: SIZES.padding * 1,
    marginBottom: SIZES.marginVertical,
    color: COLORS.textPrimary
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
