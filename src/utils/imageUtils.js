export const fetchImageFromUri = async (uri) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
  return file;
};
