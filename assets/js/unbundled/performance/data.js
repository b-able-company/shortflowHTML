// Mock performance data for shortflow.
// 제작사가 보유한 콘텐츠와 각 플랫폼별 퍼포먼스 지표.
// 지표: views(조회수), follows(팔로우수), likes(좋아요수), ads(광고수)
// 플랫폼별로 일부 지표가 없을 수 있고, 4개 모두 없으면 "데이터 미제공".

var PERF_CONTENTS = [{
  id: 'p1',
  title: '사랑은 계속된다',
  subtitle: '70부작 · 멜로',
  posterTone: 'rose',
  lastUpdate: '2026-04-29',
  platforms: [{
    name: '네이버시리즈',
    releaseDate: '2024-08-15',
    views: 12840000,
    follows: 184300,
    likes: 2410000,
    ads: 32
  }, {
    name: '카카오페이지',
    releaseDate: '2024-08-22',
    views: 9120000,
    follows: 142800,
    likes: 1780000,
    ads: 24
  }, {
    name: '드라마박스',
    releaseDate: '2024-09-10',
    // 광고수 미제공
    views: 5640000,
    follows: 88400,
    likes: 920000
  }, {
    name: '숏맥스',
    releaseDate: '2024-10-05',
    // 팔로우, 광고 미제공
    views: 3210000,
    likes: 410000
  }]
}, {
  id: 'p2',
  title: '달빛 연인',
  subtitle: '60부작 · 사극 로맨스',
  posterTone: 'indigo',
  lastUpdate: '2026-04-28',
  platforms: [{
    name: '네이버시리즈',
    releaseDate: '2024-11-02',
    views: 6240000,
    follows: 92100,
    likes: 1120000,
    ads: 18
  }, {
    name: '카카오페이지',
    releaseDate: '2024-11-15',
    views: 4980000,
    follows: 71400,
    likes: 880000,
    ads: 14
  }, {
    name: '숏맥스',
    releaseDate: '2024-12-01',
    views: 2140000,
    likes: 312000
  }]
}, {
  id: 'p3',
  title: '첫사랑 탐정',
  subtitle: '48부작 · 청춘 미스터리',
  posterTone: 'teal',
  lastUpdate: '2026-04-25',
  platforms: [{
    name: '네이버시리즈',
    releaseDate: '2025-02-20',
    views: 1840000,
    follows: 24300,
    likes: 320000,
    ads: 6
  }, {
    name: '드라마박스',
    releaseDate: '2025-03-15'
    // 미연동 — 데이터 미제공
  }]
}, {
  id: 'p4',
  title: '도시의 밤',
  subtitle: '80부작 · 누아르 액션',
  posterTone: 'amber',
  lastUpdate: '2026-04-29',
  platforms: [{
    name: '네이버시리즈',
    releaseDate: '2024-05-10',
    views: 18420000,
    follows: 241000,
    likes: 3180000,
    ads: 41
  }, {
    name: '카카오페이지',
    releaseDate: '2024-05-24',
    views: 14310000,
    follows: 198700,
    likes: 2640000,
    ads: 36
  }, {
    name: '드라마박스',
    releaseDate: '2024-06-12',
    views: 8910000,
    follows: 124200,
    likes: 1510000
  }, {
    name: '숏맥스',
    releaseDate: '2024-07-01',
    views: 6240000,
    likes: 980000
  }, {
    name: '톡톡숏',
    releaseDate: '2026-04-20'
    // 신규 연동 진행중 — 미제공
  }]
}, {
  id: 'p5',
  title: '재벌집 비서',
  subtitle: '64부작 · 오피스 로맨스',
  posterTone: 'slate',
  lastUpdate: '2026-04-29',
  platforms: [{
    name: '네이버시리즈',
    releaseDate: '2025-09-05',
    views: 22140000,
    follows: 312400,
    likes: 4180000,
    ads: 52
  }, {
    name: '카카오페이지',
    releaseDate: '2025-09-19',
    views: 19820000,
    follows: 284600,
    likes: 3710000,
    ads: 47
  }]
}];

