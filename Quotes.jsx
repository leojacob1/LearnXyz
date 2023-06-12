import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
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
    <View>
      {quotes.map((quote) => <Text>{quote.quote}</Text>)}
    </View>
  )
}

export default Quotes;