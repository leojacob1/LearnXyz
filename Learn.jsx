import {
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  Button,
  Pressable,
} from "react-native";
import styles from "./styles";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

const Learn = ({ quotes }) => {
  const [activeQuotes, setActiveQuotes] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [activeGuess, setActiveGuess] = useState();

  const getWrongCharacters = (correctCharacter) => {
    const usedCharacters = [correctCharacter];
    let newIndex;
    while (usedCharacters.length <= 4) {
      newIndex = Math.floor(Math.random() * characters.length);
      if (!usedCharacters.includes(characters[newIndex])) {
        usedCharacters.push(characters[newIndex]);
      }
    }

    const index = usedCharacters.indexOf(correctCharacter);
    // only splice array when item is found
    usedCharacters.splice(index, 1); // 2nd parameter means remove one item only
    return usedCharacters;
  };

  const handleGuess = (character) => {
    if (activeQuotes[0].character === character) {
      setCorrectCount(correctCount + 1);
    }
    setActiveGuess(character);
    setTimeout(() => {
      setActiveGuess();
      setActiveQuotes(activeQuotes.slice(1));
    }, 2000);
  };

  useEffect(() => {
    if (quotes) {
      setCharacters([...new Set(quotes.map((quote) => quote.character))]);

      const randomQuotes = shuffle(quotes);
      const quotesWithWrongAnswers = randomQuotes.map((quote) => {
        const wrongCharacters = getWrongCharacters(quote.character);
        return {
          ...quote,
          wrong1: wrongCharacters[1],
          wrong2: wrongCharacters[2],
          wrong3: wrongCharacters[3],
        };
      });
      // setActiveQuotes(randomQuotes);
      setActiveQuotes(quotesWithWrongAnswers);
    }
  }, [quotes]);
  console.log(activeQuotes[0]);
  const optionElements = activeQuotes.length
    ? [
        <Pressable
          onPress={() => handleGuess(activeQuotes[0].character)}
          key={activeQuotes[0].character}
          style={styles.button}
        >
          <Text style={styles.text}>{activeQuotes[0].character}</Text>
        </Pressable>,
        <Pressable
          onPress={() => handleGuess(activeQuotes[0].wrong1)}
          key={activeQuotes[0].wrong1}
          style={styles.button}
        >
          <Text style={styles.text}>{activeQuotes[0].wrong2}</Text>
        </Pressable>,
        <Pressable
          onPress={() => handleGuess(activeQuotes[0].wrong2)}
          key={activeQuotes[0].wrong2}
          style={styles.button}
        >
          <Text style={styles.text}>{activeQuotes[0].wrong2}</Text>
        </Pressable>,
        <Pressable
          onPress={() => handleGuess(activeQuotes[0].wrong3)}
          key={activeQuotes[0].wrong3}
          style={styles.button}
        >
          <Text style={styles.text}>{activeQuotes[0].wrong3}</Text>
        </Pressable>,
      ]
    : [];
  return (
    <SafeAreaView style={styles.container}>
      {activeQuotes.length ? (
        <View key={activeQuotes[0].quote}>
          <Text>{activeQuotes[0].quote}</Text>
          <Text>Who said it?</Text>
          {shuffle(optionElements)}
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default Learn;
