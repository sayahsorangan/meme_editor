import React, { useState, useCallback } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar, Text, TouchableOpacity } from 'react-native';
import { MemeTemplate } from '../../types';
import { MEME_TEMPLATES } from '../../constants/templates';
import { COLORS } from '../../constants/colors';
import MemeCanvas from '../MemeCanvas';
import TemplateSelector from './index';

const MemeGeneratorScreen: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<MemeTemplate | null>(null);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);

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
    // In a real app, this would capture the canvas and save/share the meme
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.GRAY_800} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meme generator</Text>
        <TouchableOpacity onPress={handleAdd} style={styles.templateSelectorButton}>
          <Text style={styles.templateSelectorText}>Select Template</Text>
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
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.WHITE,
  },
  templateSelectorButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: COLORS.GRAY_600,
    borderRadius: 16,
  },
  templateSelectorText: {
    fontSize: 14,
    color: COLORS.WHITE,
    fontWeight: '500',
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
    backgroundColor: COLORS.TRANSPARENT,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.WHITE,
  },
});

export default MemeGeneratorScreen;
