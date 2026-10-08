/* ==========================================================================
   App — routing, global state, production simulation, canvas scaling
   Routes: home · projects · opportunities · opportunity · distribution
           overview · upload · preparing · production · episodes · pdist (project-scoped)
   The current route persists in localStorage ('sf-studio-route').
   ========================================================================== */
(() => {
const { Toast } = window.UI;
SF.ProductionContext = React.createContext(SF.prod);
const ROUTE_KEY = 'sf-studio-route';
const DESIGN_WIDTH = 1320; /* narrower windows scale the whole canvas down */

function loadRoute() {
  try {
    const r = JSON.parse(localStorage.getItem(ROUTE_KEY)) || { name: 'home' };
    if (typeof r !== 'object' || Array.isArray(r) || typeof r.name !== 'string') return { name: 'home' };
    if (r.projectId && !SF.projects.some((p) => p.id === r.projectId)) return { name: 'home' };
    return r;
  } catch (e) { return { name: 'home' }; }
}

function App() {
  const [route, setRoute] = React.useState(loadRoute);
  const [projects, setProjects] = React.useState(SF.projects);
  const [credits, setCredits] = React.useState(SF.credits.balance);
  const [dialog, setDialog] = React.useState(null);
  const [toast, setToast] = React.useState(null);
  const mainRef = React.useRef();

  /* Canvas scaling */
  const [vp, setVp] = React.useState({ w: window.innerWidth, h: window.innerHeight });
  React.useEffect(() => { const r = () => setVp({ w: window.innerWidth, h: window.innerHeight }); window.addEventListener('resize', r); return () => window.removeEventListener('resize', r); }, []);
  const zoom = vp.w < DESIGN_WIDTH ? vp.w / DESIGN_WIDTH : 1;

  const go = (r, opts = {}) => {
    setRoute(r);
    try { localStorage.setItem(ROUTE_KEY, JSON.stringify(r)); } catch (_) { /* Storage may be disabled or full. Navigation still works. */ }
    if (!opts.replace && mainRef.current) mainRef.current.scrollTop = 0;
    if (opts.dialog) setDialog({ type: opts.dialog });
  };
  const notify = (m) => { setToast(m); clearTimeout(window.__sfToast); window.__sfToast = setTimeout(() => setToast(null), 2800); };

  /* Simulated series production — advances the episode currently being made */
  React.useEffect(() => {
    const id = setInterval(() => {
      if (document.hidden) return;
      setProjects((ps) => {
        let changed = false;
        const next = ps.map((p) => {
          if (!p.flow || p.flow.stage !== 'producing') return p;
          changed = true;
          const eps = p.flow.eps.slice(); const i = eps.findIndex((v) => v < 1);
          if (i < 0) return { ...p, status: 'ready', flow: { ...p.flow, stage: 'done' } };
          eps[i] = Math.min(1, eps[i] + p.flow.speed);
          if (eps[i] >= 1 && i + 1 < eps.length) eps[i + 1] = Math.max(eps[i + 1], 0.01);
          const done = eps.every((v) => v >= 1);
          return { ...p, status: done ? 'ready' : 'video', flow: { ...p.flow, eps, stage: done ? 'done' : 'producing' } };
        });
        return changed ? next : ps;
      });
    }, 250);
    return () => clearInterval(id);
  }, []);

  /* Actions */
  const setFlow = (id, f) => setProjects((ps) => ps.map((p) => (p.id === id ? { ...p, flow: { ...p.flow, ...f } } : p)));
  const onPrepare = (id) => { setFlow(id, { stage: 'preparing' }); go({ name: 'preparing', projectId: id }); };
  const onPrepared = (id) => { setFlow(id, { stage: 'ready' }); go({ name: 'production', projectId: id }, { replace: true }); };
  const onCreateSeries = (id) => {
    const production = projects.find((p) => p.id === id)?.production || SF.prod;
    setCredits((c) => c - production.summary.credits);
    setProjects((ps) => ps.map((p) => (p.id === id ? { ...p, episodes: production.episodes.length, status: 'video', flow: { ...p.flow, stage: 'producing', eps: production.episodes.map((_, i) => i === 0 ? 0.01 : 0) } } : p)));
    go({ name: 'episodes', projectId: id }); notify('Production started — we\u2019ll take it from here');
  };
  const spend = (n) => setCredits((c) => c - n);
  const onCreate = (data, quiet) => {
    const p = { id: 'p' + Date.now(), episodes: data.format === 'Vertical Short Drama' ? null : 1, edited: 'Just now', status: 'concept', flow: { stage: 'upload', eps: [], speed: 0.06 }, ...data };
    setProjects((ps) => [p, ...ps]); setDialog(null); go({ name: data.source === 'Script' ? 'upload' : 'overview', projectId: p.id }); if (!quiet) notify('Project created');
  };
  const onStart = (k) => (k === 'opportunity' ? go({ name: 'opportunities' }) : k === 'script' ? onCreate({ title: '제목 없는 작품', format: 'Vertical Short Drama', source: 'Script', hue: 165 }, true) : setDialog({ type: 'new', start: k }));
  const onSubmit = (p, note = p.distributionNote || '') => setDialog({ type: 'submit', p, note });
  const confirmSubmit = () => { const p = dialog.p; setProjects((ps) => ps.map((x) => (x.id === p.id ? { ...x, submitted: true, status: 'review', distributionNote: dialog.note } : x))); setDialog(null); notify(p.title + ' submitted to Shortflow'); };

  /* Resolve screen */
  const project = projects.find((p) => p.id === route.projectId) || projects[0];
  const stage = project.flow && project.flow.stage;
  const withFlow = project.flow ? project : { ...project, flow: { stage: 'ready', eps: [] } };
  const name = (route.name === 'upload' || route.name === 'preparing') && stage && !['upload', 'preparing'].includes(stage) ? 'production' : route.name;
  let screen;
  switch (name) {
    case 'overview': screen = <Overview p={project} go={go} />; break;
    case 'upload': screen = <UploadScript p={project} onPrepare={onPrepare} />; break;
    case 'preparing': screen = <Preparing onDone={() => onPrepared(project.id)} />; break;
    case 'production': screen = stage === 'upload' ? <UploadScript p={project} onPrepare={onPrepare} /> : <ProductionReady p={withFlow} go={go} credits={credits} onCreate={onCreateSeries} toast={notify} onSpend={spend} />; break;
    case 'episodes': screen = <Episodes p={withFlow} go={go} credits={credits} onRemake={spend} onSubmit={onSubmit} toast={notify} />; break;
    case 'pdist': screen = <ProjectDistribution p={project} onSubmit={onSubmit} />; break;
    case 'opportunity': screen = <OpportunityDetail o={SF.opportunities.find((o) => o.id === route.oppId) || SF.opportunities[0]} go={go} projects={projects} onStartFromOpp={(o) => setDialog({ type: 'new', opp: o })} />; break;
    case 'opportunities': screen = <Opportunities go={go} />; break;
    case 'projects': screen = <Projects projects={projects} go={go} onStart={onStart} />; break;
    case 'distribution': screen = <Distribution projects={projects} onSubmit={onSubmit} />; break;
    default: screen = <Home projects={projects} go={go} onStart={onStart} onSubmit={onSubmit} />;
  }

  /* zoom / size are runtime values (canvas scaling) — the only inline style on the shell */
  const shellSize = { zoom, width: zoom < 1 ? DESIGN_WIDTH : '100%', '--app-height': vp.h / zoom + 'px' };
  return (
    <SF.ProductionContext.Provider value={project.production || SF.prod}>
    <div className="app-shell" style={shellSize}>
      <Sidebar route={{ ...route, projectId: route.projectId && project.id }} projects={projects} go={go} credits={credits} />
      <main ref={mainRef} className="app-main" data-screen-label={route.name} key={route.name + (route.projectId || '') + (route.oppId || '')}>{screen}</main>
      {dialog && dialog.type === 'new' && <NewProjectDialog start={dialog.start} opp={dialog.opp} onClose={() => setDialog(null)} onCreate={onCreate} />}
      {dialog && dialog.type === 'submit' && <SubmitDialog note={dialog.note} p={dialog.p} onClose={() => setDialog(null)} onConfirm={confirmSubmit} />}
      {toast && <div className="toast-layer"><Toast message={toast} /></div>}
    </div>
    </SF.ProductionContext.Provider>
  );
}

class StudioErrorBoundary extends React.Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error, info) { console.error('Studio screen error', error, info); }
  render() {
    if (this.state.failed) return <div className="startup-message" role="alert">
      <h1>화면을 불러오지 못했어요.</h1>
      <p>홈으로 돌아가 다시 시도해 주세요.</p>
      <button onClick={() => { try { localStorage.removeItem(ROUTE_KEY); } catch (_) {} window.location.reload(); }}>홈으로 돌아가기</button>
    </div>;
    return this.props.children;
  }
}
ReactDOM.createRoot(document.getElementById('app')).render(<StudioErrorBoundary><App /></StudioErrorBoundary>);
})();
