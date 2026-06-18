// Mock cart data for 장바구니 → 제안 flow.

const CART_ITEMS = [
  { id: 'c1', title: '오피스 와이프의 남자 사냥법', type: '숏드라마', episodes: 80, year: 2025, posterTone: 'rose',   genres: ['로맨스','치정','복수'],         language: '한국어', addedDays: 2  },
  { id: 'c4', title: '재벌집 비서',                 type: '숏드라마', episodes: 60, year: 2025, posterTone: 'indigo', genres: ['로맨스','복수','치정'],         language: '한국어', addedDays: 5  },
  { id: 'c3', title: 'The Touch',                   type: '숏드라마', episodes: 70, year: 2025, posterTone: 'slate',  genres: ['로맨스','치정'],                language: '영어',  addedDays: 8  },
  { id: 'c6', title: '첫사랑 탐정',                 type: '숏드라마', episodes: 50, year: 2025, posterTone: 'teal',   genres: ['로맨스','코미디','학원물'],     language: '한국어', addedDays: 12 },
  { id: 'c8', title: '시간을 거스른 너에게',         type: '숏애니',   episodes: 30, year: 2026, posterTone: 'teal',   genres: ['로맨스','SF','시간 여행'],      language: '한국어', addedDays: 14 },
];

const PLATFORM_NAME = 'Reelio';

const RELEASE_OPTIONS = ['1년', '2년', '3년', '추후협의'];
const SETTLEMENT_OPTIONS = ['MG + RS', 'RS', 'Flat Fee'];
const EXCLUSIVITY_OPTIONS = ['독점', '비독점'];
const DISTRIBUTION_OPTIONS = ['독점', '비독점', '공동제작'];
const REGION_PRESETS = ['Global', 'Asia', 'Korea', 'North America', 'Europe', 'Japan'];

Object.assign(window, {
  CART_ITEMS, PLATFORM_NAME,
  RELEASE_OPTIONS, SETTLEMENT_OPTIONS, EXCLUSIVITY_OPTIONS,
  DISTRIBUTION_OPTIONS, REGION_PRESETS,
});
