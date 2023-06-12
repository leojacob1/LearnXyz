import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Quote from './Quote';

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
    <ScrollView>
      {quotes.map((quote) => <Quote key={quote.quote} quote={quote} />)}
    </ScrollView>
  )
}

export default Quotes;