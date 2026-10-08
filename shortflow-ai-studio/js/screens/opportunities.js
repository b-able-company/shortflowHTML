/* ==========================================================================
   Opportunities list, Opportunity detail, Projects list
   Styles: css/opportunities.css (+ home.css for shared opportunity/project tiles)
   ========================================================================== */
(() => {
const { cx, Button, Icon, Frame, Tag, Tabs, Checkbox } = window.UI;

function OpportunityDetail({ o, go, onStartFromOpp, projects }) {
  const linked = projects.find((p) => p.opportunity === o.id);
  const timeline = [['Now – ' + o.deadline.replace(', 2026', ''), 'Submissions', true], ['+2 weeks', 'Shortflow review'], ['+4 weeks', 'Selection & contract'], ['Q1 2027', 'Release']];
  const D = SF.opportunityDetail;
  const looking = D.lookingFor[o.id] || D.lookingFor.default;
  return (
    <div className="opportunity-detail">
      <div className="opportunity-hero">
        <Frame hue={o.hue} seed={o.id} src={o.image} aspect="auto" radius={0} />
        <div className="opportunity-hero__scrim" />
        <div className="opportunity-hero__content">
          <button onClick={() => go({ name: 'opportunities' })} className="back-link"><Icon name="arrow-left" size={15} />Opportunities</button>
          <div className="spacer" />
          <div className="opportunity-hero__tags"><Tag variant="media">{o.kind}</Tag></div>
          <div className="opportunity-hero__title">{o.title}</div>
          <div className="lead-text opportunity-hero__summary">{o.summary}</div>
        </div>
      </div>
      <div className="opportunity-body">
        <div>
          <section className="opportunity-section">
            <div className="section-title">What we're looking for</div>
            <ul className="looking-for">{looking.map((l) => <li key={l} className="looking-for__item"><span className="looking-for__bullet" />{l}</li>)}</ul>
          </section>
          <section className="opportunity-section">
            <div className="section-title">Timeline</div>
            <div className="opportunity-timeline">
              {timeline.map(([d, t, now], i) => (
                <div key={i} className={cx('opportunity-timeline__step', now && 'opportunity-timeline__step--now')}>
                  <div className="opportunity-timeline__bar" /><div className="opportunity-timeline__label">{t}</div><div className="opportunity-timeline__date">{d}</div>
                </div>
              ))}
            </div>
          </section>
          <section className="opportunity-section">
            <div className="section-title">What you get</div>
            <div className="benefit-grid">{D.benefits.map(([t, d]) => <div key={t}><div className="benefit__title">{t}</div><div className="benefit__desc">{d}</div></div>)}</div>
          </section>
          <section className="opportunity-section">
            <div className="section-title">Submission requirements</div>
            <div className="requirement-list">{D.requirements.map((r, i) => <Checkbox key={r} checked={i < 1} label={r} />)}</div>
          </section>
        </div>
        <aside className="opportunity-aside">
          <div className="opportunity-card">
            <div className="opportunity-card__deadline-row">
              <span className={cx('opportunity-card__dday', o.dday.startsWith('D-') && 'opportunity-card__dday--soon')}>{o.dday}</span>
              <span className="caption">Closes {o.deadline}</span>
            </div>
            <div className="opportunity-facts">{o.facts.map(([k, v]) => <div key={k} className="opportunity-fact"><span className="opportunity-fact__key">{k}</span><span className="opportunity-fact__value">{v}</span></div>)}</div>
            {linked ? (
              <>
                <Button full variant="primary" size="lg" iconRight="arrow-right" className="opportunity-card__cta" onClick={() => go({ name: 'overview', projectId: linked.id })}>Open {linked.title}</Button>
                <div className="caption opportunity-card__linked-note">Your project is linked to this opportunity.</div>
              </>
            ) : (
              <>
                <Button full variant="accent" size="lg" className="opportunity-card__cta" onClick={() => onStartFromOpp(o)}>Start a project with this</Button>
                <Button full variant="ghost" className="opportunity-card__secondary">Link an existing project</Button>
              </>
            )}
            <div className="opportunity-card__footnote"><Icon name="send" size={14} /><span>Make it in Studio, then submit from the same project. No exporting, no uploading twice.</span></div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function OpportunityTile({ o, go }) {
  return (
    <button className="opportunity-tile is-liftable" onClick={() => go({ name: 'opportunity', oppId: o.id })}>
      <Frame hue={o.hue} seed={o.id} src={o.image || o.thumbnail} aspect="34/21" radius={14} />
      <Kicker>{o.kind}</Kicker>
      <div className="opportunity-tile__title">{o.title}</div>
      <div className="opportunity-tile__meta">
        <span>{o.short}</span>
        <span className={cx('opportunity-row__deadline', o.dday.startsWith('D-') && 'opportunity-row__deadline--soon')}>{o.dday}</span>
      </div>
    </button>
  );
}

function Opportunities({ go }) {
  const [tab, setTab] = React.useState('all');
  const kinds = { orig: 'Shortflow Original', plat: 'Global Platform Request', chal: 'AI Short Drama Challenge', open: 'Open Call' };
  const list = SF.opportunities.filter((o) => tab === 'all' || o.kind === kinds[tab]);
  return (
    <Page className="opportunities-page">
      <Kicker>Opportunities</Kicker>
      <div className="page-title list-header__title">Find your next production</div>
      <div className="body-text list-header__sub">Originals, platform requests and open calls — each one can become a Studio project.</div>
      <Tabs className="list-tabs" value={tab} onChange={setTab} items={[{ value: 'all', label: 'All', count: SF.opportunities.length }, { value: 'orig', label: 'Originals' }, { value: 'plat', label: 'Platform requests' }, { value: 'chal', label: 'Challenges' }, { value: 'open', label: 'Open calls' }]} />
      {list[0] && <div className="opportunity-list__feature"><OppFeature o={list[0]} go={go} /></div>}
      {list.length > 1 && <div className="opportunity-list__rows">{list.slice(1).map((o) => <OpportunityTile key={o.id} o={o} go={go} />)}</div>}
    </Page>
  );
}

function Projects({ projects, go, onStart }) {
  const [tab, setTab] = React.useState('all');
  const inDist = (p) => ['ready', 'review', 'live'].includes(p.status);
  const list = projects.filter((p) => tab === 'all' || (tab === 'prod' ? !inDist(p) : inDist(p)));
  return (
    <Page>
      <div className="list-header--with-action">
        <div><Kicker>Projects</Kicker><div className="page-title list-header__title">All projects</div></div>
        <Button variant="primary" icon="plus" onClick={() => onStart('idea')}>New project</Button>
      </div>
      <Tabs className="list-tabs" value={tab} onChange={setTab} items={[{ value: 'all', label: 'All', count: projects.length }, { value: 'prod', label: 'In production' }, { value: 'dist', label: 'In distribution' }]} />
      <div className="project-grid project-grid--wide">{list.map((p) => <ProjectTile key={p.id} p={p} go={go} />)}</div>
    </Page>
  );
}

Object.assign(window, { OpportunityDetail, Opportunities, Projects });
})();
