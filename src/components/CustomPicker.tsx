import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES } from '../constants/theme';

interface Option {
  key: string;
  label: string;
}

interface CustomPickerProps {
  data: Option[];
  onSelect: (option: Option) => void;
  placeholder: string;
  selectedValue?: Option;
}

export const CustomPicker: React.FC<CustomPickerProps> = ({ data, onSelect, placeholder, selectedValue }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  const filteredData = data.filter(item => 
    item.label.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSelect = (option: Option) => {
    onSelect(option);
    setModalVisible(false);
    setSearchText('');
  };

  return (
    <>
      <TouchableOpacity style={styles.input} onPress={() => setModalVisible(true)}>
        <Text style={{ color: selectedValue ? COLORS.textPrimary : COLORS.textTertiary }}>
          {selectedValue ? selectedValue.label : placeholder}
        </Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        animationType="fade"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.searchInput}
              placeholder="Pesquisar..."
              placeholderTextColor={COLORS.textTertiary}
              value={searchText}
              onChangeText={setSearchText}
            />
            <FlatList
              data={filteredData}
              keyExtractor={(item) => item.key}
              renderItem={({ item }) => {
                const isSelected = selectedValue?.key === item.key;
                return (
                  <TouchableOpacity 
                    style={[styles.optionItem, isSelected && styles.selectedOption]} 
                    onPress={() => handleSelect(item)}
                  >
                    <Text style={styles.optionText}>{item.label}</Text>
                  </TouchableOpacity>
                );
              }}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: SIZES.borderRadius,
    padding: SIZES.padding,
    width: '90%',
    maxHeight: '80%',
  },
  searchInput: {
    backgroundColor: COLORS.surface,
    color: COLORS.textPrimary,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding * 0.75,
    borderRadius: SIZES.borderRadius,
    fontSize: SIZES.textNormal,
    marginBottom: SIZES.marginVertical,
  },
  optionItem: {
    padding: SIZES.padding,
  },
  selectedOption: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.borderRadius,
  },
  optionText: {
    color: COLORS.textPrimary,
    fontSize: SIZES.textNormal,
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.surface,
  },
  cancelButton: {
    marginTop: SIZES.padding,
    padding: SIZES.padding,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.borderRadius,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: COLORS.textPrimary,
    fontSize: SIZES.textNormal,
    fontWeight: 'bold',
  },
});
