import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Quote from './Quote';
import styles from './styles';
import { Search } from '@mui/icons-material';

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [searchText, setSearchText] = useState('');
  useEffect(() => {
    fetch("https://gold-prepared-barnacle-234.mypinata.cloud/ipfs/QmVz9dLBsw8aanRqwF6sGaR7VQAztUfYULvjdWC1q5EnC9")
      .then((resp) => {
        return resp.json()
      })
      .then((data) => {
        setQuotes(data);
      })
      .catch((err) => {
        console.log(err);
      })
  });

  return (
    <SafeAreaView style={styles.container}>
      
      <ScrollView keyboardShouldPersistTaps='handled' keyboardDismissMode='on-drag'>
      <View style={{flexDirection: 'row'}}>
      <TextInput
        style={styles.input}
        onChangeText={setSearchText}
        value={searchText}
        placeholder={'Find a quote'}
      />
      </View>
        {quotes.map((quote) => quote.quote.toLowerCase().includes(searchText.toLowerCase()) ? <Quote key={quote.quote} quote={quote} /> : null)}
      </ScrollView>
    </SafeAreaView>
  )
}

export default Quotes;