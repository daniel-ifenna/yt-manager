// illustrations.jsx — OBELIK brand illustration kit (hand-drawn SVG)
// All components presentational; exported to window for use in scenes.jsx.
// Palette
const C = {
  orange:  '#e8782e',
  orange2: '#f59842',
  green:   '#0d2a1c',
  green2:  '#163a28',
  green3:  '#1f4a32',
  ink:     '#0a0a0a',
  paper:   '#f4ede1',
  cream:   '#efe7d5',
  red:     '#d8261d',
  go:      '#3fae6e',
};

// ── Obelisk glyph (the brand motif) ─────────────────────────────────────────
// A tapering monument: pyramidion cap + shaft. Optional two-tone.
function Obelisk({ size = 120, color = C.orange, cap = C.green, stroke = 'none', sw = 0 }) {
  // viewBox 60 x 160; centered at x=30
  const h = size * (160 / 60);
  return (
    <svg width={size} height={h} viewBox="0 0 60 160" fill="none" style={{ display: 'block' }}>
      {/* shaft */}
      <polygon points="22,30 38,30 44,156 16,156" fill={color} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
      {/* pyramidion cap */}
      <polygon points="30,2 38,30 22,30" fill={cap} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
      {/* center seam highlight */}
      <line x1="30" y1="6" x2="30" y2="150" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
      {/* base plinth */}
      <rect x="12" y="150" width="36" height="8" rx="1.5" fill={cap} />
    </svg>
  );
}

// ── OBELIK wordmark ─────────────────────────────────────────────────────────
function ObelikWordmark({ size = 64, color = C.green, accent = C.orange, mono = false }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: size * 0.18,
      fontFamily: "'Archivo Black', sans-serif",
      fontSize: size, lineHeight: 1, color, letterSpacing: '-0.02em',
    }}>
      <Obelisk size={size * 0.62} color={accent} cap={color} />
      <span>OBELIK</span>
    </span>
  );
}

// ── REC badge ───────────────────────────────────────────────────────────────
function RecBadge({ t = 0, label = 'REC', color = '#fff', size = 22 }) {
  const blink = (Math.sin(t * Math.PI * 2 * 1.1) + 1) / 2; // 0..1
  const op = 0.35 + 0.65 * blink;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: size * 0.6,
      fontFamily: "'JetBrains Mono', monospace", fontWeight: 700,
      fontSize: size, letterSpacing: '0.25em', color,
    }}>
      <span style={{
        width: size * 0.8, height: size * 0.8, borderRadius: '50%',
        background: C.red, opacity: op,
        boxShadow: `0 0 ${size * 0.9}px rgba(216,38,29,${0.6 * blink})`,
      }} />
      {label}
    </span>
  );
}

// ── Audio waveform ──────────────────────────────────────────────────────────
function Waveform({ t = 0, bars = 28, width = 360, height = 80, color = C.orange, active = true }) {
  const bw = width / bars;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block' }}>
      {Array.from({ length: bars }).map((_, i) => {
        const phase = i * 0.5;
        const amp = active
          ? (0.25 + 0.75 * Math.abs(Math.sin(t * 6 + phase) * Math.cos(t * 2.3 + phase * 0.6)))
          : 0.12;
        const bh = Math.max(3, amp * height);
        return (
          <rect key={i}
            x={i * bw + bw * 0.22} y={(height - bh) / 2}
            width={bw * 0.56} height={bh} rx={bw * 0.28}
            fill={color} />
        );
      })}
    </svg>
  );
}

// ── Hazard stripe band ──────────────────────────────────────────────────────
function HazardBand({ width = 1280, height = 40, a = C.ink, b = C.orange, step = 48 }) {
  return (
    <div style={{
      width, height,
      background: `repeating-linear-gradient(135deg, ${a} 0 ${step / 2}px, ${b} ${step / 2}px ${step}px)`,
    }} />
  );
}

// ── Paper document (status-quo chaos) ───────────────────────────────────────
function PaperDoc({ w = 130, h = 168, lines = 5, stamp = null, fold = true, tint = C.paper }) {
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: 'block', filter: 'drop-shadow(0 8px 14px rgba(0,0,0,0.28))' }}>
      <rect x="2" y="2" width={w - 4} height={h - 4} rx="4" fill={tint} />
      {fold && <polygon points={`${w - 30},2 ${w - 2},30 ${w - 2},2`} fill="rgba(0,0,0,0.10)" />}
      {Array.from({ length: lines }).map((_, i) => (
        <rect key={i} x="16" y={26 + i * 20} width={(w - 32) * (i === lines - 1 ? 0.55 : 0.86)} height="6" rx="3" fill="rgba(13,42,28,0.30)" />
      ))}
      {stamp && (
        <g transform={`rotate(-12 ${w / 2} ${h - 34})`}>
          <rect x={w / 2 - 42} y={h - 50} width="84" height="30" rx="4" fill="none" stroke={stamp.color || C.red} strokeWidth="3" />
          <text x={w / 2} y={h - 30} textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontWeight="700" fontSize="13" fill={stamp.color || C.red} letterSpacing="1">{stamp.label}</text>
        </g>
      )}
    </svg>
  );
}

