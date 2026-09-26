// ChotaPlay Full Curriculum Data Definition
// Source of truth: Master Blueprint & Supplied Classroom Assets

export type ClassType = 'lkg' | 'ukg' | '1st-class' | 'explore';
export type SectionType = 'little-stars' | 'bright-minds';

export interface ActivityItem {
  id: number;
  name: string;
  instruction: string;
  howToPlay: string[];
  wowMoment: string;
}

export interface TopicItem {
  classId: ClassType;
  className: string;
  sectionId?: SectionType;
  sectionName?: string;
  topicId: string;
  name: string;
  videoFile: string;
  videoUrl: string;
  thumbFile: string;
  thumbUrl: string;
  noteFile: string;
  noteUrl: string;
  hasGame: boolean;
  gameUrl?: string;
  activities: ActivityItem[];
}

export interface ClassInfo {
  id: ClassType;
  name: string;
  fullName: string;
  iconImage: string;
  color: string;
}

export interface SectionInfo {
  id: SectionType;
  name: string;
  subtitle: string;
  description: string;
  icon: string;
}

export const SECTIONS: SectionInfo[] = [
  {
    id: 'little-stars',
    name: 'Little Stars',
    subtitle: 'Foundation Exploration & Discovery',
    description: 'Foundational concepts, sensory adventures and early discovery.',
    icon: '/assets/Little%20stars%20%20picture.png'
  },
  {
    id: 'bright-minds',
    name: 'Bright Minds',
    subtitle: 'Advanced Concepts & Cognitive Skills',
    description: 'Higher-order thinking, expressive skills, and creative problem-solving.',
    icon: '/assets/Brightminds%20picture.png'
  }
];

export const CLASSES: ClassInfo[] = [
  {
    id: 'lkg',
    name: 'LKG',
    fullName: 'Lower Kindergarten',
    iconImage: '/assets/LKG%20ICON.jpeg',
    color: '#1E4FA3'
  },
  {
    id: 'ukg',
    name: 'UKG',
    fullName: 'Upper Kindergarten',
    iconImage: '/assets/UKG%20ICON.jpeg',
    color: '#1E4FA3'
  },
  {
    id: '1st-class',
    name: '1st Class',
    fullName: 'Class 1 / Grade 1',
    iconImage: '/assets/1ST%20Class%20ICON.jpeg',
    color: '#1E4FA3'
  },
  {
    id: 'explore',
    name: 'Explore',
    fullName: 'Free Play & Exploration',
    iconImage: '/assets/Explore%20icon.jpeg',
    color: '#1E4FA3'
  }
];

