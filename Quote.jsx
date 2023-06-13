import { Text, TouchableOpacity } from "react-native";
import styles from "./styles";

const Quote = ({ quote: data, setShowQuote = () => {} }) => {
  const { quote, character, act, scene } = data;
  return (
    <TouchableOpacity style={styles.quote} onPress={() => setShowQuote(data)}>
      <Text>
        <Text style={{fontWeight: "bold"}}>{character}</Text>
        <Text> says in {act}, {scene}:{'\n'}</Text>
        <Text style={{fontWeight: "bold"}}>"{quote}"</Text>
      </Text>
    </TouchableOpacity>
  )
  }
export default Quote;