// scenes.jsx — OBELIK pitch opening (narrated). Scenes composed of Sprites.
const { Sprite, useSprite, useTime, Easing, interpolate, animate, clamp } = window;
const {
  OBELIK_C: C, Obelisk, ObelikWordmark, RecBadge, Waveform, HazardBand,
  PaperDoc, ChaosChip, IconTile,
  IconManager, IconContractor, IconVendor, IconArchitect, IconAdmin,
  IconApply, IconBid, IconAward, IconBuild, IconHandover, ConstructionScene,
  IconWallet, IconVault, IconCheckSeal, NairaToken,
} = window;

const LOGO = 'assets/obelik-logo.png';
const DISPLAY = "'Archivo Black', sans-serif";
const MONO = "'JetBrains Mono', monospace";
const BODY = "'Inter', system-ui, sans-serif";

// ── helpers ──────────────────────────────────────────────────────────────────
function Fill({ bg, children, style }) {
  return <div style={{ position: 'absolute', inset: 0, background: bg, overflow: 'hidden', ...style }}>{children}</div>;
}
function Grid({ color = 'rgba(255,255,255,0.05)', size = 48, inset = 0 }) {
  return <div style={{
    position: 'absolute', inset,
    backgroundImage: `linear-gradient(${color} 1px,transparent 1px),linear-gradient(90deg,${color} 1px,transparent 1px)`,
    backgroundSize: `${size}px ${size}px`,
  }} />;
}
function Scanlines({ op = 0.05 }) {
  return <div style={{
    position: 'absolute', inset: 0, pointerEvents: 'none',
    background: `repeating-linear-gradient(0deg, rgba(255,255,255,${op}) 0 1px, transparent 1px 3px)`,
  }} />;
}
function useReveal(at, dur = 0.5, ease = Easing.easeOutCubic) {
  const { localTime } = useSprite();
  return ease(clamp((localTime - at) / dur, 0, 1));
}
function Reveal({ at, dur = 0.5, y = 24, ease = Easing.easeOutCubic, children, style }) {
  const e = useReveal(at, dur, ease);
  return <div style={{ opacity: e, transform: `translateY(${(1 - e) * y}px)`, ...style }}>{children}</div>;
}
function exitFade(localTime, duration, exitDur = 0.45) {
  const start = duration - exitDur;
  return 1 - clamp((localTime - start) / exitDur, 0, 1);
}
const naira = (n) => '₦' + n.toFixed(n < 10 ? 1 : 0) + 'M';

// ═══════════════════════════════════════════════════════════════════════════
// 1 — COLD OPEN
// ═══════════════════════════════════════════════════════════════════════════
function SceneColdOpen() {
  const { localTime, duration } = useSprite();
  const fadeIn = Easing.easeOutCubic(clamp(localTime / 0.6, 0, 1));
  const op = Math.min(fadeIn, exitFade(localTime, duration, 0.35));
  const tc = `00:00:${String(Math.floor(localTime)).padStart(2, '0')}:${String(Math.floor(localTime * 24) % 24).padStart(2, '0')}`;
  const full = 'EP.02 — LET THE PITCH BEGIN';
  const typed = full.slice(0, Math.floor(clamp((localTime - 1.2) / 1.6, 0, 1) * full.length));
  const caretOn = Math.sin(localTime * 8) > 0;
  return (
    <Fill bg="#070d0a">
      <Grid color="rgba(63,174,110,0.05)" size={56} />
      <Scanlines op={0.06} />
      <div style={{ position: 'absolute', top: 54, left: 64, opacity: op }}><RecBadge t={localTime} size={24} /></div>
      <div style={{ position: 'absolute', top: 58, right: 64, opacity: 0.7 * op, fontFamily: MONO, fontSize: 18, letterSpacing: '0.25em', color: '#fff' }}>S01 · ON THE RECORD</div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30, opacity: op }}>
        <Waveform t={localTime} width={520} height={120} bars={34} color={C.orange} />
        <div style={{ fontFamily: MONO, fontSize: 30, letterSpacing: '0.16em', color: '#fff', fontWeight: 700, height: 38 }}>
          {typed}<span style={{ opacity: caretOn ? 1 : 0, color: C.orange }}>▌</span>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 54, left: 64, opacity: 0.85 * op, fontFamily: MONO, fontSize: 20, letterSpacing: '0.2em', color: C.orange, fontWeight: 700 }}>{tc}</div>
      <div style={{ position: 'absolute', bottom: 54, right: 64, opacity: 0.5 * op, fontFamily: MONO, fontSize: 16, letterSpacing: '0.25em', color: '#fff' }}>CAM A · 4K · 24FPS</div>
    </Fill>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 2 — TITLE SLAM
