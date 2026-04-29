import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence, useInView } from 'framer-motion';
import whitelogo from './assets/logo_white.png';

/* ─── DATA ──────────────────────────────────────────────────── */
const servicesData = [
  {
    title: 'IT Consultation & Support',
    desc: 'We act as your outsourced IT department, providing maintenance, security, and infrastructure support.',
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="22" height="22"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>),
    number: '01',
  },
  {
    title: 'App & Web Development',
    desc: 'We build custom software and web applications, creating automation tools to streamline your business workflows.',
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="22" height="22"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>),
    number: '02',
  },
  {
    title: 'Supply of IT Equipment',
    desc: 'Strategic sourcing and setup of enterprise-grade IT equipment for growing businesses.',
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="22" height="22"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>),
    number: '03',
  },
  {
    title: 'Device Repair & Support',
    desc: 'Professional diagnostics and repairs to ensure your team is back online as soon as possible.',
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="22" height="22"><circle cx="12" cy="12" r="3" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 19.07a10 10 0 0 1 0-14.14" /></svg>),
    number: '04',
  },
];

const aboutCardsData = [
  { title: 'Personalized Solutions', desc: 'Tailored tech solutions to meet your unique needs.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg> },
  { title: 'Reliability & Support', desc: 'Dependable support to keep your systems running.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg> },
  { title: 'Innovation & Expertise', desc: 'Cutting-edge solutions backed by deep expertise.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" /></svg> },
  { title: 'Holistic IT Coverage', desc: 'Comprehensive services for all your IT needs.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg> },
];

const NAV_ITEMS = ['Home', 'Services', 'About Us', 'Contact Us'];

const MARQUEE_ITEMS = [
  'IT Consultation', 'Web Development', 'Device Repair', 'IT Equipment',
  'Cloud Support', 'Automation', 'Security', 'Infrastructure',
  'IT Consultation', 'Web Development', 'Device Repair', 'IT Equipment',
];

const STATS = [
  { target: 100, suffix: '+', label: 'Clients Supported' },
  { target: 24,  suffix: '/7', label: 'Response Available' },
  { target: 98,  suffix: '%', label: 'Uptime Delivered' },
  { target: 5,   suffix: '★', label: 'Client Satisfaction' },
];

/* ─── ANIMATED COUNTER ──────────────────────────────────────── */
function Counter({ target, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1400;
    const step = 16;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, step);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── MAGNETIC BUTTON ───────────────────────────────────────── */
function MagneticBtn({ children, className, onClick, type, disabled }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });

  const handleMouseMove = (e) => {
    if (disabled) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.button
      ref={ref} className={className} style={{ x: sx, y: sy }}
      onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      onClick={onClick} type={type || 'button'} disabled={disabled}
    >
      {children}
    </motion.button>
  );
}

/* ─── FLOATING LABEL INPUT ──────────────────────────────────── */
function FloatingInput({ name, type = 'text', label, value, onChange, required, textarea }) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  const baseStyle = {
    width: '100%', padding: textarea ? '28px 16px 10px' : '22px 16px 8px',
    borderRadius: '10px', border: `1px solid ${focused ? 'rgba(250,204,21,0.4)' : 'rgba(255,255,255,0.08)'}`,
    fontSize: '14px', fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
    color: '#e8e8e2', background: focused ? 'rgba(250,204,21,0.04)' : 'rgba(255,255,255,0.04)',
    outline: 'none', transition: 'border-color .18s, background .18s',
    resize: textarea ? 'vertical' : undefined,
    minHeight: textarea ? '130px' : undefined,
  };

  const labelStyle = {
    position: 'absolute', left: '16px',
    top: active ? '8px' : textarea ? '18px' : '50%',
    transform: (!textarea && !active) ? 'translateY(-50%)' : 'none',
    fontSize: active ? '10px' : '14px',
    fontWeight: active ? 700 : 300,
    color: focused ? '#facc15' : active ? '#666' : '#444',
    transition: 'all .18s ease',
    pointerEvents: 'none',
    letterSpacing: active ? '.08em' : 0,
    textTransform: active ? 'uppercase' : 'none',
  };

  return (
    <div style={{ position: 'relative' }}>
      <label style={labelStyle}>{label}</label>
      {textarea
        ? <textarea name={name} style={baseStyle} value={value} onChange={onChange} required={required} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} rows={5} />
        : <input name={name} type={type} style={baseStyle} value={value} onChange={onChange} required={required} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
      }
    </div>
  );
}

/* ─── TOAST ─────────────────────────────────────────────────── */
function Toast({ message, type, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3800);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 320, damping: 26 }}
      style={{
        position: 'fixed', bottom: '32px', left: '50%', transform: 'translateX(-50%)',
        zIndex: 99999, display: 'flex', alignItems: 'center', gap: '12px',
        padding: '14px 22px', borderRadius: '14px',
        background: type === 'success' ? 'rgba(20,40,24,0.95)' : 'rgba(40,16,16,0.95)',
        border: `1px solid ${type === 'success' ? 'rgba(34,197,94,0.35)' : 'rgba(239,68,68,0.35)'}`,
        backdropFilter: 'blur(24px)', boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
        color: type === 'success' ? '#4ade80' : '#f87171',
        fontSize: '14px', fontWeight: 600, fontFamily: "'DM Sans', sans-serif",
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{
        width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: type === 'success' ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)',
        fontSize: '12px', fontWeight: 800,
      }}>
        {type === 'success' ? '✓' : '✕'}
      </span>
      {message}
    </motion.div>
  );
}

