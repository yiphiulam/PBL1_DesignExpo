export type PersonaId = 
  | 'first_timer'
  | 'design_student'
  | 'family'
  | 'local_resident'
  | 'cultural_hunter';

export type InterestId = 
  | 'local_culture'
  | 'interactive_art'
  | 'urban_futures'
  | 'sustainable_craft'
  | 'community_stories';

export type PaceId = 'quick' | 'moderate' | 'deep';

export type Language = 'en' | 'zh';

export type ExhibitMode = 'highlights' | 'deep_dive';

export interface MapLocation {
  x: number; // percentage 0-100 on campus plane matching official floorplan
  y: number; // percentage 0-100 on campus plane matching official floorplan
  floor: '1F' | 'GF' | '3F';
  zoneCode: string;
}

export interface Persona {
  id: PersonaId;
  name: { en: string; zh: string };
  tagline: { en: string; zh: string };
  description: { en: string; zh: string };
  characterTitle: { en: string; zh: string };
  flowmomoType: { en: string; zh: string };
  iconName: string;
}

export interface Interest {
  id: InterestId;
  name: { en: string; zh: string };
  description: { en: string; zh: string };
}

export interface ExhibitItem {
  id: string;
  code: string; // A1, A2, A3, ... A14
  subFlowTheme: { en: string; zh: string }; // e.g. 願景流, 玩美流, 跨界流...
  dates: string; // 09/24-10/11
  areaTag: { en: string; zh: string }; // 青埔展區
  venueFloor: { en: string; zh: string }; // e.g. 桃園會展中心 1F
  pavilionNumber: string;
  venueName: { en: string; zh: string };
  title: { en: string; zh: string };
  officialDescription: { en: string; zh: string };
  oneSentenceTakeaway: { en: string; zh: string };
  image: string;
  bufferWalkMinutes: number;
  distanceMeters: number;
  thematicCategory: string;
  audioDuration: string;
  audioTranscript: { en: string; zh: string };
  curatorialStory: { en: string; zh: string };
  whyItMattersByPersona: Record<PersonaId, { en: string; zh: string }>;
  sensoryFocus: {
    look: { en: string; zh: string };
    listen: { en: string; zh: string };
    touchOrTaste: { en: string; zh: string };
  };
  microPoll: {
    question: { en: string; zh: string };
    options: Array<{ id: string; label: { en: string; zh: string }; initialVotes: number }>;
  };
  branchAlternative?: {
    title: { en: string; zh: string };
    description: { en: string; zh: string };
  };
  mapLocation: MapLocation;
}

export interface CuratedJourney {
  title: { en: string; zh: string };
  curatorialPremise: { en: string; zh: string };
  areaName: { en: string; zh: string };
  estimatedTotalMinutes: number;
  personaId: PersonaId;
  interestId: InterestId;
  paceId: PaceId;
  exhibits: ExhibitItem[];
}

export interface UserVisitState {
  savedInsightIds: string[];
  pollAnswers: Record<string, string>;
  activeAudioExhibitId: string | null;
  isPlayingAudio: boolean;
  audioProgress: number; // 0 to 100
}
