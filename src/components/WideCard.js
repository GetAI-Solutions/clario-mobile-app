import { View, TouchableOpacity, Image, StyleSheet, Text, Dimensions, Platform } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const { width, height } = Dimensions.get('window');

const WideCard = ({ name, brand, image, onPress }) => {
    const { theme } = useTheme();

    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <View style={styles.blueOverlay}>
                <Text style={[styles.productBrand, { color: theme.textColor }]}>{brand}</Text>
                <Text style={[styles.productName, { color: theme.textColor }]}>{name}</Text>
            </View>
            <Image source={image} style={styles.productImage} resizeMode="cover" />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        width: width * 0.72,  
        height: height * 0.66, 
        marginRight: 16,
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
    },
    productName: {
        marginLeft: 12,
    },  
    blueOverlay: {
        position: 'absolute',
        height: '30%',
        width: '100%',
        bottom: 0,
        backgroundColor: 'rgba(0,0,255,0.2)',
        justifyContent: 'center',
    }
});

export default WideCard;