// ═══════════════════════════════════════════════════════════════════════════
function SceneTitle() {
  const { localTime, duration } = useSprite();
  const out = exitFade(localTime, duration, 0.4);
  const wipeX = animate({ from: 0, to: 130, start: 0.05, end: 0.7, ease: Easing.easeInOutCubic })(localTime);
  const r1 = Easing.easeOutBack(clamp((localTime - 0.55) / 0.5, 0, 1));
  const r2 = Easing.easeOutBack(clamp((localTime - 0.8) / 0.5, 0, 1));
  return (
    <Fill bg={C.orange} style={{ opacity: out }}>
      <Grid color="rgba(0,0,0,0.05)" size={48} inset={36} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0 }}><HazardBand width={1280} height={34} a={C.ink} b={C.orange} /></div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}><HazardBand width={1280} height={34} a={C.ink} b={C.orange} /></div>
      <div style={{ position: 'absolute', top: 64, left: 64, display: 'flex', alignItems: 'center', gap: 14, fontFamily: MONO, fontWeight: 700, fontSize: 20, letterSpacing: '0.25em', color: C.green }}>
        <span style={{ width: 14, height: 14, borderRadius: '50%', background: C.red, boxShadow: `0 0 0 4px rgba(216,38,29,0.25)` }} />NOW RECORDING
      </div>
      <div style={{ position: 'absolute', top: 66, right: 64, fontFamily: MONO, fontWeight: 700, fontSize: 20, letterSpacing: '0.25em', color: C.green }}>S01 · EP.02</div>
      <div style={{ position: 'absolute', left: 70, top: 196 }}>
        <div style={{ fontFamily: DISPLAY, fontSize: 168, lineHeight: 0.82, color: C.green, letterSpacing: '-0.03em', textTransform: 'uppercase', opacity: clamp(r1, 0, 1), transform: `translateY(${(1 - r1) * 40}px)` }}>IS THIS</div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: 14, opacity: clamp(r2, 0, 1), transform: `translateY(${(1 - r2) * 40}px)` }}>
          <span style={{ fontFamily: DISPLAY, fontSize: 168, lineHeight: 0.82, background: C.green, color: C.orange, padding: '0 22px', transform: 'rotate(-2deg)', display: 'inline-block', marginRight: 16, textTransform: 'uppercase' }}>ON</span>
          <span style={{ fontFamily: DISPLAY, fontSize: 168, lineHeight: 0.82, color: '#fff', WebkitTextStroke: `3px ${C.green}`, letterSpacing: '-0.03em', textTransform: 'uppercase' }}>RECORD?</span>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 64, left: 64, fontFamily: MONO, fontWeight: 700, fontSize: 18, letterSpacing: '0.25em', color: C.green }}>CONSTRUCTION × FINANCE · REMOTE</div>
      <div style={{ position: 'absolute', inset: 0, transform: `translateX(${wipeX}%)`, background: '#070d0a', display: wipeX >= 129 ? 'none' : 'block' }}>
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 40 }}><HazardBand width={720} height={40} a={C.ink} b={C.orange} step={56} /></div>
      </div>
    </Fill>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 3 — THE OLD WAY (redesigned, legible)
