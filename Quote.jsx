import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

const Quote = ({ quote: data }) => {
  const { quote, character, act, scene } = data;
  return (
    <View style={styles.quote}>
      <Text>
        <Text style={{ fontWeight: "bold" }}>{character}</Text>
        <Text>
          {" "}
          says in {act}, {scene}:{"\n"}
        </Text>
        {`\n`}
        <Text style={{ fontWeight: "bold", lineHeight: 20 }}>"{quote}"</Text>
      </Text>
    </View>
  );
};
export default Quote;
