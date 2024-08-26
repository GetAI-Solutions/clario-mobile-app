import { View, Text } from "react-native"
import DrawerButton from "../components/DrawerButton";

const HomeScreen = ({navigation }) => {
    return (
        <View>
            <DrawerButton navigation={navigation} />
            <Text>Hello, this is the home page</Text>
        </View>
    )
}

export default HomeScreen;