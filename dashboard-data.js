(function () {
  const workflowItems = [
    { id: 'w2', title: '대표님이 내 전남친입니다', englishTitle: 'My CEO Is My Ex-Boyfriend', sub: '로맨스 · 80화', status: '컨펌 확인됨', date: '2026년 5월 19일', poster: 'rose', image: 'images/대표님이내전남친.png' },
    { id: 'w3', title: '재벌집 막내 비서', englishTitle: 'The Chaebol Family’s Youngest Secretary', sub: '로맨스 · 여성향 · 72화', status: '유통 제안 전달됨', date: '2026년 5월 19일', poster: 'indigo', image: 'images/재벌집막내비서.png' },
    { id: 'w4', title: '죽었다가 회귀한 톱스타', englishTitle: 'The Top Star Who Came Back to Life', sub: '타임슬립 · 액션 · 80화', status: '유통 제안 전달됨', date: '2026년 5월 19일', poster: 'rose', image: 'images/죽었다가회귀한.png' },
    { id: 'w5', title: '우리 집에 킬러가 산다', englishTitle: 'A Killer Lives in My House', sub: '스릴러 · 코미디 · 64화', status: '제안 조건 수신됨', date: '2026년 5월 18일', poster: 'indigo', image: 'images/우리집에킬러가.png' },
    { id: 'w6', title: '오늘부터 악녀 대행합니다', englishTitle: 'Villainess for Hire', sub: '로맨스 · 코미디 · 70화', status: '유통 제안 전달됨', date: '2026년 5월 18일', poster: 'rose', image: 'images/오늘부터악녀대행.png' },
    { id: 'w7', title: '남편이 AI입니다', englishTitle: 'My Husband Is an AI', sub: '로맨스 · SF · 코미디 · 60화', status: '메타데이터 전달됨', date: '2026년 5월 18일', poster: 'magenta', image: 'images/남편이AI.png' },
    { id: 'w1', title: '컨시어지 구매 의사', englishTitle: 'Content Not Selected', sub: '콘텐츠 미확정', status: '유통 제안 전달됨', date: '2026년 5월 20일', poster: 'none' },
  ];

  const workflowStats = [
    { label: '전체', value: 25, accent: true },
    { label: '매칭중', value: 19 },
    { label: '매칭성사', value: 5 },
    { label: '매칭보류', value: 1 },
  ];

  const producerStatusLabels = {
    CONTENT_SUBMITTED: '콘텐츠 등록 신청',
    CONTENT_APPROVED: '콘텐츠 승인됨',
    REVISION_REQUESTED: '수정 신청',
    REVISION_APPROVED: '수정 승인됨',
  };

  const producerWorkflowItems = [
    { id: 'p1', title: '대표님이 내 전남친입니다', sub: '숏드라마 · 80화', status: 'CONTENT_SUBMITTED', date: '2026년 6월 8일', poster: 'rose', image: 'images/대표님이내전남친.png' },
    { id: 'p2', title: '재벌집 막내 비서', sub: '숏드라마 · 72화', status: 'CONTENT_APPROVED', date: '2026년 6월 7일', poster: 'indigo', image: 'images/재벌집막내비서.png' },
    { id: 'p4', title: '죽었다가 회귀한 톱스타', sub: '숏드라마 · 80화', status: 'REVISION_REQUESTED', date: '2026년 6월 4일', poster: 'magenta', image: 'images/죽었다가회귀한.png' },
    { id: 'p5', title: '우리 집에 킬러가 산다', sub: '숏드라마 · 64화', status: 'REVISION_APPROVED', date: '2026년 6월 3일', poster: 'indigo', image: 'images/우리집에킬러가.png' },
  ].map(item => ({ ...item, statusLabel: producerStatusLabels[item.status] }));

  const producerInProgressStatuses = new Set(['CONTENT_SUBMITTED', 'REVISION_REQUESTED']);
  const producerCompletedStatuses = new Set(['CONTENT_APPROVED', 'REVISION_APPROVED']);
  const producerWorkflowStats = [
    { label: '전체', value: producerWorkflowItems.length, accent: true },
    { label: '진행중', value: producerWorkflowItems.filter(item => producerInProgressStatuses.has(item.status)).length },
    { label: '완료', value: producerWorkflowItems.filter(item => producerCompletedStatuses.has(item.status)).length },
    { label: '보류', value: 0 },
  ];

  const messageItems = [
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
    producerStatusLabels,
    producerWorkflowItems,
    producerWorkflowStats,
    messageItems,
  };
})();
