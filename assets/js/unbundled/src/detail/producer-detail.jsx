// Content detail page — recreation of live UI + 3 action-placement options.
// Goal: favorite + cart buttons live OFF the poster, equal-weight & visually unified.

// ─── Top nav (matches live screenshot: bell, theme, lang, user, logout) ───
function DetailTopNav({ t = BASE_TOKENS }) {
  const items = [
    { k: 'content', label: '콘텐츠', active: true },
    { k: 'dashboard', label: '대시보드' },
    { k: 'guide', label: '이용가이드' },
  ];
  const IconBtn = ({ children }) => (
    <button style={{
      width: 32, height: 32, borderRadius: 8, border: 'none',
      background: 'transparent', cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6B7280',
    }}>{children}</button>
  );
  return (
    <header style={{
      borderBottom: `0.5px solid ${t.line}`, background: t.surface,
      height: 64, display: 'flex', alignItems: 'center',
      position: 'sticky', top: 0, zIndex: 20,
    }}>
      <div style={{ width: '100%', maxWidth: 1280, margin: '0 auto', padding: '0 40px', display: 'flex', alignItems: 'center', gap: 36, whiteSpace: 'nowrap' }}>
        <div style={{
          fontWeight: 800, fontSize: 22, letterSpacing: -0.8,
          fontStyle: 'italic', fontFamily: t.sans,
        }}>
          <span style={{ color: '#111827' }}>short</span><span style={{ color: '#CBD5E1' }}>flow</span>
        </div>
        <nav style={{ display: 'flex', gap: 26 }}>
          {items.map((it) => (
            <div key={it.k} style={{
              fontSize: 14, cursor: 'pointer',
              color: it.active ? '#E85D2C' : '#6B7280',
              fontWeight: it.active ? 600 : 400,
            }}>{it.label}</div>
          ))}
        </nav>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8, color: '#6B7280', fontSize: 14 }}>
          <IconBtn>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
          </IconBtn>
          <IconBtn>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </IconBtn>
          <button style={{
            height: 32, padding: '0 10px', borderRadius: 8, border: 'none',
            background: 'transparent', cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 13, color: '#6B7280', fontFamily: t.sans,
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10 15 15 0 0 1 4-10z" />
            </svg>
            한국어
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          <span style={{ color: t.ink, fontWeight: 500, fontSize: 14, marginLeft: 6 }}>Reelio</span>
          <button style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', gap: 4,
            fontSize: 13, color: '#6B7280', padding: '0 6px',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
            </svg>
            로그아웃
          </button>
        </div>
      </div>
    </header>
  );
}

// ─── Poster (no heart on poster anymore) ─────────────────────
function DetailPoster({ t }) {
  return (
    <div style={{
      position: 'relative', width: 360, aspectRatio: '3/4',
      borderRadius: 6, overflow: 'hidden',
      background: `linear-gradient(180deg, #d4ccc0 0%, #6b5a4e 100%)`,
      boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
      flexShrink: 0,
    }}>
      {/* fake "production company" header bar */}
      <div style={{
        position: 'absolute', top: 14, left: 16,
        fontFamily: t.sans, fontSize: 11, fontWeight: 600,
        color: 'rgba(255,255,255,0.75)', letterSpacing: 1.5,
      }}>PARK&apos;N MEDIA</div>
      {/* play icon */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: 64, height: 64, borderRadius: 32,
        background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer',
      }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff" stroke="none">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
      {/* title bottom-right */}
      <div style={{
        position: 'absolute', bottom: 16, right: 18, textAlign: 'right',
        fontFamily: '"Geist", serif', color: '#fff', lineHeight: 0.9,
      }}>
        <div style={{ fontSize: 44, fontWeight: 800, letterSpacing: -1.5 }}>THE</div>
        <div style={{ fontSize: 44, fontWeight: 800, letterSpacing: -1.5 }}>TOUCH</div>
        <div style={{ fontSize: 10, fontWeight: 500, marginTop: 8, letterSpacing: 1.5, opacity: 0.9 }}>BAE EUNWOO &nbsp;&nbsp; KIM DONGWON</div>
      </div>
    </div>
  );
}

