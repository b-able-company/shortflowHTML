/* ==========================================================================
   Sidebar + shared layout helpers (Page, Kicker, SectionHead)
   Styles: css/sidebar.css, css/base.css
   ========================================================================== */
(() => {
const { cx, Icon, NavItem, Menu, Poster } = window.UI;

function Page({ children, variant, className }) { return <div className={cx('page', variant && 'page--' + variant, className)}>{children}</div>; }
function Kicker({ children, accent, className }) { return <div className={cx('kicker', accent && 'kicker--accent', className)}>{children}</div>; }
function SectionHead({ title, sub, action, className }) {
  return (
    <div className={cx('section-head', className)}>
      <div><div className="section-title">{title}</div>{sub && <div className="section-head__sub">{sub}</div>}</div>
      {action}
    </div>
  );
}
function Wordmark() { return <div className="wordmark">Shortflow<span className="wordmark__product">Studio</span></div>; }

function ProjectSwitcher({ project, projects, go }) {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener('click', close);
    return () => window.removeEventListener('click', close);
  }, [open]);
  const others = projects.filter((p) => p.id !== project.id).slice(0, 3);
  const pick = (r) => { setOpen(false); go(r); };
  return (
    <div className="project-switcher" onClick={(e) => e.stopPropagation()}>
      <button onClick={() => setOpen(!open)} className={cx('unstyled-button project-switcher__button is-pressable', open && 'project-switcher__button--open')}>
        <Poster title={project.title} hue={project.hue} width={30} radius={4} />
        <div className="project-switcher__text">
          <div className="project-switcher__label">PROJECT</div>
          <div className="project-switcher__title truncate">{project.title}</div>
          <div className="project-switcher__format truncate">{project.format}</div>
        </div>
        <Icon name="chevrons-up-down" size={15} color="var(--color-text-tertiary)" />
      </button>
      {open && (
        <div className="project-switcher__menu">
          <Menu sections={[
            { label: 'Switch project', items: [project, ...others].map((p) => ({ label: p.title, meta: p.format, checked: p.id === project.id, leading: <Poster title={p.title} hue={p.hue} width={22} radius={3} />, onClick: () => pick({ name: 'overview', projectId: p.id }) })) },
            { items: [
              { icon: 'layout-grid', label: 'All projects', onClick: () => pick({ name: 'projects' }) },
              { icon: 'plus', label: 'New project', shortcut: '⌘N', onClick: () => { setOpen(false); go({ name: 'home' }, { dialog: 'new' }); } },
            ] },
          ]} />
        </div>
      )}
    </div>
  );
}

const PROJECT_ROUTES = ['overview', 'upload', 'preparing', 'production', 'episodes', 'pdist'];

function Sidebar({ route, projects, go, credits }) {
  const project = route.projectId && projects.find((p) => p.id === route.projectId);
  const inProject = !!project && PROJECT_ROUTES.includes(route.name);
  const n = route.name;
  const studioNav = [
    { key: 'home', icon: 'house', label: 'Home' },
    { key: 'projects', icon: 'folder-open', label: 'Projects' },
    { key: 'opportunities', icon: 'compass', label: 'Opportunities', trailing: inProject ? null : <span className="sidebar__new-badge">3 new</span>, match: ['opportunity'] },
    { key: 'distribution', icon: 'send', label: 'Distribution' },
  ];
  const projectNav = [
    { key: 'overview', icon: 'layout-dashboard', label: 'Overview' },
    { key: 'production', icon: 'layers', label: 'Production', match: ['upload', 'preparing'] },
    { key: 'episodes', icon: 'clapperboard', label: 'Episodes' },
    { key: 'pdist', icon: 'send', label: 'Distribution' },
  ];
  const projectTarget = (key) => (key === 'production' && project.flow && ['upload', 'preparing'].includes(project.flow.stage) ? project.flow.stage : key);
  return (
    <aside className="sidebar">
      <div className="sidebar__brand" onClick={() => go({ name: 'home' })}><Wordmark /></div>
      {inProject ? (
        <>
          <ProjectSwitcher project={project} projects={projects} go={go} />
          <nav className="sidebar__nav sidebar__nav--project">
            {projectNav.map((it) => <NavItem key={it.key} icon={it.icon} label={it.label} active={n === it.key || (it.match || []).includes(n)} onClick={() => go({ name: projectTarget(it.key), projectId: project.id })} />)}
          </nav>
          <Kicker className="sidebar__group-label">Studio</Kicker>
          <nav className="sidebar__nav sidebar__nav--quiet">
            {studioNav.map((it) => <NavItem key={it.key} quiet icon={it.icon} label={it.label} onClick={() => go({ name: it.key })} />)}
          </nav>
        </>
      ) : (
        <nav className="sidebar__nav">
          {studioNav.map((it) => <NavItem key={it.key} icon={it.icon} label={it.label} trailing={it.trailing} active={n === it.key || (it.match || []).includes(n)} onClick={() => go({ name: it.key })} />)}
        </nav>
      )}
      <div className="spacer" />
      <button className="unstyled-button credit-balance is-pressable">
        <div className="credit-balance__row"><span className="credit-balance__label"><Icon name="coins" size={16} />Credits</span><span className="credit-balance__value">{credits.toLocaleString('en-US')}</span></div>
      </button>
      <div className="sidebar__divider" />
      <div className="workspace">
        <span className="workspace__avatar">{SF.user.initial}</span>
        <div className="workspace__text"><div className="workspace__name">{SF.user.company}</div><div className="workspace__role">{SF.user.name} · Producer</div></div>
      </div>
    </aside>
  );
}

Object.assign(window, { Page, Kicker, SectionHead, Wordmark, Sidebar });
})();
