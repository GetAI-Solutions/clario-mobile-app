import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ImageBackground, Dimensions } from 'react-native';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../context/ThemeContext';
import Header from '../components/Header';

const FaqPage = ({navigation}) => {
    const { theme } = useTheme();
    const [active, setActive] = useState([]);
    const { height } = Dimensions.get('window');

    const data = [
        { question: 'Lorum Ipsum', answer: 'Lorem ipsum dolor sit amet. Et accusamus inventore ea ratione magni qui commodi repellendus non voluptate accusantium' },
        { question: 'Lorum Ipsum', answer: 'Lorem ipsum dolor sit amet. Et accusamus inventore ea ratione magni qui commodi repellendus non voluptate accusantium' },
        { question: 'Lorum Ipsum', answer: 'Lorem ipsum dolor sit amet. Et accusamus inventore ea ratione magni qui commodi repellendus non voluptate accusantium' },
        { question: 'Lorum Ipsum', answer: 'Lorem ipsum dolor sit amet. Et accusamus inventore ea ratione magni qui commodi repellendus non voluptate accusantium' },
        { question: 'Lorum Ipsum', answer: 'Lorem ipsum dolor sit amet. Et accusamus inventore ea ratione magni qui commodi repellendus non voluptate accusantium' },
    ]

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