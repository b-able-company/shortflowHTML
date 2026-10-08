/* ==========================================================================
   Production workspace — step 3 (review & change) + step 4 (cost checkpoint)
   Tabs: Characters · Scene plan / Scene previews · Look & mood
   Styles: css/production.css
   Cost ladder: text plan (free) → scene previews (SF.pricing.previewPerScene) → final videos (checkpoint)
   ========================================================================== */
(() => {
const { cx, Button, IconButton, Icon, Frame, Tag, Tabs, Input, Dialog, StatusBadge, Progress, Checkbox, Chips, CostLabel, Sheen } = window.UI;
const fmtN = (n) => Number(n).toLocaleString('en-US');
const PER_SCENE = SF.pricing.previewPerScene;

/* Fake "remake" — busy for ms, then bumps a version counter (changes the placeholder art) */
function useRemake(ms = 1600) {
  const [busy, setBusy] = React.useState(false);
  const [v, setV] = React.useState(0);
  const run = (after) => { setBusy(true); setTimeout(() => { setBusy(false); setV((x) => x + 1); after && after(); }, ms); };
  return [busy, v, run];
}

/* Scenes of an episode — explicit in mock data, or generated from SF.planPool */
function sceneList(ep) {
  if (ep.scenes) return ep.scenes;
  const n = ep.count || 6; const base = parseInt(ep.code.slice(3), 10) * 3;
  return Array.from({ length: n }).map((_, k) => ({ id: ep.code + 's' + k, text: k === 0 && ep.summary ? ep.summary : SF.planPool[(base + k) % SF.planPool.length], line: '', sec: [6, 8, 5, 9, 7, 6, 8][k % 7] }));
}
const epCost = (ep) => sceneList(ep).length * PER_SCENE;

/* Preview state per project survives tab switches / navigation (in-memory only) */
const PREVIEW_STORE = {};
function usePreviewStore(pid, init) {
  const [s, set] = React.useState(() => PREVIEW_STORE[pid] || (PREVIEW_STORE[pid] = init()));
  const update = (fn) => set((prev) => { const n = fn(prev); PREVIEW_STORE[pid] = n; return n; });
  return [s, update];
}

/* ---------- Character "Change" dialog ---------- */
function CharacterDialog({ c, onClose, onDone }) {
  const [busy, v, run] = useRemake();
  const [alt, setAlt] = React.useState(0);
  const [uploaded, setUploaded] = React.useState(false);
  const versions = [0, 1, 2].map((k) => k + v * 3);
  return (
    <Dialog onClose={onClose} size="lg" title={'Change ' + c.name} description="Pick another look, describe what to change, or use your own image."
      footer={<><Button variant="ghost" onClick={onClose}>Cancel</Button><Button variant="primary" onClick={() => onDone(uploaded ? 'up' : versions[alt])}>Use this look</Button></>}>
      <div className="character-editor">
        <div>
          <Frame hue={c.hue} seed={c.id + (uploaded ? 'up' : versions[alt])} src={!uploaded && !busy && alt === 0 && v === 0 ? c.image : undefined} aspect="3/4" radius={14}>{busy && <Sheen />}{uploaded && <div className="character-editor__badge"><Tag variant="media">Your image</Tag></div>}</Frame>
          <div className="character-editor__versions">
            {versions.map((s, k) => (
              <button key={s} onClick={() => { setUploaded(false); setAlt(k); }} className={cx('select-ring select-ring--sm', !uploaded && alt === k && 'select-ring--selected')}>
                <Frame hue={c.hue} seed={c.id + s} src={!uploaded && !busy && k === 0 && v === 0 ? c.image : undefined} aspect="3/4" radius={6}>{busy && <Sheen />}</Frame>
              </button>
            ))}
          </div>
          <Button full size="sm" variant="secondary" icon="rotate-cw" className="character-editor__more" disabled={busy} onClick={() => run(() => setAlt(0))}>Show other versions</Button>
        </div>
        <div className="character-editor__options">
          <div>
            <div className="character-editor__question">How would you like to change them?</div>
            <Input multiline rows={3} placeholder="조금 더 성숙하고 차가운 인상으로" />
            <Button size="sm" variant="secondary" icon="rotate-cw" className="character-editor__remake" disabled={busy} onClick={() => run(() => { setUploaded(false); setAlt(0); })}>{busy ? 'Remaking…' : 'Remake'}</Button>
          </div>
          <div className="reference-upload">
            <div className="reference-upload__title">Have an image in mind?</div>
            <div className="reference-upload__desc">We'll keep {c.name} looking like your image in every episode.</div>
            <Button size="sm" variant="secondary" icon="image-up" className="reference-upload__button" onClick={() => setUploaded(true)}>{uploaded ? 'Image added' : 'Upload image'}</Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

/* ---------- Scene detail dialog (opened from a visual preview) ---------- */
function SceneDialog({ ep, index, hue, st, setSt, onSpend, onClose }) {
  const scenes = sceneList(ep);
  const [i, setI] = React.useState(index);
  const [mode, setMode] = React.useState(null);
  const [what, setWhat] = React.useState(null);
  const [draft, setDraft] = React.useState('');
  const [busy, setBusy] = React.useState(false);
  const s = scenes[i];
  const text = st.text[s.id] || s.text;
  const line = st.lines[s.id] ?? s.line;
  const outdated = !!st.outdated[s.id];
  const ver = st.ver[s.id] || 0;
  /* Editing text never regenerates — it only marks the preview outdated */
  const apply = () => { if (!draft.trim()) return; setSt((x) => ({ ...x, text: { ...x.text, [s.id]: draft.trim() }, outdated: { ...x.outdated, [s.id]: true } })); setDraft(''); setWhat(null); setMode(null); };
  const remake = () => { setBusy(true); onSpend(PER_SCENE); setTimeout(() => { setBusy(false); setSt((x) => { const o = { ...x.outdated }; delete o[s.id]; return { ...x, outdated: o, ver: { ...x.ver, [s.id]: (x.ver[s.id] || 0) + 1 } }; }); }, 1600); };
  const goTo = (n) => { setI(n); setMode(null); setDraft(''); setWhat(null); };
  return (
    <Dialog onClose={onClose} size="xl" title={ep.code + ' · Scene ' + (i + 1)} description={ep.title + ' · about ' + s.sec + ' sec'}
      footer={<><span className="spacer" /><IconButton icon="chevron-left" label="Previous" disabled={i === 0} onClick={() => goTo(i - 1)} /><IconButton icon="chevron-right" label="Next" disabled={i === scenes.length - 1} onClick={() => goTo(i + 1)} /><Button variant="primary" onClick={onClose}>Done</Button></>}>
      <div className="scene-detail">
        <div className={cx('scene-detail__media', outdated && !busy && 'scene-detail__media--outdated')}>
          <Frame hue={hue} seed={s.id + 'v' + ver} src={!busy && ver === 0 ? s.image : undefined} radius={14}>{busy && <Sheen />}</Frame>
          {outdated && !busy && <div className="scene-detail__badge"><Tag variant="media">Old description</Tag></div>}
        </div>
        <div className="scene-detail__content">
          <div className="scene-detail__text">{text}</div>
          {line && <div className="scene-line"><div className="caption">Line</div><div className="scene-line__text">“{line}”</div></div>}
          {outdated && (
            <div className="outdated-notice">
              <div className="outdated-notice__title">The scene description changed.</div>
              <div className="outdated-notice__desc">This preview was made from the old description. We won't remake it unless you ask.</div>
              <Button size="sm" variant="primary" icon="rotate-cw" className="outdated-notice__action" disabled={busy} onClick={remake}>{busy ? 'Making…' : <>Make new preview <CostLabel n={PER_SCENE} /></>}</Button>
            </div>
          )}
          <div className="scene-detail__actions">
            <Button size="sm" variant={mode === 'scene' ? 'primary' : 'secondary'} icon="pencil" onClick={() => setMode(mode === 'scene' ? null : 'scene')}>Edit scene</Button>
            <Button size="sm" variant={mode === 'line' ? 'primary' : 'secondary'} icon="message-square" onClick={() => setMode(mode === 'line' ? null : 'line')}>Edit line</Button>
            {!outdated && <Button size="sm" variant="secondary" icon="rotate-cw" disabled={busy} onClick={remake}>{busy ? 'Making…' : <>Remake preview <CostLabel n={PER_SCENE} /></>}</Button>}
          </div>
          {mode === 'scene' && (
            <div className="scene-detail__editor">
              <div className="scene-detail__question">What do you want to change?</div>
              <Chips items={['Action', 'Expression', 'Background', 'Line', 'Mood', 'Describe it']} value={what} onPick={setWhat} />
              <Input multiline rows={2} placeholder="서윤이 조금 더 충격받은 표정이면 좋겠어." value={draft} onChange={(e) => setDraft(e.target.value)} />
              <div className="scene-detail__apply"><Button size="sm" variant="secondary" disabled={!draft.trim()} onClick={apply}>Apply change</Button><span className="caption">Free. The preview is only remade if you ask.</span></div>
            </div>
          )}
          {mode === 'line' && (
            <div className="scene-detail__editor scene-detail__editor--line">
              <Input defaultValue={line} placeholder="대사를 입력하세요" onChange={(e) => setSt((x) => ({ ...x, lines: { ...x.lines, [s.id]: e.target.value } }))} />
              <div><Button size="sm" variant="secondary" onClick={() => setMode(null)}>Save line</Button></div>
            </div>
          )}
        </div>
      </div>
    </Dialog>
  );
}

/* ---------- Tab: Characters ---------- */
function CharactersTab({ hue, picks, setPicks, toast }) {
  const prod = React.useContext(SF.ProductionContext);
  const [edit, setEdit] = React.useState(null);
  const [showPlaces, setShowPlaces] = React.useState(false);
  return (
    <div>
      <div className="character-grid">
        {prod.characters.map((c) => (
          <div key={c.id} className="character-card">
            <Frame hue={c.hue} seed={c.id + (picks[c.id] ?? 0)} src={picks[c.id] == null ? c.image : undefined} aspect="3/4" radius={14} className="media-frame--elevated" />
            <div className="character-card__name">{c.name}</div>
            <div className="character-card__role">{c.role}</div>
            <div className="character-card__desc">{c.desc}</div>
            <Button size="sm" variant="secondary" className="character-card__change" onClick={() => setEdit(c)}>Change</Button>
          </div>
        ))}
      </div>
      <div className="auto-handled">
        <div className="auto-handled__row auto-handled__head">
          <Icon name="users" size={18} />
          <div className="auto-handled__text"><div className="auto-handled__title">{prod.others.length} other characters</div><div className="auto-handled__desc">AI prepares them to fit the story.</div></div>
          <Button size="sm" variant="ghost">View all</Button>
        </div>
        <div className="auto-handled__row">
          <div className="auto-handled__head">
            <Icon name="map-pin" size={18} />
            <div className="auto-handled__text"><div className="auto-handled__title">{prod.locations.length} places & key objects</div><div className="auto-handled__desc">Handled automatically. Look only if you want to.</div></div>
            <Button size="sm" variant="ghost" iconRight={showPlaces ? 'chevron-up' : 'chevron-down'} onClick={() => setShowPlaces(!showPlaces)}>{showPlaces ? 'Hide' : 'View'}</Button>
          </div>
          {showPlaces && <div className="location-grid">{prod.locations.map((l) => {
            const name = typeof l === 'string' ? l : l.name;
            return <div key={name}><Frame hue={hue} seed={'loc' + name} src={typeof l === 'string' ? undefined : l.image} aspect="4/3" radius={8} /><div className="location-grid__name">{name}</div></div>;
          })}</div>}
        </div>
      </div>
      {edit && <CharacterDialog c={edit} onClose={() => setEdit(null)} onDone={(seed) => { setPicks({ ...picks, [edit.id]: seed }); setEdit(null); toast(edit.name + ' updated across the series'); }} />}
    </div>
  );
}

/* ---------- Tab: Scene plan / previews ---------- */
function ScenePlanRow({ s, k, text, onSave }) {
  const [edit, setEdit] = React.useState(false);
  const [draft, setDraft] = React.useState('');
  return (
    <div className="scene-plan-row">
      <div className="scene-plan-row__main">
        <span className="scene-plan-row__number">{String(k + 1).padStart(2, '0')}</span>
        <span className="scene-plan-row__text">{text}</span>
        <span className="scene-plan-row__duration">about {s.sec} sec</span>
        <Button size="sm" variant="ghost" onClick={() => setEdit(!edit)}>{edit ? 'Cancel' : 'Edit'}</Button>
      </div>
      {edit && (
        <div className="scene-plan-row__editor">
          <div className="scene-plan-row__question">How would you like to change it?</div>
          <div className="inline-edit">
            <Input placeholder="서윤이 메시지를 읽고 순간적으로 크게 놀라는 표정" value={draft} onChange={(e) => setDraft(e.target.value)} className="inline-edit__input" />
            <Button variant="secondary" disabled={!draft.trim()} onClick={() => { onSave(draft.trim()); setEdit(false); setDraft(''); }}>Apply change</Button>
          </div>
        </div>
      )}
    </div>
  );
}

function EpisodeCard({ ep, hue, st, setSt, open, onToggle, selecting, selected, onSelect, onGenerate, onOpenScene, recommended }) {
  const scenes = sceneList(ep);
  const ready = !!st.ready[ep.code];
  const gen = st.gen[ep.code];
  const outdatedN = scenes.filter((s) => st.outdated[s.id]).length;
  const status = ready
    ? <StatusBadge size="sm" status="done" label={outdatedN ? 'Previews · ' + outdatedN + ' outdated' : 'Previews ready'} />
    : gen != null
      ? <StatusBadge size="sm" status="generating" label={'Making previews · ' + Math.round(gen * 100) + '%'} />
      : <span className="episode-card__plan-label"><Icon name="text" size={12} />Scene plan</span>;
  return (
    <section className={cx('episode-card', open && 'episode-card--open')}>
      <div onClick={() => (selecting && !ready ? onSelect() : onToggle())} className="episode-card__header is-pressable">
        {selecting && (ready ? <span className="episode-card__check-spacer" /> : <Checkbox checked={selected} onChange={onSelect} />)}
        <span className="episode-card__code">{ep.code}</span>
        <span className="episode-card__title truncate">{ep.title}</span>
        {status}
        <span className="episode-card__meta">{scenes.length} scenes · about {ep.runtime}</span>
        <Icon name={open ? 'chevron-up' : 'chevron-down'} size={16} color="var(--color-text-tertiary)" />
      </div>
      {open && (
        <div className="episode-card__body">
          {ep.summary && <div className="episode-card__summary">{ep.summary}</div>}
          {ready || gen != null ? (
            <div className="scene-preview-grid">
              {scenes.map((s, k) => (
                <button key={s.id} disabled={!ready} onClick={() => onOpenScene(ep, k)} className={cx('scene-preview', ready && 'scene-preview--ready is-liftable', st.outdated[s.id] && 'scene-preview--outdated')} style={{ '--reveal-delay': k * 0.06 + 's' }}>
                  <Frame hue={hue} seed={s.id + 'v' + (st.ver[s.id] || 0)} src={!st.ver[s.id] ? s.image : undefined} radius={9}>
                    {gen != null && <Sheen />}
                    <span className="scene-preview__number">{k + 1}</span>
                    {st.outdated[s.id] && <span className="scene-preview__outdated-dot" />}
                  </Frame>
                </button>
              ))}
            </div>
          ) : (
            <>
              <div>{scenes.map((s, k) => <ScenePlanRow key={s.id} s={s} k={k} text={st.text[s.id] || s.text} onSave={(t) => setSt((x) => ({ ...x, text: { ...x.text, [s.id]: t } }))} />)}</div>
              <div className="episode-card__generate">
                <Button variant={recommended ? 'primary' : 'secondary'} icon="images" onClick={onGenerate}>Make scene previews <CostLabel n={epCost(ep)} /></Button>
                <span className="caption">Images for these {scenes.length} scenes only. Videos aren't made yet.</span>
              </div>
            </>
          )}
          {ready && outdatedN > 0 && <div className="episode-card__outdated-note"><span className="outdated-dot" />Description changed — open the scene to make a new preview.</div>}
        </div>
      )}
    </section>
  );
}

function ScenesTab({ hue, st, setSt, onSpend }) {
  const prod = React.useContext(SF.ProductionContext);
  const eps = prod.episodes;
  const firstReady = eps.find((e) => st.ready[e.code]);
  const firstPlan = eps.find((e) => !st.ready[e.code] && st.gen[e.code] == null);
  const [open, setOpen] = React.useState(() => ({
    ...firstReady && { [firstReady.code]: true },
    ...firstPlan && { [firstPlan.code]: true },
  }));
  const [shown, setShown] = React.useState(6); /* progressive loading for long series */
  const [selecting, setSelecting] = React.useState(false);
  const [sel, setSel] = React.useState({});
  const [scene, setScene] = React.useState(null);
  const pending = eps.filter((e) => !st.ready[e.code] && st.gen[e.code] == null);
  const allCost = pending.reduce((a, e) => a + epCost(e), 0);
  const selEps = eps.filter((e) => sel[e.code]);
  const selCost = selEps.reduce((a, e) => a + epCost(e), 0);
  const readyN = eps.filter((e) => st.ready[e.code]).length;
  const generate = (list) => {
    if (!list.length) return;
    onSpend(list.reduce((a, e) => a + epCost(e), 0));
    setSt((x) => { const g = { ...x.gen }; list.forEach((e) => { g[e.code] = 0; }); return { ...x, gen: g }; });
    setOpen((o) => { const n = { ...o }; list.forEach((e) => { n[e.code] = true; }); return n; });
    setSelecting(false); setSel({});
  };
  return (
    <div>
      <div className="scene-plan-intro">
        <div className="scene-plan-intro__text">
          <div className="scene-plan-intro__title">AI planned all ~{prod.summary.scenes} scenes from your script.</div>
          <div className="scene-plan-intro__desc">Read them as text for free. Make picture previews only for the episodes you want to see — no need to check everything.</div>
        </div>
        <div className="scene-plan-intro__actions">
          {pending.length > 1 && <Button size="sm" variant={selecting ? 'secondary' : 'ghost'} icon="list-checks" onClick={() => { setSelecting(!selecting); setSel({}); }}>{selecting ? 'Cancel' : 'Select episodes'}</Button>}
          {!selecting && pending.length > 1 && <Button size="sm" variant="ghost" onClick={() => generate(pending)}>Preview all <CostLabel n={allCost} /></Button>}
        </div>
      </div>
      {readyN === 0 && firstPlan && !selecting && (
        <div className="preview-recommendation">
          <Icon name="eye" size={18} />
          <div className="preview-recommendation__text">Start by previewing {firstPlan.code}. <span className="preview-recommendation__hint">See how it looks before spending more.</span></div>
          <Button size="sm" variant="primary" onClick={() => generate([firstPlan])}>Preview {firstPlan.code} <CostLabel n={epCost(firstPlan)} /></Button>
        </div>
      )}
      <div className="episode-blocks">
        {eps.slice(0, shown).map((ep) => (
          <EpisodeCard key={ep.code} ep={ep} hue={hue} st={st} setSt={setSt} open={!!open[ep.code]} onToggle={() => setOpen((o) => ({ ...o, [ep.code]: !o[ep.code] }))}
            selecting={selecting} selected={!!sel[ep.code]} onSelect={() => setSel((s) => ({ ...s, [ep.code]: !s[ep.code] }))}
            recommended={readyN > 0 && firstPlan && firstPlan.code === ep.code} onGenerate={() => generate([ep])} onOpenScene={(e, k) => setScene({ ep: e, k })} />
        ))}
      </div>
      {shown < eps.length && <Button variant="ghost" className="episode-blocks__more" iconRight="chevron-down" onClick={() => setShown(shown + 6)}>Show {Math.min(6, eps.length - shown)} more episodes · {eps.length - shown} left</Button>}
      {selecting && (
        <div className="batch-bar">
          <span className="batch-bar__label">{selEps.length ? selEps.length + ' episode' + (selEps.length > 1 ? 's' : '') + ' selected' : 'Pick the episodes to preview'}</span>
          <Button size="sm" variant="ghost" onClick={() => { setSelecting(false); setSel({}); }}>Cancel</Button>
          <Button size="sm" variant="primary" disabled={!selEps.length} onClick={() => generate(selEps)}>Make previews{selEps.length ? <CostLabel n={selCost} /> : null}</Button>
        </div>
      )}
      {scene && <SceneDialog ep={scene.ep} index={scene.k} hue={hue} st={st} setSt={setSt} onSpend={onSpend} onClose={() => setScene(null)} />}
    </div>
  );
}

/* ---------- Tab: Look & mood ---------- */
function LookTab({ hue }) {
  const prod = React.useContext(SF.ProductionContext);
  const [busy, v, run] = useRemake(1800);
  const [open, setOpen] = React.useState(false);
  const [tweak, setTweak] = React.useState(null);
  return (
    <div>
      <div className="look-hero">
        <Frame hue={hue + (tweak === 'Brighter' ? 15 : tweak === 'Darker' ? -10 : 0)} seed={'look' + v} aspect="21/9" radius={0}>{busy && <Sheen />}</Frame>
        <div className="look-hero__scrim" />
        <div className="look-hero__text">
          <div className="look-hero__title">{prod.style.label}{tweak && tweak !== 'Describe it' ? ' · ' + tweak : ''}</div>
          <div className="look-hero__mood">{prod.style.mood}</div>
        </div>
      </div>
      <div className="look-examples">{[0, 1, 2, 3].map((k) => <Frame key={k} hue={hue} seed={'lookex' + k + v} aspect="16/10" radius={10}>{busy && <Sheen />}</Frame>)}</div>
      <div className="look-change">
        {!open ? <Button variant="secondary" icon="palette" onClick={() => setOpen(true)}>Change mood</Button> : (
          <div className="look-change__panel">
            <div className="look-change__question">How should it change?</div>
            <Chips items={['Brighter', 'Darker', 'More realistic', 'More cinematic', 'Describe it']} value={tweak} onPick={(c) => { setTweak(c); if (c !== 'Describe it') run(); }} />
            {tweak === 'Describe it' && <div className="inline-edit"><Input placeholder="새벽 공기처럼 푸르고 차갑게" className="inline-edit__input" /><Button variant="secondary" disabled={busy} onClick={() => run()}>Apply</Button></div>}
            <span className="caption">Characters and scene previews update to match.</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- Right column: cost checkpoint / production status ---------- */
function ProductionSummary({ p, credits, onCreate, go, previewN = 0 }) {
  const prod = React.useContext(SF.ProductionContext);
  const s = prod.summary;
  const st = p.flow.stage;
  if (st === 'producing' || st === 'done') {
    const eps = p.flow.eps; const done = eps.filter((x) => x >= 1).length;
    return (
      <div className="production-summary">
        <StatusBadge status={st === 'done' ? 'done' : 'generating'} label={st === 'done' ? 'Series complete' : 'Making your series'} />
        <div className="production-summary__count">{done}<span className="stat__value-muted"> / {eps.length}</span></div>
        <div className="stat__label">Episodes finished</div>
        <Progress value={eps.reduce((a, b) => a + b, 0) / eps.length} segments={eps.length} height={5} className="production-summary__progress" />
        <Button full variant="primary" iconRight="arrow-right" className="production-summary__cta" onClick={() => go({ name: 'episodes', projectId: p.id })}>Watch episodes</Button>
        <div className="caption production-summary__footnote production-summary__footnote--spaced">Changes here apply to episodes not yet made.</div>
      </div>
    );
  }
  return (
    <div className="production-summary">
      <div className="headline">Ready to create</div>
      <div className="production-summary__checks">
        {['Characters', 'Look & mood', 'Scene plan'].map((t) => <div key={t} className="production-summary__check"><Icon name="check" size={16} color="var(--color-positive)" />{t}</div>)}
        <div className="production-summary__check production-summary__check--optional"><Icon name="images" size={16} color="var(--color-text-tertiary)" />Scene previews<span className="spacer" /><span className="caption">{previewN} of 12 · optional</span></div>
      </div>
      <div className="production-summary__facts"><span>{s.episodes} episodes</span><span>about {s.runtime}</span><span>~{s.scenes} scenes</span></div>
      <div className="caption production-summary__usage-label">Estimated usage · final videos</div>
      <div className="production-summary__usage"><span className="production-summary__credits">{fmtN(s.credits)}</span><span className="production-summary__unit">credits</span></div>
      <div className="caption production-summary__note">May vary with results and remakes. Balance after: {fmtN(credits - s.credits)}</div>
      <Button full variant="primary" size="lg" className="production-summary__cta" onClick={() => onCreate(p.id)}>Create series</Button>
      <div className="caption production-summary__footnote">This starts making the videos.</div>
    </div>
  );
}

/* ---------- Screen ---------- */
function ProductionReady({ p, go, credits, onCreate, toast, onSpend = () => {} }) {
  const prod = React.useContext(SF.ProductionContext);
  const [tab, setTab] = React.useState(p.status === 'storyboard' ? 'scenes' : 'characters');
  const [st, setSt] = usePreviewStore(p.id, () => ({ ready: { ...p.previewReady }, gen: {}, text: {}, lines: {}, outdated: {}, ver: {} }));
  const generating = Object.keys(st.gen).length > 0;
  React.useEffect(() => {
    if (!generating) return;
    const id = setInterval(() => setSt((x) => { const g = { ...x.gen }; const r = { ...x.ready }; Object.keys(g).forEach((k) => { g[k] += 0.07; if (g[k] >= 1) { delete g[k]; r[k] = 1; } }); return { ...x, gen: g, ready: r }; }), 200);
    return () => clearInterval(id);
  }, [generating]);
  const previewN = Object.keys(st.ready).length;
  const [picks, setPicks] = React.useState({});
  const s = prod.summary;
  const hue = p.hue || 165;
  const fresh = p.flow.stage === 'ready';
  return (
    <Page variant="wide">
      <Kicker>{p.title} · Production</Kicker>
      <div className="display-title production-title">{fresh ? 'Your series is ready to make.' : 'Characters, look & scenes'}</div>
      <div className="lead-text production-lead">{fresh ? 'AI planned the characters, look and every scene from your script. Change only what you want, preview what you\u2019d like to see, then create.' : 'Everything AI prepared for this series. Change anything — it applies to episodes still to come.'}</div>
      <div className="production-stats">
        {[[s.episodes, 'Episodes'], [s.characters, 'Main characters'], [s.locations, 'Places'], ['~' + s.scenes, 'Scenes']].map(([n, l]) => <div key={l}><div className="stat__value">{n}</div><div className="stat__label">{l}</div></div>)}
      </div>
      <div className="production-layout">
        <div>
          <Tabs value={tab} onChange={setTab} className="production-tabs" items={[{ value: 'characters', label: 'Characters', count: s.characters }, { value: 'scenes', label: previewN ? 'Scene previews' : 'Scene plan', count: '~' + s.scenes }, { value: 'look', label: 'Look & mood' }]} />
          {tab === 'characters' && <CharactersTab hue={hue} picks={picks} setPicks={setPicks} toast={toast} />}
          {tab === 'scenes' && <ScenesTab hue={hue} st={st} setSt={setSt} onSpend={onSpend} />}
          {tab === 'look' && <LookTab hue={hue} />}
        </div>
        <aside className="production-aside"><ProductionSummary p={p} credits={credits} onCreate={onCreate} go={go} previewN={previewN} /></aside>
      </div>
    </Page>
  );
}

Object.assign(window, { ProductionReady, sceneList });
})();
