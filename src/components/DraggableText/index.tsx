import React, { useRef, useState, memo } from 'react';
import {
  View,
  Text,
  PanResponder,
  TouchableOpacity,
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native';
import { TextElement, Position, Size } from '../../types';
import { calculateSnapPosition } from '../../utils/helpers';
import { styles } from './styles';
import { DIMENSIONS } from '../../constants/dimensions';

export interface DraggableTextProps {
  element: TextElement;
  isSelected: boolean;
  canvasSize: Size;
  onPositionChange: (id: string, position: Position) => void;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onDuplicate?: (id: string) => void;
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
  onSelect,
  onDelete,
  onDuplicate,
  onRotate,
  onSettings,
  onResizeHeight,
  onResizeWidth,
}) => {
  const [, setDragOffset] = useState<Position>({ x: 0, y: 0 });
  const [isRotating, setIsRotating] = useState(false);
  const [isResizingHeight, setIsResizingHeight] = useState(false);
  const [isResizingWidth, setIsResizingWidth] = useState(false);
  const dragStartPosition = useRef<Position>({ x: 0, y: 0 });
  const containerRef = useRef<View>(null);
  const initialAngle = useRef(0);
  const initialSize = useRef<Size>({ width: 0, height: 0 });
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
    return Math.atan2(deltaY, deltaX) * (DIMENSIONS.ANGLE_180 / Math.PI);
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
        newRotation =
          ((newRotation % DIMENSIONS.ANGLE_360) + DIMENSIONS.ANGLE_360) % DIMENSIONS.ANGLE_360;

        onRotate(element.id, newRotation);
      },

      onPanResponderRelease: () => {
        setIsRotating(false);
      },

      onPanResponderTerminationRequest: () => false,
      onShouldBlockNativeResponder: () => true,
    })
  ).current;

  // Height resize PanResponder
  const heightResizePanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,

      onPanResponderGrant: () => {
        setIsResizingHeight(true);
        onSelect(element.id);
        initialSize.current = { ...element.size };
      },

      onPanResponderMove: (evt: GestureResponderEvent, gestureState: PanResponderGestureState) => {
        // Calculate new height based on vertical movement
        const newHeight = Math.max(
          DIMENSIONS.SPACING_30,
          initialSize.current.height + gestureState.dy
        );
        onResizeHeight(element.id, newHeight);
      },

      onPanResponderRelease: () => {
        setIsResizingHeight(false);
      },

      onPanResponderTerminationRequest: () => false,
      onShouldBlockNativeResponder: () => true,
    })
  ).current;

  // Width resize PanResponder
  const widthResizePanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,

      onPanResponderGrant: () => {
        setIsResizingWidth(true);
        onSelect(element.id);
        initialSize.current = { ...element.size };
      },

      onPanResponderMove: (evt: GestureResponderEvent, gestureState: PanResponderGestureState) => {
        // Calculate new width based on horizontal movement
        const newWidth = Math.max(
          DIMENSIONS.SPACING_50,
          initialSize.current.width + gestureState.dx
        );
        onResizeWidth(element.id, newWidth);
      },

      onPanResponderRelease: () => {
        setIsResizingWidth(false);
      },

      onPanResponderTerminationRequest: () => false,
      onShouldBlockNativeResponder: () => true,
    })
  ).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: _evt => {
        // Don't capture if we're currently resizing or rotating
        if (isResizingHeight || isResizingWidth || isRotating) {
          return false;
        }
        // Always try to capture touch events on text elements
        return true;
      },
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        // Don't drag if we're currently resizing or rotating
        if (isResizingHeight || isResizingWidth || isRotating) {
          return false;
        }
        // Only start dragging if movement is significant
        const isSignificantMovement =
          Math.abs(gestureState.dx) > DIMENSIONS.SPACING_3 ||
          Math.abs(gestureState.dy) > DIMENSIONS.SPACING_3;
        return isSignificantMovement;
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

  const handleDelete = () => {
    onDelete(element.id);
  };

  const handleSettings = () => {
    onSettings(element.id);
  };

  const handleClone = () => {
    if (onDuplicate) {
      onDuplicate(element.id);
    }
  };

  const getTextStyle = () => {
    const baseStyle: Record<string, unknown> = {
      ...styles.textDisplay,
      fontSize: element.style.fontSize,
      color: element.style.color,
      fontWeight: element.style.fontWeight,
      textAlign: element.style.textAlign,
      backgroundColor: element.style.backgroundColor,
      borderColor: element.style.borderColor,
      borderWidth: element.style.borderWidth,
    };

    // Only add fontFamily if it's defined and not 'System'
    if (element.style.fontFamily && element.style.fontFamily !== 'System') {
      baseStyle.fontFamily = element.style.fontFamily;
    }

    return baseStyle;
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
      <Text style={getTextStyle()} onPress={() => onSelect(element.id)}>
        {element.text || 'Tap to select'}
      </Text>

      {/* Selection handles */}
      {isSelected && (
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

          {/* Resize Height button - Bottom Middle (draggable) */}
          <View
            {...heightResizePanResponder.panHandlers}
            style={styles.resizeHeightButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Text style={styles.buttonIcon}>↕</Text>
          </View>

          {/* Resize Width button - Right Middle (draggable) */}
          <View
            {...widthResizePanResponder.panHandlers}
            style={styles.resizeWidthButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Text style={styles.buttonIcon}>↔</Text>
          </View>

          {/* Clone button - Bottom Left */}
          {onDuplicate && (
            <TouchableOpacity
              style={styles.cloneButton}
              onPress={handleClone}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Text style={styles.cloneIcon}>C</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
};

export default memo(DraggableText);
