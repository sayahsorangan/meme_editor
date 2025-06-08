import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { View, Image, Dimensions, PanResponder } from 'react-native';
import {
  MemeTemplate,
  TextElement,
  ImageElement,
  Position,
  Size,
  CanvasState,
  Transform,
} from '../../types';
import { generateId } from '../../utils/helpers';
import { DIMENSIONS } from '../../constants/dimensions';
import { COLORS } from '../../constants/colors';
import { styles } from './styles';
import DraggableText from '../DraggableText';
import DraggableImage from '../DraggableImage';

export interface MemeCanvasProps {
  selectedTemplate: MemeTemplate | null;
  onAddText: () => void;
  onAddImage: () => void;
  onTextElementSettings?: (element: TextElement) => void;
  onImageElementSettings?: (element: ImageElement) => void;
}

export interface MemeCanvasRef {
  addTextElement: () => void;
  addImageElement: (imageUri?: string) => void;
  updateTextElement: (elementId: string, updates: Partial<TextElement>) => void;
  updateImageElement: (elementId: string, updates: Partial<ImageElement>) => void;
}

const MemeCanvas = forwardRef<MemeCanvasRef, MemeCanvasProps>(
  ({ selectedTemplate, onTextElementSettings, onImageElementSettings }, ref) => {
    // Initialize canvas with square dimensions when no template is selected
    const getInitialCanvasSize = () => {
      const screenWidth = Dimensions.get('window').width - DIMENSIONS.SPACING_LG * 2;
      const squareSize = Math.min(
        screenWidth - DIMENSIONS.SPACING_MD * DIMENSIONS.SPACING_MD,
        DIMENSIONS.ANIMATION_DURATION_300,
      );
      return { width: squareSize, height: squareSize };
    };

    const [canvasState, setCanvasState] = useState<CanvasState>({
      selectedTemplate: null,
      elements: [],
      canvasTransform: {
        scale: DIMENSIONS.CANVAS_DEFAULT_SCALE,
        translate: { x: 0, y: 0 },
      },
      selectedElementId: null,
      canvasSize: getInitialCanvasSize(),
    });

    const [snapLines, setSnapLines] = useState<{
      vertical: number | null;
      horizontal: number | null;
    }>({ vertical: null, horizontal: null });

    const canvasRef = useRef<View>(null);
    const lastTap = useRef<number>(0);
    const initialDistance = useRef<number>(0);
    const initialScale = useRef<number>(1);
    const [, setIsPanning] = useState(false);
    const [initialTransform, setInitialTransform] = useState({ x: 0, y: 0 });

    // Use refs for smoother transform updates during dragging
    const currentTransform = useRef<Transform>({
      scale: DIMENSIONS.CANVAS_DEFAULT_SCALE,
      translate: { x: 0, y: 0 },
    });

    // Update transform ref when canvas state changes
    useEffect(() => {
      currentTransform.current = { ...canvasState.canvasTransform };
    }, [canvasState.canvasTransform]);

    // Enhanced pan responder for canvas interaction
    const canvasPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: _evt => {
        // Only capture if there's no element being touched
        return true;
      },
      onMoveShouldSetPanResponder: (_evt, gestureState) => {
        // Only handle movement if no element is selected and we have some movement
        const isSignificantMovement =
          Math.abs(gestureState.dx) > DIMENSIONS.SPACING_5 ||
          Math.abs(gestureState.dy) > DIMENSIONS.SPACING_5;
        return isSignificantMovement;
      },

      onPanResponderGrant: _evt => {
        const now = Date.now();
        const DOUBLE_TAP_DELAY = 300;

        if (lastTap.current && now - lastTap.current < DOUBLE_TAP_DELAY) {
          // Double tap - reset zoom
          handleCanvasDoubleTap();
          lastTap.current = 0;
          return;
        } else {
          lastTap.current = now;
        }

        // Single tap - deselect elements
        setCanvasState(prev => ({
          ...prev,
          selectedElementId: null,
        }));
        setSnapLines({ vertical: null, horizontal: null });

        // Store initial transform for panning
        setInitialTransform({
          x: currentTransform.current.translate.x,
          y: currentTransform.current.translate.y,
        });
        setIsPanning(false);
        isDraggingRef.current = false;
      },

      onPanResponderMove: (evt, gestureState) => {
        // Handle multi-touch for pinch-to-zoom
        if (evt.nativeEvent.touches && evt.nativeEvent.touches.length === 2) {
          const touch1 = evt.nativeEvent.touches[0];
          const touch2 = evt.nativeEvent.touches[1];
          const distance = Math.sqrt(
            Math.pow(touch2.pageX - touch1.pageX, 2) + Math.pow(touch2.pageY - touch1.pageY, 2),
          );

          if (initialDistance.current === 0) {
            initialDistance.current = distance;
            initialScale.current = canvasState.canvasTransform.scale;
          } else {
            const scale = (distance / initialDistance.current) * initialScale.current;
            const clampedScale = Math.max(
              DIMENSIONS.CANVAS_MIN_SCALE,
              Math.min(DIMENSIONS.CANVAS_MAX_SCALE, scale),
            );

            // Update ref immediately for smooth visual feedback
            currentTransform.current.scale = clampedScale;

            // Throttled state update
            updateCanvasScale(clampedScale);
          }
        } else if (evt.nativeEvent.touches && evt.nativeEvent.touches.length === 1) {
          // Single finger - panning
          setIsPanning(true);
          isDraggingRef.current = true;

          const newTranslateX =
            initialTransform.x + gestureState.dx * DIMENSIONS.CANVAS_MEDIUM_SCALE;
          const newTranslateY =
            initialTransform.y + gestureState.dy * DIMENSIONS.CANVAS_MEDIUM_SCALE;

          // Apply translation with bounds checking
          const maxTranslate = DIMENSIONS.ANIMATION_DURATION_200;
          const clampedX = Math.max(-maxTranslate, Math.min(maxTranslate, newTranslateX));
          const clampedY = Math.max(-maxTranslate, Math.min(maxTranslate, newTranslateY));

          // Update ref immediately for smooth visual feedback
          currentTransform.current.translate = { x: clampedX, y: clampedY };

          // Throttled state update to reduce re-renders
          const now = Date.now();
          if (now - lastPanUpdate.current > DIMENSIONS.SPACING_LG) {
            // ~60fps
            setCanvasState(prev => ({
              ...prev,
              canvasTransform: {
                ...prev.canvasTransform,
                translate: { x: clampedX, y: clampedY },
              },
            }));
            lastPanUpdate.current = now;
          }
        }
      },

      onPanResponderRelease: () => {
        // Reset pinch gesture state
        initialDistance.current = 0;
        initialScale.current = 1;
        setIsPanning(false);

        // Final state update to ensure the transform is saved correctly
        if (currentTransform.current) {
          setCanvasState(prev => ({
            ...prev,
            canvasTransform: {
              scale: currentTransform.current.scale,
              translate: { ...currentTransform.current.translate },
            },
          }));
        }

        // Reset dragging flag after a short delay to allow state updates
        setTimeout(() => {
          isDraggingRef.current = false;
        }, DIMENSIONS.PERCENTAGE_100);
      },

      // Allow child elements to terminate our responder when they need to handle gestures
      onPanResponderTerminationRequest: _evt => {
        // Allow termination by child elements (draggable text/images)
        return true;
      },
      onShouldBlockNativeResponder: () => false,
    });

    // Update canvas state when template changes
    useEffect(() => {
      if (!selectedTemplate) {
        // Reset to square canvas when no template
        const initialSize = getInitialCanvasSize();
        setCanvasState(prev => ({
          ...prev,
          canvasSize: initialSize,
          elements: [], // Clear elements when template is removed
          selectedElementId: null,
        }));
      }
    }, [selectedTemplate]); // Use a ref to prevent saving during dragging operations
    const isDraggingRef = useRef(false);

    // Throttle refs for performance
    const lastScaleUpdate = useRef(0);
    const lastPanUpdate = useRef(0);

    // Update canvas scale with throttling
    const updateCanvasScale = useCallback((newScale: number) => {
      // Throttle scale updates to reduce re-renders
      const now = Date.now();
      if (now - lastScaleUpdate.current > DIMENSIONS.SPACING_LG) {
        // ~60fps
        setCanvasState(prev => ({
          ...prev,
          canvasTransform: {
            ...prev.canvasTransform,
            scale: newScale,
          },
        }));
        lastScaleUpdate.current = now;
      }
    }, []);

    // Handle canvas double tap for zoom reset
    const handleCanvasDoubleTap = useCallback(() => {
      setCanvasState(prev => ({
        ...prev,
        canvasTransform: {
          scale: DIMENSIONS.CANVAS_DEFAULT_SCALE,
          translate: { x: 0, y: 0 },
        },
      }));
    }, []);

    // Add new text element
    const handleAddText = useCallback(() => {
      const newTextElement: TextElement = {
        id: generateId(),
        type: 'text',
        text: 'Your text here',
        position: {
          x: canvasState.canvasSize.width / 2 - DIMENSIONS.SPACING_75, // Center horizontally
          y: canvasState.canvasSize.height / 2 - DIMENSIONS.SPACING_15, // Center vertically
        },
        size: { width: DIMENSIONS.SPACING_150, height: DIMENSIONS.SPACING_30 },
        rotation: 0,
        zIndex: canvasState.elements.length + 1,
        style: {
          fontSize: DIMENSIONS.DEFAULT_TEXT_SIZE,
          fontFamily: undefined, // Use system default
          color: COLORS.BLACK,
          fontWeight: 'bold',
          textAlign: 'center',
          backgroundColor: 'transparent',
        },
      };

      setCanvasState(prev => ({
        ...prev,
        elements: [...prev.elements, newTextElement],
        selectedElementId: newTextElement.id,
      }));
    }, [canvasState.canvasSize, canvasState.elements.length]);

    // Add new image element
    const handleAddImage = useCallback(
      (imageUri?: string) => {
        if (!imageUri) {
          // Handle missing image URI silently
          return;
        }

        // Get image dimensions to maintain aspect ratio
        Image.getSize(
          imageUri,
          (originalWidth, originalHeight) => {
            // Calculate appropriate size while maintaining aspect ratio
            const maxImageSize =
              Math.min(canvasState.canvasSize.width, canvasState.canvasSize.height) *
              DIMENSIONS.CANVAS_HIGH_SCALE;
            const aspectRatio = originalWidth / originalHeight;

            let imageWidth, imageHeight;

            if (aspectRatio > 1) {
              // Landscape image - fit to width
              imageWidth = Math.min(maxImageSize, originalWidth);
              imageHeight = imageWidth / aspectRatio;
            } else {
              // Portrait or square image - fit to height
              imageHeight = Math.min(maxImageSize, originalHeight);
              imageWidth = imageHeight * aspectRatio;
            }

            // Ensure minimum size for usability
            const minSize = 80;
            if (imageWidth < minSize) {
              imageWidth = minSize;
              imageHeight = minSize / aspectRatio;
            }
            if (imageHeight < minSize) {
              imageHeight = minSize;
              imageWidth = minSize * aspectRatio;
            }

            const newImageElement: ImageElement = {
              id: generateId(),
              type: 'image',
              imageUrl: imageUri,
              position: {
                x: canvasState.canvasSize.width / 2 - imageWidth / 2, // Center horizontally
                y: canvasState.canvasSize.height / 2 - imageHeight / 2, // Center vertically
              },
              size: { width: imageWidth, height: imageHeight },
              rotation: 0,
              zIndex: canvasState.elements.length + 1,
              style: {
                opacity: 1,
                borderRadius: 0,
                borderWidth: 0,
                borderColor: COLORS.BLACK,
              },
            };

            setCanvasState(prev => ({
              ...prev,
              elements: [...prev.elements, newImageElement],
              selectedElementId: newImageElement.id,
            }));
          },
          _error => {
            // Handle image size error silently
            // Fallback to fixed size if we can't get dimensions
            const fallbackSize = DIMENSIONS.SPACING_150;
            const newImageElement: ImageElement = {
              id: generateId(),
              type: 'image',
              imageUrl: imageUri,
              position: {
                x: canvasState.canvasSize.width / 2 - fallbackSize / 2,
                y: canvasState.canvasSize.height / 2 - fallbackSize / 2,
              },
              size: { width: fallbackSize, height: fallbackSize },
              rotation: 0,
              zIndex: canvasState.elements.length + 1,
              style: {
                opacity: 1,
                borderRadius: 0,
                borderWidth: 0,
                borderColor: COLORS.BLACK,
              },
            };

            setCanvasState(prev => ({
              ...prev,
              elements: [...prev.elements, newImageElement],
              selectedElementId: newImageElement.id,
            }));
          },
        );
      },
      [canvasState.canvasSize, canvasState.elements.length],
    );

    // Handle element position change with snapping and throttling
    const lastPositionUpdate = useRef(0);
    const handleElementPositionChange = useCallback((elementId: string, newPosition: Position) => {
      // Throttle position updates during dragging
      const now = Date.now();
      if (now - lastPositionUpdate.current > DIMENSIONS.SPACING_LG) {
        // ~60fps
        setCanvasState(prev => ({
          ...prev,
          elements: prev.elements.map(element =>
            element.id === elementId ? { ...element, position: newPosition } : element,
          ),
        }));
        lastPositionUpdate.current = now;
      }
    }, []);

    // Handle text content change
    const handleTextChange = useCallback((elementId: string, newText: string) => {
      setCanvasState(prev => ({
        ...prev,
        elements: prev.elements.map(element =>
          element.id === elementId && element.type === 'text'
            ? { ...element, text: newText }
            : element,
        ),
      }));
    }, []);

    // Handle element selection
    const handleElementSelect = useCallback((elementId: string) => {
      setCanvasState(prev => ({
        ...prev,
        selectedElementId: elementId,
      }));
    }, []);

    // Handle element deletion
    const handleElementDelete = useCallback((elementId: string) => {
      setCanvasState(prev => ({
        ...prev,
        elements: prev.elements.filter(element => element.id !== elementId),
        selectedElementId: prev.selectedElementId === elementId ? null : prev.selectedElementId,
      }));
    }, []);

    // Handle element duplication
    const handleElementDuplicate = useCallback(
      (elementId: string) => {
        const elementToDuplicate = canvasState.elements.find(el => el.id === elementId);
        if (!elementToDuplicate) {
          return;
        }

        const duplicatedElement = {
          ...elementToDuplicate,
          id: generateId(),
          position: {
            x: elementToDuplicate.position.x + DIMENSIONS.SPACING_20,
            y: elementToDuplicate.position.y + DIMENSIONS.SPACING_20,
          },
          zIndex: canvasState.elements.length + 1,
        };

        setCanvasState(prev => ({
          ...prev,
          elements: [...prev.elements, duplicatedElement],
          selectedElementId: duplicatedElement.id,
        }));
      },
      [canvasState.elements],
    );

    // Handle element rotation
    const handleElementRotate = useCallback((elementId: string, rotation: number) => {
      setCanvasState(prev => ({
        ...prev,
        elements: prev.elements.map(element =>
          element.id === elementId ? { ...element, rotation } : element,
        ),
      }));
    }, []);

    // Handle element size change
    const handleElementSizeChange = useCallback((elementId: string, newSize: Size) => {
      setCanvasState(prev => ({
        ...prev,
        elements: prev.elements.map(element =>
          element.id === elementId ? { ...element, size: newSize } : element,
        ),
      }));
    }, []);

    // Handle text element rotation (draggable rotation)
    const handleTextRotate = useCallback((elementId: string, rotation: number) => {
      setCanvasState(prev => ({
        ...prev,
        elements: prev.elements.map(element =>
          element.id === elementId && element.type === 'text' ? { ...element, rotation } : element,
        ),
      }));
    }, []);

    // Handle text element settings (placeholder for now)
    const handleTextSettings = useCallback(
      (elementId: string) => {
        const element = canvasState.elements.find(
          el => el.id === elementId && el.type === 'text',
        ) as TextElement;
        if (element && onTextElementSettings) {
          onTextElementSettings(element);
        }
      },
      [canvasState.elements, onTextElementSettings],
    );

    // Handle image element settings
    const handleImageSettings = useCallback(
      (element: ImageElement) => {
        if (onImageElementSettings) {
          onImageElementSettings(element);
        }
      },
      [onImageElementSettings],
    );

    // Handle text element height resize
    const handleTextResizeHeight = useCallback((elementId: string, newHeight: number) => {
      setCanvasState(prev => ({
        ...prev,
        elements: prev.elements.map(element =>
          element.id === elementId && element.type === 'text'
            ? {
                ...element,
                size: { ...element.size, height: Math.max(DIMENSIONS.SPACING_20, newHeight) },
              }
            : element,
        ),
      }));
    }, []);

    // Handle text element width resize
    const handleTextResizeWidth = useCallback((elementId: string, newWidth: number) => {
      setCanvasState(prev => ({
        ...prev,
        elements: prev.elements.map(element =>
          element.id === elementId && element.type === 'text'
            ? {
                ...element,
                size: { ...element.size, width: Math.max(DIMENSIONS.SPACING_50, newWidth) },
              }
            : element,
        ),
      }));
    }, []);

    // Handle text element update
    const handleUpdateTextElement = useCallback(
      (elementId: string, updates: Partial<TextElement>) => {
        setCanvasState(prev => ({
          ...prev,
          elements: prev.elements.map(element =>
            element.id === elementId && element.type === 'text'
              ? { ...element, ...updates }
              : element,
          ),
        }));
      },
      [],
    );

    // Handle image element update
    const handleUpdateImageElement = useCallback(
      (elementId: string, updates: Partial<ImageElement>) => {
        setCanvasState(prev => ({
          ...prev,
          elements: prev.elements.map(element =>
            element.id === elementId && element.type === 'image'
              ? { ...element, ...updates }
              : element,
          ),
        }));
      },
      [],
    );

    // Expose methods to parent component
    useImperativeHandle(
      ref,
      () => ({
        addTextElement: handleAddText,
        addImageElement: handleAddImage,
        updateTextElement: handleUpdateTextElement,
        updateImageElement: handleUpdateImageElement,
      }),
      [handleAddText, handleAddImage, handleUpdateTextElement, handleUpdateImageElement],
    );

    // Render snap lines
    const renderSnapLines = () => {
      return (
        <>
          {snapLines.vertical !== null && (
            <View
              style={[styles.snapLine, styles.verticalSnapLine, { left: snapLines.vertical }]}
            />
          )}
          {snapLines.horizontal !== null && (
            <View
              style={[styles.snapLine, styles.horizontalSnapLine, { top: snapLines.horizontal }]}
            />
          )}
        </>
      );
    };

    // Render canvas content
    const renderCanvasContent = () => {
      if (!selectedTemplate) {
        // This should rarely happen now since we start with blank template
        return null;
      }

      return (
        <>
          {/* Template image */}
          <Image
            source={{ uri: selectedTemplate.imageUrl }}
            style={[
              styles.templateImage,
              {
                width: canvasState.canvasSize.width,
                height: canvasState.canvasSize.height,
              },
            ]}
            resizeMode="cover"
            onLoad={event => {
              const { width, height } = event.nativeEvent.source;
              const screenWidth =
                Dimensions.get('window').width -
                DIMENSIONS.SPACING_LG * 2 -
                DIMENSIONS.SPACING_MD * DIMENSIONS.BORDER_DIVIDER;
              const maxHeight = Dimensions.get('window').height * DIMENSIONS.CANVAS_LOW_SCALE;

              // Calculate canvas size to match image aspect ratio
              const aspectRatio = width / height;
              let canvasWidth: number, canvasHeight: number;

              if (aspectRatio > 1) {
                // Landscape image - fit to width
                canvasWidth = Math.min(screenWidth, width);
                canvasHeight = canvasWidth / aspectRatio;

                // Check if height exceeds max height
                if (canvasHeight > maxHeight) {
                  canvasHeight = maxHeight;
                  canvasWidth = canvasHeight * aspectRatio;
                }
              } else {
                // Portrait or square image - fit to height first
                canvasHeight = Math.min(maxHeight, height);
                canvasWidth = canvasHeight * aspectRatio;

                // Check if width exceeds max width
                if (canvasWidth > screenWidth) {
                  canvasWidth = screenWidth;
                  canvasHeight = canvasWidth / aspectRatio;
                }
              }

              setCanvasState(prev => ({
                ...prev,
                canvasSize: { width: canvasWidth, height: canvasHeight },
              }));
            }}
          />

          {/* Draggable elements */}
          <View style={styles.elementsContainer}>
            {canvasState.elements.map(element => {
              if (element.type === 'text') {
                return (
                  <DraggableText
                    key={element.id}
                    element={element as TextElement}
                    isSelected={canvasState.selectedElementId === element.id}
                    canvasSize={canvasState.canvasSize}
                    onPositionChange={handleElementPositionChange}
                    onTextChange={handleTextChange}
                    onSelect={handleElementSelect}
                    onDelete={handleElementDelete}
                    onDuplicate={handleElementDuplicate}
                    onRotate={handleTextRotate}
                    onSettings={handleTextSettings}
                    onResizeHeight={handleTextResizeHeight}
                    onResizeWidth={handleTextResizeWidth}
                  />
                );
              } else if (element.type === 'image') {
                return (
                  <DraggableImage
                    key={element.id}
                    element={element as ImageElement}
                    isSelected={canvasState.selectedElementId === element.id}
                    canvasSize={canvasState.canvasSize}
                    onPositionChange={handleElementPositionChange}
                    onSelect={handleElementSelect}
                    onDelete={handleElementDelete}
                    onDuplicate={handleElementDuplicate}
                    onRotate={handleElementRotate}
                    onSizeChange={handleElementSizeChange}
                    onSettings={handleImageSettings}
                  />
                );
              }
              return null;
            })}
          </View>

          {/* Snap lines */}
          {renderSnapLines()}
        </>
      );
    };

    return (
      <View style={styles.container}>
        <View
          ref={canvasRef}
          style={[
            styles.canvasContainer,
            {
              width: canvasState.canvasSize.width,
              height: canvasState.canvasSize.height,
              transform: [
                { scale: canvasState.canvasTransform.scale },
                { translateX: canvasState.canvasTransform.translate.x },
                { translateY: canvasState.canvasTransform.translate.y },
              ],
            },
          ]}
          {...canvasPanResponder.panHandlers}
          onLayout={event => {
            const { width, height } = event.nativeEvent.layout;
            if (!selectedTemplate) {
              // Make canvas square when no template is selected
              const squareSize = Math.min(width, height);
              setCanvasState(prev => ({
                ...prev,
                canvasSize: { width: squareSize, height: squareSize },
              }));
            }
          }}>
          <View
            style={[
              styles.canvas,
              {
                width: canvasState.canvasSize.width,
                height: canvasState.canvasSize.height,
              },
            ]}>
            {renderCanvasContent()}
          </View>
        </View>
      </View>
    );
  },
);

MemeCanvas.displayName = 'MemeCanvas';

export default MemeCanvas;
