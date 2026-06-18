// 대시보드 공통 셸 — 상단 네비 + 서브탭 (워크플로우 / 메시지)
// 스크린샷 기반: shortflow 로고 좌측 + 콘텐츠/대시보드/이용가이드 + 우측 알림/카트/테마/언어/유저/로그아웃

// ─── 상단 네비 ───────────────────────────────────────
function DashTopNav({ t, active = '대시보드', notifications = 7 }) {
  return (
    <div style={{
      borderBottom: `0.5px solid ${t.line}`,
      background: t.bg,
      height: 64,
      display: 'flex', alignItems: 'center',
      padding: '0 40px',
    }}>
      {/* Logo */}
      <div style={{
        fontFamily: t.sans, fontSize: 18, fontWeight: 600, letterSpacing: -0.5,
        marginRight: 48,
      }}>
        <span style={{ color: t.ink }}>short</span>
        <span style={{ color: '#E85D2C' }}>flow</span>
      </div>

      {/* Nav links */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        {['콘텐츠', '대시보드', '이용가이드'].map((label) => (
          <button key={label} style={{
            border: 'none', background: 'transparent', cursor: 'pointer',
            fontFamily: t.sans, fontSize: 14, fontWeight: 600,
            color: active === label ? '#E85D2C' : t.ink,
            padding: '6px 0',
          }}>{label}</button>
        ))}
      </nav>

      {/* Right cluster */}
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 16 }}>
        {/* Notification */}
        <button style={{ position: 'relative', border: 'none', background: 'transparent', cursor: 'pointer', padding: 4, color: t.inkMute }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
          </svg>
          {notifications > 0 && (
            <span style={{
              position: 'absolute', top: -2, right: -4,
              minWidth: 16, height: 16, padding: '0 4px', borderRadius: 999,
              background: '#E85D2C', color: '#FFF',
              fontSize: 9.5, fontWeight: 700, fontFamily: t.mono,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              letterSpacing: 0,
            }}>{notifications}</span>
          )}
        </button>
        {/* Cart */}
        <button style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 4, color: t.inkMute }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M9 22a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM20 22a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
            <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/>
          </svg>
        </button>
        {/* Theme */}
        <button style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 4, color: t.inkMute }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        </button>
        {/* Language */}
        <button style={{
          border: `0.5px solid ${t.line}`, background: t.surface, borderRadius: 8,
          cursor: 'pointer', padding: '6px 10px',
          fontFamily: t.sans, fontSize: 12, fontWeight: 500, color: t.ink,
          display: 'inline-flex', alignItems: 'center', gap: 6,
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <circle cx="12" cy="12" r="10"/>
            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10M12 2a15.3 15.3 0 0 0-4 10 15.3 15.3 0 0 0 4 10"/>
          </svg>
          한국어
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </button>
        {/* User */}
        <span style={{ fontFamily: t.sans, fontSize: 13, fontWeight: 600, color: t.ink, marginLeft: 4 }}>Reelio</span>
        {/* Logout */}
        <button style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 4, color: t.inkMute, display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: t.sans, fontSize: 12.5 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>
          </svg>
          로그아웃
        </button>
      </div>
    </div>
  );
}

// ─── 서브탭 (워크플로우 / 문의함 / 회사) ────────────────
function DashSubTabs({ t, active = 'workflow', onChange = () => {}, isOwner = false }) {
  // 회사 탭은 모두에게 노출. 내부에서 owner-only 섹션을 분기 렌더.
  const tabs = [
    { k: 'workflow', label: '워크플로우', count: 24 },
    { k: 'messages', label: '문의함', count: 3 },
    { k: 'company',  label: '회사',     count: null },
  ];
  return (
    <div style={{
      borderBottom: `0.5px solid ${t.line}`,
      padding: '0 40px',
      display: 'flex', alignItems: 'flex-end', gap: 0,
    }}>
      {tabs.map((tab) => {
        const sel = active === tab.k;
        return (
          <button key={tab.k} onClick={() => onChange(tab.k)} style={{
            position: 'relative', border: 'none', background: 'transparent', cursor: 'pointer',
            padding: '14px 18px 14px 0', marginRight: 32,
            fontFamily: t.sans, fontSize: 14, fontWeight: 600, letterSpacing: -0.1,
            color: sel ? t.ink : t.inkFaint,
            display: 'inline-flex', alignItems: 'center', gap: 8,
            transition: 'color .15s',
          }}>
            {tab.label}
            {tab.count != null && (
              <span style={{
                fontFamily: t.mono, fontSize: 11, fontWeight: 600,
                padding: '2px 6px', borderRadius: 4,
                background: sel ? '#FFF1EC' : t.surfaceAlt,
                color: sel ? '#E85D2C' : t.inkFaint,
                letterSpacing: 0.2,
              }}>{tab.count}</span>
            )}
            {tab.ownerOnly && (
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                fontFamily: t.sans, fontSize: 10, fontWeight: 600,
                padding: '2px 6px 2px 5px', borderRadius: 4,
                background: sel ? '#FFF1EC' : t.surfaceAlt,
                color: sel ? '#E85D2C' : t.inkMute,
                letterSpacing: 0,
              }}>
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <rect x="3" y="11" width="18" height="11" rx="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                Owner
              </span>
            )}
            {sel && (
              <span style={{
                position: 'absolute', left: 0, right: 18, bottom: -1,
                height: 2, background: '#E85D2C', borderRadius: 2,
              }} />
            )}
          </button>
        );
      })}
    </div>
  );
}

// ─── 좌측 프로필 + 검색 ────────────────────────────────
function DashLeftProfile({ t }) {
  return (
    <div style={{
      background: t.surface, border: `0.5px solid ${t.line}`, borderRadius: 12,
      padding: '32px 24px 20px',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
    }}>
      <div style={{
        width: 72, height: 72, borderRadius: 999, background: '#E85D2C',
        color: '#FFF7EE', fontSize: 28, fontWeight: 700, fontFamily: t.sans,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 14,
      }}>R</div>
      <div style={{ fontSize: 17, fontWeight: 700, color: t.ink, letterSpacing: -0.3 }}>Reelio</div>
      <div style={{ fontSize: 12, color: t.inkMute, marginTop: 3 }}>플랫폼</div>
      <div style={{ width: '100%', marginTop: 20, position: 'relative' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={t.inkFaint} strokeWidth="1.8"
          style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }}>
          <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/>
        </svg>
        <input placeholder="콘텐츠명 검색..." style={{
          width: '100%', height: 38, padding: '0 12px 0 34px',
          border: `0.5px solid ${t.line}`, borderRadius: 8,
          background: t.surface, fontFamily: t.sans, fontSize: 13, color: t.ink,
          outline: 'none',
        }}/>
      </div>
    </div>
  );
}

Object.assign(window, { DashTopNav, DashSubTabs, DashLeftProfile });
