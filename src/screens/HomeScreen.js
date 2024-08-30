import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Touchable } from 'react-native';
import WideCard from '../components/WideCard';
import NarrowCard from '../components/NarrowCard';
import MediumCard from '../components/MediumCard';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';






/** an array of objects that represent each
 * section, in each object the following data/properties are required:
 *  - section: which has the section type string
 *  - items: an array of all the products in that section
 *    each item has objects that represent a product with the
 *    following properties:
 *      # id: product id
 *      # name: name of the product
 *      # brand: Brand of the product
 *      # img: location of the image associated with that product
 *        in this case the image are in the asset/image/product images/
 *        directory which is imported using require
 * 
 *  the cards are rendered by mapping through this array
 * **/


/******** Array starts Here *********/

/********** Array Ends Here **********/



const HomeScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
const products = [
  
  {
    section: t('Popular Today'),
    items: [
      {
        product_barcode: 9554100150802,
        product_name: 'Enrich Coco Crunch',
        product_summary: 'A hydrating and strengthening hair mask...',
        image_url:  require('../../assets/images/coco.jpg')
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
        image_url: require('../../assets/images/hub.jpg')
      },
    ],
  },
  {
    section: t('African Made'),
    items: [
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
          image_url: require('../../assets/images/chips.jpg')
      },
      {
        product_barcode: 4005808226740,
        product_name: 'Nivea Men Body Lotion',
        product_summary: `NIVEA Men Body Lotion provides intense hydration for men’s skin, offering a non-greasy feel and long-lasting moisture. It features key ingredients like glycerin and dimethicone to nourish and smooth the skin. Ideal for daily use on the body, face, hands, and feet, this lotion is available in various sizes and formulas, including options for different skin types and preferences.`,
        image_url: require('../../assets/images/nivea.jpg')
      },
      {
        product_barcode: 6186000077021,
        product_name: 'Queen Elisabeth Cocoa Butter',
        product_summary: 'Queen Elisabeth Cocoa Butter is a rich, creamy lotion designed to deeply moisturize and soothe dry skin. It provides intense hydration, improves skin texture, and creates a protective barrier against environmental factors. Ideal for use on hands, feet, elbows, and knees, it also helps reduce the appearance of stretch marks and cracked heels.',
        image_url: require('../../assets/images/butter.jpg')
      },
    ],
  },
  {
    section: t('Sponsored'),
    items: [
      {
        product_barcode: 6154000082079,
        product_name: 'Bigi Cola',
        product_summary: 'Bigi Cola is a carbonated soft drink by Rite Foods Limited, introduced in 2016. It offers a refreshing taste with ingredients including sugar, caffeine, and flavorings. Available in cans and PET bottles, it’s widely sold across Nigeria and online. Bigi Cola provides an affordable alternative to other cola brands.',
        image_url: require('../../assets/images/bigi.jpg')
      },
      {
        product_barcode: 6161106960842,
        product_name: 'Nestlé Cerelac',
        product_summary: 'Nestlé Cerelac is an instant cereal designed for infants 6-24 months old, used as a supplement to breast milk. Available in various flavors and fortified with essential vitamins and minerals, it helps introduce new tastes and textures. Cerelac is available globally in tins and cans, but should be used alongside breastfeeding or formula, not as a replacement.',
        image_url: require('../../assets/images/cerelac.jpg')
      },
      {
        product_barcode: 955001502,
        product_name: 'Enrich Coco Crunch',
        product_summary: 'A hydrating and strengthening hair mask...',
        image_url:  require('../../assets/images/coco.jpg')
      },
      {
        product_barcode: 554100150802,
        product_name: 'Enrich Coco Crunch',
        product_summary: 'A hydrating and strengthening hair mask...',
        image_url:  require('../../assets/images/coco.jpg')
      },
    ],
  },
  {
    section: t('Latest Additions'),
    items: [
      {
        product_barcode: 955410015080,
        product_name: 'Enrich Coco Crunch',
        product_summary: 'A hydrating and strengthening hair mask...',
        image_url:  require('../../assets/images/coco.jpg')
      },
      {
        product_barcode: 955410015802,
        product_name: 'Enrich Coco Crunch',
        product_summary: 'A hydrating and strengthening hair mask...',
        image_url:  require('../../assets/images/coco.jpg')
      },
      {
        product_barcode: 8084100150802,
        product_name: 'Enrich Coco Crunch',
        product_summary: 'A hydrating and strengthening hair mask...',
        image_url:  require('../../assets/images/coco.jpg')
      },
      {
        product_barcode: 78700150802,
        product_name: 'Enrich Coco Crunch',
        product_summary: 'A hydrating and strengthening hair mask...',
        image_url:  require('../../assets/images/coco.jpg')
      },
    ],
  },
];
  const handlePress = (product) => {
    navigation.navigate('ProductDetails', { product });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'light' ? '#fff' : '#333',
      padding: 20,
      paddingTop: 0,
    },
    header: {
      position: 'sticky',
      top: 0,
      left: 0,
      backgroundColor: theme === 'light' ? 'white' : '#444',
      zIndex: 1,
      height: 80,
      display: 'flex',
      justifyContent: 'center',
    },
    headerText: {
      fontSize: 20, // Adjust fontSize for better responsiveness
      fontWeight: '700',
      color: theme === 'light' ? '#daa163' : '#ffcc66',
      marginLeft: 20,
    },
    section: {
      marginTop: 20,
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 28,
      fontWeight: '700',
      color: theme === 'light' ? '#15718e' : '#a0d1e3',
      marginBottom: 10,
    },
    sponsoredTitle: {
      color: theme === 'light' ? '#daa163' : '#ffcc66',
    },
    productsRow: {
      flexDirection: 'row',
    },
    productContainer: {
      alignItems: 'center',
      width: '48%',
      marginBottom: 20,
    },
    svgStyle: {
      position: 'sticky',
      bottom: 0,
      left: 0,
      width: '101%',
      height: 80,
      zIndex: 1,
    }
  });

  return (
    <ScrollView style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.headerText}>GetAI</Text>
    </View>
    {products.map((category, categoryIndex) => (
      <View key={categoryIndex} style={styles.section}>
        <Text style={[styles.sectionTitle, category.section === t('Sponsored') && styles.sponsoredTitle]}>
          {category.section}
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productsRow}>
          {category.items.map((product, index) => {
            switch (category.section) {
              case t('Popular Today'):
                return (
                  <WideCard
                      key={index}
                      name={product.product_name}
                      brand={product.product_brand}
                      image={product.image_url}
                      onPress={() => handlePress(product)}
                    />
                );
              case t('African Made'):
                return (
                  <NarrowCard
                      key={index}
                      name={product.product_name}
                      brand={product.product_brand}
                      image={product.image_url}
                      onPress={() => handlePress(product)}
                    />
                );
              default:
                return (
                  <MediumCard
                      key={index}
                      name={product.product_name}
                      brand={product.product_brand}
                      image={product.image_url}
                      onPress={() => handlePress(product)}
                    />
                );
            }
          })}
        </ScrollView>
      </View>
    ))}
  </ScrollView>
  );
};



export default HomeScreen;