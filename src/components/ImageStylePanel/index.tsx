import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

import { ImageStyle } from '../../types';
import { DIMENSIONS } from '../../constants/dimensions';
import { baseStylePanelStyles } from '../../styles/baseStylePanel';
import { IconButton } from '../IconButton';
import ColorPicker from '../ColorPicker';
import SliderControl from '../SliderControl';

export interface ImageStylePanelProps {
  imageStyle: ImageStyle;
  onStyleChange: (style: Partial<ImageStyle>) => void;
  onClose: () => void;
  onSave?: () => void;
  isVisible: boolean;
}

const ImageStylePanel: React.FC<ImageStylePanelProps> = ({
  imageStyle,
  onStyleChange,
  onClose,
  onSave,
  isVisible,
}) => {
  if (!isVisible) {
    return null;
  }

  const handleOpacityChange = (opacity: number) => {
    onStyleChange({
      opacity: Math.round(opacity * DIMENSIONS.PERCENTAGE_100) / DIMENSIONS.PERCENTAGE_100,
    });
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

  return (
    <View style={baseStylePanelStyles.container}>
      {/* Header */}
      <View style={baseStylePanelStyles.header}>
        <Text style={baseStylePanelStyles.title}>Image Style</Text>
        <IconButton icon="✕" onPress={onClose} variant="transparent" size="small" />
      </View>

      {/* Scrollable Content */}
      <ScrollView style={baseStylePanelStyles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Opacity */}
        <SliderControl
          label="Opacity"
          value={imageStyle.opacity}
          minimumValue={0}
          maximumValue={1}
          onValueChange={handleOpacityChange}
          unit="%"
          step={0.01}
        />

        {/* Border Radius */}
        <SliderControl
          label="Border Radius"
          value={imageStyle.borderRadius || 0}
          minimumValue={0}
          maximumValue={50}
          onValueChange={handleBorderRadiusChange}
          unit="px"
        />

        {/* Border Width */}
        <SliderControl
          label="Border Width"
          value={imageStyle.borderWidth || 0}
          minimumValue={0}
          maximumValue={10}
          onValueChange={handleBorderWidthChange}
          unit="px"
        />

        {/* Border Color */}
        <View style={baseStylePanelStyles.section}>
          <Text style={baseStylePanelStyles.sectionTitle}>Border Color</Text>
          <ColorPicker
            selectedColor={imageStyle.borderColor}
            onColorChange={handleBorderColorChange}
          />
        </View>

        {/* Save/Cancel Buttons */}
        {onSave && (
          <View style={baseStylePanelStyles.buttonRow}>
            <TouchableOpacity style={baseStylePanelStyles.cancelButton} onPress={onClose}>
              <Text style={baseStylePanelStyles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={baseStylePanelStyles.saveButton} onPress={onSave}>
              <Text style={baseStylePanelStyles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ImageStylePanel;
