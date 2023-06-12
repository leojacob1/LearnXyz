import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import Quotes from './Quotes';
import styles from './styles';

export default function App() {
  return (
    <View style={styles.container}>
      <Quotes />
      <StatusBar style="auto" />
    </View>
  );
}


