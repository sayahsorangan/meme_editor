import React, { useState, useCallback, useRef, useMemo } from 'react';
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
import { DIMENSIONS } from '../constants/dimensions';
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
  const [editingFontSize, setEditingFontSize] = useState(DIMENSIONS.SPACING_20 as number);
  const [editingFontFamily, setEditingFontFamily] = useState<string | undefined>(undefined);
  const [editingColor, setEditingColor] = useState('#000000');
  const [editingFontWeight, setEditingFontWeight] = useState<
    'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'
  >('normal');
  const [editingTextAlign, setEditingTextAlign] = useState<'left' | 'center' | 'right'>('center');

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

  // Handle export functionality
  const handleExport = useCallback(() => {
    if (memeCanvasRef.current) {
      // TODO: Implement export functionality
      Alert.alert('Export', 'Export functionality will be implemented soon!');
    }
  }, []);

  // Image picker options
  const imagePickerOptions = useMemo(
    () => ({
      mediaType: 'photo' as MediaType,
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
      quality: DIMENSIONS.CANVAS_MEDIUM_SCALE,
    }),
    []
  );

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
        // Handle camera permission request error silently
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
          Platform.Version >= DIMENSIONS.SPACING_33
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
        // Handle storage permission request error silently
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
        'Storage permission is required to access your photos. ' +
          'Please enable it in your device settings.',
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
  }, [imagePickerOptions]);

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
  }, [imagePickerOptions]);

  // Handle dropdown item selection
  const handleDropdownSelect = useCallback(
    (item: DropdownItem) => {
      if (!memeCanvasRef.current) {
        return;
      }

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
          // Handle unknown dropdown item silently
          break;
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
    setEditingFontWeight(element.style.fontWeight);
    setEditingTextAlign(element.style.textAlign);
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
          fontWeight: editingFontWeight,
          textAlign: editingTextAlign,
        },
      };

      memeCanvasRef.current.updateTextElement(editingTextElement.id, updatedElement);
      setShowTextStyleModal(false);
      setEditingTextElement(null);
    }
  }, [
    editingTextElement,
    editingText,
    editingFontSize,
    editingFontFamily,
    editingColor,
    editingFontWeight,
    editingTextAlign,
  ]);

  // Handle text content change
  const handleTextContentChange = useCallback(
    (newText: string) => {
      setEditingText(newText);
      if (editingTextElement && memeCanvasRef.current) {
        const updatedElement: Partial<TextElement> = {
          text: newText,
        };
        memeCanvasRef.current.updateTextElement(editingTextElement.id, updatedElement);
        setEditingTextElement(prev => (prev ? { ...prev, text: newText } : null));
      }
    },
    [editingTextElement]
  );

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
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.WHITE} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={handleSelectTemplate} style={styles.templateButton}>
            <Text style={styles.templateButtonText}>Template</Text>
          </TouchableOpacity>
          <Dropdown items={dropdownItems} onSelect={handleDropdownSelect} buttonText="+" />
        </View>
        <TouchableOpacity onPress={handleExport} style={styles.exportButton}>
          <Text style={styles.exportButtonText}>Export</Text>
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
                  textAlign: editingTextAlign,
                  fontWeight: editingFontWeight,
                }}
                text={editingText}
                onTextChange={handleTextContentChange}
                onStyleChange={styleChanges => {
                  // Update local state for all style properties
                  if (styleChanges.fontSize !== undefined) {
                    setEditingFontSize(styleChanges.fontSize);
                  }
                  if (styleChanges.fontFamily !== undefined) {
                    setEditingFontFamily(styleChanges.fontFamily);
                  }
                  if (styleChanges.color !== undefined) {
                    setEditingColor(styleChanges.color);
                  }
                  if (styleChanges.fontWeight !== undefined) {
                    setEditingFontWeight(styleChanges.fontWeight);
                  }
                  if (styleChanges.textAlign !== undefined) {
                    setEditingTextAlign(styleChanges.textAlign);
                  }

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
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GRAY_200,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  templateButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: COLORS.GRAY_800,
    borderRadius: 6,
    marginRight: 8,
  },
  templateButtonText: {
    fontSize: 14,
    color: COLORS.WHITE,
    fontWeight: '500',
  },
  exportButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: COLORS.TRANSPARENT,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.GRAY_800,
  },
  exportButtonText: {
    fontSize: 14,
    color: COLORS.GRAY_800,
    fontWeight: '500',
  },
});

export default MemeGeneratorScreen;