// ─── Metadata row (label + value) ─────────────────────────────
function MetaRow({ label, children, t }) {
  return (
    <div style={{ display: 'flex', gap: 36, paddingBottom: 14 }}>
      <div style={{ width: 80, fontSize: 14, color: t.ink, fontWeight: 700, flexShrink: 0 }}>{label}</div>
      <div style={{ fontSize: 14, color: t.ink, lineHeight: 1.7, flex: 1 }}>{children}</div>
    </div>
  );
}

// ─── Hashtag chip ────────────────────────────────────────────
function HashChip({ children, t }) {
  return (
    <span style={{
      display: 'inline-block', padding: '6px 12px', borderRadius: 16,
      border: `0.5px solid ${t.line}`, background: t.surface,
      fontSize: 13, color: t.ink, fontFamily: t.sans,
    }}>{children}</span>
  );
}

function ContractBadge({ t }) {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      height: 24,
      padding: '0 9px',
      borderRadius: 6,
      border: '1px solid #D7DAE2',
      background: '#F7F8FA',
      color: '#303642',
      fontSize: 12,
      fontWeight: 700,
      fontFamily: t.sans,
      lineHeight: 1,
      whiteSpace: 'nowrap',
    }}>거래중</span>
  );
}

// ─── Metadata column (shared by all variants) ────────────────
function DetailMeta({ t, includeStatus = false }) {
  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      <MetaRow label="제작연도" t={t}>2025</MetaRow>
      {includeStatus && <MetaRow label="제작 상태" t={t}>제작 완료</MetaRow>}
      <MetaRow label="거래 상태" t={t}>Reelio와 거래중</MetaRow>
      <MetaRow label="플랫폼" t={t}>testRelease, testReleased2</MetaRow>
      <MetaRow label="장르" t={t}>로맨스, 치정, 로맨스, 로맨스</MetaRow>
      <MetaRow label="에피소드" t={t}>90 ep x 2 mins</MetaRow>
      <MetaRow label="감독" t={t}>김진수</MetaRow>
      <MetaRow label="작가" t={t}>황지섭</MetaRow>
      <MetaRow label="배우" t={t}>혜리, 김동현</MetaRow>
      <MetaRow label="추천 포인트" t={t}>
        <div style={{ width: '100%', maxWidth: '100%', minWidth: 0, overflow: 'hidden' }}>- 금기된 관계 서사: 딸의 연인과 엄마 사이의 도덕적 경계를 넘는 파격적 관계 구조</div>
        <div>- 욕망과 감정의 충돌: 이성과 본능 사이에서 흔들리는 인간의 복합적 심리</div>
        <div>- 가족 관계의 붕괴와 재구성: 사랑으로 인해 무너지는 가족과 그 안의 갈등</div>
        <div>- 성숙한 여성 서사: 중년 여성의 욕망과 감정을 전면에 드러낸 현실적 이야기</div>
        <div>- 치유와 성장: 상처를 마주하고 감정을 받아들이는 과정</div>
      </MetaRow>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 18 }}>
        {['#금기된사랑','#치정로맨스','#가족붕괴','#욕망과감정','#성숙로맨스','#심리드라마'].map((h) => (
          <HashChip key={h} t={t}>{h}</HashChip>
        ))}
      </div>
    </div>
  );
}

