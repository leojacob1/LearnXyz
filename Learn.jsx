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
  const [availableGuesses, setAvailableGuesses] = useState([]);

  const getWrongCharacters = (correctCharacter) => {
    const usedCharacters = [correctCharacter];
    let newIndex;
    while (usedCharacters.length < 4) {
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
    // show correctness and then move on
    setTimeout(() => {
      setActiveGuess();
      setActiveQuotes(activeQuotes.slice(1));
    }, 1000);
  };

  const resetQuotes = () => {
    setCorrectCount(0);
    const randomQuotes = shuffle(quotes);
    const quotesWithWrongAnswers = randomQuotes.map((quote) => {
      const wrongCharacters = getWrongCharacters(quote.character);
      return {
        ...quote,
        wrong1: wrongCharacters[0],
        wrong2: wrongCharacters[1],
        wrong3: wrongCharacters[2],
      };
    });
    // setActiveQuotes(randomQuotes);
    setActiveQuotes(quotesWithWrongAnswers);
  };

  useEffect(() => {
    if (quotes.length) {
      setCharacters([...new Set(quotes.map((quote) => quote.character))]);
    }
  }, [quotes]);

  useEffect(() => {
    if (characters.length) {
      resetQuotes();
    }
  }, [characters]);

  useEffect(() => {
    if (activeQuotes.length) {
      setAvailableGuesses(
        shuffle([
          activeQuotes[0].character,
          activeQuotes[0].wrong1,
          activeQuotes[0].wrong2,
          activeQuotes[0].wrong3,
        ])
      );
    }
  }, [activeQuotes]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FCF1E9",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      {activeQuotes.length ? (
        <View
          style={{
            width: "100%",
            padding: 20,
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          <View style={styles.quote}>
            <Text style={{ fontWeight: "bold", fontSize: 24 }}>
              "{activeQuotes[0].quote}"
            </Text>
          </View>
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontStyle: "italic", fontSize: 24 }}>
                Who said it?
              </Text>
            </View>

            {availableGuesses.map((guess) => (
              <Pressable
                onPress={() => handleGuess(guess)}
                key={guess}
                style={{
                  ...styles.button,
                  ...(activeGuess === guess &&
                  activeQuotes[0].character === guess
                    ? {
                        backgroundColor: "green",
                      }
                    : {}),
                  ...(activeGuess === guess &&
                  activeQuotes[0].character !== guess
                    ? {
                        backgroundColor: "red",
                      }
                    : {}),
                }}
                disabled={!!activeGuess}
              >
                <Text style={styles.text}>{guess}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      ) : (
        <View style={{ justifyContent: "center", flex: 1 }}>
          <Text style={{ fontSize: 64 }}>
            {correctCount} / {quotes.length}
          </Text>
          <Pressable style={styles.button} onPress={resetQuotes}>
            <Text style={styles.text}>Play again</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Learn;
