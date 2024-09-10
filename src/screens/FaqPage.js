import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ImageBackground, Dimensions } from 'react-native';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../context/ThemeContext';
import Header from '../components/Header';
import { useTranslation } from 'react-i18next';

const FaqPage = ({navigation}) => {
    const { theme } = useTheme();
    const [active, setActive] = useState([]);
    const { height } = Dimensions.get('window');
    const { t } = useTranslation()

    const data = [
      {
          question: t('What is this application for?'),
          answer: t('Our app allows you to scan or upload a barcode to retrieve detailed information about a product. You can also proceed to our chatbot for further information and support in various languages including English, French, Swahili, Hausa, Amharic, Zulu, Twi, and Omoro.')
      },
      {
          question: t('How do I use the barcode scanner?'),
          answer: t('To use the barcode scanner, simply tap on the "Scan" button, align the barcode within the viewfinder, and the app will automatically detect and retrieve the product details. Ensure your camera has sufficient lighting for accurate scanning.')
      },
      {
          question: t('Can I upload a barcode image instead of scanning?'),
          answer: ('Yes, you can upload a barcode image by selecting the "Upload" option. Choose an image from your gallery that clearly shows the barcode. The app will process the image and provide product details similar to scanning.')
      },
      {
          question: ('What languages does the app support?'),
          answer: ('Our app supports multiple languages, including English, French, Swahili, Hausa, Amharic, Zulu, Twi, and Omoro. You can select your preferred language from the settings to view product information and interact with the chatbot in that language.')
      },
      {
          question: t('How can I get more information about a product?'),
          answer: t('After retrieving the product details, you have the option to chat with our chatbot for more in-depth information. The chatbot can assist you with additional product inquiries, availability, and other related questions.')
      },
      {
          question: t('What should I do if the app does not recognize my barcode?'),
          answer: t('If the app does not recognize your barcode, please ensure the barcode is clear and well-lit. If you still encounter issues, try uploading a different image or contacting our support team for assistance.')
      },
      {
          question: t('How do I contact support?'),
          answer: t('For any issues or support inquiries, you can contact us through the "Help" section in the app or email us directly at support@yourappdomain.com. We’re here to help you with any questions or problems you may have.')
      },
      {
          question: t('Is my data safe with this app?'),
          answer: t('Yes, your data privacy and security are our top priorities. We use encryption and secure protocols to protect your information. For more details, please refer to our privacy policy available in the app.')
      }
  ];
  

    const toggleState = (index) => {
        if (active.includes(index)) {
            setActive(active.filter(i => i !== index));
        } else {
            setActive([...active, index]);
        }
    }


    const styles = StyleSheet.create({
        container: {
          flex: 1,
          padding: 20,
          backgroundColor: theme === 'dark' ? '#1e1e1e' : '#fff',
        },
        title: {
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 20,
          color: theme === 'dark' ? '#fff' : '#000',
        },
        faqContainer: {
          marginBottom: 10,
          borderBottomWidth: 1,
          borderBottomColor: '#E0E0E0',
        },
        question: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 15,
        },
        questionText: {
          fontSize: 18,
          color: theme === 'dark' ? '#daa163' : '#15718e',
        },
        answer: {
          paddingHorizontal: 10,
          paddingBottom: 15,
        },
        answerText: {
          fontSize: 16,
          color: theme === 'dark' ? '#fff' : '#1e1e1e',
        },
        texture: {
            ...StyleSheet.absoluteFillObject,
            width: '100%',
            height: '100%',
          }
      });

    return (
        <ScrollView>
        <View style={styles.container}>
            <ImageBackground source={require('../../assets/images/texture.png')} style={styles.texture}></ImageBackground>
            <Header navigation={navigation} />
            <Text style={styles.title}>FAQ</Text>
          <View style={{height: height}}>
                {data.map((faq, index) => {
                    return (
                        <View key={index} style={styles.faqContainer}>
                            <TouchableOpacity style={styles.question} onPress={() => toggleState(index)}>
                                <Text style={styles.questionText}>{faq.question}</Text>
                                <Icon
                                    name={active.includes(index) ? 'chevron-up' : 'chevron-down'}
                                    size={24}
                                    color={theme === 'dark' ? '#daa163' : '#15718e'}
                                    />
                            </TouchableOpacity>
                            <Collapsible collapsed={!active.includes(index)}>
                                <View style={styles.answer}>
                                    <Text style={styles.answerText}>{faq.answer}</Text>
                                </View>
                            </Collapsible>
                        </View>
                    )
                })}
            </View>
            </View>
        </ScrollView>
    );
};




export default FaqPage;