import 'react-native-gesture-handler'; 
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { MateriasProvider } from './src/context/MateriasContext';
import { HorariosProvider } from './src/context/HorariosContext';
import { AnotacoesProvider } from './src/context/AnotacoesContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <MateriasProvider>
        <HorariosProvider>
          <AnotacoesProvider>
            <NavigationContainer>
              <AppNavigator/>
              <StatusBar style="auto" />
            </NavigationContainer>
          </AnotacoesProvider>
        </HorariosProvider>
      </MateriasProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
