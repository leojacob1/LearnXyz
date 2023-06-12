import { useEffect, useState } from 'react';
import { Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Quote from './Quote';
import styles from './styles';
import { Search } from '@mui/icons-material';
import DropDownPicker from 'react-native-dropdown-picker';

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [characterOptions, setCharacterOptions] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [characterPickerOpen, setCharacterPickerOpen] = useState(false);
  const [actOptions, setActOptions] = useState(Array.from({length: 5}, (_, i) => i + 1).map((i) => ({label: `Act ${i}`, value: `Act ${i}`})));
  const [act, setAct] = useState();
  const [actPickerOpen, setActPickerOpen] = useState(false);
  const [sceneOptions, setSceneOptions] = useState(Array.from({length: 5}, (_, i) => i + 1).map((i) => ({label: `Scene ${i}`, value: `Scene ${i}`})));
  const [scene, setScene] = useState();
  const [scenePickerOpen, setScenePickerOpen] = useState(false);

  useEffect(() => {
    fetch("https://gold-prepared-barnacle-234.mypinata.cloud/ipfs/QmVz9dLBsw8aanRqwF6sGaR7VQAztUfYULvjdWC1q5EnC9")
      .then((resp) => {
        return resp.json()
      })
      .then((data) => {
        setQuotes(data);
        setCharacterOptions([ 'All characters', ... new Set(data.map((quote) => (quote.character)))].map((character) => ({ label: character, value: character })));
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  const checkShowQuote = (quote) => {
    if (quote.quote.toLowerCase().includes(searchText.toLowerCase())
          && (!characters.length || characters.includes(quote.character))
          && (!act || quote.act === act)
          && (!scene || quote.scene === scene)) {
      return true;
    }
    return false
  }

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
      <Pressable onPress={() => setShowFilters(true)}>
      <Text>More</Text>
      </Pressable>
      </View>
        {quotes.map((quote) => checkShowQuote(quote) ? <Quote key={quote.quote} quote={quote} /> : null)}
      </ScrollView>
      <Modal
        animationType="slide"
        visible={showFilters}
        onRequestClose={() => {
          setShowFilters(!showFilters);
        }}
        >
          <TouchableOpacity style={styles.modal} onPress={() => setCharacterPickerOpen(false)}>
          <Pressable onPress={() => setShowFilters(false)} style={{padding: 10}}>
      <Text>Close</Text>
      </Pressable>
          <DropDownPicker
      open={characterPickerOpen}
      value={characters}
      items={characterOptions}
      setOpen={setCharacterPickerOpen}
      setValue={setCharacters}
      setItems={setCharacterOptions}
      multiple={true}
      placeholder={'Select characters'}
      zIndex={3000}
    zIndexInverse={1000}
    />
    <DropDownPicker
      open={actPickerOpen}
      value={act}
      items={actOptions}
      setOpen={setActPickerOpen}
      setValue={setAct}
      setItems={setActOptions}
      placeholder={'Select act'}
      zIndex={2000}
    zIndexInverse={2000}
    />
        <DropDownPicker
      open={scenePickerOpen}
      value={scene}
      items={sceneOptions}
      setOpen={setScenePickerOpen}
      setValue={setScene}
      setItems={setSceneOptions}
      placeholder={'Select scene'}
      zIndex={1000}
      zIndexInverse={3000}
    />
    <View style={{flexDirection: 'row', padding: 20}}>
    <Pressable onPress={() => {
      setCharacters([]);
      setAct();
      setScene();
    }} style={{margin: 20}}>
      <Text>Reset</Text>
      </Pressable>
      <Pressable onPress={() => setShowFilters(false)} style={{margin: 20}}>
      <Text>Search</Text>
      </Pressable>
    </View>
    
          </TouchableOpacity>

        </Modal>
    </SafeAreaView>
  )
}

export default Quotes;