(function () {
  const workflowItems = [
    { id: 'w1', title: '컨시어지 구매 의사', sub: '콘텐츠 미확정', status: '유통 제안 전달됨', date: '2026년 5월 20일', poster: 'none' },
    { id: 'w2', title: '거짓 커밍 아웃 대소동 외 1개', sub: '거짓 커밍 아웃 대소동 외 1개', status: '컨펌 확인됨', date: '2026년 5월 19일', poster: 'rose' },
    { id: 'w3', title: 'Save My Favorite', sub: '사랑의 코딩법: 죽음의 타임루프', status: '유통 제안 전달됨', date: '2026년 5월 19일', poster: 'indigo' },
    { id: 'w4', title: '죽은 줄 알았던 남편이 돌아왔다', sub: '以为已死的丈夫回来了', status: '유통 제안 전달됨', date: '2026년 5월 19일', poster: 'rose' },
    { id: 'w5', title: '닥터루시퍼', sub: 'Dr. Lucifer', status: '유통 제안 전달됨', date: '2026년 5월 18일', poster: 'none' },
    { id: 'w6', title: '거짓 커밍 아웃 대소동', sub: '가능성제로로맨스', status: '유통 제안 전달됨', date: '2026년 5월 18일', poster: 'rose' },
    { id: 'w7', title: '닥터루시퍼', sub: 'The Office Mistress: How the Witch Hunts Men', status: '유통 제안 전달됨', date: '2026년 5월 18일', poster: 'magenta' },
  ];

  const workflowStats = [
    { label: '전체', value: 25, accent: true },
    { label: '매칭중', value: 19 },
    { label: '매칭성사', value: 5 },
    { label: '매칭보류', value: 1 },
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

  window.ShortflowData = { workflowItems, workflowStats, messageItems };
})();
