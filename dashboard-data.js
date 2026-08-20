(function () {
  const workflowItems = [
    { id: 'w1', title: '턴키 구매 의사', englishTitle: 'Content Not Selected', sub: '콘텐츠 미확정', workflowType: '턴키', status: 'INQUIRY_SENT', date: '2026년 5월 20일', poster: 'none', hasWorkflowUpdate: true, confirmedContents: [
      { title: '비밀 사내 결혼', price: 'USD 24,000', distributionType: '비독점', settlementMethod: 'RS', rsRatio: '32%' },
      { title: '달빛 아래 편의점', price: 'MG USD 13,000', distributionType: '독점', settlementMethod: 'MG + RS', rsRatio: '24%' },
      { title: '첫사랑 리셋 버튼', price: 'USD 11,000', distributionType: '비독점', settlementMethod: 'Flat Fee', rsRatio: '-' },
    ] },
    { id: 'w2', title: '대표님이 내 전남친입니다', englishTitle: 'My CEO Is My Ex-Boyfriend', sub: '로맨스 · 80화', workflowType: '단일', status: 'CONFIRM_ACKNOWLEDGED', date: '2026년 5월 19일', poster: 'rose', image: 'images/posters/대표님이내전남친입니다.png', hasWorkflowUpdate: true },
    { id: 'w3', title: '재벌집 막내 비서', englishTitle: 'The Chaebol Family’s Youngest Secretary', sub: '로맨스 · 여성향 · 72화', workflowType: '단일', status: 'INQUIRY_SENT', date: '2026년 5월 19일', poster: 'indigo', image: 'images/posters/재벌집막내비서.png' },
    { id: 'w4', title: '죽었다가 회귀한 톱스타', englishTitle: 'The Top Star Who Came Back to Life', sub: '타임슬립 · 액션 · 80화', workflowType: '묶음', status: 'INQUIRY_SENT', date: '2026년 5월 19일', poster: 'rose', image: 'images/posters/죽었다가회귀한.png', confirmedContents: [
      { title: '죽었다가 회귀한 톱스타', price: 'USD 18,000', distributionType: '비독점', settlementMethod: 'Flat Fee', rsRatio: '-' },
      { title: '우리 집에 킬러가 산다', price: 'USD 12,000', distributionType: '비독점', settlementMethod: 'RS', rsRatio: '35%' },
      { title: '오늘부터 악녀 대행합니다', price: 'MG USD 16,000', distributionType: '독점', settlementMethod: 'MG + RS', rsRatio: '25%' },
    ] },
    { id: 'w5', title: '우리 집에 킬러가 산다', englishTitle: 'A Killer Lives in My House', sub: '스릴러 · 코미디 · 64화', workflowType: '묶음', status: 'CONFIRM_SENT', date: '2026년 5월 18일', poster: 'indigo', image: 'images/posters/우리집에킬러가산다.png', hasWorkflowUpdate: true, confirmedContents: [
      { title: '우리 집에 킬러가 산다', price: 'USD 12,000', distributionType: '비독점', settlementMethod: 'RS', rsRatio: '35%' },
      { title: '남편이 AI입니다', price: 'MG USD 16,500', distributionType: '독점', settlementMethod: 'MG + RS', rsRatio: '28%' },
    ] },
    { id: 'w6', title: '오늘부터 악녀 대행합니다', englishTitle: 'Villainess for Hire', sub: '로맨스 · 코미디 · 70화', workflowType: '단일', status: 'METADATA_GRANTED', date: '2026년 5월 18일', poster: 'rose', image: 'images/posters/오늘부터악녀대행.png' },
    { id: 'w7', title: '남편이 AI입니다', englishTitle: 'My Husband Is an AI', sub: '로맨스 · SF · 코미디 · 60화', workflowType: '컨시어지', status: 'METADATA_GRANTED', date: '2026년 5월 18일', poster: 'magenta', image: 'images/posters/남편이AI.png', hasWorkflowUpdate: true, confirmedContents: [
      { title: '남편이 AI입니다', price: 'MG USD 16,500', distributionType: '독점', settlementMethod: 'MG + RS', rsRatio: '28%' },
      { title: '대표님이 내 전남친입니다', price: 'USD 30,000', distributionType: '비독점', settlementMethod: 'RS', rsRatio: '30%' },
      { title: '재벌집 막내 비서', price: 'MG USD 22,000', distributionType: '독점', settlementMethod: 'MG + RS', rsRatio: '25%' },
    ] },
    { id: 'w8', title: '비밀 사내 결혼', englishTitle: 'Secret Office Marriage', sub: '오피스 로맨스 · 72화', workflowType: '턴키', status: 'CONFIRM_ACKNOWLEDGED', date: '2026년 5월 17일', poster: 'indigo', image: 'images/posters/비밀사내결혼.png', confirmedContents: [
      { title: '비밀 사내 결혼', price: 'USD 24,000', distributionType: '비독점', settlementMethod: 'RS', rsRatio: '32%' },
      { title: '왕자님의 퇴근길', price: 'MG USD 19,000', distributionType: '독점', settlementMethod: 'MG + RS', rsRatio: '26%' },
      { title: '새벽 배송 로맨스', price: 'USD 10,000', distributionType: '비독점', settlementMethod: 'Flat Fee', rsRatio: '-' },
    ] },
    { id: 'w9', title: '달빛 아래 편의점', englishTitle: 'Moonlight Convenience Store', sub: '청춘 로맨스 · 52화', workflowType: '컨시어지', status: 'CONFIRM_SENT', date: '2026년 5월 16일', poster: 'indigo', image: 'images/posters/달빛아래편의점.png', hasWorkflowUpdate: true, confirmedContents: [
      { title: '달빛 아래 편의점', price: 'MG USD 13,000', distributionType: '독점', settlementMethod: 'MG + RS', rsRatio: '24%' },
      { title: '첫사랑 리셋 버튼', price: 'USD 11,000', distributionType: '비독점', settlementMethod: 'Flat Fee', rsRatio: '-' },
    ] },
    { id: 'w10', title: '첫사랑 리셋 버튼', englishTitle: 'First Love Reset Button', sub: '청춘 로맨스 · 48화', workflowType: '묶음', status: 'CLOSED', date: '2026년 5월 15일', poster: 'rose', image: 'images/posters/첫사랑리셋버튼.png', confirmedContents: [
      { title: '첫사랑 리셋 버튼', price: 'USD 11,000', distributionType: '비독점', settlementMethod: 'Flat Fee', rsRatio: '-' },
      { title: '비밀 사내 결혼', price: 'USD 24,000', distributionType: '비독점', settlementMethod: 'RS', rsRatio: '32%' },
    ] },
  ];

  const workflowStats = [
    { label: '전체', value: 25, accent: true },
    { label: '매칭중', value: 19 },
    { label: '매칭성사', value: 5 },
    { label: '매칭보류', value: 1 },
  ];

  function producerStatusLabel(item) {
    const labels = {
      PRODUCTION_CONTENT_SUBMITTED: '검토중',
      PRODUCTION_CONTENT_APPROVED: '승인완료',
      PRODUCTION_REVISION_REQUESTED: '검토중',
      PRODUCTION_REVISION_APPROVED: '승인완료',
      PRODUCTION_REVISION_CANCELLED: '승인완료',
    };
    return labels[item.status] || item.status;
  }

  const producerWorkflowItems = [
    { id: 'prod-space-courier', title: '우주 택배 기사님', sub: '숏애니 · 48화 · SF 가족', status: 'PRODUCTION_CONTENT_APPROVED', date: '2026년 7월 12일', poster: 'indigo', image: 'images/posters/우주택배기사님.png', driveUrl: 'https://drive.google.com/drive/my-drive', hasWorkflowUpdate: true },
    { id: 'prod-chaebol-secretary', title: '재벌집 막내 비서', sub: '숏드라마 · 72화 · 로맨스', status: 'PRODUCTION_CONTENT_SUBMITTED', date: '2026년 7월 12일', poster: 'indigo', image: 'images/posters/재벌집막내비서.png' },
    { id: 'prod-idol-transfer', title: '우리 반 전학생은 아이돌', contentKind: '기획안', sub: '숏드라마 · 60화 · 학원물', status: 'PRODUCTION_CONTENT_SUBMITTED', date: '2026년 7월 11일', poster: 'magenta', image: 'images/posters/우리반전학생은아이돌.png' },
    {
      id: 'prod-secret-marriage',
      title: '비밀 사내 결혼',
      sub: '숏드라마 · 72화 · 오피스 로맨스',
      status: 'PRODUCTION_CONTENT_APPROVED',
      date: '2026년 7월 13일',
      poster: 'indigo',
      image: 'images/posters/비밀사내결혼.png',
      driveUrl: 'https://drive.google.com/drive/my-drive',
      detailUrl: 'my-content-detail.html?title=%EB%B9%84%EB%B0%80%20%EC%82%AC%EB%82%B4%20%EA%B2%B0%ED%98%BC',
      hasWorkflowUpdate: true,
      timeline: [
        { title: '관리자가 콘텐츠 등록을 승인했어요.', date: '2026년 7월 13일 오후 04:20', active: true },
        { title: '관리자 검토가 완료되었습니다.', date: '2026년 7월 13일 오후 03:10' },
        { title: '콘텐츠 등록을 신청했어요.', date: '2026년 7월 12일 오전 10:12' },
        { title: '콘텐츠 정보가 저장되었습니다.', date: '2026년 7월 12일 오전 09:54' },
      ],
    },
    { id: 'prod-prince-afterwork', title: '왕자님의 퇴근길', contentKind: '기획안', sub: '숏드라마 · 56화 · 판타지 로맨스', status: 'PRODUCTION_REVISION_REQUESTED', date: '2026년 7월 11일', poster: 'magenta', image: 'images/posters/왕자님의퇴근길.png' },
    { id: 'prod-ai-husband', title: '남편이 AI입니다', sub: 'AI · 60화 · 로맨스 SF', status: 'PRODUCTION_REVISION_APPROVED', date: '2026년 7월 10일', poster: 'rose', image: 'images/posters/남편이AI.png', driveUrl: 'https://drive.google.com/drive/my-drive', hasWorkflowUpdate: true },
    { id: 'prod-villainess-agency', title: '오늘부터 악녀 대행합니다', sub: '숏드라마 · 70화 · 복수 코미디', status: 'PRODUCTION_CONTENT_SUBMITTED', date: '2026년 7월 10일', poster: 'rose', image: 'images/posters/오늘부터악녀대행.png' },
    { id: 'prod-emperor-resign', title: '퇴사했더니 황제가 됐다', sub: '숏드라마 · 66화 · 판타지', status: 'PRODUCTION_REVISION_REQUESTED', date: '2026년 7월 9일', poster: 'indigo', image: 'images/posters/퇴사했더니황제.png' },
    { id: 'prod-danger-partner', title: '나의 위험한 파트너', sub: '숏드라마 · 64화 · 스릴러 로맨스', status: 'PRODUCTION_REVISION_CANCELLED', date: '2026년 7월 9일', poster: 'magenta', image: 'images/posters/나의위험한파트너.png' },
    { id: 'prod-second-ending', title: '그녀의 두 번째 엔딩', contentKind: '기획안', sub: '숏드라마 · 58화 · 시간 여행', status: 'PRODUCTION_CONTENT_SUBMITTED', date: '2026년 7월 8일', poster: 'indigo', image: 'images/posters/그녀의두번째엔딩.png' },
    { id: 'prod-ceo-contract-love', title: '대표님, 계약 연애는 처음이라서요', sub: '숏드라마 · 80화 · 로맨스', status: 'PRODUCTION_CONTENT_APPROVED', date: '2026년 7월 8일', poster: 'rose', image: 'images/posters/대표님이내전남친입니다.png', driveUrl: 'https://drive.google.com/drive/my-drive' },
    { id: 'prod-moonlight-store', title: '달빛 아래 편의점', sub: '숏애니 · 52화 · 청춘 로맨스', status: 'PRODUCTION_REVISION_REQUESTED', date: '2026년 7월 7일', poster: 'indigo', image: 'images/posters/달빛아래편의점.png', hasWorkflowUpdate: true },
    { id: 'prod-killer-roommate', title: '살인범과 룸메이트가 되었다', sub: '숏드라마 · 62화 · 스릴러', status: 'PRODUCTION_CONTENT_APPROVED', date: '2026년 7월 7일', poster: 'magenta', image: 'images/posters/살인범과룸메이트.png', driveUrl: 'https://drive.google.com/drive/my-drive' },
    { id: 'prod-dawn-delivery', title: '새벽 배송 로맨스', contentKind: '기획안', sub: '숏드라마 · 50화 · 로맨스', status: 'PRODUCTION_REVISION_CANCELLED', date: '2026년 7월 6일', poster: 'rose', image: 'images/posters/새벽배송로맨스.png' },
    { id: 'prod-fox-manager', title: '내 매니저는 구미호', sub: '숏드라마 · 54화 · 판타지', status: 'PRODUCTION_REVISION_APPROVED', date: '2026년 7월 6일', poster: 'rose', image: 'images/posters/내매니저는구미호.png', driveUrl: 'https://drive.google.com/drive/my-drive' },
    { id: 'prod-first-love-reset', title: '첫사랑 리셋 버튼', sub: '숏드라마 · 48화 · 청춘 로맨스', status: 'PRODUCTION_CONTENT_SUBMITTED', date: '2026년 7월 5일', poster: 'indigo', image: 'images/posters/첫사랑리셋버튼.png' },
    { id: 'prod-contract-3days', title: '계약 종료 3일 전', sub: '숏드라마 · 45화 · 멜로', status: 'PRODUCTION_REVISION_APPROVED', date: '2026년 7월 5일', poster: 'magenta', image: 'images/posters/계약종료3일전.png', driveUrl: 'https://drive.google.com/drive/my-drive' },
  ].map(item => {
    const normalized = { contentKind: '콘텐츠', ...item };
    return { ...normalized, statusLabel: producerStatusLabel(normalized) };
  });

  const producerWorkflowStats = [
    { label: '전체', value: 17, accent: true },
    { label: '진행중', value: 5 },
    { label: '완료', value: 6 },
    { label: '보류', value: 6 },
  ];

  const PRODUCTION_INQUIRY_STORAGE_KEY = 'shortflow-production-inquiries';

  function storedProductionInquiryItems() {
    let savedItems = [];

    try {
      savedItems = JSON.parse(localStorage.getItem(PRODUCTION_INQUIRY_STORAGE_KEY) || '[]');
    } catch (error) {
      savedItems = [];
    }

    if (!Array.isArray(savedItems)) return [];

    return savedItems
      .filter(item => item && item.full)
      .map((item, index) => ({
        id: item.id || `pc-stored-${index}`,
        inquiryType: item.inquiryType || '제작협업',
        title: item.title || '제작협업 문의',
        contentTitle: item.contentTitle || item.content || '',
        producerName: item.producerName || item.producer || '',
        date: item.date || '',
        time: item.time || '',
        statusLabel: item.statusLabel || '전송됨',
        full: item.full,
        adminComments: Array.isArray(item.adminComments) ? item.adminComments : undefined,
      }));
  }

  const messageItems = [
    ...storedProductionInquiryItems(),
    {
      id: 'm-production-1',
      inquiryType: '제작협업',
      title: '죽었다가 회귀한 톱스타 제작 문의',
      contentTitle: '죽었다가 회귀한 톱스타',
      producerName: 'Orbit Pictures',
      date: '2026.07.07',
      time: '13:20',
      statusLabel: '전송됨',
      full: `파일럿 촬영 완료본 기준으로 플랫폼 오리지널 편성을 검토하고 싶습니다.
희망 제작 일정, 추가 회차 확장 가능 여부, 주요 캐스팅 조건을 함께 논의하고 싶습니다.`,
    },
    {
      id: 'm1',
      inquiryType: '컨시어지판매',
      title: '오피스 와이프의 남자 사냥법 매칭 의뢰',
      date: '2026.05.19',
      time: '14:32',
      statusLabel: '확인됨',
      full: `안녕하세요, 매니저님.

보유 IP를 다음과 같이 매칭 의뢰드립니다:

· 보유 IP: '오피스 와이프의 남자 사냥법'
· 형식: 숏드라마 / 80화 / 완결
· 장르: 로맨스/복수/치정
· 보유 권리: 글로벌 (한국 제외) 완전 보유
· 희망 지역: 영어권, 동남아
· 정산: MG+RS 선호 (MG 최소 $80,000)
· 더빙: 영어/베트남어 자체 보유

연락 부탁드립니다.`,
      adminComments: [
        {
          name: '관리자',
          date: '2026.05.19',
          time: '16:05',
          body: `문의 내용 확인했습니다. 전달해주신 권리 범위와 희망 지역 기준으로 영어권/동남아 플랫폼 후보를 검토해보겠습니다. MG 기준과 더빙 보유 자료도 함께 확인 후 다음 단계 안내드리겠습니다.`
        }
      ],
    },
    {
      id: 'm2',
      inquiryType: '컨시어지판매',
      title: '로맨스 IP 영어권 패키지 매칭 문의',
      date: '2026.05.12',
      time: '09:18',
      statusLabel: '확인됨',
      full: `로맨스 장르 IP 5편을 영어권 진출용 패키지로 매칭하고 싶습니다.

보유 작품:
1. 사랑의 코딩법 (60화)
2. Save My Favorite (80화)
3. 가능성 제로 로맨스 (50화)
4. 죽은 줄 알았던 남편이 돌아왔다 (75화)
5. 닥터 루시퍼 (90화)

전 작품 영어 더빙 보유. 영어권 메이저 플랫폼 매칭 희망.`,
      adminComments: [
        {
          name: '관리자',
          date: '2026.05.12',
          time: '11:40',
          body: `패키지 구성 확인했습니다. 작품별 회차, 더빙 파일 보유 여부, 공개 가능 소재를 기준으로 제안서 초안을 준비하겠습니다. 추가 확인이 필요한 항목은 별도로 연락드리겠습니다.`
        }
      ],
    },
    {
      id: 'm3',
      inquiryType: '컨시어지판매',
      title: '동남아 권역 복수극 매칭 의뢰',
      date: '2026.04.28',
      time: '17:45',
      statusLabel: '전송됨',
      full: `복수극 장르 10편을 동남아 권역 (인도네시아, 베트남, 태국) 매칭 의뢰드립니다.

· 작품 수: 10편 (회당 60화 평균)
· 장르: 복수/치정/스릴러 믹스
· 희망 매칭: 8주 이내
· 정산 조건: MG 협의 가능`,
    },
  ];

  window.ShortflowData = {
    workflowItems,
    workflowStats,
    producerWorkflowItems,
    producerWorkflowStats,
    messageItems,
  };
})();
