import { Position, Size } from '../types';
import { DIMENSIONS } from '../constants/dimensions';

/**
 * Generate a unique ID for elements
 */
export const generateId = (): string => {
  const randomString = Math.random()
    .toString(DIMENSIONS.MATH_RADIX_36)
    .substr(2, DIMENSIONS.MATH_RADIX_9);
  return `${Date.now()}_${randomString}`;
};

/**
 * Calculate the snap position for element positioning
 * @param position Current position
 * @param canvasSize Canvas dimensions
 * @param elementSize Element dimensions
 * @returns Snapped position if within threshold, otherwise original position
 */
export const calculateSnapPosition = (
  position: Position,
  canvasSize: Size,
  elementSize: Size,
): Position => {
  const { SNAP_THRESHOLD } = DIMENSIONS;

  // Calculate center positions
  const centerX = canvasSize.width / 2 - elementSize.width / 2;
  const centerY = canvasSize.height / 2 - elementSize.height / 2;

  let snappedX = position.x;
  let snappedY = position.y;

  // Snap to horizontal center
  if (Math.abs(position.x - centerX) < SNAP_THRESHOLD) {
    snappedX = centerX;
  }

  // Snap to vertical center
  if (Math.abs(position.y - centerY) < SNAP_THRESHOLD) {
    snappedY = centerY;
  }

  // Snap to left edge
  if (Math.abs(position.x) < SNAP_THRESHOLD) {
    snappedX = 0;
  }

  // Snap to right edge
  if (Math.abs(position.x - (canvasSize.width - elementSize.width)) < SNAP_THRESHOLD) {
    snappedX = canvasSize.width - elementSize.width;
  }

  // Snap to top edge
  if (Math.abs(position.y) < SNAP_THRESHOLD) {
    snappedY = 0;
  }

  // Snap to bottom edge
  if (Math.abs(position.y - (canvasSize.height - elementSize.height)) < SNAP_THRESHOLD) {
    snappedY = canvasSize.height - elementSize.height;
  }

  return { x: snappedX, y: snappedY };
};

/**
 * Clamp a value between min and max
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

/**
 * Calculate the distance between two points
 */
export const calculateDistance = (point1: Position, point2: Position): number => {
  const dx = point2.x - point1.x;
  const dy = point2.y - point1.y;
  return Math.sqrt(dx * dx + dy * dy);
};

/**
 * Check if a point is inside a rectangle
 */
export const isPointInRectangle = (
  point: Position,
  rectPosition: Position,
  rectSize: Size,
): boolean => {
  return (
    point.x >= rectPosition.x &&
    point.x <= rectPosition.x + rectSize.width &&
    point.y >= rectPosition.y &&
    point.y <= rectPosition.y + rectSize.height
  );
};

/**
 * Convert hex color to rgba
 */
export const hexToRgba = (hex: string, alpha: number = 1): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    return hex;
  }

  const r = parseInt(result[1], DIMENSIONS.HEX_RADIX);
  const g = parseInt(result[2], DIMENSIONS.HEX_RADIX);
  const b = parseInt(result[DIMENSIONS.RGB_BLUE_INDEX], DIMENSIONS.HEX_RADIX);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

/**
 * Debounce function to limit the rate of function execution
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(null, args), wait);
  };
};
