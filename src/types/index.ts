// TypeScript types for the meme generator app

// Utility types for better type safety
export type RequiredKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type OptionalKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// Common prop types for components
export interface BaseComponentProps {
  testID?: string;
  style?: object;
}

export interface InteractiveComponentProps extends BaseComponentProps {
  disabled?: boolean;
  onPress?: () => void;
}

// Color and styling types
export type ColorValue = string;
export type FontWeight =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

export type TextAlign = 'left' | 'center' | 'right' | 'justify';

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface Transform {
  scale: number;
  translate: Position;
}

export interface MemeTemplate {
  id: string;
  name: string;
  imageUrl: string;
  thumbnailUrl?: string;
  aspectRatio: number;
}

export interface TextStyle {
  fontSize: number;
  fontFamily?: string;
  color: string;
  fontWeight:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
  textAlign: 'left' | 'center' | 'right';
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
}

export interface ImageStyle {
  opacity: number;
  borderRadius?: number;
  borderColor?: string;
  borderWidth?: number;
}

export interface MemeElement {
  id: string;
  type: 'text' | 'image';
  position: Position;
  size: Size;
  rotation: number;
  zIndex: number;
}

export interface TextElement extends MemeElement {
  type: 'text';
  text: string;
  style: TextStyle;
}

export interface ImageElement extends MemeElement {
  type: 'image';
  imageUrl: string;
  style: ImageStyle;
}

export interface CanvasState {
  selectedTemplate: MemeTemplate | null;
  elements: (TextElement | ImageElement)[];
  canvasTransform: Transform;
  selectedElementId: string | null;
  canvasSize: Size;
}

export interface GestureState {
  dx: number;
  dy: number;
  scale?: number;
  rotation?: number;
}

export interface PanResponderEvent {
  nativeEvent: {
    locationX: number;
    locationY: number;
    pageX: number;
    pageY: number;
  };
}

export interface PinchGestureEvent {
  nativeEvent: {
    scale: number;
    focalX: number;
    focalY: number;
  };
}

export type ElementType = 'text' | 'image';

export interface ToolbarAction {
  id: string;
  label: string;
  icon: string;
  action: () => void;
  disabled?: boolean;
}
