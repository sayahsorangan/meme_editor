import React, { useRef, useState, useEffect, memo } from 'react';
import {
  View,
  Text,
  TextInput,
  PanResponder,
  TouchableOpacity,
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native';
import { TextElement, Position, Size } from '../../types';
import { calculateSnapPosition } from '../../utils/helpers';
import { DIMENSIONS } from '../../constants/dimensions';
import { styles } from './styles';

export interface DraggableTextProps {
  element: TextElement;
  isSelected: boolean;
  canvasSize: Size;
  onPositionChange: (id: string, position: Position) => void;
  onTextChange: (id: string, text: string) => void;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
}

const DraggableText: React.FC<DraggableTextProps> = ({
  element,
  isSelected,
  canvasSize,
  onPositionChange,
  onTextChange,
  onSelect,
  onDelete,
  onDuplicate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localText, setLocalText] = useState(element.text);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
  const dragStartPosition = useRef<Position>({ x: 0, y: 0 });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: evt => {
        // Always try to capture touch events on text elements
        return true;
      },
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        // Only start dragging if we're not editing and movement is significant
        const isSignificantMovement =
          Math.abs(gestureState.dx) > 3 || Math.abs(gestureState.dy) > 3;
        return !isEditing && isSignificantMovement;
      },

      onPanResponderGrant: (evt: GestureResponderEvent) => {
        // Select this element when touched
        onSelect(element.id);

        // Store the starting position of the element
        dragStartPosition.current = { x: element.position.x, y: element.position.y };

        // Calculate the offset from touch point to element position
        const touchX = evt.nativeEvent.locationX || 0;
        const touchY = evt.nativeEvent.locationY || 0;
        setDragOffset({ x: touchX, y: touchY });
      },

      onPanResponderMove: (evt: GestureResponderEvent, gestureState: PanResponderGestureState) => {
        if (isEditing) return;

        // Calculate new position based on the initial position plus gesture movement
        const newPosition = {
          x: dragStartPosition.current.x + gestureState.dx,
          y: dragStartPosition.current.y + gestureState.dy,
        };

        // Apply snapping
        const snappedPosition = calculateSnapPosition(newPosition, canvasSize, element.size);

        onPositionChange(element.id, snappedPosition);
      },

      onPanResponderRelease: () => {
        setDragOffset({ x: 0, y: 0 });
        dragStartPosition.current = { x: 0, y: 0 };
      },

      // High priority to capture gestures over parent canvas
      onPanResponderTerminationRequest: () => false,
      onShouldBlockNativeResponder: () => true,
    })
  ).current;

  // Update local text when element text changes externally
  useEffect(() => {
    setLocalText(element.text);
  }, [element.text]);

  const handleTextSubmit = () => {
    setIsEditing(false);
    onTextChange(element.id, localText);
  };

  const handleDoublePress = () => {
    if (isSelected) {
      setIsEditing(true);
    }
  };

  const handleDelete = () => {
    onDelete(element.id);
  };

  const handleDuplicate = () => {
    onDuplicate(element.id);
  };

  const getTextStyle = () => {
    return {
      ...styles.textDisplay,
      fontSize: element.style.fontSize,
      fontFamily: element.style.fontFamily,
      color: element.style.color,
      fontWeight: element.style.fontWeight,
      textAlign: element.style.textAlign,
      backgroundColor: element.style.backgroundColor,
      borderColor: element.style.borderColor,
      borderWidth: element.style.borderWidth,
    };
  };

  return (
    <View
      {...panResponder.panHandlers}
      style={[
        styles.container,
        {
          left: element.position.x,
          top: element.position.y,
          width: element.size.width,
          height: element.size.height,
          zIndex: element.zIndex,
          transform: [{ rotate: `${element.rotation}deg` }],
        },
        isSelected && styles.selected,
      ]}>
      {isEditing ? (
        <TextInput
          style={[styles.textInput, getTextStyle()]}
          value={localText}
          onChangeText={setLocalText}
          onSubmitEditing={handleTextSubmit}
          onBlur={handleTextSubmit}
          multiline
          autoFocus
          selectTextOnFocus
        />
      ) : (
        <Text
          style={getTextStyle()}
          onPress={() => onSelect(element.id)}
          // Double tap to edit (simplified implementation)
          onLongPress={handleDoublePress}>
          {element.text || 'Double tap to edit'}
        </Text>
      )}

      {/* Selection handles */}
      {isSelected && !isEditing && (
        <>
          {/* Delete button */}
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDelete}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Text style={styles.deleteIcon}>×</Text>
          </TouchableOpacity>

          {/* Resize handle */}
          <View style={styles.resizeHandle}>
            <Text style={styles.resizeIcon}>⤡</Text>
          </View>
        </>
      )}
    </View>
  );
};

export default memo(DraggableText);
