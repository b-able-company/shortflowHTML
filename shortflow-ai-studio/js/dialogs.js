/* ==========================================================================
   App-level dialogs: New project (also "Start from opportunity"), Submit to Shortflow
   Styles: css/dialogs.css
   ========================================================================== */
(() => {
const { cx, Button, Dialog, Input, SegmentedControl, Icon, Poster } = window.UI;

function NewProjectDialog({ start, opp, onClose, onCreate }) {
  const [choice, setChoice] = React.useState(opp ? 'opportunity' : start || 'idea');
  const [title, setTitle] = React.useState('');
  const [format, setFormat] = React.useState('Vertical Short Drama');
  const [ip, setIp] = React.useState('ip1');
  const ips = SF.contentIP;
  const chosenIP = ips.find((x) => x.id === ip);
  const options = SF.startOptions.filter((x) => x.key !== 'opportunity');
  const create = () => onCreate({
    title: title || (choice === 'content' ? chosenIP.t : '제목 없는 프로젝트'),
    format,
    source: choice === 'content' ? 'Shortflow Content' : opp ? 'Opportunity' : SF.startOptions.find((x) => x.key === choice).title.replace('From ', '').replace(/^an? /, ''),
    opportunity: opp && opp.id,
    hue: choice === 'content' ? chosenIP.h : opp ? opp.hue : Math.round(Math.random() * 360),
  });
  return (
    <Dialog onClose={onClose} size="md" title={opp ? 'Start a project' : 'New project'}
      description={opp ? <span>Linked to <span className="text-primary">{opp.kind}</span> · {opp.title} · <span className="text-accent">{opp.dday}</span></span> : 'Pick a starting point. You can add a script any time.'}
      footer={<><Button variant="ghost" onClick={onClose}>Cancel</Button><Button variant="primary" onClick={create}>Create project</Button></>}>
      <div className="new-project">
        <div className="start-choices">
          {options.map((o) => (
            <button key={o.key} onClick={() => setChoice(o.key)} className={cx('unstyled-button start-choice', choice === o.key && 'start-choice--selected')}>
              <Icon name={o.icon} size={18} />
              <div className="start-choice__title">{o.title}</div>
            </button>
          ))}
        </div>
        {choice === 'content' && (
          <div>
            <div className="field-label">Your Shortflow content</div>
            <div className="ip-picker">
              {ips.map((x) => <button key={x.id} onClick={() => setIp(x.id)} className={cx('select-ring select-ring--poster', ip === x.id && 'select-ring--selected')}><Poster title={x.t} hue={x.h} radius={7} /></button>)}
            </div>
          </div>
        )}
        {choice === 'script' && <div className="script-hint"><Icon name="file-up" size={20} color="var(--color-text-secondary)" /><span><span className="script-hint__strong">Upload on the next screen</span> — PDF, DOCX, TXT. AI prepares the rest.</span></div>}
        <Input label="Project title" placeholder={choice === 'content' ? chosenIP.t : '예: 서울 고스트 택시'} value={title} onChange={(e) => setTitle(e.target.value)} />
        <div>
          <div className="field-label">What are you making?</div>
          <SegmentedControl options={['Vertical Short Drama', 'Trailer', 'Pilot Episode']} value={format} onChange={setFormat} />
        </div>
      </div>
    </Dialog>
  );
}

function SubmitDialog({ p, note, onClose, onConfirm }) {
  const titleId = React.useId();
  const descriptionId = React.useId();
  const cancelRef = React.useRef(null);
  const submitRef = React.useRef(null);
  React.useEffect(() => {
    const previous = document.activeElement;
    cancelRef.current && cancelRef.current.focus();
    return () => { previous && previous.isConnected && previous.focus(); };
  }, []);
  const onKeyDown = (e) => {
    if (e.key === 'Escape') { e.stopPropagation(); onClose(); }
    if (e.key === 'Tab') {
      e.preventDefault();
      (document.activeElement === cancelRef.current ? submitRef.current : cancelRef.current).focus();
    }
  };
  return (
    <div className="dialog-backdrop submit-backdrop" onClick={onClose} onKeyDown={onKeyDown}>
      <div role="dialog" aria-modal="true" aria-labelledby={titleId} aria-describedby={descriptionId}
        className="dialog submit-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="submit-dialog__poster"><Poster title={p.title} hue={p.hue} seed={p.id} width={72} radius={8} showTitle={false} /></div>
        <h2 id={titleId} className="submit-dialog__title">Submit to Shortflow</h2>
        <div className="submit-dialog__meta">{p.title} · {p.episodes} episodes</div>
        <p id={descriptionId} className="submit-dialog__description">Shortflow will review the series<br />and handle distribution from here.</p>
        {note && <div className="submit-dialog__note"><strong>Your request</strong><p>{note}</p></div>}
        <div className="submit-dialog__actions">
          <button ref={cancelRef} type="button" className="btn btn--secondary submit-dialog__cancel" onClick={onClose}>Cancel</button>
          <button ref={submitRef} type="button" className="btn btn--accent" onClick={onConfirm}>Submit</button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { NewProjectDialog, SubmitDialog });
})();
