import React, { useState, useCallback, useRef, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar, Text, TouchableOpacity } from 'react-native';
import { MemeTemplate, ToolbarAction, CanvasState } from '../types';
import { MEME_TEMPLATES } from '../constants/templates';
import { COLORS } from '../constants/colors';
import MemeCanvas from '../components/MemeCanvas';
import Toolbar from '../components/Toolbar';
import TemplateSelector from '../components/TemplateSelector';
import Button from '../components/Button';

const MemeGeneratorScreen: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<MemeTemplate | null>(null);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);

  // Undo/Redo state management - simplified version
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  // Handle undo action
  const handleUndo = useCallback(() => {
    console.log('Undo action triggered');
    // For now, just log - actual implementation would require canvas state management
  }, []);

  // Handle redo action
  const handleRedo = useCallback(() => {
    console.log('Redo action triggered');
    // For now, just log - actual implementation would require canvas state management
  }, []);

  // Handle template selection
  const handleTemplateSelect = useCallback((template: MemeTemplate) => {
    setSelectedTemplate(template);
    setShowTemplateSelector(false);
  }, []);

  // Handle add text/image action (combined as "Tambah")
  const handleAdd = useCallback(() => {
    setShowTemplateSelector(true);
  }, []);

  // Handle save/export action
  const handleExport = useCallback(() => {
    console.log('Export action triggered');
    // In a real app, this would capture the canvas and save/share the meme
  }, []);

  // Handle done action
  const handleDone = useCallback(() => {
    console.log('Done action triggered');
    // In a real app, this might navigate back or finalize the meme
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.GRAY_800} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.leftButtons}>
          <TouchableOpacity
            onPress={handleUndo}
            style={[styles.undoRedoButton, !canUndo && styles.disabledButton]}
            disabled={!canUndo}>
            <Text style={[styles.undoRedoIcon, !canUndo && styles.disabledText]}>↶</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleRedo}
            style={[styles.undoRedoButton, !canRedo && styles.disabledButton]}
            disabled={!canRedo}>
            <Text style={[styles.undoRedoIcon, !canRedo && styles.disabledText]}>↷</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.headerTitle}>Meme generator</Text>
        <TouchableOpacity onPress={handleAdd} style={styles.selectTemplateButton}>
          <Text style={styles.selectTemplateText}>Select Template</Text>
        </TouchableOpacity>
      </View>

      {/* Main Canvas */}
      <MemeCanvas
        selectedTemplate={selectedTemplate}
        onAddText={handleAdd}
        onAddImage={handleAdd}
      />

      {/* Bottom Toolbar */}
      <View style={styles.bottomToolbar}>
        <TouchableOpacity
          onPress={handleAdd}
          style={[styles.bottomButton, { borderColor: COLORS.GRAY_600 }]}>
          <Text style={styles.bottomButtonText}>+ Tambah</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleExport}
          style={[
            styles.bottomButton,
            { borderColor: COLORS.PRIMARY, backgroundColor: COLORS.PRIMARY },
          ]}>
          <Text style={[styles.bottomButtonText, { color: COLORS.WHITE }]}>↓ Export</Text>
        </TouchableOpacity>
      </View>

      {/* Template Selector */}
      <TemplateSelector
        templates={MEME_TEMPLATES}
        selectedTemplate={selectedTemplate}
        onTemplateSelect={handleTemplateSelect}
        onClose={() => setShowTemplateSelector(false)}
        isVisible={showTemplateSelector}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.GRAY_200,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.GRAY_800,
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 56,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  undoRedoButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  disabledButton: {
    opacity: 0.3,
  },
  backIcon: {
    fontSize: 24,
    color: COLORS.WHITE,
  },
  undoRedoIcon: {
    fontSize: 20,
    color: COLORS.WHITE,
    fontWeight: 'bold',
  },
  disabledText: {
    color: COLORS.GRAY_400,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.WHITE,
  },
  doneButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: COLORS.GRAY_600,
    borderRadius: 16,
  },
  doneText: {
    fontSize: 14,
    color: COLORS.WHITE,
    fontWeight: '500',
  },
  gestureInfo: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.GRAY_200,
  },
  gestureText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.GRAY_800,
    textAlign: 'center',
  },
  bottomToolbar: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: COLORS.GRAY_800,
    gap: 12,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  bottomButton: {
    flex: 1,
    borderRadius: 8,
    minHeight: 44,
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
  bottomButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.WHITE,
  },
});

export default MemeGeneratorScreen;
