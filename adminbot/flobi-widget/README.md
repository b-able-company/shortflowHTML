# Flobi — Shortflow Admin AI 어시스턴트 위젯

확정안: **B안 Flobi Soft · iMessage Blue**. `index.html`을 브라우저로 열면 동작 확인 가능.

## 파일
- `flobi-widget.css` — 위젯 전체 스타일 (모든 셀렉터가 `.sfw` 하위로 스코프됨, 대시보드 스타일과 충돌 없음)
- `flobi-widget.js` — 바닐라 JS 위젯 클래스 `FlobiWidget` (의존성 없음)
- `index.html` — 최소 데모

## 붙이는 방법
1. 관리자 레이아웃(모든 페이지 공통, 라우트 바뀌어도 언마운트되지 않는 곳)에 루트 추가
   ```html
   <div class="flobi-root" id="flobi-root"></div>
   ```
   ```css
   .flobi-root{position:fixed;inset:0;pointer-events:none;z-index:9999}
   ```
2. CSS/JS 로드 후 1회 생성
   ```js
   const flobi = new FlobiWidget(document.getElementById('flobi-root'), { live: true });
   ```
3. 폰트: Pretendard(본문), JetBrains Mono(작은 태그). 없으면 시스템 폰트로 fallback.

## 동작
- 접힘: 우하단 런처(마스코트) + 주기적 말풍선. 클릭 시 펼침
- 펼침: 헤더 드래그로 이동(화면 밖으로 안 나감), `—` 최소화(대화 유지), `✕` 닫기(대화·위치 초기화)
- 단축키: `⌘/Ctrl + J` 토글, `Esc` 최소화
- Enter 전송 / Shift+Enter 줄바꿈 (한글 IME 조합 중 Enter 무시 처리됨)
- 최소화 상태에서 답변 도착 시 런처에 알림 배지

## API (공개 메서드)
- `setOpen(bool)` · `close()` · `ask(text)` · `state()` · `destroy()`

## 실제 백엔드 연결
`flobi-widget.js`의 `ask(q)`에서 목업 부분만 교체하면 됨:
```js
// 현재: match(q)로 ANS 목업을 고른 뒤 setTimeout 1.4s 후 push
// 교체: this.thinking = {...}; render(); → await fetch(...) → this.msgs.push({a: <응답>}); render();
```
응답 렌더 포맷(`V.flobi.ai`)은 `{ text, stat:[라벨, 숫자, 단위], rows:[[태그, tone, 제목, 부제, 우측값]] | null, act:'버튼 라벨' }`.
`act` 버튼에 실제 라우팅(예: 회원 관리 › 유저)을 연결해 주세요.

## 컬러 토큰 (`.sfw[data-s=flobi]` 변수)
| 토큰 | 값 | 용도 |
|---|---|---|
| `--acc` | #0a84ff | 포인트, 내 말풍선, 전송 버튼 |
| `--deep` | #0a70e0 | 숫자, 링크 텍스트 |
| `--t1` | #ebf4ff | 마스코트 아바타 배경 |
| `--tile` | #d6e9ff | 런처 타일 |
| `--aib` | #efeff2 | AI 말풍선 |
| `--fill` | #f2f2f5 | 입력창, 추천 질문 |
| `--face` / `--eye` | #1c2a3e / #8fdcff | 플로비 얼굴 / 눈 |
| `--ant` | #ffd45e | 안테나, 알림 배지 |

## shortflowHTML 공통 레이아웃 연결
- `admin/admin-common.js`에서 스타일과 위젯, `adminbot/adminbot.js`를 순서대로 로드합니다.
- 관리자 페이지당 한 번 생성하며 메일 작성 등 `?embed` 화면에는 중복 생성하지 않습니다.
- 전체 페이지 이동 시 같은 탭의 `sessionStorage`로 대화·열림 상태·위치를 복원합니다. 저장소가 제한되면 현재 페이지에서만 유지됩니다.
- 답변 버튼은 회원 관리, KPI, 수정 요청, 정산, 운영 현황으로 이동합니다.
- 응답은 제공된 목업이며 실제 운영 데이터 API는 연결되지 않았습니다.
