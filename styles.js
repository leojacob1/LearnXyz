import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCF1E9',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  quote: {
    backgroundColor: '#FECB3A',
    borderRadius: '15%',
    margin: '2%',
    padding: '4%'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    flex: 1
  },
  modal: {
    padding: 30,
    backgroundColor: '#FCF1E9',
    flex: 1
  }
});

export default styles;