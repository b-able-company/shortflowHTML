// Mock content library data for the search/listing screen.
// Each content has: id, title, type (drama/anime), genres, year, language,
// posterTone, registered (등록일 ISO), favorited (boolean), platforms.

const CONTENT_LIBRARY = [
  { id: 'c1',  title: '오피스 와이프의 남자 사냥법', type: '숏드라마', genres: ['로맨스','치정','복수','청춘','학원물','스릴러'], year: 2025, language: '한국어', posterTone: 'rose',   registered: '2025-08-12', favorited: true  },
  { id: 'c2',  title: '거짓 커밍 아웃 대소동',       type: '숏드라마', genres: ['로맨스','청춘','학원물'],                          year: 2024, language: '한국어', posterTone: 'amber',  registered: '2024-11-03', favorited: false },
  { id: 'c3',  title: 'The Touch',                   type: '숏드라마', genres: ['로맨스','치정'],                                   year: 2025, language: '영어',  posterTone: 'slate',  registered: '2025-02-18', favorited: true  },
  { id: 'c4',  title: '재벌집 비서',                 type: '숏드라마', genres: ['로맨스','복수','치정'],                            year: 2025, language: '한국어', posterTone: 'indigo', registered: '2025-09-05', favorited: false },
  { id: 'c5',  title: '도시의 밤',                   type: '숏드라마', genres: ['스릴러','복수','액션'],                            year: 2024, language: '한국어', posterTone: 'amber',  registered: '2024-05-10', favorited: true  },
  { id: 'c6',  title: '첫사랑 탐정',                 type: '숏드라마', genres: ['로맨스','코미디','학원물'],                        year: 2025, language: '한국어', posterTone: 'teal',   registered: '2025-02-20', favorited: false },
  { id: 'c7',  title: '달빛 연인',                   type: '숏드라마', genres: ['로맨스','사극'],                                   year: 2024, language: '한국어', posterTone: 'indigo', registered: '2024-11-02', favorited: false },
  { id: 'c8',  title: '시간을 거스른 너에게',         type: '숏애니',   genres: ['로맨스','SF','시간 여행'],                         year: 2026, language: '한국어', posterTone: 'teal',   registered: '2026-01-22', favorited: true  },
  { id: 'c9',  title: '계약결혼의 함정',              type: '숏드라마', genres: ['로맨스','치정','여성향'],                          year: 2023, language: '중국어', posterTone: 'rose',   registered: '2023-07-14', favorited: false },
  { id: 'c10', title: '언어별영상테스트',             type: '숏드라마', genres: ['로맨스','청춘','학원물'],                          year: 2025, language: '한국어', posterTone: 'rose',   registered: '2025-12-01', favorited: false },
];

const GENRES = ['로맨스','치정','복수','청춘','가족','사극','코미디','학원물','액션','시간 여행','SF','동성애','스릴러','공포','여성향','남성향'];
const YEARS = [2026, 2025, 2024, 2023, 2022, 2021];
const LANGUAGES = ['한국어','영어','중국어'];
const TYPES = ['숏드라마','숏애니'];

Object.assign(window, { CONTENT_LIBRARY, GENRES, YEARS, LANGUAGES, TYPES });
