import React, { Component } from 'react'
import { View, StyleSheet, AsyncStorage, FlatList, Text, TextInput, Button } from 'react-native'
import axios from 'axios'

class ConversationScreen extends Component {
  constructor () {
    super()

    this.state = {
      conversation: {},
      messages: [],
      newMessage: ''
    }

    this.handleAddMessage = this.handleAddMessage.bind(this)
  }
  
  componentDidMount () {
    const conversationId = this.props.navigation.state.params.conversationId

    AsyncStorage.getItem('loginToken').then(token => {
      axios.get(`https://still-shelf-13222.herokuapp.com/conversations/${conversationId}`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response => {
        this.setState({
          conversation: response
        })
      })
      axios.get(`https://still-shelf-13222.herokuapp.com/messages/${conversationId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response => {
          this.setState({
            messages: response
          })
      })
    })
  }

  handleAddMessage() {
    const { conversation, newMessage } = this.state.conversation
    const content = this.state.newMessage

    if (conversation) {
      const { _id, recipientId } = conversation
  
      AsyncStorage.getItem('loginToken').then(token => {
        axios.post(`https://still-shelf-13222.herokuapp.com/messages`, {
          conversationId: _id,
          recipientId,
          content: newMessage
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then(response => {
          this.setState({
            newMessage: ''
          })
          this.componentDidMount()
        })
      })    
    }
  }
 
  render () {
    return (
      <View style={styles.container}> 
        <FlatList
          data={this.state.messages}
          renderItem={({item}) => (
            <View>
              <Text style={{fontWeight: 'bold'}}>{item.sender.firstName}{item.sender.lastName}</Text>
              <Text>{item.content}</Text>
            </View>
          )}
          keyExtractor={(item) => item._id}
        />
        <View style={styles.newMessageBar}>
          <TextInput 
            style={styles.newMessageInput}
            onChangeText={(text) => this.setState({ newMessage: text })}
            value={this.state.newMessage}
          />
        <Button title="Send" onPress={this.handleAddMessage} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  newMessageBar: {
    flexDirection: 'row',
    padding: 10
  },
  newMessageInput: {
    backgroundColor: 'white',
    padding: 10,
    flex: 1,
    marginRight: 10
  }
})

export default ConversationScreen
