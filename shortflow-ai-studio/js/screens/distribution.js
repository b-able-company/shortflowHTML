/* ==========================================================================
   Distribution — studio-wide list + per-project "Distribution" tab
   Styles: css/distribution.css
   ========================================================================== */
(() => {
const { cx, Button, Icon, Poster, StatusBadge, Input } = window.UI;

function Distribution({ projects, onSubmit }) {
  const reached = (p) => (p.status === 'live' ? 4 : p.status === 'review' || p.submitted ? 2 : 0);
  const rows = projects.filter((p) => ['ready', 'review', 'live'].includes(p.status) || p.submitted)
    .sort((a, b) => reached(a) - reached(b));
  return (
    <Page>
      <Kicker accent>Distribution</Kicker>
      <div className="page-title list-header__title">From Studio to market</div>
      <div className="body-text list-header__sub">Everything you've finished, and where it is now.</div>
      <div className="distribution-rows">
        {rows.map((p) => (
          <div key={p.id} className="distribution-row">
            <Poster title={p.title} hue={p.hue} width={56} radius={6} />
            <div><div className="distribution-row__title">{p.title}</div><div className="caption distribution-row__meta">{p.episodes} episodes · {p.format}</div></div>
            <div className="distribution-row__steps">
              {SF.distributionSteps.map((s, i) => <div key={s} className={cx('distribution-step', i < reached(p) && 'distribution-step--reached', i < reached(p) && i === 3 && 'distribution-step--live')}><div className="distribution-step__bar" /><div className="distribution-step__label">{s}</div></div>)}
            </div>
            <div className="distribution-row__action">
              {reached(p) === 0
                ? <Button variant="accent" size="sm" icon="send" onClick={() => onSubmit(p)}>Submit to Shortflow</Button>
                : <StatusBadge status={p.status === 'live' ? 'live' : 'review'} label={p.status === 'live' ? 'Live · Shortflow, 1 partner' : 'In review · day 2 of 5'} />}
            </div>
          </div>
        ))}
      </div>
    </Page>
  );
}

function ProjectDistribution({ p, onSubmit }) {
  const [note, setNote] = React.useState(p.distributionNote || '');
  const done = ['ready', 'review', 'live'].includes(p.status);
  const checks = [
    ['Episodes', done ? p.episodes + ' episodes ready' : 'Still in production', done],
    ['Title & synopsis', 'Korean · English', true],
    ['Poster & thumbnails', done ? 'Ready' : 'In preparation', done],
    ['Rights & credits', 'Confirmed', true],
  ];
  const steps = [
    ['eye', 'Review', 'We check the series'],
    ['shuffle', 'Match', 'Find the right platforms'],
    ['send', 'Distribute', 'Take it to market'],
  ];
  return (
    <Page variant="narrow">
      <div className="distribution-detail">
        <Kicker accent>Distribution</Kicker>
        <header className="distribution-detail__header">
          <Poster title={p.title} hue={p.hue} seed={p.id} width={96} radius={10} showTitle={false} />
          <div>
            <h1 className="page-title distribution-detail__title">{p.title}</h1>
            <div className="distribution-detail__meta">
              <span>{p.episodes || '—'} episodes</span><span>{p.format}</span><span>KR · EN</span>
              {p.production && <span>{p.production.summary.runtime}</span>}
            </div>
          </div>
        </header>
        <section className="distribution-package" aria-label="Distribution package">
          <h2 className="distribution-detail__label">Distribution package</h2>
          <div className="readiness-list">
            {checks.map(([title, detail, ok]) => (
              <div key={title} className="readiness-item">
                <Icon name={ok ? 'circle-check' : 'circle-dashed'} size={18} color={ok ? 'var(--color-positive)' : 'var(--color-text-tertiary)'} />
                <span className="readiness-item__label">{title}</span>
                <span className="caption">{detail}</span>
              </div>
            ))}
          </div>
        </section>
        <section className="distribution-handoff" aria-label="Distribution process">
          <h2 className="distribution-detail__label">Shortflow handles the rest</h2>
          <div className="distribution-handoff__steps">
            {steps.map(([icon, title, detail], i) => (
              <div className="distribution-handoff__step" key={title}>
                <div className="distribution-handoff__top">
                  <span className="distribution-handoff__icon"><Icon name={icon} size={18} /></span>
                  {i < steps.length - 1 && <Icon name="chevron-right" size={16} color="var(--color-text-tertiary)" />}
                </div>
                <div className="distribution-handoff__title">{title}</div>
                <div className="caption">{detail}</div>
              </div>
            ))}
          </div>
        </section>
        <div className="distribution-detail__note">
          <Input label="Anything Shortflow should know? (optional)" placeholder="e.g. Please exclude Japan."
            value={note} onChange={(e) => setNote(e.target.value)} disabled={p.submitted} />
        </div>
        <div className="distribution-submit">
          <Button variant="accent" size="lg" icon="send" disabled={!done || p.submitted} onClick={() => onSubmit(p, note.trim())}>
            {p.status === 'live' ? 'Live on Shortflow' : p.submitted ? 'Submitted to Shortflow' : 'Hand off to Shortflow'}
          </Button>
          {!done && <span className="caption">Available when all episodes are complete.</span>}
        </div>
      </div>
    </Page>
  );
}

Object.assign(window, { Distribution, ProjectDistribution });
})();
