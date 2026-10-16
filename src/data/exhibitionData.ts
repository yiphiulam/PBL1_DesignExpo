import { Persona, Interest, ExhibitItem, PersonaId, InterestId, PaceId, CuratedJourney } from '../types/expo';

export const PERSONAS: Persona[] = [
  {
    id: 'first_timer',
    name: { en: 'First-time Explorer', zh: '初訪探索者' },
    tagline: { en: 'Low-barrier orientation and memorable cultural highlights', zh: '直覺清晰的導引，一眼看懂青埔展區精華' },
    description: {
      en: 'Seeking an approachable walkthrough across Area 1 without getting overwhelmed by technical industrial jargon.',
      zh: '初次走進青埔展區，希望在舒適節奏中感受桃園「流」的核心魅力與高人氣亮點。'
    },
    characterTitle: { en: 'The Curious Wayfarer', zh: '漫遊尋光者' },
    flowmomoType: { en: 'Fluid Wanderer MOMO', zh: '隨光流轉 MOMO' },
    iconName: 'Compass'
  },
  {
    id: 'design_student',
    name: { en: 'Design Enthusiast', zh: '設計美學家' },
    tagline: { en: 'Material experiments, spatial tectonics, and design methodology', zh: '循環園區、空間構造與未來造城的專業剖析' },
    description: {
      en: 'Curious about TAOPIA circular materials, manufacturing DNA, spatial urbanism, and international typographic POV.',
      zh: '聚焦「桃〇計畫」循環材料、製造業設計導入、青年造城空間與國際策展視野。'
    },
    characterTitle: { en: 'The Tectonic Alchemist', zh: '構造煉金師' },
    flowmomoType: { en: 'Architectural MOMO', zh: '構築美學 MOMO' },
    iconName: 'PenTool'
  },
  {
    id: 'family',
    name: { en: 'Family with Kids', zh: '親子探索家' },
    tagline: { en: 'Sensory interactions, play-based discovery, and easy walking buffers', zh: '光影廊道、五感互動與寬敞友善的推車路徑' },
    description: {
      en: 'Prioritizing hands-on exhibits, luminous digital bridges, open walkways, and sensory interactive spaces.',
      zh: '帶孩子同行，首選彩繪玻璃光影之橋、水之道互動音場與好市有戲的歡樂市集體驗。'
    },
    characterTitle: { en: 'The Playful Spark', zh: '感官童心者' },
    flowmomoType: { en: 'Joyful Ripple MOMO', zh: '歡喜微光 MOMO' },
    iconName: 'Users'
  },
  {
    id: 'local_resident',
    name: { en: 'Local Resident', zh: '在地生活家' },
    tagline: { en: 'Taoyuan identity, 24HR supply chain pride, and city evolution', zh: '千塘水利、24小時航空城心跳與家鄉美學轉型' },
    description: {
      en: 'Excited to witness how local manufacturing, Taoyuan ponds, and neighborhood markets take center stage.',
      zh: '生活在桃園，期待看見熟悉的埤塘水文、航空供應鏈與老街市集如何躍上國際設計舞台。'
    },
    characterTitle: { en: 'The Hearth Keeper', zh: '風土守望者' },
    flowmomoType: { en: 'Rooted Earth MOMO', zh: '大地萌芽 MOMO' },
    iconName: 'Home'
  },
  {
    id: 'cultural_hunter',
    name: { en: 'Cultural Hunter', zh: '文化獵手' },
    tagline: { en: 'Multicultural migration, fermentation terroir, and global POV', zh: '多元族群匯流、在地發酵風味與國際青年視角' },
    description: {
      en: 'Fascinated by Taoyuan’s cultural crossroads, indigenous water wisdom, and contemporary global perspectives.',
      zh: '探訪這座全台最年輕移居城市的文化交匯，細讀發酵滋味、水利智慧與 #桃園POV 跨國對話。'
    },
    characterTitle: { en: 'The Heritage Weaver', zh: '記憶織旅人' },
    flowmomoType: { en: 'Ancient Echo MOMO', zh: '時光編織 MOMO' },
    iconName: 'Sparkles'
  }
];

export const INTERESTS: Interest[] = [
  {
    id: 'local_culture',
    name: { en: 'Local Culture & Food', zh: '常民生活與市集 (A7 好市有戲 / A11 文化Well-being)' },
    description: { en: 'Night market aesthetics, fermented terroirs, and everyday street flavor', zh: '好市有戲常民美學、島嶼醬香與街廓生活福祉' }
  },
  {
    id: 'interactive_art',
    name: { en: 'Interactive Art & Light', zh: '光影感官與水脈 (A3 匯流之橋 / A10 水之道)' },
    description: { en: 'Stained glass bridge, responsive digital luminescence, and soundscapes', zh: '彩色玻璃橋、數位光影漣漪與石門水文聲景' }
  },
  {
    id: 'urban_futures',
    name: { en: 'Urban Futures & Timber', zh: '未來造城與城市願景 (A2 願景流 / A12 新銳流 / A14 智慧流)' },
    description: { en: 'Civic resilience, youth micro-housing, and parametric public spaces', zh: '2040 未來城市設計師、青年社會造城與智匯動態系統' }
  },
  {
    id: 'sustainable_craft',
    name: { en: 'Circular Craft & Industry', zh: '循環永續與製造業 (A6 永續流 / A8 智造流 / A5 價值流)' },
    description: { en: 'TAOPIA circular park, 24HR aerospace manufacturing, and green tech', zh: '桃〇計畫未來循環園、24HR 運轉全世界工業鏈、產業新態' }
  },
  {
    id: 'community_stories',
    name: { en: 'Data Algorithm & Global POV', zh: '數據演算與國際視角 (A9 行動流 / A13 國際流 / A4 跨界流)' },
    description: { en: 'Taoyuan Algorithm Lab, global graphic designers, and everyday dynamics', zh: '桃園演算室淨零編碼、跨國海報設計與企業日常動力學' }
  }
];