// ─── Tabs (프리뷰 / 상세정보 / 스틸컷) ─────────────────────
function DetailTabs({ t, active, onChange }) {
  const tabs = [
    { id: 'preview', label: '프리뷰' },
    { id: 'detail', label: '상세정보' },
    { id: 'stills', label: '스틸컷' },
  ];
  return (
    <div style={{
      borderBottom: `0.5px solid ${t.line}`,
      marginTop: 64,
      marginBottom: 34,
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', height: 100 }}>
        {tabs.map((tab) => {
          const isActive = active === tab.id;
          return (
            <button key={tab.id} onClick={() => onChange(tab.id)} style={{
              position: 'relative',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              fontFamily: t.sans,
              fontSize: 16,
              fontWeight: 700,
              color: isActive ? '#E85D2C' : '#747482',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              padding: '0 0 18px',
            }}>
              {tab.label}
              {isActive && (
                <span style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: -0.5,
                  height: 2,
                  background: '#E85D2C',
                }} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function PreviewSection({ t }) {
  const [modalItem, setModalItem] = React.useState(null);
  const teaserVideos = [
    { type: '예고편', title: '예고편', duration: '00:48', tone: 'linear-gradient(145deg, #151923 0%, #332536 48%, #9f6a55 100%)', views: 28430 },
    { type: '예고편', title: '예고편', duration: '00:36', tone: 'linear-gradient(145deg, #202938 0%, #475064 52%, #d0a187 100%)', views: 19752 },
    { type: '예고편', title: '예고편', duration: '00:42', tone: 'linear-gradient(145deg, #2b1c26 0%, #704150 54%, #dfb7a7 100%)', views: 14368 },
  ];
  const freeEpisodes = [
    { type: '무료회차', title: '1화', duration: '12:04', views: 12840 },
    { type: '무료회차', title: '2화', duration: '11:38', views: 10932 },
    { type: '무료회차', title: '3화', duration: '12:21', views: 9841 },
    { type: '무료회차', title: '4화', duration: '10:57', views: 8756 },
    { type: '무료회차', title: '5화', duration: '11:42', views: 7942 },
    { type: '무료회차', title: '6화', duration: '12:10', views: 6815 },
    { type: '무료회차', title: '7화', duration: '10:46', views: 5927 },
    { type: '무료회차', title: '8화', duration: '11:55', views: 4836 },
    { type: '무료회차', title: '9화', duration: '12:18', views: 3914 },
    { type: '무료회차', title: '10화', duration: '11:07', views: 2847 },
  ];
  const openPreview = (item) => setModalItem(item);
  const PlayIcon = ({ size = 15 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
  );
  return (
    <div style={{ width: '100%', maxWidth: '100%', minWidth: 0, overflow: 'hidden' }}>
      <div style={{ display: 'grid', gap: 28, width: '100%', maxWidth: '100%', minWidth: 0 }}>
        <section style={{ minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: t.ink, marginBottom: 12 }}>예고편</div>
          <div style={{ display: 'flex', gap: 12, width: '100%', maxWidth: '100%', minWidth: 0, overflowX: 'auto', overflowY: 'hidden', paddingBottom: 6, WebkitOverflowScrolling: 'touch' }}>
            {teaserVideos.map((video) => (
              <button key={video.title} onClick={() => openPreview(video)} style={{
                width: 180, flex: '0 0 180px', aspectRatio: '9 / 16', minHeight: 0, border: '0.5px solid ' + t.line, borderRadius: 14, overflow: 'hidden',
                background: video.tone, cursor: 'pointer', position: 'relative', color: '#fff', fontFamily: t.sans,
                textAlign: 'left', padding: 16, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
              }}>
                <div style={{ fontSize: 11, letterSpacing: 1.1, color: 'rgba(255,255,255,0.68)' }}>TRAILER</div>
                <span style={{
                  alignSelf: 'center', width: 42, height: 42, borderRadius: '50%', background: 'rgba(255,255,255,0.92)',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#E85D2C',
                  boxShadow: '0 8px 24px rgba(17,24,39,0.16)'
                }}><PlayIcon size={17} /></span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 800 }}>{video.title}</div>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section style={{ minWidth: 0, borderTop: '0.5px solid ' + t.line, paddingTop: 26 }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: t.ink, marginBottom: 12 }}>무료회차</div>
          <div style={{ display: 'flex', gap: 12, width: '100%', maxWidth: '100%', minWidth: 0, overflowX: 'auto', overflowY: 'hidden', paddingBottom: 6, WebkitOverflowScrolling: 'touch' }}>
            {freeEpisodes.map((episode, i) => (
              <button key={episode.title} onClick={() => openPreview(episode)} style={{
                width: 180, flex: '0 0 180px', aspectRatio: '9 / 16', minHeight: 0, border: '0.5px solid ' + t.line, borderRadius: 14, overflow: 'hidden',
                background: ['linear-gradient(145deg, #1b2433 0%, #4c596f 58%, #d8b7a1 100%)','linear-gradient(145deg, #201b2b 0%, #604557 58%, #d7a79a 100%)','linear-gradient(145deg, #17212a 0%, #445c60 58%, #c2d2c6 100%)','linear-gradient(145deg, #251d21 0%, #6d473d 58%, #e0b88d 100%)','linear-gradient(145deg, #151923 0%, #3f4657 58%, #bfa7c6 100%)'][i % 5],
                cursor: 'pointer', position: 'relative', color: '#fff', fontFamily: t.sans, textAlign: 'left', padding: 16,
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
              }}>
                <div style={{ fontSize: 11, letterSpacing: 1.1, color: 'rgba(255,255,255,0.68)', fontWeight: 800 }}>FREE EPISODE</div>
                <span style={{
                  alignSelf: 'center', width: 42, height: 42, borderRadius: '50%', background: 'rgba(255,255,255,0.92)',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#E85D2C',
                  boxShadow: '0 8px 24px rgba(17,24,39,0.16)'
                }}><PlayIcon size={16} /></span>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>{episode.title}</div>
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>

      {modalItem && (
        <div onClick={() => setModalItem(null)} style={{
          position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(17,24,39,0.62)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 28
        }}>
          <div onClick={(event) => event.stopPropagation()} style={{
            width: 'min(390px, calc(100vw - 48px))', borderRadius: 22, overflow: 'hidden', background: 'transparent',
            boxShadow: '0 24px 80px rgba(0,0,0,0.32)'
          }}>
            <div style={{ aspectRatio: '9 / 16', position: 'relative', background: modalItem.tone || 'linear-gradient(145deg, #151923 0%, #3b465a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ position: 'absolute', top: 16, left: 18, right: 14, zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                <div style={{ fontSize: 18, color: '#111827', fontWeight: 900 }}>{modalItem.title}</div>
                <button onClick={() => setModalItem(null)} style={{
                  width: 34, height: 34, borderRadius: 17, border: 'none', background: 'transparent', cursor: 'pointer',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#111827'
                }} aria-label="닫기">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
                </button>
              </div>
              <span style={{ width: 64, height: 64, borderRadius: 32, background: 'rgba(255,255,255,0.92)', color: '#E85D2C', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <PlayIcon size={24} />
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
function StillsSection({ t }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
      {[0,1,2,3].map((i) => (
        <div key={i} style={{
          aspectRatio: '16 / 10', borderRadius: 10, border: `0.5px solid ${t.line}`,
          background: ['#e8d6d8', '#cfd6e8', '#ead7c2', '#d6ddd8'][i], overflow: 'hidden'
        }} />
      ))}
    </div>
  );
}

function DetailContentTabs({ t }) {
  const [active, setActive] = React.useState('preview');
  return (
    <>
      <DetailTabs t={t} active={active} onChange={setActive} />
      {active === 'preview' && <PreviewSection t={t} />}
      {active === 'detail' && <LoglineSection t={t} />}
      {active === 'stills' && <StillsSection t={t} />}
    </>
  );
}

function LoglineSection({ t }) {
  return (
    <div>
      <div style={{ fontSize: 22, fontWeight: 800, color: '#E85D2C', marginBottom: 18 }}>로그라인</div>
      <div style={{ fontSize: 15, color: t.ink, lineHeight: 1.7, maxWidth: 760 }}>
        딸의 연인을 향한 엄마의 금기된 감정. 한 번의 접촉으로 시작된 욕망은 가족이라는 안전한 울타리를 무너뜨리고, 세 사람의 운명을 돌이킬 수 없는 곳으로 끌고 간다.
      </div>
    </div>
  );
}

// ─── Heart icon button (square ghost) ────────────────────────
function FavSquareBtn({ active, onClick, t, size = 44 }) {
  return (
    <button onClick={onClick} style={{
      width: size, height: size, borderRadius: 10,
      border: `0.5px solid ${active ? '#E85D2C' : t.lineStrong}`,
      background: active ? '#FFF1EC' : t.surface,
      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0, padding: 0,
    }}>
      <HeartIcon filled={active} size={18} />
    </button>
  );
}

// ═══════════════════════════════════════════════════════════════
// VARIANT A: Side-by-side equal pills replacing 제안하기
//   [♡ 즐겨찾기] [+ 장바구니에 담기]
//   둘 다 같은 크기 ghost 스타일, 차이는 카트가 채워진 주황.
// ═══════════════════════════════════════════════════════════════
function DetailVariantA({ t }) {
  const [fav, setFav] = React.useState(false);
  const [inCart, setInCart] = React.useState(false);
  return (
    <div style={{ display: 'flex', gap: 12, marginTop: 14, marginBottom: 30 }}>
      <button onClick={() => setFav(!fav)} style={{
        height: 44, padding: '0 18px', borderRadius: 10,
        border: `0.5px solid ${fav ? '#E85D2C' : t.lineStrong}`,
        background: fav ? '#FFF1EC' : t.surface,
        color: fav ? '#E85D2C' : t.ink,
        cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8,
        fontFamily: t.sans, fontSize: 14, fontWeight: fav ? 600 : 500,
      }}>
        <HeartIcon filled={fav} size={15} />
        {fav ? '즐겨찾기' : '즐겨찾기'}
      </button>
      <button onClick={() => setInCart(!inCart)} style={{
        height: 44, padding: '0 20px', borderRadius: 10, border: 'none',
        background: inCart ? '#1A1A1A' : '#E85D2C', color: '#fff',
        cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8,
        fontFamily: t.sans, fontSize: 14, fontWeight: 600,
      }}>
        {inCart ? <CheckIcon size={13} color="#fff" weight={2.5} /> : <PlusIcon size={14} color="#fff" />}
        {inCart ? '장바구니에 담김' : '장바구니에 담기'}
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// VARIANT B: Both ghost outline, fully equal weight ("동급")
//   같은 색, 같은 스타일, 같은 크기. 카트가 primary가 아님.
//   "둘 다 똑같이 중요한 액션" 메시지를 가장 강하게 전달.
// ═══════════════════════════════════════════════════════════════
function DetailVariantB({ t }) {
  const [fav, setFav] = React.useState(false);
  const [inCart, setInCart] = React.useState(false);
  const Btn = ({ active, activeBg, icon, label, labelActive, onClick }) => (
    <button onClick={onClick} style={{
      flex: 1, maxWidth: 220, height: 48, borderRadius: 10,
      border: `0.5px solid ${active ? '#E85D2C' : t.lineStrong}`,
      background: active ? activeBg : t.surface,
      color: active ? '#E85D2C' : t.ink,
      cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      fontFamily: t.sans, fontSize: 14, fontWeight: active ? 600 : 500,
    }}>
      {icon}
      {active ? labelActive : label}
    </button>
  );
  return (
    <div style={{ display: 'flex', gap: 10, marginTop: 14, marginBottom: 30 }}>
      <Btn active={fav} activeBg="#FFF1EC"
        icon={<HeartIcon filled={fav} size={15} />}
        label="즐겨찾기" labelActive="즐겨찾기"
        onClick={() => setFav(!fav)} />
      <Btn active={inCart} activeBg="#FFF1EC"
        icon={inCart
          ? <CheckIcon size={13} color="#E85D2C" weight={2.5} />
          : <CartIcon size={15} />}
        label="장바구니 담기" labelActive="장바구니에 담김"
        onClick={() => setInCart(!inCart)} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// VARIANT C: Action panel docked at the BOTTOM of the meta column
//   메타데이터 끝에 카드형 액션 영역 ("이 콘텐츠를 어떻게 할까요?")
//   포스터/타이틀 영역에 액션을 두지 않고, 메타데이터를 다 읽은 뒤
//   자연스럽게 다음 단계로 유도. 두 버튼이 동급, 풀폭.
// ═══════════════════════════════════════════════════════════════
function DetailVariantC_Header({ t }) {
  // 헤더는 깨끗 — title + status 만
  return null;
}
function DetailVariantC_Actions({ t }) {
  const [fav, setFav] = React.useState(false);
  const [inCart, setInCart] = React.useState(false);
  return (
    <div style={{
      marginTop: 24, padding: 18,
      background: t.surface, border: `0.5px solid ${t.line}`, borderRadius: 12,
      display: 'flex', gap: 10,
    }}>
      <button onClick={() => setFav(!fav)} style={{
        flex: 1, height: 48, borderRadius: 10,
        border: `0.5px solid ${fav ? '#E85D2C' : t.lineStrong}`,
        background: fav ? '#FFF1EC' : '#fff',
        color: fav ? '#E85D2C' : t.ink,
        cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        fontFamily: t.sans, fontSize: 14, fontWeight: fav ? 600 : 500,
      }}>
        <HeartIcon filled={fav} size={15} />
        {fav ? '즐겨찾기' : '즐겨찾기'}
      </button>
      <button onClick={() => setInCart(!inCart)} style={{
        flex: 1, height: 48, borderRadius: 10, border: 'none',
        background: inCart ? '#1A1A1A' : '#E85D2C', color: '#fff',
        cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        fontFamily: t.sans, fontSize: 14, fontWeight: 600,
      }}>
        {inCart ? <CheckIcon size={13} color="#fff" weight={2.5} /> : <PlusIcon size={14} color="#fff" />}
        {inCart ? '장바구니에 담김' : '장바구니에 담기'}
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// VARIANT D: Title on the RIGHT of the poster (reference layout)
//   포스터 좌측 고정. 우측에 [타이틀 (연도)] → [작은 pill 버튼들] → [메타]
//   2025 부제 제거. '제작 상태' 필드 추가.
//   버튼은 라이트그레이 둥근 pill (= 메타 영역에서 secondary 액션 느낌).
// ═══════════════════════════════════════════════════════════════
function MiniPill({ icon, children, active, activeBg = '#FFF1EC', activeColor = '#E85D2C', onClick, t }) {
  return (
    <button onClick={onClick} style={{
      height: 28, padding: '0 11px 0 10px', borderRadius: 14,
      border: 'none',
      background: active ? activeBg : '#F3F4F6',
      color: active ? activeColor : '#1F2937',
      cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 5,
      fontFamily: t.sans, fontSize: 12, fontWeight: active ? 600 : 500,
      whiteSpace: 'nowrap',
    }}>
      {icon}
      {children}
    </button>
  );
}

function DetailVariantD_RightCol({ t }) {
  const [fav, setFav] = React.useState(false);
  const [inCart, setInCart] = React.useState(false);
  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      <h1 style={{
        fontSize: 28, fontWeight: 800, color: '#1A1A1A',
        margin: 0, letterSpacing: -0.6, lineHeight: 1.2,
      }}>
        The Touch <span style={{ color: '#6B7280', fontWeight: 700 }}>(2025)</span>
      </h1>
      <div style={{ display: 'flex', gap: 6, marginTop: 12, marginBottom: 26, flexWrap: 'wrap' }}>
        <MiniPill
          t={t} active={fav}
          icon={<HeartIcon filled={fav} size={12} color={fav ? '#E85D2C' : '#1F2937'} />}
          onClick={() => setFav(!fav)}
        >
          {fav ? '즐겨찾기' : '즐겨찾기'}
        </MiniPill>
        <button disabled style={{
          height: 28,
          padding: '0 11px 0 10px',
          borderRadius: 14,
          border: 'none',
          background: '#F3F4F6',
          color: '#6B7280',
          cursor: 'not-allowed',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 5,
          fontFamily: t.sans,
          fontSize: 12,
          fontWeight: 600,
          whiteSpace: 'nowrap',
        }}>
          <CheckIcon size={11} color="#6B7280" weight={2.5} />
          계약 완료
        </button>
      </div>
      <DetailMeta t={t} includeStatus />
    </div>
  );
}

function ContentDetailPageD({ t = BASE_TOKENS }) {
  return (
    <div style={{ minHeight: '100%', background: t.bg, color: t.ink, fontFamily: t.sans }}>
      <main style={{ margin: '0 auto', padding: '32px 40px 80px', maxWidth: 1120 }}>
        <button style={{
          background: 'transparent', border: 'none', cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', gap: 8,
          fontSize: 14, color: t.ink, fontFamily: t.sans, padding: 0, marginBottom: 22,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          뒤로 가기
        </button>

        {/* poster left · title+actions+meta right */}
        <div style={{ display: 'flex', gap: 56 }}>
          <DetailPoster t={t} />
          <DetailVariantD_RightCol t={t} />
        </div>

        <DetailContentTabs t={t} />
      </main>
    </div>
  );
}

// ─── Page shell (renders one variant) ─────────────────────────
function ContentDetailPage({ variant = 'A', t = BASE_TOKENS }) {
  if (variant === 'D') return <ContentDetailPageD t={t} />;
  return (
    <div style={{ minHeight: '100%', background: t.bg, color: t.ink, fontFamily: t.sans }}>
      <main style={{ margin: '0 auto', padding: '32px 40px 80px', maxWidth: 1120 }}>
        {/* back */}
        <button style={{
          background: 'transparent', border: 'none', cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', gap: 8,
          fontSize: 14, color: t.ink, fontFamily: t.sans, padding: 0, marginBottom: 22,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          뒤로 가기
        </button>

        {/* title block */}
        <h1 style={{
          fontSize: 40, fontWeight: 800, color: '#E85D2C',
          margin: 0, letterSpacing: -1, lineHeight: 1.1,
        }}>The Touch</h1>
        <div style={{ fontSize: 14, color: t.inkMute, marginTop: 10, fontWeight: 500 }}>
          2025 &nbsp;|&nbsp; 제작 완료
        </div>

        {/* ACTIONS for A & B go here (replacing 제안하기) */}
        {variant === 'A' && <DetailVariantA t={t} />}
        {variant === 'B' && <DetailVariantB t={t} />}
        {variant === 'C' && <div style={{ height: 22 }} /> /* spacer */}

        {/* poster + meta */}
        <div style={{ display: 'flex', gap: 56, marginTop: variant === 'C' ? 14 : 0 }}>
          <DetailPoster t={t} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <DetailMeta t={t} />
            {variant === 'C' && <DetailVariantC_Actions t={t} />}
          </div>
        </div>

        <DetailContentTabs t={t} />
      </main>
    </div>
  );
}

Object.assign(window, {
  ContentDetailPage, ContentDetailPageD,
  DetailTopNav, DetailPoster, DetailMeta, DetailTabs, DetailContentTabs, PreviewSection, StillsSection, LoglineSection,
  DetailVariantA, DetailVariantB, DetailVariantC_Actions, DetailVariantD_RightCol,
  MiniPill, FavSquareBtn,
});
