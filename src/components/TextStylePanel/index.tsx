import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { TextStyle } from '../../types';
import { FONT_FAMILIES } from '../../constants';
import { DIMENSIONS } from '../../constants/dimensions';
import { styles } from './styles';
import IconButton from '../IconButton';
import ColorPicker from '../ColorPicker';
import SliderControl from '../SliderControl';
import OptionPicker from '../OptionPicker';

export interface TextStylePanelProps {
  textStyle: TextStyle;
  text: string;
  onStyleChange: (style: Partial<TextStyle>) => void;
  onTextChange: (text: string) => void;
  onClose: () => void;
  onSave?: () => void;
  isVisible: boolean;
}

const TextStylePanel: React.FC<TextStylePanelProps> = ({
  textStyle,
  text,
  onStyleChange,
  onTextChange,
  onClose,
  onSave,
  isVisible,
}) => {
  if (!isVisible) {
    return null;
  }

  const handleTextChange = (newText: string) => {
    onTextChange(newText);
  };

  const handleFontSizeChange = (fontSize: number) => {
    onStyleChange({ fontSize: Math.round(fontSize) });
  };

  const handleColorChange = (color: string) => {
    onStyleChange({ color });
  };

  const handleFontFamilyChange = (fontFamily: string | undefined) => {
    onStyleChange({ fontFamily });
  };

  const handleTextAlignChange = (textAlign: 'left' | 'center' | 'right') => {
    onStyleChange({ textAlign });
  };

  const handleFontWeightToggle = () => {
    const newWeight = textStyle.fontWeight === 'bold' ? 'normal' : 'bold';
    onStyleChange({ fontWeight: newWeight });
  };

  const renderFontFamilyPicker = () => {
    return (
      <OptionPicker
        options={FONT_FAMILIES}
        selectedValue={textStyle.fontFamily}
        onValueChange={handleFontFamilyChange}
        renderOptionText={option => (
          <Text
            style={[
              styles.fontText,
              { fontFamily: option.value },
              textStyle.fontFamily === option.value && styles.selectedFontText,
            ]}>
            {option.label}
          </Text>
        )}
      />
    );
  };

  const renderAlignmentButtons = () => {
    return (
      <View style={styles.alignmentButtons}>
        <IconButton
          icon=" < "
          onPress={() => handleTextAlignChange('left')}
          variant={textStyle.textAlign === 'left' ? 'primary' : 'outline'}
          size="small"
        />
        <IconButton
          icon="<>"
          onPress={() => handleTextAlignChange('center')}
          variant={textStyle.textAlign === 'center' ? 'primary' : 'outline'}
          size="small"
        />
        <IconButton
          icon=" > "
          onPress={() => handleTextAlignChange('right')}
          variant={textStyle.textAlign === 'right' ? 'primary' : 'outline'}
          size="small"
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Text Style</Text>
        <IconButton icon="✕" onPress={onClose} variant="transparent" size="small" />
      </View>

      {/* Scrollable Content */}
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Text Content */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Text Content</Text>
          <TextInput
            style={styles.textInput}
            value={text}
            onChangeText={handleTextChange}
            placeholder="Enter your text here..."
            multiline
            textAlignVertical="top"
          />
        </View>

        {/* Font Size */}
        <SliderControl
          label="Font Size"
          value={textStyle.fontSize}
          minimumValue={DIMENSIONS.MIN_TEXT_SIZE}
          maximumValue={DIMENSIONS.MAX_TEXT_SIZE}
          onValueChange={handleFontSizeChange}
          unit="px"
        />

        {/* Font Family */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Font Family</Text>
          {renderFontFamilyPicker()}
        </View>

        {/* Text Color */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Text Color</Text>
          <ColorPicker selectedColor={textStyle.color} onColorChange={handleColorChange} />
        </View>

        {/* Text Alignment */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Text Alignment</Text>
          {renderAlignmentButtons()}
        </View>

        {/* Font Weight */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Font Weight</Text>
          <IconButton
            icon="B"
            onPress={handleFontWeightToggle}
            variant={textStyle.fontWeight === 'bold' ? 'primary' : 'outline'}
          />
        </View>

        {/* Save/Cancel Buttons */}
        {onSave && (
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={onSave}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default TextStylePanel;
