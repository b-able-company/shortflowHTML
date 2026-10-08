/* ==========================================================================
   Mock data — everything the mockup displays. No backend.
   SF.projects        projects on Home / Projects / Distribution
   SF.opportunities   open calls
   SF.prod            the AI-prepared production (characters, look, episodes, scene plans, costs)
   ========================================================================== */
window.SF = {
  user: { name: '지민', company: '모노필름', initial: '모' },
  credits: { balance: 12480 },
  projects: [],
  statusLabel: { concept: 'Concept', script: 'Production · Scene plan', storyboard: 'Production · Previews ready', video: 'Episodes · In production', ready: 'Ready to submit', review: 'In Shortflow review', live: 'Live · 2 platforms' },
  opportunities: [
    { id: 'orig-revenge', image: 'public/poster/webp/opportunity-revenge.webp', kind: 'Shortflow Original', title: '복수 소재 Vertical Short Drama 모집', hue: 355, dday: 'D-12', deadline: 'Oct 20, 2026',
      summary: '배신, 귀환, 응징. Shortflow가 직접 투자·유통하는 오리지널 라인업에 합류할 복수극을 찾습니다.',
      facts: [['Episodes', '60'], ['Runtime', '1–2 min / episode'], ['Format', 'Vertical 9:16'], ['Distribution', 'Shortflow Originals · KR, JP']],
      short: '60 episodes · KR, JP' },
    { id: 'gp-fantasy', image: 'public/poster/webp/opportunity-gp-fantasy.webp', thumbnail: 'public/poster/webp/opportunity-gp-fantasy-thumb.webp', kind: 'Global Platform Request', title: '여성향 Fantasy 작품 모집', hue: 300, dday: 'D-26', deadline: 'Nov 3, 2026',
      summary: '일본·동남아 버티컬 드라마 플랫폼이 로맨스 판타지 신작을 찾고 있습니다.',
      facts: [['Episodes', '40–80'], ['Runtime', '1–3 min'], ['Format', 'Vertical 9:16'], ['Distribution', 'Japan · SEA']],
      short: 'Japan / SEA distribution' },
    { id: 'challenge', image: 'public/poster/webp/opportunity-challenge.webp', thumbnail: 'public/poster/webp/opportunity-challenge-thumb.webp', kind: 'AI Short Drama Challenge', title: '‘첫 출근’ 1분 숏드라마 챌린지', hue: 205, dday: 'D-5', deadline: 'Oct 13, 2026',
      summary: '‘첫 출근’을 소재로 1분짜리 숏드라마를 만들어 제출하세요. 우수작은 Shortflow 홈 피처드.',
      facts: [['Episodes', '1'], ['Runtime', '≤ 60 sec'], ['Format', 'Vertical 9:16'], ['Prize', 'Featured + 50,000 credits']],
      short: '1 episode · 60 sec' },
    { id: 'open-thriller', image: 'public/poster/webp/opportunity-open-thriller.webp', thumbnail: 'public/poster/webp/opportunity-open-thriller-thumb.webp', kind: 'Open Call', title: '스릴러 · 미스터리 상시 모집', hue: 230, dday: 'Always open', deadline: 'Rolling',
      summary: '장르 스릴러와 미스터리 숏드라마를 상시 검토합니다.',
      facts: [['Episodes', 'Any'], ['Runtime', '1–3 min'], ['Format', 'Vertical 9:16'], ['Distribution', 'Matched per title']],
      short: 'Rolling review' },
  ],
};

/* Start-a-project entry points (Home + New project dialog) */
SF.startOptions = [
  { key: 'idea', icon: 'lightbulb', title: 'From an idea', desc: 'A logline or a feeling is enough.' },
  { key: 'content', icon: 'library', title: 'From Shortflow content', desc: 'Adapt IP already registered on Shortflow.' },
  { key: 'script', icon: 'file-text', title: 'From a script', desc: 'Upload it — AI prepares the production.' },
  { key: 'opportunity', icon: 'compass', title: 'From an opportunity', desc: '3 open calls match your studio.', accent: true },
];
/* Shortflow content (IP) the user can adapt */
SF.contentIP = [{ id: 'ip1', t: '이혼 도장 찍고, 대표님과 결혼했다', h: 340 }, { id: 'ip2', t: '검은 정원', h: 120 }, { id: 'ip3', t: '마지막 레시피', h: 40 }];
/* Credit prices shown next to paid actions (Shortflow credits only — no vendor pricing) */
SF.pricing = { previewPerScene: 3, sceneRemake: 24 };
/* Project Overview — recent activity */
/* Opportunity detail copy */
SF.opportunityDetail = {
  lookingFor: {
    'orig-revenge': ['배신과 귀환, 통쾌한 응징 구조가 명확한 복수극', '1화 30초 안에 훅이 걸리는 오프닝', '시즌 확장이 가능한 세계관과 인물 관계', '기존 IP 각색 또는 오리지널 모두 가능'],
    default: ['장르 문법이 분명한 작품', '1화 안에 주요 갈등 제시', '시리즈 확장 가능성'],
  },
  requirements: ['Vertical 9:16, 1–2 min per episode', 'Pilot (EP.01–03) at submission', 'Full series outline', 'Rights cleared for adaptation'],
  benefits: [['Production funding', 'Selected titles receive a Shortflow production investment.'], ['Studio credits', '30,000 bonus credits once your project is linked.'], ['Guaranteed release', 'Shortflow Originals channel in KR, JP at launch.']],
};
/* Distribution pipeline steps */
SF.distributionSteps = ['Submitted', 'Shortflow review', 'Platform matching', 'Live'];

