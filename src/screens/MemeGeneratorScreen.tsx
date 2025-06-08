import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  Alert,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {
  launchImageLibrary,
  launchCamera,
  ImagePickerResponse,
  MediaType,
} from 'react-native-image-picker';
import { MemeTemplate } from '../types';
import { MEME_TEMPLATES } from '../constants/templates';
import { COLORS } from '../constants/colors';
import MemeCanvas, { MemeCanvasRef } from '../components/MemeCanvas';
import TemplateSelector from '../components/TemplateSelector';
import Dropdown, { DropdownItem } from '../components/Dropdown';

const MemeGeneratorScreen: React.FC = () => {
  // Start with the blank document template selected by default
  const [selectedTemplate, setSelectedTemplate] = useState<MemeTemplate | null>(
    MEME_TEMPLATES.find(template => template.id === 'blank_document') || null
  );
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const memeCanvasRef = useRef<MemeCanvasRef>(null);

  // Dropdown items for add menu
  const dropdownItems: DropdownItem[] = [
    { id: 'add_text', label: 'Add Text', icon: '📝' },
    { id: 'add_image_gallery', label: 'Add from Gallery', icon: '🖼️' },
    { id: 'add_image_camera', label: 'Add from Camera', icon: '📷' },
  ];

  // Handle template selection
  const handleTemplateSelect = useCallback((template: MemeTemplate) => {
    setSelectedTemplate(template);
    setShowTemplateSelector(false);
  }, []);

  // Handle template selector opening
  const handleSelectTemplate = useCallback(() => {
    setShowTemplateSelector(true);
  }, []);

  // Image picker options
  const imagePickerOptions = {
    mediaType: 'photo' as MediaType,
    includeBase64: false,
    maxHeight: 2000,
    maxWidth: 2000,
    quality: 0.8 as any, // Type assertion to handle quality type
  };

  // Request camera permission for Android
  const requestCameraPermission = async (): Promise<boolean> => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
          title: 'Camera Permission Required',
          message: 'This app needs access to camera to take photos',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        });
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn('Camera permission request error:', err);
        return false;
      }
    }
    return true; // iOS handles permissions automatically
  };

  // Request storage permission for Android
  const requestStoragePermission = async (): Promise<boolean> => {
    if (Platform.OS === 'android') {
      try {
        const permission =
          Platform.Version >= 33
            ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
            : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

        const granted = await PermissionsAndroid.request(permission, {
          title: 'Storage Permission Required',
          message: 'This app needs access to your photos to add them to your memes',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        });
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn('Storage permission request error:', err);
        return false;
      }
    }
    return true; // iOS handles permissions automatically
  };

  // Handle image selection from gallery
  const handleSelectImageFromGallery = useCallback(async () => {
    // Request storage permission first for Android
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      Alert.alert(
        'Permission Required',
        'Storage permission is required to access your photos. Please enable it in your device settings.',
        [{ text: 'OK' }]
      );
      return;
    }

    launchImageLibrary(imagePickerOptions, (response: ImagePickerResponse) => {
      if (response.didCancel || response.errorMessage) {
        if (response.errorMessage) {
          Alert.alert('Error', response.errorMessage);
        }
        return;
      }

      if (response.assets && response.assets[0]) {
        const imageUri = response.assets[0].uri;
        if (imageUri && memeCanvasRef.current) {
          memeCanvasRef.current.addImageElement(imageUri);
        }
      }
    });
  }, []);

  // Handle image selection from camera
  const handleSelectImageFromCamera = useCallback(async () => {
    // Request camera permission first
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      Alert.alert(
        'Permission Required',
        'Camera permission is required to take photos. Please enable it in your device settings.',
        [{ text: 'OK' }]
      );
      return;
    }

    launchCamera(imagePickerOptions, (response: ImagePickerResponse) => {
      if (response.didCancel || response.errorMessage) {
        if (response.errorMessage) {
          Alert.alert('Error', response.errorMessage);
        }
        return;
      }

      if (response.assets && response.assets[0]) {
        const imageUri = response.assets[0].uri;
        if (imageUri && memeCanvasRef.current) {
          memeCanvasRef.current.addImageElement(imageUri);
        }
      }
    });
  }, []);

  // Handle dropdown item selection
  const handleDropdownSelect = useCallback(
    (item: DropdownItem) => {
      if (!memeCanvasRef.current) return;

      switch (item.id) {
        case 'add_text':
          memeCanvasRef.current.addTextElement();
          break;
        case 'add_image_gallery':
          handleSelectImageFromGallery();
          break;
        case 'add_image_camera':
          handleSelectImageFromCamera();
          break;
        default:
          console.log('Unknown dropdown item:', item.id);
      }
    },
    [handleSelectImageFromGallery, handleSelectImageFromCamera]
  );

  // Handle add text element
  const handleAddText = useCallback(() => {
    if (memeCanvasRef.current) {
      memeCanvasRef.current.addTextElement();
    }
  }, []);

  // Handle add image element
  const handleAddImage = useCallback(() => {
    if (memeCanvasRef.current) {
      memeCanvasRef.current.addImageElement();
    }
  }, []);

  // Handle save/export action
  const handleExport = useCallback(() => {
    console.log('Export action triggered');
    // In a real app, this would capture the canvas and save/share the meme
  }, []);

  // Handle done action
  const handleDone = useCallback(() => {
    console.log('Done action triggered');
    // In a real app, this might navigate back or finalize the meme
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.GRAY_800} />

      {/* Header */}
      <View style={styles.header}>
        <Dropdown items={dropdownItems} onSelect={handleDropdownSelect} buttonText="+" />
        <TouchableOpacity onPress={handleSelectTemplate} style={styles.selectTemplateButton}>
          <Text style={styles.selectTemplateText}>Template</Text>
        </TouchableOpacity>
      </View>

      {/* Main Canvas */}
      <MemeCanvas
        ref={memeCanvasRef}
        selectedTemplate={selectedTemplate}
        onAddText={handleAddText}
        onAddImage={handleAddImage}
      />

      {/* Bottom Toolbar */}
      <View style={styles.bottomToolbar}>
        <TouchableOpacity
          onPress={handleExport}
          style={[
            styles.bottomButton,
            { borderColor: COLORS.PRIMARY, backgroundColor: COLORS.PRIMARY },
          ]}>
          <Text style={[styles.bottomButtonText, { color: COLORS.WHITE }]}>↓ Export</Text>
        </TouchableOpacity>
      </View>

      {/* Template Selector */}
      <TemplateSelector
        templates={MEME_TEMPLATES}
        selectedTemplate={selectedTemplate}
        onTemplateSelect={handleTemplateSelect}
        onClose={() => setShowTemplateSelector(false)}
        isVisible={showTemplateSelector}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.GRAY_200,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.GRAY_800,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  selectTemplateButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 16,
  },
  selectTemplateText: {
    fontSize: 14,
    color: COLORS.WHITE,
    fontWeight: '500',
  },
  gestureInfo: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.GRAY_200,
  },
  gestureText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.GRAY_800,
    textAlign: 'center',
  },
  bottomToolbar: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: COLORS.GRAY_800,
    gap: 12,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  bottomButton: {
    borderRadius: 8,
    minHeight: 44,
    backgroundColor: 'transparent',
    borderWidth: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.WHITE,
  },
});

export default MemeGeneratorScreen;
