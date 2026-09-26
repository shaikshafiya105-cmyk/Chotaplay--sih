/**
 * ChotaPlay - UKG & Class 1 Word Datasets
 * Level 1 (2-3 letters), Level 2 (4 letters), Level 3 (5+ letters)
 */
export const WORD_DATA = {
  level1: [
    { id: 'w1_cat', word: 'CAT', letters: ['C', 'A', 'T'], difficulty: 1, image: 'cat.webp', speech: 'Cat.', category: 'Animals', themeColor: '#FFBE0B' },
    { id: 'w1_dog', word: 'DOG', letters: ['D', 'O', 'G'], difficulty: 1, image: 'dog.webp', speech: 'Dog.', category: 'Animals', themeColor: '#FB5607' },
    { id: 'w1_sun', word: 'SUN', letters: ['S', 'U', 'N'], difficulty: 1, image: 'sun.webp', speech: 'Sun.', category: 'Nature', themeColor: '#FFD166' },
    { id: 'w1_hen', word: 'HEN', letters: ['H', 'E', 'N'], difficulty: 1, image: 'hen.webp', speech: 'Hen.', category: 'Birds', themeColor: '#E76F51' },
    { id: 'w1_jug', word: 'JUG', letters: ['J', 'U', 'G'], difficulty: 1, image: 'jug.webp', speech: 'Jug.', category: 'Objects', themeColor: '#2A9D8F' },
    { id: 'w1_van', word: 'VAN', letters: ['V', 'A', 'N'], difficulty: 1, image: 'van.webp', speech: 'Van.', category: 'Vehicles', themeColor: '#3D5A80' }
  ],
  level2: [
    { id: 'w2_fish', word: 'FISH', letters: ['F', 'I', 'S', 'H'], difficulty: 2, image: 'fish.webp', speech: 'Fish.', category: 'Animals', themeColor: '#06D6A0' },
    { id: 'w2_lion', word: 'LION', letters: ['L', 'I', 'O', 'N'], difficulty: 2, image: 'lion.webp', speech: 'Lion.', category: 'Animals', themeColor: '#F4A261' },
    { id: 'w2_kite', word: 'KITE', letters: ['K', 'I', 'T', 'E'], difficulty: 2, image: 'kite.webp', speech: 'Kite.', category: 'Toys', themeColor: '#E63946' },
    { id: 'w2_nest', word: 'NEST', letters: ['N', 'E', 'S', 'T'], difficulty: 2, image: 'nest.webp', speech: 'Nest.', category: 'Nature', themeColor: '#9C6644' },
    { id: 'w2_ball', word: 'BALL', letters: ['B', 'A', 'L', 'L'], difficulty: 2, image: 'ball.webp', speech: 'Ball.', category: 'Toys', themeColor: '#3A86FF' },
    { id: 'w2_yoyo', word: 'YOYO', letters: ['Y', 'O', 'Y', 'O'], difficulty: 2, image: 'yoyo.webp', speech: 'Yo-yo.', category: 'Toys', themeColor: '#00BBF9' }
  ],
  level3: [
    { id: 'w3_apple', word: 'APPLE', letters: ['A', 'P', 'P', 'L', 'E'], difficulty: 3, image: 'apple.webp', speech: 'Apple.', category: 'Fruits', themeColor: '#FF4D4D' },
    { id: 'w3_mango', word: 'MANGO', letters: ['M', 'A', 'N', 'G', 'O'], difficulty: 3, image: 'mango.webp', speech: 'Mango.', category: 'Fruits', themeColor: '#FFB703' },
    { id: 'w3_tiger', word: 'TIGER', letters: ['T', 'I', 'G', 'E', 'R'], difficulty: 3, image: 'tiger.webp', speech: 'Tiger.', category: 'Animals', themeColor: '#F77F00' },
    { id: 'w3_zebra', word: 'ZEBRA', letters: ['Z', 'E', 'B', 'R', 'A'], difficulty: 3, image: 'zebra.webp', speech: 'Zebra.', category: 'Animals', themeColor: '#2B2D42' },
    { id: 'w3_grapes', word: 'GRAPES', letters: ['G', 'R', 'A', 'P', 'E', 'S'], difficulty: 3, image: 'grapes.webp', speech: 'Grapes.', category: 'Fruits', themeColor: '#7209B7' },
    { id: 'w3_orange', word: 'ORANGE', letters: ['O', 'R', 'A', 'N', 'G', 'E'], difficulty: 3, image: 'orange.webp', speech: 'Orange.', category: 'Fruits', themeColor: '#FB8500' },
    { id: 'w3_parrot', word: 'PARROT', letters: ['P', 'A', 'R', 'R', 'O', 'T'], difficulty: 3, image: 'parrot.webp', speech: 'Parrot.', category: 'Birds', themeColor: '#52B788' },
    { id: 'w3_rabbit', word: 'RABBIT', letters: ['R', 'A', 'B', 'B', 'I', 'T'], difficulty: 3, image: 'rabbit.webp', speech: 'Rabbit.', category: 'Animals', themeColor: '#F72585' },
    { id: 'w3_quilt', word: 'QUILT', letters: ['Q', 'U', 'I', 'L', 'T'], difficulty: 3, image: 'quilt.webp', speech: 'Quilt.', category: 'Objects', themeColor: '#4361EE' },
    { id: 'w3_watch', word: 'WATCH', letters: ['W', 'A', 'T', 'C', 'H'], difficulty: 3, image: 'watch.webp', speech: 'Watch.', category: 'Objects', themeColor: '#9B5DE5' }
  ]
};

export const ALL_WORDS = [
  ...WORD_DATA.level1,
  ...WORD_DATA.level2,
  ...WORD_DATA.level3
];
