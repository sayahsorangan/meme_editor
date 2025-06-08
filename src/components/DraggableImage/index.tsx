import React, { useRef, useState, memo } from 'react';
import {
  View,
  Text,
  Image,
  PanResponder,
  TouchableOpacity,
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native';
import { ImageElement, Position, Size } from '../../types';
import { calculateSnapPosition } from '../../utils/helpers';
import { styles } from './styles';

export interface DraggableImageProps {
  element: ImageElement;
  isSelected: boolean;
  canvasSize: Size;
  onPositionChange: (id: string, position: Position) => void;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onRotate?: (id: string, rotation: number) => void;
  onSizeChange?: (id: string, size: Size) => void;
  onSettings?: (element: ImageElement) => void;
}

const DraggableImage: React.FC<DraggableImageProps> = ({
  element,
  isSelected,
  canvasSize,
  onPositionChange,
  onSelect,
  onDelete,
  onDuplicate,
  onRotate,
  onSizeChange,
  onSettings,
}) => {
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
  const [isRotating, setIsRotating] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const initialAngle = useRef(0);
  const initialSize = useRef<Size>({ width: 0, height: 0 });
  const initialAspectRatio = useRef(1);
  const dragStartPosition = useRef<Position>({ x: 0, y: 0 });
  const containerRef = useRef<View>(null);
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
        if (!onRotate) return;

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

  // Resize PanResponder for the resize handle
  const resizePanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,

      onPanResponderGrant: (evt: GestureResponderEvent) => {
        setIsResizing(true);
        onSelect(element.id);

        // Store initial size and aspect ratio
        initialSize.current = { ...element.size };
        initialAspectRatio.current = element.size.width / element.size.height;
      },

      onPanResponderMove: (evt: GestureResponderEvent, gestureState: PanResponderGestureState) => {
        if (!onSizeChange) return;

        // Calculate new size based on diagonal movement
        const deltaX = gestureState.dx;
        const deltaY = gestureState.dy;

        // Use the average of both dimensions for proportional scaling
        const scaleFactor = 1 + (deltaX + deltaY) / 200; // Adjust sensitivity

        let newWidth = initialSize.current.width * scaleFactor;
        let newHeight = initialSize.current.height * scaleFactor;

        // Maintain aspect ratio
        if (initialAspectRatio.current > 1) {
          // Landscape - adjust height based on width
          newHeight = newWidth / initialAspectRatio.current;
        } else {
          // Portrait or square - adjust width based on height
          newWidth = newHeight * initialAspectRatio.current;
        }

        // Apply minimum and maximum size constraints
        const minSize = 50;
        const maxSize = Math.min(canvasSize.width, canvasSize.height) * 0.8;

        newWidth = Math.max(minSize, Math.min(maxSize, newWidth));
        newHeight = Math.max(minSize, Math.min(maxSize, newHeight));

        // Ensure we maintain aspect ratio even after constraints
        if (newWidth / newHeight !== initialAspectRatio.current) {
          if (initialAspectRatio.current > 1) {
            newHeight = newWidth / initialAspectRatio.current;
          } else {
            newWidth = newHeight * initialAspectRatio.current;
          }
        }

        onSizeChange(element.id, { width: newWidth, height: newHeight });
      },

      onPanResponderRelease: () => {
        setIsResizing(false);
      },

      onPanResponderTerminationRequest: () => false,
      onShouldBlockNativeResponder: () => true,
    })
  ).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: evt => {
        // Don't capture if we're rotating or resizing
        if (isRotating || isResizing) return false;
        // Always try to capture touch events on image elements
        return true;
      },
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        // Don't move if we're rotating or resizing
        if (isRotating || isResizing) return false;
        // Only start dragging if movement is significant
        const isSignificantMovement =
          Math.abs(gestureState.dx) > 3 || Math.abs(gestureState.dy) > 3;
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

  const handleDuplicate = () => {
    onDuplicate(element.id);
  };

  const handleRotate = () => {
    if (onRotate) {
      const newRotation = (element.rotation + 45) % 360;
      onRotate(element.id, newRotation);
    }
  };

  const handleSettings = () => {
    if (onSettings) {
      onSettings(element);
    }
  };

  const getImageStyle = () => {
    return {
      ...styles.image,
      opacity: element.style.opacity,
      borderRadius: element.style.borderRadius,
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
      <Image
        source={{ uri: element.imageUrl }}
        style={getImageStyle()}
        resizeMode="contain"
        onError={error => {
          console.warn('Failed to load image:', error);
        }}
      />

      {/* Selection handles */}
      {isSelected && (
        <>
          {/* Delete button */}
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDelete}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Text style={styles.deleteIcon}>×</Text>
          </TouchableOpacity>

          {/* Rotate handle */}
          {onRotate && (
            <View
              {...rotationPanResponder.panHandlers}
              style={styles.rotateHandle}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Text style={styles.rotateIcon}>↻</Text>
            </View>
          )}

          {/* Resize handle */}
          {onSizeChange && (
            <View
              {...resizePanResponder.panHandlers}
              style={styles.resizeHandle}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Text style={styles.resizeIcon}>⤡</Text>
            </View>
          )}

          {/* Settings button */}
          {onSettings && (
            <TouchableOpacity
              style={styles.settingsButton}
              onPress={handleSettings}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Text style={styles.settingsIcon}>⚙</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
};

export default memo(DraggableImage);
