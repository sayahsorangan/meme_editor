import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { View, Image, Dimensions } from 'react-native';
import {
  PinchGestureHandler,
  PanGestureHandler,
  TapGestureHandler,
  State,
  PinchGestureHandlerGestureEvent,
  PanGestureHandlerGestureEvent,
  TapGestureHandlerStateChangeEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
  withSpring,
} from 'react-native-reanimated';
import {
  MemeTemplate,
  TextElement,
  ImageElement,
  Position,
  Size,
  CanvasState,
} from '../../types';
import { generateId } from '../../utils/helpers';
import { DIMENSIONS } from '../../constants/dimensions';
import { COLORS } from '../../constants/colors';
import { styles } from './styles';
import DraggableText from '../DraggableText/DraggableTextWithGestureHandler';
import DraggableImage from '../DraggableImage/DraggableImageWithGestureHandler';

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

const MemeCanvasWithGestureHandler = forwardRef<MemeCanvasRef, MemeCanvasProps>(
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
        scale: 1,
        translate: { x: 0, y: 0 },
      },
      selectedElementId: null,
      canvasSize: getInitialCanvasSize(),
    });

    const [snapLines, setSnapLines] = useState<{
      vertical: number | null;
      horizontal: number | null;
    }>({ vertical: null, horizontal: null });

    // Reanimated shared values for smooth gestures
    const scale = useSharedValue(1);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const baseScale = useSharedValue(1);
    const baseTranslateX = useSharedValue(0);
    const baseTranslateY = useSharedValue(0);

    // Gesture handler refs
    const panRef = useRef<PanGestureHandler>(null);
    const pinchRef = useRef<PinchGestureHandler>(null);
    const tapRef = useRef<TapGestureHandler>(null);
    const doubleTapRef = useRef<TapGestureHandler>(null);

    // Update canvas state from shared values
    const updateCanvasState = useCallback(
      (newScale: number, newTranslateX: number, newTranslateY: number) => {
        const clampedScale = Math.max(
          DIMENSIONS.CANVAS_MIN_SCALE,
          Math.min(DIMENSIONS.CANVAS_MAX_SCALE, newScale),
        );
        const maxTranslate = 200;
        const clampedX = Math.max(-maxTranslate, Math.min(maxTranslate, newTranslateX));
        const clampedY = Math.max(-maxTranslate, Math.min(maxTranslate, newTranslateY));

        setCanvasState(prev => ({
          ...prev,
          canvasTransform: {
            scale: clampedScale,
            translate: { x: clampedX, y: clampedY },
          },
        }));
      },
      [],
    );

    // Pinch gesture handler
    const onPinchGestureEvent = useCallback(
      (event: PinchGestureHandlerGestureEvent) => {
        'worklet';
        // Don't handle pinch if an element is selected
        if (canvasState.selectedElementId) {
          return;
        }
        if (event.nativeEvent.state === State.ACTIVE) {
          const newScale = baseScale.value * event.nativeEvent.scale;
          scale.value = Math.max(
            DIMENSIONS.CANVAS_MIN_SCALE,
            Math.min(DIMENSIONS.CANVAS_MAX_SCALE, newScale),
          );
        }
      },
      [canvasState.selectedElementId, baseScale.value, scale],
    );

    const onPinchHandlerStateChange = useCallback(
      (event: PinchGestureHandlerGestureEvent) => {
        // Don't handle pinch if an element is selected
        if (canvasState.selectedElementId) {
          return;
        }
        if (event.nativeEvent.state === State.BEGAN) {
          baseScale.value = scale.value;
        } else if (event.nativeEvent.state === State.END) {
          baseScale.value = scale.value;
          runOnJS(updateCanvasState)(scale.value, translateX.value, translateY.value);
        }
      },
      [
        updateCanvasState,
        canvasState.selectedElementId,
        baseScale,
        scale.value,
        translateX.value,
        translateY.value,
      ],
    );

    // Pan gesture handler
    const onPanGestureEvent = useCallback(
      (event: PanGestureHandlerGestureEvent) => {
        'worklet';
        // Don't handle pan if an element is selected
        if (canvasState.selectedElementId) {
          return;
        }
        if (event.nativeEvent.state === State.ACTIVE) {
          const newTranslateX = baseTranslateX.value + event.nativeEvent.translationX;
          const newTranslateY = baseTranslateY.value + event.nativeEvent.translationY;

          const maxTranslate = 200;
          translateX.value = Math.max(
            -maxTranslate,
            Math.min(maxTranslate, newTranslateX),
          );
          translateY.value = Math.max(
            -maxTranslate,
            Math.min(maxTranslate, newTranslateY),
          );
        }
      },
      [
        canvasState.selectedElementId,
        baseTranslateX.value,
        baseTranslateY.value,
        translateX,
        translateY,
      ],
    );

    const onPanHandlerStateChange = useCallback(
      (event: PanGestureHandlerGestureEvent) => {
        // Don't handle pan if an element is selected
        if (canvasState.selectedElementId) {
          return;
        }
        if (event.nativeEvent.state === State.BEGAN) {
          baseTranslateX.value = translateX.value;
          baseTranslateY.value = translateY.value;
        } else if (event.nativeEvent.state === State.END) {
          baseTranslateX.value = translateX.value;
          baseTranslateY.value = translateY.value;
          runOnJS(updateCanvasState)(
            scale.value,
            translateX.value,
            translateY.value,
          );
        }
      },
      [
        updateCanvasState,
        canvasState.selectedElementId,
        baseTranslateX,
        baseTranslateY,
        scale.value,
        translateX.value,
        translateY.value,
      ],
    );

    // Single tap handler
    const tapHandler = useCallback((event: TapGestureHandlerStateChangeEvent) => {
      if (event.nativeEvent.state === State.ACTIVE) {
        // Deselect elements on canvas tap
        setCanvasState(prev => ({
          ...prev,
          selectedElementId: null,
        }));
        setSnapLines({ vertical: null, horizontal: null });
      }
    }, []);

    // Double tap handler - reset zoom
    const doubleTapHandler = useCallback(
      (event: TapGestureHandlerStateChangeEvent) => {
        if (event.nativeEvent.state === State.ACTIVE) {
          scale.value = withSpring(1);
          translateX.value = withSpring(0);
          translateY.value = withSpring(0);
          baseScale.value = 1;
          baseTranslateX.value = 0;
          baseTranslateY.value = 0;

          runOnJS(updateCanvasState)(1, 0, 0);
        }
      },
      [updateCanvasState, baseScale, baseTranslateX, baseTranslateY, scale, translateX, translateY],
    );

    // Animated style for canvas container
    const animatedStyle = useAnimatedStyle(() => ({
      transform: [
        { scale: scale.value },
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    }));

    // Update canvas state when template changes
    useEffect(() => {
      if (!selectedTemplate) {
        const initialSize = getInitialCanvasSize();
        setCanvasState(prev => ({
          ...prev,
          canvasSize: initialSize,
          elements: [],
          selectedElementId: null,
        }));
      }
    }, [selectedTemplate]);

    // Add new text element
    const handleAddText = useCallback(() => {
      const newTextElement: TextElement = {
        id: generateId(),
        type: 'text',
        text: 'Your text here',
        position: {
          x: canvasState.canvasSize.width / 2 - DIMENSIONS.SPACING_75,
          y: canvasState.canvasSize.height / 2 - DIMENSIONS.SPACING_15,
        },
        size: { width: 150, height: 30 },
        rotation: 0,
        zIndex: canvasState.elements.length + 1,
        style: {
          fontSize: 18,
          fontFamily: undefined,
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
        if (!imageUri) {return;}

        Image.getSize(
          imageUri,
          (originalWidth, originalHeight) => {
            const maxImageSize =
              Math.min(canvasState.canvasSize.width, canvasState.canvasSize.height) *
              DIMENSIONS.CANVAS_MEDIUM_SCALE;
            const aspectRatio = originalWidth / originalHeight;

            let imageWidth, imageHeight;
            if (aspectRatio > 1) {
              imageWidth = Math.min(maxImageSize, originalWidth);
              imageHeight = imageWidth / aspectRatio;
            } else {
              imageHeight = Math.min(maxImageSize, originalHeight);
              imageWidth = imageHeight * aspectRatio;
            }

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
                x: canvasState.canvasSize.width / 2 - imageWidth / 2,
                y: canvasState.canvasSize.height / 2 - imageHeight / 2,
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
          () => {
            // Fallback
            const fallbackSize = 150;
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

    // Element handlers
    const handleElementPositionChange = useCallback((elementId: string, newPosition: Position) => {
      setCanvasState(prev => ({
        ...prev,
        elements: prev.elements.map(element =>
          element.id === elementId ? { ...element, position: newPosition } : element,
        ),
      }));
    }, []);

    const handleElementSelect = useCallback((elementId: string) => {
      setCanvasState(prev => ({
        ...prev,
        selectedElementId: elementId,
      }));
    }, []);

    const handleElementDelete = useCallback((elementId: string) => {
      setCanvasState(prev => ({
        ...prev,
        elements: prev.elements.filter(element => element.id !== elementId),
        selectedElementId: prev.selectedElementId === elementId ? null : prev.selectedElementId,
      }));
    }, []);

    const handleElementDuplicate = useCallback(
      (elementId: string) => {
        const elementToDuplicate = canvasState.elements.find(el => el.id === elementId);
        if (!elementToDuplicate) {return;}

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

    const handleElementRotate = useCallback((elementId: string, rotation: number) => {
      setCanvasState(prev => ({
        ...prev,
        elements: prev.elements.map(element =>
          element.id === elementId ? { ...element, rotation } : element,
        ),
      }));
    }, []);

    const handleElementSizeChange = useCallback((elementId: string, newSize: Size) => {
      setCanvasState(prev => ({
        ...prev,
        elements: prev.elements.map(element =>
          element.id === elementId ? { ...element, size: newSize } : element,
        ),
      }));
    }, []);

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
    const renderSnapLines = () => (
      <>
        {snapLines.vertical !== null && (
          <View style={[styles.snapLine, styles.verticalSnapLine, { left: snapLines.vertical }]} />
        )}
        {snapLines.horizontal !== null && (
          <View
            style={[styles.snapLine, styles.horizontalSnapLine, { top: snapLines.horizontal }]}
          />
        )}
      </>
    );

    // Render canvas content
    const renderCanvasContent = () => {
      if (!selectedTemplate) {return null;}

      return (
        <>
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
                Dimensions.get('window').width - DIMENSIONS.SPACING_XXL - DIMENSIONS.SPACING_LG;
              const maxHeight = Dimensions.get('window').height * DIMENSIONS.CANVAS_LOW_SCALE;

              const aspectRatio = width / height;
              let canvasWidth: number, canvasHeight: number;

              if (aspectRatio > 1) {
                canvasWidth = Math.min(screenWidth, width);
                canvasHeight = canvasWidth / aspectRatio;
                if (canvasHeight > maxHeight) {
                  canvasHeight = maxHeight;
                  canvasWidth = canvasHeight * aspectRatio;
                }
              } else {
                canvasHeight = Math.min(maxHeight, height);
                canvasWidth = canvasHeight * aspectRatio;
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

          <View style={styles.elementsContainer}>
            {canvasState.elements.map(element => {
              if (element.type === 'text') {
                return (
                  <DraggableText
                    key={element.id}
                    element={element as TextElement}
                    isSelected={canvasState.selectedElementId === element.id}
                    canvasSize={canvasState.canvasSize}
                    canvasScale={canvasState.canvasTransform.scale}
                    onPositionChange={handleElementPositionChange}
                    onSelect={handleElementSelect}
                    onDelete={handleElementDelete}
                    onDuplicate={handleElementDuplicate}
                    onRotate={handleElementRotate}
                    onSettings={(id: string) => {
                      const textElement = canvasState.elements.find(
                        el => el.id === id && el.type === 'text',
                      ) as TextElement;
                      if (textElement && onTextElementSettings) {
                        onTextElementSettings(textElement);
                      }
                    }}
                    onResizeHeight={(id: string, height: number) => {
                      setCanvasState(prev => ({
                        ...prev,
                        elements: prev.elements.map(el =>
                          el.id === id && el.type === 'text'
                            ? {
                                ...el,
                                size: {
                                  ...el.size,
                                  height: Math.max(DIMENSIONS.SPACING_20, height),
                                },
                              }
                            : el,
                        ),
                      }));
                    }}
                    onResizeWidth={(id: string, width: number) => {
                      setCanvasState(prev => ({
                        ...prev,
                        elements: prev.elements.map(el =>
                          el.id === id && el.type === 'text'
                            ? {
                                ...el,
                                size: { ...el.size, width: Math.max(DIMENSIONS.SPACING_50, width) },
                              }
                            : el,
                        ),
                      }));
                    }}
                  />
                );
              } else if (element.type === 'image') {
                return (
                  <DraggableImage
                    key={element.id}
                    element={element as ImageElement}
                    isSelected={canvasState.selectedElementId === element.id}
                    canvasSize={canvasState.canvasSize}
                    canvasScale={canvasState.canvasTransform.scale}
                    onPositionChange={handleElementPositionChange}
                    onSelect={handleElementSelect}
                    onDelete={handleElementDelete}
                    onDuplicate={handleElementDuplicate}
                    onRotate={handleElementRotate}
                    onSizeChange={handleElementSizeChange}
                    onSettings={(imageEl: ImageElement) => {
                      if (onImageElementSettings) {
                        onImageElementSettings(imageEl);
                      }
                    }}
                  />
                );
              }
              return null;
            })}
          </View>

          {renderSnapLines()}
        </>
      );
    };

    // Dynamic canvas styles
    const canvasStyles = {
      width: canvasState.canvasSize.width,
      height: canvasState.canvasSize.height,
      backgroundColor: selectedTemplate ? COLORS.TRANSPARENT : COLORS.WHITE,
    };

    return (
      <View style={styles.container}>
        <TapGestureHandler
          ref={doubleTapRef}
          numberOfTaps={2}
          onHandlerStateChange={doubleTapHandler}>
          <TapGestureHandler
            ref={tapRef}
            numberOfTaps={1}
            onHandlerStateChange={tapHandler}
            waitFor={doubleTapRef}>
            <PanGestureHandler
              ref={panRef}
              onGestureEvent={onPanGestureEvent}
              onHandlerStateChange={onPanHandlerStateChange}
              simultaneousHandlers={[pinchRef]}
              minPointers={1}
              maxPointers={1}
              shouldCancelWhenOutside={false}>
              <PinchGestureHandler
                ref={pinchRef}
                onGestureEvent={onPinchGestureEvent}
                onHandlerStateChange={onPinchHandlerStateChange}
                simultaneousHandlers={[panRef]}>
                <Animated.View
                  style={[
                    styles.canvasContainer,
                    {
                      width: canvasState.canvasSize.width,
                      height: canvasState.canvasSize.height,
                    },
                    animatedStyle,
                  ]}>
                  <View style={[styles.canvas, canvasStyles]}>
                    {renderCanvasContent()}
                  </View>
                </Animated.View>
              </PinchGestureHandler>
            </PanGestureHandler>
          </TapGestureHandler>
        </TapGestureHandler>
      </View>
    );
  },
);

MemeCanvasWithGestureHandler.displayName = 'MemeCanvasWithGestureHandler';

export default MemeCanvasWithGestureHandler;
