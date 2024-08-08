import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, FlatList, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import Header from '../components/Header';

const ChatbotScreen = ({ navigation, route }) => {
  const { product } = route.params;
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef(null);

  useEffect(() => {
    const initialMessage = {
      type: 'bot',
      text: `You've discovered ${product.name}! Would you like to know more about its usage, benefits, reviews?`,
    };
    setMessages([initialMessage]);
  }, [product]);

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage = { type: 'user', text: inputText };
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setInputText('');

      setLoading(true);
      
      // Simulate API call to get bot response
      setTimeout(() => {
        const botMessage = {
          type: 'bot',
          text: `Sure! Here are some details about ${product.name}.`,
        };
        setMessages(prevMessages => [...prevMessages, botMessage]);
        setLoading(false);
      }, 2000); // Simulate a 2-second delay for the bot response
    }
  };

  const renderMessage = ({ item }) => (
    <View style={[styles.messageContainer, item.type === 'bot' ? styles.botMessage : styles.userMessage]}>
      {item.type === 'bot' && (
        <Image source={require('../../assets/images/chatbot1.png')} style={styles.botImage} />
      )}
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.messageArea}
        onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })}
        onLayout={() => flatListRef.current.scrollToEnd({ animated: true })}
      />
      {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />}
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.inputArea}>
          <TextInput
            style={styles.textInput}
            placeholder="What do you want to know?"
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={handleSend}
          />
          <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
            <Image source={require('../../assets/images/send.png')} style={styles.sendIcon} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  messageArea: {
    paddingHorizontal: 16,
    paddingBottom: 80, // space for the input area
  },
  messageContainer: {
    marginVertical: 8,
    maxWidth: '80%',
    padding: 10,
    borderRadius: 8,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#3299a8',
    borderTopRightRadius: 0,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#ffff',
    flexDirection: 'row',
    borderTopLeftRadius: 0,
  },
  messageText: {
    color: '#000',
  },
  botImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  sendButton: {
    padding: 1,
    backgroundColor: '#3299a8'
  },
  sendIcon: {
    width: 24,
    height: 24,
  },
  loadingIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -12 }, { translateY: -12 }],
  },
});

export default ChatbotScreen;