/* ─── PARTICLES ─────────────────────────────────────────────── */
function Particles() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);
    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.3,
      dx: (Math.random() - 0.5) * 0.22,
      dy: (Math.random() - 0.5) * 0.22,
      alpha: Math.random() * 0.35 + 0.08,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(250,204,21,${p.alpha})`;
        ctx.fill();
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />;
}

/* ─── MARQUEE ───────────────────────────────────────────────── */
function Marquee() {
  return (
    <div style={{ overflow: 'hidden', padding: '18px 0', borderTop: '1px solid rgba(250,204,21,0.15)', borderBottom: '1px solid rgba(250,204,21,0.15)', background: 'rgba(250,204,21,0.03)' }}>
      <motion.div style={{ display: 'flex', gap: '48px', width: 'max-content' }} animate={{ x: ['0%', '-50%'] }} transition={{ duration: 22, ease: 'linear', repeat: Infinity }}>
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px', color: '#888', fontSize: '13px', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
            <span style={{ color: '#facc15', fontSize: '8px' }}>◆</span>{item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── FADE UP ───────────────────────────────────────────────── */
function FadeUp({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

/* ─── GRID BG ───────────────────────────────────────────────── */
function GridBg() {
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(250,204,21,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(250,204,21,0.04) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
      <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(250,204,21,0.12) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      <div style={{ position: 'absolute', top: '40%', right: '-10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(250,204,21,0.08) 0%, transparent 70%)', filter: 'blur(50px)' }} />
      <div style={{ position: 'absolute', bottom: '10%', left: '30%', width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(250,204,21,0.07) 0%, transparent 70%)', filter: 'blur(60px)' }} />
    </div>
  );
}

/* ─── MAIN ───────────────────────────────────────────────────── */
export default function App() {

  const FORM_ENDPOINT = "https://script.google.com/macros/s/AKfycbzMsVxYs-cUDKto85JUqkzaMRp8e2DkQWjNdrAdLUR5QdvX283k-v3oYP7Jy2yRAa-oOg/exec";
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const formBody = new URLSearchParams();
    for (const key in formData) formBody.append(key, formData[key]);
    try {
      await fetch(FORM_ENDPOINT, { method: 'POST', mode: 'no-cors', body: formBody });
      setToast({ message: "Message sent! We'll be in touch soon.", type: 'success' });
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setToast({ message: 'Something went wrong. Please try again.', type: 'error' });
    }
    setSubmitting(false);
  };

  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 38 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 38 });

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    const onScroll = () => {
      const sy = window.scrollY;
      setIsScrolled(sy > 20);
      setShowTop(sy > 400);
      const navH = document.getElementById('navbar')?.offsetHeight || 66;
      const sections = ['home', 'services', 'aboutus', 'contactus'];
      let current = 'home';
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el && el.offsetTop - navH - 80 <= sy) current = id;
      });
      setActiveSection(current);
    };
    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('resize', onResize); window.removeEventListener('scroll', onScroll); };
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const onMove = (e) => { cursorX.set(e.clientX); cursorY.set(e.clientY); };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [isMobile]);

  const scrollTo = (label) => {
    const id = label.toLowerCase().replace(/\s+/g, '');
    const el = document.getElementById(id);
    if (!el) return;
    const navH = document.getElementById('navbar')?.offsetHeight || 66;
    window.scrollTo({ top: el.offsetTop - navH - 8, behavior: 'smooth' });
    setMenuOpen(false);
  };

  const navIdMap = { 'Home': 'home', 'Services': 'services', 'About Us': 'aboutus', 'Contact Us': 'contactus' };
  const dismissToast = useCallback(() => setToast(null), []);

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; overflow-x: clip; }
    body { font-family: 'DM Sans', sans-serif; background: #080808; color: #e8e8e2; overflow-x: clip; cursor: none !important; -webkit-font-smoothing: antialiased; }
    *, button, a, li, input, textarea { cursor: none !important; }
    ::selection { background: #facc15; color: #000; }

    /* GRAIN */
    body::after {
      content: ''; position: fixed; inset: 0; z-index: 9998; pointer-events: none; opacity: 0.032;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
      background-size: 160px 160px;
    }

    .wrap { max-width: 1100px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 1; }

    /* NAV */
    .nav { position: sticky; top: 0; z-index: 100; transition: background .3s, border-color .3s; border-bottom: 1px solid transparent; }
    .nav.scrolled { background: rgba(8,8,8,0.88); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-bottom-color: rgba(250,204,21,0.1); }
    .nav-inner { max-width: 1100px; margin: 0 auto; padding: 0 24px; height: 66px; display: flex; align-items: center; justify-content: space-between; position: relative; }
    .nav-logo-btn { background: none; border: none; padding: 0; display: flex; align-items: center; }
    .nav-logo { height: 30px; width: auto; filter: brightness(0) invert(1); }
    .nav-links { display: flex; gap: 2px; list-style: none; align-items: center; }
    .nav-link { padding: 8px 16px; border-radius: 8px; font-size: 13.5px; font-weight: 500; color: #666; transition: color .15s, background .15s; white-space: nowrap; font-family: 'DM Sans', sans-serif; position: relative; }
    .nav-link:hover { color: #e8e8e2; background: rgba(255,255,255,0.04); }
    .nav-link.active { color: #facc15; }
    .nav-link.active::after { content: ''; position: absolute; bottom: 4px; left: 50%; transform: translateX(-50%); width: 4px; height: 4px; border-radius: 50%; background: #facc15; }
    .nav-cta { padding: 9px 20px; border-radius: 8px; background: #facc15; color: #000; font-size: 13px; font-weight: 700; border: none; font-family: 'DM Sans', sans-serif; transition: background .15s; }
    .nav-cta:hover { background: #ffe066; }
    .hamburger { display: none; background: none; border: none; padding: 6px; flex-direction: column; gap: 5px; }
    .hamburger span { display: block; width: 22px; height: 2px; background: #e8e8e2; border-radius: 2px; transition: transform .2s, opacity .2s; }
    .mobile-menu { position: absolute; top: calc(100% + 8px); right: 24px; background: #111; border-radius: 14px; box-shadow: 0 20px 60px rgba(0,0,0,0.6); border: 1px solid rgba(250,204,21,0.12); overflow: hidden; width: 200px; }
    .mobile-item { padding: 14px 20px; font-size: 14px; font-weight: 500; color: #ccc; transition: background .12s, color .12s; }
    .mobile-item:hover { background: rgba(250,204,21,0.07); color: #facc15; }
    @media (max-width: 767px) { .nav-links, .nav-cta { display: none; } .hamburger { display: flex; } }

    /* HERO */
    .hero-section { padding: 96px 0 80px; text-align: center; position: relative; overflow: hidden; min-height: 500px; }
    .eyebrow-pill { display: inline-flex; align-items: center; gap: 8px; padding: 6px 14px; border-radius: 99px; background: rgba(250,204,21,0.08); border: 1px solid rgba(250,204,21,0.2); font-size: 11px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: #facc15; margin-bottom: 28px; }
    .eyebrow-dot { width: 6px; height: 6px; border-radius: 50%; background: #facc15; animation: blink 2s infinite; }
    @keyframes blink { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.75)} }
    .hero-h1 { font-family: 'Syne', sans-serif; font-weight: 800; font-size: clamp(2.6rem, 7vw, 5.2rem); line-height: 1.02; letter-spacing: -.035em; color: #fff; margin-bottom: 24px; }
    .hero-h1 .accent { color: #facc15; }
    .hero-h1 .outlined { -webkit-text-stroke: 1.5px rgba(250,204,21,0.5); color: transparent; }
    .hero-sub { font-size: clamp(15px, 2vw, 17px); color: #777; line-height: 1.75; max-width: 520px; margin: 0 auto 36px; font-weight: 300; }

    .btn-row { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; }
    .btn-primary { padding: 14px 28px; border-radius: 10px; background: #facc15; color: #000; font-weight: 700; font-size: 14px; border: none; font-family: 'DM Sans', sans-serif; transition: background .15s, box-shadow .15s; }
    .btn-primary:hover { background: #ffe066; box-shadow: 0 8px 30px rgba(250,204,21,0.35); }
    .btn-ghost { padding: 13px 28px; border-radius: 10px; background: transparent; color: #aaa; font-weight: 600; font-size: 14px; border: 1px solid rgba(255,255,255,0.12); font-family: 'DM Sans', sans-serif; transition: border-color .15s, color .15s; }
    .btn-ghost:hover { border-color: rgba(250,204,21,0.4); color: #facc15; }

    /* STATS */
    .stats-bar { display: flex; margin: 64px 0 0; border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; background: rgba(255,255,255,0.02); overflow: hidden; }
    .stat-item { flex: 1; padding: 28px 20px; text-align: center; border-right: 1px solid rgba(255,255,255,0.07); }
    .stat-item:last-child { border-right: none; }
    .stat-num { font-family: 'Syne', sans-serif; font-size: clamp(1.7rem, 3.5vw, 2.5rem); font-weight: 800; color: #facc15; line-height: 1; margin-bottom: 6px; }
    .stat-label { font-size: 12px; color: #555; font-weight: 500; letter-spacing: .05em; }
    @media (max-width: 520px) { .stats-bar { flex-direction: column; } .stat-item { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.07); } }

    /* SECTIONS */
    .section { padding: 96px 0; }
    .sec-label { font-size: 11px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: #facc15; margin-bottom: 12px; }
    .sec-title { font-family: 'Syne', sans-serif; font-weight: 800; font-size: clamp(1.8rem, 4vw, 3rem); color: #fff; letter-spacing: -.02em; line-height: 1.1; }
    .sec-line { width: 32px; height: 2px; background: #facc15; border-radius: 99px; margin: 16px 0 0; }

    /* SERVICES */
    .srv-header { display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 20px; margin-bottom: 48px; }
    .srv-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
    @media (max-width: 600px) { .srv-grid { grid-template-columns: 1fr; } }
    .srv-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 20px; padding: 32px; transition: border-color .25s, background .25s, transform .25s; position: relative; overflow: hidden; height: 100%; }
    .srv-card::before { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 0% 0%, rgba(250,204,21,0.06) 0%, transparent 60%); opacity: 0; transition: opacity .3s; }
    .srv-card:hover { border-color: rgba(250,204,21,0.3); background: rgba(250,204,21,0.04); transform: translateY(-3px); }
    .srv-card:hover::before { opacity: 1; }
    .srv-num { font-family: 'Syne', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: .1em; color: rgba(250,204,21,0.35); margin-bottom: 24px; }
    .srv-icon-wrap { width: 46px; height: 46px; background: rgba(250,204,21,0.08); border: 1px solid rgba(250,204,21,0.15); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #facc15; margin-bottom: 18px; }
    .srv-title { font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 700; color: #fff; margin-bottom: 10px; }
    .srv-desc { font-size: 13.5px; color: #666; line-height: 1.65; font-weight: 300; }

    /* ABOUT */
    .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
    @media (max-width: 720px) { .about-grid { grid-template-columns: 1fr; gap: 40px; } }
    .about-text p { font-size: 15px; color: #666; line-height: 1.8; font-weight: 300; margin-top: 20px; }
    .about-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    @media (max-width: 400px) { .about-cards { grid-template-columns: 1fr; } }
    .about-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; padding: 20px; transition: border-color .2s; }
    .about-card:hover { border-color: rgba(250,204,21,0.25); }
    .about-card-icon { width: 36px; height: 36px; background: rgba(250,204,21,0.1); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #facc15; margin-bottom: 12px; }
    .about-card-title { font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 700; color: #e8e8e2; margin-bottom: 5px; }
    .about-card-desc { font-size: 12.5px; color: #555; line-height: 1.5; font-weight: 300; }

    /* CONTACT */
    .contact-container { display: grid; grid-template-columns: 1fr 1.2fr; gap: 64px; align-items: start; }
    @media (max-width: 720px) { .contact-container { grid-template-columns: 1fr; gap: 40px; } }
    .contact-info p { font-size: 14px; color: #555; line-height: 1.7; font-weight: 300; margin-top: 20px; }
    .contact-badge { display: inline-flex; align-items: center; gap: 8px; margin-top: 24px; padding: 10px 16px; border-radius: 10px; background: rgba(250,204,21,0.06); border: 1px solid rgba(250,204,21,0.15); font-size: 13px; color: #facc15; font-weight: 500; }
    .contact-form { display: flex; flex-direction: column; gap: 14px; }
    .contact-submit { padding: 14px; border-radius: 10px; background: #facc15; color: #000; font-weight: 700; font-size: 14px; border: none; font-family: 'DM Sans', sans-serif; transition: background .15s, box-shadow .15s; }
    .contact-submit:hover { background: #ffe066; box-shadow: 0 8px 28px rgba(250,204,21,0.3); }
    .contact-submit:disabled { opacity: 0.55; }

    /* FOOTER */
    .footer { border-top: 1px solid rgba(255,255,255,0.06); padding: 48px 24px 32px; }
    .footer-inner { max-width: 1100px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: 24px; }
    .footer-logo { height: 26px; opacity: .5; }
    .footer-links { display: flex; gap: 24px; flex-wrap: wrap; justify-content: center; list-style: none; }
    .footer-link { font-size: 13px; font-weight: 500; color: #444; transition: color .14s; }
    .footer-link:hover { color: #facc15; }
    .footer-copy { font-size: 12px; color: #2a2a2a; }
    .divider { height: 1px; background: rgba(255,255,255,0.05); margin: 0 24px; }

    /* CURSORS */
    .cursor-outer { position: fixed; top: 0; left: 0; width: 36px; height: 36px; border-radius: 50%; border: 1.5px solid rgba(250,204,21,0.5); pointer-events: none; z-index: 9999998; will-change: transform; }
    .cursor-inner { position: fixed; top: 0; left: 0; width: 8px; height: 8px; border-radius: 50%; background: #facc15; pointer-events: none; z-index: 9999999; will-change: transform; }

    /* BACK TO TOP */
    .back-top { position: fixed; bottom: 28px; right: 28px; z-index: 9000; width: 44px; height: 44px; border-radius: 12px; background: rgba(250,204,21,0.08); border: 1px solid rgba(250,204,21,0.22); color: #facc15; display: flex; align-items: center; justify-content: center; font-size: 20px; font-family: sans-serif; transition: background .15s, border-color .15s; }
    .back-top:hover { background: rgba(250,204,21,0.18); border-color: rgba(250,204,21,0.5); }
  `;

  return (
    <>
      <style>{css}</style>
      <GridBg />

      {/* NAV */}
      <header className={`nav ${isScrolled ? 'scrolled' : ''}`} id="navbar">
        <div className="nav-inner">
          <button className="nav-logo-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src={whitelogo} alt="Yellow Gray" className="nav-logo" />
          </button>
          <ul className="nav-links">
            {NAV_ITEMS.map(item => (
              <li key={item} className={`nav-link ${activeSection === navIdMap[item] ? 'active' : ''}`} onClick={() => scrollTo(item)}>
                {item}
              </li>
            ))}
          </ul>
          <MagneticBtn className="nav-cta" onClick={() => scrollTo('Contact Us')}>Free Audit →</MagneticBtn>
          <button className="hamburger" onClick={() => setMenuOpen(v => !v)} aria-label="Toggle menu">
            <span style={menuOpen ? { transform: 'rotate(45deg) translate(5px,5px)' } : {}} />
            <span style={menuOpen ? { opacity: 0 } : {}} />
            <span style={menuOpen ? { transform: 'rotate(-45deg) translate(5px,-5px)' } : {}} />
          </button>
          <AnimatePresence>
            {menuOpen && (
              <motion.ul className="mobile-menu" initial={{ opacity: 0, y: -8, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: .97 }} transition={{ duration: .14 }}>
                {NAV_ITEMS.map(item => <li key={item} className="mobile-item" onClick={() => scrollTo(item)}>{item}</li>)}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* HERO */}
      <div id="home" className="wrap">
        <section className="hero-section">
          <Particles />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
              <div className="eyebrow-pill"><div className="eyebrow-dot" />Managed IT for Modern Businesses</div>
            </motion.div>
            <motion.h1 className="hero-h1" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>
              Technology that<br /><span className="outlined">works</span> for <span className="accent">you.</span>
            </motion.h1>
            <motion.p className="hero-sub" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}>
              Focus on growth, let us manage the tech. Managed support, custom software development, and hardware solutions for small to medium businesses.
            </motion.p>
            <motion.div className="btn-row" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}>
              <MagneticBtn className="btn-primary" onClick={() => scrollTo('Contact Us')}>Request Free Audit</MagneticBtn>
              <MagneticBtn className="btn-ghost" onClick={() => scrollTo('Services')}>See our services</MagneticBtn>
            </motion.div>
            <motion.div className="stats-bar" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}>
              {STATS.map((s, i) => (
                <div key={i} className="stat-item">
                  <div className="stat-num"><Counter target={s.target} suffix={s.suffix} /></div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>
      </div>

      <Marquee />

      {/* SERVICES */}
      <div id="services" className="wrap">
        <section className="section">
          <FadeUp>
            <div className="srv-header">
              <div>
                <p className="sec-label">What we do</p>
                <h2 className="sec-title">Our Services</h2>
                <div className="sec-line" />
              </div>
              <MagneticBtn className="btn-ghost" onClick={() => scrollTo('Contact Us')}>Start a project →</MagneticBtn>
            </div>
          </FadeUp>
          <div className="srv-grid">
            {servicesData.map((s, i) => (
              <FadeUp key={i} delay={i * 0.07}>
                <div className="srv-card">
                  <div className="srv-num">{s.number}</div>
                  <div className="srv-icon-wrap">{s.icon}</div>
                  <div className="srv-title">{s.title}</div>
                  <div className="srv-desc">{s.desc}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </section>
      </div>

      <div className="divider" />

      {/* ABOUT */}
      <div id="aboutus" className="wrap">
        <section className="section">
          <div className="about-grid">
            <FadeUp>
              <div className="about-text">
                <p className="sec-label">Our Philosophy</p>
                <h2 className="sec-title">Why Yellow Gray?</h2>
                <div className="sec-line" />
                <p>We believe technology should make running your business easier, not harder. That's why we work closely with you to understand your goals, solve everyday IT challenges, and build reliable systems that support your growth. From security and infrastructure to smart automation, we're here to help your business move forward with confidence.</p>
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <div className="about-cards">
                {aboutCardsData.map((a, i) => (
                  <motion.div key={i} className="about-card" whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
                    <div className="about-card-icon">{a.icon}</div>
                    <div className="about-card-title">{a.title}</div>
                    <div className="about-card-desc">{a.desc}</div>
                  </motion.div>
                ))}
              </div>
            </FadeUp>
          </div>
        </section>
      </div>

      <div className="divider" />

      {/* CONTACT */}
      <div id="contactus" className="wrap">
        <section className="section">
          <div className="contact-container">
            <FadeUp>
              <div className="contact-info">
                <p className="sec-label">Get in touch</p>
                <h2 className="sec-title">Request a<br /><span style={{ color: '#facc15' }}>Free Audit</span></h2>
                <div className="sec-line" />
                <p>Tell us about your business and we'll identify quick wins, vulnerabilities, and opportunities to streamline your IT — at no cost.</p>
                <div className="contact-badge">
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 8px #22c55e' }} />
                  We usually respond within 24 hours
                </div>
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <form className="contact-form" onSubmit={handleSubmit}>
                <FloatingInput name="name" label="Your name" value={formData.name} onChange={handleInputChange} required />
                <FloatingInput name="email" type="email" label="Email address" value={formData.email} onChange={handleInputChange} required />
                <FloatingInput name="message" label="Tell us about your setup and challenges…" value={formData.message} onChange={handleInputChange} required textarea />
                <MagneticBtn className="contact-submit" type="submit" disabled={submitting}>
                  {submitting ? 'Sending…' : 'Send Message'}
                </MagneticBtn>
              </form>
            </FadeUp>
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <img src={whitelogo} alt="Yellow Gray" className="footer-logo" />
          <ul className="footer-links">
            {NAV_ITEMS.map(item => <li key={item} className="footer-link" onClick={() => scrollTo(item)}>{item}</li>)}
          </ul>
          <p className="footer-copy">© {new Date().getFullYear()} Yellow Gray. All rights reserved.</p>
        </div>
      </footer>

      {/* BACK TO TOP */}
      <AnimatePresence>
        {showTop && (
          <motion.button className="back-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            initial={{ opacity: 0, scale: 0.8, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8, y: 8 }} transition={{ duration: 0.2 }} aria-label="Back to top">
            ↑
          </motion.button>
        )}
      </AnimatePresence>

      {/* TOAST */}
      <AnimatePresence>
        {toast && <Toast message={toast.message} type={toast.type} onDone={dismissToast} />}
      </AnimatePresence>

      {/* CURSOR */}
      {!isMobile && (
        <>
          <motion.div className="cursor-outer" style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }} />
          <motion.div className="cursor-inner" style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }} />
        </>
      )}
    </>
  );
}