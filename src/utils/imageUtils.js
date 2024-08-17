export const fetchImageFromUri = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    console.log("image blob...", blob)
    return blob;
  };