/* ==========================================================================
   Studio Home   ·   Styles: css/home.css
   ========================================================================== */
(() => {
const { cx, Button, Icon, Frame, Poster, Tag, StatusBadge, Input, Sheen } = window.UI;
const { BorderBeam } = window;

function ContinueHero({ p, go }) {
  const eps = p.flow.eps; const done = eps.filter((v) => v >= 1).length; const cur = eps.findIndex((v) => v < 1);
  const curEp = cur >= 0 ? SF.prod.episodes[cur % SF.prod.episodes.length] : null;
  const open = () => go({ name: 'episodes', projectId: p.id });
  const scenes = curEp ? window.sceneList(curEp) : [];
  const n = Math.max(scenes.length, 1); const v = cur >= 0 ? eps[cur] : 1;
  const si = Math.min(n - 1, Math.floor(v * n)); const scene = scenes[si];
  const dev = curEp ? Math.min(1, v * n - si) : 1;
  return (
    <section className="continue-hero" style={{ '--project-hue': p.hue }}>
      <div className="continue-hero__glow" />
      <div className="continue-hero__content">
        <Kicker>Continue creating</Kicker>
        <div className="display-title continue-hero__title">{p.title}</div>
        <div className="continue-hero__now">
          <StatusBadge status={curEp ? 'generating' : 'done'} label="" />
          {curEp ? <>Making {curEp.code}<span className="continue-hero__pct">{Math.round(eps[cur] * 100)}%</span></> : 'All episodes ready'}
        </div>
        <div className="continue-hero__push" />
        <div className="continue-hero__eps" aria-label={done + ' of ' + eps.length + ' episodes ready'}>
          {eps.map((v, i) => <span key={i} className={cx('continue-hero__seg', v >= 1 && 'is-done', i === cur && 'is-current')} style={{ '--fill': Math.round(Math.min(v, 1) * 100) + '%' }} />)}
        </div>
        <div className="continue-hero__count"><span className="text-primary">{done}</span> of {eps.length} episodes ready</div>
        <div className="continue-hero__actions">
          <Button variant="primary" size="lg" iconRight="arrow-right" onClick={open}>Continue</Button>
        </div>
      </div>
      <button className={cx('unstyled-button continue-hero__visual is-liftable', curEp && 'is-making')} onClick={open} aria-label={'Open ' + (curEp ? curEp.code : p.title)}>
        <div className="continue-hero__frame">
          <div className="continue-hero__dev" style={{ '--dev': dev }}><Frame hue={p.hue} seed={p.id + (scene ? scene.id : 'final')} radius={0} /></div>
          {curEp && <div className="continue-hero__aurora" />}
          {curEp && <div className="continue-hero__visual-tag"><Tag variant="media">{curEp.code}</Tag></div>}
        </div>
      </button>
    </section>
  );
}

function StartRow({ onStart }) {
  return (
    <section className="start-section">
      <SectionHead title="Start something new" sub="Begin wherever you are — a script is not required." />
      <div className="start-grid">
        {SF.startOptions.map((s) => (
          <button key={s.key} onClick={() => onStart(s.key)} className="unstyled-button start-option is-pressable">
            <span className={cx('start-option__icon', s.accent && 'start-option__icon--accent')}><Icon name={s.icon} size={18} /></span>
            <div><div className="start-option__title">{s.title}</div><div className="start-option__desc">{s.desc}</div></div>
          </button>
        ))}
      </div>
    </section>
  );
}

function OppFeature({ o, go }) {
  return (
    <button onClick={() => go({ name: 'opportunity', oppId: o.id })} className="opportunity-feature is-liftable">
      <Frame hue={o.hue} seed={o.id} src={o.image} aspect="16/7" radius={0} />
      <div className="opportunity-feature__scrim" />
      <div className="opportunity-feature__content">
        <div className="opportunity-feature__tags"><Tag variant="media">{o.kind}</Tag><Tag variant="deadline">{o.dday}</Tag></div>
        <div className="opportunity-feature__text">
          <div className="opportunity-feature__title">{o.title}</div>
          <div className="opportunity-feature__summary">{o.summary}</div>
          <div className="opportunity-feature__link">View opportunity <Icon name="arrow-right" size={15} /></div>
        </div>
      </div>
    </button>
  );
}

function OppRow({ o, go }) {
  return (
    <button onClick={() => go({ name: 'opportunity', oppId: o.id })} className="unstyled-button opportunity-row is-pressable">
      <div className="opportunity-row__art"><Frame hue={o.hue} seed={o.id} src={o.thumbnail || o.image} aspect="1/1" radius={10} /></div>
      <div className="opportunity-row__text">
        <Kicker>{o.kind}</Kicker>
        <div className="opportunity-row__title">{o.title}</div>
        <div className="opportunity-row__meta">{o.short}</div>
      </div>
      <span className={cx('opportunity-row__deadline', o.dday.startsWith('D-') && 'opportunity-row__deadline--soon')}>{o.dday}</span>
    </button>
  );
}

function DistributionPanel({ projects, go, onSubmit }) {
  const featured = projects.find((p) => p.id === 'office') || projects.find((p) => ['ready', 'review', 'live'].includes(p.status));
  const inFlow = projects.filter((p) => p.id !== featured?.id && ['ready', 'review', 'live'].includes(p.status)).sort((a, b) => Number(a.status !== 'review') - Number(b.status !== 'review'));
  if (!featured) return null;
  return (
    <section className="home-distribution">
      <SectionHead title="Distribution" sub="Finished work goes to market from here." />
      <div className="distribution-panel">
        <div className="distribution-panel__head">
          <Poster title={featured.title} src={featured.poster} hue={featured.hue} width={84} radius={8} showTitle={false} />
          <div className="distribution-panel__info">
            {featured.status === 'ready' ? <Tag variant="media">Production complete</Tag> : <StatusBadge status={featured.status} label={featured.status === 'review' ? 'In review' : 'Live'} />}
            <div className="distribution-panel__title">{featured.title}</div>
            <div className="distribution-panel__meta">{featured.episodes} episodes · {featured.format}</div>
          </div>
        </div>
        <div className="distribution-panel__action">
          {featured.submitted
            ? <Button full variant="secondary" iconRight="arrow-right" onClick={() => go({ name: 'distribution' })}>View distribution</Button>
            : <Button full variant="accent" icon="send" onClick={() => onSubmit(featured)}>Submit to Shortflow</Button>}
        </div>
      </div>
      <div className="distribution-list">
        {inFlow.map((p) => (
          <button key={p.id} onClick={() => go({ name: 'distribution' })} className="unstyled-button distribution-list__row is-pressable">
            <Poster title={p.title} hue={p.hue} width={26} radius={4} />
            <div className="distribution-list__title">{p.title}</div>
            <StatusBadge size="sm" status={p.status} label={p.status === 'ready' ? 'Ready to submit' : p.status === 'review' ? 'In review' : 'Live'} />
          </button>
        ))}
      </div>
    </section>
  );
}

function ProjectTile({ p, go }) {
  return (
    <button onClick={() => go({ name: 'overview', projectId: p.id })} className="project-tile is-liftable">
      <Poster title={p.title} subtitle={p.format} hue={p.hue} seed={p.id} />
      <div className="project-tile__title truncate">{p.title}</div>
      <div className={cx('project-tile__stage truncate', p.status === 'ready' && 'project-tile__stage--ready')}>{SF.statusLabel[p.status]}</div>
      <div className="project-tile__edited">Edited {p.edited}</div>
    </button>
  );
}

function Home({ projects, go, onStart, onSubmit }) {
  const current = projects.find((p) => p.id === 'nightstore');
  const opps = SF.opportunities;
  return (
    <Page>
      <header className="home-header">
        <div><Kicker>Thursday, October 8</Kicker><div className="page-title home-header__title">Good evening, {SF.user.name}</div></div>
        <div className="home-header__actions">
          <Input icon="search" placeholder="Search projects and opportunities" className="home-search" />
          <BorderBeam size="md" colorVariant="colorful" strength={0.7} theme="dark" className="home-new-project-beam">
            <Button variant="secondary" icon="plus" onClick={() => onStart('idea')}>New project</Button>
          </BorderBeam>
        </div>
      </header>
      <ContinueHero p={current} go={go} />
      <StartRow onStart={onStart} />
      <div className="home-split">
        <section>
          <SectionHead title="Opportunities" sub="Open calls from Shortflow and partner platforms." action={<Button variant="ghost" size="sm" iconRight="arrow-right" onClick={() => go({ name: 'opportunities' })}>See all</Button>} />
          <OppFeature o={opps[0]} go={go} />
          <div className="opportunity-pair">{opps.slice(1, 3).map((o) => <OppRow key={o.id} o={o} go={go} />)}</div>
        </section>
        <DistributionPanel projects={projects} go={go} onSubmit={onSubmit} />
      </div>
      <section className="recent-projects">
        <SectionHead title="Recent projects" action={<Button variant="ghost" size="sm" iconRight="arrow-right" onClick={() => go({ name: 'projects' })}>All projects</Button>} />
        <div className="project-grid">{projects.slice(0, 6).map((p) => <ProjectTile key={p.id} p={p} go={go} />)}</div>
      </section>
    </Page>
  );
}

Object.assign(window, { Home, OppRow, OppFeature, ProjectTile });
})();