// ── Status-quo chip ─────────────────────────────────────────────────────────
function ChaosChip({ label, icon }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 10,
      padding: '12px 18px', background: '#fff', borderRadius: 10,
      border: `2px solid ${C.green}`, boxShadow: '0 10px 20px rgba(0,0,0,0.25)',
      fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 19,
      color: C.green, whiteSpace: 'nowrap',
    }}>
      <span style={{ fontSize: 22 }}>{icon}</span>{label}
    </div>
  );
}

// ── Generic icon tile wrapper ───────────────────────────────────────────────
function IconTile({ children, bg = C.green, size = 96, radius = 18 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: radius, background: bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    }}>
      {children}
    </div>
  );
}

// ── Portal icons (64 viewBox, stroke-based) ─────────────────────────────────
const sp = { fill: 'none', strokeWidth: 4.5, strokeLinecap: 'round', strokeLinejoin: 'round' };

function IconManager({ s = 56, c = C.orange }) { // orchestrator hub
  return (
    <svg width={s} height={s} viewBox="0 0 64 64">
      <circle cx="32" cy="32" r="8" stroke={c} {...sp} />
      <circle cx="32" cy="12" r="5" stroke={c} {...sp} />
      <circle cx="32" cy="52" r="5" stroke={c} {...sp} />
      <circle cx="12" cy="42" r="5" stroke={c} {...sp} />
      <circle cx="52" cy="42" r="5" stroke={c} {...sp} />
      <path d="M32 24V17M27 36 16 41M37 36 48 41" stroke={c} {...sp} />
    </svg>
  );
}
function IconContractor({ s = 56, c = C.orange }) { // hard hat
  return (
    <svg width={s} height={s} viewBox="0 0 64 64">
      <path d="M14 40a18 18 0 0 1 36 0" stroke={c} {...sp} />
      <path d="M32 22v-7M24 24l-3-6M40 24l3-6" stroke={c} {...sp} />
      <path d="M8 44h48" stroke={c} {...sp} />
      <path d="M14 40h36v4H14z" stroke={c} {...sp} />
    </svg>
  );
}
function IconVendor({ s = 56, c = C.orange }) { // package
  return (
    <svg width={s} height={s} viewBox="0 0 64 64">
      <path d="M32 8 54 20v24L32 56 10 44V20z" stroke={c} {...sp} />
      <path d="M10 20l22 12 22-12M32 32v24" stroke={c} {...sp} />
      <path d="M21 14l22 12" stroke={c} {...sp} />
    </svg>
  );
}
function IconArchitect({ s = 56, c = C.orange }) { // drafting compass
  return (
    <svg width={s} height={s} viewBox="0 0 64 64">
      <circle cx="32" cy="14" r="5" stroke={c} {...sp} />
      <path d="M30 19 16 52M34 19 48 52" stroke={c} {...sp} />
      <path d="M24 38h16" stroke={c} {...sp} />
      <path d="M16 52l4-3M48 52l-4-3" stroke={c} {...sp} />
    </svg>
  );
}
function IconAdmin({ s = 56, c = C.orange }) { // shield check
  return (
    <svg width={s} height={s} viewBox="0 0 64 64">
      <path d="M32 8 52 16v14c0 13-9 21-20 26-11-5-20-13-20-26V16z" stroke={c} {...sp} />
      <path d="M23 32l6 6 12-13" stroke={c} {...sp} />
    </svg>
  );
}

// ── Lifecycle / pipeline icons ──────────────────────────────────────────────
function IconApply({ s = 44, c = '#fff' }) { // document
  return (
    <svg width={s} height={s} viewBox="0 0 64 64">
      <path d="M18 8h20l10 10v38H18z" stroke={c} {...sp} />
      <path d="M38 8v10h10" stroke={c} {...sp} />
      <path d="M26 32h14M26 42h14" stroke={c} {...sp} />
    </svg>
  );
}
function IconBid({ s = 44, c = '#fff' }) { // gavel
  return (
    <svg width={s} height={s} viewBox="0 0 64 64">
      <rect x="30" y="8" width="20" height="12" rx="2" transform="rotate(45 40 14)" stroke={c} {...sp} />
      <path d="M40 22 24 38" stroke={c} {...sp} />
      <path d="M14 56h24" stroke={c} {...sp} />
      <path d="M20 42 34 56" stroke={c} {...sp} />
    </svg>
  );
}
function IconAward({ s = 44, c = '#fff' }) { // rosette seal
  return (
    <svg width={s} height={s} viewBox="0 0 64 64">
      <circle cx="32" cy="24" r="14" stroke={c} {...sp} />
      <path d="M32 18l3 5 5 .5-4 4 1 5-5-2.5-5 2.5 1-5-4-4 5-.5z" stroke={c} {...sp} />
      <path d="M24 36 20 56l12-7 12 7-4-20" stroke={c} {...sp} />
    </svg>
  );
}
function IconBuild({ s = 44, c = '#fff' }) { // tower crane
  return (
    <svg width={s} height={s} viewBox="0 0 64 64">
      <path d="M30 56V14M24 56h12" stroke={c} {...sp} />
      <path d="M12 16h40" stroke={c} {...sp} />
      <path d="M30 14 14 16M30 14 52 16" stroke={c} {...sp} />
      <path d="M18 16v6M44 16v8" stroke={c} {...sp} />
    </svg>
  );
}
function IconHandover({ s = 44, c = '#fff' }) { // key
  return (
    <svg width={s} height={s} viewBox="0 0 64 64">
      <circle cx="20" cy="24" r="10" stroke={c} {...sp} />
      <path d="M28 30 50 52M44 46l6-6M40 42l5-5" stroke={c} {...sp} />
    </svg>
  );
}

