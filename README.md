# 🎭 Meme Generator - React Native

A feature-rich meme generator app built with React Native, featuring intuitive drag-and-drop functionality, customizable text and image editing, and a collection of popular meme templates.

## 📱 Download APK

**[Download Latest APK](https://drive.google.com/file/d/13_gh1mHVC1MvlJwlJGhGCFaqEPLZfPUn/view?usp=sharing)**

## ✨ Features

### 🖼️ Template System

- **Pre-built Templates**: Collection of popular meme templates including Drake Pointing, Distracted Boyfriend, Expanding Brain, Woman Yelling at Cat, and more
- **Blank Canvas**: Start from scratch with a blank document
- **Template Selector**: Easy-to-use template picker with thumbnails
- **Aspect Ratio Support**: Templates maintain proper proportions

### 📝 Text Editing

- **Add Multiple Text Elements**: Add unlimited text elements to your memes
- **Drag & Drop**: Intuitive gesture-based text positioning
- **Advanced Text Styling**:
  - Font size control
  - Font family selection
  - Text color picker (with preset colors)
  - Font weight options (normal, bold, 100-900)
  - Text alignment (left, center, right)
  - Background color support
  - Border customization
- **Real-time Editing**: Live preview of text changes
- **Text Content Editing**: Edit text content directly

### 🖼️ Image Management

- **Multiple Image Sources**:
  - Gallery/Photo Library integration
  - Camera capture
  - Custom image upload
- **Image Styling**:
  - Opacity control
  - Border radius adjustment
  - Border color and width
  - Drag and drop positioning
- **Gesture Controls**: Pinch, pan, and rotate images

### 🎨 Advanced Canvas Features

- **Gesture Handler Integration**: Smooth pinch-to-zoom and pan gestures
- **Multi-element Support**: Handle multiple text and image elements simultaneously
- **Z-index Management**: Layer control for overlapping elements
- **Canvas Transformation**: Zoom and pan the entire canvas
- **Element Selection**: Visual feedback for selected elements

### 🛠️ User Interface

- **Modern UI Design**: Clean and intuitive interface
- **Responsive Layout**: Optimized for different screen sizes
- **Dark Theme Support**: Professional dark theme
- **Modal Panels**: Dedicated style editing panels
- **Dropdown Menu**: Quick access to add functions
- **Touch-friendly Controls**: Large buttons and gesture areas

### 📤 Export & Sharing

- **High-Quality Export**: Export memes in high resolution
- **Gallery Integration**: Save directly to device gallery
- **Meme Album**: Organize exported memes in dedicated album
- **Permission Handling**: Automatic camera and storage permissions

### 🎯 Performance Features

- **React Native Reanimated**: Smooth 60fps animations
- **Gesture Handler**: Native gesture recognition
- **Image Optimization**: Efficient image handling and caching
- **Memory Management**: Optimized for mobile performance
- **TypeScript**: Full type safety and better development experience

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- React Native development environment
- Android Studio (for Android)
- Xcode (for iOS)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/meme-generator.git
cd meme-generator
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **iOS Setup** (iOS only)

```bash
cd ios
bundle install
bundle exec pod install
cd ..
```

4. **Start Metro server**

```bash
npm start
# or
yarn start
```

5. **Run the app**

For Android:

```bash
npm run android
# or
yarn android
```

For iOS:

```bash
npm run ios
# or
yarn ios
```

## 🏗️ Architecture

### Tech Stack

- **React Native**: Cross-platform mobile framework
- **TypeScript**: Type-safe JavaScript
- **React Native Gesture Handler**: Native gesture recognition
- **React Native Reanimated**: High-performance animations
- **React Native Image Picker**: Camera and gallery access
- **React Native Camera Roll**: Gallery save functionality
- **React Native FS**: File system operations

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button/         # Custom button component
│   ├── ColorPicker/    # Color selection component
│   ├── DraggableImage/ # Draggable image with gestures
│   ├── DraggableText/  # Draggable text with gestures
│   ├── Dropdown/       # Dropdown menu component
│   ├── IconButton/     # Icon button component
│   ├── MemeCanvas/     # Main canvas component
│   ├── SliderControl/  # Slider input component
│   ├── TemplateSelector/ # Template selection modal
│   ├── TextStylePanel/ # Text styling panel
│   └── ImageStylePanel/ # Image styling panel
├── constants/          # App constants
│   ├── colors.ts       # Color palette
│   ├── dimensions.ts   # Layout dimensions
│   ├── templates.ts    # Meme templates
│   └── typography.ts   # Font styles
├── screens/           # App screens
│   └── MemeGeneratorScreen.tsx
├── styles/           # Shared styles
├── types/           # TypeScript definitions
└── utils/          # Utility functions
```

## 🎨 Customization

### Adding New Templates

Add new meme templates in `src/constants/templates.ts`:

```typescript
{
  id: 'your_template_id',
  name: 'Your Template Name',
  imageUrl: 'https://example.com/template.jpg',
  thumbnailUrl: 'https://example.com/thumbnail.jpg',
  aspectRatio: 1.0, // width/height ratio
}
```

### Custom Color Schemes

Modify colors in `src/constants/colors.ts`:

```typescript
export const COLORS = {
  PRIMARY: '#your-primary-color',
  SECONDARY: '#your-secondary-color',
  // ... other colors
};
```

### Font Options

Add new fonts in `src/constants/styleOptions.ts`:

```typescript
export const FONT_FAMILIES = [
  'System',
  'Your-Custom-Font',
  // ... other fonts
];
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Popular meme templates from imgflip.com
- React Native community for excellent libraries
- Icons and design inspiration from modern mobile apps

## 📞 Support

For support, email your-email@example.com or create an issue in the repository.

---

**Made with ❤️ using React Native**