// Complete 14 Official Exhibitions for Area 1 (Qingpu / 桃園會展中心 & 桃園市立圖書館青埔分館)
// Exact Titles, Sub-Flow Themes, Official Descriptions, and Map Coordinates from the Official Map (image.png)
export const ALL_AREA1_EXHIBITS: ExhibitItem[] = [
  {
    id: 'exhibit_a1',
    code: 'A1',
    subFlowTheme: { en: 'Main Theme Flow', zh: '主題核心' },
    dates: '09/24-10/11',
    areaTag: { en: 'Area 1 · Qingpu', zh: '青埔展區 Area 1' },
    venueFloor: { en: 'Messe Taoyuan · 1F Center Atrium', zh: '桃園會展中心 · 1F 中庭主題展' },
    pavilionNumber: 'A1',
    venueName: { en: 'Messe Taoyuan · Hall 1F', zh: '桃園會展中心 1F' },
    title: { en: 'TaoYuan in Flow', zh: '桃園流' },
    officialDescription: {
      en: 'Taoyuan is a city formed by the confluence of people—not only a geographical entrance, but also an emotional touchpoint. All flows exist to anchor here; during ascents and descents, we reposition ourselves. Welcome into this urban evolution written by all, feeling the vital magnetism of Taoyuan.',
      zh: '桃園是一座由人集結而成的匯流之城，不僅是地理的入口，更是情感的觸點。 所有的流動，都是為了在此定錨；在起降過程中，重新定位自己。 歡迎走進這場由眾人手寫的城市進化論，感受充滿生命動能的桃園引力。'
    },
    oneSentenceTakeaway: {
      en: 'Discover how the confluence of waterways, diverse migrations, and global speed turns Taoyuan into Taiwan’s vital flowing gateway.',
      zh: '以「流」為核心密碼，看土地水脈、族群交織與航空動能如何形塑台灣最年輕城市的流動磁力。'
    },
    image: '/src/assets/images/expo_hero_pavilion_1791790411519.jpg',
    bufferWalkMinutes: 2,
    distanceMeters: 60,
    thematicCategory: 'Theme Core & Flow Identity',
    audioDuration: '2:40',
    audioTranscript: {
      en: 'Welcome to A1: TaoYuan in Flow. Step onto the curved timber walkway beneath the soaring architectural canopy. Taoyuan is a city defined by flows—natural river basins, thousand irrigation ponds, and international flight paths. Here, people anchor, reflect, and reimagine urban identity.',
      zh: '歡迎來到 A1「桃園流」。漫步於起伏的原木棧道，仰望由輕盈木構與透光薄膜交織的流動天棚。桃園是一座因「流動」而生的城市：從高山水文、千座埤塘，到頭頂掠過的國際航線。展場透過有機弧線與自然風息，呈現不同時代移居者在此匯聚激盪的生命力。'
    },
    curatorialStory: {
      en: 'Curated as the master gateway of Area 1 at Messe Taoyuan, this pavilion establishes that flows of water, logistics, and people together define the urban DNA of Taoyuan.',
      zh: '作為青埔展區的核心門戶，策展人將桃園的千塘水系、交通樞紐與多元族群匯聚，轉譯為極具包容力的沉浸式流動空間。'
    },
    whyItMattersByPersona: {
      first_timer: {
        en: 'The definitive starting anchor of your expo visit: take 10 minutes here to understand Taoyuan before visiting specialized halls.',
        zh: '整座展覽的最佳破題起點：花 10 分鐘沉浸於這片流動空間，即可掌握全展的核心精神，後續觀展不會迷航。'
      },
      design_student: {
        en: 'Examine parametric glu-lam timber arches and demountable tensile fabric nodes engineered without single-use adhesives.',
        zh: '剖析參數化設計如何以大跨距木肋弧線具象化水流動態，全館採用乾式螺栓組裝，展期結束後百分之百循環利用。'
      },
      family: {
        en: 'Wide, gentle ramps allow effortless stroller movement, while sunlight through the canopy creates a dancing playground.',
        zh: '超寬敞無障礙坡道推車完全零負擔，穿透天棚的自然光斑在木地板上舞動，讓全家人感到放鬆舒適。'
      },
      local_resident: {
        en: 'Witness familiar irrigation pond hydrology and high-speed rail corridors celebrated as world-class architectural art.',
        zh: '看見我們日常生活的千塘水網與高鐵青埔廊道，被轉譯為世界級的建築地景，充滿在地自豪。'
      },
      cultural_hunter: {
        en: 'Listen to ambient recordings of Hakka mountain songs, Atayal chants, and airport arrival chimes interwoven.',
        zh: '仔細聆聽展場環境音，客家山歌、泰雅吟唱與航廈廣播交織成當代最動人的族群匯流協奏。'
      }
    },
    sensoryFocus: {
      look: { en: 'Sinuous timber curves dapple ambient daylight', zh: '原木弧線天棚隨天光灑落的流動光影' },
      listen: { en: 'Subtle soundscape of flowing streams and breezes', zh: '融合自然溪流與微風輕撫的環繞立體聲' },
      touchOrTaste: { en: 'Polished cedar handrails and smooth timber ramps', zh: '溫潤未上化學漆的原木扶手觸感' }
    },
    microPoll: {
      question: { en: 'Which element of "Flow" struck you most deeply?', zh: '「桃園流」最打動你的是哪種流動？' },
      options: [
        { id: 'water', label: { en: 'Historical Ponds & Canal Waters', zh: '千塘水脈的人文智慧' }, initialVotes: 640 },
        { id: 'people', label: { en: 'Diverse Cultural Confluence', zh: '多元族群的匯聚融合' }, initialVotes: 512 },
        { id: 'future', label: { en: 'Airport & Transit Acceleration', zh: '航空與交通的未來動能' }, initialVotes: 388 }
      ]
    },
    mapLocation: {
      x: 43,
      y: 48,
      floor: '1F',
      zoneCode: '1F-MID-RIGHT',
    }
  },
  {
    id: 'exhibit_a2',
    code: 'A2',
    subFlowTheme: { en: 'Vision Flow', zh: '願景流' },
    dates: '09/24-10/11',
    areaTag: { en: 'Area 1 · Qingpu', zh: '青埔展區 Area 1' },
    venueFloor: { en: 'Messe Taoyuan · 1F Mid-South', zh: '桃園會展中心 · 1F 中南展區' },
    pavilionNumber: 'A2',
    venueName: { en: 'Messe Taoyuan · Hall 1F', zh: '桃園會展中心 1F' },
    title: { en: 'City Pulse, Thriving Future', zh: '城市脈搏・跳動未來' },
    officialDescription: {
      en: 'Step into "City Pulse, Thriving Future" to become a 2040 future city designer. Through immersive theater, interactive exploration, and urban co-creation, feel how design transforms cities and how gathering makes life beautiful—this is the 2040 Taoyuan Gathering: clustered, rooted, and full of life.',
      zh: '走進《城市脈搏．跳動未來》，化身2040未來城市設計師，透過沉浸式劇場、互動探索與城市共創，感受設計如何改變城市，也讓生活因人而聚、因聚而美好─這就是有聚、有落、有生活的2040桃園聚。'
    },
    oneSentenceTakeaway: {
      en: 'Transform into a 2040 city designer, using interactive civic theater to co-create resilient transit corridors and vibrant communal neighborhoods.',
      zh: '化身 2040 未來城市設計師，透過沉浸劇場共創交通廊道與聚落共生新願景。'
    },
    image: '/src/assets/images/expo_hero_pavilion_1791790411519.jpg',
    bufferWalkMinutes: 2,
    distanceMeters: 75,
    thematicCategory: 'Future Urbanism & Civic Vision',
    audioDuration: '2:35',
    audioTranscript: {
      en: 'Step into A2: City Pulse, Thriving Future. You are not merely a spectator; you are an urban planner for 2040. Interactive multi-touch projection tables allow visitors to design bus rapid transits, shaded pedestrian walkways, and communal gardens.',
      zh: '走進 A2「城市脈搏・跳動未來」。在這裡，你不只是觀眾，而是 2040 年的城市設計師。透過互動觸控感應桌，即時規劃綠色捷運支線、連續林蔭步道與活力社區聚落。'
    },
    curatorialStory: {
      en: 'Focusing on the concept of "Taoyuan Gathering" (桃園聚), this exhibit envisions a livable polycentric metropolis built on human warmth and ecological balance.',
      zh: '以「有聚、有落、有生活」為策展主軸，探索桃園邁向 2040 年時，如何兼顧人口高速增長與高品質生活聚落。'
    },
    whyItMattersByPersona: {
      first_timer: {
        en: 'Engaging gamified city simulations make complex urban planning intuitive and fun for everyone.',
        zh: '遊戲化的未來城市互動界面，讓枯燥的都市計畫變得像模擬市民般直覺好玩。'
      },
      design_student: {
        en: 'Inspect participatory urban design methodology and civic feedback aggregation models.',
        zh: '深入觀摩參與式設計（Participatory Design）如何落實於公共治理與市政政策模型。'
      },
      family: {
        en: 'Kids love tapping the interactive projected streets to place miniature electric buses and green trees.',
        zh: '孩子們最喜歡在光影街道上親手觸碰放置電動小公車與綠色大樹，歡樂十足。'
      },
      local_resident: {
        en: 'Vote directly on future transit corridors connecting Qingpu, Zhongli, and Taoyuan Station.',
        zh: '親自投票表達對青埔、中壢與桃園舊市區之間綠色通勤廊道的期待。'
      },
      cultural_hunter: {
        en: 'Notice how indigenous and Hakka hamlet clustering concepts inform the 2040 urban settlement design.',
        zh: '看傳統聚落散村與集村的智慧，如何融入當代低碳生態社區規劃之中。'
      }
    },
    sensoryFocus: {
      look: { en: 'Dynamic digital projection maps of 2040 Taoyuan', zh: '2040 年桃園立體動態光影地圖' },
      listen: { en: 'Harmonious pulse soundscapes mirroring urban heartbeat', zh: '模擬城市心跳跳動的律動環境聲' },
      touchOrTaste: { en: 'Multi-touch interactive planning consoles', zh: '多人協同的互動多點觸控感應台' }
    },
    microPoll: {
      question: { en: 'What is your top priority for Taoyuan 2040?', zh: '你對 2040 年桃園聚落最期待什麼？' },
      options: [
        { id: 'pedestrian', label: { en: 'Pedestrian-Only Green Walkways', zh: '全人行無阻礙綠色步道' }, initialVotes: 580 },
        { id: 'mixed', label: { en: 'Intergenerational Shared Community', zh: '青銀共居活力生活聚落' }, initialVotes: 440 },
        { id: 'nature', label: { en: 'Pond Water Sponge City', zh: '千塘串聯的海綿保水微氣候' }, initialVotes: 390 }
      ]
    },
    mapLocation: {
      x: 43,
      y: 64,
      floor: '1F',
      zoneCode: '1F-MID-RIGHT-LOWER',
    }
  },
  {
    id: 'exhibit_a3',
    code: 'A3',
    subFlowTheme: { en: 'Playful Beauty Flow', zh: '玩美流' },
    dates: '09/24-10/11',
    areaTag: { en: 'Area 1 · Qingpu', zh: '青埔展區 Area 1' },
    venueFloor: { en: 'Messe Taoyuan · 1F South Corridor', zh: '桃園會展中心 · 1F 南側廊道' },
    pavilionNumber: 'A3',
    venueName: { en: 'Messe Taoyuan · Hall 1F', zh: '桃園會展中心 1F' },
    title: { en: 'Bridge of Confluence', zh: '匯流之橋' },
    officialDescription: {
      en: 'Centered on the spirit of "Confluence", using a "Stained Glass Bridge" combined with "Digital Media" as its format, connecting three major scenic highlights: "Explore Northern Cross-Island", "Pearl Coast", and "Dalongmen". Utilizing light, color, sound, scent, and touch to showcase Taoyuan as the Capital of Confluence.',
      zh: '展覽以「匯流」為核心精神，以「彩色玻璃橋」結合「數位媒材」作為展演形式，串聯「探索北橫」、「珍珠海岸」及「大龍門」三大觀光亮點，運用光影、色彩、聲音、氣味與觸覺等元素，展現桃園作為「匯流之都」的魅力。'
    },
    oneSentenceTakeaway: {
      en: 'Cross a radiant stained-glass bridge blending digital light, mountain scents, and coastline waves to experience Northern Cross-Island, Pearl Coast, and Dalongmen.',
      zh: '以彩色玻璃橋結合數位媒材，串聯北橫、珍珠海岸與大龍門三大觀光亮點，展現匯流之都的五感魅力。'
    },
    image: '/src/assets/images/expo_interactive_light_1791790446733.jpg',
    bufferWalkMinutes: 2,
    distanceMeters: 70,
    thematicCategory: 'Digital Media & Immersive Light',
    audioDuration: '2:15',
    audioTranscript: {
      en: 'You are stepping onto A3: Bridge of Confluence. Sunlight refracts through faceted colored glass panels, casting emerald mountain greens and coastal blues across the floor. As you walk, motion sensors trigger audio samples of mountain birds and ocean waves.',
      zh: '你正走在 A3「匯流之橋」上。陽光穿透彩色玻璃，將北橫翠綠山巒與珍珠海岸蔚藍波光灑在你的步履間。隨著參觀者走動，感測器帶動山鳥鳴囀與浪濤水波共鳴。'
    },
    curatorialStory: {
      en: 'Translating tourism geography into an architectural sensorial path, celebrating northern Taiwan’s mountain and oceanic beauty.',
      zh: '運用色彩玻璃、聲音、氣味與光學折射，讓參觀者在室內廊道一次飽覽桃園山海之美。'
    },
    whyItMattersByPersona: {
      first_timer: {
        en: 'The most photogenic sensory installation of Area 1: jewel-toned light creates magical photography angles.',
        zh: '青埔展區最夢幻的打卡視覺亮點：寶石般的光芒任何角度都能拍出美麗照片。'
      },
      design_student: {
        en: 'Study how dichroic glass calibration integrates with low-lux digital projector mapping and directional speakers.',
        zh: '研究分色玻璃自然折射角與暗場投影流明校準的技術整合，細看五感跨媒材策展手法。'
      },
      family: {
        en: 'Kids love chasing the light ripples under their shoes while smelling fresh cedar aromas from the mist dispensers.',
        zh: '孩子們最喜歡在天橋上追逐隨腳步散開的繽紛光圈，還能聞到大自然的清新香氣。'
      },
      local_resident: {
        en: 'Recognize the natural symbols of Northern Cross-Island (北橫) and Dalongmen (大龍門) translated into art.',
        zh: '看見我們熟悉的北橫高山、珍珠海岸與大龍門觀光亮點，被轉化為優雅的國際級光影藝術。'
      },
      cultural_hunter: {
        en: 'Experience "Confluence" as an allegory for immigration and natural ecological harmony.',
        zh: '「匯流」不僅是景點串聯，更體現山林原鄉、客家聚落與沿海漁港共同交織的生活哲學。'
      }
    },
    sensoryFocus: {
      look: { en: 'Stained glass jewel tones shifting across the floor', zh: '彩繪玻璃如寶石般灑落地面的絢麗色塊' },
      listen: { en: 'Forest bird songs and tidal waves captured along Northern Cross-Island', zh: '北橫深山鳥鳴與沿海浪濤的立體聲景' },
      touchOrTaste: { en: 'Tactile vibrating handrail with ambient temperature changes', zh: '微風與溫度隨山海景致切換的觸感體驗' }
    },
    microPoll: {
      question: { en: 'Which destination scenic flow resonated most with you?', zh: '哪一個觀光亮點的光影意象最打動你？' },
      options: [
        { id: 'mountain', label: { en: 'Explore Northern Cross-Island (探索北橫)', zh: '探索北橫·高山森林霧氣' }, initialVotes: 690 },
        { id: 'coast', label: { en: 'Pearl Coast (珍珠海岸)', zh: '珍珠海岸·落日金黃浪濤' }, initialVotes: 540 },
        { id: 'dalongmen', label: { en: 'Dalongmen Cultural Triangle (大龍門)', zh: '大龍門·古道埤塘歷史風華' }, initialVotes: 410 }
      ]
    },
    mapLocation: {
      x: 43,
      y: 76,
      floor: '1F',
      zoneCode: '1F-SOUTH-MID',
    }
  },
  {
    id: 'exhibit_a4',
    code: 'A4',
    subFlowTheme: { en: 'Cross-Border Flow', zh: '跨界流' },
    dates: '09/24-10/11',
    areaTag: { en: 'Area 1 · Qingpu', zh: '青埔展區 Area 1' },
    venueFloor: { en: 'Messe Taoyuan · 1F South Edge', zh: '桃園會展中心 · 1F 南緣展區 (臨文康路)' },
    pavilionNumber: 'A4',
    venueName: { en: 'Messe Taoyuan · Hall 1F', zh: '桃園會展中心 1F' },
    title: { en: 'Everyday Dynamics', zh: '日常動力學' },
    officialDescription: {
      en: '"Everyday Dynamics" centers on corporate development momentum, deconstructing the delicate kinetics of daily life. It reveals how brands and individuals transform every movement into forward force toward ideal living through design, innovation, and conscious choices. How we move is how we live; and every turn is an applied force toward the future.',
      zh: '《⽇常動⼒學》以企業發展的動能為核心，拆解日常這場複雜細膩的動力學，並讓人看見品牌與個⼈如何透過設計、創新與⾏動選擇，讓每⼀次轉動化為朝理想⽣活前進的⼒量。 我們如何動，就是我們如何活；⽽每⼀次的轉動，都是⼀次對理想未來的施⼒。'
    },
    oneSentenceTakeaway: {
      en: 'Deconstruct everyday kinetic dynamics: how brands and individuals transform mechanical motion and conscious choices into forces for ideal living.',
      zh: '拆解日常生活的細膩動力學，看企業與個人如何透過設計創新，讓每一次轉動都成為推動美好生活的施力。'
    },
    image: '/src/assets/images/expo_industry_teamwork_1791791588435.jpg',
    bufferWalkMinutes: 2,
    distanceMeters: 80,
    thematicCategory: 'Product Design & Everyday Dynamics',
    audioDuration: '2:30',
    audioTranscript: {
      en: 'Welcome to A4: Everyday Dynamics. Look around at the kinetic mechanisms—bicycles, precision blenders, ergonomic chairs, and kinetic watches. Everyday life is a continuous dynamic system where mechanical design meets human habit.',
      zh: '歡迎來到 A4「日常動力學」。環顧四周持續運轉的機械互動構件：從自行車變速齒輪、人體工學椅到智慧廚房。日常生活的本質是一場動能的流轉，設計賦予了機械人性溫度。'
    },
    curatorialStory: {
      en: 'Highlighting how Taiwanese consumer product makers apply kinetic engineering to elevate daily rituals.',
      zh: '呈現台灣民生消費品牌如何以動力學思考切入生活器物，將代工製造昇華為充滿美感的生活力量。'
    },
    whyItMattersByPersona: {
      first_timer: {
        en: 'Discover the hidden mechanical marvels inside everyday appliances we take for granted.',
        zh: '看見平日家裡隨處可見的器物內部精巧構造，體會設計無所不在的魔力。'
      },
      design_student: {
        en: 'Inspect exploded product views, gear ratios, and consumer ergonomics design specs.',
        zh: '細看精密爆炸圖、齒輪模組咬合與消費性產品人體工學設計細節。'
      },
      family: {
        en: 'Kids can turn big physical wheels and pull levers to observe cause-and-effect gear motions.',
        zh: '孩子們可以親手轉動大齒輪、拉動手柄，觀察力學傳遞與連動的趣味科學。'
      },
      local_resident: {
        en: 'Take pride in the everyday household brands designed and produced in local Taoyuan factories.',
        zh: '認識那些低調立足桃園、每天陪伴全台灣甚至全球家庭的優質製造品牌。'
      },
      cultural_hunter: {
        en: 'Reflect on "how we move is how we live"—the kinetic philosophy of modern Taiwanese living.',
        zh: '在「我們如何動，就是我們如何活」的策展哲思中，體會島嶼生活的節奏美感。'
      }
    },
    sensoryFocus: {
      look: { en: 'Sleek exploded mechanical product installations', zh: '懸掛空中的精美產品結構爆炸圖裝置' },
      listen: { en: 'Rhythmic, soothing ticking of precision clockwork and gears', zh: '鐘錶齒輪與精密機械有節奏的運轉微音' },
      touchOrTaste: { en: 'Hands-on interactive mechanical levers and smooth alloy knobs', zh: '可親手旋轉的金屬旋鈕與手感極佳的阻尼開關' }
    },
    microPoll: {
      question: { en: 'Which everyday product design touched your lifestyle most?', zh: '哪種生活器物的動力學設計最讓你心動？' },
      options: [
        { id: 'bike', label: { en: 'Ergonomic Bicycle Mobility', zh: '輕量化自行車通勤動力' }, initialVotes: 510 },
        { id: 'chair', label: { en: 'Adaptive Ergonomic Seating', zh: '貼合人體姿態的工學座椅' }, initialVotes: 480 },
        { id: 'kitchen', label: { en: 'Intuitive Culinary Tools', zh: '極簡高效的智慧廚房器具' }, initialVotes: 360 }
      ]
    },
    mapLocation: {
      x: 45,
      y: 88,
      floor: '1F',
      zoneCode: '1F-SOUTH-CORNER-RIGHT',
    }
  },
  {
    id: 'exhibit_a5',
    code: 'A5',
    subFlowTheme: { en: 'Value Flow', zh: '價值流' },
    dates: '09/24-10/11',
    areaTag: { en: 'Area 1 · Qingpu', zh: '青埔展區 Area 1' },
    venueFloor: { en: 'Messe Taoyuan · 1F South Edge', zh: '桃園會展中心 · 1F 南緣展區 (臨文康路)' },
    pavilionNumber: 'A5',
    venueName: { en: 'Messe Taoyuan · Hall 1F', zh: '桃園會展中心 1F' },
    title: { en: 'Industrial New State', zh: '產業新態' },
    officialDescription: {
      en: '"Industrial New State: NEO PHASE" captures the continuous evolution of industries. Driven by the IDDI program from the Industrial Development Administration, MOEA, it accompanies enterprises to review needs, link resources, break out of existing molds, and turn every transformation into an opportunity toward the future.',
      zh: '《產業新態 NEO PHASE》， 其實就是產業不斷進化的過程。經濟部產發署推動的 IDDI 計畫，就是為了陪著企業重新盤點需求、串聯資源、跳脫既有框框，讓每一次的改變，都成為產業邁向未來的契機。'
    },
    oneSentenceTakeaway: {
      en: 'Witness how Taiwan’s traditional manufacturing champions break out of existing molds with design-driven innovation to create high-value industrial futures.',
      zh: '透過經濟部 IDDI 設計升級陪伴計畫，看台灣製造企業如何跳脫框架，將代工實力昇華為前瞻高價值品牌。'
    },
    image: '/src/assets/images/expo_industry_teamwork_1791791588435.jpg',
    bufferWalkMinutes: 2,
    distanceMeters: 65,
    thematicCategory: 'Industrial Innovation & IDDI Design',
    audioDuration: '2:40',
    audioTranscript: {
      en: 'Welcome to A5: Industrial New State. Taiwan’s hidden champions produce everything from precision metal fasteners to high-grade packaging. Here, design interventions helped them transform from silent subcontractors into visionary global problem solvers.',
      zh: '歡迎來到 A5「產業新態 NEO PHASE」。台灣有許多實力深厚的隱形冠軍。透過設計導入，他們不再只是被動代工，而是主動跳脫框框，重塑品牌價值並引領綠色製造升級。'
    },
    curatorialStory: {
      en: 'Showcasing real case studies from Taiwan’s Industrial Design Driven Innovation (IDDI) initiative, proving design is a vital business accelerator.',
      zh: '由經濟部產業發展署主導，展出 IDDI 計畫輔導之成功標竿企業，展現設計如何直接驅動產業升級與獲利轉型。'
    },
    whyItMattersByPersona: {
      first_timer: {
        en: 'Learn how traditional factories transform into hip, contemporary design brands.',
        zh: '看看老工廠如何華麗變身為充滿年輕活力的當代生活設計品牌。'
      },
      design_student: {
        en: 'Invaluable corporate case studies showing design consultancy workflows, ROI, and stakeholder alignment.',
        zh: '第一手的企業輔導實戰案例，學習設計顧問如何與傳統工程師團隊共創突破。'
      },
      family: {
        en: 'Interactive touch displays show colorful before-and-after packaging and product revamps.',
        zh: '生動有趣的改造前後對比展示，啟發對創意思考的理解。'
      },
      local_resident: {
        en: 'See local manufacturing neighbors proving their global competitiveness through creative innovation.',
        zh: '看見我們桃園在地的工業聚落如何透過設計升級，在國際舞台上持續發光。'
      },
      cultural_hunter: {
        en: 'Reflect on how Taiwanese manufacturing reinvents its cultural identity through craftsmanship.',
        zh: '探討台灣「黑手轉型」背後堅韌踏實的造物哲學與新時代價值。'
      }
    },
    sensoryFocus: {
      look: { en: 'Crisp case-study showcases contrasting raw metals and finished products', zh: '未加工毛胚與設計成品鮮明對比的精緻展台' },
      listen: { en: 'Interviews with passionate founders talking about their turning points', zh: '企業二代與設計師深談轉型突破心路歷程的訪談' },
      touchOrTaste: { en: 'High-precision metal and recycled composite product samples', zh: '可親手拿起檢視的超精密加工零件手感' }
    },
    microPoll: {
      question: { en: 'What is the biggest value of design for manufacturing?', zh: '你認為設計對台灣製造業最重要的價值是什麼？' },
      options: [
        { id: 'brand', label: { en: 'Building Global Brand Identity', zh: '擺脫代工，建立自主國際品牌' }, initialVotes: 620 },
        { id: 'green', label: { en: 'Green Material & ESG Transition', zh: '綠色低碳與循環永續升級' }, initialVotes: 510 },
        { id: 'user', label: { en: 'Better Human-Centered Experience', zh: '以人為本，提升使用者真實體驗' }, initialVotes: 440 }
      ]
    },
    mapLocation: {
      x: 36,
      y: 88,
      floor: '1F',
      zoneCode: '1F-SOUTH-MID-BOTTOM',
    }
  },
  {
    id: 'exhibit_a6',
    code: 'A6',
    subFlowTheme: { en: 'Sustainability Flow', zh: '永續流' },
    dates: '09/24-10/11',
    areaTag: { en: 'Area 1 · Qingpu', zh: '青埔展區 Area 1' },
    venueFloor: { en: 'Messe Taoyuan · 1F South-West Corner', zh: '桃園會展中心 · 1F 西南角展區 (臨文康路與永園路)' },
    pavilionNumber: 'A6',
    venueName: { en: 'Messe Taoyuan · Hall 1F', zh: '桃園會展中心 1F' },
    title: { en: 'TAOPIA: Future Circular Park', zh: '桃〇計畫－未來循環園' },
    officialDescription: {
      en: '"TAOPIA - Future Circular Park" starts from Taoyuan, linking local industries, design innovation, and circular practices to depict a continuously generating future. Starting from life circulation and industrial circulation, exploring how material innovation, green manufacturing, and daily actions collectively shape a sustainable future. Through interactive experiences and circular spatial design, inviting visitors to co-create an evolving circular city.',
      zh: '《 桃〇計畫－未來循環園》以桃園為起點，串聯在地產業、設計創新與循環實踐，描繪一座持續生成的未來想像。展覽從生活循環與產業循環出發，探索材料創新、綠色製程與日常行動如何共同形塑永續未來。透過互動體驗與循環空間設計，邀請觀眾在探索與創造中參與一座不斷演進的循環城市。'
    },
    oneSentenceTakeaway: {
      en: 'Witness how local industrial scrap, recycled oyster shells, and native bamboo are engineered into zero-carbon civic architecture in an evolving circular park.',
      zh: '串聯在地循環產業、綠色製程與材料創新，探索生活循環與產業共生的持續生成城市。'
    },
    image: '/src/assets/images/expo_craft_urban_1791790464927.jpg',
    bufferWalkMinutes: 2,
    distanceMeters: 70,
    thematicCategory: 'Circular Economy & Material Innovation',
    audioDuration: '2:55',
    audioTranscript: {
      en: 'Welcome to A6: TAOPIA. Notice the tactile material cubes on the central plinths. In Taoyuan, discarded oyster shells become antibacterial ceramic tiles, electronic scrap becomes terrazzo tables, and native bamboo replaces steel.',
      zh: '歡迎來到 A6「桃〇計畫－未來循環園」。展台中央展示了材質實驗立方體。在桃園，廢棄牡蠣殼化為抑菌瓷磚、廢電路板壓製成水磨石家具，工程竹材取代鋼構，展現零廢棄的循環未來。'
    },
    curatorialStory: {
      en: 'Depicting a tangible future circular city through zero-waste modular furniture, eco-materials, and life cycles.',
      zh: '本展從生活與產業兩大循環切入，告別口號式環保，以真實的材質美學展示淨零未來的居住空間。'
    },
    whyItMattersByPersona: {
      first_timer: {
        en: 'Recycled materials look remarkably sleek—coffee grounds and sea shells transformed into luxury goods.',
        zh: '打破回收品粗糙的既定印象，看生活廢棄物如何變成優雅極簡的美感器皿。'
      },
      design_student: {
        en: 'Inspect Life Cycle Assessment (LCA) reduction charts alongside 3D-printed bio-composite joinery.',
        zh: '研讀每件展品的生命週期評估（LCA）數據，深入探索生物基材料與循環結構工法。'
      },
      family: {
        en: 'Tactile sample wall where kids can touch oyster tiles, mycelium bricks, and bamboo ropes.',
        zh: '全場最棒的觸覺探索區：孩子們可以親手碰觸菌絲體發泡磚、光潔貝殼瓷磚與天然竹纖維。'
      },
      local_resident: {
        en: 'Discover how industrial zones in Guanyin and Dayuan right next door are leading global circular tech.',
        zh: '驚喜發現原來就在觀音與大園的在地企業，早已是引領全球綠色循環工藝的隱形推手。'
      },
      cultural_hunter: {
        en: 'Witness indigenous bamboo weaving knowledge meeting cutting-edge circular engineering.',
        zh: '見證古老原住民劈竹編織工法，如何跨時空為當代抗震低碳綠建築提供解答。'
      }
    },
    sensoryFocus: {
      look: { en: 'Precision architectural miniatures and geometric bamboo weaves', zh: '精巧的建築微縮模型與竹篾幾何織紋' },
      listen: { en: 'Field recordings of coastal winds and workshop wood planes', zh: '收錄自桃園海岸風力發電機與木藝刨刀的節奏聲' },
      touchOrTaste: { en: 'Tactile material wall: bio-composites, recycled glass, mycelium', zh: '全開放觸摸的生物基複合材、再生玻璃砂與菌絲體' }
    },
    microPoll: {
      question: { en: 'Which circular material would you most like in your home?', zh: '你最希望哪種循環材料走進你的日常居家？' },
      options: [
        { id: 'bamboo', label: { en: 'Engineered Bamboo Furniture', zh: '高強度工程竹藝家具' }, initialVotes: 590 },
        { id: 'oyster', label: { en: 'Oyster Shell Ceramic Tiles', zh: '蚵殼粉防潮抑菌地磚' }, initialVotes: 430 },
        { id: 'mycelium', label: { en: 'Biodegradable Mycelium Lamps', zh: '自然分解菌絲體燈飾' }, initialVotes: 350 }
      ]
    },
    mapLocation: {
      x: 26,
      y: 88,
      floor: '1F',
      zoneCode: '1F-SOUTH-CORNER-LEFT',
    }
  },
  {
    id: 'exhibit_a7',
    code: 'A7',
    subFlowTheme: { en: 'Market Pulse Flow', zh: '賣動流' },
    dates: '09/24-10/11',
    areaTag: { en: 'Area 1 · Qingpu', zh: '青埔展區 Area 1' },
    venueFloor: { en: 'Messe Taoyuan · 1F South-West Wing', zh: '桃園會展中心 · 1F 西南翼展區' },
    pavilionNumber: 'A7',
    venueName: { en: 'Messe Taoyuan · Hall 1F', zh: '桃園會展中心 1F' },
    title: { en: 'Good Market, Good Show', zh: '好市有戲' },
    officialDescription: {
      en: '"Good Market, Good Show" sets out from Taoyuan, stepping into representative Taiwanese commercial districts and markets. Through perspectives of operators, consumers, and designers, witness how design drives market pulses, connecting people, places, and services to display collective vitality. Those stories of design, space, and people are quietly transforming market landscapes. Walk into "Good Market, Good Show"—see who takes the stage today?',
      zh: '《好市有戲》從桃園出發，走進台灣代表性商圈與市場，透過經營者、消費者、設計師等不同視角，看見設計驅動商圈脈動，串連人、場域與服務，凝聚多元角色，共同展現好市齊鳴。那些關於設計、空間與人的故事，正悄悄改變商圈與市場的日常風景。走進《好市有戲》，一起看看今天有誰粉墨登場？'
    },
    oneSentenceTakeaway: {
      en: 'Step into the theatrical aroma of Taiwanese neighborhood markets, seeing how design drives commercial districts, connecting stalls, shoppers, and street stories.',
      zh: '走進熱鬧商圈與傳統市場，從經營者、設計師視角看見設計如何驅動市集脈動，展現常民生活劇場。'
    },
    image: '/src/assets/images/expo_food_identity_1791790428298.jpg',
    bufferWalkMinutes: 2,
    distanceMeters: 65,
    thematicCategory: 'Gastronomy, Culture & Market Design',
    audioDuration: '3:05',
    audioTranscript: {
      en: 'You’ve reached A7: Good Market, Good Show. Smell that warm hint of roasted oolong and aged Hakka pickled greens? This exhibition transforms the chaotic vitality of Taiwanese traditional markets into a living design stage with modular carts and clear visual pricing.',
      zh: '你已抵達 A7「好市有戲」。聞到了炭焙烏龍與老梅乾菜的醇厚香氣嗎？本展將台灣傳統市場熱鬧喧騰的生活力，轉譯為極富戲劇張力的設計現場，展出新式模組化攤車與美感招牌標示。'
    },
    curatorialStory: {
      en: 'Celebrating market stalls as vital community hubs, demonstrating how environmental design revitalizes traditional retail vitality.',
      zh: '走進全台指標性商圈與菜市場，見證設計如何不破壞人情味的前提下，讓傳統市集煥然一新。'
    },
    whyItMattersByPersona: {
      first_timer: {
        en: 'The warmest, most welcoming stop: explore colorful market signs and sniff fermented terroir tea jars.',
        zh: '全場最療癒溫暖的站點：拿起展台試嗅盅，感受最熟悉的家鄉市場氣味與純粹美好。'
      },
      design_student: {
        en: 'Study mobile retail architecture, signage typography standards, and service design customer journey maps.',
        zh: '研究微型零售空間模組、常民招牌字體設計規範與商圈服務設計動線圖。'
      },
      family: {
        en: 'Kids love stamping interactive market seals and exploring miniature stall mockups.',
        zh: '孩子們最愛充滿童趣的菜市場角色印章，還能親手扮演小小市場攤商。'
      },
      local_resident: {
        en: 'Spot recognizable stalls from Taoyuan and Zhongli markets presented with pride.',
        zh: '看見我們每週光顧的中壢新明市場與桃園在地老攤，被賦予兼具人情味與現代感的新生命。'
      },
      cultural_hunter: {
        en: 'Trace the social anthropology of neighborhood morning markets and Hakka food preservation.',
        zh: '細品客家醃漬智慧與菜市場常民社群的人類學深厚底蘊。'
      }
    },
    sensoryFocus: {
      look: { en: 'Luminous amber jars of fermented teas and market neon signage', zh: '背光發酵玻璃罐的琥珀光澤與當代霓虹招牌' },
      listen: { en: 'Brisk marketplace ambient soundscapes and sizzling woks', zh: '小販親切吆喝與熱氣蒸騰的市井環境原音' },
      touchOrTaste: { en: 'Cold-brew honey black tea micro-dropper tasting station', zh: '展位末端提供的在地蜜香紅茶冷萃微量品飲' }
    },
    microPoll: {
      question: { en: 'Which market flavor best represents Taiwan to you?', zh: '哪一種市集氣味最能代表你心中的台灣？' },
      options: [
        { id: 'tea', label: { en: 'Roasted Oolong & Dried Tea Leaves', zh: '炭焙烏龍與高山茶乾清香' }, initialVotes: 680 },
        { id: 'hakka', label: { en: 'Aged Hakka Preserved Mustard (福菜)', zh: '客家老福菜與醇厚醬缸香' }, initialVotes: 490 },
        { id: 'sesame', label: { en: 'Toasted Sesame Oil & Street Garlic', zh: '麻油爆香與街頭鑊氣蒜香' }, initialVotes: 420 }
      ]
    },
    mapLocation: {
      x: 31,
      y: 76,
      floor: '1F',
      zoneCode: '1F-SOUTH-WEST-INNER',
    }
  },
  {
    id: 'exhibit_a8',
    code: 'A8',
    subFlowTheme: { en: 'Smart Manufacturing Flow', zh: '智造流' },
    dates: '09/24-10/11',
    areaTag: { en: 'Area 1 · Qingpu', zh: '青埔展區 Area 1' },
    venueFloor: { en: 'Messe Taoyuan · 1F West Wing', zh: '桃園會展中心 · 1F 西側大廳 (臨永園路)' },
    pavilionNumber: 'A8',
    venueName: { en: 'Messe Taoyuan · Hall 1F', zh: '桃園會展中心 1F' },
    title: { en: '24HR Running the World', zh: '24HR 運轉全世界' },
    officialDescription: {
      en: 'Taoyuan, as Taiwan’s vital manufacturing base and international gateway, has evolved into a global supply chain hub. The exhibition centers on "24HR Running the World · Taoyuan Teamwork", charting 4 manufacturing systems across 7 key sectors, spanning livelihood manufacturing, high-tech hardware, energy, mobility, logistics, and aviation, linking Taiwan to the world non-stop.',
      zh: '桃園，作為臺灣重要的製造基地與對外連結城市，如今已轉型為全球供應鏈樞紐。本展以「24HR 運轉全世界・Taoyuan Teamwork」為主軸，盤點製造產業四大系統與七大產業面向，涵蓋民生製造、高科技製造，到能源、交通、物流與航空等不同領域，產業彼此串聯，形成完整的供應鏈，也讓桃園從製造基地逐步成為連結臺灣與世界的重要節點。'
    },
    oneSentenceTakeaway: {
      en: 'Map out 4 industrial systems and 7 global supply sectors, uncovering how Taoyuan powers international aviation and precision high-tech 24/7 non-stop.',
      zh: '盤點四大製造系統與七大關鍵產業面向，見證桃園如何作為永不眠的世界樞紐，24 小時運轉全球供應鏈。'
    },
    image: '/src/assets/images/expo_industry_teamwork_1791791588435.jpg',
    bufferWalkMinutes: 2,
    distanceMeters: 75,
    thematicCategory: 'Global Supply Chain & Industrial Design',
    audioDuration: '2:50',
    audioTranscript: {
      en: 'Welcome to A8: 24HR Running the World. Beneath your feet is a glowing airport runway blueprint. Around you are titanium jet turbine parts and automotive powertrain castings. Taoyuan generates over 3 trillion NTD in manufacturing output every year.',
      zh: '歡迎來到 A8「24HR 運轉全世界」。腳下發光的藍色工程圖網格，宛如桃園國際機場深邃的夜間跑道。展台展示了精密切削的航太渦輪葉片、半導體晶圓載具與電動車動力總成，呈現 24 小時不停歇的智造心跳。'
    },
    curatorialStory: {
      en: 'Revealing the unsung engineering champions across aerospace, automotive, electronics, and global air freight.',
      zh: '以冷冽震撼的未來工業設計美學，呈現桃園如何從傳統工廠聚落，躍升為全球高科技與航太供應鏈的關鍵心臟。'
    },
    whyItMattersByPersona: {
      first_timer: {
        en: 'Walk over the glowing aerospace blueprint floor and see gigantic airplane turbine engines up close.',
        zh: '踏上發光的航太跑道地坪，近距離目睹巨大的飛機引擎金屬葉片，極具震撼力。'
      },
      design_student: {
        en: 'Analyze micron-level CNC tolerances, metal surface anodizing, and industrial ergonomics.',
        zh: '觀察航太級金屬表面處理與微米級公差工藝，學習重工業設備如何導入極簡人體工學。'
      },
      family: {
        en: 'Children love the miniature automated logistics robot model and neon runway floor grids.',
        zh: '發光跑道地坪與迷你自動化無人分揀機器人模型，讓孩子們目不轉睛，啟發對科技的好奇。'
      },
      local_resident: {
        en: 'Feel pride in knowing parts inside Boeing jets, Tesla EVs, and smartphones are made right here in Taoyuan.',
        zh: '滿滿的在地自豪感：波音客機、特斯拉與頂級手機裡的關鍵零件，正是我們桃園子弟日夜打磨的心血。'
      },
      cultural_hunter: {
        en: 'Reflect on how modern factory teamwork inherits Taiwan’s deep cultural spirit of collective diligence.',
        zh: '看現代化跨國供應鏈如何延續台灣庶民文化中刻苦耐勞、齊心協力的「黑手精神」與堅韌靈魂。'
      }
    },
    sensoryFocus: {
      look: { en: 'Luminous blue floor grids and gleaming precision titanium metals', zh: '夜光藍色跑道地圖與金屬航太零件的冷冽高光' },
      listen: { en: 'Rhythmic mechanical hum of automated CNC machines and jet turbines', zh: '精密 CNC 車床運轉與噴射發動機低沉平穩的音場' },
      touchOrTaste: { en: 'Anodized aerospace aluminum tactile sample blocks', zh: '手持體驗經微米噴砂陽極處理的航太級鋁合金試塊' }
    },
    microPoll: {
      question: { en: 'Which Taoyuan industry sector surprised you most?', zh: '哪一個桃園在地產業聚落的實力最令你驚訝？' },
      options: [
        { id: 'aero', label: { en: 'Aerospace & Aircraft Maintenance', zh: '航太零組件與航空維修中心' }, initialVotes: 710 },
        { id: 'semi', label: { en: 'Semiconductor Precision Hardware', zh: '半導體高階精密耗材與載具' }, initialVotes: 540 },
        { id: 'ev', label: { en: 'Smart Electric Vehicle Powertrain', zh: '智慧電動車動力總成與線束' }, initialVotes: 390 }
      ]
    },
    mapLocation: {
      x: 28,
      y: 65,
      floor: '1F',
      zoneCode: '1F-WEST-MAIN',
    }
  },
  {
    id: 'exhibit_a9',
    code: 'A9',
    subFlowTheme: { en: 'Action Flow', zh: '行動流' },
    dates: '09/24-10/11',
    areaTag: { en: 'Area 1 · Qingpu', zh: '青埔展區 Area 1' },
    venueFloor: { en: 'Messe Taoyuan · 1F Mid-West Wing', zh: '桃園會展中心 · 1F 中西展廳' },
    pavilionNumber: 'A9',
    venueName: { en: 'Messe Taoyuan · Hall 1F', zh: '桃園會展中心 1F' },
    title: { en: 'Taoyuan Algorithm Lab', zh: '桃園演算室' },
    officialDescription: {
      en: 'In a city where the digital and physical intertwine, daily actions continually participate in environmental computation. "Taoyuan Algorithm Lab" translates energy and carbon emissions into data, inviting audiences to become computational operators whose real-time choices affect collective results, recoding the city’s Net Zero future.',
      zh: '在數位與實體交織的城市中，日常行為正持續參與環境運算。《桃園演算室》以數據轉譯能源與碳排，讓觀眾成為演算員，透過選擇即時影響結果，將個體行動匯聚為集體力量，重新編碼城市的淨零未來。'
    },
    oneSentenceTakeaway: {
      en: 'Become a data operator in an interactive algorithmic chamber, translating everyday energy choices into collective code for a Net Zero future.',
      zh: '化身數據演算員，在即時運算場域中以個人日常選擇影響碳排數據，共同編碼城市的淨零未來。'
    },
    image: '/src/assets/images/expo_interactive_light_1791790446733.jpg',
    bufferWalkMinutes: 2,
    distanceMeters: 60,
    thematicCategory: 'Data Art, Energy & Net Zero Coding',
    audioDuration: '2:25',
    audioTranscript: {
      en: 'Welcome to A9: Taoyuan Algorithm Lab. Every decision you make—how you commute, your AC temperature, what food you eat—is continuously calculated. On these illuminated consoles, submit your daily choices and watch the environmental projection ripple in real time.',
      zh: '歡迎來到 A9「桃園演算室」。每一次你選擇搭乘捷運、設定冷氣溫度、選擇在地蔬果，都在為這座城市的碳排演算法輸入參數。站在主控台前做出選擇，親眼見證光影數據流如何為淨零轉變。'
    },
    curatorialStory: {
      en: 'Transforming invisible carbon emissions and energy flows into intuitive, generative digital media artworks.',
      zh: '將冷硬的淨零碳排數據轉化為詩意且富互動性的新媒體藝術，讓公民意識成為驅動改變的力量。'
    },
    whyItMattersByPersona: {
      first_timer: {
        en: 'Super engaging interactive light displays that respond instantly as you walk past sensor pillars.',
        zh: '感測光柱隨腳步與手勢即時互動，讓環保科技變得非常炫酷有趣。'
      },
      design_student: {
        en: 'Observe generative data visualization UI/UX, responsive TouchDesigner workflows, and live data feeds.',
        zh: '學習即時生成式數據視覺化架構，看算力如何轉化為打動人心的互動介面。'
      },
      family: {
        en: 'Kids learn environmental stewardship by hitting interactive choice buttons to make digital trees grow.',
        zh: '寓教於樂的最佳站點：孩子們按下綠色生活按鈕，就能看見數位森林在展牆上茂密生長。'
      },
      local_resident: {
        en: 'See live telemetry from Taoyuan solar farms, coastal wind turbines, and airport energy monitors.',
        zh: '看見桃園濱海風力發電與埤塘太陽光電的即時運算數據，感受城市的綠能轉型。'
      },
      cultural_hunter: {
        en: 'Contemplate how human free will interacts with digital algorithms in contemporary civic spaces.',
        zh: '思考個人抉擇與群體共好在數位時代中的深層哲學連結。'
      }
    },
    sensoryFocus: {
      look: { en: 'Cascading digital code streams transforming into luminous green leaves', zh: '如瀑布般傾瀉的綠光數據流匯聚成繁茂樹影' },
      listen: { en: 'Minimalist synthetic chords reacting dynamically to user inputs', zh: '隨參觀者選擇動態變奏的簡約電子和弦' },
      touchOrTaste: { en: 'Sleek capacitive touch switches on the central algorithm console', zh: '中央演算台上的電容式觸控開關回饋手感' }
    },
    microPoll: {
      question: { en: 'Which Net Zero action do you commit to daily?', zh: '你在日常生活中最願意堅持哪項淨零行動？' },
      options: [
        { id: 'transit', label: { en: 'Public Transit & Cycling', zh: '搭乘大眾捷運與綠色騎行' }, initialVotes: 610 },
        { id: 'local_food', label: { en: 'Low-Carbon Local Eating', zh: '優先選購在地風土低碳食材' }, initialVotes: 520 },
        { id: 'reuse', label: { en: 'Zero-Waste Cup & Bags', zh: '自備餐具與減塑循環生活' }, initialVotes: 430 }
      ]
    },
    mapLocation: {
      x: 28,
      y: 48,
      floor: '1F',
      zoneCode: '1F-MID-LEFT',
    }
  },
  {
    id: 'exhibit_a10',
    code: 'A10',
    subFlowTheme: { en: 'Circulation Flow', zh: '循環流' },
    dates: '09/24-10/11',
    areaTag: { en: 'Area 1 · Qingpu', zh: '青埔展區 Area 1' },
    venueFloor: { en: 'Messe Taoyuan · 1F North-West Wing', zh: '桃園會展中心 · 1F 西北展區' },
    pavilionNumber: 'A10',
    venueName: { en: 'Messe Taoyuan · Hall 1F', zh: '桃園會展中心 1F' },
    title: { en: 'The Way of Water', zh: '水之道' },
    officialDescription: {
      en: 'Ripples, confluence, infinity—the urban way of coexisting with water. "Life Around Water" traces the complete journey of water in the city, uncovering the wisdom of human-water symbiosis and the infinite possibilities of a sustainable urban future.',
      zh: '漣漪、匯聚、無限，與水共生的城市之道。 水之道 Life Around Water，遇見水在城市的完整旅程，看見人與水共生的智慧，也看見城市邁向永續未來的無限可能。'
    },
    oneSentenceTakeaway: {
      en: 'Trace the complete journey of water in the city—from Shimen Reservoir and irrigation ponds to ecological sponge urbanism.',
      zh: '漣漪、匯聚、無限，遇見水在城市的完整生命旅程，看見人水共生的永續智慧。'
    },
    image: '/src/assets/images/expo_interactive_light_1791790446733.jpg',
    bufferWalkMinutes: 2,
    distanceMeters: 65,
    thematicCategory: 'Hydrology, Ecology & Civic Design',
    audioDuration: '2:30',
    audioTranscript: {
      en: 'Step into A10: The Way of Water. Before municipal pipes existed, Taoyuan had over ten thousand irrigation ponds. This exhibition traces the mountain spring droplets from Shimen Reservoir, through agricultural canals, to urban sponge parks.',
      zh: '走進 A10「水之道」。石門水庫的水脈如何流經大漢溪，再由重力牽引灌溉千座埤塘？展覽透過水霧、冷凝與水文模型，呈現水在桃園的完整生命歷程。'
    },
    curatorialStory: {
      en: 'Water is the living breath of Taoyuan. "Life Around Water" explores hydrology as an inspiration for future sponge cities.',
      zh: '千塘之鄉的靈魂在於水。本展探索如何將古老水利智慧轉化為調節現代極端氣候的韌性城市設計。'
    },
    whyItMattersByPersona: {
      first_timer: {
        en: 'The cool mist and ambient water soundscapes create the most calming and serene rest spot in the entire exhibition.',
        zh: '微米水霧與潺潺水聲營造出全場最靜心舒壓的空間，是逛展途中最佳的精神療癒站。'
      },
      design_student: {
        en: 'Observe the interactive physical model demonstrating passive stormwater detention and biological filtration cells.',
        zh: '觀察物理流體模型如何演示低衝擊開發（LID）滯洪沉沙池與生態濾池的自然工法設計。'
      },
      family: {
        en: 'Kids love waving their hands over the interactive water mist projection to see water droplets coalesce into virtual ripples.',
        zh: '孩子們最喜歡在涼爽的水霧投影前揮舞雙手，看虛擬水滴在空中凝結擴散的奇妙效果。'
      },
      local_resident: {
        en: 'Find the pond where your grandparents fished or farmed on the giant illuminated historical map of Taoyuan’s ponds.',
        zh: '在巨幅背光埤塘歷史地圖上，找找老家附近那口陪伴幾代人童年記憶的家族老池塘。'
      },
      cultural_hunter: {
        en: 'Learn the sacred Hakka and indigenous rites honoring water deities and spring waterheads in the foothills.',
        zh: '探讀文獻中客家水官祭典與原住民族敬畏水源地（水頭）的古老生態信仰與天地倫理。'
      }
    },
    sensoryFocus: {
      look: { en: 'Ethereal mist drifting over illuminated contour topography maps', zh: '輕柔水霧拂過發光等高線地形模型' },
      listen: { en: 'Binaural sound of Shimen mountain waterfalls and stream ripples', zh: '石門深山瀑布與清溪流水的純淨白噪音' },
      touchOrTaste: { en: 'Ultra-fine cool aerosol mist cooling the gallery air', zh: '展間中極微細水霧帶來絲絲沁人心脾的涼意' }
    },
    microPoll: {
      question: { en: 'What role should historic ponds play in future Taoyuan?', zh: '你認為百年埤塘在未來的桃園應該扮演什麼角色？' },
      options: [
        { id: 'park', label: { en: 'Eco-Park & Wildlife Sanctuary', zh: '生態綠帶與水鳥棲息庇護所' }, initialVotes: 620 },
        { id: 'cooling', label: { en: 'Urban Climate Cooling & Flood Buffer', zh: '都市降溫調節與海綿滯洪池' }, initialVotes: 480 },
        { id: 'culture', label: { en: 'Cultural Memory & Community Gathering', zh: '常民記憶與親水社區散步聚落' }, initialVotes: 360 }
      ]
    },
    mapLocation: {
      x: 26,
      y: 32,
      floor: '1F',
      zoneCode: '1F-NORTH-WEST-MID',
    }
  },
  {
    id: 'exhibit_a11',
    code: 'A11',
    subFlowTheme: { en: 'Voices Flow', zh: '眾聲流' },
    dates: '09/24-10/11',
    areaTag: { en: 'Area 1 · Qingpu', zh: '青埔展區 Area 1' },
    venueFloor: { en: 'Messe Taoyuan · 1F North-West Corner', zh: '桃園會展中心 · 1F 西北角展廳 (臨環溪一街與永園路)' },
    pavilionNumber: 'A11',
    venueName: { en: 'Messe Taoyuan · Hall 1F', zh: '桃園會展中心 1F' },
    title: { en: 'Culture Well-being · In Progress', zh: '文化Well-being・＿＿ 生成中' },
    officialDescription: {
      en: '"Culture Well-being · In Progress" is human-centered. Design is stepping into Taoyuan’s everyday streets, translating living experiences of diverse generations into landscapes of livable happiness. This is not a "finished" Taoyuan; the underline intentionally left in the title is for every resident and visitor to fill in together, as a continuously generating proposition for urban living.',
      zh: '文化Well-being・＿＿ 生成中，以人為本，設計正走入桃園的街廓日常，將多元世代的生活經驗轉譯為宜居的幸福風景。這裡不是一座「已完成」的桃園，標題刻意留下的底線，交由每一位定居與造訪此地的人共同填寫，成為一題持續生成中的城市生活命題。'
    },
    oneSentenceTakeaway: {
      en: 'Translate multi-generational living and immigrant cultures into everyday civic well-being, leaving the blanks for citizens to define together.',
      zh: '以人為本，將多元世代的生活經驗轉譯為宜居幸福風景，留下空白由眾人共同填寫。'
    },
    image: '/src/assets/images/expo_taoyuan_pov_1791791600960.jpg',
    bufferWalkMinutes: 2,
    distanceMeters: 60,
    thematicCategory: 'Community Well-Being & Inclusive Civic Life',
    audioDuration: '2:45',
    audioTranscript: {
      en: 'Welcome to A11: Culture Well-being · In Progress. Notice the underline in the title. Taoyuan is never a static, finished city. Here, seniors, newcomers, children, and artists share their stories through interactive tactile letters and audio memoirs.',
      zh: '歡迎來到 A11「文化Well-being・＿＿ 生成中」。請留意標題刻意留下的底線。桃園從不是一座靜止、定型的城市，長者、新住民青年與孩子在這裡用手寫明信片與口述錄音，共同書寫生活的幸福定義。'
    },
    curatorialStory: {
      en: 'Exploring social design as an empathy bridge connecting healthcare, intergenerational living, and cultural inclusion.',
      zh: '透過社會設計介入社區長照、多元族群共融與兒童友善環境，打造持續生成的幸福城市藍圖。'
    },
    whyItMattersByPersona: {
      first_timer: {
        en: 'Write your own wish on the interactive magnetic blank wall to complete the sentence "Culture Well-being is ______".',
        zh: '在互動磁吸心願牆上，親手填寫你心中的「文化Well-being 是 ______」。'
      },
      design_student: {
        en: 'Observe social design frameworks addressing aged care, healthcare graphics, and immigrant inclusion.',
        zh: '觀摩社會設計（Social Design）如何跨界醫療照護、社福機構與跨族群文化轉譯。'
      },
      family: {
        en: 'Warm, cozy reading and soft tactile play nooks where parents and kids can rest and listen to stories.',
        zh: '溫馨舒適的共讀軟墊角，家長可以帶著孩子安靜歇息，聆聽溫暖的在地繪本故事。'
      },
      local_resident: {
        en: 'Hear authentic oral memories from elders in Taoyuan’s villages and military dependents\' communities.',
        zh: '細聽來自桃園眷村、客庄與沿海聚落長輩的溫暖口述記憶，備感親切。'
      },
      cultural_hunter: {
        en: 'Discover how Southeast Asian communities bring vibrant culinary and textile arts into Taoyuan.',
        zh: '見證東南亞新住民聚落的傳統織品與生活哲學，如何豐富台灣當代多元文化光譜。'
      }
    },
    sensoryFocus: {
      look: { en: 'Luminous community photo essays and handwritten wooden message tiles', zh: '溫暖的常民生活紀實攝影與手寫木質留話牌' },
      listen: { en: 'Intimate whispers and laughter of intergenerational oral histories', zh: '跨世代溫柔對話與老街日常笑語的原音錄音' },
      touchOrTaste: { en: 'Warm tactile felt cushions and custom wooden stamp blanks', zh: '溫暖的毛氈軟墊觸感與客製化填空蓋印體驗' }
    },
    microPoll: {
      question: { en: 'What defines true cultural well-being for you?', zh: '對你而言，什麼最能代表「文化的幸福感（Well-being）」？' },
      options: [
        { id: 'inclusive', label: { en: 'Welcoming & Multi-Ethnic Inclusion', zh: '多元包容、友善接納不同族群' }, initialVotes: 640 },
        { id: 'safe_streets', label: { en: 'Safe, Green, Walkable Streets', zh: '安全、綠意、步調舒適的街廓' }, initialVotes: 580 },
        { id: 'intergen', label: { en: 'Warm Intergenerational Support', zh: '老幼共融、彼此守望的溫暖互助' }, initialVotes: 420 }
      ]
    },
    mapLocation: {
      x: 28,
      y: 17,
      floor: '1F',
      zoneCode: '1F-NORTH-WEST-CORNER',
    }
  },
  {
    id: 'exhibit_a12',
    code: 'A12',
    subFlowTheme: { en: 'Emerging Flow', zh: '新銳流' },
    dates: '09/24-10/11',
    areaTag: { en: 'Area 1 · Qingpu', zh: '青埔展區 Area 1' },
    venueFloor: { en: 'Messe Taoyuan · 1F Mid-North Wing', zh: '桃園會展中心 · 1F 中北展區' },
    pavilionNumber: 'A12',
    venueName: { en: 'Messe Taoyuan · Hall 1F', zh: '桃園會展中心 1F' },
    title: { en: 'Shaping Taoyuan: City-Making in Progress', zh: '漸構桃園：造城進行式' },
    officialDescription: {
      en: 'Themed "Shaping Taoyuan: City-Making in Progress", gathering youth design, international perspective, and urban action. Through exhibitions, co-creation workshops, and forums, presenting how the youth generation responds with design to urban development, social needs, and future life, exploring Taoyuan’s characteristics and future vision to shape an evolving city.',
      zh: '以《漸構桃園：造城進行式》為主題，匯聚青年設計、國際視野與城市行動，透過展覽、共創工作坊及論壇交流，呈現青年世代如何以設計回應城市發展、社會需求與未來生活，共同探索桃園的城市特色與未來願景，形塑持續生成中的城市新樣貌。'
    },
    oneSentenceTakeaway: {
      en: 'Gather youth designers, international perspectives, and urban actions, responding to city expansion with innovative spatial prototypes.',
      zh: '匯聚青年設計與城市行動，透過共創工作坊與微型建築實驗，探索持續生成中的理想城市新樣貌。'
    },
    image: '/src/assets/images/expo_craft_urban_1791790464927.jpg',
    bufferWalkMinutes: 2,
    distanceMeters: 65,
    thematicCategory: 'Architecture & Future Urbanism',
    audioDuration: '2:40',
    audioTranscript: {
      en: 'Welcome to A12: Shaping Taoyuan. Emerging architects and tactical urban designers propose micro-apartments, stroller-friendly streets, and reclaimed public spaces for Taiwan’s fastest-growing young metropolis.',
      zh: '歡迎來到 A12「漸構桃園：造城進行式」。新銳建築師與青年設計團隊在此展示彈性模組公寓、通學步道重塑與屋頂社區農園模型，展現年輕世代對未來家園的無畏想像。'
    },
    curatorialStory: {
      en: 'Empowering young designers to propose spatial solutions that challenge standard commercial real estate paradigms.',
      zh: '集結 30 餘位新世代建築青年，以設計回應城市擴張與社會住宅需求，共繪理想棲居。'
    },
    whyItMattersByPersona: {
      first_timer: {
        en: 'The architectural models look like miniature dreamhouses—inspiring and easy to visualize your ideal neighborhood.',
        zh: '展出的模型就像一座座縮小版未來理想城市，讓人對未來的居住生活充滿憧憬與想像。'
      },
      design_student: {
        en: 'Examine detailed floorplans, section drawings, and tactical urbanism intervention guides designed by young peers.',
        zh: '研讀剖面圖、動線軸測圖與戰術都市主義（Tactical Urbanism）操作手冊，是極佳的專業觀摩案例。'
      },
      family: {
        en: 'Check out the "Safe Walk to School" and park playground proposals designed specifically for strollers and children.',
        zh: '特別規劃的「安心通學廊道」與無階梯親子共融遊樂場方案，切中每個育兒家庭最深切的期盼。'
      },
      local_resident: {
        en: 'Discover revitalization blueprints for older neighborhoods in Zhongli, Taoyuan Old District, and Daxi.',
        zh: '看見中壢舊城區、桃園火車站周邊與大溪老街周邊活化方案，為我們身處的街廓帶來新希望。'
      },
      cultural_hunter: {
        en: 'Notice how urban renewal proposals preserve historic railway worker dormitories and multi-generational communal kitchens.',
        zh: '欣見設計團隊在造城過程中，悉心保留了鐵道舊宿舍群記憶與跨族群共煮廚房等珍貴文化節點。'
      }
    },
    sensoryFocus: {
      look: { en: 'Detailed laser-cut architectural models and neighborhood drawings', zh: '精巧的雷射切削木造模型與手繪街廓透視圖' },
      listen: { en: 'Recorded interviews with young residents and neighborhood elders', zh: '年輕移居者與在地耆老暢談理想家園的訪談音軌' },
      touchOrTaste: { en: 'Interactive magnetic board where visitors assemble modular rooms', zh: '可親手拼貼理想生活單元的磁吸式互動模組牆' }
    },
    microPoll: {
      question: { en: 'Which urban feature matters most for Taoyuan’s future?', zh: '你認為未來桃園最急需改善或增加哪項設計？' },
      options: [
        { id: 'walk', label: { en: 'Continuous Pedestrian-First Sidewalks', zh: '平整連續的人行道與通學步道' }, initialVotes: 820 },
        { id: 'green', label: { en: 'Pocket Parks & Shaded Public Squares', zh: '綠意遮蔭口袋公園與公共廣場' }, initialVotes: 510 },
        { id: 'transit', label: { en: 'Affordable Youth Housing & MRT Hubs', zh: '青年平價友善住宅與捷運共構' }, initialVotes: 440 }
      ]
    },
    mapLocation: {
      x: 41,
      y: 32,
      floor: '1F',
      zoneCode: '1F-NORTH-MID-RIGHT',
    }
  },
  {
    id: 'exhibit_a13',
    code: 'A13',
    subFlowTheme: { en: 'International Flow', zh: '國際流' },
    dates: '09/24-10/11',
    areaTag: { en: 'Area 1 · Qingpu', zh: '青埔展區 Area 1' },
    venueFloor: { en: 'Messe Taoyuan · 1F North Wing', zh: '桃園會展中心 · 1F 北翼特展廊道 (D6 展廳下方)' },
    pavilionNumber: 'A13',
    venueName: { en: 'Messe Taoyuan · Hall 1F', zh: '桃園會展中心 1F' },
    title: { en: '#TaoyuanPOV: International Flow', zh: '#桃園POV' },
    officialDescription: {
      en: 'Taoyuan is Taiwan’s vital gateway to the world and the starting point for Taiwan to connect internationally. The exhibition gathers global and local design viewpoints, crossing diverse cultural backgrounds and creative thinking to redraw Taoyuan’s urban imagery. Using design as language, showcasing Taoyuan’s charm in connecting the world and shaping the future.',
      zh: '桃園是世界進入臺灣的重要入口，也是臺灣向世界交流的起點。本展匯聚全球與在地設計觀點，透過不同文化背景與創意思維的交會，重新描繪桃園城市意象。以設計為語言，展現桃園連結世界、創造未來的城市魅力。'
    },
    oneSentenceTakeaway: {
      en: 'Experience bold contemporary posters and global visual identities, challenging urban stereotypes through fresh international design lenses.',
      zh: '匯聚全球與在地設計師的多元鏡頭，用大膽視覺海報與當代平面語彙，重新描摹桃園連結世界的城市意象。'
    },
    image: '/src/assets/images/expo_taoyuan_pov_1791791600960.jpg',
    bufferWalkMinutes: 2,
    distanceMeters: 60,
    thematicCategory: 'Graphic Design & Global Perspectives',
    audioDuration: '2:20',
    audioTranscript: {
      en: 'Welcome to A13: #TaoyuanPOV. Top designers from Tokyo, Berlin, Seoul, and Taiwan explored Taoyuan for 48 hours to create original poster identities. From neon night-market Hanzi typefaces to aeronautical runway grids, discover this international gateway with fresh eyes.',
      zh: '歡迎來到 A13「#桃園POV」。策展團隊邀請來自東京、柏林、首爾與台灣本地頂尖設計師，以各自獨特的「視角（POV）」創作當代海報。從繁複的夜市手寫招牌，到極簡航太幾何，展現桃園與世界對話的自信魅力。'
    },
    curatorialStory: {
      en: 'Celebrating graphic design as a bridge of civic empathy, reframing Taoyuan from an industrial hub into a vibrant global cultural crossroads.',
      zh: '打破「工業城缺乏美感」的刻板偏見，用當代平面美學為桃園提煉出自信迷人的國際形象識別。'
    },
    whyItMattersByPersona: {
      first_timer: {
        en: 'A pure visual feast: bold colors, clever graphic puns, and posters you’ll want to hang in your living room.',
        zh: '純粹的視覺饗宴：色彩鮮豔強烈、構圖巧思妙趣橫生，讓人忍不住想買回家裝裱的海報大賞。'
      },
      design_student: {
        en: 'Masterclass in bilingual typography: observe how Hanzi characters interact with Latin typefaces across different weights.',
        zh: '雙語字體排印的教科書級示範：細細觀察漢字與歐文字體在留白、灰度與筆畫張力上的精湛對話。'
      },
      family: {
        en: 'Take photos with the oversized colorful typographic letters hanging in the center of the gallery floor.',
        zh: '展場中央懸掛的巨型立體字母裝置非常活潑，是全家合影打卡的歡樂角落。'
      },
      local_resident: {
        en: 'See familiar street corners and local signs through the poetic, complimentary eyes of foreign designers.',
        zh: '透過外國設計師讚嘆且詩意的眼光，重新發現我們習以為常的街景原來這麼美。'
      },
      cultural_hunter: {
        en: 'Notice how immigrant communities and Southeast Asian cultural motifs are embraced with genuine cultural respect.',
        zh: '感受展覽如何真誠吸納東南亞新住民聚落的視覺符碼，展現台灣多元開放的文化包容度。'
      }
    },
    sensoryFocus: {
      look: { en: 'Vibrant silk-screen and risograph posters hanging under skylights', zh: '天光下層次分明的絹印與孔版印刷（Risograph）海報' },
      listen: { en: 'Audio clips of designers sharing their first impressions of Taoyuan', zh: '各國設計師以母語分享初訪桃園第一印象的原音短片' },
      touchOrTaste: { en: 'Heavyweight archival cotton paper poster postcards to take home', zh: '展位提供印製於厚磅純棉紙上的紀念明信片觸感' }
    },
    microPoll: {
      question: { en: 'Which visual mood best captures Taoyuan for you?', zh: '哪一種視覺調性最貼合你心中的桃園？' },
      options: [
        { id: 'vibrant', label: { en: 'Vibrant Street Energy & Neon Warmth', zh: '熱情奔放的街頭夜市活力' }, initialVotes: 660 },
        { id: 'minimal', label: { en: 'Precision Aeronautical Minimalism', zh: '俐落沉穩的航太極簡幾何' }, initialVotes: 520 },
        { id: 'nature', label: { en: 'Serene Waterways & Ponds Flora', zh: '千塘水波與微風自然詩意' }, initialVotes: 410 }
      ]
    },
    mapLocation: {
      x: 43,
      y: 22,
      floor: '1F',
      zoneCode: '1F-NORTH-RIGHT',
    }
  },
  {
    id: 'exhibit_a14',
    code: 'A14',
    subFlowTheme: { en: 'Smart Flow', zh: '智慧流' },
    dates: '09/24-10/11',
    areaTag: { en: 'Area 1 · Qingpu', zh: '青埔展區 Area 1' },
    venueFloor: { en: 'Qingpu Smart Library · 3F', zh: '桃園市立圖書館青埔智慧科技分館 3樓' },
    pavilionNumber: 'A14',
    venueName: { en: 'Qingpu Smart Library · 3F', zh: '青埔智慧科技分館 3F' },
    title: { en: 'Smart City in Convergence', zh: '智匯生城市' },
    officialDescription: {
      en: 'Starting from "Confluence", using design translation to turn abstract flows into visible urban forms. Themed "Smart City in Convergence", treating the city as a continuously generating dynamic system. Through visualization, helping viewers understand that urban convenience stems from multi-layered systems, depicting a future city built collaboratively across disciplines.',
      zh: '以「匯流」為起點，透過設計轉譯，將抽象的流動轉化為可被看見的城市形態。 以「智匯生城市」為主題，將城市視為持續生成的動態系統，透過視覺化呈現，讓觀者理解城市便利背後，是多層系統運作的結果，描繪跨領域共同建構的未來城市。'
    },
    oneSentenceTakeaway: {
      en: 'See abstract urban flows translated into visible forms, understanding how multi-layered smart systems power convenience in a continuously generating city.',
      zh: '以匯流為起點，將抽象流動轉化為可見形態，理解城市便利背後的多層智慧系統運作。'
    },
    image: '/src/assets/images/expo_interactive_light_1791790446733.jpg',
    bufferWalkMinutes: 4,
    distanceMeters: 240,
    thematicCategory: 'Smart Systems & Generative Urban Data',
    audioDuration: '2:50',
    audioTranscript: {
      en: 'Welcome to A14: Smart City in Convergence, located on the 3rd floor of the Qingpu Smart Tech Library. Notice the three-dimensional transparent data layers overhead. Every automated light, waste disposal alert, and smart transit schedule is an invisible system orchestrating harmony.',
      zh: '歡迎來到 A14「智匯生城市」，位於桃園市立圖書館青埔智慧科技分館 3 樓。仰望頭頂的多層透明數據浮空裝置，城市的高效便利不是偶然，而是智慧電網、物流與水利多層系統協同運作的成果。'
    },
    curatorialStory: {
      en: 'Shifting the visitor experience from asking "How do we navigate spaces?" to "How do personas discover value before arriving and retain insights after leaving?"',
      zh: '本展探討如何將抽象數據轉化為可感知的空間美學，描繪跨領域共同建構的未來智慧之城。'
    },
    whyItMattersByPersona: {
      first_timer: {
        en: 'The interactive smart library setting offers a quiet, futuristic panorama overlooking the Qingpu area.',
        zh: '身處嶄新的青埔智慧圖書館 3 樓，遠眺青埔綠意天際線，感受科技融入閱讀的優雅氛圍。'
      },
      design_student: {
        en: 'Study multi-layered civic data visualization, dynamic spatial systems, and cross-disciplinary smart city frameworks.',
        zh: '研讀多維度都市數據視覺化設計、動態空間系統與跨領域智慧城市建構模型。'
      },
      family: {
        en: 'Enjoy the kid-friendly interactive robotic book sorter and holographic digital storytelling cubes.',
        zh: '帶孩子體驗圖書館內的智慧自動分揀機器人與全像投影數位互動故事方塊。'
      },
      local_resident: {
        en: 'Gain insight into Taoyuan’s smart civic dashboard: real-time air quality, flood prevention, and bus arrival algorithms.',
        zh: '深入了解我們日常生活所依賴的智慧儀表板：即時防汛監測、空氣品質與公車動態演算法。'
      },
      cultural_hunter: {
        en: 'Contemplate how wisdom and data converge to nurture human connection rather than replace it.',
        zh: '思索古老水利灌溉系統與當代智慧演算法之間的精神連續性——皆是為了守護土地與人民。'
      }
    },
    sensoryFocus: {
      look: { en: 'Layered transparent acrylic data planes floating in midair', zh: '空中懸浮的多層透明壓克力數據光雕圖層' },
      listen: { en: 'Ambient algorithmic chimes reacting to library visitor density', zh: '隨圖書館人流密度微幅變化的空靈環境和弦' },
      touchOrTaste: { en: 'Interactive haptic screen displaying Taoyuan’s multi-layered systems', zh: '可親手觸控縮放的多層系統立體透視互動螢幕' }
    },
    microPoll: {
      question: { en: 'Which smart city service brings you the most daily value?', zh: '哪一項智慧城市服務在日常中帶給你最大的便利？' },
      options: [
        { id: 'transit', label: { en: 'Real-Time Smart Transit & Micro-Mobility', zh: '即時智慧公車捷運與共享單車調度' }, initialVotes: 680 },
        { id: 'flood', label: { en: 'Early Warning Flood & Storm Monitoring', zh: '極端氣候即時防汛與水文預警系統' }, initialVotes: 510 },
        { id: 'library', label: { en: 'Smart 24HR Digital Library & Civic Hub', zh: '全自動智慧圖書流通與便民數位服務' }, initialVotes: 440 }
      ]
    },
    mapLocation: {
      x: 82,
      y: 16,
      floor: '3F',
      zoneCode: 'LIBRARY-3F-ANNEX',
    }
  }
];