// Base topic definitions (5 topics per level)
const LKG_BASE_TOPICS: Omit<TopicItem, 'sectionId' | 'sectionName'>[] = [
  {
    classId: 'lkg',
    className: 'LKG',
    topicId: 'rainbow-world',
    name: 'Rainbow World',
    videoFile: 'Rain bow world.mp4',
    thumbFile: 'Rainbow World.png',
    noteFile: 'rainbow world.png',
    hasGame: true,
    gameUrl: '/games/rainbow-world/index.html',
    videoUrl: '/assets/videos/Rain%20bow%20world.mp4',
    thumbUrl: '/assets/topics/Rainbow%20World.png',
    noteUrl: '/assets/notes/rainbow%20world.png',
    activities: [
      {
        id: 1,
        name: 'Rainbow World Discovery Hunt',
        instruction: 'Engage with Rainbow World through classroom discovery.',
        howToPlay: [
          'Observe and discuss the concept with the teacher.',
          'Take turns identifying examples in the classroom.',
          'Share observations with friends.'
        ],
        wowMoment: 'Discover a brand-new connection and celebrate together!'
      },
      {
        id: 2,
        name: 'Rainbow World Active Challenge',
        instruction: 'Practice Rainbow World with a hands-on activity.',
        howToPlay: [
          'Follow teacher-guided movements.',
          'Match patterns or identify correct answers.',
          'Cheer for your classmates!'
        ],
        wowMoment: 'Master the concept with high energy!'
      },
      {
        id: 3,
        name: 'Rainbow World Creative Expression',
        instruction: 'Express your understanding of Rainbow World.',
        howToPlay: [
          'Draw, build, or demonstrate what you learned.',
          'Describe your creation to the class.',
          'Display your work with pride.'
        ],
        wowMoment: 'Create something wonderful and unique!'
      },
      {
        id: 4,
        name: 'Rainbow World Master Mission',
        instruction: 'Demonstrate your mastery of Rainbow World.',
        howToPlay: [
          'Work together as a class team.',
          'Solve the final challenge step by step.',
          'Earn your topic badge!'
        ],
        wowMoment: 'Receive cheers and high-fives for a completed mission!'
      }
    ]
  },
  {
    classId: 'lkg',
    className: 'LKG',
    topicId: 'number-adventure',
    name: 'Number Adventure',
    videoFile: 'Number Adventure.mp4',
    thumbFile: 'Number Adventure.png',
    noteFile: 'Number Adventure.png',
    hasGame: true,
    gameUrl: '/games/number-adventure/index.html',
    videoUrl: '/assets/videos/Number%20Adventure.mp4',
    thumbUrl: '/assets/topics/Number%20Adventure.png',
    noteUrl: '/assets/notes/Number%20Adventure.png',
    activities: [
      {
        id: 1,
        name: 'Number Adventure Discovery Hunt',
        instruction: 'Engage with Number Adventure through classroom discovery.',
        howToPlay: [
          'Observe and discuss the concept with the teacher.',
          'Take turns identifying examples in the classroom.',
          'Share observations with friends.'
        ],
        wowMoment: 'Discover a brand-new connection and celebrate together!'
      },
      {
        id: 2,
        name: 'Number Adventure Active Challenge',
        instruction: 'Practice Number Adventure with a hands-on activity.',
        howToPlay: [
          'Follow teacher-guided movements.',
          'Match patterns or identify correct answers.',
          'Cheer for your classmates!'
        ],
        wowMoment: 'Master the concept with high energy!'
      },
      {
        id: 3,
        name: 'Number Adventure Creative Expression',
        instruction: 'Express your understanding of Number Adventure.',
        howToPlay: [
          'Draw, build, or demonstrate what you learned.',
          'Describe your creation to the class.',
          'Display your work with pride.'
        ],
        wowMoment: 'Create something wonderful and unique!'
      },
      {
        id: 4,
        name: 'Number Adventure Master Mission',
        instruction: 'Demonstrate your mastery of Number Adventure.',
        howToPlay: [
          'Work together as a class team.',
          'Solve the final challenge step by step.',
          'Earn your topic badge!'
        ],
        wowMoment: 'Receive cheers and high-fives for a completed mission!'
      }
    ]
  },
  {
    classId: 'lkg',
    className: 'LKG',
    topicId: 'mystery-sense-world',
    name: 'Mystery Sense World',
    videoFile: 'Mystery Sense World.mp4',
    thumbFile: 'Mystery Sense World.png',
    noteFile: 'Mystery Sense World.png',
    hasGame: true,
    gameUrl: '/games/mystery-sense-world/index.html',
    videoUrl: '/assets/videos/Mystery%20Sense%20World.mp4',
    thumbUrl: '/assets/topics/Mystery%20Sense%20World.png',
    noteUrl: '/assets/notes/Mystery%20Sense%20World.png',
    activities: [
      {
        id: 1,
        name: 'Mystery Sense World Discovery Hunt',
        instruction: 'Engage with Mystery Sense World through classroom discovery.',
        howToPlay: [
          'Observe and discuss the concept with the teacher.',
          'Take turns identifying examples in the classroom.',
          'Share observations with friends.'
        ],
        wowMoment: 'Discover a brand-new connection and celebrate together!'
      },
      {
        id: 2,
        name: 'Mystery Sense World Active Challenge',
        instruction: 'Practice Mystery Sense World with a hands-on activity.',
        howToPlay: [
          'Follow teacher-guided movements.',
          'Match patterns or identify correct answers.',
          'Cheer for your classmates!'
        ],
        wowMoment: 'Master the concept with high energy!'
      },
      {
        id: 3,
        name: 'Mystery Sense World Creative Expression',
        instruction: 'Express your understanding of Mystery Sense World.',
        howToPlay: [
          'Draw, build, or demonstrate what you learned.',
          'Describe your creation to the class.',
          'Display your work with pride.'
        ],
        wowMoment: 'Create something wonderful and unique!'
      },
      {
        id: 4,
        name: 'Mystery Sense World Master Mission',
        instruction: 'Demonstrate your mastery of Mystery Sense World.',
        howToPlay: [
          'Work together as a class team.',
          'Solve the final challenge step by step.',
          'Earn your topic badge!'
        ],
        wowMoment: 'Receive cheers and high-fives for a completed mission!'
      }
    ]
  },
  {
    classId: 'lkg',
    className: 'LKG',
    topicId: 'magic-road-world',
    name: 'Magic Road World',
    videoFile: 'Magic Road World.mp4',
    thumbFile: 'Magic Road World.png',
    noteFile: 'Magic Road World.png',
    hasGame: true,
    gameUrl: '/games/magic-road-world/index.html',
    videoUrl: '/assets/videos/Magic%20Road%20World.mp4',
    thumbUrl: '/assets/topics/Magic%20Road%20World.png',
    noteUrl: '/assets/notes/Magic%20Road%20World.png',
    activities: [
      {
        id: 1,
        name: 'Magic Road World Discovery Hunt',
        instruction: 'Engage with Magic Road World through classroom discovery.',
        howToPlay: [
          'Observe and discuss the concept with the teacher.',
          'Take turns identifying examples in the classroom.',
          'Share observations with friends.'
        ],
        wowMoment: 'Discover a brand-new connection and celebrate together!'
      },
      {
        id: 2,
        name: 'Magic Road World Active Challenge',
        instruction: 'Practice Magic Road World with a hands-on activity.',
        howToPlay: [
          'Follow teacher-guided movements.',
          'Match patterns or identify correct answers.',
          'Cheer for your classmates!'
        ],
        wowMoment: 'Master the concept with high energy!'
      },
      {
        id: 3,
        name: 'Magic Road World Creative Expression',
        instruction: 'Express your understanding of Magic Road World.',
        howToPlay: [
          'Draw, build, or demonstrate what you learned.',
          'Describe your creation to the class.',
          'Display your work with pride.'
        ],
        wowMoment: 'Create something wonderful and unique!'
      },
      {
        id: 4,
        name: 'Magic Road World Master Mission',
        instruction: 'Demonstrate your mastery of Magic Road World.',
        howToPlay: [
          'Work together as a class team.',
          'Solve the final challenge step by step.',
          'Earn your topic badge!'
        ],
        wowMoment: 'Receive cheers and high-fives for a completed mission!'
      }
    ]
  },
  {
    classId: 'lkg',
    className: 'LKG',
    topicId: 'little-detective-world',
    name: 'Little Detective World',
    videoFile: 'Little Detective world.mp4',
    thumbFile: 'Little detective World.png',
    noteFile: 'Little Detective World.png',
    hasGame: true,
    gameUrl: '/games/little-detective-world/index.html',
    videoUrl: '/assets/videos/Little%20Detective%20world.mp4',
    thumbUrl: '/assets/topics/Little%20detective%20World.png',
    noteUrl: '/assets/notes/Little%20Detective%20World.png',
    activities: [
      {
        id: 1,
        name: 'Little Detective World Discovery Hunt',
        instruction: 'Engage with Little Detective World through classroom discovery.',
        howToPlay: [
          'Observe and discuss the concept with the teacher.',
          'Take turns identifying examples in the classroom.',
          'Share observations with friends.'
        ],
        wowMoment: 'Discover a brand-new connection and celebrate together!'
      },
      {
        id: 2,
        name: 'Little Detective World Active Challenge',
        instruction: 'Practice Little Detective World with a hands-on activity.',
        howToPlay: [
          'Follow teacher-guided movements.',
          'Match patterns or identify correct answers.',
          'Cheer for your classmates!'
        ],
        wowMoment: 'Master the concept with high energy!'
      },
      {
        id: 3,
        name: 'Little Detective World Creative Expression',
        instruction: 'Express your understanding of Little Detective World.',
        howToPlay: [
          'Draw, build, or demonstrate what you learned.',
          'Describe your creation to the class.',
          'Display your work with pride.'
        ],
        wowMoment: 'Create something wonderful and unique!'
      },
      {
        id: 4,
        name: 'Little Detective World Master Mission',
        instruction: 'Demonstrate your mastery of Little Detective World.',
        howToPlay: [
          'Work together as a class team.',
          'Solve the final challenge step by step.',
          'Earn your topic badge!'
        ],
        wowMoment: 'Receive cheers and high-fives for a completed mission!'
      }
    ]
  }
];

