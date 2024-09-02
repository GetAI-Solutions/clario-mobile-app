import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Touchable, ImageBackground } from 'react-native';
import WideCard from '../components/WideCard';
import NarrowCard from '../components/NarrowCard';
import MediumCard from '../components/MediumCard';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
// import { LinearGradient } from 'react-native-linear-gradient';

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
    section: 'Popular Today',
    items: [
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
    ],
  },
  {
    section: 'African Made',
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
    ],
  },
  {
    section: 'Sponsored',
    items: [
      {
        product_barcode: 6154000082079,
        product_name: 'Bigi Cola',
        product_summary: 'Bigi Cola is a carbonated soft drink by Rite Foods Limited, introduced in 2016. It offers a refreshing taste with ingredients including sugar, caffeine, and flavorings. Available in cans and PET bottles, it’s widely sold across Nigeria and online. Bigi Cola provides an affordable alternative to other cola brands.',
        image_url: require('../../assets/images/realbigi.png')
      },
      {
        product_barcode: 6161106960842,
        product_name: 'Nestlé Cerelac',
        product_summary: 'Nestlé Cerelac is an instant cereal designed for infants 6-24 months old, used as a supplement to breast milk. Available in various flavors and fortified with essential vitamins and minerals, it helps introduce new tastes and textures. Cerelac is available globally in tins and cans, but should be used alongside breastfeeding or formula, not as a replacement.',
        image_url: require('../../assets/images/cerelac.png')
      },
      {
        product_barcode: 9554100150802,
        product_name: "Enrich Coco Crunch",
        product_summary: "Enrich Coco Crunch is a chocolate-flavored breakfast cereal made by Enrich, a brand based in Ethiopia. It is available in two sizes:\n\n- 500g package\n- 375g package\n\nKey features:\n\n- Made with whole grain\n- Shaped like wheat curls\n- Can be enjoyed for breakfast or as a snack\n- Comes in a sealed package\n- Provides a nutritious start to the day\n\nNutritional benefits:\n\n- High in protein, with an excellent amino acid profile including BCAAs and glutamic acid which stimulate muscle building\n- Contains prebiotics, probiotics, and fiber for digestive wellness\n\nEnrich Coco Crunch is a popular choice among kids and adults alike. It can be served with milk for breakfast or enjoyed as a standalone snack. Some people also use it as a topping for ice cream.\n\nThe cereal is made in Ethiopia and Thailand.",
        image_url: require("../../assets/images/dolce.png")
    },
    
      {
        product_barcode: 554100150802,
        product_name: 'Enrich Coco Crunch',
        product_summary: 'A hydrating and strengthening hair mask...',
        image_url:  require('../../assets/images/cococrunch.png')
      },
    ],
  },
  {
    section: 'Latest Additions',
    items: [
      {
        product_barcode: 955410015080,
        product_name: 'Enrich Coco Crunch',
        product_summary: 'A hydrating and strengthening hair mask...',
        image_url:  require('../../assets/images/cococrunch.png')
      },
      {
        product_barcode: "6291007700213",
        product_name: "Nutro Marie Tea Time Biscuits",
        product_summary: "Nutro Marie Tea Time Biscuits are light and crispy, made from wheat flour with a subtly sweet flavor. Available in 200g and 45g packs, they're perfect for pairing with tea or coffee. Each 200g pack offers approximately 110 calories per 5 biscuits. Rated 4.1/5 for taste and texture.",
        image_url: require('../../assets/images/marie1.png')
      },
      {
        product_barcode: 8084100150802,
        product_name: 'Enrich Coco Crunch',
        product_summary: 'A hydrating and strengthening hair mask...',
        image_url:  require('../../assets/images/cococrunch.png')
      },
      {
        product_barcode: 6290400030095,
        product_name: "Quaker White Oats",
        product_summary: "Quaker White Oats are 100% whole grain rolled oats, providing a nutritious start to your day. Each 500g pack from PepsiCo offers 374 kcal per 100g, with high fiber and protein content. Ideal for oatmeal, baking, and smoothies. No artificial additives.",
        image_url: require('../../assets/images/butter1.png')
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
      backgroundColor: theme === 'light' ? '#fff' : '#1e1e1e',
      padding: 20,
      paddingTop: 0,
    },
    header: {
      position: 'sticky',
      top: 0,
      left: 0,
      backgroundColor: theme === 'light' ? 'white' : '#1e1e1e',
      zIndex: 1,
      height: 80,
      display: 'flex',
      justifyContent: 'space-between',
    },
    headerText: {
      fontSize: 20, // Adjust fontSize for better responsiveness
      fontWeight: 700,
      color: theme === 'light' ? '#15718e' : '#fff',
      marginLeft: 20,
      marginTop: 20,
    },
    logo: {
      position: 'absolute',
      top: 15,
      left: '80%',
      width: 50,
      height: 50,
      resizeMode: 'contain',
    },
    section: {
      marginTop: 20,
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 28,
      fontWeight: 700,
      color: theme === 'dark' ? '#FFF' : '#15718e',
      marginBottom: 10,
    },
    sponsoredTitle: {
      color:  '#faad5e',
    },
    productsRow: {
      flexDirection: 'row',
    },
    productContainer: {
      alignItems: 'center',
      width: '48%',
      marginBottom: 20,
    },
    texture: {
      ...StyleSheet.absoluteFillObject,
      width: '100%',
      height: '100%',
      zIndex: -1,
    }
  });

  return (
    <ScrollView >
    <View style={styles.header}>
      <Image source={require('../../assets/images/getai.png')} style={styles.logo}></Image>
      <Text style={styles.headerText}>GetAI</Text>
    </View>
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/images/texture.png')} style={styles.texture}></ImageBackground>
    {products.map((category, categoryIndex) => (
      <View key={categoryIndex} style={styles.section}>
        <Text style={[styles.sectionTitle, (category.section === 'Sponsored' || category.section === 'Latest Additions') && styles.sponsoredTitle]}>
          {t(category.section)}
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productsRow}>
          {category.items.map((product, index) => {
            switch (category.section) {
              case 'Popular Today':
                return (
                  <WideCard
                      key={index}
                      name={product.product_name}
                      brand={product.product_brand}
                      image={product.image_url}
                      onPress={() => handlePress(product)}
                    />
                );
              case 'African Made':
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
    </View>
  </ScrollView>
  );
};



export default HomeScreen;