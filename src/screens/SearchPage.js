import React, { useContext, useState } from 'react'; 
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ActivityIndicator, FlatList, ScrollView } from 'react-native';
import Header from '../components/Header';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import WideCard from '../components/WideCard';

const SearchPage = ({ navigation }) => {
    const [productName, setProductName] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const { t } = useTranslation();
    const { theme } = useTheme();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme === 'dark' ? '#1E1E1E' : '#FFF',
            paddingHorizontal: 20,
        },
        searchBarContainer: {
            marginTop: 10,
            marginBottom: 20,
        },
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: theme === 'dark' ? '#bbb' : '#319795',
            borderRadius: 25,
            paddingHorizontal: 10,
            paddingRight: 0,
            width: '100%',
            backgroundColor: theme === 'dark' ? '#333' : '#fff',
        },
        input: {
            flex: 1,
            paddingVertical: 12,
            paddingHorizontal: 8,
            fontSize: 16,
            color: theme === 'dark' ? '#fff' : '#000',
        },
        searchButton: {
            padding: 8,
            backgroundColor: theme === 'dark' ? '#2c7391' : '#2c7391',
            borderRadius: 50,
            marginLeft: -10,
            height: 45,
            width: 45,
            justifyContent: 'center',   
        },
        searchIcon: {
            width: 30,
            height: 30,
            marginRight: 10,
        },
        sendIcon: {
            width: 20,
            height: 20,
            alignSelf: 'center',
        },
        loadingIndicator: {
            marginVertical: 20, 
        },
        resultCard: {
            backgroundColor: theme === 'dark' ? '#333' : '#f9f9f9',
            padding: 15,
            marginVertical: 10,
            borderRadius: 10,
            width: '100%',
        },
        resultText: {
            fontSize: 18,
            color: theme === 'dark' ? '#fff' : '#000',
        },
        content: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
        },
        imageContainer: {
            position: 'relative',
            marginTop: 100,
            marginBottom: -10,
        },
        personImage: {
            width: 300,
            height: 300,
        },
        messageText: {
            fontSize: 28,
            fontWeight: 'bold',
            color: theme === 'dark' ? '#fff' : '#000',
            marginBottom: 10,
            textAlign: 'center',
            width: '60%',
            marginTop: -50,
        },
        suggestionText: {
            fontSize: 16,
            color: theme === 'dark' ? '#aaa' : '#666',
            marginBottom: 20,
            textAlign: 'center',
            fontWeight: 'semibold',
        },
        searchResults: {
            display: 'flex',
            flexDirection: 'row',
            flexGrow: 1,

            
        }
    });

    const handlePress = (product) => {
        navigation.navigate('ProductDetails', { product });
      };
      
    const handleSearch = () => {
        setLoading(true);
        setError(null);

        // Simulate API call with a timeout
        setTimeout(() => {
            setLoading(false);

            const results = [
                    {
                      product_barcode: 9554100150802,
                      product_name: "Enrich Coco Crunch",
                      product_summary: "Enrich Coco Crunch is a chocolate-flavored breakfast cereal made by Enrich, a brand based in Ethiopia. It is available in two sizes:\n\n- 500g package\n- 375g package\n\nKey features:\n\n- Made with whole grain\n- Shaped like wheat curls\n- Can be enjoyed for breakfast or as a snack\n- Comes in a sealed package\n- Provides a nutritious start to the day\n\nNutritional benefits:\n\n- High in protein, with an excellent amino acid profile including BCAAs and glutamic acid which stimulate muscle building\n- Contains prebiotics, probiotics, and fiber for digestive wellness\n\nEnrich Coco Crunch is a popular choice among kids and adults alike. It can be served with milk for breakfast or enjoyed as a standalone snack. Some people also use it as a topping for ice cream.\n\nThe cereal is made in Ethiopia and Thailand.",
                      image_url: require("../../assets/images/cococrunch.png")
                  },
                    {
                      product_barcode: 6224009091270,
                      product_name: 'Hub Mango Juice',
                      product_summary: `Hub Mango Juice, specifically known as Hub Nectar, is a refreshing beverage made from high-quality local mangoes. Here are the key details about this product:
              
                    Product Overview
                    - Brand: Hub Nectar
                    - Origin: Made in Egypt
                    - Packaging Sizes: Available in 200ml and 250ml bottles.
              
                    Ingredients
                    Hub Mango Nectar is crafted from real mango fruit, ensuring a natural taste without the use of artificial additives. The juice is designed to provide a flavorful alternative to fizzy drinks, appealing to health-conscious consumers.
              
                    Nutritional Aspects
                    The juice is rich in vitamins and nutrients, derived from the fresh mangoes used in its production. This makes it not only a delicious option but also a nutritious one.
              
                    Availability
                    Hub Mango Nectar is available in various online stores, including specialized beverage retailers, and is marketed as a refreshing drink suitable for various occasions.
              
                    Consumer Appeal
                    The product is positioned as a healthy beverage choice, targeting those looking for natural fruit juices. Its sweet and fruity flavor profile is designed to attract mango lovers and those seeking a tropical taste experience.
              
                    Overall, Hub Mango Juice offers a blend of quality, taste, and health benefits, making it a popular choice among consumers looking for natural fruit beverages.`,
                      image_url: require('../../assets/images/hub1.png')
                    },
                    {
                      product_barcode: 8719327078297,
                      product_name: 'Habesha Spice Sun Chips',
                      product_summary: `Habesha Spice Sun Chips are a popular snack made from high-quality Ethiopian potatoes, known for their unique local flavor. Here are the key details about this product:
              
                      Product Overview
                      - Brand: Sun Chips
                      - Flavor: Habesha Spice (locally spiced)
                      - Packaging Size: Available in 120g and 30g packs.
                      - Origin: Made in Ethiopia.
              
                      Ingredients and Quality
                      - Potatoes: 100% best Ethiopian potatoes.
                      - Production Standards: The chips are produced using advanced technology and adhere to high-quality standards, ensuring no artificial colors or preservatives are used.
                      - Health Aspects: The product is suitable for fasting and contains no cholesterol or trans fats.
              
                      Nutritional Information
                      While specific nutritional details are not provided in the search results, the emphasis on using natural ingredients suggests a healthier snack option compared to many processed chips.
              
                      Availability
                      Habesha Spice Sun Chips are widely available in Ethiopia, sold in approximately 10,000 retail locations. They are also accessible through various online platforms.
              
                      Consumer Appeal
                      These chips are marketed as a flavorful snack that highlights Ethiopian culinary traditions, appealing to both local consumers and tourists looking for authentic Ethiopian snacks.
              
                      In summary, Habesha Spice Sun Chips offer a tasty and culturally resonant snacking option, combining quality ingredients with local flavor.`,
                        image_url: require('../../assets/images/sunchips.png')
                    },
                    {
                      product_barcode: 4005808226740,
                      product_name: 'Nivea Men Body Lotion',
                      product_summary: `NIVEA Men Body Lotion provides intense hydration for men’s skin, offering a non-greasy feel and long-lasting moisture. It features key ingredients like glycerin and dimethicone to nourish and smooth the skin. Ideal for daily use on the body, face, hands, and feet, this lotion is available in various sizes and formulas, including options for different skin types and preferences.`,
                      image_url: require('../../assets/images/niveamen.png')
                    },
                    {
                      product_barcode: 6186000077021,
                      product_name: 'Queen Elisabeth Cocoa Butter',
                      product_summary: 'Queen Elisabeth Cocoa Butter is a rich, creamy lotion designed to deeply moisturize and soothe dry skin. It provides intense hydration, improves skin texture, and creates a protective barrier against environmental factors. Ideal for use on hands, feet, elbows, and knees, it also helps reduce the appearance of stretch marks and cracked heels.',
                      image_url: require('../../assets/images/butter1.png')
                    },
              ];

            setSearchResults(results);
        
        }, 2000);
    };

    const renderResultCard = ({ item }) => (
        <WideCard
          key={item.product_barcode}
          name={item.product_name}
          image={item.image_url}
          onPress={() => handlePress(item)}
        />
    );

    return (
        <ScrollView style={styles.container}>
            <Header navigation={navigation} />
            <View style={styles.searchBarContainer}>
                <View style={styles.inputContainer}>
                    <Image source={require('../../assets/images/search.png')} style={styles.searchIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder={t('Enter name of product')}
                        placeholderTextColor={theme === 'dark' ? '#aaa' : '#666'}
                        value={productName}
                        onChangeText={setProductName}
                    />
                    <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                        <Image source={require('../../assets/images/send.png')} style={styles.sendIcon} />
                    </TouchableOpacity>
                </View>
            </View>

            {!loading && searchResults.length === 0 && (
                <>
                    <View style={styles.imageContainer}>
                        <Image source={require('../../assets/images/searchart.png')} style={styles.personImage} />
                    </View>
                    <Text style={styles.messageText}>{t("Don't Have a Barcode?")}</Text>
                    <Text style={styles.suggestionText}>
                        {t('No worries, use our search by \n name feature and get information\n with ease')}
                    </Text>
                </>
            )}

            {loading && <ActivityIndicator size="large" color={theme === 'dark' ? '#fff' : '#000'} style={styles.loadingIndicator} />}
            {error && <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>{error}</Text>}

            <ScrollView style={{flexDirection: 'column'}}>
                {searchResults.map((item) => (
                    <WideCard
                    key={item.product_barcode}
                    name={item.product_name}
                    image={item.image_url}
                    onPress={() => handlePress(item)}
                    />
                ))}
            </ScrollView>
        </ScrollView>
    );
};

export default SearchPage;
