import React from 'react';
import { View, Text } from 'react-native';

import { ToolbarAction } from '../../types';
import { styles } from './styles';
import { IconButton } from '../IconButton';
import { Button } from '../Button';

export interface ToolbarProps {
  title?: string;
  leftActions?: ToolbarAction[];
  centerActions?: ToolbarAction[];
  rightActions?: ToolbarAction[];
  showTemplateSelector?: boolean;
  onToggleTemplateSelector?: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  title,
  leftActions = [],
  centerActions = [],
  rightActions = [],
  showTemplateSelector = false,
  onToggleTemplateSelector,
}) => {
  const renderAction = (action: ToolbarAction, index: number) => {
    // For simple text actions, use IconButton, for complex actions use Button
    if (action.icon.length === 1 || action.icon.includes('&')) {
      return (
        <IconButton
          key={`${action.id}_${index}`}
          icon={action.icon}
          onPress={action.action}
          disabled={action.disabled}
          style={styles.actionButton}
          variant="transparent"
        />
      );
    }

    return (
      <Button
        key={`${action.id}_${index}`}
        title={action.label}
        onPress={action.action}
        disabled={action.disabled}
        variant="outline"
        size="small"
        style={styles.actionButton}
      />
    );
  };

  return (
    <View style={styles.container}>
      {/* Left Section */}
      <View style={styles.leftSection}>
        {onToggleTemplateSelector && (
          <IconButton
            icon="🖼"
            onPress={onToggleTemplateSelector}
            variant={showTemplateSelector ? 'primary' : 'transparent'}
          />
        )}
        {title && <Text style={styles.title}>{title}</Text>}
        {leftActions.map(renderAction)}
      </View>

      {/* Center Section */}
      <View style={styles.centerSection}>{centerActions.map(renderAction)}</View>

      {/* Right Section */}
      <View style={styles.rightSection}>{rightActions.map(renderAction)}</View>
    </View>
  );
};

export default Toolbar;
