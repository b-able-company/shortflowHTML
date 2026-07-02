// 새 콘텐츠 생성 — enum/라벨/장르/초기 폼 상태
// API: POST /api/contents (1) · PUT .../media (2) · PUT .../meta (3) · PATCH .../submit

// ─── enum 라벨 맵 ──────────────────────────────────────
var ENUMS = {
  productionStatus: [{
    v: 'PLANNING',
    label: '기획'
  }, {
    v: 'IN_PRODUCTION',
    label: '제작중'
  }, {
    v: 'IN_REVIEW',
    label: '검수중'
  }, {
    v: 'COMPLETED',
    label: '제작완료'
  }],
  mediaCategory: [{
    v: 'DRAMA',
    label: '드라마'
  }, {
    v: 'ANIMATION',
    label: '애니메이션'
  }],
  aiGenerated: [{
    v: false,
    label: '아니오'
  }, {
    v: true,
    label: '예'
  }],
  contentLanguage: [{
    v: 'KO',
    label: '한국어'
  }, {
    v: 'EN',
    label: 'English'
  }, {
    v: 'ZH',
    label: '中文'
  }],
  coProduction: [{
    v: 'SOLO',
    label: '단독'
  }, {
    v: 'JOINT',
    label: '공동'
  }, {
    v: 'AGENCY',
    label: '대행'
  }],
  licenseType: [{
    v: 'EXCLUSIVE',
    label: '독점'
  }, {
    v: 'NON_EXCLUSIVE',
    label: '비독점'
  }, {
    v: 'BOTH',
    label: '둘 다'
  }],
  ageRating: [{
    v: 'ALL',
    label: '전체'
  }, {
    v: 'TWELVE',
    label: '12세'
  }, {
    v: 'FIFTEEN',
    label: '15세'
  }, {
    v: 'ADULT',
    label: '청소년 관람불가'
  }, {
    v: 'LATER',
    label: '추후입력'
  }],
  contentType: [{
    v: 'ORIGINAL',
    label: '오리지널'
  }, {
    v: 'REMAKE',
    label: '리메이크'
  }],
  distributionHistory: [{
    v: 'NEW',
    label: '미유통 (신작)'
  }, {
    v: 'RELEASED',
    label: '기유통'
  }],
  licenseTerritory: [{
    v: 'GLOBAL_EXCEPT_CHINA',
    label: '글로벌(중국 본토 제외)'
  }, {
    v: 'GLOBAL_EXCEPT_CHINA_JAPAN',
    label: '글로벌 (중국 본토, 일본 제외)'
  }, {
    v: 'GLOBAL_EXCEPT_CHINA_THAILAND',
    label: '글로벌(중국 본토, 태국 제외)'
  }, {
    v: 'OTHER',
    label: '기타'
  }]
};

// 짧은 언어 라벨 (탭/칩용)
var LANG_SHORT = {
  KO: '한국어',
  EN: 'EN',
  ZH: '中文'
};
var LANG_LIST = ['KO', 'EN', 'ZH'];

// ─── 장르 코드 ─────────────────────────────────────────
var GENRES = [{
  c: 'ROMANCE',
  label: '로맨스'
}, {
  c: 'MELODRAMA',
  label: '치정'
}, {
  c: 'REVENGE',
  label: '복수'
}, {
  c: 'YOUTH',
  label: '청춘'
}, {
  c: 'FAMILY',
  label: '가족'
}, {
  c: 'HISTORICAL',
  label: '사극'
}, {
  c: 'COMEDY',
  label: '코미디'
}, {
  c: 'SCHOOL',
  label: '학원물'
}, {
  c: 'ACTION',
  label: '액션'
}, {
  c: 'TIMESLIP',
  label: '시간 여행'
}, {
  c: 'SF',
  label: 'SF'
}, {
  c: 'BL',
  label: '동성애'
}, {
  c: 'THRILLER',
  label: '스릴러'
}, {
  c: 'HORROR',
  label: '공포'
}, {
  c: 'FEMALE',
  label: '여성향'
}, {
  c: 'MALE',
  label: '남성향'
}, {
  c: 'FANTASY',
  label: '판타지'
}, {
  c: 'PURE_ROMANCE',
  label: '순정'
}, {
  c: 'MELO',
  label: '멜로'
}, {
  c: 'MYSTERY',
  label: '미스터리'
}, {
  c: 'OTHER',
  label: '기타'
}];

