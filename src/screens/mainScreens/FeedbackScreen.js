import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Image, Alert, ActivityIndicator, ImageBackground } from 'react-native';
import Header from '../../components/Header';
import Icon from 'react-native-vector-icons/Ionicons';
import { submitFeedback } from '../../services/apiService';
import UserContext from '../../context/UserContext';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';


const FeedbackScreen = ({ navigation }) => {
  const [rating, setRating] = useState(4);
  const [comment, setComment] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const { theme } = useTheme();
  const { t } = useTranslation();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await submitFeedback(user.uid, comment);
      console.log('response object...', response)
      if (response.status === 200) {
        Alert.alert(t('Feedback Submitted!', 'Thank you for your feedback!'));
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      Alert.alert(t('Error', 'Failed to submit feedback. Please try again later.'));
    } finally {
      setLoading(false);
      setModalVisible(true);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 14,
      fontWeight: '600',
      marginVertical: 10,
      color: theme === 'dark' ? '#FFFFFF' : '#000000',
    },
    header: {
      fontSize: 14,
      fontWeight: '500',
      marginBottom: 10,
      alignSelf: 'center',
      marginTop: 20,
      color: theme === 'dark' ? '#FFFFFF' : '#000000',
    },
    stars: {
      flexDirection: 'row',
      alignSelf: 'center',
      marginBottom: 20,
    },
    subHeader: {
      fontSize: 14,
      marginBottom: 10,
      color: theme === 'dark' ? '#FFFFFF' : '#000000',
    },
    input: {
      backgroundColor: 'transparent',
      padding: 10,
      borderRadius: 15,
      marginBottom: 20,
      height: 200,
      textAlignVertical: 'top',
      borderColor: theme === 'dark' ? '#daa163' : '#15718e',
      borderWidth: 1,
      color: theme === 'dark' ? '#FFFFFF' : '#000000',
    },
    button: {
      marginTop: 30,
      backgroundColor:'#15718e',
      paddingVertical: 15,
      borderRadius: 25,
      alignItems: 'center',
    },
    buttonText: {
      color: '#FFF',
      fontSize: 14,
      fontWeight: '700',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
      padding: 20,
      width: '100%',
    },
    modalContent: {
      backgroundColor: theme === 'dark' ? '#333333' : '#FFF',
      padding: 10,
      borderRadius: 25,
      alignItems: 'center', 
      height: 550,
    },
    modalImage: {
      width: '80%',
    },
    modalHeader: {
      fontSize: 25,
      fontWeight: '800',
      marginBottom: 10,
      color: theme === 'dark' ? '#FFFFFF' : '#000000',
    },
    modalText: {
      fontSize: 14,
      marginBottom: 40,
      textAlign: 'center',
      color: theme === 'dark' ? '#FFFFFF' : '#000000',
    },
    modalGoHomeButton: {
      padding: 15,
      backgroundColor: '#15718e',
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
      width: '90%',
    },
    texture: {
      ...StyleSheet.absoluteFillObject,
      width: '100%',
      height: '100%'
    }
  });

  return (
    <View style={{flex: 1, backgroundColor: theme === 'dark' ? '#1E1E1E' : '#F5F5F5',}}>
      <ImageBackground source={require('../../../assets/images/texture.png')} style={styles.texture}/>
    <View style={styles.container}>
      <Header navigation={navigation} />
      <Text style={styles.title}>{t("Feedback")}</Text>
      <Text style={styles.header}>{t("Rate Your Experience")}</Text>
      <View style={styles.stars}>
        {[...Array(5)].map((_, i) => (
          <TouchableOpacity key={i} onPress={() => setRating(i + 1)}>
            <Icon
              name={i < rating ? 'star' : 'star-outline'}
              size={40}
              color="#daa163"
            />
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.subHeader}>{t("Leave a comment")}</Text>
      <TextInput
        style={styles.input}
        placeholder={t("Your message here")}
        value={comment}
        onChangeText={setComment}
        multiline
        placeholderTextColor={theme === 'dark' ? '#BBBBBB' : '#666666'}
      />

      <TouchableOpacity
        onPress={handleSubmit}
        style={styles.button}
        disabled={!comment}  
      >
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>{t("Send Feedback")}</Text>
        )}
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image
              source={require('../../../assets/images/noted.png')}
              style={styles.modalImage}
            />
            <View style={{marginTop: -100, width: '70%', alignItems: 'center'}}>
            <Text style={styles.modalHeader}>{t("Duly Noted!")}</Text>
            <Text style={styles.modalText}>
              {t("Thank you for your feedback! Your input helps us enhance our app to better meet your needs.")}
            </Text>
            <TouchableOpacity onPress={() => {navigation.navigate('MainTabScreen'); setModalVisible(false); }} style={styles.modalGoHomeButton}>
              <Text style={styles.buttonText}>{t("Go Back")}</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
    </View>
  );
};

export default FeedbackScreen;
