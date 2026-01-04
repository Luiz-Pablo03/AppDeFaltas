import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/theme';
import { Horario } from '../types';
import { MateriasContext } from '../context/MateriasContext';

interface DiaCardProps {
  dia: string;
  horarios: Horario[];
}

export const DiaCard = ({ dia, horarios }: DiaCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const { materias } = useContext(MateriasContext);

  const getMateriaName = (materiaId: string) => {
    const materia = materias.find(m => m.id === materiaId);
    return materia ? materia.nome : 'Matéria não encontrada';
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.header} onPress={() => setExpanded(!expanded)}>
        <Text style={styles.title}>{dia}</Text>
        <Feather name={expanded ? 'chevron-up' : 'chevron-down'} size={24} color={COLORS.primary} />
      </TouchableOpacity>
      {expanded && (
        <View style={styles.content}>
          {horarios.length > 0 ? (
            horarios.map(horario => (
              <View key={horario.id} style={styles.horarioItem}>
                <Text style={styles.horarioText}>{getMateriaName(horario.materiaId)}</Text>
                <Text style={styles.materiaText}>{horario.horaInicio} - {horario.horaFim}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>Nenhum horário cadastrado para este dia.</Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: SIZES.borderRadius,
    marginVertical: SIZES.padding / 2,
    padding: SIZES.padding,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: SIZES.cardTitle,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  content: {
    marginTop: SIZES.marginVertical,
  },
  horarioItem: {
    paddingVertical: SIZES.padding / 2,
    borderTopWidth: 1,
    borderTopColor: COLORS.textTertiary,
  },
  horarioText: {
    fontSize: SIZES.textNormal,
    color: COLORS.textPrimary,
  },
  materiaText: {
    fontSize: SIZES.textSmall,
    color: COLORS.textSecondary,
  },
  emptyText: {
    color: COLORS.textTertiary,
    textAlign: 'center',
    padding: SIZES.padding,
  },
});
