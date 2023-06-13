import { useEffect, useState } from 'react';
import { Button, Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Quote from './Quote';
import styles from './styles';
import { Feather, AntDesign } from '@expo/vector-icons'; 
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
      <ScrollView keyboardShouldPersistTaps='handled' keyboardDismissMode='on-drag' style={{width: '100%'}}>
      <View style={{flexDirection: 'row', flex: 1, padding: 10 }}>
      <TextInput
        style={styles.input}
        onChangeText={setSearchText}
        value={searchText}
        placeholder={'Find a quote'}
      />
      <Pressable onPress={() => setShowFilters(true)} style={styles.center}>
      <Feather name="more-horizontal" size={24} color="black" />
            </Pressable>
      </View>
        {quotes.map((quote) => checkShowQuote(quote) ? <Quote key={quote.quote} quote={quote} /> : null)}
        {!quotes.filter(checkShowQuote).length ? <Text>No quotes found</Text> : null}
      </ScrollView>
      <Modal
        visible={showFilters}
        onRequestClose={() => {
          setShowFilters(!showFilters);
        }}
        transparent={true}
        >
          <TouchableWithoutFeedback  onPress={() => {
            setCharacterPickerOpen(false);
            setActPickerOpen(false);
            setScenePickerOpen(false);
            }}
            >
              <View style={styles.modal}>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => setShowFilters(false)} style={{padding: 10}}>
          <AntDesign name="close" size={32} color="black" />
          </TouchableOpacity>
            </View>
          
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
    <View style={{flexDirection: 'row', flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end'}}>
    <Button onPress={() => {
      setCharacters([]);
      setAct();
      setScene();
      setCharacterPickerOpen(false);
      setActPickerOpen(false);
      setScenePickerOpen(false);
    }}
    title="Clear filters" />
    </View>
    </View>
          </TouchableWithoutFeedback>

        </Modal>
    </SafeAreaView>
  )
}

export default Quotes;