// ───── helpers ─────
function platformHasAny(p) {
  return p.views != null || p.follows != null || p.likes != null || p.ads != null;
}
function compact(n) {
  if (n == null) return null;
  if (n >= 100000000) return (n / 100000000).toFixed(1).replace(/\.0$/, '') + '억';
  if (n >= 10000) return (n / 10000).toFixed(n >= 1000000 ? 0 : 1).replace(/\.0$/, '') + '만';
  if (n >= 1000) return n.toLocaleString('ko-KR');
  return String(n);
}
function fullNum(n) {
  if (n == null) return '—';
  return n.toLocaleString('ko-KR');
}
var PLATFORM_TINTS = {
  '네이버시리즈': {
    tint: '#E8F1E5',
    ink: '#2F5C2A',
    dot: '#5BA94F'
  },
  '카카오페이지': {
    tint: '#F8EFD6',
    ink: '#7A5715',
    dot: '#E8B824'
  },
  '드라마박스': {
    tint: '#E5ECF7',
    ink: '#2A4385',
    dot: '#4F6BC9'
  },
  '숏맥스': {
    tint: '#F1E5EC',
    ink: '#7A2A52',
    dot: '#C9508A'
  },
  '톡톡숏': {
    tint: '#E5F1F1',
    ink: '#1F5A5A',
    dot: '#4FA3A3'
  }
};
function platformStyle(name) {
  return PLATFORM_TINTS[name] || {
    tint: '#EEECE6',
    ink: '#5C6068',
    dot: '#9CA0A6'
  };
}

// 콘텐츠의 플랫폼 합산 누적값. 해당 지표를 하나라도 제공하는 플랫폼이 있으면 합,
// 모든 플랫폼이 미제공이면 null. (누적값이므로 그대로 합산)
function contentTotals(c) {
  var keys = ['views', 'follows', 'likes', 'ads'];
  var out = {};
  keys.forEach(function (k) {
    var vals = c.platforms.map(function (p) {
      return p[k];
    }).filter(function (v) {
      return v != null;
    });
    out[k] = vals.length ? vals.reduce(function (s, v) {
      return s + v;
    }, 0) : null;
  });
  out.liveCount = c.platforms.filter(platformHasAny).length;
  return out;
}

// 포트폴리오 전체 합산 (목록 화면 상단 요약)
function portfolioTotals(contents) {
  var keys = ['views', 'follows', 'likes', 'ads'];
  var out = {};
  keys.forEach(function (k) {
    var sum = 0,
      any = false;
    contents.forEach(function (c) {
      return contents && c.platforms.forEach(function (p) {
        if (p[k] != null) {
          sum += p[k];
          any = true;
        }
      });
    });
    out[k] = any ? sum : null;
  });
  return out;
}

// 플랫폼 요약 라벨 — 프사가 없으므로 도트 대신 텍스트로.
// 1곳이면 플랫폼명, 여러 곳이면 "첫플랫폼 외 N개".
function platformSummary(platforms) {
  if (!platforms || platforms.length === 0) return '플랫폼 없음';
  if (platforms.length === 1) return platforms[0].name;
  return "".concat(platforms[0].name, " \uC678 ").concat(platforms.length - 1, "\uAC1C");
}

// 가장 빠른 플랫폼 출시일
function firstReleaseDate(platforms) {
  var dates = (platforms || []).map(function (p) {
    return p.releaseDate;
  }).filter(Boolean).sort();
  return dates[0] || '—';
}

// 한 플랫폼이 제공하는 지표 목록 / 대표 지표
var METRIC_ORDER = [{
  key: 'views',
  label: '조회수'
}, {
  key: 'follows',
  label: '팔로우수'
}, {
  key: 'likes',
  label: '좋아요수'
}, {
  key: 'ads',
  label: '광고수'
}];
function presentMetrics(p) {
  return METRIC_ORDER.filter(function (m) {
    return p[m.key] != null;
  });
}
function headlineMetric(p) {
  var present = presentMetrics(p);
  if (present.length === 0) return null;
  return present.find(function (m) {
    return m.key === 'views';
  }) || present[0];
}
Object.assign(window, {
  PERF_CONTENTS: PERF_CONTENTS,
  platformHasAny: platformHasAny,
  compact: compact,
  fullNum: fullNum,
  platformStyle: platformStyle,
  contentTotals: contentTotals,
  portfolioTotals: portfolioTotals,
  platformSummary: platformSummary,
  firstReleaseDate: firstReleaseDate,
  METRIC_ORDER: METRIC_ORDER,
  presentMetrics: presentMetrics,
  headlineMetric: headlineMetric
});
