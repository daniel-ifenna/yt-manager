// cinematic.jsx — Web Audio sound design + film overlay for the OBELIK opening.
const { useTimeline, clamp } = window;

// ═══════════════════════════════════════════════════════════════════════════
// SOUND ENGINE — all SFX synthesised (no asset files needed)
// ═══════════════════════════════════════════════════════════════════════════
function createSound() {
  let ctx = null, master = null, pad = null, padFreqs = null;
  function ensure() {
    if (!ctx) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      master = ctx.createGain();
      master.gain.value = 0.5;
      master.connect(ctx.destination);
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }
  function noise(dur) {
    const len = Math.floor(ctx.sampleRate * dur);
    const b = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = b.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    return b;
  }
  const env = (g, t, a, peak, d) => {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + a);
    g.gain.exponentialRampToValueAtTime(0.0001, t + a + d);
  };
  return {
    ensure,
    resume() { if (ctx && ctx.state === 'suspended') ctx.resume(); },
    suspend() { if (ctx && ctx.state === 'running') ctx.suspend(); },
    whoosh() {
      ensure(); const t = ctx.currentTime;
      const s = ctx.createBufferSource(); s.buffer = noise(0.6);
      const f = ctx.createBiquadFilter(); f.type = 'bandpass';
      f.frequency.setValueAtTime(300, t);
      f.frequency.exponentialRampToValueAtTime(2600, t + 0.28);
      f.frequency.exponentialRampToValueAtTime(380, t + 0.6);
      f.Q.value = 0.8;
      const g = ctx.createGain(); env(g, t, 0.14, 0.35, 0.42);
      s.connect(f); f.connect(g); g.connect(master); s.start(t); s.stop(t + 0.62);
    },
    impact() {
      ensure(); const t = ctx.currentTime;
      const o = ctx.createOscillator(); o.type = 'sine';
      o.frequency.setValueAtTime(150, t); o.frequency.exponentialRampToValueAtTime(38, t + 0.45);
      const g = ctx.createGain(); g.gain.setValueAtTime(0.7, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.55);
      o.connect(g); g.connect(master); o.start(t); o.stop(t + 0.55);
      const s = ctx.createBufferSource(); s.buffer = noise(0.12);
      const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 1400;
      const g2 = ctx.createGain(); g2.gain.setValueAtTime(0.35, t); g2.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
      s.connect(f); f.connect(g2); g2.connect(master); s.start(t); s.stop(t + 0.12);
    },
    click() {
      ensure(); const t = ctx.currentTime;
      const o = ctx.createOscillator(); o.type = 'square';
      o.frequency.setValueAtTime(900, t); o.frequency.setValueAtTime(640, t + 0.025);
      const g = ctx.createGain(); env(g, t, 0.004, 0.16, 0.07);
      o.connect(g); g.connect(master); o.start(t); o.stop(t + 0.09);
    },
    coin() {
      ensure(); const t = ctx.currentTime;
      [988, 1319].forEach((fq, i) => {
        const o = ctx.createOscillator(); o.type = 'triangle'; o.frequency.value = fq;
        const g = ctx.createGain(); const ts = t + i * 0.07; env(g, ts, 0.008, 0.24, 0.24);
        o.connect(g); g.connect(master); o.start(ts); o.stop(ts + 0.26);
      });
    },
    stamp() { // CA certificate "ka-chunk"
      ensure(); const t = ctx.currentTime;
      const s = ctx.createBufferSource(); s.buffer = noise(0.1);
      const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 600;
      const g = ctx.createGain(); g.gain.setValueAtTime(0.4, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.1);
      s.connect(f); f.connect(g); g.connect(master); s.start(t); s.stop(t + 0.1);
      const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.setValueAtTime(180, t); o.frequency.exponentialRampToValueAtTime(70, t + 0.12);
      const g2 = ctx.createGain(); g2.gain.setValueAtTime(0.4, t); g2.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
      o.connect(g2); g2.connect(master); o.start(t); o.stop(t + 0.16);
    },
    beep() {
      ensure(); const t = ctx.currentTime;
      const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = 1000;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.18, t + 0.01);
      g.gain.setValueAtTime(0.18, t + 0.08); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.13);
      o.connect(g); g.connect(master); o.start(t); o.stop(t + 0.13);
    },
    chime() { // logo reveal shimmer
      ensure(); const t = ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.5].forEach((fq, i) => {
        const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = fq;
        const g = ctx.createGain(); const ts = t + i * 0.06; env(g, ts, 0.01, 0.16, 0.6);
        o.connect(g); g.connect(master); o.start(ts); o.stop(ts + 0.65);
      });
    },
    padOn(freqs = [55, 82.41, 110]) {
      ensure(); if (pad) return; padFreqs = freqs;
      pad = ctx.createGain(); pad.gain.setValueAtTime(0.0001, ctx.currentTime);
      pad.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 3);
      pad.connect(master);
      freqs.forEach((fq) => {
        const o = ctx.createOscillator(); o.type = 'sawtooth'; o.frequency.value = fq;
        const lfo = ctx.createOscillator(); lfo.type = 'sine'; lfo.frequency.value = 0.08;
        const lg = ctx.createGain(); lg.gain.value = 2.5; lfo.connect(lg); lg.connect(o.frequency);
        const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 320; f.Q.value = 0.6;
        o.connect(f); f.connect(pad); o.start(); lfo.start();
      });
    },
    padOff() { if (pad) { try { pad.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 1.2); } catch (e) {} pad = null; } },
  };
}
window.OBELIK_SOUND = window.OBELIK_SOUND || createSound();

