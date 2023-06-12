import { Text, View } from "react-native";
import styles from "./styles";

const Quote = ({ quote: data }) => {
  const { quote, character, act, scene } = data;
  return (
    <View style={styles.quote}>
      <Text>
        <Text style={{fontWeight: "bold"}}>{character}</Text>
        <Text> says in {act}, {scene}:{'\n'}</Text>
        <Text style={{fontWeight: "bold"}}>"{quote}"</Text>
      </Text>
    </View>
  )
  }
export default Quote;