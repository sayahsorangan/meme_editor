/**
 * Meme Generator App
 * A feature-rich meme generator with template selection, text/image editing,
 * drag & drop functionality, and export capabilities.
 *
 * @format
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MemeGeneratorScreen from './src/screens/MemeGeneratorScreen';

const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <MemeGeneratorScreen />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
