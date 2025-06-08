import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Modal,
  SafeAreaView,
  FlatList,
  Dimensions,
} from 'react-native';
import { MemeTemplate } from '../../types';
import { COLORS } from '../../constants/colors';
import { DIMENSIONS } from '../../constants/dimensions';
import { styles } from './styles';

export interface TemplateSelectorProps {
  templates: MemeTemplate[];
  selectedTemplate: MemeTemplate | null;
  onTemplateSelect: (template: MemeTemplate) => void;
  onClose: () => void;
  isVisible: boolean;
  loading?: boolean;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  templates,
  selectedTemplate,
  onTemplateSelect,
  onClose,
  isVisible,
  loading = false,
}) => {
  const screenWidth = Dimensions.get('window').width;
  const numColumns = 2;
  const itemWidth = (screenWidth - DIMENSIONS.SPACING_48) / numColumns;

  const renderTemplate = ({ item: template }: { item: MemeTemplate }) => {
    const isSelected = selectedTemplate?.id === template.id;

    return (
      <TouchableOpacity
        style={[styles.templateItem, { width: itemWidth }]}
        onPress={() => onTemplateSelect(template)}
        activeOpacity={0.7}>
        <Image
          source={{ uri: template.thumbnailUrl || template.imageUrl }}
          style={[styles.templateImage, isSelected && styles.selectedTemplate]}
          resizeMode="cover"
        />
        <Text
          style={[styles.templateName, isSelected && styles.selectedTemplateName]}
          numberOfLines={2}>
          {template.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Select Meme Template</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.PRIMARY} />
            <Text style={styles.loadingText}>Loading templates...</Text>
          </View>
        ) : (
          <FlatList
            data={templates}
            renderItem={renderTemplate}
            keyExtractor={item => item.id}
            numColumns={numColumns}
            contentContainerStyle={styles.templateList}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={styles.row}
          />
        )}
      </SafeAreaView>
    </Modal>
  );
};

export default TemplateSelector;