/* Four independent, editable project fixtures. Preview artwork uses the existing mock renderer. */
SF.projects = [
  {
    "id": "nightstore",
    "title": "이혼 도장 찍고, 대표님과 결혼했다",
    "format": "Vertical Short Drama",
    "source": "Script",
    "hue": 340,
    "episodes": 12,
    "edited": "1 hour ago",
    "status": "video",
    "submitted": false,
    "logline": "남편과 절친의 불륜을 생중계한 날, 해고까지 당한 웨딩플래너 윤서. 그녀에게 경쟁사 대표 태준이 90일 계약결혼을 제안한다. 복수를 위한 가짜 신부가 된 윤서는 자신의 몰락과 태준 가문의 후계 전쟁이 연결돼 있음을 알게 된다.",
    "flow": {
      "stage": "producing",
      "eps": [
        1,
        1,
        1,
        0.42,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      "speed": 0.004
    },
    "previewReady": {
      "EP.01": 1,
      "EP.03": 1
    },
    "production": {
      "summary": {
        "episodes": 12,
        "characters": 4,
        "locations": 7,
        "scenes": 36,
        "runtime": "12m 00s",
        "credits": 8400
      },
      "looks": [
        {
          "key": "ai",
          "label": "AI pick",
          "note": "대본에 맞춰 자동 선택"
        },
        {
          "key": "webtoon",
          "label": "2D",
          "video": "public/video/loops/2dvideo.mp4"
        },
        {
          "key": "anim",
          "label": "3D",
          "video": "public/video/loops/3dvideo.mp4"
        },
        {
          "key": "live",
          "label": "실사",
          "video": "public/video/loops/realvideo.mp4"
        }
      ],
      "style": {
        "label": "Contract marriage · Live-action",
        "mood": "샴페인 골드의 호텔과 푸른 새벽빛. 공개석상의 완벽한 부부와 문이 닫힌 뒤의 불안한 거리감."
      },
      "characters": [
        {
          "id": "nightstore-c1",
          "name": "한윤서",
          "role": "Lead · 29",
          "desc": "남의 결혼식을 완벽하게 만들었지만 자신의 결혼에는 배신당한 웨딩플래너. 복수보다 자기 이름을 되찾고 싶다.",
          "image": "public/peoplenplace/한윤서.webp",
          "hue": 5
        },
        {
          "id": "nightstore-c2",
          "name": "서태준",
          "role": "Lead · 33",
          "desc": "결혼해야 의결권을 상속받는 호텔그룹 대표. 윤서에게 계약을 제안하지만 오래전 그녀에게 진 빚을 숨긴다.",
          "image": "public/peoplenplace/서태준.webp",
          "hue": 30
        },
        {
          "id": "nightstore-c3",
          "name": "강민혁",
          "role": "Antagonist · 32",
          "desc": "윤서의 포트폴리오를 훔쳐 성공한 전남편. 이혼 뒤에도 그녀를 통제하려 한다.",
          "image": "public/peoplenplace/강민혁.webp",
          "hue": 55
        },
        {
          "id": "nightstore-c4",
          "name": "백세린",
          "role": "Supporting · 29",
          "desc": "윤서의 절친이자 민혁의 새 약혼녀. 태준의 경쟁사에 윤서의 정보를 넘긴다.",
          "image": "public/peoplenplace/백세린.webp",
          "hue": 80
        }
      ],
      "others": [
        "비서",
        "경비원",
        "기자",
        "직원"
      ],
      "locations": [
        {"name": "호텔 연회장", "image": "public/peoplenplace/연회장.webp"},
        {"name": "대표실", "image": "public/peoplenplace/대표실.webp"},
        {"name": "웨딩숍", "image": "public/peoplenplace/웨딩숍.webp"},
        {"name": "펜트하우스", "image": "public/peoplenplace/펜트하우스.webp"},
        {"name": "주차장", "image": "public/peoplenplace/주차장.webp"},
        {"name": "주주총회장", "image": "public/peoplenplace/주주총회장.webp"},
        {"name": "루프톱", "image": "public/peoplenplace/루프톱.webp"}
      ],
      "episodes": [
        {
          "code": "EP.01",
          "title": "이혼식에 오신 걸 환영합니다",
          "summary": "윤서가 결혼기념일 연회 스크린에 남편의 불륜 영상을 틀자, 맨 뒷자리의 태준이 박수를 친다.",
          "runtime": "60s",
          "scenes": [
            {
              "id": "nightstore-e1s1",
              "text": "호텔 연회장. 윤서가 결혼기념일 연회 스크린에 남편의 불륜 영상을 틀자, 맨 뒷자리의 태준이 박수를 친다.",
              "image": "public/peoplenplace/이혼식1.webp",
              "line": "",
              "sec": 24
            },
            {
              "id": "nightstore-e1s2",
              "text": "한윤서의 클로즈업. 상대의 반응을 살피고 침묵을 깨뜨린다.",
              "image": "public/peoplenplace/이혼식2.webp",
              "line": "축의금 대신, 이혼 서류 받아.",
              "sec": 20
            },
            {
              "id": "nightstore-e1s3",
              "text": "대답 직전 멈추는 시선. 일자리까지 잃은 윤서 앞에 태준이 혼인계약서와 호텔 크리에이티브 디렉터 명함을 내려놓는다.",
              "image": "public/peoplenplace/이혼식3.webp",
              "line": "",
              "sec": 16
            }
          ]
        },
        {
          "code": "EP.02",
          "title": "90일짜리 신부",
          "summary": "일자리까지 잃은 윤서 앞에 태준이 혼인계약서와 호텔 크리에이티브 디렉터 명함을 내려놓는다.",
          "runtime": "60s",
          "scenes": [
            {
              "id": "nightstore-e2s1",
              "text": "대표실. 일자리까지 잃은 윤서 앞에 태준이 혼인계약서와 호텔 크리에이티브 디렉터 명함을 내려놓는다.",
              "line": "",
              "sec": 24
            },
            {
              "id": "nightstore-e2s2",
              "text": "한윤서의 클로즈업. 상대의 반응을 살피고 침묵을 깨뜨린다.",
              "line": "복수할 자리, 내가 만들어 줄게요.",
              "sec": 20
            },
            {
              "id": "nightstore-e2s3",
              "text": "대답 직전 멈추는 시선. 윤서가 태준의 아내로 웨딩숍에 등장하자 민혁은 자신이 맡은 최대 고객이 그녀임을 알게 된다.",
              "line": "",
              "sec": 16
            }
          ]
        },
        {
          "code": "EP.03",
          "title": "전남편의 VIP 고객",
          "summary": "윤서가 태준의 아내로 웨딩숍에 등장하자 민혁은 자신이 맡은 최대 고객이 그녀임을 알게 된다.",
          "runtime": "60s",
          "scenes": [
            {
              "id": "nightstore-e3s1",
              "text": "웨딩숍. 윤서가 태준의 아내로 웨딩숍에 등장하자 민혁은 자신이 맡은 최대 고객이 그녀임을 알게 된다.",
              "image": "public/peoplenplace/epthree1.webp",
              "line": "",
              "sec": 24
            },
            {
              "id": "nightstore-e3s2",
              "text": "한윤서의 클로즈업. 상대의 반응을 살피고 침묵을 깨뜨린다.",
              "image": "public/peoplenplace/epthree2.webp",
              "line": "담당자님, 제 드레스부터 가져오세요.",
              "sec": 20
            },
            {
              "id": "nightstore-e3s3",
              "text": "대답 직전 멈추는 시선. 기자들이 결혼을 의심하자 태준이 윤서에게 먼저 허락을 구하고 손을 잡는다.",
              "image": "public/peoplenplace/epthree3.webp",
              "line": "",
              "sec": 16
            }
          ]
        },
        {
          "code": "EP.04",
          "title": "입맞춤은 계약 밖",
          "summary": "기자들이 결혼을 의심하자 태준이 윤서에게 먼저 허락을 구하고 손을 잡는다.",
          "runtime": "60s",
          "scenes": [
            {
              "id": "nightstore-e4s1",
              "text": "펜트하우스. 기자들이 결혼을 의심하자 태준이 윤서에게 먼저 허락을 구하고 손을 잡는다.",
              "line": "",
              "sec": 24
            },
            {
              "id": "nightstore-e4s2",
              "text": "한윤서의 클로즈업. 상대의 반응을 살피고 침묵을 깨뜨린다.",
              "line": "지금부터는 당신이 정해요.",
              "sec": 20
            },
            {
              "id": "nightstore-e4s3",
              "text": "대답 직전 멈추는 시선. 윤서가 세린의 신작 웨딩쇼에서 자신만 아는 숨은 서명을 발견한다.",
              "line": "",
              "sec": 16
            }
          ]
        },
        {
          "code": "EP.05",
          "title": "신부의 도난 신고",
          "summary": "윤서가 세린의 신작 웨딩쇼에서 자신만 아는 숨은 서명을 발견한다.",
          "runtime": "60s",
          "scenes": [
            {
              "id": "nightstore-e5s1",
              "text": "주차장. 윤서가 세린의 신작 웨딩쇼에서 자신만 아는 숨은 서명을 발견한다.",
              "line": "",
              "sec": 24
            },
            {
              "id": "nightstore-e5s2",
              "text": "한윤서의 클로즈업. 상대의 반응을 살피고 침묵을 깨뜨린다.",
              "line": "이 디자인, 내 거야.",
              "sec": 20
            },
            {
              "id": "nightstore-e5s3",
              "text": "대답 직전 멈추는 시선. 태준의 서재에서 윤서는 자신이 기억하지 못하는 10년 전 사진을 발견한다.",
              "line": "",
              "sec": 16
            }
          ]
        },
        {
          "code": "EP.06",
          "title": "닫힌 방의 사진",
          "summary": "태준의 서재에서 윤서는 자신이 기억하지 못하는 10년 전 사진을 발견한다.",
          "runtime": "60s",
          "scenes": [
            {
              "id": "nightstore-e6s1",
              "text": "주주총회장. 태준의 서재에서 윤서는 자신이 기억하지 못하는 10년 전 사진을 발견한다.",
              "line": "",
              "sec": 24
            },
            {
              "id": "nightstore-e6s2",
              "text": "한윤서의 클로즈업. 상대의 반응을 살피고 침묵을 깨뜨린다.",
              "line": "당신은 언제부터 날 알았어요?",
              "sec": 20
            },
            {
              "id": "nightstore-e6s3",
              "text": "대답 직전 멈추는 시선. 세린이 계약결혼 문서를 언론에 넘기고 윤서는 돈 때문에 결혼한 사기꾼으로 몰린다.",
              "line": "",
              "sec": 16
            }
          ]
        },
        {
          "code": "EP.07",
          "title": "계약서가 유출됐다",
          "summary": "세린이 계약결혼 문서를 언론에 넘기고 윤서는 돈 때문에 결혼한 사기꾼으로 몰린다.",
          "runtime": "60s",
          "scenes": [
            {
              "id": "nightstore-e7s1",
              "text": "루프톱. 세린이 계약결혼 문서를 언론에 넘기고 윤서는 돈 때문에 결혼한 사기꾼으로 몰린다.",
              "line": "",
              "sec": 24
            },
            {
              "id": "nightstore-e7s2",
              "text": "한윤서의 클로즈업. 상대의 반응을 살피고 침묵을 깨뜨린다.",
              "line": "90일 뒤 버릴 여자라면서요?",
              "sec": 20
            },
            {
              "id": "nightstore-e7s3",
              "text": "대답 직전 멈추는 시선. 윤서가 기자회견에서 계약을 인정하는 대신 민혁의 디자인 도용 원본을 공개한다.",
              "line": "",
              "sec": 16
            }
          ]
        },
        {
          "code": "EP.08",
          "title": "가짜 아내의 진짜 증언",
          "summary": "윤서가 기자회견에서 계약을 인정하는 대신 민혁의 디자인 도용 원본을 공개한다.",
          "runtime": "60s",
          "scenes": [
            {
              "id": "nightstore-e8s1",
              "text": "호텔 연회장. 윤서가 기자회견에서 계약을 인정하는 대신 민혁의 디자인 도용 원본을 공개한다.",
              "line": "",
              "sec": 24
            },
            {
              "id": "nightstore-e8s2",
              "text": "한윤서의 클로즈업. 상대의 반응을 살피고 침묵을 깨뜨린다.",
              "line": "결혼은 계약이었어도, 제 경력은 진짜입니다.",
              "sec": 20
            },
            {
              "id": "nightstore-e8s3",
              "text": "대답 직전 멈추는 시선. 태준이 윤서를 보호하기 위해 이사회에서 상속 조건을 거부한다.",
              "line": "",
              "sec": 16
            }
          ]
        },
        {
          "code": "EP.09",
          "title": "상속을 포기한 남자",
          "summary": "태준이 윤서를 보호하기 위해 이사회에서 상속 조건을 거부한다.",
          "runtime": "60s",
          "scenes": [
            {
              "id": "nightstore-e9s1",
              "text": "대표실. 태준이 윤서를 보호하기 위해 이사회에서 상속 조건을 거부한다.",
              "line": "",
              "sec": 24
            },
            {
              "id": "nightstore-e9s2",
              "text": "한윤서의 클로즈업. 상대의 반응을 살피고 침묵을 깨뜨린다.",
              "line": "사람을 조건으로 걸지 마십시오.",
              "sec": 20
            },
            {
              "id": "nightstore-e9s3",
              "text": "대답 직전 멈추는 시선. 윤서가 자기 이름을 건 쇼를 열고, 민혁이 훔친 계약금의 흐름을 무대에서 밝힌다.",
              "line": "",
              "sec": 16
            }
          ]
        },
        {
          "code": "EP.10",
          "title": "마지막 웨딩쇼",
          "summary": "윤서가 자기 이름을 건 쇼를 열고, 민혁이 훔친 계약금의 흐름을 무대에서 밝힌다.",
          "runtime": "60s",
          "scenes": [
            {
              "id": "nightstore-e10s1",
              "text": "웨딩숍. 윤서가 자기 이름을 건 쇼를 열고, 민혁이 훔친 계약금의 흐름을 무대에서 밝힌다.",
              "line": "",
              "sec": 24
            },
            {
              "id": "nightstore-e10s2",
              "text": "한윤서의 클로즈업. 상대의 반응을 살피고 침묵을 깨뜨린다.",
              "line": "오늘의 주인공은 신부가 아니라 저예요.",
              "sec": 20
            },
            {
              "id": "nightstore-e10s3",
              "text": "대답 직전 멈추는 시선. 윤서가 서명한 계약해지서를 놓고 떠나자 태준은 그녀에게 되돌려 줄 첫 작품을 찾아간다.",
              "line": "",
              "sec": 16
            }
          ]
        },
        {
          "code": "EP.11",
          "title": "89일째의 이별",
          "summary": "윤서가 서명한 계약해지서를 놓고 떠나자 태준은 그녀에게 되돌려 줄 첫 작품을 찾아간다.",
          "runtime": "60s",
          "scenes": [
            {
              "id": "nightstore-e11s1",
              "text": "펜트하우스. 윤서가 서명한 계약해지서를 놓고 떠나자 태준은 그녀에게 되돌려 줄 첫 작품을 찾아간다.",
              "line": "",
              "sec": 24
            },
            {
              "id": "nightstore-e11s2",
              "text": "한윤서의 클로즈업. 상대의 반응을 살피고 침묵을 깨뜨린다.",
              "line": "이번에는 붙잡을 자격부터 만들게요.",
              "sec": 20
            },
            {
              "id": "nightstore-e11s3",
              "text": "대답 직전 멈추는 시선. 독립한 윤서의 첫 전시회에서 태준이 빈 계약서 대신 작은 반지를 건넨다.",
              "line": "",
              "sec": 16
            }
          ]
        },
        {
          "code": "EP.12",
          "title": "계약 없는 청혼",
          "summary": "독립한 윤서의 첫 전시회에서 태준이 빈 계약서 대신 작은 반지를 건넨다.",
          "runtime": "60s",
          "scenes": [
            {
              "id": "nightstore-e12s1",
              "text": "주차장. 독립한 윤서의 첫 전시회에서 태준이 빈 계약서 대신 작은 반지를 건넨다.",
              "line": "",
              "sec": 24
            },
            {
              "id": "nightstore-e12s2",
              "text": "한윤서의 클로즈업. 상대의 반응을 살피고 침묵을 깨뜨린다.",
              "line": "기간 없이, 다시 시작할래요?",
              "sec": 20
            },
            {
              "id": "nightstore-e12s3",
              "text": "첫 에피소드의 장소와 대비되는 아침빛. 주인공이 스스로 선택한 일상으로 걸어간다.",
              "line": "",
              "sec": 16
            }
          ]
        }
      ]
    },
    "activity": [
      [
        "EP.04 영상 제작 시작",
        "Shortflow",
        "Today"
      ],
      [
        "12부작 대본 확정",
        "지민",
        "Yesterday"
      ]
    ],
    "poster": "public/poster/webp/nightstore-640.webp",
    "posterThumb": "public/poster/webp/nightstore-160.webp"
  },
  {
    "id": "office",
    "title": "해고한 신입이 회장님 딸이었다",
    "format": "Vertical Short Drama",
    "source": "Script",
    "hue": 28,
    "episodes": 12,
    "edited": "Yesterday",
    "status": "live",
    "submitted": true,
    "logline": "학벌도 인맥도 숨기고 입사한 그룹 상속녀 서하. 입사 첫날 부당 해고를 당한 뒤 감사팀 인턴으로 돌아와, 자신을 내쫓은 본부장의 비리와 아버지를 무너뜨리려는 후계 음모를 파헤친다. 유일하게 그녀 편을 든 계약직 도윤의 정규직 전환도 걸려 있다.",
    "flow": {
      "stage": "done",
      "eps": [
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1
      ],
      "speed": 0.004
    },
    "previewReady": {
      "EP.01": 1,
      "EP.02": 1,
      "EP.03": 1,
      "EP.04": 1,
      "EP.05": 1,
      "EP.06": 1,
      "EP.07": 1,
      "EP.08": 1,
      "EP.09": 1,
      "EP.10": 1,
      "EP.11": 1,
      "EP.12": 1
    },
    "production": {
      "summary": {
        "episodes": 12,
        "characters": 4,
        "locations": 7,
        "scenes": 36,
        "runtime": "12m 00s",
        "credits": 8400
      },
      "looks": [
        {
          "key": "ai",
          "label": "AI pick",
          "note": "대본에 맞춰 자동 선택"
        },
        {
          "key": "webtoon",
          "label": "2D",
          "video": "public/video/loops/2dvideo.mp4"
        },
        {
          "key": "anim",
          "label": "3D",
          "video": "public/video/loops/3dvideo.mp4"
        },
        {
          "key": "live",
          "label": "실사",
          "video": "public/video/loops/realvideo.mp4"
        }
      ],
      "style": {
        "label": "Office revenge · Live-action",
        "mood": "차가운 유리 오피스, 정돈된 대칭 구도. 정체 공개 순간에만 따뜻한 역광과 과감한 클로즈업."
      },
      "characters": [
        {
          "id": "office-c1",
          "name": "차서하",
          "role": "Lead · 26",
          "desc": "경영권보다 현장을 알고 싶은 상속녀. 신분을 숨긴 채 모은 증거로 실력을 증명한다.",
          "hue": 53
        },
        {
          "id": "office-c2",
          "name": "이도윤",
          "role": "Lead · 28",
          "desc": "계약직 회계 담당자. 숫자의 이상을 알아챘지만 가족의 생계 때문에 침묵해 왔다.",
          "hue": 78
        },
        {
          "id": "office-c3",
          "name": "장기범",
          "role": "Antagonist · 48",
          "desc": "채용과 납품 비리를 쥔 본부장. 서하를 알아보지 못하고 첫날 해고한다.",
          "hue": 103
        },
        {
          "id": "office-c4",
          "name": "차정원",
          "role": "Supporting · 55",
          "desc": "서하의 고모이자 부회장. 조카의 현장 수업을 이용해 회장 해임을 추진한다.",
          "hue": 128
        }
      ],
      "others": [
        "비서",
        "경비원",
        "기자",
        "직원"
      ],
      "locations": [
        "본사 로비",
        "사무실",
        "감사실",
        "구내식당",
        "문서창고",
        "이사회실",
        "옥상"
      ],
      "episodes": [
        {
          "code": "EP.01",
          "title": "첫 출근, 첫 해고",
          "summary": "서하가 거래처 접대 심부름을 거절하자 기범이 출입증을 가위로 자른다.",
          "runtime": "60s",
          "scenes": [
            {
              "id": "office-e1s1",
              "text": "본사 로비. 서하가 거래처 접대 심부름을 거절하자 기범이 출입증을 가위로 자른다.",
              "line": "",
              "sec": 24
            },
            {
              "id": "office-e1s2",
              "text": "차서하의 클로즈업. 상대의 반응을 살피고 침묵을 깨뜨린다.",
              "line": "누구 딸이든 여기선 내가 왕이야.",
              "sec": 20
            },
            {
              "id": "office-e1s3",
              "text": "대답 직전 멈추는 시선. 감사팀 임시 출입증을 단 서하가 기범 앞 엘리베이터에 올라탄다.",
              "line": "",
              "sec": 16
            }
          ]
        },
        {
          "code": "EP.02",
          "title": "인턴으로 돌아왔습니다",
          "summary": "감사팀 임시 출입증을 단 서하가 기범 앞 엘리베이터에 올라탄다.",
          "runtime": "60s",
          "scenes": [
            {
              "id": "office-e2s1",
              "text": "사무실. 감사팀 임시 출입증을 단 서하가 기범 앞 엘리베이터에 올라탄다.",
              "line": "",
              "sec": 24
            },
            {
              "id": "office-e2s2",
              "text": "차서하의 클로즈업. 상대의 반응을 살피고 침묵을 깨뜨린다.",
              "line": "오늘부터 본부장님 장부부터 볼게요.",
              "sec": 20
            },
            {
              "id": "office-e2s3",
              "text": "대답 직전 멈추는 시선. 도윤이 버려진 접대 영수증을 건네고 서하는 존재하지 않는 거래처를 발견한다.",
              "line": "",
              "sec": 16
            }
          ]
        },
        {
          "code": "EP.03",
          "title": "영수증 한 장",
          "summary": "도윤이 버려진 접대 영수증을 건네고 서하는 존재하지 않는 거래처를 발견한다.",
          "runtime": "60s",
          "scenes": [
            {
              "id": "office-e3s1",
              "text": "감사실. 도윤이 버려진 접대 영수증을 건네고 서하는 존재하지 않는 거래처를 발견한다.",
              "line": "",
              "sec": 24
            },
            {
              "id": "office-e3s2",
              "text": "차서하의 클로즈업. 상대의 반응을 살피고 침묵을 깨뜨린다.",
              "line": "이 가게, 석 달 전에 폐업했어요.",
              "sec": 20
            },
            {
              "id": "office-e3s3",
              "text": "대답 직전 멈추는 시선. 기범이 도윤의 재계약을 미끼로 증거를 돌려달라고 협박한다.",
              "line": "",
              "sec": 16
            }
          ]
        },
        {
          "code": "EP.04",
          "title": "계약직의 값",
          "summary": "기범이 도윤의 재계약을 미끼로 증거를 돌려달라고 협박한다.",
          "runtime": "60s",
          "scenes": [
            {
              "id": "office-e4s1",
              "text": "구내식당. 기범이 도윤의 재계약을 미끼로 증거를 돌려달라고 협박한다.",
              "line": "",
              "sec": 24
            },
            {
              "id": "office-e4s2",
              "text": "차서하의 클로즈업. 상대의 반응을 살피고 침묵을 깨뜨린다.",
              "line": "침묵에도 월급이 나오죠.",
              "sec": 20
            },
            {
              "id": "office-e4s3",
              "text": "대답 직전 멈추는 시선. 회장이 구내식당에서 서하를 알아보고 멈칫하자 그녀가 먼저 고개를 숙인다.",
              "line": "",
              "sec": 16
            }
          ]
        },
        {
          "code": "EP.05",
          "title": "회장님의 도시락",
          "summary": "회장이 구내식당에서 서하를 알아보고 멈칫하자 그녀가 먼저 고개를 숙인다.",
          "runtime": "60s",
          "scenes": [
            {
              "id": "office-e5s1",
              "text": "문서창고. 회장이 구내식당에서 서하를 알아보고 멈칫하자 그녀가 먼저 고개를 숙인다.",
              "line": "",
              "sec": 24
            },
            {
              "id": "office-e5s2",
              "text": "차서하의 클로즈업. 상대의 반응을 살피고 침묵을 깨뜨린다.",
              "line": "회장님, 처음 뵙겠습니다.",
              "sec": 20
            },
            {
              "id": "office-e5s3",
              "text": "대답 직전 멈추는 시선. 도윤이 야근 중 백업을 복구하고 기범의 돈이 부회장 비서실로 흘렀음을 확인한다.",
              "line": "",
              "sec": 16
            }
          ]
        },
        {
          "code": "EP.06",
          "title": "삭제된 장부",
          "summary": "도윤이 야근 중 백업을 복구하고 기범의 돈이 부회장 비서실로 흘렀음을 확인한다.",
          "runtime": "60s",
          "scenes": [
            {
              "id": "office-e6s1",
              "text": "이사회실. 도윤이 야근 중 백업을 복구하고 기범의 돈이 부회장 비서실로 흘렀음을 확인한다.",
              "line": "",
              "sec": 24
            },
            {
              "id": "office-e6s2",
              "text": "차서하의 클로즈업. 상대의 반응을 살피고 침묵을 깨뜨린다.",
              "line": "끝이 본부장님이 아니었어요.",
              "sec": 20
            },
            {
              "id": "office-e6s3",
              "text": "대답 직전 멈추는 시선. 서하가 자료 유출 누명을 쓰자 도윤이 자기 이름으로 확보한 증거를 제출한다.",
              "line": "",
              "sec": 16
            }
          ]
        },
        {
          "code": "EP.07",
          "title": "신입의 징계위원회",
          "summary": "서하가 자료 유출 누명을 쓰자 도윤이 자기 이름으로 확보한 증거를 제출한다.",
          "runtime": "60s",
          "scenes": [
            {
              "id": "office-e7s1",
              "text": "옥상. 서하가 자료 유출 누명을 쓰자 도윤이 자기 이름으로 확보한 증거를 제출한다.",
              "line": "",
              "sec": 24
            },
            {
              "id": "office-e7s2",
              "text": "차서하의 클로즈업. 상대의 반응을 살피고 침묵을 깨뜨린다.",
              "line": "이번엔 제가 증언할 차례예요.",
              "sec": 20
            },
            {
              "id": "office-e7s3",
              "text": "대답 직전 멈추는 시선. 정원이 서하의 신분을 공개하며 모든 조사를 상속녀의 갑질로 몰아간다.",
              "line": "",
              "sec": 16
            }
          ]
        },
        {
          "code": "EP.08",
          "title": "딸이라는 증거",
          "summary": "정원이 서하의 신분을 공개하며 모든 조사를 상속녀의 갑질로 몰아간다.",
          "runtime": "60s",
          "scenes": [
            {
              "id": "office-e8s1",
              "text": "본사 로비. 정원이 서하의 신분을 공개하며 모든 조사를 상속녀의 갑질로 몰아간다.",
              "line": "",
              "sec": 24
            },
            {
              "id": "office-e8s2",
              "text": "차서하의 클로즈업. 상대의 반응을 살피고 침묵을 깨뜨린다.",
              "line": "가족이라는 이유로 덮으란 말씀이세요?",
              "sec": 20
            },
            {
              "id": "office-e8s3",
              "text": "대답 직전 멈추는 시선. 이사회 직전 회장이 쓰러지고 서하의 감사 권한이 정지된다.",
              "line": "",
              "sec": 16
            }
          ]
        },
        {
          "code": "EP.09",
          "title": "회장 해임의 날",
          "summary": "이사회 직전 회장이 쓰러지고 서하의 감사 권한이 정지된다.",
          "runtime": "60s",
          "scenes": [
            {
              "id": "office-e9s1",
              "text": "사무실. 이사회 직전 회장이 쓰러지고 서하의 감사 권한이 정지된다.",
              "line": "",
              "sec": 24
            },
            {
              "id": "office-e9s2",
              "text": "차서하의 클로즈업. 상대의 반응을 살피고 침묵을 깨뜨린다.",
              "line": "출입증은 막아도 증인은 못 막아요.",
              "sec": 20
            },
            {
              "id": "office-e9s3",
              "text": "대답 직전 멈추는 시선. 서하가 해고된 직원들과 함께 이사회 문 앞에 서고 도윤이 녹취를 재생한다.",
              "line": "",
              "sec": 16
            }
          ]
        },
        {
          "code": "EP.10",
          "title": "문을 열어 주세요",
          "summary": "서하가 해고된 직원들과 함께 이사회 문 앞에 서고 도윤이 녹취를 재생한다.",
          "runtime": "60s",
          "scenes": [
            {
              "id": "office-e10s1",
              "text": "감사실. 서하가 해고된 직원들과 함께 이사회 문 앞에 서고 도윤이 녹취를 재생한다.",
              "line": "",
              "sec": 24
            },
            {
              "id": "office-e10s2",
              "text": "차서하의 클로즈업. 상대의 반응을 살피고 침묵을 깨뜨린다.",
              "line": "이 회사의 주인은 여기에도 있습니다.",
              "sec": 20
            },
            {
              "id": "office-e10s3",
              "text": "대답 직전 멈추는 시선. 기범과 정원의 공모가 드러나고 서하는 거래처 피해금 반환부터 요구한다.",
              "line": "",
              "sec": 16
            }
          ]
        },
        {
          "code": "EP.11",
          "title": "사직서 대신 고발장",
          "summary": "기범과 정원의 공모가 드러나고 서하는 거래처 피해금 반환부터 요구한다.",
          "runtime": "60s",
          "scenes": [
            {
              "id": "office-e11s1",
              "text": "구내식당. 기범과 정원의 공모가 드러나고 서하는 거래처 피해금 반환부터 요구한다.",
              "line": "",
              "sec": 24
            },
            {
              "id": "office-e11s2",
              "text": "차서하의 클로즈업. 상대의 반응을 살피고 침묵을 깨뜨린다.",
              "line": "사표 한 장으로 끝낼 생각 마세요.",
              "sec": 20
            },
            {
              "id": "office-e11s3",
              "text": "대답 직전 멈추는 시선. 정규직이 된 도윤과 수습 평가를 다시 받는 서하가 나란히 새 출입증을 찍는다.",
              "line": "",
              "sec": 16
            }
          ]
        },
        {
          "code": "EP.12",
          "title": "다시, 첫 출근",
          "summary": "정규직이 된 도윤과 수습 평가를 다시 받는 서하가 나란히 새 출입증을 찍는다.",
          "runtime": "60s",
          "scenes": [
            {
              "id": "office-e12s1",
              "text": "문서창고. 정규직이 된 도윤과 수습 평가를 다시 받는 서하가 나란히 새 출입증을 찍는다.",
              "line": "",
              "sec": 24
            },
            {
              "id": "office-e12s2",
              "text": "차서하의 클로즈업. 상대의 반응을 살피고 침묵을 깨뜨린다.",
              "line": "오늘도 잘 부탁드립니다, 동기님.",
              "sec": 20
            },
            {
              "id": "office-e12s3",
              "text": "첫 에피소드의 장소와 대비되는 아침빛. 주인공이 스스로 선택한 일상으로 걸어간다.",
              "line": "",
              "sec": 16
            }
          ]
        }
      ]
    },
    "activity": [
      [
        "2개 플랫폼 공개 완료",
        "Shortflow",
        "Today"
      ],
      [
        "12부작 대본 확정",
        "지민",
        "Yesterday"
      ]
    ],
    "poster": "public/poster/webp/office-640.webp?v=c81f938871",
    "posterThumb": "public/poster/webp/office-160.webp?v=c81f938871"
  },
  {
    "id": "palace",
    "title": "폭군의 이혼 전문 변호사",
    "format": "Vertical Short Drama",
    "source": "Script",
    "hue": 285,
    "episodes": 12,
    "edited": "Yesterday",
    "status": "script",
    "submitted": false,
    "logline": "승소율 100% 이혼 변호사 해린이 자신이 읽던 로맨스 소설 속 처형 예정 황후로 깨어난다. 살길은 폭군과의 이혼뿐. 황실 계약의 빈틈을 파고들수록 폭군이 악역을 연기하는 이유와 원작에 없던 자신의 죽음이 드러난다.",
    "flow": {
      "stage": "ready",
      "eps": [],
      "speed": 0.004
    },
    "previewReady": {},
    "production": {
      "summary": {
        "episodes": 12,
        "characters": 4,
        "locations": 7,
        "scenes": 36,
        "runtime": "12m 00s",
        "credits": 8400
      },
      "looks": [
        {
          "key": "ai",
          "label": "AI pick",
          "note": "대본에 맞춰 자동 선택"
        },
        {
          "key": "webtoon",
          "label": "2D",
          "video": "public/video/loops/2dvideo.mp4"
        },
        {
          "key": "anim",
          "label": "3D",
          "video": "public/video/loops/3dvideo.mp4"
        },
        {
          "key": "live",
          "label": "실사",
          "video": "public/video/loops/realvideo.mp4"
        }
      ],
      "style": {
        "label": "Romance fantasy · Live-action",
        "mood": "촛불과 자줏빛 벨벳, 금빛 문양의 황궁. 법정은 차갑게, 인물의 작은 진심은 따뜻하게."
      },
      "characters": [
        {
          "id": "palace-c1",
          "name": "윤해린",
          "role": "Lead · 30",
          "desc": "현대의 이혼 전문 변호사이자 빙의한 황후. 사랑보다 계약을 믿지만 억울한 사람을 외면하지 못한다.",
          "hue": 310
        },
        {
          "id": "palace-c2",
          "name": "카엘",
          "role": "Lead · 32",
          "desc": "반역 세력을 속이려 폭군을 연기하는 황제. 해린을 보호하려 악명을 감수한다.",
          "hue": 335
        },
        {
          "id": "palace-c3",
          "name": "로제",
          "role": "Supporting · 24",
          "desc": "원작의 여주인공인 시녀. 해린의 재판을 도우며 원작과 다른 선택을 한다.",
          "hue": 0
        },
        {
          "id": "palace-c4",
          "name": "루시안",
          "role": "Antagonist · 35",
          "desc": "황후의 오빠이자 섭정 후보. 해린의 처형을 이용해 황권을 장악하려 한다.",
          "hue": 25
        }
      ],
      "others": [
        "비서",
        "경비원",
        "기자",
        "직원"
      ],
      "locations": [
        "황후 침실",
        "알현실",
        "황실 서고",
        "장미 정원",
        "지하 감옥",
        "대법정",
        "성문"
      ],
      "episodes": [
        {
          "code": "EP.01",
          "title": "사형 전날의 상담",
          "summary": "해린이 황후의 몸으로 깨어나 처형 명령서 뒷면에 이혼 청구서를 쓴다.",
          "runtime": "60s",
          "scenes": [
            {
              "id": "palace-e1s1",
              "text": "황후 침실. 해린이 황후의 몸으로 깨어나 처형 명령서 뒷면에 이혼 청구서를 쓴다.",
              "line": "",
              "sec": 24
            },
            {
              "id": "palace-e1s2",
              "text": "윤해린의 클로즈업. 상대의 반응을 살피고 침묵을 깨뜨린다.",
              "line": "폐하, 죽기 전에 재산부터 나누시죠.",
              "sec": 20
            },
            {
              "id": "palace-e1s3",
              "text": "대답 직전 멈추는 시선. 카엘이 이혼 대신 30일의 유예 계약을 내민다.",
              "line": "",
              "sec": 16
            }
          ]
        },
        {
          "code": "EP.02",
          "title": "폭군의 첫 서명",
          "summary": "카엘이 이혼 대신 30일의 유예 계약을 내민다.",
          "runtime": "60s",
          "scenes": [
            {
              "id": "palace-e2s1",
              "text": "알현실. 카엘이 이혼 대신 30일의 유예 계약을 내민다.",
              "line": "",
              "sec": 24
            },
            {
              "id": "palace-e2s2",
              "text": "윤해린의 클로즈업. 상대의 반응을 살피고 침묵을 깨뜨린다.",
              "line": "그동안 내 무죄를 증명해 봐.",
              "sec": 20
            },
            {
              "id": "palace-e2s3",
              "text": "대답 직전 멈추는 시선. 해린이 독살 누명을 쓴 로제의 변호를 맡고 독병의 인장을 확인한다.",
              "line": "",
              "sec": 16
            }
          ]
        },
        {
          "code": "EP.03",
          "title": "황후의 변호인",
          "summary": "해린이 독살 누명을 쓴 로제의 변호를 맡고 독병의 인장을 확인한다.",
          "runtime": "60s",
          "scenes": [
            {
              "id": "palace-e3s1",
              "text": "황실 서고. 해린이 독살 누명을 쓴 로제의 변호를 맡고 독병의 인장을 확인한다.",
              "line": "",
              "sec": 24
            },
            {
              "id": "palace-e3s2",
              "text": "윤해린의 클로즈업. 상대의 반응을 살피고 침묵을 깨뜨린다.",
              "line": "자백보다 증거가 먼저입니다.",
              "sec": 20
            },
            {
              "id": "palace-e3s3",
              "text": "대답 직전 멈추는 시선. 카엘이 매일 밤 독이 든 약을 마시고 있음을 해린이 알아챈다.",
              "line": "",
              "sec": 16
            }
          ]
        },
        {
          "code": "EP.04",
          "title": "침실의 증인",
          "summary": "카엘이 매일 밤 독이 든 약을 마시고 있음을 해린이 알아챈다.",
          "runtime": "60s",
          "scenes": [
            {
              "id": "palace-e4s1",
              "text": "장미 정원. 카엘이 매일 밤 독이 든 약을 마시고 있음을 해린이 알아챈다.",
              "line": "",
              "sec": 24
            },
            {
              "id": "palace-e4s2",
              "text": "윤해린의 클로즈업. 상대의 반응을 살피고 침묵을 깨뜨린다.",
              "line": "죽으려는 건 저보다 폐하였네요.",
              "sec": 20
            },
            {
              "id": "palace-e4s3",
              "text": "대답 직전 멈추는 시선. 서고에서 해린이 빙의 전 황후가 남긴 유서를 찾는다.",
              "line": "",
              "sec": 16
            }
          ]
        },
        {
          "code": "EP.05",
          "title": "원작에 없는 유서",
          "summary": "서고에서 해린이 빙의 전 황후가 남긴 유서를 찾는다.",
          "runtime": "60s",
          "scenes": [
            {
              "id": "palace-e5s1",
              "text": "지하 감옥. 서고에서 해린이 빙의 전 황후가 남긴 유서를 찾는다.",
              "line": "",
              "sec": 24
            },
            {
              "id": "palace-e5s2",
              "text": "윤해린의 클로즈업. 상대의 반응을 살피고 침묵을 깨뜨린다.",
              "line": "오라버니를 믿지 마.",
              "sec": 20
            },
            {
              "id": "palace-e5s3",
              "text": "대답 직전 멈추는 시선. 로제의 무죄를 밝혀낸 해린 앞에 루시안이 가문의 인장을 내민다.",
              "line": "",
              "sec": 16
            }
          ]
        },
        {
          "code": "EP.06",
          "title": "첫 번째 승소",
          "summary": "로제의 무죄를 밝혀낸 해린 앞에 루시안이 가문의 인장을 내민다.",
          "runtime": "60s",
          "scenes": [
            {
              "id": "palace-e6s1",
              "text": "대법정. 로제의 무죄를 밝혀낸 해린 앞에 루시안이 가문의 인장을 내민다.",
              "line": "",
              "sec": 24
            },
            {
              "id": "palace-e6s2",
              "text": "윤해린의 클로즈업. 상대의 반응을 살피고 침묵을 깨뜨린다.",
              "line": "그 입을 다물면 널 살려 주마.",
              "sec": 20
            },
            {
              "id": "palace-e6s3",
              "text": "대답 직전 멈추는 시선. 카엘이 해린을 국외로 보내려 전 재산을 양도하지만 그녀는 서명을 거부한다.",
              "line": "",
              "sec": 16
            }
          ]
        },
        {
          "code": "EP.07",
          "title": "이혼의 조건",
          "summary": "카엘이 해린을 국외로 보내려 전 재산을 양도하지만 그녀는 서명을 거부한다.",
          "runtime": "60s",
          "scenes": [
            {
              "id": "palace-e7s1",
              "text": "성문. 카엘이 해린을 국외로 보내려 전 재산을 양도하지만 그녀는 서명을 거부한다.",
              "line": "",
              "sec": 24
            },
            {
              "id": "palace-e7s2",
              "text": "윤해린의 클로즈업. 상대의 반응을 살피고 침묵을 깨뜨린다.",
              "line": "의뢰인 두고 도망가는 변호사는 없어요.",
              "sec": 20
            },
            {
              "id": "palace-e7s3",
              "text": "대답 직전 멈추는 시선. 로제가 루시안의 반역 모의 시간을 기억해 내고 세 사람은 공개 재판을 준비한다.",
              "line": "",
              "sec": 16
            }
          ]
        },
        {
          "code": "EP.08",
          "title": "장미 정원의 밀약",
          "summary": "로제가 루시안의 반역 모의 시간을 기억해 내고 세 사람은 공개 재판을 준비한다.",
          "runtime": "60s",
          "scenes": [
            {
              "id": "palace-e8s1",
              "text": "황후 침실. 로제가 루시안의 반역 모의 시간을 기억해 내고 세 사람은 공개 재판을 준비한다.",
              "line": "",
              "sec": 24
            },
            {
              "id": "palace-e8s2",
              "text": "윤해린의 클로즈업. 상대의 반응을 살피고 침묵을 깨뜨린다.",
              "line": "이번에는 제가 운명을 바꿀게요.",
              "sec": 20
            },
            {
              "id": "palace-e8s3",
              "text": "대답 직전 멈추는 시선. 카엘이 인질을 지키기 위해 거짓 처형 기록을 만들었다는 사실이 밝혀진다.",
              "line": "",
              "sec": 16
            }
          ]
        },
        {
          "code": "EP.09",
          "title": "폭군이 된 이유",
          "summary": "카엘이 인질을 지키기 위해 거짓 처형 기록을 만들었다는 사실이 밝혀진다.",
          "runtime": "60s",
          "scenes": [
            {
              "id": "palace-e9s1",
              "text": "알현실. 카엘이 인질을 지키기 위해 거짓 처형 기록을 만들었다는 사실이 밝혀진다.",
              "line": "",
              "sec": 24
            },
            {
              "id": "palace-e9s2",
              "text": "윤해린의 클로즈업. 상대의 반응을 살피고 침묵을 깨뜨린다.",
              "line": "살렸다는 말조차 할 수 없었다.",
              "sec": 20
            },
            {
              "id": "palace-e9s3",
              "text": "대답 직전 멈추는 시선. 루시안이 해린을 마녀로 고발하자 그녀는 황실 혼인계약 원본을 증거로 요청한다.",
              "line": "",
              "sec": 16
            }
          ]
        },
        {
          "code": "EP.10",
          "title": "황후를 고발합니다",
          "summary": "루시안이 해린을 마녀로 고발하자 그녀는 황실 혼인계약 원본을 증거로 요청한다.",
          "runtime": "60s",
          "scenes": [
            {
              "id": "palace-e10s1",
              "text": "황실 서고. 루시안이 해린을 마녀로 고발하자 그녀는 황실 혼인계약 원본을 증거로 요청한다.",
              "line": "",
              "sec": 24
            },
            {
              "id": "palace-e10s2",
              "text": "윤해린의 클로즈업. 상대의 반응을 살피고 침묵을 깨뜨린다.",
              "line": "서명한 사람은 거짓말해도 잉크는 못 하죠.",
              "sec": 20
            },
            {
              "id": "palace-e10s3",
              "text": "대답 직전 멈추는 시선. 해린이 위조된 계승 조항을 입증하고 카엘이 숨겨 온 생존자들이 법정에 들어온다.",
              "line": "",
              "sec": 16
            }
          ]
        },
        {
          "code": "EP.11",
          "title": "마지막 변론",
          "summary": "해린이 위조된 계승 조항을 입증하고 카엘이 숨겨 온 생존자들이 법정에 들어온다.",
          "runtime": "60s",
          "scenes": [
            {
              "id": "palace-e11s1",
              "text": "장미 정원. 해린이 위조된 계승 조항을 입증하고 카엘이 숨겨 온 생존자들이 법정에 들어온다.",
              "line": "",
              "sec": 24
            },
            {
              "id": "palace-e11s2",
              "text": "윤해린의 클로즈업. 상대의 반응을 살피고 침묵을 깨뜨린다.",
              "line": "증인 전원, 살아 있습니다.",
              "sec": 20
            },
            {
              "id": "palace-e11s3",
              "text": "대답 직전 멈추는 시선. 무죄가 된 해린이 정식으로 이혼한 뒤 황궁 앞에 상담소를 열자 카엘이 첫 손님으로 온다.",
              "line": "",
              "sec": 16
            }
          ]
        },
        {
          "code": "EP.12",
          "title": "이혼 후에 만나요",
          "summary": "무죄가 된 해린이 정식으로 이혼한 뒤 황궁 앞에 상담소를 열자 카엘이 첫 손님으로 온다.",
          "runtime": "60s",
          "scenes": [
            {
              "id": "palace-e12s1",
              "text": "지하 감옥. 무죄가 된 해린이 정식으로 이혼한 뒤 황궁 앞에 상담소를 열자 카엘이 첫 손님으로 온다.",
              "line": "",
              "sec": 24
            },
            {
              "id": "palace-e12s2",
              "text": "윤해린의 클로즈업. 상대의 반응을 살피고 침묵을 깨뜨린다.",
              "line": "재혼 상담도 받습니까?",
              "sec": 20
            },
            {
              "id": "palace-e12s3",
              "text": "첫 에피소드의 장소와 대비되는 아침빛. 주인공이 스스로 선택한 일상으로 걸어간다.",
              "line": "",
              "sec": 16
            }
          ]
        }
      ]
    },
    "activity": [
      [
        "대본 분석 완료 · 인물과 장면 계획 준비",
        "Shortflow",
        "Today"
      ],
      [
        "12부작 대본 확정",
        "지민",
        "Yesterday"
      ]
    ],
    "poster": "public/poster/webp/palace-640.webp",
    "posterThumb": "public/poster/webp/palace-160.webp"
  },
  {
    "id": "moon",
    "title": "내 장례식에 남편이 웃었다",
    "format": "Vertical Short Drama",
    "source": "Script",
    "hue": 212,
    "episodes": 12,
    "edited": "Yesterday",
    "status": "storyboard",
    "submitted": false,
    "logline": "자신의 장례식에서 남편과 동생의 미소를 본 유정은 죽기 30일 전으로 돌아온다. 이번에는 완벽한 아내 대신 자신의 실종을 설계하며 보험금과 재산을 노린 두 사람을 덫으로 유인한다. 그런데 그녀를 죽음에서 구한 형사도 같은 하루를 기억한다.",
    "flow": {
      "stage": "ready",
      "eps": [],
      "speed": 0.004
    },
    "previewReady": {
      "EP.01": 1,
      "EP.02": 1,
      "EP.03": 1,
      "EP.04": 1,
      "EP.05": 1,
      "EP.06": 1,
      "EP.07": 1,
      "EP.08": 1,
      "EP.09": 1,
      "EP.10": 1,
      "EP.11": 1,
      "EP.12": 1
    },
    "production": {
      "summary": {
        "episodes": 12,
        "characters": 4,
        "locations": 7,
        "scenes": 36,
        "runtime": "12m 00s",
        "credits": 8400
      },
      "looks": [
        {
          "key": "ai",
          "label": "AI pick",
          "note": "대본에 맞춰 자동 선택"
        },
        {
          "key": "webtoon",
          "label": "2D",
          "video": "public/video/loops/2dvideo.mp4"
        },
        {
          "key": "anim",
          "label": "3D",
          "video": "public/video/loops/3dvideo.mp4"
        },
        {
          "key": "live",
          "label": "실사",
          "video": "public/video/loops/realvideo.mp4"
        }
      ],
      "style": {
        "label": "Regression thriller · Live-action",
        "mood": "장례식의 흰 국화와 검은 정장, 붉은 녹음 표시. 거울과 유리 반사로 두 얼굴을 강조한다."
      },
      "characters": [
        {
          "id": "moon-c1",
          "name": "정유정",
          "role": "Lead · 31",
          "desc": "보험회사 조사역. 남의 사기는 잡아도 가족의 거짓말은 믿었던 여자. 두 번째 삶에서는 증거를 먼저 챙긴다.",
          "hue": 237
        },
        {
          "id": "moon-c2",
          "name": "서지훈",
          "role": "Lead · 34",
          "desc": "유정의 사고를 수사한 형사. 회귀를 함께 경험했지만 자신의 기억이 조금씩 사라진다.",
          "hue": 262
        },
        {
          "id": "moon-c3",
          "name": "박재혁",
          "role": "Antagonist · 35",
          "desc": "다정한 남편의 얼굴 뒤에 거액의 빚을 숨긴 자산운용사 직원.",
          "hue": 287
        },
        {
          "id": "moon-c4",
          "name": "정유리",
          "role": "Antagonist · 27",
          "desc": "언니의 삶을 갖고 싶었던 동생. 재혁과 공모하지만 그에게도 이용당하고 있음을 모른다.",
          "hue": 312
        }
      ],
      "others": [
        "비서",
        "경비원",
        "기자",
        "직원"
      ],
      "locations": [
        "장례식장",
        "부부의 집",
        "보험회사",
        "경찰서",
        "지하 주차장",
        "호숫가 별장",
        "법정"
      ],
      "episodes": [
        {
          "code": "EP.01",
          "title": "상주가 웃는 밤",
          "summary": "자신의 영정 앞에서 재혁과 유리가 웃는 것을 본 유정이 30일 전 침대에서 눈을 뜬다.",
          "runtime": "60s",
          "scenes": [
            {
              "id": "moon-e1s1",
              "text": "장례식장. 자신의 영정 앞에서 재혁과 유리가 웃는 것을 본 유정이 30일 전 침대에서 눈을 뜬다.",
              "line": "",
              "sec": 24
            },
            {
              "id": "moon-e1s2",
              "text": "정유정의 클로즈업. 상대의 반응을 살피고 침묵을 깨뜨린다.",
              "line": "이번 장례식의 주인공은 내가 아니야.",
              "sec": 20
            },
            {
              "id": "moon-e1s3",
              "text": "대답 직전 멈추는 시선. 유정이 서랍에서 몰래 가입된 보험증권을 발견하고 서명부터 촬영한다.",
              "line": "",
              "sec": 16
            }
          ]
        },
        {
          "code": "EP.02",
          "title": "사망보험 수익자",
          "summary": "유정이 서랍에서 몰래 가입된 보험증권을 발견하고 서명부터 촬영한다.",
          "runtime": "60s",
          "scenes": [
            {
              "id": "moon-e2s1",
              "text": "부부의 집. 유정이 서랍에서 몰래 가입된 보험증권을 발견하고 서명부터 촬영한다.",
              "line": "",
              "sec": 24
            },
            {
              "id": "moon-e2s2",
              "text": "정유정의 클로즈업. 상대의 반응을 살피고 침묵을 깨뜨린다.",
              "line": "여보, 나한테 보험이 또 있었어?",
              "sec": 20
            },
            {
              "id": "moon-e2s3",
              "text": "대답 직전 멈추는 시선. 사고를 신고하러 간 유정에게 지훈이 아직 일어나지 않은 사고 장소를 말한다.",
              "line": "",
              "sec": 16
            }
          ]
        },
        {
          "code": "EP.03",
          "title": "미래를 아는 형사",
          "summary": "사고를 신고하러 간 유정에게 지훈이 아직 일어나지 않은 사고 장소를 말한다.",
          "runtime": "60s",
          "scenes": [
            {
              "id": "moon-e3s1",
              "text": "보험회사. 사고를 신고하러 간 유정에게 지훈이 아직 일어나지 않은 사고 장소를 말한다.",
              "line": "",
              "sec": 24
            },
            {
              "id": "moon-e3s2",
              "text": "정유정의 클로즈업. 상대의 반응을 살피고 침묵을 깨뜨린다.",
              "line": "그날도 비가 왔죠.",
              "sec": 20
            },
            {
              "id": "moon-e3s3",
              "text": "대답 직전 멈추는 시선. 유정이 유리에게 별장 열쇠를 주고 출입기록 알림을 켠다.",
              "line": "",
              "sec": 16
            }
          ]
        },
        {
          "code": "EP.04",
          "title": "착한 언니의 선물",
          "summary": "유정이 유리에게 별장 열쇠를 주고 출입기록 알림을 켠다.",
          "runtime": "60s",
          "scenes": [
            {
              "id": "moon-e4s1",
              "text": "경찰서. 유정이 유리에게 별장 열쇠를 주고 출입기록 알림을 켠다.",
              "line": "",
              "sec": 24
            },
            {
              "id": "moon-e4s2",
              "text": "정유정의 클로즈업. 상대의 반응을 살피고 침묵을 깨뜨린다.",
              "line": "내 거, 그렇게 갖고 싶었잖아.",
              "sec": 20
            },
            {
              "id": "moon-e4s3",
              "text": "대답 직전 멈추는 시선. 지훈이 유정의 차에서 훼손된 부품을 확보하지만 정비 기록에는 유정의 서명이 있다.",
              "line": "",
              "sec": 16
            }
          ]
        },
        {
          "code": "EP.05",
          "title": "브레이크 없는 차",
          "summary": "지훈이 유정의 차에서 훼손된 부품을 확보하지만 정비 기록에는 유정의 서명이 있다.",
          "runtime": "60s",
          "scenes": [
            {
              "id": "moon-e5s1",
              "text": "지하 주차장. 지훈이 유정의 차에서 훼손된 부품을 확보하지만 정비 기록에는 유정의 서명이 있다.",
              "line": "",
              "sec": 24
            },
            {
              "id": "moon-e5s2",
              "text": "정유정의 클로즈업. 상대의 반응을 살피고 침묵을 깨뜨린다.",
              "line": "누군가 네 이름까지 준비했어.",
              "sec": 20
            },
            {
              "id": "moon-e5s3",
              "text": "대답 직전 멈추는 시선. 유정이 재혁이 유리 명의로도 보험을 들었음을 알아내 동생에게 사본을 보낸다.",
              "line": "",
              "sec": 16
            }
          ]
        },
        {
          "code": "EP.06",
          "title": "두 번째 수익자",
          "summary": "유정이 재혁이 유리 명의로도 보험을 들었음을 알아내 동생에게 사본을 보낸다.",
          "runtime": "60s",
          "scenes": [
            {
              "id": "moon-e6s1",
              "text": "호숫가 별장. 유정이 재혁이 유리 명의로도 보험을 들었음을 알아내 동생에게 사본을 보낸다.",
              "line": "",
              "sec": 24
            },
            {
              "id": "moon-e6s2",
              "text": "정유정의 클로즈업. 상대의 반응을 살피고 침묵을 깨뜨린다.",
              "line": "다음 장례식, 네 차례야.",
              "sec": 20
            },
            {
              "id": "moon-e6s3",
              "text": "대답 직전 멈추는 시선. 지훈의 회귀 기억이 사라지기 시작하고 유정은 두 사람의 기억을 녹음해 보관한다.",
              "line": "",
              "sec": 16
            }
          ]
        },
        {
          "code": "EP.07",
          "title": "사라진 10분",
          "summary": "지훈의 회귀 기억이 사라지기 시작하고 유정은 두 사람의 기억을 녹음해 보관한다.",
          "runtime": "60s",
          "scenes": [
            {
              "id": "moon-e7s1",
              "text": "법정. 지훈의 회귀 기억이 사라지기 시작하고 유정은 두 사람의 기억을 녹음해 보관한다.",
              "line": "",
              "sec": 24
            },
            {
              "id": "moon-e7s2",
              "text": "정유정의 클로즈업. 상대의 반응을 살피고 침묵을 깨뜨린다.",
              "line": "내가 잊어도 이 목소리는 믿어요.",
              "sec": 20
            },
            {
              "id": "moon-e7s3",
              "text": "대답 직전 멈추는 시선. 유정이 계획대로 별장에 휴대폰을 남기고 사라지자 재혁은 보험금 청구를 서두른다.",
              "line": "",
              "sec": 16
            }
          ]
        },
        {
          "code": "EP.08",
          "title": "완벽한 실종",
          "summary": "유정이 계획대로 별장에 휴대폰을 남기고 사라지자 재혁은 보험금 청구를 서두른다.",
          "runtime": "60s",
          "scenes": [
            {
              "id": "moon-e8s1",
              "text": "장례식장. 유정이 계획대로 별장에 휴대폰을 남기고 사라지자 재혁은 보험금 청구를 서두른다.",
              "line": "",
              "sec": 24
            },
            {
              "id": "moon-e8s2",
              "text": "정유정의 클로즈업. 상대의 반응을 살피고 침묵을 깨뜨린다.",
              "line": "시신 없이도 지급됩니까?",
              "sec": 20
            },
            {
              "id": "moon-e8s3",
              "text": "대답 직전 멈추는 시선. 유리가 자신도 제거 대상임을 깨닫고 유정의 녹음기에 범행 계획을 털어놓는다.",
              "line": "",
              "sec": 16
            }
          ]
        },
        {
          "code": "EP.09",
          "title": "동생의 자백",
          "summary": "유리가 자신도 제거 대상임을 깨닫고 유정의 녹음기에 범행 계획을 털어놓는다.",
          "runtime": "60s",
          "scenes": [
            {
              "id": "moon-e9s1",
              "text": "부부의 집. 유리가 자신도 제거 대상임을 깨닫고 유정의 녹음기에 범행 계획을 털어놓는다.",
              "line": "",
              "sec": 24
            },
            {
              "id": "moon-e9s2",
              "text": "정유정의 클로즈업. 상대의 반응을 살피고 침묵을 깨뜨린다.",
              "line": "언니, 이번 한 번만 문 열어 줘.",
              "sec": 20
            },
            {
              "id": "moon-e9s3",
              "text": "대답 직전 멈추는 시선. 유정의 빈 관 앞에 재혁이 도착하고 스크린에 보험금 상담 녹취가 재생된다.",
              "line": "",
              "sec": 16
            }
          ]
        },
        {
          "code": "EP.10",
          "title": "장례식 초대장",
          "summary": "유정의 빈 관 앞에 재혁이 도착하고 스크린에 보험금 상담 녹취가 재생된다.",
          "runtime": "60s",
          "scenes": [
            {
              "id": "moon-e10s1",
              "text": "보험회사. 유정의 빈 관 앞에 재혁이 도착하고 스크린에 보험금 상담 녹취가 재생된다.",
              "line": "",
              "sec": 24
            },
            {
              "id": "moon-e10s2",
              "text": "정유정의 클로즈업. 상대의 반응을 살피고 침묵을 깨뜨린다.",
              "line": "조문해 주셔서 감사합니다, 여보.",
              "sec": 20
            },
            {
              "id": "moon-e10s3",
              "text": "대답 직전 멈추는 시선. 유정이 살아서 나타나자 달아난 재혁을 지훈이 사고 예정 장소에서 체포한다.",
              "line": "",
              "sec": 16
            }
          ]
        },
        {
          "code": "EP.11",
          "title": "죽은 아내의 증언",
          "summary": "유정이 살아서 나타나자 달아난 재혁을 지훈이 사고 예정 장소에서 체포한다.",
          "runtime": "60s",
          "scenes": [
            {
              "id": "moon-e11s1",
              "text": "경찰서. 유정이 살아서 나타나자 달아난 재혁을 지훈이 사고 예정 장소에서 체포한다.",
              "line": "",
              "sec": 24
            },
            {
              "id": "moon-e11s2",
              "text": "정유정의 클로즈업. 상대의 반응을 살피고 침묵을 깨뜨린다.",
              "line": "오늘 여기서 끝나는 건 당신 계획이야.",
              "sec": 20
            },
            {
              "id": "moon-e11s3",
              "text": "대답 직전 멈추는 시선. 운명의 날짜를 넘긴 유정이 자기 이름으로 된 집에서 눈을 뜨고 지훈의 전화를 받는다.",
              "line": "",
              "sec": 16
            }
          ]
        },
        {
          "code": "EP.12",
          "title": "31일째의 아침",
          "summary": "운명의 날짜를 넘긴 유정이 자기 이름으로 된 집에서 눈을 뜨고 지훈의 전화를 받는다.",
          "runtime": "60s",
          "scenes": [
            {
              "id": "moon-e12s1",
              "text": "지하 주차장. 운명의 날짜를 넘긴 유정이 자기 이름으로 된 집에서 눈을 뜨고 지훈의 전화를 받는다.",
              "line": "",
              "sec": 24
            },
            {
              "id": "moon-e12s2",
              "text": "정유정의 클로즈업. 상대의 반응을 살피고 침묵을 깨뜨린다.",
              "line": "내일 약속해도 되는 거죠?",
              "sec": 20
            },
            {
              "id": "moon-e12s3",
              "text": "첫 에피소드의 장소와 대비되는 아침빛. 주인공이 스스로 선택한 일상으로 걸어간다.",
              "line": "",
              "sec": 16
            }
          ]
        }
      ]
    },
    "activity": [
      [
        "12개 회차 · 36개 장면 미리보기 제작 완료",
        "Shortflow",
        "Today"
      ],
      [
        "12부작 대본 확정",
        "지민",
        "Yesterday"
      ]
    ],
    "poster": "public/poster/webp/moon-640.webp",
    "posterThumb": "public/poster/webp/moon-160.webp"
  }
];
/* Original demo storylines: each episode has its own three-scene progression. */
const DISTRIBUTION_STORIES = {
  "summer-bus": {
    "style": {
      "label": "Coastal romance · Live-action",
      "mood": "필름 그레인과 바랜 청록색 버스, 늦여름의 금빛 역광. 파도와 엔진 소리 사이로 오래된 마음이 천천히 드러난다."
    },
    "characters": [
      {
        "name": "윤해원",
        "role": "Lead · 29",
        "desc": "서울에서 활동하다 고향 사진관을 정리하러 돌아온 사진가. 떠나야만 자신을 지킬 수 있다고 믿었다.",
        "hue": 195
      },
      {
        "name": "강도윤",
        "role": "Lead · 30",
        "desc": "폐선을 앞둔 17번 버스 기사. 타인을 먼저 챙기는 습관 때문에 가장 중요한 말을 미뤄왔다.",
        "hue": 35
      },
      {
        "name": "최민재",
        "role": "Supporting · 31",
        "desc": "지역신문 기자이자 해원의 작업 동료. 노선 매각의 부당함을 취재한다.",
        "hue": 215
      },
      {
        "name": "오순옥",
        "role": "Supporting · 67",
        "desc": "첫차로 시장에 나가는 생선 장수. 주민들의 목소리를 모으는 행동파.",
        "hue": 48
      },
      {
        "name": "윤정희",
        "role": "Supporting · 56",
        "desc": "해원의 어머니이자 사진관 주인. 딸을 위한다는 선택이 남긴 상처를 마주한다.",
        "hue": 15
      },
      {
        "name": "박기석",
        "role": "Supporting · 42",
        "desc": "차고지 정비사. 노선의 모든 고장과 장부의 이상을 기억한다.",
        "hue": 110
      }
    ],
    "locations": [
      "17번 버스",
      "바닷가 종점",
      "해원 사진관",
      "마을 정류장",
      "차고지",
      "재래시장",
      "군청 회의실",
      "해변"
    ],
    "others": [
      "시장 상인",
      "군청 담당자",
      "요양원 노인",
      "버스 승객"
    ],
    "episodes": [
      [
        "낯익은 뒷자리",
        "고향으로 돌아온 사진가 해원이 17번 막차에 오른다.",
        "운전석에서 십 년 전 첫사랑 도윤을 알아본다.",
        "종점에 도착하자 도윤이 그녀가 두고 간 빨간 우산을 건넨다."
      ],
      [
        "폐선까지 30일",
        "정류장에 노선 폐지 공고가 붙는다.",
        "해원은 어머니의 사진관 정리를 미루고 마지막 승객들을 촬영하기로 한다.",
        "도윤은 인터뷰를 거절하면서도 빈 좌석 하나를 닦아 둔다."
      ],
      [
        "보내지 못한 엽서",
        "사진관 서랍에서 주소가 없는 엽서 묶음이 발견된다.",
        "해원은 도윤의 필체를 알아보고 발신 날짜를 확인한다.",
        "자신이 서울로 떠난 날에도 그가 편지를 썼다는 사실을 알게 된다."
      ],
      [
        "비 오는 정류장",
        "폭우로 산길이 막혀 두 사람이 정류장에 갇힌다.",
        "도윤은 그날 약속 장소에 가지 못한 이유를 말하려다 멈춘다.",
        "해원은 그의 손목에 남은 사고 흉터를 본다."
      ],
      [
        "승객은 단 한 명",
        "생선 장수 순옥만 탄 첫차가 바닷길을 달린다.",
        "해원은 병원까지 세 번 갈아타야 한다는 순옥의 사정을 듣는다.",
        "노선을 지키는 서명 운동을 시작하자 첫 서명자가 도윤이다."
      ],
      [
        "사진 밖의 사람",
        "지역신문 기자 민재가 폐선 취재를 위해 찾아온다.",
        "민재는 해원에게 서울 전시회 공동 작업을 제안한다.",
        "두 사람이 웃는 모습을 본 도윤은 단체사진에서 빠져나온다."
      ],
      [
        "분실물 보관함",
        "아이의 가방을 찾아주던 해원이 낡은 카세트를 발견한다.",
        "테이프에는 고등학생 도윤이 녹음한 고백 연습이 담겨 있다.",
        "끝까지 듣기도 전에 도윤이 전원을 끈다."
      ],
      [
        "그날의 사고",
        "정비사 기석이 십 년 전 산사태 이야기를 꺼낸다.",
        "도윤이 해원의 어머니를 구하다 다쳤다는 사실이 밝혀진다.",
        "해원은 어머니가 왜 그 일을 숨겼는지 묻는다."
      ],
      [
        "엄마의 부탁",
        "어머니는 도윤에게 해원의 유학을 막지 말아 달라고 부탁했다고 털어놓는다.",
        "해원은 자신의 선택을 대신한 두 사람에게 화를 낸다.",
        "도윤은 변명 대신 당시 병원 진료 기록을 내민다."
      ],
      [
        "한 정거장 먼저",
        "해원은 도윤을 피하려고 마을 입구에서 내린다.",
        "도윤은 비탈길을 걷는 그녀 뒤로 헤드라이트를 비춘다.",
        "해원은 돌아서서 내일 사진 촬영에 나오라고 말한다."
      ],
      [
        "차고지의 저녁",
        "주민들이 차고지에서 작은 모금 식사를 연다.",
        "도윤은 아버지에게 배운 국수를 만들고 해원은 손님을 맞는다.",
        "밤이 깊어지자 두 사람은 처음으로 함께 찍은 사진을 남긴다."
      ],
      [
        "빈자리의 주인",
        "매일 같은 좌석을 예약하던 노인이 며칠째 나타나지 않는다.",
        "두 사람은 요양원에서 아내에게 버스 여행을 약속했던 사연을 듣는다.",
        "해원은 창밖 풍경을 영상으로 담아 노인에게 전달한다."
      ],
      [
        "서울에서 온 전화",
        "해원에게 해외 레지던시 합격 연락이 온다.",
        "출국일이 마지막 운행 다음 날로 정해져 있다.",
        "도윤은 축하한다고 말한 뒤 혼자 운행표를 접는다."
      ],
      [
        "서명지의 무게",
        "주민 서명이 목표를 넘겨 군청에 제출된다.",
        "담당자는 적자보다 차고지 매각 계약이 문제라고 밝힌다.",
        "해원은 매각을 추진한 업체가 민재의 취재 대상임을 알게 된다."
      ],
      [
        "지워진 운행 기록",
        "기석이 실제보다 적게 기록된 승객 집계표를 찾아낸다.",
        "민재와 해원이 원본을 대조해 고의 축소 정황을 확인한다.",
        "자료를 건넨 기석에게 계약 종료 통보가 도착한다."
      ],
      [
        "기사님의 사직서",
        "도윤이 기석 대신 책임을 지겠다며 사직서를 낸다.",
        "해원은 그가 또 혼자 희생하려 한다고 붙잡는다.",
        "두 사람은 이번에는 함께 싸우기로 약속한다."
      ],
      [
        "여름밤의 상영회",
        "사진관 외벽에 승객들의 하루를 담은 영상을 튼다.",
        "말없이 지켜보던 주민들이 각자의 버스 기억을 이야기한다.",
        "상영회 영상이 퍼지며 군청 공개 간담회가 열린다."
      ],
      [
        "당신의 목적지",
        "간담회에서 업체는 대체 택시 지원을 제안한다.",
        "순옥은 매일 시장에 가는 평범한 자유를 지켜 달라고 호소한다.",
        "군청은 주민 운영 노선의 사업계획을 검토하겠다고 답한다."
      ],
      [
        "고백은 왕복으로",
        "해원과 도윤이 비어 있는 버스를 타고 해변에 간다.",
        "해원은 카세트에 자신의 답장을 녹음한다.",
        "도윤은 십 년 동안 미뤘던 고백을 직접 전한다."
      ],
      [
        "마지막 운행표",
        "주민 운영안은 승인되지만 차량 구입비가 부족하다.",
        "해원은 사진 판매 수익을 보태고 도윤은 적금을 해지한다.",
        "서울 갤러리가 마을 기록전의 순회 전시를 제안한다."
      ],
      [
        "떠나는 연습",
        "해원은 출국 준비를 하며 사진관 열쇠를 정리한다.",
        "도윤은 가지 말라는 대신 공항행 첫차를 알아본다.",
        "두 사람은 서로의 꿈을 기다리는 방식을 정한다."
      ],
      [
        "종점에서 만나요",
        "기존 17번 버스의 마지막 운행에 주민들이 모인다.",
        "도윤이 승객 한 명씩 이름을 부르며 인사한다.",
        "종점에서 해원은 새 노선의 이름을 적은 현수막을 펼친다."
      ],
      [
        "첫차를 기다리는 편지",
        "해원이 해외에서 첫 전시를 열고 마을에 엽서를 보낸다.",
        "도윤은 주민 버스 첫 운행 사진으로 답장을 보낸다.",
        "해원의 작품 속 빈 운전석 옆에 그의 답장이 놓인다."
      ],
      [
        "다시, 여름",
        "일 년 뒤 해원이 사진관 전시를 위해 돌아온다.",
        "도윤은 새 버스의 뒷자리에 빨간 우산을 놓아둔다.",
        "두 사람은 종점 이후의 길을 함께 걸으며 다음 여름을 약속한다."
      ]
    ]
  },
  "palace-recipe": {
    "style": {
      "label": "Palace fantasy · Live-action",
      "mood": "수라간의 따뜻한 불빛과 궁궐의 차가운 비취색. 음식의 김과 질감을 가까이 담고 권력 다툼은 정적인 대칭 구도로 표현한다."
    },
    "characters": [
      {
        "name": "서유진",
        "role": "Lead · 28",
        "desc": "현대의 셰프. 낯선 궁에서 재료를 아끼는 지혜와 관찰력으로 살아남는다.",
        "hue": 25
      },
      {
        "name": "이헌",
        "role": "Lead · 31",
        "desc": "독살 위협으로 식사를 두려워하는 젊은 왕. 한 끼를 통해 사람을 다시 신뢰한다.",
        "hue": 190
      },
      {
        "name": "한나리",
        "role": "Supporting · 18",
        "desc": "기억력이 뛰어난 수라간 견습. 유진의 첫 친구이자 훗날 요리 학교의 교사.",
        "hue": 45
      },
      {
        "name": "박 상궁",
        "role": "Supporting · 52",
        "desc": "원칙을 중시하는 수라간 책임자. 제자를 잃은 죄책감 뒤에 다정함을 숨긴다.",
        "hue": 85
      },
      {
        "name": "서율",
        "role": "Supporting · 29",
        "desc": "좌의정의 아들이자 의관. 가문의 명예보다 환자와 진실을 선택한다.",
        "hue": 160
      },
      {
        "name": "민소정",
        "role": "Supporting · 27",
        "desc": "친정의 정치적 도구로 살아온 중전. 자신의 선택으로 궁의 위기를 끝낸다.",
        "hue": 320
      },
      {
        "name": "서문겸",
        "role": "Antagonist · 58",
        "desc": "군량과 식재료 유통을 장악한 좌의정. 왕의 불안을 권력 유지에 이용한다.",
        "hue": 260
      },
      {
        "name": "장묵",
        "role": "Rival · 35",
        "desc": "명성을 탐하다 협박에 휘말린 숙수. 유진과의 대결 뒤 잘못을 바로잡는다.",
        "hue": 5
      }
    ],
    "locations": [
      "수라간",
      "편전",
      "중전 처소",
      "궁중 연회장",
      "장터",
      "석빙고",
      "구휼소",
      "별채 저장고",
      "현대 레스토랑"
    ],
    "others": [
      "수라상 내관",
      "상단 행수",
      "정문 수비대",
      "구휼소 아이들"
    ],
    "episodes": [
      [
        "오늘의 수라는 불가능",
        "레스토랑 화재 속에서 낡은 조리서를 펼친 셰프 유진이 수라간에 떨어진다.",
        "불탄 솥을 숨기던 견습 나리는 그녀를 새 숙수로 착각한다.",
        "유진은 한 시진 안에 왕의 죽상을 만들라는 명을 받는다."
      ],
      [
        "왕은 맛을 잃었다",
        "유진은 왕 이헌이 모든 음식을 물리고 있다는 사실을 듣는다.",
        "그녀는 향과 온도가 다른 세 가지 미음을 낸다.",
        "이헌은 마지막 그릇에서 어린 시절의 향을 느낀다."
      ],
      [
        "소금 한 꼬집의 죄",
        "수라간 소금 항아리에서 수상한 가루가 발견된다.",
        "박 상궁은 출처 불명의 유진을 가두려 한다.",
        "유진이 가루를 물에 녹여 소금과 분리하며 누명을 벗을 실마리를 만든다."
      ],
      [
        "장터의 붉은 열매",
        "장 보기에 나선 유진은 귀한 오미자가 버려지는 것을 본다.",
        "신분을 감춘 이헌과 가격을 흥정하다 말다툼한다.",
        "둘은 상한 재료를 궁에 납품하는 상단의 수레를 발견한다."
      ],
      [
        "얼음 없는 빙과",
        "대비의 연회에서 차가운 후식을 내라는 주문이 떨어진다.",
        "유진은 석빙고의 얼음 배정을 거절당한다.",
        "우물물로 식힌 과일 묵이 손님들의 관심을 끈다."
      ],
      [
        "상궁의 칼",
        "박 상궁이 유진의 칼질을 보고 죽은 제자를 떠올린다.",
        "유진은 상궁의 손 떨림을 눈치채고 재료 손질을 대신한다.",
        "상궁은 창고 열쇠를 건네며 한 번의 기회를 준다."
      ],
      [
        "은수저가 검어진 밤",
        "왕의 국에 넣은 은수저가 검게 변해 수라상이 뒤집힌다.",
        "유진은 수저의 변화만으로 독을 단정할 수 없다고 주장한다.",
        "의관 서율이 별도 검사를 제안하며 그녀를 돕는다."
      ],
      [
        "같은 국, 다른 그릇",
        "서율은 왕의 그릇에만 이상한 잔여물이 남았다고 밝힌다.",
        "유진과 나리가 설거지 동선을 되짚는다.",
        "그릇을 바꾼 내관이 이미 궁을 떠났다는 사실이 드러난다."
      ],
      [
        "야식의 조건",
        "이헌은 밤마다 유진에게 소박한 식사를 부탁한다.",
        "유진은 식사 중에는 명령 대신 질문을 하라고 조건을 건다.",
        "왕은 처음으로 누구를 믿어야 하는지 모르겠다고 털어놓는다."
      ],
      [
        "찢어진 조리서",
        "유진이 가져온 조리서에서 한 장이 사라진다.",
        "나리는 중전 처소의 궁녀가 책을 살펴봤다고 말한다.",
        "빈 페이지에는 달빛 아래에서만 나타나는 글씨가 남아 있다."
      ],
      [
        "중전의 도시락",
        "중전 민씨가 친정에 보낼 도시락을 주문한다.",
        "유진은 음식 배치가 비밀 서신의 암호라는 사실을 알아낸다.",
        "중전은 서신을 숨겨주는 대신 사라진 페이지를 돌려주겠다고 한다."
      ],
      [
        "흉년의 잔칫상",
        "좌의정은 가뭄 속에서도 호화로운 사신 연회를 강행한다.",
        "유진은 적은 곡식으로 나눌 수 있는 채소 만두를 제안한다.",
        "이헌은 연회 비용 장부를 가져오라고 명한다."
      ],
      [
        "수라간 경연",
        "좌의정 측 숙수 장묵이 유진에게 공개 요리 대결을 청한다.",
        "두 사람에게 같은 재료와 화로가 주어진다.",
        "장묵이 유진의 밀가루를 바꿔놓은 사실을 나리가 발견한다."
      ],
      [
        "타지 않는 선택",
        "유진은 망가진 반죽을 버리지 않고 얇게 구워 새 요리를 만든다.",
        "박 상궁이 심사관 앞에서 재료 바꿔치기를 증언한다.",
        "장묵은 패배를 인정하면서도 자신도 협박받았다고 말한다."
      ],
      [
        "독이 든 장부",
        "장묵은 납품 장부를 넘기려다 쓰러진다.",
        "서율이 치료하는 동안 유진은 장부의 기름 얼룩을 해독한다.",
        "군량미가 연회 재료로 위장되어 빠져나간 경로가 드러난다."
      ],
      [
        "왕의 빈 그릇",
        "이헌이 대신들 앞에서 백성들과 같은 보리밥을 먹는다.",
        "좌의정은 왕의 건강을 핑계로 친정을 막으려 한다.",
        "이헌은 빈 그릇을 들어 보이며 직접 구휼에 나서겠다고 선언한다."
      ],
      [
        "성문 밖 한 끼",
        "유진과 이헌이 구휼소에서 직접 죽을 나눠준다.",
        "유진은 궁의 장부와 달리 창고가 비어 있음을 확인한다.",
        "굶주린 아이가 군량 수레가 향한 별채를 가리킨다."
      ],
      [
        "불 꺼진 별채",
        "일행이 별채에서 빼돌린 곡식과 가짜 인장을 찾는다.",
        "매복한 자객 때문에 이헌과 유진이 지하 저장고에 갇힌다.",
        "유진은 환기구를 이용해 밖에 구조 신호를 보낸다."
      ],
      [
        "서율의 성씨",
        "구조하러 온 서율을 자객이 좌의정의 아들이라고 부른다.",
        "서율은 아버지의 범행을 막기 위해 입궐했다고 밝힌다.",
        "유진은 의심하는 왕에게 그가 지켜낸 환자들을 떠올리게 한다."
      ],
      [
        "돌아가는 문",
        "보름달 아래 조리서에 원래 세계로 돌아갈 방법이 나타난다.",
        "문이 열리는 날은 왕의 생신 연회와 겹친다.",
        "유진은 조리서를 덮고 연회 메뉴를 다시 적는다."
      ],
      [
        "나리의 실종",
        "나리가 장부 사본을 전달하러 갔다가 사라진다.",
        "유진에게 증거와 나리를 맞바꾸라는 협박장이 온다.",
        "중전이 나리가 갇힌 친정 창고의 지도를 건넨다."
      ],
      [
        "상궁의 증언",
        "박 상궁은 과거 제자의 죽음도 같은 납품 비리와 연결됐다고 고백한다.",
        "그녀가 숨겨둔 옛 장부를 이헌에게 올린다.",
        "왕은 연회에서 대신들 앞에 증거를 공개하기로 한다."
      ],
      [
        "구출의 조리법",
        "유진은 창고 경비에게 납품할 야식 수레를 꾸민다.",
        "서율과 장묵이 배달꾼으로 잠입해 나리를 찾아낸다.",
        "나리는 포로로 잡힌 동안 들은 연회 습격 계획을 전한다."
      ],
      [
        "마지막 시식",
        "유진은 연회 음식과 그릇의 이동 경로를 모두 바꾼다.",
        "이헌은 위험을 알면서도 연회를 취소하지 않는다.",
        "시식 직전 중전의 잔에서 낯선 향이 퍼진다."
      ],
      [
        "잔을 든 중전",
        "중전은 자신에게도 독을 먹이려 한 친정의 계획을 폭로한다.",
        "서율이 문제의 술병을 봉인하고 납품인을 지목한다.",
        "좌의정은 친위대를 불러 연회장을 봉쇄한다."
      ],
      [
        "칼보다 뜨거운 솥",
        "수라간 사람들이 끓는 물과 수레로 통로를 막아 시간을 번다.",
        "나리가 증거 장부를 들고 정문 수비대에 달려간다.",
        "이헌의 군사들이 도착하면서 좌의정이 체포된다."
      ],
      [
        "한 사람을 위한 상",
        "소란이 끝난 빈 연회장에서 유진이 왕에게 따뜻한 국을 낸다.",
        "이헌은 그녀에게 남아 달라고 처음으로 부탁한다.",
        "유진은 자신이 다른 시대에서 왔다고 고백한다."
      ],
      [
        "보름의 문턱",
        "조리서가 빛나고 현대의 주방으로 통하는 문이 열린다.",
        "유진은 미처 인사하지 못한 가족을 떠올린다.",
        "이헌은 붙잡는 대신 돌아갈 때 먹으라며 작은 도시락을 건넨다."
      ],
      [
        "기록에 없는 숙수",
        "현대로 돌아온 유진은 왕실 음식 전시에서 자신의 조리법을 발견한다.",
        "주석에는 이름 없는 숙수를 평생 기다렸다는 왕의 기록이 남아 있다.",
        "유진은 조리서 마지막 장에서 다시 문을 여는 조건을 찾는다."
      ],
      [
        "내일의 수라",
        "유진이 가족에게 작별을 고하고 조리서를 다시 펼친다.",
        "궁의 봄날, 이헌 앞에 익숙한 도시락이 놓인다.",
        "돌아온 유진은 나리와 함께 백성에게 열린 요리 학교의 첫 수업을 시작한다."
      ]
    ]
  }
};
/* Completed demo titles for showing submission, review, and release together. */
[
  { id: 'summer-bus', title: '그 여름, 마지막 버스', episodes: 24, hue: 35, status: 'ready', submitted: false,
    logline: '폐선을 앞둔 마지막 버스에서 재회한 첫사랑. 여름이 끝나기 전, 두 사람은 놓쳤던 진심을 전하려 한다.' },
  { id: 'palace-recipe', title: '궁중 레시피', episodes: 30, hue: 48, status: 'review', submitted: true,
    logline: '조선의 수라간에 떨어진 현대의 셰프가 한 끼의 요리로 왕의 마음과 궁궐의 운명을 바꾼다.' },
].forEach((demo) => {
  const production = JSON.parse(JSON.stringify(SF.projects[0].production));
  const story = DISTRIBUTION_STORIES[demo.id];
  production.style = story.style;
  production.characters = story.characters.map((c, i) => ({ ...c, id: demo.id + '-c' + (i + 1) }));
  production.locations = story.locations;
  production.others = story.others;
  production.episodes = story.episodes.map(([title, ...beats], i) => ({
    code: 'EP.' + String(i + 1).padStart(2, '0'), title,
    summary: beats.join(' '),
    scenes: beats.map((text, k) => ({
      id: demo.id + '-e' + (i + 1) + 's' + (k + 1), text, line: '',
      sec: [18, 22, 20][(i + k) % 3],
    })),
  }));
  production.summary = { ...production.summary, episodes: demo.episodes,
    characters: production.characters.length, locations: production.locations.length,
    scenes: demo.episodes * 3, runtime: demo.episodes + 'm 00s', credits: demo.episodes * 700 };
  SF.projects.push({
    ...demo, format: 'Vertical Short Drama', source: 'Script', edited: 'Today', production,
    flow: { stage: 'done', eps: Array(demo.episodes).fill(1), speed: 0.004 },
    previewReady: Object.fromEntries(production.episodes.map((ep) => [ep.code, 1])),
    activity: [[demo.submitted ? 'Shortflow 심사 접수 완료' : '전 회차 제작 완료 · 제출 대기', 'Shortflow', 'Today']],
  });
});

SF.prod = SF.projects[0].production;
SF.activity = SF.projects[0].activity;
SF.planPool = SF.prod.episodes.map((ep) => ep.summary);
