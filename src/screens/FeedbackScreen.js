import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Image } from 'react-native';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/Ionicons';

const FeedbackScreen = ({ navigation }) => {
  const [rating, setRating] = useState(4);
  const [comment, setComment] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmit = () => {
    setModalVisible(true);
    // Here you will add the code to submit the feedback
    // Example:
    // fetch('https://ai-backend-aip3heuzza-uc.a.run.app/get-ai-service/users/give-user-feedback', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //   },
    //   body: `userID=66bc114abcee511efcd5ea89&feedback=${comment}`,
    // });
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <Text style={styles.header}>Rate Your Experience</Text>
      <View style={styles.stars}>
        {[...Array(5)].map((_, i) => (
          <TouchableOpacity key={i} onPress={() => setRating(i + 1)}>
            <Icon
              name={i < rating ? 'star' : 'star-outline'}
              size={40}
              color="#FFB400"
            />
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.subHeader}>Leave a comment</Text>
      <TextInput
        style={styles.input}
        placeholder="Your message here"
        value={comment}
        onChangeText={setComment}
        multiline
      />

      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Send Feedback</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Icon name="close" size={30} color="#000" />
            </TouchableOpacity>
            <Image
              source={{ uri: 'https://via.placeholder.com/150' }}
              style={styles.modalImage}
            />
            <Text style={styles.modalHeader}>Duly Noted!</Text>
            <Text style={styles.modalText}>
              Thank you for your feedback! Your input helps us enhance our app to better meet your needs.
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.button}>
              <Text style={styles.buttonText}>Go Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FeedbackScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  stars: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    height: 120,
    textAlignVertical: 'top',
    borderColor: '#CCC',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#2c7391',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
});
