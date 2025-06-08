/**
 * Meme Generator App
 * A feature-rich meme generator with template selection, text/image editing,
 * drag & drop functionality, and export capabilities.
 *
 * @format
 */

import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MemeGeneratorScreen from './src/screens/MemeGeneratorScreen';

const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <MemeGeneratorScreen />
    </GestureHandlerRootView>
  );
};

export default App;