// ═══════════════════════════════════════════════════════════════════════════
const PAINS = [
  { label: 'Projects in email & WhatsApp', sub: 'No audit trail' },
  { label: 'Budgets in spreadsheets', sub: 'Version chaos' },
  { label: 'Payments on trust', sub: 'No guarantee' },
  { label: 'Disputes in court', sub: 'Months lost' },
];
// card reveal start times (local), synced to narration beats
const PAIN_AT = [3.6, 7.0, 9.4, 12.8];
function XMark({ t = 0 }) {
  const pulse = 0.85 + 0.15 * Math.sin(t * 3);
  return (
    <div style={{ width: 56, height: 56, borderRadius: 14, background: 'rgba(216,38,29,0.14)', border: `2px solid ${C.red}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transform: `scale(${pulse})` }}>
      <svg width="26" height="26" viewBox="0 0 24 24"><path d="M5 5l14 14M19 5L5 19" stroke={C.red} strokeWidth="3.5" strokeLinecap="round" /></svg>
    </div>
  );
}
function SceneProblem() {
  const { localTime, duration } = useSprite();
  const out = exitFade(localTime, duration);
  const headE = useReveal(0.2, 0.6, Easing.easeOutCubic);
  return (
    <Fill bg={C.green} style={{ opacity: out }}>
      <Grid color="rgba(255,255,255,0.04)" size={52} />
      {/* faint paper texture, low, non-overlapping */}
      <div style={{ position: 'absolute', right: -30, bottom: -40, opacity: 0.06, transform: 'rotate(-8deg)' }}><PaperDoc w={260} h={330} lines={7} /></div>

      {/* left: heading */}
      <div style={{ position: 'absolute', left: 70, top: 150, width: 520 }}>
        <div style={{ fontFamily: MONO, fontSize: 22, letterSpacing: '0.4em', color: C.orange, fontWeight: 700, marginBottom: 26, opacity: headE, transform: `translateY(${(1 - headE) * 16}px)` }}>THE OLD WAY</div>
        <div style={{ fontFamily: DISPLAY, fontSize: 76, lineHeight: 0.98, color: '#fff', letterSpacing: '-0.02em', opacity: headE, transform: `translateY(${(1 - headE) * 22}px)` }}>
          Built on<br />scattered<br />tools.
        </div>
        <Reveal at={16.2} dur={0.6} y={18} style={{ marginTop: 40, display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ width: 56, height: 5, background: C.red, borderRadius: 3 }} />
          <span style={{ fontFamily: BODY, fontWeight: 600, fontSize: 25, color: 'rgba(255,255,255,0.72)', maxWidth: 360 }}>Five players. Not one shared system.</span>
        </Reveal>
      </div>

      {/* right: pain list */}
      <div style={{ position: 'absolute', right: 90, top: 168, width: 520, display: 'flex', flexDirection: 'column', gap: 18 }}>
        {PAINS.map((p, i) => {
          const e = Easing.easeOutBack(clamp((localTime - PAIN_AT[i]) / 0.5, 0, 1));
          return (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 22,
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)',
              borderRadius: 16, padding: '20px 26px',
              opacity: clamp(e, 0, 1), transform: `translateX(${(1 - e) * 50}px)`,
            }}>
              <XMark t={localTime + i} />
              <div>
                <div style={{ fontFamily: DISPLAY, fontSize: 28, color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.04 }}>{p.label}</div>
                <div style={{ fontFamily: MONO, fontSize: 16, color: C.orange2, letterSpacing: '0.08em', marginTop: 4 }}>{p.sub}</div>
              </div>
            </div>
          );
        })}
      </div>
    </Fill>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 4 — ENTER OBELIK (real logo)
// ═══════════════════════════════════════════════════════════════════════════
function SceneLogo() {
  const { localTime, duration } = useSprite();
  const out = exitFade(localTime, duration);
  const logoIn = Easing.easeOutBack(clamp((localTime - 0.3) / 0.85, 0, 1));
  const spin = -200 * (1 - clamp(logoIn, 0, 1)) + localTime * 3;
  const wordIn = Easing.easeOutCubic(clamp((localTime - 1.0) / 0.6, 0, 1));
  const taglineE = useReveal(1.6, 0.6);
  const subE = useReveal(2.2, 0.6);
  const underline = animate({ from: 0, to: 460, start: 1.9, end: 2.7, ease: Easing.easeInOutCubic })(localTime);
  return (
    <Fill bg={C.green} style={{ opacity: out }}>
      <Grid color="rgba(255,255,255,0.04)" size={52} />
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 55% 55% at 50% 40%, rgba(232,120,46,0.22), transparent 70%)` }} />
      <Scanlines op={0.04} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <img src={LOGO} alt="OBELIK" style={{ width: 230, height: 230, transform: `scale(${0.3 + 0.7 * clamp(logoIn, 0, 1)}) rotate(${spin}deg)`, opacity: clamp(logoIn, 0, 1), filter: 'drop-shadow(0 18px 40px rgba(0,0,0,0.45))' }} />
        <div style={{ fontFamily: DISPLAY, fontSize: 96, color: '#fff', letterSpacing: '0.02em', marginTop: 14, opacity: wordIn, transform: `translateY(${(1 - wordIn) * 20}px)` }}>OBELIK</div>
        <div style={{ width: underline, height: 6, background: C.orange, borderRadius: 3, marginTop: 22, marginBottom: 26 }} />
        <div style={{ fontFamily: DISPLAY, fontSize: 40, color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.01em', opacity: taglineE, transform: `translateY(${(1 - taglineE) * 16}px)`, textAlign: 'center' }}>
          One platform. The full project lifecycle.
        </div>
        <div style={{ fontFamily: MONO, fontSize: 21, color: C.orange2, letterSpacing: '0.14em', marginTop: 18, opacity: subE, transform: `translateY(${(1 - subE) * 12}px)` }}>
          CONSTRUCTION × PROCUREMENT · MULTI-CURRENCY · BUILT FOR A GLOBAL INDUSTRY
        </div>
      </div>
    </Fill>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 5 — LIFECYCLE PIPELINE
// ═══════════════════════════════════════════════════════════════════════════
const STAGES = [
  { Icon: IconApply, label: 'APPLY', sub: 'Client applies' },
  { Icon: IconBid, label: 'BID', sub: 'Open tender' },
  { Icon: IconAward, label: 'AWARD', sub: 'Contract signed' },
  { Icon: IconBuild, label: 'BUILD', sub: 'Site execution' },
  { Icon: IconHandover, label: 'HANDOVER', sub: 'PC certificate' },
];
function SceneLifecycle() {
  const { localTime, duration } = useSprite();
  const out = exitFade(localTime, duration);
  const headE = useReveal(0.1, 0.5);
  const NX = [180, 410, 640, 870, 1100], NY = 392;
  const lineW = animate({ from: 0, to: NX[4] - NX[0], start: 0.5, end: 1.5, ease: Easing.easeInOutCubic })(localTime);
  const tokenP = clamp((localTime - 1.5) / 4.2, 0, 1);
  const tokenX = NX[0] + (NX[4] - NX[0]) * Easing.easeInOutCubic(tokenP);
  return (
    <Fill bg={C.green} style={{ opacity: out }}>
      <Grid color="rgba(255,255,255,0.04)" size={52} />
      <div style={{ position: 'absolute', top: 96, left: 0, right: 0, textAlign: 'center', opacity: headE, transform: `translateY(${(1 - headE) * 16}px)` }}>
        <div style={{ fontFamily: MONO, fontSize: 20, letterSpacing: '0.35em', color: C.orange, fontWeight: 700, marginBottom: 14 }}>THE FULL LIFECYCLE</div>
        <div style={{ fontFamily: DISPLAY, fontSize: 60, color: '#fff', letterSpacing: '-0.02em' }}>From application to handover.</div>
      </div>
      <div style={{ position: 'absolute', left: NX[0], top: NY - 3, width: NX[4] - NX[0], height: 6, background: 'rgba(255,255,255,0.14)', borderRadius: 3 }} />
      <div style={{ position: 'absolute', left: NX[0], top: NY - 3, width: lineW, height: 6, background: C.orange, borderRadius: 3 }} />
      {localTime > 1.4 && tokenP < 1 && (
        <div style={{ position: 'absolute', left: tokenX - 12, top: NY - 12, width: 24, height: 24, borderRadius: '50%', background: '#fff', boxShadow: `0 0 0 6px rgba(232,120,46,0.4), 0 0 24px rgba(232,120,46,0.7)` }} />
      )}
      {STAGES.map((st, i) => {
        const passed = tokenX >= NX[i] - 6 || tokenP >= 1;
        const Icon = st.Icon;
        const appear = Easing.easeOutBack(clamp((localTime - 0.5 - i * 0.12) / 0.5, 0, 1));
        return (
          <div key={i} style={{ position: 'absolute', left: NX[i], top: NY, transform: 'translate(-50%,-50%)' }}>
            <div style={{
              width: 96, height: 96, borderRadius: '50%', background: passed ? C.orange : C.green2,
              border: `4px solid ${passed ? C.orange : 'rgba(255,255,255,0.25)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transform: `scale(${(0.6 + 0.4 * clamp(appear, 0, 1)) * (passed ? 1.08 : 1)})`,
              transition: 'background 0.3s, transform 0.25s, border-color 0.3s',
              boxShadow: passed ? '0 10px 30px rgba(232,120,46,0.45)' : 'none', opacity: clamp(appear, 0, 1),
            }}>
              <Icon s={46} c={passed ? C.green : 'rgba(255,255,255,0.6)'} />
            </div>
            <div style={{ position: 'absolute', top: 116, left: '50%', transform: 'translateX(-50%)', textAlign: 'center', width: 180, opacity: clamp(appear, 0, 1) }}>
              <div style={{ fontFamily: DISPLAY, fontSize: 24, color: passed ? '#fff' : 'rgba(255,255,255,0.55)', transition: 'color 0.3s' }}>{st.label}</div>
              <div style={{ fontFamily: MONO, fontSize: 14, color: C.orange2, letterSpacing: '0.1em', marginTop: 6, opacity: passed ? 1 : 0.4, transition: 'opacity 0.3s' }}>{st.sub}</div>
            </div>
          </div>
        );
      })}
    </Fill>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 6 — FIVE PORTALS
// ═══════════════════════════════════════════════════════════════════════════
const PORTALS = [
  { Icon: IconManager, name: 'MANAGER', line: 'Funds projects, runs tenders, approves every payment.' },
  { Icon: IconContractor, name: 'CONTRACTOR', line: 'Wins the bid, runs the site, claims for work done.' },
  { Icon: IconVendor, name: 'VENDOR', line: 'Quotes materials, delivers, invoices, gets paid.' },
  { Icon: IconArchitect, name: 'CONSULTANT', line: 'Certifies the work. Issues the IPC. Signs off.' },
  { Icon: IconAdmin, name: 'ADMIN', line: 'Oversees escrow, approvals, holds & disputes.' },
];
// per-card highlight start times (local), synced to the spoken role list
const PORTAL_AT = [3.8, 5.6, 7.2, 9.0, 10.8];
function ScenePortals() {
  const { localTime, duration } = useSprite();
  const out = exitFade(localTime, duration);
  const headE = useReveal(0.1, 0.5);
  let hi = -1;
  for (let i = 0; i < PORTAL_AT.length; i++) { if (localTime >= PORTAL_AT[i] && localTime < PORTAL_AT[i] + 1.8) hi = i; }
  return (
    <Fill bg={C.green} style={{ opacity: out }}>
      <Grid color="rgba(255,255,255,0.04)" size={52} />
      <div style={{ position: 'absolute', top: 92, left: 0, right: 0, textAlign: 'center', opacity: headE, transform: `translateY(${(1 - headE) * 16}px)` }}>
        <div style={{ fontFamily: MONO, fontSize: 20, letterSpacing: '0.35em', color: C.orange, fontWeight: 700, marginBottom: 14 }}>FIVE PORTALS · ONE PROJECT</div>
        <div style={{ fontFamily: DISPLAY, fontSize: 64, color: '#fff', letterSpacing: '-0.02em' }}>Every role, in its own room.</div>
      </div>
      <div style={{ position: 'absolute', left: 64, right: 64, top: 300, display: 'flex', gap: 22, justifyContent: 'center' }}>
        {PORTALS.map((p, i) => {
          const e = Easing.easeOutBack(clamp((localTime - 0.7 - i * 0.26) / 0.55, 0, 1));
          const lift = hi === i ? 1 : 0;
          const Icon = p.Icon;
          return (
            <div key={i} style={{
              flex: 1, maxWidth: 224, background: C.cream, borderRadius: 18, padding: '30px 24px 28px',
              borderTop: `6px solid ${C.orange}`,
              boxShadow: lift ? '0 26px 48px rgba(0,0,0,0.42)' : '0 18px 36px rgba(0,0,0,0.32)',
              opacity: clamp(e, 0, 1),
              transform: `translateY(${(1 - e) * 56 - lift * 12}px) scale(${0.92 + 0.08 * clamp(e, 0, 1)})`,
              transformOrigin: 'bottom', transition: 'box-shadow 0.4s, transform 0.4s',
            }}>
              <IconTile bg={C.green} size={84}><Icon s={50} c={C.orange} /></IconTile>
              <div style={{ fontFamily: DISPLAY, fontSize: 27, color: C.green, marginTop: 22 }}>{p.name}</div>
              <div style={{ fontFamily: BODY, fontWeight: 500, fontSize: 16.5, lineHeight: 1.4, color: '#5b5346', marginTop: 10 }}>{p.line}</div>
            </div>
          );
        })}
      </div>
    </Fill>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 7 — ESCROW SYSTEM
// ═══════════════════════════════════════════════════════════════════════════
// global money formatter
const money = (n) => '$' + (n >= 10 ? n.toFixed(0) : n.toFixed(n >= 1 ? 1 : 2)) + 'M';
const cash = (n) => '$' + n.toLocaleString('en-US');

// ── Portal mini-UI window (the "explanation" layer) ─────────────────────────
function PortalChrome({ role, roleColor, title, children, clickAt, t, show }) {
  const e = Easing.easeOutCubic(clamp(show, 0, 1));
  // simulated button press
  const press = clickAt != null ? clamp((t - clickAt) / 0.18, 0, 1) - clamp((t - clickAt - 0.18) / 0.18, 0, 1) : 0;
  return (
    <div style={{
      width: 470, background: C.paper, borderRadius: 16, overflow: 'hidden',
      boxShadow: '0 26px 60px rgba(0,0,0,0.5)', border: '1px solid rgba(0,0,0,0.1)',
      opacity: e, transform: `translateY(${(1 - e) * 26}px) scale(${0.96 + 0.04 * e})`,
    }}>
      {/* window bar */}
      <div style={{ height: 44, background: C.green, display: 'flex', alignItems: 'center', padding: '0 16px', gap: 10 }}>
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: roleColor }} />
        <span style={{ fontFamily: MONO, fontSize: 13, letterSpacing: '0.16em', color: '#fff', fontWeight: 700 }}>{role}</span>
        <span style={{ marginLeft: 'auto', fontFamily: MONO, fontSize: 11, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.5)' }}>OBELIK</span>
      </div>
      {/* body */}
      <div style={{ padding: '14px 22px 16px' }}>
        <div style={{ fontFamily: DISPLAY, fontSize: 21, color: C.green, marginBottom: 8 }}>{title}</div>
        {children}
        {clickAt != null && (
          <div data-cta style={{ marginTop: 16, position: 'relative' }}>
            {/* the CTA passed as last child handles its own look; press ring here */}
          </div>
        )}
      </div>
    </div>
  );
}
function Field({ k, v, accent }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '6px 0', borderBottom: '1px solid #e6ddca' }}>
      <span style={{ flexShrink: 0, fontFamily: MONO, fontSize: 12.5, letterSpacing: '0.05em', color: '#9a917e', textTransform: 'uppercase' }}>{k}</span>
      <span style={{ marginLeft: 'auto', whiteSpace: 'nowrap', fontFamily: accent ? DISPLAY : BODY, fontWeight: accent ? 400 : 700, fontSize: accent ? 21 : 15.5, color: accent ? C.green : '#3a352c' }}>{v}</span>
    </div>
  );
}
function Cta({ label, t, clickAt }) {
  const press = clickAt != null ? (clamp((t - clickAt) / 0.16, 0, 1) - clamp((t - clickAt - 0.16) / 0.16, 0, 1)) : 0;
  const done = clickAt != null && t > clickAt + 0.3;
  return (
    <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{
        flex: 1, textAlign: 'center', fontFamily: BODY, fontWeight: 800, fontSize: 15.5, letterSpacing: '0.02em',
        color: C.green, background: C.orange, borderRadius: 10, padding: '11px 0',
        transform: `scale(${1 - press * 0.04})`, boxShadow: press ? 'inset 0 3px 8px rgba(0,0,0,0.25)' : '0 6px 14px rgba(232,120,46,0.4)',
      }}>{label}</div>
      {done && <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 14, color: C.go, display: 'flex', alignItems: 'center', gap: 6 }}>✓ DONE</span>}
    </div>
  );
}

// straight-line token stream, only while its step is active
function FlowTokens({ from, to, active, t, count = 4, speed = 0.5, size = 22, color }) {
  if (!active) return null;
  const items = [];
  for (let i = 0; i < count; i++) {
    const ph = ((t * speed) + i / count) % 1;
    const x = from.x + (to.x - from.x) * ph;
    const y = from.y + (to.y - from.y) * ph;
    items.push(<div key={i} style={{ position: 'absolute', left: x - size / 2, top: y - size / 2, opacity: Math.sin(ph * Math.PI) }}><NairaToken size={size} bg={color || C.orange} /></div>);
  }
  return <>{items}</>;
}
function FlowTokensArc({ p0, p1, p2, active, t, count = 3, speed = 0.45, size = 18, color }) {
  if (!active) return null;
  const items = [];
  for (let i = 0; i < count; i++) {
    const ph = ((t * speed) + i / count) % 1;
    const mt = 1 - ph;
    const x = mt * mt * p0.x + 2 * mt * ph * p1.x + ph * ph * p2.x;
    const y = mt * mt * p0.y + 2 * mt * ph * p1.y + ph * ph * p2.y;
    items.push(<div key={i} style={{ position: 'absolute', left: x - size / 2, top: y - size / 2, opacity: Math.sin(ph * Math.PI) }}><NairaToken size={size} bg={color || C.orange} /></div>);
  }
  return <>{items}</>;
}
function EscrowNode({ x, y, w, h, children, bg = C.cream, border, glow, active }) {
  return (
    <div style={{
      position: 'absolute', left: x - w / 2, top: y - h / 2, width: w, height: h,
      background: bg, borderRadius: 16,
      border: border || (active ? `2px solid ${C.orange}` : '2px solid transparent'),
      boxShadow: (glow || active) ? `0 0 0 3px rgba(232,120,46,0.6), 0 14px 34px rgba(232,120,46,0.3)` : '0 10px 24px rgba(0,0,0,0.3)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4,
      transform: `scale(${active ? 1.05 : 1})`, transition: 'box-shadow 0.35s, transform 0.35s, border-color 0.35s',
    }}>{children}</div>
  );
}

// 6-step choreography (local time). Scene runs ~45s, paced to narration.
const ESTEPS = [
  { s: 6.7,  who: 'OWNER',      label: 'The owner funds the secure escrow wallet' },
  { s: 12.7, who: 'CONTRACTOR', label: 'Contractor raises a claim for completed work' },
  { s: 17.7, who: 'CA',         label: 'Consultant / Architect reviews and issues the IPC' },
  { s: 23.7, who: 'ESCROW',     label: 'Escrow releases payment — net of retention' },
  { s: 29.7, who: 'CONTRACTOR', label: 'Contractor pays a vendor for supply of materials' },
  { s: 35.7, who: 'OWNER',      label: 'Owner pays a vendor directly via a change order' },
];
function SceneEscrow() {
  const { localTime, duration } = useSprite();
  const t = localTime;
  const out = exitFade(localTime, duration);
  const headE = useReveal(0.1, 0.5);

  // node anchors (lower band)
  const OWN = { x: 150, y: 502 }, ESC = { x: 462, y: 502 }, CON = { x: 792, y: 502 }, VEN = { x: 1118, y: 502 };

  let step = -1;
  for (let i = 0; i < ESTEPS.length; i++) { if (t >= ESTEPS[i].s) step = i; }
  const stepEnd = (i) => (i + 1 < ESTEPS.length ? ESTEPS[i + 1].s : 44.5);
  const isActive = (i) => t >= ESTEPS[i].s && t < stepEnd(i);
  const showSince = (i) => clamp((t - ESTEPS[i].s) / 0.5, 0, 1);

  // live balances ($M)
  const fund    = interpolate([6.7, 10.5], [0, 2.5], Easing.easeOutCubic)(t);
  const release = interpolate([23.7, 26.7], [0, 0.9], Easing.easeOutCubic)(t);
  const retention = interpolate([23.7, 26.7], [0, 0.1], Easing.easeOutCubic)(t);
  const cPay    = interpolate([29.7, 32.7], [0, 0.4], Easing.easeOutCubic)(t);
  const oPay    = interpolate([35.7, 38.7], [0, 0.15], Easing.easeOutCubic)(t);
  const escrowBal = fund - release;
  const contractorBal = release - cPay;
  const vendorBal = cPay + oPay;
  const ownerBal = 5.0 - fund - oPay;

  const ipcGate = t >= 22.8; // release only flows after the IPC is issued

  // portal popup content by active step
  function Popup() {
    if (step < 0) return null;
    const common = { t, show: showSince(step) };
    if (step === 0) return (
      <PortalChrome role="OWNER PORTAL" roleColor={C.orange} title="Fund Escrow Wallet" {...common}>
        <Field k="Project" v="Harbour Tower A" />
        <Field k="Contract sum" v={cash(2500000)} />
        <Field k="Currency" v="USD · multi-ccy" />
        <Cta label="Fund Escrow" t={t} clickAt={ESTEPS[0].s + 1.6} />
      </PortalChrome>
    );
    if (step === 1) return (
      <PortalChrome role="CONTRACTOR PORTAL" roleColor="#5ec6f0" title="Raise Payment Claim" {...common}>
        <Field k="Milestone" v="M2 · Substructure" />
        <Field k="Work completed" v={cash(1000000)} />
        <Field k="Supporting docs" v="4 attached" />
        <Cta label="Submit Claim to CA" t={t} clickAt={ESTEPS[1].s + 1.8} />
      </PortalChrome>
    );
    if (step === 2) return (
      <PortalChrome role="CA PORTAL · CONSULTANT / ARCHITECT" roleColor="#b388f0" title="Issue Interim Payment Certificate" {...common}>
        <Field k="Claim" v="#2 · Substructure" />
        <Field k="Certified work done" v={cash(1000000)} />
        <Field k="Less retention (10%)" v={'– ' + cash(100000)} />
        <Field k="Net payable" v={cash(900000)} accent />
        <Cta label="Issue IPC #2" t={t} clickAt={ESTEPS[2].s + 2.0} />
      </PortalChrome>
    );
    if (step === 3) return (
      <PortalChrome role="OBELIK ESCROW · AUTOMATED" roleColor={C.orange} title="Releasing Certified Payment" {...common}>
        <Field k="Trigger" v="IPC #2 received ✓" />
        <Field k="Release to contractor" v={cash(900000)} accent />
        <Field k="Retention held in escrow" v={cash(100000)} />
        <div style={{ marginTop: 14, height: 8, background: '#e6ddca', borderRadius: 5, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${clamp(interpolate([23.7, 26.7], [0, 100])(t), 0, 100)}%`, background: C.orange, borderRadius: 5 }} />
        </div>
      </PortalChrome>
    );
    if (step === 4) return (
      <PortalChrome role="CONTRACTOR PORTAL" roleColor="#5ec6f0" title="Pay Vendor — Supply of Materials" {...common}>
        <Field k="Vendor" v="SteelLine Co." />
        <Field k="Purchase order" v="Rebar &amp; cement" />
        <Field k="Amount" v={cash(400000)} accent />
        <Cta label="Pay from my escrow" t={t} clickAt={ESTEPS[4].s + 1.8} />
      </PortalChrome>
    );
    return (
      <PortalChrome role="OWNER PORTAL" roleColor={C.orange} title="Change Order — Pay Vendor Direct" {...common}>
        <Field k="Change order" v="CO-05 · Approved" />
        <Field k="Direct supply" v="Façade glazing units" />
        <Field k="Amount" v={cash(150000)} accent />
        <Cta label="Pay Vendor" t={t} clickAt={ESTEPS[5].s + 1.8} />
      </PortalChrome>
    );
  }

  // which node the popup points to
  const popupActor = step < 0 ? null : ESTEPS[step].who;
  const actorX = { OWNER: OWN.x, CONTRACTOR: CON.x, CA: 640, ESCROW: ESC.x, VENDOR: VEN.x }[popupActor] || 640;

  return (
    <Fill bg={C.green} style={{ opacity: out }}>
      <Grid color="rgba(255,255,255,0.04)" size={52} />
      <div style={{ position: 'absolute', top: 40, left: 0, right: 0, textAlign: 'center', opacity: headE, transform: `translateY(${(1 - headE) * 14}px)` }}>
        <div style={{ fontFamily: MONO, fontSize: 18, letterSpacing: '0.35em', color: C.orange, fontWeight: 700, marginBottom: 8 }}>THE ESCROW SYSTEM</div>
        <div style={{ fontFamily: DISPLAY, fontSize: 40, color: '#fff', letterSpacing: '-0.02em' }}>Money moves only when work is proven.</div>
      </div>

      {/* connector rails */}
      <svg width="1280" height="720" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <defs>
          <marker id="ah" markerWidth="9" markerHeight="9" refX="6" refY="4.5" orient="auto"><path d="M0 0L9 4.5L0 9z" fill={C.orange} /></marker>
        </defs>
        <line x1={OWN.x + 92} y1={OWN.y} x2={ESC.x - 116} y2={ESC.y} stroke={isActive(0) ? C.orange : 'rgba(255,255,255,0.18)'} strokeWidth="3" strokeDasharray="2 9" strokeLinecap="round" strokeDashoffset={-t * 34} markerEnd={isActive(0) ? 'url(#ah)' : ''} />
        <line x1={ESC.x + 116} y1={ESC.y} x2={CON.x - 92} y2={CON.y} stroke={isActive(3) ? C.orange : 'rgba(255,255,255,0.18)'} strokeWidth="3" strokeDasharray="2 9" strokeLinecap="round" strokeDashoffset={-t * 34} markerEnd={isActive(3) ? 'url(#ah)' : ''} />
        <line x1={CON.x + 92} y1={CON.y} x2={VEN.x - 88} y2={VEN.y} stroke={isActive(4) ? C.orange : 'rgba(255,255,255,0.18)'} strokeWidth="3" strokeDasharray="2 9" strokeLinecap="round" strokeDashoffset={-t * 34} markerEnd={isActive(4) ? 'url(#ah)' : ''} />
        <path d={`M ${OWN.x} ${OWN.y + 88} Q 634 642 ${VEN.x} ${VEN.y + 88}`} fill="none" stroke={isActive(5) ? C.orange : 'rgba(255,255,255,0.12)'} strokeWidth="3" strokeDasharray="2 10" strokeLinecap="round" strokeDashoffset={-t * 34} />
        {/* pointer from popup down to active actor */}
        {step >= 0 && <line x1={actorX} y1={406} x2={actorX} y2={OWN.y - 76} stroke="rgba(232,120,46,0.5)" strokeWidth="2" strokeDasharray="3 6" />}
      </svg>

      {/* token flows */}
      <FlowTokens from={OWN} to={ESC} active={isActive(0)} t={t} count={4} />
      <FlowTokens from={ESC} to={CON} active={isActive(3) && ipcGate} t={t} count={4} />
      <FlowTokens from={CON} to={VEN} active={isActive(4)} t={t} count={3} size={18} />
      <FlowTokensArc p0={{ x: OWN.x, y: OWN.y + 88 }} p1={{ x: 634, y: 642 }} p2={{ x: VEN.x, y: VEN.y + 88 }} active={isActive(5)} t={t} count={3} size={16} />

      {/* portal popup */}
      <div style={{ position: 'absolute', top: 110, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
        <Popup />
      </div>

      {/* OWNER */}
      <EscrowNode x={OWN.x} y={OWN.y} w={176} h={146} active={isActive(0) || isActive(5)}>
        <IconTile bg={C.green} size={52}><IconWallet s={32} c={C.orange} /></IconTile>
        <div style={{ fontFamily: DISPLAY, fontSize: 19, color: C.green, marginTop: 2 }}>OWNER</div>
        <div style={{ fontFamily: DISPLAY, fontSize: 23, color: C.green }}>{money(ownerBal)}</div>
      </EscrowNode>

      {/* ESCROW vault */}
      <EscrowNode x={ESC.x} y={ESC.y} w={210} h={178} bg={C.green2} active={isActive(0) || isActive(3)} glow>
        <IconVault s={44} c={C.orange} />
        <div style={{ fontFamily: DISPLAY, fontSize: 18, color: '#fff' }}>OBELIK ESCROW</div>
        <div style={{ fontFamily: DISPLAY, fontSize: 32, color: C.orange }}>{money(escrowBal)}</div>
        <div style={{ fontFamily: MONO, fontSize: 10.5, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.08em' }}>SECURE · FIN-TECH BACKED</div>
      </EscrowNode>

      {/* CONTRACTOR */}
      <EscrowNode x={CON.x} y={CON.y} w={176} h={146} active={isActive(3) || isActive(4)}>
        <IconTile bg={C.green} size={52}><IconContractor s={32} c={C.orange} /></IconTile>
        <div style={{ fontFamily: DISPLAY, fontSize: 18, color: C.green, marginTop: 2 }}>CONTRACTOR</div>
        <div style={{ fontFamily: DISPLAY, fontSize: 23, color: C.green }}>{money(contractorBal)}</div>
      </EscrowNode>

      {/* VENDOR */}
      <EscrowNode x={VEN.x} y={VEN.y} w={168} h={146} active={isActive(4) || isActive(5)}>
        <IconTile bg={C.green} size={52}><IconVendor s={32} c={C.orange} /></IconTile>
        <div style={{ fontFamily: DISPLAY, fontSize: 19, color: C.green, marginTop: 2 }}>VENDOR</div>
        <div style={{ fontFamily: DISPLAY, fontSize: 23, color: C.green }}>{money(vendorBal)}</div>
      </EscrowNode>

      {/* retention chip under escrow */}
      <div style={{ position: 'absolute', left: ESC.x - 96, top: ESC.y + 100, width: 192, opacity: clamp(interpolate([23.7, 25.3], [0, 1])(t), 0, 1), background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.16)', borderRadius: 11, padding: '7px 13px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontFamily: MONO, fontSize: 11.5, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.06em' }}>RETENTION HELD</span>
        <span style={{ fontFamily: DISPLAY, fontSize: 20, color: '#fff', marginLeft: 'auto' }}>{money(retention)}</span>
      </div>

      {/* step caption bar */}
      <div style={{ position: 'absolute', bottom: 30, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, background: 'rgba(7,13,10,0.78)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 40, padding: '11px 24px' }}>
          <span style={{ fontFamily: DISPLAY, fontSize: 17, color: C.green, background: C.orange, borderRadius: 20, padding: '4px 14px' }}>{t >= 41.0 ? '✓' : step < 0 ? '–' : `${step + 1}/6`}</span>
          <span style={{ fontFamily: BODY, fontWeight: 600, fontSize: 22, color: '#fff' }}>{t >= 41.0 ? 'Every balance is live — straight from the ledger.' : step < 0 ? 'Funds stay locked until certified work unlocks them.' : ESTEPS[step].label}</span>
        </div>
      </div>
    </Fill>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 8 — MANAGER PORTAL (focus + fade out)
// ═══════════════════════════════════════════════════════════════════════════
const NAV = [
  { Icon: IconManager, label: 'Dashboard', active: true },
  { Icon: IconBid, label: 'Tenders' },
  { Icon: IconAward, label: 'Bids' },
  { Icon: IconWallet, label: 'Payments' },
  { Icon: IconBuild, label: 'Projects' },
  { Icon: IconVault, label: 'Escrow' },
];
const STATS = [
  { k: 'Escrow Balance', v: '$2.5M', accent: true },
  { k: 'Open Tenders', v: '3' },
  { k: 'Pending Approvals', v: '5' },
  { k: 'Active Projects', v: '8' },
];
const BIDS = [
  { co: 'Harbour Civil Works', amt: '$2.48M', score: '92' },
  { co: 'Northgate Construction', amt: '$2.61M', score: '87' },
  { co: 'Meridian Infrastructure', amt: '$2.55M', score: '81' },
];
function SceneManager() {
  const { localTime, duration } = useSprite();
  const dashIn = Easing.easeOutCubic(clamp(localTime / 0.8, 0, 1));
  const overlay = Easing.easeOutCubic(clamp((localTime - 4.2) / 0.9, 0, 1)); // focus card
  const blackout = clamp((localTime - (duration - 1.6)) / 1.6, 0, 1); // fade to black
  return (
    <Fill bg="#0c1812">
      <Grid color="rgba(255,255,255,0.04)" size={52} />
      {/* dashboard panel */}
      <div style={{
        position: 'absolute', left: 70, top: 96, width: 1140, height: 528,
        background: C.paper, borderRadius: 18, overflow: 'hidden',
        boxShadow: '0 30px 70px rgba(0,0,0,0.5)',
        opacity: dashIn, transform: `translateY(${(1 - dashIn) * 40}px) scale(${0.97 + 0.03 * dashIn})`,
        display: 'flex', flexDirection: 'column',
      }}>
        {/* top bar */}
        <div style={{ height: 64, background: '#fff', borderBottom: '1px solid #e6ddca', display: 'flex', alignItems: 'center', padding: '0 24px', gap: 14 }}>
          <img src={LOGO} alt="" style={{ width: 36, height: 36 }} />
          <span style={{ fontFamily: DISPLAY, fontSize: 22, color: C.green, letterSpacing: '0.02em' }}>OBELIK</span>
          <span style={{ fontFamily: MONO, fontSize: 14, color: '#9a917e', letterSpacing: '0.1em' }}>/ MANAGER PORTAL</span>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontFamily: MONO, fontSize: 13, color: C.green, background: '#f0e7d4', borderRadius: 20, padding: '7px 14px', fontWeight: 700, letterSpacing: '0.06em' }}>$2.5M ESCROW</span>
            <div style={{ width: 38, height: 38, borderRadius: '50%', background: C.green, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: DISPLAY, fontSize: 16 }}>M</div>
          </div>
        </div>
        <div style={{ flex: 1, display: 'flex' }}>
          {/* sidebar */}
          <div style={{ width: 214, background: C.green, padding: '20px 14px', display: 'flex', flexDirection: 'column', gap: 6 }}>
            {NAV.map((n, i) => {
              const Icon = n.Icon;
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 10, background: n.active ? C.orange : 'transparent' }}>
                  <Icon s={22} c={n.active ? C.green : 'rgba(255,255,255,0.7)'} />
                  <span style={{ fontFamily: BODY, fontWeight: n.active ? 700 : 500, fontSize: 16, color: n.active ? C.green : 'rgba(255,255,255,0.8)' }}>{n.label}</span>
                </div>
              );
            })}
          </div>
          {/* content */}
          <div style={{ flex: 1, padding: '26px 28px' }}>
            <div style={{ fontFamily: DISPLAY, fontSize: 26, color: C.green, marginBottom: 18 }}>Welcome back, Manager.</div>
            <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
              {STATS.map((s, i) => {
                const e = Easing.easeOutBack(clamp((localTime - 0.7 - i * 0.14) / 0.5, 0, 1));
                return (
                  <div key={i} style={{ flex: 1, background: s.accent ? C.green : '#fff', borderRadius: 14, padding: '18px 20px', border: '1px solid #e6ddca', opacity: clamp(e, 0, 1), transform: `translateY(${(1 - e) * 24}px)` }}>
                    <div style={{ fontFamily: MONO, fontSize: 12.5, letterSpacing: '0.08em', color: s.accent ? C.orange2 : '#9a917e', textTransform: 'uppercase' }}>{s.k}</div>
                    <div style={{ fontFamily: DISPLAY, fontSize: 34, color: s.accent ? '#fff' : C.green, marginTop: 8 }}>{s.v}</div>
                  </div>
                );
              })}
            </div>
            <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e6ddca', padding: '18px 22px', opacity: clamp(Easing.easeOutCubic(clamp((localTime - 1.4) / 0.6, 0, 1)), 0, 1) }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontFamily: DISPLAY, fontSize: 19, color: C.green }}>Bids awaiting your review</span>
                <span style={{ marginLeft: 'auto', fontFamily: MONO, fontSize: 13, color: C.orange, fontWeight: 700 }}>3 NEW</span>
              </div>
              {BIDS.map((b, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px 0', borderTop: i ? '1px solid #f0e7d4' : 'none' }}>
                  <div style={{ width: 38, height: 38, borderRadius: 9, background: C.cream, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: DISPLAY, fontSize: 15, color: C.green }}>{b.co[0]}</div>
                  <span style={{ fontFamily: BODY, fontWeight: 600, fontSize: 16.5, color: C.green, flex: 1 }}>{b.co}</span>
                  <span style={{ fontFamily: MONO, fontSize: 15, color: '#5b5346' }}>{b.amt}</span>
                  <span style={{ fontFamily: MONO, fontSize: 13, color: C.green, background: '#eaf5ee', borderRadius: 6, padding: '4px 10px', fontWeight: 700 }}>SCORE {b.score}</span>
                  <span style={{ fontFamily: BODY, fontWeight: 700, fontSize: 14, color: C.green, background: C.orange, borderRadius: 8, padding: '8px 16px' }}>Review</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* focus overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(7,13,10,0.93)', opacity: overlay, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
        <img src={LOGO} alt="" style={{ width: 96, height: 96, marginBottom: 24, transform: `scale(${0.6 + 0.4 * overlay})` }} />
        <div style={{ fontFamily: MONO, fontSize: 20, letterSpacing: '0.4em', color: C.orange, fontWeight: 700, marginBottom: 18 }}>TODAY&rsquo;S EPISODE</div>
        <div style={{ fontFamily: DISPLAY, fontSize: 110, color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 0.9, textAlign: 'center' }}>The Manager<br />Portal</div>
        <div style={{ marginTop: 30, display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ width: 50, height: 4, background: C.orange, borderRadius: 2 }} />
          <span style={{ fontFamily: MONO, fontSize: 20, fontWeight: 700, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.8)' }}>IS THIS ON RECORD? · EP.02</span>
          <span style={{ width: 50, height: 4, background: C.orange, borderRadius: 2 }} />
        </div>
      </div>

      {/* fade to black */}
      <div style={{ position: 'absolute', inset: 0, background: '#000', opacity: blackout, pointerEvents: 'none' }} />
    </Fill>
  );
}

Object.assign(window, {
  SceneColdOpen, SceneTitle, SceneProblem, SceneLogo, SceneLifecycle, ScenePortals, SceneEscrow, SceneManager,
});