const UKG_BASE_TOPICS: Omit<TopicItem, 'sectionId' | 'sectionName'>[] = [
  {
    classId: 'ukg',
    className: 'UKG',
    topicId: 'alphabets-treasure-world',
    name: 'Alphabets Treasure World',
    videoFile: 'Alphabets Treasure World.mp4',
    thumbFile: 'Alphabets Treasure World.png',
    noteFile: 'Alphabet Treasure World.png',
    hasGame: true,
    gameUrl: '/games/alphabets-treasure-world/index.html',
    videoUrl: '/assets/videos/Alphabets%20Treasure%20World.mp4',
    thumbUrl: '/assets/topics/Alphabets%20Treasure%20World.png',
    noteUrl: '/assets/notes/Alphabet%20Treasure%20World.png',
    activities: [
      {
        id: 1,
        name: 'Alphabets Treasure World Discovery Hunt',
        instruction: 'Engage with Alphabets Treasure World through classroom discovery.',
        howToPlay: [
          'Observe and discuss the concept with the teacher.',
          'Take turns identifying examples in the classroom.',
          'Share observations with friends.'
        ],
        wowMoment: 'Discover a brand-new connection and celebrate together!'
      },
      {
        id: 2,
        name: 'Alphabets Treasure World Active Challenge',
        instruction: 'Practice Alphabets Treasure World with a hands-on activity.',
        howToPlay: [
          'Follow teacher-guided movements.',
          'Match patterns or identify correct answers.',
          'Cheer for your classmates!'
        ],
        wowMoment: 'Master the concept with high energy!'
      },
      {
        id: 3,
        name: 'Alphabets Treasure World Creative Expression',
        instruction: 'Express your understanding of Alphabets Treasure World.',
        howToPlay: [
          'Draw, build, or demonstrate what you learned.',
          'Describe your creation to the class.',
          'Display your work with pride.'
        ],
        wowMoment: 'Create something wonderful and unique!'
      },
      {
        id: 4,
        name: 'Alphabets Treasure World Master Mission',
        instruction: 'Demonstrate your mastery of Alphabets Treasure World.',
        howToPlay: [
          'Work together as a class team.',
          'Solve the final challenge step by step.',
          'Earn your topic badge!'
        ],
        wowMoment: 'Receive cheers and high-fives for a completed mission!'
      }
    ]
  },
  {
    classId: 'ukg',
    className: 'UKG',
    topicId: 'number-treasure-quest',
    name: 'Number Treasure Quest',
    videoFile: 'Number Treasure Quest.mp4',
    thumbFile: 'Number Treasure Quest.png',
    noteFile: 'Number Treasure Quest.png',
    hasGame: true,
    gameUrl: '/games/number-treasure-quest/index.html',
    videoUrl: '/assets/videos/Number%20Treasure%20Quest.mp4',
    thumbUrl: '/assets/topics/Number%20Treasure%20Quest.png',
    noteUrl: '/assets/notes/Number%20Treasure%20Quest.png',
    activities: [
      {
        id: 1,
        name: 'Number Treasure Quest Discovery Hunt',
        instruction: 'Engage with Number Treasure Quest through classroom discovery.',
        howToPlay: [
          'Observe and discuss the concept with the teacher.',
          'Take turns identifying examples in the classroom.',
          'Share observations with friends.'
        ],
        wowMoment: 'Discover a brand-new connection and celebrate together!'
      },
      {
        id: 2,
        name: 'Number Treasure Quest Active Challenge',
        instruction: 'Practice Number Treasure Quest with a hands-on activity.',
        howToPlay: [
          'Follow teacher-guided movements.',
          'Match patterns or identify correct answers.',
          'Cheer for your classmates!'
        ],
        wowMoment: 'Master the concept with high energy!'
      },
      {
        id: 3,
        name: 'Number Treasure Quest Creative Expression',
        instruction: 'Express your understanding of Number Treasure Quest.',
        howToPlay: [
          'Draw, build, or demonstrate what you learned.',
          'Describe your creation to the class.',
          'Display your work with pride.'
        ],
        wowMoment: 'Create something wonderful and unique!'
      },
      {
        id: 4,
        name: 'Number Treasure Quest Master Mission',
        instruction: 'Demonstrate your mastery of Number Treasure Quest.',
        howToPlay: [
          'Work together as a class team.',
          'Solve the final challenge step by step.',
          'Earn your topic badge!'
        ],
        wowMoment: 'Receive cheers and high-fives for a completed mission!'
      }
    ]
  },
  {
    classId: 'ukg',
    className: 'UKG',
    topicId: 'rainbow-factory',
    name: 'Rainbow Factory',
    videoFile: 'Rainbow Factory.mp4',
    thumbFile: 'Rainbow Factory.png',
    noteFile: 'Rainbow Factory.png',
    hasGame: true,
    gameUrl: '/games/rainbow-factory/index.html',
    videoUrl: '/assets/videos/Rainbow%20Factory.mp4',
    thumbUrl: '/assets/topics/Rainbow%20Factory.png',
    noteUrl: '/assets/notes/Rainbow%20Factory.png',
    activities: [
      {
        id: 1,
        name: 'Rainbow Factory Discovery Hunt',
        instruction: 'Engage with Rainbow Factory through classroom discovery.',
        howToPlay: [
          'Observe and discuss the concept with the teacher.',
          'Take turns identifying examples in the classroom.',
          'Share observations with friends.'
        ],
        wowMoment: 'Discover a brand-new connection and celebrate together!'
      },
      {
        id: 2,
        name: 'Rainbow Factory Active Challenge',
        instruction: 'Practice Rainbow Factory with a hands-on activity.',
        howToPlay: [
          'Follow teacher-guided movements.',
          'Match patterns or identify correct answers.',
          'Cheer for your classmates!'
        ],
        wowMoment: 'Master the concept with high energy!'
      },
      {
        id: 3,
        name: 'Rainbow Factory Creative Expression',
        instruction: 'Express your understanding of Rainbow Factory.',
        howToPlay: [
          'Draw, build, or demonstrate what you learned.',
          'Describe your creation to the class.',
          'Display your work with pride.'
        ],
        wowMoment: 'Create something wonderful and unique!'
      },
      {
        id: 4,
        name: 'Rainbow Factory Master Mission',
        instruction: 'Demonstrate your mastery of Rainbow Factory.',
        howToPlay: [
          'Work together as a class team.',
          'Solve the final challenge step by step.',
          'Earn your topic badge!'
        ],
        wowMoment: 'Receive cheers and high-fives for a completed mission!'
      }
    ]
  },
  {
    classId: 'ukg',
    className: 'UKG',
    topicId: 'shape-detective-world',
    name: 'Shape Detective World',
    videoFile: 'Shape Detective World.mp4',
    thumbFile: 'Shape Detective World.png',
    noteFile: 'Shape Detective World.png',
    hasGame: true,
    gameUrl: '/games/shape-detective-world/index.html',
    videoUrl: '/assets/videos/Shape%20Detective%20World.mp4',
    thumbUrl: '/assets/topics/Shape%20Detective%20World.png',
    noteUrl: '/assets/notes/Shape%20Detective%20World.png',
    activities: [
      {
        id: 1,
        name: 'Shape Detective World Discovery Hunt',
        instruction: 'Engage with Shape Detective World through classroom discovery.',
        howToPlay: [
          'Observe and discuss the concept with the teacher.',
          'Take turns identifying examples in the classroom.',
          'Share observations with friends.'
        ],
        wowMoment: 'Discover a brand-new connection and celebrate together!'
      },
      {
        id: 2,
        name: 'Shape Detective World Active Challenge',
        instruction: 'Practice Shape Detective World with a hands-on activity.',
        howToPlay: [
          'Follow teacher-guided movements.',
          'Match patterns or identify correct answers.',
          'Cheer for your classmates!'
        ],
        wowMoment: 'Master the concept with high energy!'
      },
      {
        id: 3,
        name: 'Shape Detective World Creative Expression',
        instruction: 'Express your understanding of Shape Detective World.',
        howToPlay: [
          'Draw, build, or demonstrate what you learned.',
          'Describe your creation to the class.',
          'Display your work with pride.'
        ],
        wowMoment: 'Create something wonderful and unique!'
      },
      {
        id: 4,
        name: 'Shape Detective World Master Mission',
        instruction: 'Demonstrate your mastery of Shape Detective World.',
        howToPlay: [
          'Work together as a class team.',
          'Solve the final challenge step by step.',
          'Earn your topic badge!'
        ],
        wowMoment: 'Receive cheers and high-fives for a completed mission!'
      }
    ]
  },
  {
    classId: 'ukg',
    className: 'UKG',
    topicId: 'super-market-challenge',
    name: 'Super Market Challenge',
    videoFile: 'Super Market Challenge.mp4',
    thumbFile: 'Supermarket Challenge.png',
    noteFile: 'Supermarket Challenge.png',
    hasGame: true,
    gameUrl: '/games/super-market-challenge/index.html',
    videoUrl: '/assets/videos/Super%20Market%20Challenge.mp4',
    thumbUrl: '/assets/topics/Supermarket%20Challenge.png',
    noteUrl: '/assets/notes/Supermarket%20Challenge.png',
    activities: [
      {
        id: 1,
        name: 'Super Market Challenge Discovery Hunt',
        instruction: 'Engage with Super Market Challenge through classroom discovery.',
        howToPlay: [
          'Observe and discuss the concept with the teacher.',
          'Take turns identifying examples in the classroom.',
          'Share observations with friends.'
        ],
        wowMoment: 'Discover a brand-new connection and celebrate together!'
      },
      {
        id: 2,
        name: 'Super Market Challenge Active Challenge',
        instruction: 'Practice Super Market Challenge with a hands-on activity.',
        howToPlay: [
          'Follow teacher-guided movements.',
          'Match patterns or identify correct answers.',
          'Cheer for your classmates!'
        ],
        wowMoment: 'Master the concept with high energy!'
      },
      {
        id: 3,
        name: 'Super Market Challenge Creative Expression',
        instruction: 'Express your understanding of Super Market Challenge.',
        howToPlay: [
          'Draw, build, or demonstrate what you learned.',
          'Describe your creation to the class.',
          'Display your work with pride.'
        ],
        wowMoment: 'Create something wonderful and unique!'
      },
      {
        id: 4,
        name: 'Super Market Challenge Master Mission',
        instruction: 'Demonstrate your mastery of Super Market Challenge.',
        howToPlay: [
          'Work together as a class team.',
          'Solve the final challenge step by step.',
          'Earn your topic badge!'
        ],
        wowMoment: 'Receive cheers and high-fives for a completed mission!'
      }
    ]
  }
];

