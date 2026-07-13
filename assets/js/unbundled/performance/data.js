// Mock performance data for shortflow.
// 제작사가 보유한 콘텐츠와 각 플랫폼별 퍼포먼스 지표.
// 지표: views(조회수), follows(팔로우수), likes(좋아요수), ads(광고수)
// 플랫폼별로 일부 지표가 없을 수 있고, 4개 모두 없으면 "데이터 미제공".

function makePlatform(name, releaseDate, views, follows, likes, ads, lastUpdate) {
  var platform = {
    name: name,
    releaseDate: releaseDate,
    lastUpdate: lastUpdate
  };
  if (views != null) platform.views = views;
  if (follows != null) platform.follows = follows;
  if (likes != null) platform.likes = likes;
  if (ads != null) platform.ads = ads;
  return platform;
}
function makePerfContent(id, title, subtitle, posterTone, posterImage, lastUpdate, baseViews, platformCount) {
  var platformNames = ['NovaShort', 'PlayStory', 'VeloDrama', 'StoryWave', 'MiniStage'];
  var platforms = platformNames.slice(0, platformCount).map(function (name, index) {
    var ratio = [1, 0.72, 0.48, 0.32, 0.18][index];
    var views = Math.round(baseViews * ratio);
    return makePlatform(name, '2026-0' + Math.min(7, 2 + index) + '-' + String(10 + index * 3).padStart(2, '0'), views, Math.round(views * 0.015), Math.round(views * 0.18), index < 2 ? Math.round(views / 410000) : null, lastUpdate);
  });
  return {
    id: id,
    title: title,
    subtitle: subtitle,
    posterTone: posterTone,
    posterImage: posterImage,
    lastUpdate: lastUpdate,
    platforms: platforms
  };
}
var PERF_CONTENTS = [
  makePerfContent('perf-space-courier', '우주 택배 기사님', '48부작 · 숏애니 · SF 가족', 'indigo', 'images/우주택배기사님.png', '2026-07-12', 8420000, 4),
  makePerfContent('perf-chaebol-secretary', '재벌집 막내 비서', '72부작 · 로맨스 · 여성향', 'indigo', 'images/재벌집막내비서.png', '2026-07-12', 22140000, 4),
  makePerfContent('perf-idol-transfer', '우리 반 전학생은 아이돌', '60부작 · 학원물 · 청춘', 'teal', 'images/우리반전학생은아이돌.png', '2026-07-11', 3860000, 2),
  makePerfContent('perf-secret-marriage', '비밀 사내 결혼', '72부작 · 오피스 로맨스', 'teal', 'images/비밀사내결혼.png', '2026-07-13', 19820000, 4),
  makePerfContent('perf-prince-afterwork', '왕자님의 퇴근길', '56부작 · 판타지 로맨스', 'indigo', 'images/왕자님의퇴근길.png', '2026-07-11', 5120000, 3),
  makePerfContent('perf-ai-husband', '남편이 AI입니다', '60부작 · 로맨스 SF', 'amber', 'images/남편이AI.png', '2026-07-10', 7240000, 3),
  makePerfContent('perf-villainess-agency', '오늘부터 악녀 대행합니다', '70부작 · 복수 코미디', 'rose', 'images/오늘부터악녀대행.png', '2026-07-10', 9120000, 3),
  makePerfContent('perf-emperor-resign', '퇴사했더니 황제가 됐다', '66부작 · 판타지', 'rose', 'images/퇴사했더니황제.png', '2026-07-09', 4680000, 2),
  makePerfContent('perf-danger-partner', '나의 위험한 파트너', '64부작 · 스릴러 로맨스', 'indigo', 'images/나의위험한파트너.png', '2026-07-09', 6840000, 3),
  makePerfContent('perf-second-ending', '그녀의 두 번째 엔딩', '58부작 · 시간 여행 로맨스', 'indigo', 'images/그녀의두번째엔딩.png', '2026-07-08', 5340000, 3),
  makePerfContent('perf-ceo-contract-love', '대표님, 계약 연애는 처음이라서요', '80부작 · 로맨스', 'rose', 'images/대표님이내전남친입니다.png', '2026-07-08', 12840000, 4),
  makePerfContent('perf-moonlight-store', '달빛 아래 편의점', '52부작 · 숏애니 · 청춘 로맨스', 'indigo', 'images/달빛아래편의점.png', '2026-07-07', 2940000, 2),
  makePerfContent('perf-killer-roommate', '살인범과 룸메이트가 되었다', '62부작 · 스릴러', 'slate', 'images/살인범과룸메이트.png', '2026-07-07', 7760000, 3),
  makePerfContent('perf-dawn-delivery', '새벽 배송 로맨스', '50부작 · 로맨스', 'rose', 'images/새벽배송로맨스.png', '2026-07-06', 2160000, 2),
  makePerfContent('perf-fox-manager', '내 매니저는 구미호', '54부작 · 판타지', 'amber', 'images/내매니저는구미호.png', '2026-07-06', 3420000, 2),
  makePerfContent('perf-first-love-reset', '첫사랑 리셋 버튼', '48부작 · 청춘 로맨스', 'slate', 'images/첫사랑리셋버튼.png', '2026-07-05', 1840000, 2),
  makePerfContent('perf-contract-3days', '계약 종료 3일 전', '45부작 · 멜로', 'indigo', 'images/계약종료3일전.png', '2026-07-05', 2580000, 2)
];

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