// ── Tower crane + building (hero illustration) ──────────────────────────────
function ConstructionScene({ w = 460, progress = 1, c = C.green }) {
  const floors = Math.round(progress * 6);
  return (
    <svg width={w} height={w * 0.92} viewBox="0 0 460 420" fill="none">
      {/* crane mast */}
      <g stroke={c} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M70 400V70" />
        <path d="M50 400h40" />
        {/* lattice */}
        {Array.from({ length: 8 }).map((_, i) => (
          <path key={i} d={`M58 ${90 + i * 40} 82 ${110 + i * 40}M82 ${90 + i * 40} 58 ${110 + i * 40}`} strokeWidth="2.5" />
        ))}
        {/* jib */}
        <path d="M70 70 380 70" />
        <path d="M70 50 250 70" />
        <path d="M70 50 70 70" />
        {/* counter jib */}
        <path d="M70 70 30 70" />
        {/* hook line */}
        <path d="M300 70V150" strokeWidth="2.5" />
        <path d="M292 150h16l-4 10h-8z" fill={C.orange} stroke={C.orange} />
      </g>
      {/* building under construction */}
      <g>
        <rect x="150" y={400 - floors * 44} width="170" height={floors * 44} fill={C.green2} />
        {Array.from({ length: floors }).map((_, i) => (
          <g key={i}>
            <rect x="150" y={400 - (i + 1) * 44} width="170" height="44" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
            {[0, 1, 2].map((j) => (
              <rect key={j} x={166 + j * 52} y={400 - (i + 1) * 44 + 12} width="32" height="20" rx="2" fill={C.orange} opacity={0.85} />
            ))}
          </g>
        ))}
        {/* ground */}
        <rect x="120" y="400" width="320" height="6" rx="3" fill={c} />
      </g>
    </svg>
  );
}

// ── Escrow / finance icons ──────────────────────────────────────────────────
function IconWallet({ s = 56, c = C.orange }) {
  return (
    <svg width={s} height={s} viewBox="0 0 64 64">
      <rect x="10" y="16" width="44" height="36" rx="6" stroke={c} {...sp} />
      <path d="M10 24h44" stroke={c} {...sp} />
      <circle cx="44" cy="38" r="4" stroke={c} {...sp} />
      <path d="M14 16l28-8 6 8" stroke={c} {...sp} />
    </svg>
  );
}
function IconVault({ s = 56, c = C.orange }) {
  return (
    <svg width={s} height={s} viewBox="0 0 64 64">
      <path d="M32 7 53 15v15c0 13-9 21-21 26-12-5-21-13-21-26V15z" stroke={c} {...sp} />
      <rect x="24" y="29" width="16" height="13" rx="2.5" stroke={c} {...sp} />
      <path d="M27 29v-4a5 5 0 0 1 10 0v4" stroke={c} {...sp} />
      <circle cx="32" cy="35.5" r="1.8" fill={c} />
    </svg>
  );
}
function IconCheckSeal({ s = 56, c = C.orange }) {
  return (
    <svg width={s} height={s} viewBox="0 0 64 64">
      <circle cx="32" cy="32" r="22" stroke={c} {...sp} />
      <path d="M22 33l7 7 14-16" stroke={c} {...sp} />
    </svg>
  );
}
function NairaToken({ size = 26, bg = C.orange, fg = C.green, symbol = '$' }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', background: bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Archivo Black', sans-serif", fontSize: size * 0.56, color: fg,
      boxShadow: '0 3px 8px rgba(0,0,0,0.3)', flexShrink: 0,
    }}>{symbol}</div>
  );
}

Object.assign(window, {
  OBELIK_C: C,
  Obelisk, ObelikWordmark, RecBadge, Waveform, HazardBand,
  PaperDoc, ChaosChip, IconTile,
  IconManager, IconContractor, IconVendor, IconArchitect, IconAdmin,
  IconApply, IconBid, IconAward, IconBuild, IconHandover,
  ConstructionScene,
  IconWallet, IconVault, IconCheckSeal, NairaToken,
});