const FIRST_CLASS_BASE_TOPICS: Omit<TopicItem, 'sectionId' | 'sectionName'>[] = [
  {
    classId: '1st-class',
    className: '1st Class',
    topicId: 'counting-detective-quest',
    name: 'Counting Detective Quest',
    videoFile: 'Counting Detective Quest.mp4',
    thumbFile: 'Counting Detective Quest.png',
    noteFile: 'Counting Detective Quest.png',
    hasGame: true,
    gameUrl: '/games/counting-detective-quest/index.html',
    videoUrl: '/assets/videos/Counting%20Detective%20Quest.mp4',
    thumbUrl: '/assets/topics/Counting%20Detective%20Quest.png',
    noteUrl: '/assets/notes/Counting%20Detective%20Quest.png',
    activities: [
      {
        id: 1,
        name: 'Counting Detective Quest Discovery Hunt',
        instruction: 'Engage with Counting Detective Quest through classroom discovery.',
        howToPlay: [
          'Observe and discuss the concept with the teacher.',
          'Take turns identifying examples in the classroom.',
          'Share observations with friends.'
        ],
        wowMoment: 'Discover a brand-new connection and celebrate together!'
      },
      {
        id: 2,
        name: 'Counting Detective Quest Active Challenge',
        instruction: 'Practice Counting Detective Quest with a hands-on activity.',
        howToPlay: [
          'Follow teacher-guided movements.',
          'Match patterns or identify correct answers.',
          'Cheer for your classmates!'
        ],
        wowMoment: 'Master the concept with high energy!'
      },
      {
        id: 3,
        name: 'Counting Detective Quest Creative Expression',
        instruction: 'Express your understanding of Counting Detective Quest.',
        howToPlay: [
          'Draw, build, or demonstrate what you learned.',
          'Describe your creation to the class.',
          'Display your work with pride.'
        ],
        wowMoment: 'Create something wonderful and unique!'
      },
      {
        id: 4,
        name: 'Counting Detective Quest Master Mission',
        instruction: 'Demonstrate your mastery of Counting Detective Quest.',
        howToPlay: [
          'Work together as a class team.',
          'Solve the final challenge step by step.',
          'Earn your topic badge!'
        ],
        wowMoment: 'Receive cheers and high-fives for a completed mission!'
      }
    ]
  },
  {
    classId: '1st-class',
    className: '1st Class',
    topicId: 'decision-makers',
    name: 'Decision Makers',
    videoFile: 'Decision Makers.mp4',
    thumbFile: 'Decision Makers.png',
    noteFile: 'Decision Maker.png',
    hasGame: true,
    gameUrl: '/games/decsion-makers/index.html',
    videoUrl: '/assets/videos/Decision%20Makers.mp4',
    thumbUrl: '/assets/topics/Decision%20Makers.png',
    noteUrl: '/assets/notes/Decision%20Maker.png',
    activities: [
      {
        id: 1,
        name: 'Decision Makers Discovery Hunt',
        instruction: 'Engage with Decision Makers through classroom discovery.',
        howToPlay: [
          'Observe and discuss the concept with the teacher.',
          'Take turns identifying examples in the classroom.',
          'Share observations with friends.'
        ],
        wowMoment: 'Discover a brand-new connection and celebrate together!'
      },
      {
        id: 2,
        name: 'Decision Makers Active Challenge',
        instruction: 'Practice Decision Makers with a hands-on activity.',
        howToPlay: [
          'Follow teacher-guided movements.',
          'Match patterns or identify correct answers.',
          'Cheer for your classmates!'
        ],
        wowMoment: 'Master the concept with high energy!'
      },
      {
        id: 3,
        name: 'Decision Makers Creative Expression',
        instruction: 'Express your understanding of Decision Makers.',
        howToPlay: [
          'Draw, build, or demonstrate what you learned.',
          'Describe your creation to the class.',
          'Display your work with pride.'
        ],
        wowMoment: 'Create something wonderful and unique!'
      },
      {
        id: 4,
        name: 'Decision Makers Master Mission',
        instruction: 'Demonstrate your mastery of Decision Makers.',
        howToPlay: [
          'Work together as a class team.',
          'Solve the final challenge step by step.',
          'Earn your topic badge!'
        ],
        wowMoment: 'Receive cheers and high-fives for a completed mission!'
      }
    ]
  },
  {
    classId: '1st-class',
    className: '1st Class',
    topicId: 'safety-hero-mission',
    name: 'Safety Hero Mission',
    videoFile: 'Safety Hero Mission.mp4',
    thumbFile: 'Safety Hero Mission.png',
    noteFile: 'Safety Hero Mission.png',
    hasGame: true,
    gameUrl: '/games/safety-hero-mission/index.html',
    videoUrl: '/assets/videos/Safety%20Hero%20Mission.mp4',
    thumbUrl: '/assets/topics/Safety%20Hero%20Mission.png',
    noteUrl: '/assets/notes/Safety%20Hero%20Mission.png',
    activities: [
      {
        id: 1,
        name: 'Safety Hero Mission Discovery Hunt',
        instruction: 'Engage with Safety Hero Mission through classroom discovery.',
        howToPlay: [
          'Observe and discuss the concept with the teacher.',
          'Take turns identifying examples in the classroom.',
          'Share observations with friends.'
        ],
        wowMoment: 'Discover a brand-new connection and celebrate together!'
      },
      {
        id: 2,
        name: 'Safety Hero Mission Active Challenge',
        instruction: 'Practice Safety Hero Mission with a hands-on activity.',
        howToPlay: [
          'Follow teacher-guided movements.',
          'Match patterns or identify correct answers.',
          'Cheer for your classmates!'
        ],
        wowMoment: 'Master the concept with high energy!'
      },
      {
        id: 3,
        name: 'Safety Hero Mission Creative Expression',
        instruction: 'Express your understanding of Safety Hero Mission.',
        howToPlay: [
          'Draw, build, or demonstrate what you learned.',
          'Describe your creation to the class.',
          'Display your work with pride.'
        ],
        wowMoment: 'Create something wonderful and unique!'
      },
      {
        id: 4,
        name: 'Safety Hero Mission Master Mission',
        instruction: 'Demonstrate your mastery of Safety Hero Mission.',
        howToPlay: [
          'Work together as a class team.',
          'Solve the final challenge step by step.',
          'Earn your topic badge!'
        ],
        wowMoment: 'Receive cheers and high-fives for a completed mission!'
      }
    ]
  },
  {
    classId: '1st-class',
    className: '1st Class',
    topicId: 'secret-colour-mission',
    name: 'Secret Colour Mission',
    videoFile: 'Secret Colour Mission.mp4',
    thumbFile: 'Secret Colour Mission.png',
    noteFile: 'Secret Colour Mission.png',
    hasGame: true,
    gameUrl: '/games/secret-colour-mission/index.html',
    videoUrl: '/assets/videos/Secret%20Colour%20Mission.mp4',
    thumbUrl: '/assets/topics/Secret%20Colour%20Mission.png',
    noteUrl: '/assets/notes/Secret%20Colour%20Mission.png',
    activities: [
      {
        id: 1,
        name: 'Secret Colour Mission Discovery Hunt',
        instruction: 'Engage with Secret Colour Mission through classroom discovery.',
        howToPlay: [
          'Observe and discuss the concept with the teacher.',
          'Take turns identifying examples in the classroom.',
          'Share observations with friends.'
        ],
        wowMoment: 'Discover a brand-new connection and celebrate together!'
      },
      {
        id: 2,
        name: 'Secret Colour Mission Active Challenge',
        instruction: 'Practice Secret Colour Mission with a hands-on activity.',
        howToPlay: [
          'Follow teacher-guided movements.',
          'Match patterns or identify correct answers.',
          'Cheer for your classmates!'
        ],
        wowMoment: 'Master the concept with high energy!'
      },
      {
        id: 3,
        name: 'Secret Colour Mission Creative Expression',
        instruction: 'Express your understanding of Secret Colour Mission.',
        howToPlay: [
          'Draw, build, or demonstrate what you learned.',
          'Describe your creation to the class.',
          'Display your work with pride.'
        ],
        wowMoment: 'Create something wonderful and unique!'
      },
      {
        id: 4,
        name: 'Secret Colour Mission Master Mission',
        instruction: 'Demonstrate your mastery of Secret Colour Mission.',
        howToPlay: [
          'Work together as a class team.',
          'Solve the final challenge step by step.',
          'Earn your topic badge!'
        ],
        wowMoment: 'Receive cheers and high-fives for a completed mission!'
      }
    ]
  },
  {
    classId: '1st-class',
    className: '1st Class',
    topicId: 'wildlife-explorer-quest',
    name: 'Wildlife Explorer Quest',
    videoFile: 'Wildlife Explorer Quest.mp4',
    thumbFile: 'Wildlife Explorer Quest.png',
    noteFile: 'Wildlife Explorer Quest.png',
    hasGame: true,
    gameUrl: '/games/wildlife-explore-quest/index.html',
    videoUrl: '/assets/videos/Wildlife%20Explorer%20Quest.mp4',
    thumbUrl: '/assets/topics/Wildlife%20Explorer%20Quest.png',
    noteUrl: '/assets/notes/Wildlife%20Explorer%20Quest.png',
    activities: [
      {
        id: 1,
        name: 'Wildlife Explorer Quest Discovery Hunt',
        instruction: 'Engage with Wildlife Explorer Quest through classroom discovery.',
        howToPlay: [
          'Observe and discuss the concept with the teacher.',
          'Take turns identifying examples in the classroom.',
          'Share observations with friends.'
        ],
        wowMoment: 'Discover a brand-new connection and celebrate together!'
      },
      {
        id: 2,
        name: 'Wildlife Explorer Quest Active Challenge',
        instruction: 'Practice Wildlife Explorer Quest with a hands-on activity.',
        howToPlay: [
          'Follow teacher-guided movements.',
          'Match patterns or identify correct answers.',
          'Cheer for your classmates!'
        ],
        wowMoment: 'Master the concept with high energy!'
      },
      {
        id: 3,
        name: 'Wildlife Explorer Quest Creative Expression',
        instruction: 'Express your understanding of Wildlife Explorer Quest.',
        howToPlay: [
          'Draw, build, or demonstrate what you learned.',
          'Describe your creation to the class.',
          'Display your work with pride.'
        ],
        wowMoment: 'Create something wonderful and unique!'
      },
      {
        id: 4,
        name: 'Wildlife Explorer Quest Master Mission',
        instruction: 'Demonstrate your mastery of Wildlife Explorer Quest.',
        howToPlay: [
          'Work together as a class team.',
          'Solve the final challenge step by step.',
          'Earn your topic badge!'
        ],
        wowMoment: 'Receive cheers and high-fives for a completed mission!'
      }
    ]
  }
];

