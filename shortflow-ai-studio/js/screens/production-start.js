/* ==========================================================================
   Production flow — step 1 (Upload script) and step 2 (AI preparing)
   Styles: css/production.css
   ========================================================================== */
(() => {
const { cx, Button, Icon, Frame, Tag, SegmentedControl, Sheen } = window.UI;

function FlickeringGrid({ squareSize = 4, gridGap = 6, color = '#60A5FA', maxOpacity = 0.5, flickerChance = 0.1 }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0, height = 0, cells = [], frame = 0, last = 0, visible = false;
    const step = squareSize + gridGap;
    const draw = (elapsed = 0) => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = color;
      cells.forEach((cell) => {
        if (Math.random() < 1 - Math.pow(1 - flickerChance, elapsed)) cell.target = Math.random() * maxOpacity;
        cell.opacity += (cell.target - cell.opacity) * Math.min(1, elapsed * 8);
        ctx.globalAlpha = cell.opacity;
        ctx.fillRect(cell.x, cell.y, squareSize, squareSize);
      });
      ctx.globalAlpha = 1;
    };
    const tick = (time) => {
      const elapsed = last ? Math.min((time - last) / 1000, 0.1) : 0;
      if (!last || time - last >= 1000 / 30) { draw(elapsed); last = time; }
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame); last = 0;
      if (visible && !document.hidden && !reduced.matches) frame = requestAnimationFrame(tick);
      else draw();
    };
    const resize = () => {
      width = canvas.clientWidth; height = canvas.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cells = [];
      for (let y = 0; y < height; y += step) for (let x = 0; x < width; x += step) {
        const opacity = Math.random() * maxOpacity;
        cells.push({ x, y, opacity, target: opacity });
      }
      draw();
    };
    const sizeObserver = new ResizeObserver(resize);
    const visibilityObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    sizeObserver.observe(canvas); visibilityObserver.observe(canvas);
    document.addEventListener('visibilitychange', sync); reduced.addEventListener('change', sync);
    resize();
    return () => { cancelAnimationFrame(frame); sizeObserver.disconnect(); visibilityObserver.disconnect(); document.removeEventListener('visibilitychange', sync); reduced.removeEventListener('change', sync); };
  }, [squareSize, gridGap, color, maxOpacity, flickerChance]);
  return <canvas ref={ref} className="look-option__grid" aria-hidden="true" />;
}

function LookPreview({ look }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const video = ref.current;
    let visible = false;
    const sync = () => {
      if (visible && !document.hidden) video.play().catch(() => {});
      else video.pause();
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    observer.observe(video);
    document.addEventListener('visibilitychange', sync);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', sync); video.pause(); };
  }, []);
  return <video ref={ref} className="look-option__video" src={look.video} muted loop playsInline preload="metadata" aria-label={look.label + ' style preview'} />;
}