// 기선공개 플랫폼 추천 (태그 입력 자동완성용)
var PLATFORM_SUGGEST = ['YouTube', 'TikTok', '快手', '抖音', 'Reelshort', 'DramaBox', 'Naver Series'];

// ─── 단계 정의 ─────────────────────────────────────────
var STEPS = [{
  k: 1,
  label: '콘텐츠 정보',
  hint: '기본 정보 · 텍스트 · 크루'
}, {
  k: 2,
  label: '미디어',
  hint: '이미지 · 영상 · 자막'
}, {
  k: 3,
  label: '검토 요청',
  hint: '요약 · 제출 확인'
}];

// 언어별 번역 블록 초기값
function emptyTranslation(language) {
  return {
    language: language,
    title: '',
    logline: '',
    synopsis: '',
    characterDescription: '',
    releaseDate: ''
  };
}
function emptyCrew(language) {
  return {
    language: language,
    director: '',
    writer: '',
    cast: ''
  };
}

// ─── 초기 폼 상태 (일부 프리필로 화면 채움) ────────────
var INITIAL_FORM = {
  // 1단계
  originalTitle: '오피스 와이프의 남자 사냥법',
  productionYear: 2026,
  episodes: 80,
  runtime: '90초',
  totalRuntime: 120,
  productionStatus: 'COMPLETED',
  mediaCategory: 'DRAMA',
  isAiGenerated: false,
  genreCodes: ['ROMANCE', 'MELODRAMA', 'REVENGE'],
  contentLanguage: 'KO',
  exclusive: true,
  coProduction: 'SOLO',
  licenseType: 'EXCLUSIVE',
  licenseTerritory: 'GLOBAL_EXCEPT_CHINA',
  distributionHistory: '',
  // NEW(미유통) | RELEASED(기유통)
  desiredReleaseDate: '2026-07-01',
  // 미유통일 때 희망 릴리즈 일정
  previousReleases: '',
  translations: [{
    language: 'KO',
    title: '오피스 와이프의 남자 사냥법',
    logline: '완벽한 비서, 그녀의 진짜 타깃은 회장님이었다.',
    synopsis: '',
    characterDescription: '',
    releaseDate: '2026-07-01'
  }, emptyTranslation('EN'), emptyTranslation('ZH')],
  // 2단계
  mainImageKey: null,
  mediaLanguage: 'KO',
  freeEpisodeKeys: [],
  teaserKeys: [],
  freeEpisodeSubtitles: {
    KO: [],
    EN: [],
    ZH: []
  },
  teaserSubtitles: {
    KO: [],
    EN: [],
    ZH: []
  },
  contentImageKeys: [],
  // 1단계 추가 정보
  startPoint: 3,
  ageRating: 'FIFTEEN',
  contentType: 'ORIGINAL',
  reviewNote: '',
  crew: [{
    language: 'KO',
    director: '김도윤',
    writer: '이세아',
    cast: '한지민 · 박서준'
  }, emptyCrew('EN'), emptyCrew('ZH')]
};
function enumLabel(group, v) {
  var f = (ENUMS[group] || []).find(function (x) {
    return x.v === v;
  });
  return f ? f.label : v;
}
function genreLabel(c) {
  var f = GENRES.find(function (g) {
    return g.c === c;
  });
  return f ? f.label : c;
}
Object.assign(window, {
  ENUMS: ENUMS,
  LANG_SHORT: LANG_SHORT,
  LANG_LIST: LANG_LIST,
  GENRES: GENRES,
  PLATFORM_SUGGEST: PLATFORM_SUGGEST,
  STEPS: STEPS,
  INITIAL_FORM: INITIAL_FORM,
  emptyTranslation: emptyTranslation,
  emptyCrew: emptyCrew,
  enumLabel: enumLabel,
  genreLabel: genreLabel
});
