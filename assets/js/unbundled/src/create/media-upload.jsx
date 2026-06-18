// 새 콘텐츠 생성 — 미디어 업로드 (2시안: 드롭존 / 버튼 리스트)
// 목업이므로 '파일 선택' 클릭 시 가짜 파일을 추가. value = [{id,name}] 배열.

let _fid = 100;
function fakeFile(kind) {
  _fid += 1;
  const names = {
    image: ['poster_main.jpg', 'still_01.jpg', 'still_02.jpg', 'keyart.png'],
    video: ['EP01_1080p.mp4', 'EP02_1080p.mp4', 'teaser_30s.mp4', 'highlight.mp4'],
    doc:   ['기획안_v3.pdf', 'proposal.pdf'],
    subtitle: ['EP01.srt', 'EP02.srt', 'teaser.vtt', 'subtitle.srt'],
  }[kind] || ['file.bin'];
  return { id: 'f' + _fid, name: names[Math.floor(Math.random() * names.length)] };
}

const POSTER_KEYS = ['rose', 'indigo', 'teal', 'amber', 'slate'];

// ─── 썸네일 타일 ───────────────────────────────────────
function FileThumb({ file, kind, idx, onRemove, t }) {
  const removeBtn = (
    <button onClick={onRemove} style={{
      position: 'absolute', top: 5, right: 5, width: 20, height: 20, borderRadius: 999, border: 'none', cursor: 'pointer',
      background: 'rgba(15,17,21,0.62)', color: '#FFF', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" /></svg>
    </button>
  );
  if (kind === 'image') {
    const tone = POSTER_TONES[POSTER_KEYS[idx % POSTER_KEYS.length]];
    return (
      <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4', borderRadius: 10, overflow: 'hidden',
        background: `linear-gradient(165deg, ${tone.bg}, ${shade(tone.bg, -12)})`, boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.08)' }}>
        <span style={{ position: 'absolute', bottom: 6, left: 7, right: 24, fontFamily: t.mono, fontSize: 9, color: tone.ink, opacity: 0.8, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</span>
        {removeBtn}
      </div>
    );
  }
  if (kind === 'video') {
    return (
      <div style={{ position: 'relative', width: '100%', aspectRatio: '9/16', borderRadius: 10, overflow: 'hidden',
        background: 'linear-gradient(165deg, #2A2E36, #15171B)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="rgba(255,255,255,0.92)"><path d="M8 5v14l11-7z" /></svg>
        <span style={{ position: 'absolute', bottom: 6, left: 8, right: 24, fontFamily: t.mono, fontSize: 9.5, color: 'rgba(255,255,255,0.82)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</span>
        {removeBtn}
      </div>
    );
  }
  return null;
}

// 문서/단일 파일 행
function FileRow({ file, onRemove, t }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '10px 12px', borderRadius: 9, background: t.surfaceAlt, border: `0.5px solid ${t.line}` }}>
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="1.7"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></svg>
      <span style={{ flex: 1, fontFamily: t.sans, fontSize: 13, color: t.ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</span>
      <span style={{ fontFamily: t.mono, fontSize: 10.5, color: t.paid }}>업로드됨</span>
      <button onClick={onRemove} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: t.inkFaint, padding: 2, display: 'inline-flex' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" /></svg>
      </button>
    </div>
  );
}

// 공통 로직
function useUploader(kind, multiple, max, value, onChange) {
  const arr = Array.isArray(value) ? value : value ? [value] : [];
  const full = multiple ? arr.length >= max : arr.length >= 1;
  const add = () => {
    if (full) return;
    const next = multiple ? [...arr, fakeFile(kind)] : [fakeFile(kind)];
    onChange && onChange(next);
  };
  const remove = (id) => onChange && onChange(arr.filter((f) => f.id !== id));
  return { arr, full, add, remove };
}

// ════════════════════════════════════════════════════════
// 시안 A — 드롭존 + 썸네일 그리드
// ════════════════════════════════════════════════════════
function Dropzone({ kind, multiple, max, value, onChange, t, placeholder }) {
  const { arr, full, add, remove } = useUploader(kind, multiple, max, value, onChange);
  const isThumb = kind === 'image' || kind === 'video';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {!full && (
        <button onClick={add} style={{
          width: '100%', border: `1.5px dashed ${t.lineStrong}`, background: t.surfaceAlt, borderRadius: 12, cursor: 'pointer',
          padding: '26px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, transition: 'border-color .12s, background .12s',
        }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.background = ACCENT_SOFT; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = t.lineStrong; e.currentTarget.style.background = t.surfaceAlt; }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="1.8"><path d="M12 16V4M12 4l-5 5M12 4l5 5" strokeLinecap="round" strokeLinejoin="round" /><path d="M4 17v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2" strokeLinecap="round" /></svg>
          <div style={{ fontFamily: t.sans, fontSize: 13, fontWeight: 600, color: t.ink }}>{placeholder || '파일을 끌어다 놓거나 클릭'}</div>
          <div style={{ fontFamily: t.sans, fontSize: 11.5, color: t.inkFaint }}>{multiple ? `최대 ${max}개` : '1개'}{kind === 'video' ? ' · MP4 · 세로 9:16 · 1080p+' : kind === 'image' ? ' · JPG/PNG' : kind === 'subtitle' ? ' · SRT/VTT' : ' · PDF'}</div>
        </button>
      )}
      {isThumb && arr.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: kind === 'image' ? 'repeat(5, 1fr)' : 'repeat(auto-fill, minmax(112px, 128px))', gap: 10 }}>
          {arr.map((f, i) => <FileThumb key={f.id} file={f} kind={kind} idx={i} onRemove={() => remove(f.id)} t={t} />)}
        </div>
      )}
      {!isThumb && arr.map((f) => <FileRow key={f.id} file={f} onRemove={() => remove(f.id)} t={t} />)}
      {multiple && arr.length > 0 && (
        <div style={{ fontFamily: t.mono, fontSize: 11, color: t.inkFaint }}>{arr.length}/{max}</div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════
// 시안 B — 심플 '파일 선택' 버튼 + 파일 리스트
// ════════════════════════════════════════════════════════
function ButtonUploader({ kind, multiple, max, value, onChange, t, placeholder }) {
  const { arr, full, add, remove } = useUploader(kind, multiple, max, value, onChange);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
        <button onClick={add} disabled={full} style={{
          height: 38, padding: '0 15px', borderRadius: 9, cursor: full ? 'default' : 'pointer',
          border: `0.5px solid ${t.lineStrong}`, background: full ? t.surfaceAlt : t.surface, color: full ? t.inkFaint : t.ink,
          fontFamily: t.sans, fontSize: 13, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap',
        }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21.4 11.05L12.25 20.2a4 4 0 0 1-5.66-5.66l9.2-9.19a2.5 2.5 0 0 1 3.54 3.54l-9.2 9.19a1 1 0 0 1-1.41-1.41l8.49-8.49" strokeLinecap="round" strokeLinejoin="round" /></svg>
          파일 선택
        </button>
        <span style={{ fontFamily: t.sans, fontSize: 12, color: t.inkFaint }}>
          {arr.length === 0 ? (placeholder || '선택된 파일 없음') : multiple ? `${arr.length}/${max}개 선택됨` : arr[0].name}
        </span>
      </div>
      {arr.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {arr.map((f) => <FileRow key={f.id} file={f} onRemove={() => remove(f.id)} t={t} />)}
        </div>
      )}
    </div>
  );
}

// 래퍼 — variant 에 따라 분기
function MediaUpload({ variant, ...props }) {
  return variant === 'dropzone' ? <Dropzone {...props} /> : <ButtonUploader {...props} />;
}

Object.assign(window, { MediaUpload, Dropzone, ButtonUploader, FileThumb, FileRow });
