import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TextStyle } from '../../types';
import { COLORS } from '../../constants/colors';
import { DIMENSIONS } from '../../constants/dimensions';
import { styles } from './styles';
import IconButton from '../IconButton';
import Slider from '@react-native-community/slider';

export interface TextStylePanelProps {
  textStyle: TextStyle;
  onStyleChange: (style: Partial<TextStyle>) => void;
  onClose: () => void;
  isVisible: boolean;
}

const COLOR_OPTIONS = [
  COLORS.BLACK,
  COLORS.WHITE,
  COLORS.PRIMARY,
  COLORS.ERROR,
  COLORS.SUCCESS,
  COLORS.WARNING,
  '#FF6B6B',
  '#4ECDC4',
  '#45B7D1',
  '#96CEB4',
  '#FECA57',
  '#FF9FF3',
];

const FONT_FAMILIES = [
  { label: 'System', value: 'System' },
  { label: 'Arial', value: 'Arial' },
  { label: 'Helvetica', value: 'Helvetica' },
  { label: 'Times', value: 'Times New Roman' },
];

const TextStylePanel: React.FC<TextStylePanelProps> = ({
  textStyle,
  onStyleChange,
  onClose,
  isVisible,
}) => {
  if (!isVisible) {
    return null;
  }

  const handleFontSizeChange = (fontSize: number) => {
    onStyleChange({ fontSize: Math.round(fontSize) });
  };

  const handleColorChange = (color: string) => {
    onStyleChange({ color });
  };

  const handleFontFamilyChange = (fontFamily: string) => {
    onStyleChange({ fontFamily });
  };

  const handleTextAlignChange = (textAlign: 'left' | 'center' | 'right') => {
    onStyleChange({ textAlign });
  };

  const handleFontWeightToggle = () => {
    const newWeight = textStyle.fontWeight === 'bold' ? 'normal' : 'bold';
    onStyleChange({ fontWeight: newWeight });
  };

  const renderColorPicker = () => {
    return (
      <View style={styles.colorPicker}>
        {COLOR_OPTIONS.map(color => (
          <TouchableOpacity
            key={color}
            style={[
              styles.colorOption,
              { backgroundColor: color },
              textStyle.color === color && styles.selectedColor,
            ]}
            onPress={() => handleColorChange(color)}
          />
        ))}
      </View>
    );
  };

  const renderFontFamilyPicker = () => {
    return (
      <View style={styles.fontFamilyPicker}>
        {FONT_FAMILIES.map(font => (
          <TouchableOpacity
            key={font.value}
            style={[styles.fontOption, textStyle.fontFamily === font.value && styles.selectedFont]}
            onPress={() => handleFontFamilyChange(font.value)}>
            <Text
              style={[
                styles.fontText,
                { fontFamily: font.value },
                textStyle.fontFamily === font.value && styles.selectedFontText,
              ]}>
              {font.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderAlignmentButtons = () => {
    return (
      <View style={styles.alignmentButtons}>
        <IconButton
          icon="⬅"
          onPress={() => handleTextAlignChange('left')}
          variant={textStyle.textAlign === 'left' ? 'primary' : 'outline'}
          size="small"
        />
        <IconButton
          icon="↔"
          onPress={() => handleTextAlignChange('center')}
          variant={textStyle.textAlign === 'center' ? 'primary' : 'outline'}
          size="small"
        />
        <IconButton
          icon="➡"
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

      {/* Font Size */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Font Size</Text>
        <View style={styles.row}>
          <Text style={styles.sliderValue}>{DIMENSIONS.MIN_TEXT_SIZE}</Text>
          <Slider
            style={styles.slider}
            minimumValue={DIMENSIONS.MIN_TEXT_SIZE}
            maximumValue={DIMENSIONS.MAX_TEXT_SIZE}
            value={textStyle.fontSize}
            onValueChange={handleFontSizeChange}
            minimumTrackTintColor={COLORS.PRIMARY}
            maximumTrackTintColor={COLORS.GRAY_300}
            thumbTintColor={COLORS.PRIMARY}
          />
          <Text style={styles.sliderValue}>{DIMENSIONS.MAX_TEXT_SIZE}</Text>
        </View>
        <Text style={styles.sliderValue}>Current: {textStyle.fontSize}px</Text>
      </View>

      {/* Font Family */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Font Family</Text>
        {renderFontFamilyPicker()}
      </View>

      {/* Text Color */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Text Color</Text>
        {renderColorPicker()}
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
    </View>
  );
};

export default TextStylePanel;
