import React from 'react';
import { View, Text, ScrollView, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Header from '../components/Header';

const TermsPage = ({ navigation }) => {
  const { theme } = useTheme();
  const { height } = Dimensions.get('window');

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
      color: theme === 'dark' ? '#daa163' : '#15718E',
      textAlign: 'center',
    },
    paragraph: {
      fontSize: 16,
      color: theme === 'dark' ? '#fff' : '#1e1e1e',
      marginBottom: 10,
      lineHeight: 24,
    },
    texture: {
      ...StyleSheet.absoluteFillObject,
      width: '100%',
      height: '100%',
      zIndex: -1,
    },
  });

  return (
    <ScrollView>
      <View style={styles.container}>
        <ImageBackground source={require('../../assets/images/texture.png')} style={styles.texture}></ImageBackground>
        <Header navigation={navigation} />
        <Text style={styles.title}>Terms and Conditions</Text>
        <View style={{ height: height }}>
          <Text style={styles.paragraph}>
            Welcome to our barcode scanning app. By using our services, you agree to comply with the following terms:
          </Text>

          <Text style={styles.paragraph}>
            <Text style={{ fontWeight: 'bold' }}>1. Data Usage:</Text> We collect and use data to provide accurate product details after scanning or uploading barcodes. Your personal data will be protected in accordance with our privacy policy.
          </Text>

          <Text style={styles.paragraph}>
            <Text style={{ fontWeight: 'bold' }}>2. Barcode Scanning:</Text> You are responsible for ensuring that you have the legal right to scan or upload any barcode. We provide information based on available product data, but we do not guarantee its accuracy or completeness.
          </Text>

          <Text style={styles.paragraph}>
            <Text style={{ fontWeight: 'bold' }}>3. Liability Disclaimer:</Text> We are not liable for any damages that arise from the use of incorrect or outdated product information. Please verify product details through our chatbot if necessary.
          </Text>

          <Text style={styles.paragraph}>
            <Text style={{ fontWeight: 'bold' }}>4. Chatbot Assistance:</Text> The chatbot is provided to help you with additional product queries. The chatbot responses are for informational purposes only and do not constitute professional advice.
          </Text>

          <Text style={styles.paragraph}>
            <Text style={{ fontWeight: 'bold' }}>5. User Responsibilities:</Text> You must use the app in accordance with the law and refrain from submitting false or misleading data.
          </Text>

          <Text style={styles.paragraph}>
            <Text style={{ fontWeight: 'bold' }}>6. Changes to Terms:</Text> We reserve the right to modify these terms at any time. Please review them periodically to stay informed of updates.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default TermsPage;
