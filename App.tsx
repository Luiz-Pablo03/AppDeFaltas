import 'react-native-gesture-handler'; 
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { MateriasProvider } from './src/context/MateriasContext';
import { AppNavigator } from './src/navigation/AppNavigator';

export default function App() {
  return (
    <MateriasProvider>
      <NavigationContainer>
        <AppNavigator/>
        <StatusBar style="auto" />
      </NavigationContainer>
    </MateriasProvider>


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
