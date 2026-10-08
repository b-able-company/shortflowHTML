/* ==========================================================================
   Reusable UI components (React, no build step — transpiled by Babel in the browser).
   Styling lives in css/components.css. Only truly dynamic values (sizes, progress %,
   generated artwork) are passed through CSS custom properties.
   ========================================================================== */
(() => {
const cx = (...a) => a.filter(Boolean).join(' ');

/* ---- Icon: Lucide line icons, fetched once and inlined so they inherit currentColor ---- */
const ICON_CDN = 'assets/icons/';
const iconCache = {};
function loadIcon(name) {
  if (!iconCache[name]) {
    iconCache[name] = fetch(ICON_CDN + name + '.svg').then((r) => (r.ok ? r.text() : '')).then((t) => t
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/width="24"/, 'width="100%"').replace(/height="24"/, 'height="100%"')
      .replace(/stroke-width="2"/, 'stroke-width="1.75"')).catch(() => '');
  }
  return iconCache[name];
}
function Icon({ name, size = 18, color, className }) {
  const [svg, setSvg] = React.useState('');
  React.useEffect(() => { let on = true; loadIcon(name).then((t) => on && setSvg(t)); return () => { on = false; }; }, [name]);
  return <span aria-hidden="true" className={cx('icon', className)} style={{ '--icon-size': size + 'px', color }} dangerouslySetInnerHTML={{ __html: svg }} />;
}

/* ---- Buttons ---- */
function Button({ variant = 'secondary', size = 'md', icon, iconRight, full, children, className, ...rest }) {
  const is = size === 'sm' ? 14 : size === 'lg' ? 18 : 16;
  return (
    <button className={cx('btn', 'btn--' + variant, size !== 'md' && 'btn--' + size, full && 'btn--full', className)} {...rest}>
      {icon && <Icon name={icon} size={is} />}{children}{iconRight && <Icon name={iconRight} size={is} />}
    </button>
  );
}
function IconButton({ icon, label, variant = 'ghost', size = 'md', className, ...rest }) {
  const is = size === 'sm' ? 14 : size === 'lg' ? 20 : 17;
  return <button className={cx('icon-button', variant !== 'ghost' && 'icon-button--' + variant, size !== 'md' && 'icon-button--' + size, className)} aria-label={label} title={label} {...rest}><Icon name={icon} size={is} /></button>;
}
/* "· 18 credits" suffix used inside generate buttons */
function CostLabel({ n }) { return <span className="btn__cost">· {Number(n).toLocaleString('en-US')} credits</span>; }

/* ---- Forms ---- */
function Input({ label, hint, icon, multiline, rows = 3, className, ...rest }) {
  return (
    <label className={cx('field', className)}>
      {label && <span className="field__label">{label}</span>}
      <span className={cx('text-input', multiline && 'text-input--multiline')}>
        {icon && <Icon name={icon} size={16} color="var(--color-text-tertiary)" />}
        {multiline ? <textarea rows={rows} {...rest} /> : <input {...rest} />}
      </span>
      {hint && <span className="field__hint">{hint}</span>}
    </label>
  );
}
function Switch({ checked, onChange, label }) {
  const btn = <button type="button" role="switch" aria-checked={!!checked} className="switch" onClick={() => onChange && onChange(!checked)} />;
  return label ? <label className="switch-row">{label}{btn}</label> : btn;
}
function Checkbox({ checked, onChange, label, description }) {
  return (
    <label className="checkbox-row">
      <button type="button" role="checkbox" aria-checked={!!checked} className="checkbox" onClick={(e) => { e.stopPropagation(); onChange && onChange(!checked); }}>
        {checked && <Icon name="check" size={13} />}
      </button>
      {(label || description) && (
        <span className="checkbox-row__text">
          {label && <span className="checkbox-row__label">{label}</span>}
          {description && <span className="checkbox-row__description">{description}</span>}
        </span>
      )}
    </label>
  );
}
function SegmentedControl({ options = [], value, onChange }) {
  return (
    <div className="segmented" role="tablist">
      {options.map((o) => {
        const opt = typeof o === 'string' ? { value: o, label: o } : o;
        return <button key={opt.value} role="tab" aria-selected={opt.value === value} onClick={() => onChange && onChange(opt.value)}>{opt.icon && <Icon name={opt.icon} size={14} />}{opt.label}</button>;
      })}
    </div>
  );
}
function Chips({ items, value, onPick }) {
  return <div className="chip-row">{items.map((c) => <button key={c} onClick={() => onPick(c)} className={cx('btn btn--sm', value === c ? 'btn--chip-selected' : 'btn--secondary')}>{c}</button>)}</div>;
}

/* ---- Navigation ---- */
function NavItem({ icon, label, active, quiet, trailing, onClick }) {
  return (
    <button className={cx('nav-item', active && 'nav-item--active', quiet && 'nav-item--quiet')} onClick={onClick} aria-current={active ? 'page' : undefined}>
      {icon && <Icon name={icon} size={quiet ? 15 : 18} />}
      <span className="nav-item__label">{label}</span>
      {trailing != null && <span className="nav-item__trailing">{trailing}</span>}
    </button>
  );
}
function Tabs({ items = [], value, onChange, className }) {
  return (
    <div className={cx('tabs', className)} role="tablist">
      {items.map((it) => <button key={it.value} role="tab" aria-selected={it.value === value} onClick={() => onChange && onChange(it.value)}>{it.label}{it.count != null && <span className="tabs__count">{it.count}</span>}</button>)}
    </div>
  );
}
function Menu({ sections = [] }) {
  return (
    <div role="menu" className="menu">
      {sections.map((s, i) => (
        <div key={i} className="menu__section">
          {s.label && <div className="menu__section-label">{s.label}</div>}
          {s.items.map((it, j) => (
            <button key={j} role="menuitem" className="menu-item" onClick={it.onClick}>
              {it.leading || (it.icon && <Icon name={it.icon} size={16} color="var(--color-text-secondary)" />)}
              <span className="menu-item__text"><span className="truncate">{it.label}</span>{it.meta && <span className="menu-item__meta">{it.meta}</span>}</span>
              {it.checked && <Icon name="check" size={15} />}
              {it.shortcut && <span className="menu-item__shortcut">{it.shortcut}</span>}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ---- Feedback ---- */
const STATUS = {
  empty: { label: 'Not generated', hollow: true }, generating: { label: 'Generating', pulse: true }, done: { label: 'Completed' },
  selected: { label: 'Selected', icon: 'check' }, draft: { label: 'Draft' }, review: { label: 'In review' },
  ready: { label: 'Ready to submit' }, submitted: { label: 'Submitted' }, live: { label: 'Live' },
};
function StatusBadge({ status = 'empty', label, size = 'md', className }) {
  const m = STATUS[status] || STATUS.empty;
  return (
    <span data-status={status} className={cx('status-badge', size === 'sm' && 'status-badge--sm', status === 'empty' && 'status-badge--empty', className)}>
      {m.icon ? <Icon name={m.icon} size={size === 'sm' ? 12 : 13} color="var(--status-color)" /> : <span className={cx('status-badge__dot', m.hollow && 'status-badge__dot--hollow', m.pulse && 'status-badge__dot--pulse')} />}
      {label ?? m.label}
    </span>
  );
}
function Tag({ children, variant = 'neutral', className }) { return <span className={cx('tag', 'tag--' + variant, className)}>{children}</span>; }
function Progress({ value = 0, tone, height = 4, segments, className }) {
  const pct = Math.max(0, Math.min(1, value)) * 100;
  const cls = cx('progress', tone && 'progress--' + tone, segments && 'progress--segmented', className);
  if (segments) {
    const done = Math.round(value * segments);
    return <div className={cls} style={{ '--progress-height': height + 'px', height }}>{Array.from({ length: segments }).map((_, i) => <span key={i} className={cx('progress__segment', i < done && 'progress__segment--done')} />)}</div>;
  }
  return <div role="progressbar" aria-valuenow={Math.round(pct)} className={cls} style={{ '--progress-height': height + 'px', '--progress': pct + '%' }}><div className="progress__fill" /></div>;
}
function Toast({ icon = 'circle-check', message }) {
  return <div role="status" className="toast"><Icon name={icon} size={17} color="var(--color-positive)" /><span>{message}</span></div>;
}
function Dialog({ onClose, title, description, children, footer, size }) {
  return (
    <div className="dialog-backdrop" onClick={onClose}>
      <div role="dialog" aria-modal="true" className={cx('dialog', size && 'dialog--' + size)} onClick={(e) => e.stopPropagation()}>
        <div className="dialog__header">
          <div className="dialog__titles">
            {title && <div className="dialog__title">{title}</div>}
            {description && <div className="dialog__description">{description}</div>}
          </div>
          {onClose && <IconButton icon="x" label="Close" onClick={onClose} />}
        </div>
        {children && <div className="dialog__body">{children}</div>}
        <div className="dialog__footer">{footer}</div>
      </div>
    </div>
  );
}

/* ---- Media: tonal placeholder still (swap in real images via src) ---- */
function seeded(seed) { let h = 2166136261; for (const c of String(seed)) h = Math.imul(h ^ c.charCodeAt(0), 16777619) >>> 0; return () => { h = (Math.imul(h, 1664525) + 1013904223) >>> 0; return h / 4294967296; }; }
function Frame({ hue = 200, seed = 'frame', aspect = '9/16', src, radius = 8, children, className, onClick }) {
  const r = seeded(seed + hue);
  const x = 18 + r() * 64, y = 12 + r() * 46, s = 38 + r() * 34, x2 = r() * 100, h2 = (hue + 25 + r() * 50) % 360, band = 22 + r() * 22;
  const imageUrl = src ? new URL(src, document.baseURI).href : null;
  const bg = imageUrl ? 'center / cover no-repeat url(' + JSON.stringify(imageUrl) + ')' :
    'radial-gradient(ellipse ' + s + '% ' + (s * 0.75) + '% at ' + x + '% ' + y + '%, hsla(' + hue + ',62%,62%,.55), transparent 70%),' +
    'radial-gradient(ellipse 70% 38% at ' + x2 + '% 100%, hsla(' + h2 + ',48%,42%,.42), transparent 72%),' +
    'linear-gradient(172deg, hsl(' + hue + ',24%,19%), hsl(' + hue + ',30%,7%))';
  const vars = { '--frame-bg': bg, '--frame-aspect': aspect, '--frame-radius': radius + 'px', '--frame-band': band + '%', '--frame-band-bg': 'linear-gradient(180deg, transparent, hsla(' + hue + ',30%,4%,.7))' };
  return <div className={cx('media-frame', className)} style={vars} onClick={onClick}>{!src && <div className="media-frame__vignette" />}{children}</div>;
}
function Poster({ title, subtitle, hue = 200, seed, src, width, radius = 10, showTitle = true, className }) {
  const project = SF.projects.find((p) => p.id === seed || p.title === title);
  const image = src || (project && project.poster);
  if (image) return (
    <div className={cx('poster', className)} style={width ? { '--poster-width': width + 'px' } : undefined}>
      <img className="poster__image" src={image}
        srcSet={!src && project.posterThumb ? project.posterThumb + ' 160w, ' + image + ' 640w' : undefined}
        sizes={width ? width + 'px' : '(max-width: 1320px) 260px, 320px'}
        width={640} height={960} alt={title} loading="lazy" decoding="async" style={{ borderRadius: radius + 'px' }} />
    </div>
  );
  return (
    <div className={cx('poster', className)} style={width ? { '--poster-width': width + 'px' } : undefined}>
      <Frame hue={hue} seed={seed || title} src={src} aspect="2/3" radius={radius} />
    </div>
  );
}
/* Shimmer overlay for anything being generated */
function Sheen({ slow }) { return <div className={cx('generating-sheen', slow && 'generating-sheen--slow')} />; }

/* ---- Production ---- */
function StagePipeline({ stages = [], onSelect, compact, className }) {
  return (
    <div className={cx('stage-pipeline', compact && 'stage-pipeline--compact', className)} style={{ '--stage-count': stages.length }}>
      {stages.map((s, i) => {
        const last = i === stages.length - 1;
        const fill = s.state === 'done' ? 1 : s.state === 'active' ? (s.value || 0) : 0;
        const is = compact ? 12 : 14;
        return (
          <button key={s.key || i} onClick={onSelect ? () => onSelect(s, i) : undefined} className={cx('stage', 'stage--' + s.state, last && 'stage--destination', onSelect && 'stage--clickable is-pressable')} style={{ '--stage-fill': fill * 100 + '%' }}>
            <div className="stage__bar"><div className="stage__bar-fill" /></div>
            <div className="stage__label">
              {s.state === 'done' && <Icon name="check" size={is} color="var(--color-text-secondary)" />}
              {last && s.state !== 'done' && <Icon name="send" size={is} color={s.state === 'todo' ? 'var(--color-text-tertiary)' : 'var(--color-accent)'} />}
              <span className="truncate">{s.label}</span>
            </div>
            {!compact && s.detail && <div className="stage__detail">{s.detail}</div>}
          </button>
        );
      })}
    </div>
  );
}
function CreditCost({ amount, balance, label }) {
  const fmt = (n) => Number(n).toLocaleString('en-US');
  return <span className="credit-cost"><Icon name="coins" size={13} />{label && <span>{label}</span>}<span className="credit-cost__amount">{fmt(amount)}</span>{balance != null && <span>· {fmt(balance)} left</span>}</span>;
}

window.UI = { cx, Icon, Button, IconButton, CostLabel, Input, Switch, Checkbox, SegmentedControl, Chips, NavItem, Tabs, Menu, StatusBadge, Tag, Progress, Toast, Dialog, Frame, Poster, Sheen, StagePipeline, CreditCost };
})();
