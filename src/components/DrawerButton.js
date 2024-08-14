import { View, StyleSheet, TouchableOpacity } from "react-native"
import Icon from 'react-native-vector-icons/Ionicons';


const DrawerButton = ({ navigation }) => {
    const toggleDrawer = () => {
        navigation.toggleDrawer()
    }

    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={toggleDrawer} style={styles.hamburgerButton}>
            <Icon name="menu" size={28} color="#000" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderColor: '#ddd',
      },
      hamburgerButton: {
        marginRight: 20,
      },
})

export default DrawerButton