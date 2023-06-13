import { Modal, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { AntDesign } from "@expo/vector-icons";

const QuoteModal = ({ quote: data, setShowQuote = () => {} }) => {
  if (data) {
    const { character, act, scene, quote } = data;
    return (
      <Modal
          onRequestClose={() => {
            setShowQuote(null);
          }}
          style={styles.halfModal}
          >
                        <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => setShowQuote(false)} style={{padding: 10}}>
          <AntDesign name="close" size={32} color="black" />
          </TouchableOpacity>
            </View>
              <Text>
          <Text style={{fontWeight: "bold"}}>{character}</Text>
          <Text> says in {act}, {scene}:{'\n'}</Text>
          <Text style={{fontWeight: "bold"}}>"{quote}"</Text>
        </Text>
      </Modal>
    )
  }
}

export default QuoteModal;