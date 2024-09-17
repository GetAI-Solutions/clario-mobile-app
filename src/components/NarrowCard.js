import { View, TouchableOpacity, Image, StyleSheet, Text, Dimensions, Platform } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';


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
            fontWeight: '600',
            
        },
        textContainer: {
            position: 'absolute',
            bottom: 16,
            left: 16,
            width: '80%',
        },
        gradient: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 15,
        },
        productName: {
            fontSize: 16,
            fontWeight: '600',
            color: '#fff',
        },  
    });

    return (
        <View>
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image source={image} style={styles.productImage} resizeMode="cover" />
            <LinearGradient
            colors={['rgba(217, 217, 217, 0)', '#15718e']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }} 
            style={styles.gradient}
            >
            </LinearGradient>
            <View style={styles.textContainer}>
                <Text style={styles.productBrand}>{brand}</Text>
                <Text style={styles.productName}>{name}</Text>
            </View>
        </TouchableOpacity>
        </View>
    );
};


export default NarrowCard;