const EXPLORE_BASE_TOPICS: TopicItem[] = [
  {
    classId: 'explore',
    className: 'Explore',
    topicId: 'champion-zone',
    name: 'Champion Zone',
    videoFile: 'Champian Zone.mp4',
    thumbFile: 'Champion Zone.jpeg',
    noteFile: 'Champion Zone.png',
    hasGame: false,
    videoUrl: '/assets/videos/Champian%20Zone.mp4',
    thumbUrl: '/assets/topics/Champion%20Zone.jpeg',
    noteUrl: '/assets/notes/Champion%20Zone.png',
    activities: [
      {
        id: 1,
        name: 'Champion Zone Discovery Hunt',
        instruction: 'Engage with Champion Zone through classroom discovery.',
        howToPlay: [
          'Observe and discuss the concept with the teacher.',
          'Take turns identifying examples in the classroom.',
          'Share observations with friends.'
        ],
        wowMoment: 'Discover a brand-new connection and celebrate together!'
      },
      {
        id: 2,
        name: 'Champion Zone Active Challenge',
        instruction: 'Practice Champion Zone with a hands-on activity.',
        howToPlay: [
          'Follow teacher-guided movements.',
          'Match patterns or identify correct answers.',
          'Cheer for your classmates!'
        ],
        wowMoment: 'Master the concept with high energy!'
      },
      {
        id: 3,
        name: 'Champion Zone Creative Expression',
        instruction: 'Express your understanding of Champion Zone.',
        howToPlay: [
          'Draw, build, or demonstrate what you learned.',
          'Describe your creation to the class.',
          'Display your work with pride.'
        ],
        wowMoment: 'Create something wonderful and unique!'
      },
      {
        id: 4,
        name: 'Champion Zone Master Mission',
        instruction: 'Demonstrate your mastery of Champion Zone.',
        howToPlay: [
          'Work together as a class team.',
          'Solve the final challenge step by step.',
          'Earn your topic badge!'
        ],
        wowMoment: 'Receive cheers and high-fives for a completed mission!'
      }
    ]
  },
  {
    classId: 'explore',
    className: 'Explore',
    topicId: 'cosmic-quest',
    name: 'Cosmic Quest',
    videoFile: 'Cosomic Quest.mp4',
    thumbFile: 'Cosomic Quest.jpeg',
    noteFile: 'Cosmic Quest.png',
    hasGame: false,
    videoUrl: '/assets/videos/Cosomic%20Quest.mp4',
    thumbUrl: '/assets/topics/Cosomic%20Quest.jpeg',
    noteUrl: '/assets/notes/Cosmic%20Quest.png',
    activities: [
      {
        id: 1,
        name: 'Cosmic Quest Discovery Hunt',
        instruction: 'Engage with Cosmic Quest through classroom discovery.',
        howToPlay: [
          'Observe and discuss the concept with the teacher.',
          'Take turns identifying examples in the classroom.',
          'Share observations with friends.'
        ],
        wowMoment: 'Discover a brand-new connection and celebrate together!'
      },
      {
        id: 2,
        name: 'Cosmic Quest Active Challenge',
        instruction: 'Practice Cosmic Quest with a hands-on activity.',
        howToPlay: [
          'Follow teacher-guided movements.',
          'Match patterns or identify correct answers.',
          'Cheer for your classmates!'
        ],
        wowMoment: 'Master the concept with high energy!'
      },
      {
        id: 3,
        name: 'Cosmic Quest Creative Expression',
        instruction: 'Express your understanding of Cosmic Quest.',
        howToPlay: [
          'Draw, build, or demonstrate what you learned.',
          'Describe your creation to the class.',
          'Display your work with pride.'
        ],
        wowMoment: 'Create something wonderful and unique!'
      },
      {
        id: 4,
        name: 'Cosmic Quest Master Mission',
        instruction: 'Demonstrate your mastery of Cosmic Quest.',
        howToPlay: [
          'Work together as a class team.',
          'Solve the final challenge step by step.',
          'Earn your topic badge!'
        ],
        wowMoment: 'Receive cheers and high-fives for a completed mission!'
      }
    ]
  },
  {
    classId: 'explore',
    className: 'Explore',
    topicId: 'digital-detectives',
    name: 'Digital Detectives',
    videoFile: 'Digital Detectives.mp4',
    thumbFile: 'Digital Detectives.jpeg',
    noteFile: 'Digital Detectives.png',
    hasGame: false,
    videoUrl: '/assets/videos/Digital%20Detectives.mp4',
    thumbUrl: '/assets/topics/Digital%20Detectives.jpeg',
    noteUrl: '/assets/notes/Digital%20Detectives.png',
    activities: [
      {
        id: 1,
        name: 'Digital Detectives Discovery Hunt',
        instruction: 'Engage with Digital Detectives through classroom discovery.',
        howToPlay: [
          'Observe and discuss the concept with the teacher.',
          'Take turns identifying examples in the classroom.',
          'Share observations with friends.'
        ],
        wowMoment: 'Discover a brand-new connection and celebrate together!'
      },
      {
        id: 2,
        name: 'Digital Detectives Active Challenge',
        instruction: 'Practice Digital Detectives with a hands-on activity.',
        howToPlay: [
          'Follow teacher-guided movements.',
          'Match patterns or identify correct answers.',
          'Cheer for your classmates!'
        ],
        wowMoment: 'Master the concept with high energy!'
      },
      {
        id: 3,
        name: 'Digital Detectives Creative Expression',
        instruction: 'Express your understanding of Digital Detectives.',
        howToPlay: [
          'Draw, build, or demonstrate what you learned.',
          'Describe your creation to the class.',
          'Display your work with pride.'
        ],
        wowMoment: 'Create something wonderful and unique!'
      },
      {
        id: 4,
        name: 'Digital Detectives Master Mission',
        instruction: 'Demonstrate your mastery of Digital Detectives.',
        howToPlay: [
          'Work together as a class team.',
          'Solve the final challenge step by step.',
          'Earn your topic badge!'
        ],
        wowMoment: 'Receive cheers and high-fives for a completed mission!'
      }
    ]
  },
  {
    classId: 'explore',
    className: 'Explore',
    topicId: 'kindness-magic',
    name: 'Kindness Magic',
    videoFile: 'Kindness Magic.mp4',
    thumbFile: 'Kindness Magic.jpeg',
    noteFile: 'Kindness Magic.png',
    hasGame: false,
    videoUrl: '/assets/videos/Kindness%20Magic.mp4',
    thumbUrl: '/assets/topics/Kindness%20Magic.jpeg',
    noteUrl: '/assets/notes/Kindness%20Magic.png',
    activities: [
      {
        id: 1,
        name: 'Kindness Magic Discovery Hunt',
        instruction: 'Engage with Kindness Magic through classroom discovery.',
        howToPlay: [
          'Observe and discuss the concept with the teacher.',
          'Take turns identifying examples in the classroom.',
          'Share observations with friends.'
        ],
        wowMoment: 'Discover a brand-new connection and celebrate together!'
      },
      {
        id: 2,
        name: 'Kindness Magic Active Challenge',
        instruction: 'Practice Kindness Magic with a hands-on activity.',
        howToPlay: [
          'Follow teacher-guided movements.',
          'Match patterns or identify correct answers.',
          'Cheer for your classmates!'
        ],
        wowMoment: 'Master the concept with high energy!'
      },
      {
        id: 3,
        name: 'Kindness Magic Creative Expression',
        instruction: 'Express your understanding of Kindness Magic.',
        howToPlay: [
          'Draw, build, or demonstrate what you learned.',
          'Describe your creation to the class.',
          'Display your work with pride.'
        ],
        wowMoment: 'Create something wonderful and unique!'
      },
      {
        id: 4,
        name: 'Kindness Magic Master Mission',
        instruction: 'Demonstrate your mastery of Kindness Magic.',
        howToPlay: [
          'Work together as a class team.',
          'Solve the final challenge step by step.',
          'Earn your topic badge!'
        ],
        wowMoment: 'Receive cheers and high-fives for a completed mission!'
      }
    ]
  },
  {
    classId: 'explore',
    className: 'Explore',
    topicId: 'little-leaders',
    name: 'Little Leaders: Values & Kindness',
    videoFile: 'Little Leaders.mp4',
    thumbFile: 'Little Leaders.jpeg',
    noteFile: 'Little Leaders.png',
    hasGame: false,
    videoUrl: '/assets/videos/Little%20Leaders.mp4',
    thumbUrl: '/assets/topics/Little%20Leaders.jpeg',
    noteUrl: '/assets/notes/Little%20Leaders.png',
    activities: [
      {
        id: 1,
        name: 'Little Leaders: Values & Kindness Discovery Hunt',
        instruction: 'Engage with Little Leaders: Values & Kindness through classroom discovery.',
        howToPlay: [
          'Observe and discuss the concept with the teacher.',
          'Take turns identifying examples in the classroom.',
          'Share observations with friends.'
        ],
        wowMoment: 'Discover a brand-new connection and celebrate together!'
      },
      {
        id: 2,
        name: 'Little Leaders: Values & Kindness Active Challenge',
        instruction: 'Practice Little Leaders: Values & Kindness with a hands-on activity.',
        howToPlay: [
          'Follow teacher-guided movements.',
          'Match patterns or identify correct answers.',
          'Cheer for your classmates!'
        ],
        wowMoment: 'Master the concept with high energy!'
      },
      {
        id: 3,
        name: 'Little Leaders: Values & Kindness Creative Expression',
        instruction: 'Express your understanding of Little Leaders: Values & Kindness.',
        howToPlay: [
          'Draw, build, or demonstrate what you learned.',
          'Describe your creation to the class.',
          'Display your work with pride.'
        ],
        wowMoment: 'Create something wonderful and unique!'
      },
      {
        id: 4,
        name: 'Little Leaders: Values & Kindness Master Mission',
        instruction: 'Demonstrate your mastery of Little Leaders: Values & Kindness.',
        howToPlay: [
          'Work together as a class team.',
          'Solve the final challenge step by step.',
          'Earn your topic badge!'
        ],
        wowMoment: 'Receive cheers and high-fives for a completed mission!'
      }
    ]
  }
];

