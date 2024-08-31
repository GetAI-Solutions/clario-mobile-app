import { View, TouchableOpacity, Image, StyleSheet, Text, Dimensions, Platform } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const { width, height } = Dimensions.get('window');

const NarrowCard = ({ name, brand, image, onPress }) => {
    const { theme } = useTheme();

    const styles = StyleSheet.create({
        card: {
            width: width * 0.41,  
            height: width * 0.53, 
            backgroundColor: 'grey',
            marginRight: 12,
            borderRadius: 15,
            ...Platform.select({
                ios: {
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                },
                android: {
                    elevation: 5,
                },
            }),
        },
        productImage: { 
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: 15,
        },
        productBrand: {
            marginLeft: 12,
            fontWeight: '600',
            color: '#000',
        },
        productName: {
            color: '#000',
            marginLeft: 12,
            marginTop: 5,
            fontSize: '1em',
            fontWeight: '600',
            color: theme === 'dark' ? '#fff' : '#1e1e1e',
            width: '60%'
        },  
    });

    return (
        <View>
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image source={image} style={styles.productImage} resizeMode="cover" />
        </TouchableOpacity>
            <View>
                <Text style={styles.productBrand}>{brand}</Text>
                <Text style={styles.productName}>{name}</Text>
            </View>
        </View>
    );
};


export default NarrowCard;
