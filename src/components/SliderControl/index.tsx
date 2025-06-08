import React from 'react';
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import { COLORS } from '../../constants';
import { baseStylePanelStyles } from '../../styles/baseStylePanel';

interface SliderControlProps {
  label: string;
  value: number;
  minimumValue: number;
  maximumValue: number;
  onValueChange: (value: number) => void;
  unit?: string;
  step?: number;
}

const SliderControl: React.FC<SliderControlProps> = ({
  label,
  value,
  minimumValue,
  maximumValue,
  onValueChange,
  unit = '',
  step = 1,
}) => {
  const formatValue = (val: number) => {
    if (unit === '%') {
      return `${Math.round(val * 100)}%`;
    }
    return `${Math.round(val)}${unit}`;
  };

  return (
    <View style={baseStylePanelStyles.section}>
      <Text style={baseStylePanelStyles.sectionTitle}>{label}</Text>
      <View style={baseStylePanelStyles.row}>
        <Text style={baseStylePanelStyles.sliderValue}>{minimumValue}</Text>
        <Slider
          style={baseStylePanelStyles.slider}
          minimumValue={minimumValue}
          maximumValue={maximumValue}
          value={value}
          onValueChange={onValueChange}
          step={step}
          minimumTrackTintColor={COLORS.PRIMARY}
          maximumTrackTintColor={COLORS.GRAY_300}
          thumbTintColor={COLORS.PRIMARY}
        />
        <Text style={baseStylePanelStyles.sliderValue}>{maximumValue}</Text>
      </View>
      <Text style={baseStylePanelStyles.currentValue}>Current: {formatValue(value)}</Text>
    </View>
  );
};

export default SliderControl;
