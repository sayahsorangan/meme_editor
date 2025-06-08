import { MemeTemplate } from '../types';

// Sample meme templates with placeholder images
// In a real app, these would be actual meme template images
export const MEME_TEMPLATES: MemeTemplate[] = [
  {
    id: 'blank_document',
    name: 'Blank Document',
    imageUrl:
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjZGRkZGRkIiBzdHJva2Utd2lkdGg9IjIiLz4KICA8dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjI0IiBmaWxsPSIjOTk5OTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+QmxhbmsgQ2FudmFzPC90ZXh0Pgo8L3N2Zz4K',
    thumbnailUrl:
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjZGRkZGRkIiBzdHJva2Utd2lkdGg9IjEiLz4KICA8dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEwIiBmaWxsPSIjOTk5OTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Qmxhbms8L3RleHQ+Cjwvc3ZnPgo=',
    aspectRatio: 1.0,
  },
  {
    id: 'drake_pointing',
    name: 'Drake Pointing',
    imageUrl: 'https://i.imgflip.com/30b1gx.jpg',
    thumbnailUrl: 'https://i.imgflip.com/30b1gx.jpg',
    aspectRatio: 1.0,
  },
  {
    id: 'distracted_boyfriend',
    name: 'Distracted Boyfriend',
    imageUrl: 'https://i.imgflip.com/1ur9b0.jpg',
    thumbnailUrl: 'https://i.imgflip.com/1ur9b0.jpg',
    aspectRatio: 1.33,
  },
  {
    id: 'expanding_brain',
    name: 'Expanding Brain',
    imageUrl: 'https://i.imgflip.com/1jwhww.jpg',
    thumbnailUrl: 'https://i.imgflip.com/1jwhww.jpg',
    aspectRatio: 0.75,
  },
  {
    id: 'woman_yelling_cat',
    name: 'Woman Yelling at Cat',
    imageUrl: 'https://i.imgflip.com/345v97.jpg',
    thumbnailUrl: 'https://i.imgflip.com/345v97.jpg',
    aspectRatio: 1.5,
  },
  {
    id: 'change_my_mind',
    name: 'Change My Mind',
    imageUrl: 'https://i.imgflip.com/24y43o.jpg',
    thumbnailUrl: 'https://i.imgflip.com/24y43o.jpg',
    aspectRatio: 1.33,
  },
  {
    id: 'two_buttons',
    name: 'Two Buttons',
    imageUrl: 'https://i.imgflip.com/1g8my4.jpg',
    thumbnailUrl: 'https://i.imgflip.com/1g8my4.jpg',
    aspectRatio: 1.0,
  },
  {
    id: 'mocking_spongebob',
    name: 'Mocking SpongeBob',
    imageUrl: 'https://i.imgflip.com/1otk96.jpg',
    thumbnailUrl: 'https://i.imgflip.com/1otk96.jpg',
    aspectRatio: 1.0,
  },
  {
    id: 'this_is_fine',
    name: 'This is Fine',
    imageUrl: 'https://i.imgflip.com/26am.jpg',
    thumbnailUrl: 'https://i.imgflip.com/26am.jpg',
    aspectRatio: 1.33,
  },
  {
    id: 'surprised_pikachu',
    name: 'Surprised Pikachu',
    imageUrl: 'https://i.imgflip.com/2kbn1e.jpg',
    thumbnailUrl: 'https://i.imgflip.com/2kbn1e.jpg',
    aspectRatio: 1.0,
  },
  {
    id: 'evil_kermit',
    name: 'Evil Kermit',
    imageUrl: 'https://i.imgflip.com/1e7ql7.jpg',
    thumbnailUrl: 'https://i.imgflip.com/1e7ql7.jpg',
    aspectRatio: 1.25,
  },
  {
    id: 'batman_slapping_robin',
    name: 'Batman Slapping Robin',
    imageUrl: 'https://i.imgflip.com/9ehk.jpg',
    thumbnailUrl: 'https://i.imgflip.com/9ehk.jpg',
    aspectRatio: 1.33,
  },
  {
    id: 'sleeping_shaq',
    name: 'Sleeping Shaq',
    imageUrl: 'https://i.imgflip.com/392xtu.jpg',
    thumbnailUrl: 'https://i.imgflip.com/392xtu.jpg',
    aspectRatio: 1.0,
  },
  {
    id: 'hide_the_pain_harold',
    name: 'Hide the Pain Harold',
    imageUrl: 'https://i.imgflip.com/gk5el.jpg',
    thumbnailUrl: 'https://i.imgflip.com/gk5el.jpg',
    aspectRatio: 1.0,
  },
  {
    id: 'one_does_not_simply',
    name: 'One Does Not Simply',
    imageUrl: 'https://i.imgflip.com/1bij.jpg',
    thumbnailUrl: 'https://i.imgflip.com/1bij.jpg',
    aspectRatio: 1.33,
  },
  {
    id: 'disaster_girl',
    name: 'Disaster Girl',
    imageUrl: 'https://i.imgflip.com/23ls.jpg',
    thumbnailUrl: 'https://i.imgflip.com/23ls.jpg',
    aspectRatio: 1.0,
  },
  {
    id: 'success_kid',
    name: 'Success Kid',
    imageUrl: 'https://i.imgflip.com/1bhk.jpg',
    thumbnailUrl: 'https://i.imgflip.com/1bhk.jpg',
    aspectRatio: 1.0,
  },
  {
    id: 'ancient_aliens',
    name: 'Ancient Aliens',
    imageUrl: 'https://i.imgflip.com/26hg.jpg',
    thumbnailUrl: 'https://i.imgflip.com/26hg.jpg',
    aspectRatio: 1.33,
  },
];
