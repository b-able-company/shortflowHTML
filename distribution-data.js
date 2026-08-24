(function () {
  const baseRows = [
    { title: '대표님이 내 전남친입니다', year: '2026', genre: '로맨스', platforms: ['ReelShort', 'DramaBox', 'ShortMax', 'Viki', 'NovaShort'], contract: 'MG + RS', region: 'Global', release: '2026.04.15', status: 'active', poster: 'images/posters/대표님이내전남친입니다.png', revenue: 84320000 },
    { title: '재벌집 막내 비서', year: '2026', genre: '로맨스', platforms: ['Viki', 'ShortReel'], contract: 'RS', region: 'US · JP', release: '2026.05.01', status: 'active', poster: 'images/posters/재벌집막내비서.png', revenue: 51290000 },
    { title: '비밀 사내 결혼', year: '2026', genre: '로맨스', platforms: ['WeTV'], contract: 'Flat Fee', region: 'SEA', release: '2026.06.10', status: 'pending', poster: 'images/posters/비밀사내결혼.png', revenue: 24000000 },
    { title: '그녀의 두 번째 엔딩', year: '2026', genre: '드라마', platforms: ['Rakuten Viki', 'Mango TV Global'], contract: 'RS', region: 'Global', release: '2026.03.20', status: 'active', poster: 'images/posters/그녀의두번째엔딩.png', revenue: 36750000 },
    { title: '우주 택배 기사님', year: '2022', genre: 'SF', platforms: ['ShortMax'], contract: 'MG + RS', region: 'Global', release: '2026.02.28', status: 'active', poster: 'images/posters/우주택배기사님.png', revenue: 18960000 },
    { title: '우리 집에 킬러가 산다', year: '2025', genre: '스릴러', platforms: ['DramaBox', 'ReelShort'], contract: 'RS', region: 'US', release: '2026.07.01', status: 'pending', poster: 'images/posters/우리집에킬러가산다.png', revenue: 29840000 },
    { title: '내 남친의 여자친구', year: '2026', genre: '치정 로맨스', platforms: ['ShortMax', 'Viki', 'Mango TV Global'], contract: 'RS', region: 'Global', release: '2026.07.14', status: 'active', poster: 'images/posters/내남친의여자친구.png', revenue: 41200000 },
    { title: '불행을 예약했습니다', year: '2026', genre: '미스터리', platforms: ['DramaBox', 'WeTV'], contract: 'Flat Fee', region: 'SEA', release: '2026.08.03', status: 'pending', poster: 'images/posters/불행을예약했습니다.png', revenue: 22600000 },
    { title: '우리 헤어진 적 없는데', year: '2026', genre: '멜로', platforms: ['ReelShort', 'ShortReel', 'Viki'], contract: 'MG + RS', region: 'US · JP', release: '2026.04.28', status: 'active', poster: 'images/posters/우리헤어진적없는데.png', revenue: 49300000 },
    { title: '이번 생은 읽씹합니다', year: '2026', genre: '코미디 로맨스', platforms: ['ShortMax', 'DramaBox'], contract: 'RS', region: 'Global', release: '2026.05.21', status: 'active', poster: 'images/posters/이번생은읽씹합니다.png', revenue: 35100000 },
    { title: '오늘부터 악녀 대행합니다', year: '2024', genre: '복수 코미디', platforms: ['WeTV', 'Mango TV Global'], contract: 'MG + RS', region: 'SEA', release: '2026.01.30', status: 'closed', poster: 'images/posters/오늘부터악녀대행.png', revenue: 17600000 },
    { title: '남편이 AI입니다', year: '2024', genre: '로맨스 SF', platforms: ['ReelShort', 'ShortMax', 'Viki', 'DramaBox'], contract: 'RS', region: 'Global', release: '2026.03.08', status: 'active', poster: 'images/posters/남편이AI.png', revenue: 38700000 },
    { title: '살인범과 룸메이트가 되었다', year: '2026', genre: '스릴러', platforms: ['DramaBox', 'ShortReel'], contract: 'Flat Fee', region: 'US', release: '2026.08.18', status: 'pending', poster: 'images/posters/살인범과룸메이트.png', revenue: 20400000 },
    { title: '내 남편의 비밀 계정', year: '2025', genre: '미스터리 로맨스', platforms: ['Viki', 'WeTV', 'ReelShort'], contract: 'RS', region: 'Global', release: '2026.02.11', status: 'closed', poster: 'images/posters/내남편의비밀계정.png', revenue: 31900000 },
    { title: '달빛 아래 편의점', year: '2022', genre: '청춘 로맨스', platforms: ['Mango TV Global', 'ShortMax'], contract: 'MG + RS', region: 'JP · SEA', release: '2026.05.09', status: 'active', poster: 'images/posters/달빛아래편의점.png', revenue: 16400000 },
    { title: '황후의 복수 노트', year: '2026', genre: '사극 복수', platforms: ['WeTV', 'Viki', 'DramaBox', 'ShortMax'], contract: 'RS', region: 'Global', release: '2026.06.25', status: 'pending', poster: 'images/posters/황후의복수노트.png', revenue: 45200000 },
    { title: '새벽 배송 로맨스', year: '2026', genre: '로맨스', platforms: ['ShortReel', 'ReelShort'], contract: 'Flat Fee', region: 'US', release: '2026.07.22', status: 'pending', poster: 'images/posters/새벽배송로맨스.png', revenue: 13800000 }
  ];

  function platformStage(rowStatus, platformIndex) {
    if (platformIndex === 0) return 'scheduled';
    if (platformIndex === 4) return 'closed';
    if (rowStatus === 'pending') return platformIndex === 0 ? 'scheduled' : 'active';
    if (rowStatus === 'closed') return platformIndex === 0 ? 'closed' : 'active';
    return 'active';
  }

  function shouldHideStageCounts(title) {
    return title === '우리 헤어진 적 없는데';
  }

  function platformStageCounts(platformDetails = []) {
    return platformDetails.reduce((counts, platform) => {
      counts[platform.stage] = (counts[platform.stage] || 0) + 1;
      return counts;
    }, { scheduled: 0, active: 0, closed: 0 });
  }

  function normalizeDate(value) {
    return String(value || '').replace(/\./g, '-');
  }

  function addYears(value, years) {
    const [year, month, day] = normalizeDate(value).split('-').map(Number);
    if (!year || !month || !day) return value;
    return `${year + years}.${String(month).padStart(2, '0')}.${String(day).padStart(2, '0')}`;
  }

  function rightsRegion(rowRegion, platformIndex) {
    const regions = [
      '전세계 (중국 제외)',
      '전세계 (중국, 태국 제외)',
      '전세계 (중국, 일본 제외)'
    ];
    const seed = String(rowRegion || '').length + platformIndex;
    return regions[seed % regions.length];
  }

  const rows = baseRows.map((row, rowIndex) => {
    const platformDetails = row.platforms.map((name, platformIndex) => ({
      name,
      stage: platformStage(row.status, platformIndex),
      contractType: row.platforms.length === 1 ? '독점' : '비독점',
      rightsRegion: rightsRegion(row.region, platformIndex),
      periodStart: row.release,
      periodEnd: addYears(row.release, 2 + ((rowIndex + platformIndex) % 3)),
      releaseDate: row.release,
      views: (rowIndex + 4) * 82300 + platformIndex * 21700,
      follows: (rowIndex + 3) * 3200 + platformIndex * 860,
      likes: (rowIndex + 2) * 6400 + platformIndex * 1900,
      comments: (rowIndex + 1) * 780 + platformIndex * 240,
      revenue: Math.round(row.revenue / row.platforms.length * (1 + platformIndex * 0.08))
    }));

    return {
      ...row,
      id: String(rowIndex),
      exclusivity: row.platforms.length === 1 ? 'exclusive' : 'non-exclusive',
      exclusivityLabel: row.platforms.length === 1 ? '독점' : '비독점',
      displayRegion: rightsRegion(row.region, rowIndex),
      platformDetails,
      platformStageCounts: shouldHideStageCounts(row.title)
        ? { scheduled: 0, active: 0, closed: 0 }
        : platformStageCounts(platformDetails)
    };
  });

  const statusMeta = {
    active: { label: '배급중', className: 'active' },
    pending: { label: '진행예정', className: 'pending' },
    closed: { label: '종료', className: 'closed' }
  };

  const workflowStats = [
    { label: '전체', value: 17, accent: true },
    { label: '진행중', value: 5 },
    { label: '완료', value: 6 },
    { label: '보류', value: 6 }
  ];

  function escapeHtml(value = '') {
    return String(value).replace(/[&<>"']/g, ch => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[ch]));
  }

  function formatNumber(value) {
    return Number(value || 0).toLocaleString('ko-KR');
  }

  function formatMoney(value) {
    return `₩${formatNumber(value)}`;
  }

  function sumPlatforms(row, key) {
    return (row.platformDetails || []).reduce((total, platform) => total + Number(platform[key] || 0), 0);
  }

  function findRowById(id) {
    return rows.find(row => row.id === String(id)) || rows[0];
  }

  window.ShortflowDistributionData = {
    rows,
    statusMeta,
    workflowStats,
    escapeHtml,
    formatNumber,
    formatMoney,
    sumPlatforms,
    platformStageCounts,
    findRowById
  };
})();
