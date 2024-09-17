import { View, Text } from "react-native"
import DrawerButton from "../components/DrawerButton"

const ShareScreen = ({ navigation }) => {
    return (
        <View>
            <DrawerButton navigation={navigation} />
            <Text>Share</Text>
        </View>
    )
}

export default ShareScreen