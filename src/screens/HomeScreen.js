import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Touchable } from 'react-native';
import Svg, { Path } from 'react-native-svg';
/**Different card types imported for the different types of sections**/
import WideCard from '../components/WideCard';
import NarrowCard from '../components/NarrowCard';
import MediumCard from '../components/MediumCard';
// import LinearGradient from 'react-native-linear-gradient';

/** Styling at the start, for scope purposes */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 0,
  },
  header: {
    position: 'sticky',
    top: 0,
    left: 0,
    backgroundColor: 'white',
    zIndex: 1,
    height: 80,
    display: 'flex',
    justifyContent: 'center',
  }
  ,
  headerText: {
    fontSize: '2.0em',
    fontWeight: '700',
    color: '#daa163',
    marginLeft: 20,
  },
  section: {
    marginTop: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#15718e',
    marginBottom: 10,
  },
  sponsoredTitle: {
    color: '#daa163',
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
const products = [
  {
    section: 'Popular Today',
    items: [
      {
        id: 1,
        name: 'Body Cleaner',
        brand: 'Grown Alchemist',
        img: require('../../assets/images/Grown.jpg'),
      },
      {
        id: 2,
        name: 'Light blue perfume',
        brand: 'Dolce & Gabanna',
        img: require('../../assets/images/Dolce.jpg'),
      },
    ],
  },
  {
    section: 'African Made',
    styling: styles.african,
    items: [
      {
        id: 11,
        name: 'Face cleanser',
        brand: 'Curology',
        img: require('../../assets/images/Dolce.jpg'),
      },
      {
        id: 12,
        name: 'Restorative Hair Mask',
        brand: 'Act+',
        img: require('../../assets/images/Grown.jpg'),
      },
      {
        id: 13,
        name: 'Potatoe Chips',
        brand: 'Pringles',
        img: require('../../assets/images/Dolce.jpg'),
      },
    ],
  },
  {
    section: 'Sponsored',
    styling: styles.sponsored,
    items: [
      {
        id: 3,
        name: 'Face cleanser',
        brand: 'Curology',
        
      },
      {
        id: 4,
        name: 'Restorative Hair Mask',
        brand: 'Act+',
        
      },
      {
        id: 5,
        name: 'Potatoe Chips',
        brand: 'Pringles',
        
      },
      {
        id: 6,
        name: 'Light blue perfume',
        brand: 'Dolce & Gabanna',
        
      },
    ],
  },
  {
    section: 'Latest Additions',
    styling: styles.latest,
    items: [
      {
        id: 7,
        name: 'Face cleanser',
        brand: 'Curology',
        
      },
      {
        id: 8,
        name: 'Face cleanser',
        brand: 'Curology',
        
      },
      {
        id: 9,
        name: 'Face cleanser',
        brand: 'Curology',
        
      },
      {
        id: 10,
        name: 'Face cleanser',
        brand: 'Curology',
      },
    ],
  },
];
/********** Array Ends Here **********/



const HomeScreen = () => {
  return (
    <ScrollView>
      <View style={styles.header}>
        <Text style={styles.headerText}>GetAI</Text>
      </View>
      <View style={styles.container}>
        {products.map((category, categoryIndex) => (
          <View key={categoryIndex} style={styles.section}>
            <Text style={[styles.sectionTitle, category.section === 'Sponsored' && styles.sponsoredTitle]}>
              {category.section}
            </Text>
            <ScrollView 
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              style={styles.productsRow}>
              {category.items.map((product) => {
                switch (category.section){
                  case 'Popular Today':
                    return (
                    <WideCard
                      id={product.id}
                      name={product.name}
                      brand={product.brand}
                      img={product.img}
                    ></WideCard>)
                  case 'African Made':
                    return (
                    <NarrowCard
                      id={product.id}
                      name={product.name}
                      brand={product.brand}
                      img={product.img}
                  ></NarrowCard>)
                  default:
                    return (
                    <MediumCard
                      id={product.id}
                      name={product.name}
                      brand={product.brand}
                      img={product.img}
                    ></MediumCard>)
                }
              }
              )}
            </ScrollView>
          </View>
        ))}
      </View>
      {/*an SVG that serves as a background for the tabbar with transparent background */}
    </ScrollView>
  );
};



export default HomeScreen;