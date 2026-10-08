/* ==========================================================================
   Project Overview   ·   Styles: css/project.css
   ========================================================================== */
(() => {
const { cx, Button, IconButton, Icon, Poster, Tag, StagePipeline, Progress } = window.UI;

const DEFAULT_STAGES = [
  { key: 'script', label: 'Script', detail: 'Upload to start', state: 'todo' },
  { key: 'production', label: 'Production ready', detail: 'AI prepares it', state: 'todo' },
  { key: 'series', label: 'Series', detail: 'Not started', state: 'todo' },
  { key: 'distribution', label: 'Distribution', detail: 'After production', state: 'todo' },
];
const ROUTE_OF = { script: 'production', storyboard: 'production', production: 'production', video: 'episodes', series: 'episodes', distribution: 'pdist' };

/* Derive the 4-stage pipeline from the project's production flow state */
function stagesOf(p) {
  if (!p.flow) return p.stages || DEFAULT_STAGES;
  const st = p.flow.stage; const eps = p.flow.eps || []; const done = eps.filter((v) => v >= 1).length;
  const after = (s) => ['ready', 'producing', 'done'].includes(s);
  return [
    { key: 'script', label: 'Script', detail: st === 'upload' ? 'Upload to start' : 'Uploaded · 12 episodes', state: st === 'upload' ? 'active' : 'done', value: 0 },
    { key: 'production', label: 'Production ready', detail: st === 'preparing' ? 'AI is preparing…' : after(st) ? (p.previewReady && Object.keys(p.previewReady).length ? '4 characters · 36 previews ready' : '4 characters · 36 scenes planned') : 'AI prepares it', state: after(st) ? 'done' : st === 'preparing' ? 'active' : 'todo', value: 0.5 },
    { key: 'series', label: 'Series', detail: st === 'producing' ? done + ' of ' + eps.length + ' episodes' : st === 'done' ? 'All episodes ready' : 'Not started', state: st === 'done' ? 'done' : st === 'producing' ? 'active' : 'todo', value: eps.length ? eps.reduce((a, b) => a + b, 0) / eps.length : 0 },
    { key: 'distribution', label: 'Distribution', detail: p.status === 'live' ? 'Live · 2 platforms' : st === 'done' ? 'Ready to submit' : 'After production', state: p.status === 'live' ? 'done' : st === 'done' ? 'active' : 'todo', value: 0.05 },
  ];
}

function ProjectHeader({ p, actions }) {
  const opp = p.opportunity && SF.opportunities.find((o) => o.id === p.opportunity);
  return (
    <header className="project-header">
      <Poster title={p.title} subtitle={p.format} hue={p.hue} seed={p.id} width={112} />
      <div className="project-header__info">
        <div className="display-title project-header__title">{p.title}</div>
        <div className="project-header__meta">
          <span>{p.format}</span>
          <span className="project-header__format">{p.episodes ? p.episodes + ' episodes' : 'Episodes TBD'} · Vertical 9:16</span>
          <span>From {p.source || 'Idea'}</span>
          {opp && <span className="project-header__link"><Icon name="link-2" size={14} color="var(--color-accent)" /><span className="text-primary">{opp.kind}</span><span className="project-header__link-title">{opp.title} · <span className="text-accent">{opp.dday}</span></span></span>}
        </div>
        {p.logline && <div className="project-logline">{p.logline}</div>}
      </div>
      <div className="project-header__actions">{actions}</div>
    </header>
  );
}

function EpisodeList({ go, p }) {
  const prod = React.useContext(SF.ProductionContext);
  const eps = p.flow.eps;
  return (
    <section>
      <SectionHead title="Episodes" sub={eps.filter((v) => v >= 1).length + ' of ' + eps.length + ' ready to watch'} action={<Button variant="ghost" size="sm" iconRight="arrow-right" onClick={() => go({ name: 'episodes', projectId: p.id })}>All episodes</Button>} />
      <div className="episode-list">
        {prod.episodes.slice(0, 6).map((e, k) => {
          const v = eps[k] || 0;
          return (
            <button key={e.code} onClick={() => go({ name: 'episodes', projectId: p.id })} className="unstyled-button episode-row is-pressable">
              <span className="episode-row__code">{e.code}</span>
              <span className={cx('episode-row__title', v > 0 && 'episode-row__title--started')}>{e.title}</span>
              <Progress value={v} height={4} tone={v >= 1 ? 'positive' : undefined} />
              <span className={cx('episode-row__status', v > 0 && v < 1 && 'episode-row__status--making')}>{v >= 1 ? 'Ready to watch' : v > 0 ? 'Making · ' + Math.round(v * 100) + '%' : 'Queued'}</span>
            </button>
          );
        })}
        <div className="episode-list__more"><span className="mono">EP.07+</span><span>6 more episodes queued. You can still change their scenes.</span></div>
      </div>
    </section>
  );
}

function DistributionPath({ p, go }) {
  const steps = [
    { label: 'Production', note: p.flow && p.flow.stage === 'done' ? 'Complete' : p.flow ? p.flow.eps.filter((v) => v >= 1).length + ' of ' + p.flow.eps.length + ' episodes ready' : 'In progress', active: true },
    { label: 'Shortflow review', note: 'Review after production' },
    { label: 'Distribution', note: 'Global platform distribution' },
    { label: 'Release', note: 'Managed through Shortflow' },
  ];
  return (
    <section className="distribution-path">
      <Kicker accent>Where this is going</Kicker>
      <div className="distribution-path__title">Submit to Shortflow Original</div>
      <div className="distribution-path__meta">Linked opportunity · closes Oct 20</div>
      <div className="distribution-path__steps">
        {steps.map((s, i) => (
          <div key={i} className={cx('path-step', s.active && 'path-step--active')}>
            <div className="path-step__rail"><span className="path-step__dot" />{i < steps.length - 1 && <span className="path-step__line" />}</div>
            <div className="path-step__text"><div className="path-step__label">{s.label}</div><div className="path-step__note">{s.note}</div></div>
          </div>
        ))}
      </div>
      <Button full variant="secondary" icon="send" className="distribution-path__action" onClick={() => go({ name: 'pdist', projectId: p.id })}>Distribution plan</Button>
    </section>
  );
}

function Activity({ p }) {
  return (
    <section className="activity">
      <div className="headline activity__title">Recent activity</div>
      {(p.activity || SF.activity).map((r, i) => <div key={i} className="activity__row"><span className="activity__what">{r[0]}</span><span className="activity__who">{r[1]} · {r[2]}</span></div>)}
    </section>
  );
}

function FreshStart({ p, go }) {
  return (
    <section className="fresh-start">
      <button onClick={() => go({ name: 'upload', projectId: p.id })} className="unstyled-button fresh-start__card is-pressable">
        <span className="fresh-start__icon"><Icon name="file-up" size={24} /></span>
        <div className="fresh-start__text">
          <div className="section-title">Start with your script</div>
          <div className="fresh-start__desc">Upload it and AI prepares the characters, look and scenes. You only change what you want.</div>
        </div>
        <Icon name="arrow-right" size={20} color="var(--color-text-secondary)" />
      </button>
    </section>
  );
}

function Overview({ p, go }) {
  const rich = !!p.logline;
  const st = p.flow && p.flow.stage;
  const primary = st === 'producing' || st === 'done'
    ? <Button variant="primary" iconRight="arrow-right" onClick={() => go({ name: 'episodes', projectId: p.id })}>Watch episodes</Button>
    : st === 'ready'
      ? <Button variant="primary" iconRight="arrow-right" onClick={() => go({ name: 'production', projectId: p.id })}>Review & create</Button>
      : <Button variant="primary" iconRight="arrow-right" onClick={() => go({ name: 'upload', projectId: p.id })}>Upload script</Button>;
  return (
    <Page>
      <section className="project-summary">
        <ProjectHeader p={p} actions={<><IconButton icon="share" label="Share" variant="secondary" size="lg" />{primary}</>} />
        <section className="production-overview" aria-label="Production">
          <StagePipeline stages={stagesOf(p)} onSelect={(s) => go({ name: ROUTE_OF[s.key], projectId: p.id })} />
        </section>
      </section>
      {rich || (st && st !== 'upload') ? (
        <div className="project-columns">
          {p.flow && p.flow.eps.length
            ? <EpisodeList go={go} p={p} />
            : <section><SectionHead title="Episodes" sub="Made after you create the series" /><Button variant="secondary" iconRight="arrow-right" onClick={() => go({ name: 'production', projectId: p.id })}>Review production</Button></section>}
          <div><DistributionPath p={p} go={go} /><Activity p={p} /></div>
        </div>
      ) : <FreshStart p={p} go={go} />}
    </Page>
  );
}

Object.assign(window, { Overview });
})();
