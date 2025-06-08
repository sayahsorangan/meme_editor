import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ImageStyle } from '../../types';
import { COLORS } from '../../constants/colors';
import { styles } from './styles';
import IconButton from '../IconButton';
import Slider from '@react-native-community/slider';

export interface ImageStylePanelProps {
  imageStyle: ImageStyle;
  onStyleChange: (style: Partial<ImageStyle>) => void;
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
  '#8B4513',
  '#DC143C',
  '#228B22',
  '#FFD700',
];

const ImageStylePanel: React.FC<ImageStylePanelProps> = ({
  imageStyle,
  onStyleChange,
  onClose,
  isVisible,
}) => {
  if (!isVisible) {
    return null;
  }

  const handleOpacityChange = (opacity: number) => {
    onStyleChange({ opacity: Math.round(opacity * 100) / 100 });
  };

  const handleBorderRadiusChange = (borderRadius: number) => {
    onStyleChange({ borderRadius: Math.round(borderRadius) });
  };

  const handleBorderWidthChange = (borderWidth: number) => {
    onStyleChange({ borderWidth: Math.round(borderWidth) });
  };

  const handleBorderColorChange = (borderColor: string) => {
    onStyleChange({ borderColor });
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
              imageStyle.borderColor === color && styles.selectedColor,
            ]}
            onPress={() => handleBorderColorChange(color)}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Image Style</Text>
        <IconButton icon="✕" onPress={onClose} variant="transparent" size="small" />
      </View>

      {/* Opacity */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Opacity</Text>
        <View style={styles.row}>
          <Text style={styles.sliderValue}>0</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            value={imageStyle.opacity}
            onValueChange={handleOpacityChange}
            minimumTrackTintColor={COLORS.PRIMARY}
            maximumTrackTintColor={COLORS.GRAY_300}
            thumbTintColor={COLORS.PRIMARY}
          />
          <Text style={styles.sliderValue}>1</Text>
        </View>
        <Text style={styles.sliderValue}>Current: {Math.round(imageStyle.opacity * 100)}%</Text>
      </View>

      {/* Border Radius */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Border Radius</Text>
        <View style={styles.row}>
          <Text style={styles.sliderValue}>0</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={50}
            value={imageStyle.borderRadius || 0}
            onValueChange={handleBorderRadiusChange}
            minimumTrackTintColor={COLORS.PRIMARY}
            maximumTrackTintColor={COLORS.GRAY_300}
            thumbTintColor={COLORS.PRIMARY}
          />
          <Text style={styles.sliderValue}>50</Text>
        </View>
        <Text style={styles.sliderValue}>Current: {imageStyle.borderRadius || 0}px</Text>
      </View>

      {/* Border Width */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Border Width</Text>
        <View style={styles.row}>
          <Text style={styles.sliderValue}>0</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={10}
            value={imageStyle.borderWidth || 0}
            onValueChange={handleBorderWidthChange}
            minimumTrackTintColor={COLORS.PRIMARY}
            maximumTrackTintColor={COLORS.GRAY_300}
            thumbTintColor={COLORS.PRIMARY}
          />
          <Text style={styles.sliderValue}>10</Text>
        </View>
        <Text style={styles.sliderValue}>Current: {imageStyle.borderWidth || 0}px</Text>
      </View>

      {/* Border Color */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Border Color</Text>
        {renderColorPicker()}
      </View>
    </View>
  );
};

export default ImageStylePanel;
