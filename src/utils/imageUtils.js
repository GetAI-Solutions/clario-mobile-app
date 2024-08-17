import { Platform } from "react-native";

export const fetchImageFromUri = async (uri) => {
    const response = await fetch(uri);
    let blob = await response.blob();
    if(Platform.OS === "android" || Platform.OS === "ios") {
      const _size = blob["_data"]["size"]
      const _type = blob["_data"]["type"]
      blob = {size: _size, type: _type}
    }
    console.log("image blob...", blob)
    return blob;
  };