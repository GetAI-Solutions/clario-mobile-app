import { View, StyleSheet, TouchableOpacity } from "react-native"
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../context/ThemeContext';

const DrawerButton = ({ navigation }) => {
  const { theme } = useTheme();
  const toggleDrawer = () => {
    navigation.toggleDrawer()
  }

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={toggleDrawer} style={styles.hamburgerButton}>
        <Icon name="menu" size={28} color={theme === 'dark' ? '#fff' : '#000'} />
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
    borderBottomWidth: 1,
  },
  lightHeader: {
    backgroundColor: '#ffffff',
    borderColor: '#ddd',
  },
  darkHeader: {
    backgroundColor: '#1E1E1E',
    borderColor: '#333',
  },
  hamburgerButton: {
    marginRight: 20,
  },
})

export default DrawerButton;