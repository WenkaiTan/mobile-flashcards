import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Keyboard } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default class LinksScreen extends React.Component{
  state = {
    title:''
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.navigation.navigate('Deck')
    this.setState({
      title:""
    })
    // save to AsynvStorage
  }

  render(){
    const { title } = this.state
    return (
      <View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Deck title"
            onBlur={Keyboard.dismiss}
            value={title}
            onChangeText={text => this.setState({title: text})}
          />
          <View style={styles.inputContainer}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={this.handleSubmit}
            >
              <Text style={styles.saveButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    paddingTop: 15
  },
  textInput: {
    borderColor: '#CCCCCC',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 50,
    fontSize: 25,
    paddingLeft: 20,
    paddingRight: 20
  },
  saveButton: {
    borderWidth: 1,
    borderColor: '#007BFF',
    backgroundColor: '#007BFF',
    padding: 15,
    margin: 5
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center'
  }
})