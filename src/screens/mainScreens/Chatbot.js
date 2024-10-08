import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ImageBackground, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import Header from '../../components/Header';
import { useTheme } from '../../context/ThemeContext';
import { BASEURL } from '../../services/api';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import UserContext from '../../context/UserContext';
import TypingIndicator from '../../components/TypingIndicator';
import { getSpeechFromText } from '../../services/apiService';
import Feather from 'react-native-vector-icons/Feather';
import { Audio } from 'expo-av';



const ChatbotScreen = ({ navigation, route }) => {
  const { product } = route.params;
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef(null);
  const { theme } = useTheme();
  const { user } = useContext(UserContext);
  const { t } = useTranslation();
  const [playingIndex, setPlayingIndex] = useState(null);
  const audioRef = useRef(null);


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'dark' ? '#1E1E1E' : '#fff',
    },
    messageArea: {
      paddingHorizontal: 16,
      paddingBottom: 20,
    },
    audioButton: {
      width: 25,
      height: 25,
      marginLeft: 10,
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
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 5 },
      elevation: 3,
    },
    messageText: {
      color: theme === 'dark' ? '#fff' : '#000',
      flexShrink: 1,
    },
    botImage: {
      width: 40,
      height: 40,
      marginRight: 10,
      resizeMode: 'contain',
    },
    inputArea: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: 'transparent',
      marginBottom: -5,
    },
    inputContainer: {
      borderRadius: 30,
      borderWidth: 2,
      borderColor: theme === 'light' ? '#15718e' : '#daa163',
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    textInput: {
      flex: 1,
      borderRadius: 20,
      paddingHorizontal: 12,
      paddingVertical: 8,
      marginRight: 8,
      backgroundColor: theme === 'dark' ? '#1E1E1E' : '#fff',
      color: theme === 'dark' ? '#fff' : '#000',
    },
    sendButton: {
      backgroundColor: theme === 'dark' ? '#daa163' : '#15718e',
      width: 45,
      height: 45,
      borderRadius: 100,
      justifyContent: 'center',
    },
    sendIcon: {
      width: 20,
      height: 20,
      alignSelf: 'center',
    },
    loadingIndicator: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: [{ translateX: -12 }, { translateY: -12 }],
    },
    texture: {
      ...StyleSheet.absoluteFillObject,
      width: '100%',
      height: '100%',
    },
  });

  useEffect(() => {
    const initialMessage = {
      type: 'bot',
      text: `${t('discoveredProductPrefix')} ${product.product_name} ${t('discoveredProductSuffix')}`,
    };
    setMessages([initialMessage]);
  }, [product]);

  const cleanText = (text) => text.replace(/[#*]+/g, '');

  const toggleAudioPlayback = async (text, index) => {
    try {
      if (playingIndex === index) {
        if (audioRef.current) {
          await audioRef.current.pauseAsync();  // Pause audio playback
          setPlayingIndex(null);  // Reset playing index
        }
      } else {
        if (audioRef.current) {
          await audioRef.current.unloadAsync();  // Unload any existing audio to avoid overlap
        }
  
        // Fetch the product summary audio (TTS from API)
        const audioBlob = await getSpeechFromText(text);
        const audioUrl = URL.createObjectURL(audioBlob);  // Convert blob to URL
  
        // Load the new audio
        const { sound } = await Audio.Sound.createAsync({ uri: audioUrl });
        audioRef.current = sound;
        await audioRef.current.playAsync();  // Play the audio
        setPlayingIndex(index);  // Set the index to indicate which item is playing
  
        // Reset playingIndex when the audio finishes
        audioRef.current.setOnPlaybackStatusUpdate((status) => {
          if (status.didJustFinish) {
            setPlayingIndex(null);  // Reset playing index after completion
          }
        });
      }
    } catch (error) {
      console.error('Error playing speech:', error);
    }
  };

  const handleSend = async () => {
    if (inputText.trim()) {
      const newMessage = {
        type: 'user',
        text: cleanText(inputText),
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputText('');
      setLoading(true);

      try {
        const response = await axios.post(`${BASEURL}/common/chat`, {
          userID: user.uid,
          bar_code: `${product.product_barcode}`,
          user_message: inputText,
          perplexity: product.perplexity || false,
          noCode: product.noCode || false,
        });

        if (response.status === 200) {
          const botMessage = {
            type: 'bot',
            text: cleanText(response.data.model_resp),
          };
          setMessages((prevMessages) => [...prevMessages, botMessage]);
        } else {
          throw new Error('There was an error');
        }
      } catch (error) {
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

  const renderMessage = ({ item, index }) =>
    item.type === 'bot' ? (
      <View style={{ flexDirection: 'row' }}>
        <Image source={require('../../../assets/images/chatbot1.png')} style={styles.botImage} />
        <View style={[styles.messageContainer, styles.botMessage]}>
          <Text style={styles.messageText}>{item.text}</Text>
        </View>
        <TouchableOpacity onPress={() => toggleAudioPlayback(item.text, index)} style={styles.audioButton}>
          <Feather
            name={playingIndex === index ? 'pause-circle' : 'play-circle'}
            size={25}  
            color={theme === 'dark' ? '#fff' : '#000'}
          />
        </TouchableOpacity>
      </View>
    ) : (
      <View style={[styles.messageContainer, styles.userMessage]}>
        <Text style={{color: '#fff', flexShrink: 1,}}>{item.text}</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../../assets/images/texture.png')} style={styles.texture} />
      <Header navigation={navigation} />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={40}>
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.messageArea}
          onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })}
          onLayout={() => flatListRef.current.scrollToEnd({ animated: true })}
        />
        {loading && <TypingIndicator />}
        <View style={styles.inputArea}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder={t('What do you want to know?')}
              placeholderTextColor={theme === 'dark' ? '#aaa' : '#666'}
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={handleSend}
            />
            <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
              <Image source={require('../../../assets/images/send.png')} style={styles.sendIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatbotScreen;