export const FLOWMOMO_AVATARS: Record<PersonaId, {
  name: { en: string; zh: string };
  archetype: { en: string; zh: string };
  description: { en: string; zh: string };
  badgeText: { en: string; zh: string };
  accentColor: string;
  image: string;
}> = {
  first_timer: {
    name: { en: 'Wanderer MOMO', zh: '隨光漫步 MOMO' },
    archetype: { en: 'The Curious Wayfarer', zh: '靈感尋光者' },
    description: {
      en: 'You navigated Area 1 with intuition and fresh curiosity, capturing the core flow of Taoyuan without getting lost in technicalities.',
      zh: '你用最純粹好奇的眼光漫步於桃園會展中心，輕鬆掌握了「桃園流」與核心大展的靈魂精髓。'
    },
    badgeText: { en: 'Area 1 Highlights · Pure Curiosity', zh: '青埔亮點 · 直覺共鳴' },
    accentColor: '#D97706',
    image: '/src/assets/images/flowmomo_character_1791790478962.jpg'
  },
  design_student: {
    name: { en: 'Architect MOMO', zh: '構築美學 MOMO' },
    archetype: { en: 'The Tectonic Alchemist', zh: '結構淬鍊師' },
    description: {
      en: 'You dissected A1 timber tectonics, A6 TAOPIA circular material loops, A8 aerospace manufacturing tolerances, and A12 city prototypes.',
      zh: '你深入探索了 A1 木構力學、A6 桃〇計畫循環材料、A8 航太公差與 A12 青年造城原型，在嚴謹造物秩序中讀懂設計本質。'
    },
    badgeText: { en: 'Tectonic Craft · Circular Vision', zh: '構造靈性 · 循環前瞻' },
    accentColor: '#D9532F',
    image: '/src/assets/images/flowmomo_character_1791790478962.jpg'
  },
  family: {
    name: { en: 'Playful MOMO', zh: '歡喜微光 MOMO' },
    archetype: { en: 'The Joyful Spark', zh: '感官探索家' },
    description: {
      en: 'You chased light on the A3 bridge, cooled off in A10’s mist, explored market joy in A7, and enjoyed books at A14 library.',
      zh: '你在 A3 匯流之橋追逐光影、在 A10 感受水霧、在 A7 體驗市集童趣，並在 A14 青埔分館共享親職溫暖時光。'
    },
    badgeText: { en: 'Sensory Wonder · Playful Warmth', zh: '五感童趣 · 溫煦共享' },
    accentColor: '#2E6F56',
    image: '/src/assets/images/flowmomo_character_1791790478962.jpg'
  },
  local_resident: {
    name: { en: 'Rooted MOMO', zh: '風土守望 MOMO' },
    archetype: { en: 'The Hearth Keeper', zh: '島嶼大地心' },
    description: {
      en: 'You recognized your hometown’s pond hydrology in A10, market warmth in A7, 24HR aerospace heartbeat in A8, and smart systems in A14.',
      zh: '你在 A10 找到了祖輩的千塘回憶、在 A7 品嚐在地市集香氣，在 A8 看見 24 小時工業鏈，在 A14 見證家鄉邁向智慧之城。'
    },
    badgeText: { en: 'Taoyuan Pride · 24HR Backbone', zh: '故土長青 · 世界心臟' },
    accentColor: '#0F766E',
    image: '/src/assets/images/flowmomo_character_1791790478962.jpg'
  },
  cultural_hunter: {
    name: { en: 'Heritage MOMO', zh: '時光編織 MOMO' },
    archetype: { en: 'The Heritage Weaver', zh: '祖靈迴響者' },
    description: {
      en: 'You explored multi-ethnic migrations in A1, Hakka market heritage in A7, community well-being in A11, and global dialogue in A13.',
      zh: '你循著 A1 的族群匯流、A7 的發酵古法、A11 的眾聲平等生活福祉，並在 A13 #桃園POV 中收穫豐厚的跨文化寶藏。'
    },
    badgeText: { en: 'Living Heritage · Global Dialogue', zh: '文化獵影 · 國際對話' },
    accentColor: '#7C2D12',
    image: '/src/assets/images/flowmomo_character_1791790478962.jpg'
  }
};

