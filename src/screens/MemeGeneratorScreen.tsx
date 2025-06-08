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
  Modal,
} from 'react-native';
import {
  launchImageLibrary,
  launchCamera,
  ImagePickerResponse,
  MediaType,
} from 'react-native-image-picker';
import { MemeTemplate, TextElement, ImageElement } from '../types';
import { MEME_TEMPLATES } from '../constants/templates';
import { COLORS } from '../constants/colors';
import { baseStylePanelStyles } from '../styles/baseStylePanel';
import MemeCanvas, { MemeCanvasRef } from '../components/MemeCanvas';
import TemplateSelector from '../components/TemplateSelector';
import Dropdown, { DropdownItem } from '../components/Dropdown';
import TextStylePanel from '../components/TextStylePanel';
import ImageStylePanel from '../components/ImageStylePanel';

const MemeGeneratorScreen: React.FC = () => {
  // Start with the blank document template selected by default
  const [selectedTemplate, setSelectedTemplate] = useState<MemeTemplate | null>(
    MEME_TEMPLATES.find(template => template.id === 'blank_document') || null
  );
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [showTextStyleModal, setShowTextStyleModal] = useState(false);
  const [showImageStyleModal, setShowImageStyleModal] = useState(false);
  const [editingTextElement, setEditingTextElement] = useState<TextElement | null>(null);
  const [editingImageElement, setEditingImageElement] = useState<ImageElement | null>(null);

  // Local state for text style editing
  const [editingText, setEditingText] = useState('');
  const [editingFontSize, setEditingFontSize] = useState(20);
  const [editingFontFamily, setEditingFontFamily] = useState('System');
  const [editingColor, setEditingColor] = useState('#000000');

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

  // Handle text element settings
  const handleTextElementSettings = useCallback((element: TextElement) => {
    setEditingTextElement(element);
    setEditingText(element.text);
    setEditingFontSize(element.style.fontSize);
    setEditingFontFamily(element.style.fontFamily);
    setEditingColor(element.style.color);
    setShowTextStyleModal(true);
  }, []);

  // Handle image element settings
  const handleImageElementSettings = useCallback((element: ImageElement) => {
    setEditingImageElement(element);
    setShowImageStyleModal(true);
  }, []);

  // Handle text style save
  const handleTextStyleSave = useCallback(() => {
    if (editingTextElement && memeCanvasRef.current) {
      const updatedElement: Partial<TextElement> = {
        text: editingText,
        style: {
          ...editingTextElement.style,
          fontSize: editingFontSize,
          fontFamily: editingFontFamily,
          color: editingColor,
        },
      };

      memeCanvasRef.current.updateTextElement(editingTextElement.id, updatedElement);
      setShowTextStyleModal(false);
      setEditingTextElement(null);
    }
  }, [editingTextElement, editingText, editingFontSize, editingFontFamily, editingColor]);

  // Handle text style change
  const handleTextStyleChange = useCallback(
    (styleChanges: Partial<TextElement['style']>) => {
      if (editingTextElement && memeCanvasRef.current) {
        const updatedElement: Partial<TextElement> = {
          style: {
            ...editingTextElement.style,
            ...styleChanges,
          },
        };

        memeCanvasRef.current.updateTextElement(editingTextElement.id, updatedElement);
        setEditingTextElement(prev =>
          prev ? { ...prev, style: { ...prev.style, ...styleChanges } } : null
        );
      }
    },
    [editingTextElement]
  );

  // Handle text style modal close
  const handleTextStyleModalClose = useCallback(() => {
    setShowTextStyleModal(false);
    setEditingTextElement(null);
  }, []);

  // Handle image style change
  const handleImageStyleChange = useCallback(
    (styleChanges: Partial<ImageElement['style']>) => {
      if (editingImageElement && memeCanvasRef.current) {
        const updatedElement: Partial<ImageElement> = {
          style: {
            ...editingImageElement.style,
            ...styleChanges,
          },
        };

        memeCanvasRef.current.updateImageElement(editingImageElement.id, updatedElement);
        setEditingImageElement(prev =>
          prev ? { ...prev, style: { ...prev.style, ...styleChanges } } : null
        );
      }
    },
    [editingImageElement]
  );

  // Handle image style modal close
  const handleImageStyleModalClose = useCallback(() => {
    setShowImageStyleModal(false);
    setEditingImageElement(null);
  }, []);

  // Handle image style save
  const handleImageStyleSave = useCallback(() => {
    // Changes are already applied in real-time via handleImageStyleChange
    // Just close the modal
    setShowImageStyleModal(false);
    setEditingImageElement(null);
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
        onTextElementSettings={handleTextElementSettings}
        onImageElementSettings={handleImageElementSettings}
      />

      {/* Text Style Modal */}
      <Modal
        visible={showTextStyleModal}
        animationType="slide"
        transparent={true}
        onRequestClose={handleTextStyleModalClose}>
        <View style={baseStylePanelStyles.modalOverlay}>
          <View style={baseStylePanelStyles.modalContainer}>
            {editingTextElement && (
              <TextStylePanel
                textStyle={{
                  fontSize: editingFontSize,
                  fontFamily: editingFontFamily,
                  color: editingColor,
                  textAlign: editingTextElement.style.textAlign || 'center',
                  fontWeight: editingTextElement.style.fontWeight || 'normal',
                }}
                onStyleChange={styleChanges => {
                  // Update local state for fontSize, fontFamily, and color
                  if (styleChanges.fontSize !== undefined)
                    setEditingFontSize(styleChanges.fontSize);
                  if (styleChanges.fontFamily !== undefined)
                    setEditingFontFamily(styleChanges.fontFamily);
                  if (styleChanges.color !== undefined) setEditingColor(styleChanges.color);

                  // Immediately apply style changes to the canvas
                  handleTextStyleChange(styleChanges);
                }}
                onClose={handleTextStyleModalClose}
                onSave={handleTextStyleSave}
                isVisible={true}
              />
            )}
          </View>
        </View>
      </Modal>

      {/* Image Style Modal */}
      <Modal
        visible={showImageStyleModal}
        animationType="slide"
        transparent={true}
        onRequestClose={handleImageStyleModalClose}>
        <View style={baseStylePanelStyles.modalOverlay}>
          <View style={baseStylePanelStyles.modalContainer}>
            {editingImageElement && (
              <ImageStylePanel
                imageStyle={editingImageElement.style}
                onStyleChange={handleImageStyleChange}
                onClose={handleImageStyleModalClose}
                onSave={handleImageStyleSave}
                isVisible={true}
              />
            )}
          </View>
        </View>
      </Modal>

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
