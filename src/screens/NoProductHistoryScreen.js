import React, { useState, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import jsQR from 'jsqr';
import Icon from 'react-native-vector-icons/Ionicons';


const NoProductHistory = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [showCamera, setShowCamera] = useState(false);
    const [scanResult, setScanResult] = useState('');
    const [uploadResult, setUploadResult] = useState('');
    const cameraRef = useRef(null);
    const navigation = useNavigation();

    React.useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleScanClick = () => {
        setShowCamera(true);
    };

    const handleUploadClick = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            handleImageUpload(result.uri);
        }
    };

    const handleImageUpload = (uri) => {
        fetch(uri)
            .then((response) => response.blob())
            .then((blob) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const image = new Image();
                    image.src = reader.result;
                    image.onload = () => {
                        const canvas = document.createElement('canvas');
                        canvas.width = image.width;
                        canvas.height = image.height;
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                        const code = jsQR(imageData.data, imageData.width, imageData.height);
                        if (code) {
                            setUploadResult(`Barcode found: ${code.data}`);
                        } else {
                            setUploadResult('No barcode found.');
                        }
                    };
                };
                reader.readAsDataURL(blob);
            });
    };

    const capture = useCallback(async () => {
        if (cameraRef.current) {
            const options = { quality: 0.5, base64: true };
            const data = await cameraRef.current.takePictureAsync(options);
            handleImageUpload(data.uri);
            setShowCamera(false);
        }
    }, [cameraRef]);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <View style={styles.content}>
                <Image source={require('../../assets/images/phone-barcode.png')} style={styles.image} />
                <Text style={styles.title}>No Product History</Text>
                <Text style={styles.subtitle}>Scan or upload to get started</Text>
                <Text style={styles.subtitle}>Scan or upload an image of your products' barcode to identify your product</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={handleUploadClick} style={styles.actionButton}>
                        <Image source={require('../../assets/images/upload.png')} style={styles.actionIcon} />
                        <Text style={styles.actionText}>Upload</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleScanClick} style={styles.actionButton}>
                        <Image source={require('../../assets/images/scan.png')} style={styles.actionIcon} />
                        <Text style={styles.actionText}>Scan</Text>
                    </TouchableOpacity>
                </View>
                {showCamera && (
                    <View style={styles.cameraContainer}>
                        <Camera
                            ref={cameraRef}
                            style={styles.camera}
                            type={Camera.Constants.Type.back}
                            flashMode={Camera.Constants.FlashMode.off}
                            ratio="16:9"
                        >
                            <TouchableOpacity onPress={capture} style={styles.captureButton}>
                                <Text style={styles.captureButtonText}>Capture</Text>
                            </TouchableOpacity>
                        </Camera>
                    </View>
                )}
                {scanResult ? (
                    <View style={styles.resultContainer}>
                        <Text style={styles.resultText}>{scanResult}</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Chatbot')} style={styles.proceedButton}>
                            <Text style={styles.proceedButtonText}>Proceed to Chatbot</Text>
                        </TouchableOpacity>
                    </View>
                ) : null}
                {uploadResult ? (
                    <View style={styles.resultContainer}>
                        <Text style={styles.resultText}>{uploadResult}</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Chatbot')} style={styles.proceedButton}>
                            <Text style={styles.proceedButtonText}>Proceed to Chatbot</Text>
                        </TouchableOpacity>
                    </View>
                ) : null}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    paddingBottom: 8,
    marginBottom: 16,
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: 8,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#4a5568',
    textAlign: 'center',
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 16,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionIcon: {
    width: 48,
    height: 48,
    marginBottom: 8,
  },
  actionText: {
    color: '#319795',
  },
  cameraContainer: {
    width: '100%',
    height: 300,
    marginBottom: 16,
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  captureButton: {
    position: 'absolute',
    bottom: 16,
    left: '50%',
    marginLeft: -50,
    backgroundColor: '#319795',
    padding: 16,
    borderRadius: 8,
  },
  captureButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  resultContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  resultText: {
    fontSize: 16,
    color: '#4a5568',
    marginBottom: 16,
  },
  proceedButton: {
    backgroundColor: '#319795',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  proceedButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default NoProductHistory;
