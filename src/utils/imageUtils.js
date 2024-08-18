import { Platform } from "react-native";

export const fetchImageFromUri = async (uri) => {
  if (Platform.OS === 'android') {
    const response = await fetch(uri);
    const blob = await response.blob();
    const base64String = await blobToBase64(blob);
    return base64String;
  } else {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  }
};

const blobToBase64 = async (blob) => {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  return new Promise((resolve) => {
    reader.onloadend = () => {
      resolve(reader.result);
    };
  });
};