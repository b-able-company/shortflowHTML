/* ==========================================================================
   Episodes — watch finished episodes, follow production, remake single scenes
   Styles: css/episodes.css
   ========================================================================== */
(() => {
const { cx, Button, Icon, Frame, StatusBadge, Progress, CreditCost, Sheen } = window.UI;

const SCENE_PHASES = ['Composing the shot', 'Rendering', 'Adding voice', 'Finishing'];

function VideoPlayer({ hue, seed, dur, scenes, versions, selectedScene, onResume }) {
  const [t, setT] = React.useState(0);
  const [on, setOn] = React.useState(false);
  React.useEffect(() => { if (!on) return; const id = setInterval(() => setT((x) => { if (x + 0.2 >= dur) { setOn(false); return dur; } return x + 0.2; }), 200); return () => clearInterval(id); }, [on, dur]);
  const f = (s) => String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(Math.floor(s % 60)).padStart(2, '0');
  let elapsed = 0;
  const currentScene = scenes.find((scene) => { elapsed += scene.sec; return t < elapsed; }) || scenes[scenes.length - 1];
  const displayedScene = selectedScene || currentScene;
  const currentImage = displayedScene && !versions[displayedScene.id] ? displayedScene.image : undefined;
  const handlePlayerClick = () => {
    if (selectedScene) onResume();
    if (t >= dur) setT(0);
    setOn(!on);
  };
  return (
    <div className="video-player">
      <Frame hue={hue} seed={seed + (displayedScene ? displayedScene.id : '')} src={currentImage} radius={16}>
        <button onClick={handlePlayerClick} className="video-player__toggle" aria-label={on ? 'Pause episode' : 'Play episode'}>
          {!on && <span className="video-player__play"><Icon name="play" size={26} /></span>}
        </button>
        <div className="video-player__controls">
          <Progress value={t / dur} height={3} />
          <div className="video-player__time"><span>{f(t)}</span><span>{f(dur)}</span></div>
        </div>
      </Frame>
    </div>
  );
}

function EpisodeRail({ eps, sel, onPick }) {
  const prod = React.useContext(SF.ProductionContext);
  return (
    <aside className="episode-rail">
      <Kicker className="episode-rail__label">Episodes</Kicker>
      {prod.episodes.map((e, k) => {
        const v = eps[k]; const st = v >= 1 ? 'done' : v > 0 ? 'generating' : 'empty';
        return (
          <button key={e.code} onClick={() => onPick(k)} className={cx('unstyled-button episode-rail__item is-pressable', sel === k && 'episode-rail__item--selected')}>
            <span className="episode-rail__code">{e.code}</span>
            <span className={cx('episode-rail__title truncate', st === 'empty' && 'episode-rail__title--queued')}>{e.title}</span>
            {st === 'done' ? <Icon name="check" size={14} color="var(--color-positive)" /> : st === 'generating' ? <span className="episode-rail__percent">{Math.round(v * 100)}%</span> : <span className="episode-rail__queued-dot" />}
          </button>
        );
      })}
    </aside>
  );
}

function InProduction({ ep, v, hue, seed }) {
  const scenes = sceneList(ep);
  const n = Math.max(scenes.length, 1);
  const currentIndex = Math.min(n - 1, Math.floor(v * n));
  const local = Math.min(1, Math.max(0, v * n - currentIndex));
  const phase = SCENE_PHASES[Math.min(SCENE_PHASES.length - 1, Math.floor(local * SCENE_PHASES.length))];
  const developmentStyle = (progress) => {
    const reveal = 1 - Math.pow(1 - progress, 3);
    return {
    '--dev': progress,
    '--sb-blur': (1 - reveal) * 18 + 'px',
    '--sb-saturation': 0.1 + reveal * 0.9,
    '--sb-brightness': 0.35 + reveal * 0.65,
    '--sb-image-opacity': 0.25 + reveal * 0.75,
    '--sb-script-opacity': 1 - reveal * 0.85,
    };
  };
  return (
    <div className="episode-progress">
      <StatusBadge status="generating" label={ep.code + ' in production'} />
      <div className="episode-progress__title">{ep.title}</div>
      <div className="episode-progress__now">Your script is becoming scenes.</div>
      <div className="storyboard">
        {scenes.map((scene, index) => {
          const state = index < currentIndex ? 'done' : index === currentIndex ? 'current' : 'todo';
          const progress = state === 'done' ? 1 : state === 'current' ? local : 0;
          return (
            <div key={scene.id} className={cx('sb-card', 'sb-card--' + state)} style={developmentStyle(progress)}>
              {state !== 'todo' && (
                <div className="sb-card__img">
                  <Frame hue={hue} seed={seed + scene.id} src={scene.image} radius={0} />
                </div>
              )}
              {state !== 'done' && (
                <div className="sb-card__script">
                  <span>{scene.text}</span>
                  {scene.line && <span className="sb-card__line">“{scene.line}”</span>}
                </div>
              )}
              <div className="sb-card__foot">
                <span className="sb-card__no">{String(index + 1).padStart(2, '0')}</span>
                {state === 'current' && <span className="sb-card__phase"><span className="sb-card__live" />{phase}</span>}
                {state === 'done' && <span>{scene.sec}s</span>}
              </div>
            </div>
          );
        })}
      </div>
      <div className="caption episode-progress__note">We'll let you know when it's ready.</div>
    </div>
  );
}

function FinishedEpisode({ p, ep, onNext, hasNext, credits, onRemake, hue }) {
  const scenes = sceneList(ep);
  const [pick, setPick] = React.useState(null);
  const [edit, setEdit] = React.useState(false);
  const [busy, setBusy] = React.useState({});
  const [ver, setVer] = React.useState({});
  const dur = scenes.reduce((a, s) => a + s.sec, 0);
  const cost = SF.pricing.sceneRemake;
  const remake = (s) => { setBusy({ ...busy, [s.id]: true }); onRemake(cost); setTimeout(() => { setBusy((b) => ({ ...b, [s.id]: false })); setVer((x) => ({ ...x, [s.id]: (x[s.id] || 0) + 1 })); setPick(null); }, 2600); };
  const cur = pick != null ? scenes[pick] : null;
  return (
    <div className="finished-episode">
      <VideoPlayer hue={hue} seed={p.id + ep.code + JSON.stringify(ver)} dur={dur} scenes={scenes} versions={ver} selectedScene={cur} onResume={() => setPick(null)} />
      <div className="finished-episode__info">
        <Kicker>{ep.code} · {dur}s</Kicker>
        <div className="page-title finished-episode__title">{ep.code} is ready.</div>
        <div className="finished-episode__subtitle">{ep.title}</div>
        <div className="finished-episode__actions">
          <Button variant="secondary" icon="pencil" onClick={() => { setEdit(!edit); setPick(null); }}>{edit ? 'Done editing' : 'Edit this episode'}</Button>
          {hasNext && <Button variant="primary" iconRight="arrow-right" onClick={onNext}>Next episode</Button>}
        </div>
        {ep.summary && <div className="finished-episode__summary">{ep.summary}</div>}
        <div className="finished-episode__scenes">
          <div className="finished-episode__scenes-title">{edit ? 'Pick a scene you\'d like to redo' : 'Scenes in this episode'}</div>
          <div className="caption finished-episode__scenes-hint">{edit ? 'Only that scene is remade — the rest of the episode stays.' : 'Don\'t like one? Click it to remake just that scene.'}</div>
          <div className="remake-picker">
            {scenes.map((s, i) => (
              <button key={s.id} onClick={() => { setEdit(true); setPick(i); }} className={cx('select-ring select-ring--md', pick === i && 'select-ring--selected')}>
                <Frame hue={hue} seed={s.id + 'f' + (ver[s.id] || 0)} src={!ver[s.id] && !busy[s.id] ? s.image : undefined} radius={7}>{busy[s.id] && <Sheen />}<span className="remake-picker__number">{i + 1}</span></Frame>
              </button>
            ))}
          </div>
          {cur && (
            <div className="remake-card">
              <div className="remake-card__thumb"><Frame hue={hue} seed={cur.id + 'f' + (ver[cur.id] || 0)} src={!ver[cur.id] && !busy[cur.id] ? cur.image : undefined} radius={8}>{busy[cur.id] && <Sheen />}</Frame></div>
              <div className="remake-card__body">
                <div className="remake-card__title">Remake this scene?</div>
                <div className="remake-card__text">{cur.text}</div>
                <div className="caption remake-card__cost-note">{cur.sec} sec · Remaking uses extra credits.</div>
                <div className="remake-card__actions">
                  <Button size="sm" variant="primary" icon="rotate-cw" disabled={busy[cur.id]} onClick={() => remake(cur)}>{busy[cur.id] ? 'Remaking…' : 'Remake'}</Button>
                  <CreditCost amount={cost} balance={credits} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Episodes({ p, go, credits, onRemake, onSubmit, toast }) {
  const prod = React.useContext(SF.ProductionContext);
  const flow = p.flow;
  const eps = flow.eps;
  const firstActive = eps.findIndex((v) => v < 1);
  const [sel, setSel] = React.useState(() => { const d = eps.map((v, i) => (v >= 1 ? i : -1)).filter((i) => i >= 0); return d.length ? d[d.length - 1] : 0; });
  const hue = p.hue || 165;
  if (flow.stage === 'ready' || flow.stage === 'upload' || flow.stage === 'preparing') {
    return (
      <Page variant="empty">
        <div className="page-title">No episodes made yet.</div>
        <div className="body-text episodes-empty__desc">Check the characters and scenes, then create the series when you're ready.</div>
        <Button variant="primary" iconRight="arrow-right" className="episodes-empty__action" onClick={() => go({ name: flow.stage === 'ready' ? 'production' : 'upload', projectId: p.id })}>{flow.stage === 'ready' ? 'Go to production' : 'Upload a script'}</Button>
      </Page>
    );
  }
  const ep = prod.episodes[sel];
  const v = eps[sel];
  return (
    <div className="episodes-layout">
      <EpisodeRail eps={eps} sel={sel} onPick={setSel} />
      <div className="episodes-main">
        {flow.stage === 'done' && (
          <div className="series-complete">
            <Icon name="circle-check" size={24} color="var(--color-positive)" />
            <div className="series-complete__text"><div className="headline">Your series is complete.</div><div className="caption series-complete__meta">{eps.length} episodes · about {prod.summary.runtime}</div></div>
            <Button variant="ghost" icon="download" onClick={() => toast('Export started — we\u2019ll email the files')}>Export video</Button>
            <Button variant="accent" icon="send" onClick={() => onSubmit(p)}>Distribute on Shortflow</Button>
          </div>
        )}
        {v >= 1 ? <FinishedEpisode key={sel} p={p} ep={ep} hue={hue} credits={credits} onRemake={onRemake} hasNext={sel < eps.length - 1 && eps[sel + 1] > 0} onNext={() => setSel(sel + 1)} />
          : v > 0 ? <InProduction ep={ep} v={v} hue={hue} seed={p.id + ep.code} />
          : (
            <div className="episode-queued">
              <StatusBadge status="empty" label={ep.code + ' is queued'} />
              <div className="page-title episode-queued__title">{ep.title}</div>
              <div className="body-text episode-queued__desc">Starts after {prod.episodes[Math.max(0, firstActive)].code}. You can still change its scenes until then.</div>
              <Button variant="secondary" className="episode-queued__action" onClick={() => go({ name: 'production', projectId: p.id })}>Review scenes</Button>
            </div>
          )}
      </div>
    </div>
  );
}

Object.assign(window, { Episodes });
})();
