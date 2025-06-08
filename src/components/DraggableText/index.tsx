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
  onRotate: (id: string, rotation: number) => void;
  onSettings: (id: string) => void;
  onResizeHeight: (id: string, height: number) => void;
  onResizeWidth: (id: string, width: number) => void;
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
  onRotate,
  onSettings,
  onResizeHeight,
  onResizeWidth,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localText, setLocalText] = useState(element.text);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
  const [isRotating, setIsRotating] = useState(false);
  const dragStartPosition = useRef<Position>({ x: 0, y: 0 });
  const containerRef = useRef<View>(null);
  const initialAngle = useRef(0);
  const containerPosition = useRef<{ x: number; y: number; width: number; height: number }>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  // Calculate angle between center and touch point
  const calculateAngle = (
    centerX: number,
    centerY: number,
    touchX: number,
    touchY: number
  ): number => {
    const deltaX = touchX - centerX;
    const deltaY = touchY - centerY;
    return Math.atan2(deltaY, deltaX) * (180 / Math.PI);
  };

  // Rotation PanResponder for the rotate handle
  const rotationPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,

      onPanResponderGrant: (evt: GestureResponderEvent) => {
        setIsRotating(true);
        onSelect(element.id);

        // Measure the container to get its position on screen and store it
        if (containerRef.current) {
          containerRef.current.measure((x, y, width, height, pageX, pageY) => {
            containerPosition.current = { x: pageX, y: pageY, width, height };

            // Calculate the center of the element in screen coordinates
            const centerX = pageX + width / 2;
            const centerY = pageY + height / 2;

            // Calculate initial angle from center to touch point
            const touchAngle = calculateAngle(
              centerX,
              centerY,
              evt.nativeEvent.pageX,
              evt.nativeEvent.pageY
            );

            // Store the difference between current rotation and touch angle
            initialAngle.current = element.rotation - touchAngle;
          });
        }
      },

      onPanResponderMove: (evt: GestureResponderEvent) => {
        // Use stored container position instead of measuring every time
        const { x: pageX, y: pageY, width, height } = containerPosition.current;

        // Calculate the center of the element in screen coordinates
        const centerX = pageX + width / 2;
        const centerY = pageY + height / 2;

        // Calculate current touch angle from center
        const touchAngle = calculateAngle(
          centerX,
          centerY,
          evt.nativeEvent.pageX,
          evt.nativeEvent.pageY
        );

        // Calculate new rotation by adding the initial angle offset
        let newRotation = initialAngle.current + touchAngle;

        // Normalize to 0-360 degrees
        newRotation = ((newRotation % 360) + 360) % 360;

        onRotate(element.id, newRotation);
      },

      onPanResponderRelease: () => {
        setIsRotating(false);
      },

      onPanResponderTerminationRequest: () => false,
      onShouldBlockNativeResponder: () => true,
    })
  ).current;

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

  const handleSettings = () => {
    onSettings(element.id);
  };

  const handleResizeHeight = () => {
    // Increase height by 10px (you can adjust this logic)
    const newHeight = element.size.height + 10;
    onResizeHeight(element.id, newHeight);
  };

  const handleResizeWidth = () => {
    // Increase width by 10px (you can adjust this logic)
    const newWidth = element.size.width + 10;
    onResizeWidth(element.id, newWidth);
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
      ref={containerRef}
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
          {/* Remove button - Top Left */}
          <TouchableOpacity
            style={styles.removeButton}
            onPress={handleDelete}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Text style={styles.buttonIcon}>×</Text>
          </TouchableOpacity>

          {/* Rotate handle - Top Middle (draggable) */}
          <View
            {...rotationPanResponder.panHandlers}
            style={styles.rotateHandle}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Text style={styles.rotateIcon}>↻</Text>
          </View>

          {/* Settings button - Top Right */}
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={handleSettings}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Text style={styles.buttonIcon}>⚙</Text>
          </TouchableOpacity>

          {/* Resize Height button - Bottom Middle */}
          <TouchableOpacity
            style={styles.resizeHeightButton}
            onPress={handleResizeHeight}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Text style={styles.buttonIcon}>↕</Text>
          </TouchableOpacity>

          {/* Resize Width button - Right Middle */}
          <TouchableOpacity
            style={styles.resizeWidthButton}
            onPress={handleResizeWidth}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Text style={styles.buttonIcon}>↔</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default memo(DraggableText);
