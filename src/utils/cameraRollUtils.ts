import { CameraRoll, GroupTypes, AssetType } from '@react-native-camera-roll/camera-roll';
import { Platform, PermissionsAndroid } from 'react-native';

export interface SaveImageOptions {
  type?: 'photo' | 'video';
  album?: string;
}

export interface GetPhotosOptions {
  first: number;
  assetType?: AssetType;
  groupTypes?: GroupTypes;
  after?: string;
}

/**
 * Request permissions for camera roll access
 */
export const requestCameraRollPermissions = async (): Promise<boolean> => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Required',
          message: 'This app needs access to storage to save your memes',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      // Silent error handling - permission request failed
      return false;
    }
  }
  return true; // iOS handles permissions automatically
};

/**
 * Save an image to the device's camera roll
 */
export const saveImageToCameraRoll = async (
  imageUri: string,
  options?: SaveImageOptions
): Promise<boolean> => {
  try {
    const hasPermission = await requestCameraRollPermissions();
    if (!hasPermission) {
      throw new Error('Permission denied');
    }

    await CameraRoll.save(imageUri, {
      type: options?.type || 'photo',
      album: options?.album,
    });

    return true;
  } catch (error) {
    // Silent error handling - save failed
    return false;
  }
};

/**
 * Get photos from camera roll
 */
export const getPhotosFromCameraRoll = async (options: GetPhotosOptions) => {
  try {
    const hasPermission = await requestCameraRollPermissions();
    if (!hasPermission) {
      throw new Error('Permission denied');
    }

    const result = await CameraRoll.getPhotos({
      first: options.first,
      assetType: options.assetType || 'Photos',
      groupTypes: options.groupTypes,
      after: options.after,
    });

    return result;
  } catch (error) {
    // Silent error handling - re-throw for caller to handle
    throw error;
  }
};

/**
 * Save a meme to camera roll with proper error handling
 */
export const saveMemeToGallery = async (
  memeUri: string
): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const success = await saveImageToCameraRoll(memeUri, {
      type: 'photo',
      album: 'Memes', // Optional: create a specific album for memes
    });

    if (success) {
      return {
        success: true,
        message: 'Meme saved to gallery successfully!',
      };
    } else {
      return {
        success: false,
        message: 'Failed to save meme to gallery',
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};
