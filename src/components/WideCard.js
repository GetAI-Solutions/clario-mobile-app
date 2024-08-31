import { View, TouchableOpacity, Image, StyleSheet, Text, Dimensions, Platform } from 'react-native';
// import { LinearGradient } from 'react-native-linear-gradient';
import { useTheme } from '../context/ThemeContext';

const { width, height } = Dimensions.get('window');

const WideCard = ({ name, brand, image, onPress }) => {
    const { theme } = useTheme();

    const styles = StyleSheet.create({
        card: {
            backgroundColor: '#15718e',
            width: width * 0.72,  
            height: width * 0.66, 
            marginRight: 16,
            borderRadius: 15,
            ...Platform.select({
                ios: {
                    shadowColor: '#15718e',
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.8,
                    shadowRadius: 10,
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
            
        },
        productName: {
            marginLeft: 12,
            marginTop: 5,
            fontSize: '1.2em',
            fontWeight: '600',
            color: theme === 'dark' ? '#fff' : '#1e1e1e',
            width: '80%',
        },  
    });

    return (
        <View>
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image source={image} style={styles.productImage} resizeMode="cover" />
        </TouchableOpacity>
            <View>
                <Text style={[styles.productBrand, { color: theme.textColor }]}>{brand}</Text>
                <Text style={[styles.productName, { color: theme.textColor }]}>{name}</Text>
            </View>
        </View>
    );
};



export default WideCard;
