import { useEffect, useState } from 'react';
import { motion, useMotionValue, AnimatePresence } from 'framer-motion';
import logo from './assets/logo.png';
import whitelogo from './assets/logo_white.png';

const servicesData = [
  {
    title: 'IT Consultation & Support',
    desc: 'We act as your outsourced IT department, providing maintenance, security, and infrastructure support.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
  {
    title: 'App & Web Development',
    desc: 'We build custom software and web applications, creating automation tools to streamline your business workflows.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
  },
  {
    title: 'Supply of IT Equipment',
    desc: 'Strategic sourcing and setup of enterprise-grade IT equipment for growing offices and schools.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
  },
  {
    title: 'Device Repair & Support',
    desc: 'Professional diagnostics and repairs to ensure your team never stays offline for long.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 19.07a10 10 0 0 1 0-14.14"/>
      </svg>
    ),
  },
];

const aboutCardsData = [
  {
    title: 'Personalized IT Solutions',
    desc: 'Tailored tech solutions to meet your unique needs.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  },
  {
    title: 'Reliability and Support',
    desc: 'Dependable support to keep your systems running.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  },
  {
    title: 'Innovation and Expertise',
    desc: 'Cutting-edge solutions backed by deep expertise.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>,
  },
  {
    title: 'Holistic IT Solutions',
    desc: 'Comprehensive services for all your IT needs.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  },
];

const NAV_ITEMS = ['Home', 'Services', 'About Us', 'Contact Us'];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isScrolled, setIsScrolled] = useState(false);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    if (isMobile) return;

    let raf;
    const onMove = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [isMobile, cursorX, cursorY]);

  const scrollTo = (label) => {
    const id = label.toLowerCase().replace(/\s+/g, '');
    const el = document.getElementById(id);
    if (!el) return;
    const navH = document.getElementById('navbar')?.offsetHeight || 64;
    window.scrollTo({ top: el.offsetTop - navH - 8, behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap"
        rel="stylesheet"
      />

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; overflow-x: clip; }

        body {
          font-family: 'Inter', sans-serif;
          background: #f4f4ef;
          color: #111;
          overflow-x: clip;
          cursor: none !important;
          -webkit-font-smoothing: antialiased;
        }

        button, a, li, .nav-link, .mobile-item, .btn-y, .btn-outline, .contact-submit, .hamburger, .contact-input, textarea.contact-input, .footer-links, .footer-copy {
          cursor: none !important;
        }

        .wrap { max-width: 1080px; margin: 0 auto; padding: 0 20px; }

        .nav { position: sticky; top: 0; z-index: 100; background: rgba(244,244,239,0.9); backdrop-filter: blur(14px); border-bottom: 1px solid rgba(0,0,0,0.08); transition: background 0.3s, box-shadow 0.3s; }
        .nav.scrolled { background: rgba(244, 244, 239, 0.95); box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        .nav-inner { max-width: 1080px; margin: 0 auto; padding: 0 20px; height: 62px; display: flex; align-items: center; justify-content: space-between; position: relative; }
        
        .nav-logo-btn { background: none; border: none; padding: 0; display: flex; align-items: center; justify-content: center; }
        .nav-logo { height: 32px; width: auto; display: block; }
        
        .inline-logo {
          height: 1.0em;
          vertical-align: middle;
          position: relative;
          top: -0.05em;
          margin: 0 3px; 
        }
        
        .nav-links { display: flex; gap: 2px; list-style: none; }
        .nav-link { padding: 8px 15px; border-radius: 99px; font-size: 13.5px; font-weight: 600; color: #333; transition: background .15s, color .15s; white-space: nowrap; cursor: pointer; }
        .nav-link:hover { background: #facc15; color: #000; }
        .hamburger { display: none; background: none; border: none; padding: 6px; flex-direction: column; gap: 5px; }
        .hamburger span { display: block; width: 22px; height: 2px; background: #111; border-radius: 2px; transition: transform .2s, opacity .2s; }
        .mobile-menu { position: absolute; top: calc(100% + 6px); right: 20px; background: #fff; border-radius: 16px; box-shadow: 0 8px 32px rgba(0,0,0,0.13); border: 1px solid rgba(0,0,0,0.06); overflow: hidden; width: 190px; }
        .mobile-item { padding: 13px 18px; font-size: 14px; font-weight: 600; color: #222; transition: background .12s; cursor: pointer; }
        .mobile-item:hover { background: #fef9c3; }

        @media (max-width: 767px) {
          .nav-links { display: none; }
          .hamburger { display: flex; }
        }

        .hero-section { padding: 44px 0 32px; }
        .section { padding: 0 0 32px; }
        .card { background: #fff; border-radius: 22px; border: 1px solid rgba(0,0,0,0.06); box-shadow: 0 1px 18px rgba(0,0,0,0.05); }
        .card-pad { padding: 44px 40px; }
        @media (max-width: 600px) { .card-pad { padding: 28px 20px; } }

        .hero-inner { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 20px; }
        .eyebrow { display: inline-block; font-size: 10.5px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: #92400e; background: #fef3c7; padding: 5px 13px; border-radius: 99px; }
        .hero-h1 { font-weight: 800; font-size: clamp(1.9rem, 5vw, 3.4rem); line-height: 1.1; color: #0a0a0a; letter-spacing: -.025em; text-transform: uppercase; }
        .hero-h1-choose { color: #facc15; }
        .hero-sub { font-size: clamp(14px, 1.8vw, 16px); color: #555; line-height: 1.75; max-width: 480px; }
        .btn-row { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; }
        .btn-y { padding: 12px 26px; border-radius: 99px; background: #facc15; color: #000; font-weight: 700; font-size: 13.5px; border: none; font-family: inherit; transition: background .15s, color .15s, transform .12s; cursor: pointer; }
        .btn-y:hover { background: #111; color: #facc15; transform: translateY(-1px); }
        .btn-outline { padding: 12px 26px; border-radius: 99px; background: transparent; color: #333; font-weight: 700; font-size: 13.5px; border: 2px solid #ddd; font-family: inherit; transition: border-color .15s, color .15s; cursor: pointer; }
        .btn-outline:hover { border-color: #facc15; color: #000; }

        .sec-head { text-align: center; margin-bottom: 32px; }
        .sec-eyebrow { font-size: 10.5px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: #92400e; margin-bottom: 8px; }
        .sec-title { font-weight: 800; font-size: clamp(1.55rem, 3.5vw, 2.25rem); color: #0a0a0a; letter-spacing: -.02em; line-height: 1.15; text-transform: uppercase; }
        .sec-rule { width: 36px; height: 3px; background: #facc15; border-radius: 99px; margin: 10px auto 0; }

        .srv-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
        @media (max-width: 860px) { .srv-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px) { .srv-grid { grid-template-columns: 1fr; } }
        .srv-item { background: #f7f7f3; border-radius: 14px; padding: 22px; border: 1.5px solid transparent; transition: border-color .2s, box-shadow .2s, transform .2s; }
        .srv-item:hover { border-color: #facc15; box-shadow: 0 4px 18px rgba(250,204,21,.14); transform: translateY(-2px); }
        .srv-icon { width: 42px; height: 42px; background: #fef9c3; border-radius: 11px; display: flex; align-items: center; justify-content: center; color: #ca8a04; margin-bottom: 14px; }
        .srv-title { font-size: 14px; font-weight: 700; color: #111; margin-bottom: 7px; line-height: 1.3; }
        .srv-desc { font-size: 13px; color: #666; line-height: 1.6; }

        .about-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 36px; align-items: start; }
        @media (max-width: 680px) { .about-layout { grid-template-columns: 1fr; gap: 24px; } }
        .about-eyebrow { font-size: 10.5px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: #92400e; margin-bottom: 8px; }
        .about-title { font-weight: 800; font-size: clamp(1.4rem, 3vw, 2rem); color: #0a0a0a; letter-spacing: -.02em; line-height: 1.2; margin-bottom: 4px; text-transform: uppercase; }
        .about-rule { width: 36px; height: 3px; background: #facc15; border-radius: 99px; margin: 10px 0 16px; }
        .about-body { font-size: 14.5px; color: #555; line-height: 1.75; }
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        @media (max-width: 400px) { .about-grid { grid-template-columns: 1fr; } }
        .about-item { background: #f7f7f3; border-radius: 13px; padding: 16px; border: 1px solid #e8e8e2; transition: border-color .18s; }
        .about-item:hover { border-color: #facc15; }
        .about-icon { width: 34px; height: 34px; background: #facc15; border-radius: 9px; display: flex; align-items: center; justify-content: center; color: #000; margin-bottom: 10px; }
        .about-item-title { font-size: 13px; font-weight: 700; color: #111; margin-bottom: 4px; }
        .about-item-desc { font-size: 12.5px; color: #666; line-height: 1.55; }

        .contact-wrap { max-width: 520px; margin: 0 auto; }
        .contact-form { display: flex; flex-direction: column; gap: 12px; margin-top: 24px; }
        .contact-input { width: 100%; padding: 12px 15px; border-radius: 11px; border: 1.5px solid #e0e0d8; font-size: 14px; font-family: inherit; color: #111; background: #fafaf6; outline: none; transition: border-color .18s, box-shadow .18s; }
        .contact-input:focus { border-color: #facc15; box-shadow: 0 0 0 3px rgba(250,204,21,.18); background: #fff; }
        textarea.contact-input { resize: vertical; min-height: 110px; }
        .contact-submit { padding: 13px; border-radius: 99px; background: #facc15; color: #000; font-weight: 700; font-size: 14px; border: none; font-family: inherit; transition: background .15s, color .15s; cursor: pointer; }
        .contact-submit:hover { background: #111; color: #facc15; }

        .footer { background: #0a0a0a; color: #555; padding: 44px 20px 28px; margin-top: 32px; }
        .footer-inner { max-width: 1080px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: 18px; }
        .footer-logo { height: 28px; opacity: .8; }
        .footer-links { display: flex; gap: 20px; flex-wrap: wrap; justify-content: center; list-style: none; }
        .footer-link { font-size: 13px; font-weight: 600; color: #555; transition: color .14s; cursor: pointer; }
        .footer-link:hover { color: #facc15; }
        .footer-copy { font-size: 11.5px; color: #3a3a3a; }

        .cursor {
          position: fixed;
          top: 0;
          left: 0;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #facc15;
          pointer-events: none;
          z-index: 9999999;
          opacity: 0.95;
          will-change: transform;
        }
      `}</style>

      <header className={`nav ${isScrolled ? 'scrolled' : ''}`} id="navbar">
        <div className="nav-inner">
          <button className="nav-logo-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src={logo} alt="Yellow Gray" className="nav-logo" />
          </button>

          <ul className="nav-links">
            {NAV_ITEMS.map(item => (
              <li key={item} className="nav-link" onClick={() => scrollTo(item)}>{item}</li>
            ))}
          </ul>

          <button className="hamburger" onClick={() => setMenuOpen(v => !v)} aria-label="Toggle menu">
            <span style={menuOpen ? { transform: 'rotate(45deg) translate(5px,5px)' } : {}} />
            <span style={menuOpen ? { opacity: 0 } : {}} />
            <span style={menuOpen ? { transform: 'rotate(-45deg) translate(5px,-5px)' } : {}} />
          </button>

          <AnimatePresence>
            {menuOpen && (
              <motion.ul
                className="mobile-menu"
                initial={{ opacity: 0, y: -8, scale: .97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: .97 }}
                transition={{ duration: .14 }}
              >
                {NAV_ITEMS.map(item => (
                  <li key={item} className="mobile-item" onClick={() => scrollTo(item)}>{item}</li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </header>

      <div id="home" className="wrap">
        <section className="hero-section">
          <motion.div className="card card-pad" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5, ease: 'easeOut' }}>
            <div className="hero-inner">
              <span className="eyebrow">YOU ARE IN THE RIGHT PLACE!</span>
              <h1 className="hero-h1">
                <span className="hero-h1-choose">Choose</span> <img src={logo} alt="Yellow Gray" className="inline-logo" />
              </h1>
              <p className="hero-sub">Focus on growth, let us manage the tech. We provide managed support, custom software development, and hardware solutions for small to medium businesses.</p>
              <div className="btn-row">
                <button className="btn-y" onClick={() => scrollTo('Contact Us')}>Request Free Audit</button>
                <button className="btn-outline" onClick={() => scrollTo('Services')}>Our Services</button>
              </div>
            </div>
          </motion.div>
        </section>
      </div>

      <div id="services" className="wrap">
        <section className="section">
          <motion.div className="card card-pad" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: .42 }}>
            <div className="sec-head">
              <p className="sec-eyebrow"><span className="eyebrow">Solutions</span></p>
              <h2 className="sec-title">Managed & Bespoke Services</h2>
              <div className="sec-rule" />
            </div>
            <div className="srv-grid">
              {servicesData.map((s, i) => (
                <motion.div key={i} className="srv-item" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .32, delay: i * .07 }}>
                  <div className="srv-icon">{s.icon}</div>
                  <div className="srv-title">{s.title}</div>
                  <div className="srv-desc">{s.desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </div>

      <div id="aboutus" className="wrap">
        <section className="section">
          <motion.div className="card card-pad" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: .42 }}>
            <div className="about-layout">
              <div>
                <p className="about-eyebrow"><span className="eyebrow">Our Philosophy</span></p>
                <h2 className="about-title">
                  Why we are the right partner
                </h2>
                <div className="about-rule" />
                <p className="about-body">We are your strategic technical partner, dedicated to growing alongside your business. Beyond solving immediate IT challenges, we design and deploy scalable infrastructure, robust security frameworks, and custom automation tools that propel your operations forward.</p>
              </div>
              <div className="about-grid">
                {aboutCardsData.map((a, i) => (
                  <motion.div key={i} className="about-item" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .28, delay: i * .06 }}>
                    <div className="about-icon">{a.icon}</div>
                    <div className="about-item-title">{a.title}</div>
                    <div className="about-item-desc">{a.desc}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>
      </div>

      <div id="contactus" className="wrap">
        <section className="section">
          <motion.div className="card card-pad contact-wrap" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: .42 }}>
            <div className="sec-head" style={{ marginBottom: 0 }}>
              <p className="sec-eyebrow"><span className="eyebrow">reach out</span></p>
              <h2 className="sec-title">Request a Free Audit</h2>
              <div className="sec-rule" />
            </div>
            <div className="contact-form">
              <input type="text" placeholder="Name" className="contact-input" />
              <input type="email" placeholder="Email" className="contact-input" />
              <textarea placeholder="Message" className="contact-input" rows="5" />
              <button type="submit" className="contact-submit">Submit</button>
            </div>
          </motion.div>
        </section>
      </div>

      <footer className="footer">
        <div className="footer-inner">
          <img src={whitelogo} alt="Yellow Gray" className="footer-logo" />
          <ul className="footer-links">
            {NAV_ITEMS.map(item => (
              <li key={item} className="footer-link" onClick={() => scrollTo(item)}>{item}</li>
            ))}
          </ul>
          <p className="footer-copy">© {new Date().getFullYear()}. All rights reserved.</p>
        </div>
      </footer>

      {!isMobile && (
        <motion.div
          className="cursor"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: '-50%',
            translateY: '-50%'
          }}
        />
      )}
    </>
  );
}