// Complete Curriculum: Little Stars and Bright Minds share the exact same official topics for each class
export const TOPICS: TopicItem[] = [
  // LKG Little Stars (5 topics)
  ...LKG_BASE_TOPICS.map(t => ({ ...t, sectionId: 'little-stars' as SectionType, sectionName: 'Little Stars' })),
  // LKG Bright Minds (Same 5 topics)
  ...LKG_BASE_TOPICS.map(t => ({ ...t, sectionId: 'bright-minds' as SectionType, sectionName: 'Bright Minds' })),

  // UKG Little Stars (5 topics)
  ...UKG_BASE_TOPICS.map(t => ({ ...t, sectionId: 'little-stars' as SectionType, sectionName: 'Little Stars' })),
  // UKG Bright Minds (Same 5 topics)
  ...UKG_BASE_TOPICS.map(t => ({ ...t, sectionId: 'bright-minds' as SectionType, sectionName: 'Bright Minds' })),

  // 1st Class Little Stars (5 topics)
  ...FIRST_CLASS_BASE_TOPICS.map(t => ({ ...t, sectionId: 'little-stars' as SectionType, sectionName: 'Little Stars' })),
  // 1st Class Bright Minds (Same 5 topics)
  ...FIRST_CLASS_BASE_TOPICS.map(t => ({ ...t, sectionId: 'bright-minds' as SectionType, sectionName: 'Bright Minds' })),

  // Explore (5 topics)
  ...EXPLORE_BASE_TOPICS
];

export function getTopicsByClass(classId: ClassType): TopicItem[] {
  return TOPICS.filter(t => t.classId === classId);
}

export function getTopicsByClassAndSection(classId: ClassType, sectionId: SectionType): TopicItem[] {
  return TOPICS.filter(t => t.classId === classId && t.sectionId === sectionId);
}

export function getExploreTopics(): TopicItem[] {
  return TOPICS.filter(t => t.classId === 'explore');
}

export function getTopicById(classId: ClassType, topicId: string, sectionId?: SectionType): TopicItem | undefined {
  if (sectionId) {
    const found = TOPICS.find(t => t.classId === classId && t.sectionId === sectionId && t.topicId === topicId);
    if (found) return found;
  }
  return TOPICS.find(t => t.classId === classId && t.topicId === topicId);
}