// ═══════════════════════════════════════════════════════════════════════════
// SFX DIRECTOR — fires cues as the master clock crosses them
// ═══════════════════════════════════════════════════════════════════════════
const SFX_CUES = [
  { t: 1.6,  type: 'beep' },
  { t: 4.4,  type: 'impact' }, { t: 4.45, type: 'whoosh' },
  { t: 7.0,  type: 'whoosh' },
  { t: 27.0, type: 'impact' }, { t: 27.1, type: 'chime' },
  { t: 35.8, type: 'whoosh' },
  { t: 43.8, type: 'whoosh' },
  { t: 47.6, type: 'click' }, { t: 49.4, type: 'click' }, { t: 51.0, type: 'click' }, { t: 52.8, type: 'click' }, { t: 54.6, type: 'click' },
  { t: 57.8, type: 'whoosh' },
  { t: 64.5, type: 'click' }, { t: 66.1, type: 'coin' },
  { t: 70.5, type: 'click' },
  { t: 75.5, type: 'click' }, { t: 75.7, type: 'stamp' },
  { t: 81.5, type: 'coin' }, { t: 81.6, type: 'whoosh' },
  { t: 87.5, type: 'coin' },
  { t: 93.5, type: 'coin' },
  { t: 102.3, type: 'impact' }, { t: 102.5, type: 'whoosh' },
];
const IMPACT_TIMES = SFX_CUES.filter(c => c.type === 'impact' || c.type === 'coin' || c.type === 'stamp').map(c => c.t);
const WHOOSH_TIMES = SFX_CUES.filter(c => c.type === 'whoosh').map(c => c.t);
window.OBELIK_IMPACTS = IMPACT_TIMES;
window.OBELIK_WHOOSHES = WHOOSH_TIMES;

function SfxDirector() {
  const { time, playing, duration } = useTimeline();
  const S = window.OBELIK_SOUND;
  const last = React.useRef(0);
  const started = React.useRef(false);
  React.useEffect(() => {
    if (playing) { S.resume(); if (!started.current) { started.current = true; S.padOn(); } }
    else { S.suspend(); }
  }, [playing]);
  React.useEffect(() => {
    const prev = last.current; const now = time; last.current = now;
    if (!playing) return;
    if (now < prev - 0.2) return;           // seeked backward — don't machine-gun
    for (const c of SFX_CUES) if (c.t > prev && c.t <= now) { try { S[c.type](); } catch (e) {} }
    if (now > duration - 1.4) S.padOff();
  }, [time, playing]);
  return null;
}

// ═══════════════════════════════════════════════════════════════════════════
// CINEMATIC OVERLAY — grain, vignette, letterbox, impact flash, light leaks
// ═══════════════════════════════════════════════════════════════════════════
const GRAIN_URI = "data:image/svg+xml;utf8," + encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(#n)' opacity='0.55'/></svg>"
);

function CinematicOverlay() {
  const { time, playing } = useTimeline();
  const t = time;
  // impact flash: quick decay after each impact/coin/stamp time
  let flash = 0;
  for (const it of (window.OBELIK_IMPACTS || [])) { if (t >= it && t < it + 0.4) flash = Math.max(flash, 1 - (t - it) / 0.4); }
  // light leak: sweeps across on whoosh/transition times
  let leak = 0, leakX = 0;
  for (const wt of (window.OBELIK_WHOOSHES || [])) { if (t >= wt - 0.1 && t < wt + 0.7) { const p = (t - (wt - 0.1)) / 0.8; leak = Math.max(leak, Math.sin(clamp(p, 0, 1) * Math.PI) * 0.5); leakX = -20 + p * 140; } }

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 20, overflow: 'hidden' }}>
      {/* vignette */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 78% 80% at 50% 48%, transparent 52%, rgba(0,0,0,0.42) 100%)' }} />
      {/* film grain */}
      <div style={{ position: 'absolute', inset: -40, backgroundImage: `url("${GRAIN_URI}")`, backgroundSize: '320px 320px', opacity: playing ? 0.07 : 0.05, mixBlendMode: 'overlay', animation: 'obgrain 0.5s steps(3) infinite' }} />
      {/* subtle scanline sheen */}
      <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.02) 0 1px, transparent 1px 3px)', mixBlendMode: 'overlay', opacity: 0.5 }} />
      {/* light leak */}
      {leak > 0.01 && (
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: `${leakX}%`, width: '46%', background: 'radial-gradient(ellipse 60% 100% at 50% 50%, rgba(232,120,46,0.5), transparent 70%)', opacity: leak, mixBlendMode: 'screen', filter: 'blur(24px)' }} />
      )}
      {/* impact flash */}
      {flash > 0.01 && <div style={{ position: 'absolute', inset: 0, background: '#fff', opacity: flash * 0.35, mixBlendMode: 'screen' }} />}
      {/* cinematic letterbox */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 22, background: '#000' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 22, background: '#000' }} />
      <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.4)' }} />
    </div>
  );
}

Object.assign(window, { SfxDirector, CinematicOverlay });
