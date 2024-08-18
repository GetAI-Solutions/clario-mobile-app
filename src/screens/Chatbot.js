import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, FlatList, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import Header from '../components/Header';
import { useTheme } from '../context/ThemeContext';
import { BASEURL } from '../services/api';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import UserContext from '../context/UserContext';

const ChatbotScreen = ({ navigation, route }) => {
  const { product } = route.params;
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef(null);
  const { theme } = useTheme();
  const { user } = useContext(UserContext)
  const { t } = useTranslation()

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'dark' ? '#1E1E1E' : '#f5f5f5',
    },
    messageArea: {
      paddingHorizontal: 16,
      paddingBottom: 20, // Adjusted padding to ensure the last message is visible
    },
    messageContainer: {
      marginVertical: 8,
      maxWidth: '80%',
      padding: 10,
      borderRadius: 8,
      backgroundColor: theme === 'dark' ? '#555' : '#fff',
    },
    userMessage: {
      alignSelf: 'flex-end',
      backgroundColor: theme === 'dark' ? '#2c7391' : '#2c7391',
      borderTopRightRadius: 0,
    },
    botMessage: {
      alignSelf: 'flex-start',
      backgroundColor: theme === 'dark' ? '#555' : '#fff',
      flexDirection: 'row',
      borderTopLeftRadius: 0,
    },
    messageText: {
      color: theme === 'dark' ? '#fff' : '#000',
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
      borderTopColor: theme === 'dark' ? '#555' : '#ccc',
      backgroundColor: theme === 'dark' ? '#1E1E1E' : '#fff',
    },
    textInput: {
      flex: 1,
      borderWidth: 1,
      borderColor: theme === 'dark' ? '#555' : '#ccc',
      borderRadius: 20,
      paddingHorizontal: 12,
      paddingVertical: 8,
      marginRight: 8,
      backgroundColor: theme === 'dark' ? '#1E1E1E' : '#fff',
      color: theme === 'dark' ? '#fff' : '#000',
    },
    sendButton: {
      padding: 1,
      backgroundColor: theme === 'dark' ? '#2c7391' : '#2c7391',
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

  useEffect(() => {
    const initialMessage = {
      type: 'bot',
      text: `${t('discoveredProductPrefix')} ${product.product_name} ${t('discoveredProductSuffix')}`,
    };
    setMessages([initialMessage]);
  }, [product]);

  const handleSend = async () => {
    if (inputText.trim()) {
      const newMessage = {
        type: 'user',
        text: inputText,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputText('');
      setLoading(true);

      try {
        console.log('user_id: ', user.uid)
        console.log('product_barcode: ', product.product_barcode)
        console.log('user_message', inputText)
        const response = await axios.post(`${BASEURL}/chat`, {
          userID: user.uid,
          bar_code: `${product.product_barcode}`,
          user_message: inputText,
        }
      );

      if(response.status === 200){
        console.log(response.data)

        const botMessage = {
          type: 'bot',
          text: response.data.model_resp,
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } else{
        throw new Error("there was an error")
        console.log(response.data)
      }

        
      } catch (error) {
        console.error(error);
        const errorMessage = {
          type: 'bot',
          text: t('Sorry, something went wrong. Please try again later.'),
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      } finally {
        setLoading(false);
      }
    }
  };
  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.type === 'bot' ? styles.botMessage : styles.userMessage,
      ]}
    >
      {item.type === 'bot' && (
        <Image
          source={require('../../assets/images/chatbot1.png')}
          style={styles.botImage}
        />
      )}
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      
      {/* Wrapped the content in KeyboardAvoidingView and made the FlatList scrollable */}
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.messageArea}
          onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })}
          onLayout={() => flatListRef.current.scrollToEnd({ animated: true })}
        />
        
        {/* Input area remains visible */}
        <View style={styles.inputArea}>
          <TextInput 
            style={styles.textInput} 
            placeholder={t("What do you want to know?")}
            placeholderTextColor={theme === 'dark' ? '#aaa' : '#666'} // Added placeholder color
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={handleSend} 
          />
          <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
            <Image
              source={require('../../assets/images/send.png')}
              style={styles.sendIcon}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      
      {loading && (
        <ActivityIndicator
          size="large"
          color={theme === 'dark' ? '#fff' : '#0000ff'}
          style={styles.loadingIndicator}
        />
      )}
    </View>
  );
};

export default ChatbotScreen;