function UploadScript({ p, onPrepare }) {
  const [file, setFile] = React.useState(null);
  const [look, setLook] = React.useState('ai');
  const [ratio, setRatio] = React.useState('9:16');
  const [over, setOver] = React.useState(false);
  const pick = () => setFile({ name: (p.title || '대본') + '_최종고.pdf', meta: '86 pages · 12 episodes found' });
  const hues = { ai: p.hue || 165, live: 30, webtoon: 330, anim: 200 };
  return (
    <Page variant="upload">
      <div className="upload-intro">
        <div className="display-title">Turn your script into a series.</div>
        <div className="lead-text upload-intro__lead">Upload a finished script. AI finds the characters and scenes and gets the production ready for you.</div>
      </div>
      <button onClick={pick} onDragOver={(e) => { e.preventDefault(); setOver(true); }} onDragLeave={() => setOver(false)} onDrop={(e) => { e.preventDefault(); setOver(false); pick(); }}
        className={cx('upload-dropzone', over && 'upload-dropzone--over', file && 'upload-dropzone--has-file')}>
        {file ? (
          <>
            <span className="upload-dropzone__icon upload-dropzone__icon--done"><Icon name="file-check-2" size={24} /></span>
            <div className="upload-dropzone__title">{file.name}</div>
            <div className="upload-dropzone__hint">{file.meta} · <span className="upload-dropzone__change" onClick={(e) => { e.stopPropagation(); setFile(null); }}>Choose another</span></div>
          </>
        ) : (
          <>
            <span className="upload-dropzone__icon"><Icon name="file-up" size={24} /></span>
            <div className="upload-dropzone__title">Drop your script here</div>
            <div className="upload-dropzone__hint">or click to browse · PDF, DOCX, TXT</div>
          </>
        )}
      </button>
      <div className="upload-section-head"><div className="headline">What should it feel like?</div><span className="caption">Optional</span></div>
      <div className="look-options">
        {SF.prod.looks.map((l) => (
          <button key={l.key} onClick={() => setLook(l.key)} className={cx('select-ring', look === l.key && 'select-ring--selected')}>
            {l.video ? (
              <LookPreview look={l} />
            ) : l.key === 'ai' ? (
              <div className="look-option__auto" aria-hidden="true"><FlickeringGrid squareSize={4} gridGap={6} color="#60A5FA" maxOpacity={0.5} flickerChance={0.1} /></div>
            ) : <Frame hue={hues[l.key]} seed={'look-' + l.key} aspect="4/3" radius={11}>
              {l.key === 'ai' && <div className="look-option__badge"><Tag variant="media">Default</Tag></div>}
            </Frame>}
            <div className="look-option__text"><div className="look-option__label">{l.label}</div><div className="look-option__note">{l.note || ''}</div></div>
          </button>
        ))}
      </div>
      <div className="upload-ratio">
        <span className="upload-ratio__label">Screen</span>
        <SegmentedControl options={[{ value: '9:16', label: '9:16 Vertical' }, { value: '16:9', label: '16:9 Horizontal' }]} value={ratio} onChange={setRatio} />
      </div>
      <div className="upload-submit">
        <Button variant="primary" size="lg" iconRight="arrow-right" disabled={!file} onClick={() => onPrepare(p.id)} className="upload-submit__button">Prepare production</Button>
        <span className="caption">Free. Nothing is turned into video until you say so.</span>
      </div>
    </Page>
  );
}

const PREP_STEPS = ['Reading the script', 'Finding the characters', 'Creating the look of your series', 'Planning every scene'];

function Preparing({ onDone }) {
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    if (i >= PREP_STEPS.length) { const t = setTimeout(onDone, 600); return () => clearTimeout(t); }
    const t = setTimeout(() => setI(i + 1), 1500);
    return () => clearTimeout(t);
  }, [i]);
  return (
    <Page variant="preparing">
      <div className="preparing-intro">
        <div className="page-title">Preparing your series.</div>
        <div className="body-text preparing-intro__sub">About a minute. You can leave this page — we'll keep going.</div>
      </div>
      <div className="preparing-cast">
        {SF.prod.characters.map((c, k) => (
          <div key={c.id} className={cx('preparing-cast__member', i >= 2 && 'preparing-cast__member--visible')} style={{ '--reveal-delay': k * 0.15 + 's' }}>
            <Frame hue={c.hue} seed={c.id} aspect="3/4" radius={12}>{i === 2 && <Sheen />}</Frame>
            <div className="preparing-cast__name">{i >= 2 ? c.name : ''}</div>
          </div>
        ))}
      </div>
      <div className="preparing-steps">
        {PREP_STEPS.map((s, k) => (
          <div key={s} className={cx('preparing-step', k < i && 'preparing-step--done', k === i && 'preparing-step--active')}>
            {k < i ? <Icon name="check" size={18} color="var(--color-positive)" /> : <span className="step-marker"><span className={cx('step-marker__dot', k === i && 'step-marker__dot--active')} /></span>}
            {s}
          </div>
        ))}
      </div>
    </Page>
  );
}

Object.assign(window, { UploadScript, Preparing });
})();