export function generateCuratedJourney(
  personaId: PersonaId,
  interestId: InterestId,
  paceId: PaceId
): CuratedJourney {
  const persona = PERSONAS.find(p => p.id === personaId) || PERSONAS[0];
  const interest = INTERESTS.find(i => i.id === interestId) || INTERESTS[0];

  // Specific curation routes for Area 1 (Qingpu Exhibition Area · Messe Taoyuan & Library)
  // Mapping precisely across A1 to A14
  let exhibits: ExhibitItem[] = [];

  if (personaId === 'first_timer') {
    // Signature Flow Route: A1 -> A2 -> A3 -> A7 -> A10
    exhibits = [
      ALL_AREA1_EXHIBITS[0], // A1 桃園流
      ALL_AREA1_EXHIBITS[1], // A2 城市脈搏・跳動未來
      ALL_AREA1_EXHIBITS[2], // A3 匯流之橋
      ALL_AREA1_EXHIBITS[6], // A7 好市有戲
      ALL_AREA1_EXHIBITS[9], // A10 水之道
    ];
  } else if (personaId === 'design_student') {
    // Tectonics & Circular Manufacturing: A1 -> A6 -> A8 -> A5 -> A12 -> A13
    exhibits = [
      ALL_AREA1_EXHIBITS[0], // A1 桃園流
      ALL_AREA1_EXHIBITS[5], // A6 桃〇計畫
      ALL_AREA1_EXHIBITS[7], // A8 24HR 運轉全世界
      ALL_AREA1_EXHIBITS[4], // A5 產業新態
      ALL_AREA1_EXHIBITS[11], // A12 漸構桃園
      ALL_AREA1_EXHIBITS[12], // A13 #桃園POV
    ];
  } else if (personaId === 'family') {
    // Light & Sensory Play Route: A1 -> A3 -> A10 -> A7 -> A14
    exhibits = [
      ALL_AREA1_EXHIBITS[0], // A1 桃園流
      ALL_AREA1_EXHIBITS[2], // A3 匯流之橋
      ALL_AREA1_EXHIBITS[9], // A10 水之道
      ALL_AREA1_EXHIBITS[6], // A7 好市有戲
      ALL_AREA1_EXHIBITS[13], // A14 智匯生城市
    ];
  } else if (personaId === 'local_resident') {
    // Hometown Pride & Global Hub Route: A1 -> A7 -> A8 -> A10 -> A11 -> A14
    exhibits = [
      ALL_AREA1_EXHIBITS[0], // A1 桃園流
      ALL_AREA1_EXHIBITS[6], // A7 好市有戲
      ALL_AREA1_EXHIBITS[7], // A8 24HR 運轉全世界
      ALL_AREA1_EXHIBITS[9], // A10 水之道
      ALL_AREA1_EXHIBITS[10], // A11 文化Well-being
      ALL_AREA1_EXHIBITS[13], // A14 智匯生城市
    ];
  } else if (personaId === 'cultural_hunter') {
    // Terroirs & Global Dialogue Route: A1 -> A7 -> A9 -> A11 -> A13
    exhibits = [
      ALL_AREA1_EXHIBITS[0], // A1 桃園流
      ALL_AREA1_EXHIBITS[6], // A7 好市有戲
      ALL_AREA1_EXHIBITS[8], // A9 桃園演算室
      ALL_AREA1_EXHIBITS[10], // A11 文化Well-being
      ALL_AREA1_EXHIBITS[12], // A13 #桃園POV
    ];
  }

  // Adjust for selected interest priority if user picked a strong interest
  if (interestId === 'local_culture' && !exhibits.some(e => e.code === 'A7')) {
    exhibits.splice(1, 0, ALL_AREA1_EXHIBITS[6]);
  } else if (interestId === 'interactive_art' && !exhibits.some(e => e.code === 'A3')) {
    exhibits.splice(1, 0, ALL_AREA1_EXHIBITS[2]);
  } else if (interestId === 'sustainable_craft' && !exhibits.some(e => e.code === 'A6')) {
    exhibits.splice(1, 0, ALL_AREA1_EXHIBITS[5]);
  } else if (interestId === 'urban_futures' && !exhibits.some(e => e.code === 'A2')) {
    exhibits.splice(1, 0, ALL_AREA1_EXHIBITS[1]);
  } else if (interestId === 'community_stories' && !exhibits.some(e => e.code === 'A13')) {
    exhibits.splice(exhibits.length - 1, 0, ALL_AREA1_EXHIBITS[12]);
  }

  // Slice or expand according to pace
  if (paceId === 'quick') {
    exhibits = exhibits.slice(0, 3);
  } else if (paceId === 'deep') {
    // If deep dive, ensure at least 6 core stops
    if (!exhibits.some(e => e.code === 'A4')) exhibits.push(ALL_AREA1_EXHIBITS[3]);
    if (!exhibits.some(e => e.code === 'A14')) exhibits.push(ALL_AREA1_EXHIBITS[13]);
  }

  const estimatedMinutes = paceId === 'quick' ? 65 : paceId === 'deep' ? 150 : 105;

  const titles: Record<PersonaId, { en: string; zh: string }> = {
    first_timer: {
      en: "Area 1 Route: Signature Flow & Architectural Highlights",
      zh: "青埔展區專屬動線：經典流動漫步與主題高光"
    },
    design_student: {
      en: "Area 1 Route: Tectonics, Circular Loops & Urban Fabrication",
      zh: "青埔展區專屬動線：構造巡禮、循環園區與未來造城"
    },
    family: {
      en: "Area 1 Route: Sensory Waves, Light Bridge & Playful Market",
      zh: "青埔展區專屬動線：彩光天橋、水霧微光與市集童趣"
    },
    local_resident: {
      en: "Area 1 Route: Ponds Heritage, 24HR Global Heartbeat & Smart Hub",
      zh: "青埔展區專屬動線：千塘水脈記憶、24HR 智造與智匯城市"
    },
    cultural_hunter: {
      en: "Area 1 Route: Terroir Fermentation, Voices & Global Dialogue",
      zh: "青埔展區專屬動線：島嶼風土發酵、眾聲福祉與 #桃園POV"
    }
  };

  const premises: Record<PersonaId, { en: string; zh: string }> = {
    first_timer: {
      en: `Directly tailored for Area 1 (Qingpu · Messe Taoyuan). Starting with A1 "TaoYuan in Flow", experiencing A2 "Vision Flow", crossing A3 "Bridge of Confluence", tasting street stories at A7 "Good Market, Good Show", and recharging at A10 "The Way of Water".`,
      zh: `精準對應青埔展區（桃園會展中心）。以 A1「桃園流」破題，體驗 A2「願景流」，漫步 A3「玩美流」，走入 A7「好市有戲」感受熱騰市集，最後在 A10「水之道」享受靜心涼意，零門檻看懂設計展。`
    },
    design_student: {
      en: `High-density curatorial thread across Messe Taoyuan. Analyzing A1 timber tectonics, diving into A6 "TAOPIA" circular materials, inspecting A8 aerospace engineering tolerances, and examining A12 & A13 contemporary design frameworks.`,
      zh: `深度專業向動線：直擊 A1 大跨距木構、A6 桃〇計畫循環物性測試、A8 航太級供應鏈公差設計，以及 A12 青年造城與 A13 跨國字體海報策展實踐。`
    },
    family: {
      en: `Comfortable and barrier-free path across Area 1: starting from A1's open wooden slopes, running across A3's rainbow light bridge, relaxing by A10's refreshing mist, enjoying family stamps at A7, and visiting A14 Smart Library.`,
      zh: `全程無障礙友善動線：從 A1 平緩原木大廳啟程，在 A3 彩光天橋追逐水波，在 A10 感受沁涼水霧，在 A7 蓋下滿滿的市集童趣紀念章，最後造訪 A14 青埔分館。`
    },
    local_resident: {
      en: `A resonant local lens: exploring familiar Taoyuan pond hydrology in A10, tasting market classics in A7, discovering our hometown's role in powering the world 24/7 in A8, and exploring A14 Smart City systems.`,
      zh: `在地人最自豪的視角：在 A10 重溫千塘水利智慧、在 A7 看見常民菜市場美學轉型，在 A8 親眼目睹桃園如何 24 小時運轉全世界，並在 A14 感受智匯生城市的未來展望。`
    },
    cultural_hunter: {
      en: `An anthropological exploration across Area 1: unearthing immigration flows in A1, savoring fermentation heritage in A7, participating in A9 Algorithm Lab, feeling A11 Culture Well-being, and taking in global design angles in A13 #TaoyuanPOV.`,
      zh: `深層文化探尋：從 A1 的多元族群大遷徙出發，品味 A7 的百年發酵醬香，參與 A9 演算室淨零行動，感受 A11 眾聲生活福祉，並在 A13 感受各國頂尖設計師對桃園的深情凝視。`
    }
  };

  return {
    title: titles[personaId] || titles.first_timer,
    curatorialPremise: premises[personaId] || premises.first_timer,
    areaName: { en: 'Area 1 · Qingpu (Messe Taoyuan)', zh: '青埔展區 Area 1 · 桃園會展中心' },
    estimatedTotalMinutes: estimatedMinutes,
    personaId,
    interestId,
    paceId,
    exhibits: exhibits
  };
}
