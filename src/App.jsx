import { useEffect, useState } from 'react';
import { motion, useMotionValue, AnimatePresence } from 'framer-motion';
import logo from './assets/logo.png';
import whitelogo from './assets/logo_white.png';

const servicesData = [
  { title: 'IT Consultation & Support', desc: 'Expert IT consultation and support to optimize your technology and resolve issues efficiently.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
  { title: 'Web Development & Hosting', desc: 'Modern, secure web apps and hosting to elevate your online presence and reliability.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg> },
  { title: 'Supply of IT Equipment', desc: 'Dependable procurement and provisioning of core IT equipment for businesses and schools.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg> },
  { title: 'Device Repair & Maintenance', desc: 'Fast, professional device repair and maintenance to keep your operations running smoothly.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 19.07a10 10 0 0 1 0-14.14"/></svg> },
];

const aboutCardsData = [
  { title: 'Personalized IT Solutions', desc: 'Tailored tech solutions to meet your unique needs.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> },
  { title: 'Reliability and Support', desc: 'Dependable support to keep your systems running.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
  { title: 'Innovation and Expertise', desc: 'Cutting-edge solutions backed by deep expertise.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg> },
  { title: 'Holistic IT Solutions', desc: 'Comprehensive services for all your IT needs.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg> },
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
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isMobile) return;
    let raf;
    const onMove = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => { cursorX.set(e.clientX); cursorY.set(e.clientY); });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
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
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; overflow-x: clip; }
        body { font-family: 'Inter', sans-serif; background: #f4f4ef; color: #111; overflow-x: clip; cursor: none !important; -webkit-font-smoothing: antialiased; }
        button, a, li, .nav-link, .mobile-item, .btn-y, .btn-outline, .contact-submit, .hamburger, .contact-input, textarea.contact-input, .footer-links, .footer-copy { cursor: none !important; }
        .wrap { max-width: 1080px; margin: 0 auto; padding: 0 20px; }
        .nav { position: sticky; top: 0; z-index: 100; background: rgba(244,244,239,0.9); backdrop-filter: blur(14px); border-bottom: 1px solid rgba(0,0,0,0.08); transition: background 0.3s, box-shadow 0.3s; }
        .nav.scrolled { background: rgba(244, 244, 239, 0.95); box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        .nav-inner { max-width: 1080px; margin: 0 auto; padding: 0 20px; height: 62px; display: flex; align-items: center; justify-content: space-between; }
        .nav-logo-btn { background: none; border: none; padding: 0; display: flex; align-items: center; }
        .nav-logo { height: 32px; width: auto; }
        .inline-logo { height: 1.0em; vertical-align: middle; position: relative; top: -0.05em; margin: 0 8px; }
        .nav-links { display: flex; gap: 2px; list-style: none; }
        .nav-link { padding: 8px 15px; border-radius: 99px; font-size: 13.5px; font-weight: 600; color: #333; transition: background .15s, color .15s; cursor: pointer; }
        .nav-link:hover { background: #facc15; color: #000; }
        .hamburger { display: none; background: none; border: none; padding: 6px; flex-direction: column; gap: 5px; }
        .hamburger span { display: block; width: 22px; height: 2px; background: #111; border-radius: 2px; }
        .mobile-menu { position: absolute; top: calc(100% + 6px); right: 20px; background: #fff; border-radius: 16px; box-shadow: 0 8px 32px rgba(0,0,0,0.13); border: 1px solid rgba(0,0,0,0.06); width: 190px; }
        .mobile-item { padding: 13px 18px; font-size: 14px; font-weight: 600; cursor: pointer; }
        @media (max-width: 767px) { .nav-links { display: none; } .hamburger { display: flex; } }
        /* ... (Keep your existing styles for hero, sections, footer, and cursor here) ... */
      `}</style>

      <header className={`nav ${isScrolled ? 'scrolled' : ''}`} id="navbar">
        <div className="nav-inner">
          <button className="nav-logo-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src={logo} alt="Yellow Gray" className="nav-logo" />
          </button>
          <ul className="nav-links">
            {NAV_ITEMS.map(item => <li key={item} className="nav-link" onClick={() => scrollTo(item)}>{item}</li>)}
          </ul>
          <button className="hamburger" onClick={() => setMenuOpen(v => !v)}><span /><span /><span /></button>
          {menuOpen && (
            <ul className="mobile-menu">
              {NAV_ITEMS.map(item => <li key={item} className="mobile-item" onClick={() => scrollTo(item)}>{item}</li>)}
            </ul>
          )}
        </div>
      </header>

      <div id="home" className="wrap">
        <section className="hero-section">
          <motion.div className="card card-pad" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5, ease: 'easeOut' }}>
            <div className="hero-inner">
              <span className="eyebrow">IT Solutions · Lusaka, Zambia</span>
              <h1 className="hero-h1">
                Choose <img src={logo} alt="Yellow Gray" className="inline-logo" />
              </h1>
              <p className="hero-sub">We specialize in providing tailored IT solutions for small to large businesses, and growing organizations.</p>
              <div className="btn-row">
                <button className="btn-y" onClick={() => scrollTo('Contact Us')}>Contact Us</button>
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
              <p className="sec-eyebrow">What We Do</p>
              <h2 className="sec-title">Our Core Services</h2>
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
                <p className="about-eyebrow">Who We Are</p>
                <h2 className="about-title">
                  Why Choose <img src={logo} alt="Yellow Gray" className="inline-logo" />
                </h2>
                <div className="about-rule" />
                <p className="about-body">Based in Lusaka, Zambia, we're a passionate team dedicated to making technology work for you.</p>
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
              <p className="sec-eyebrow">Reach Out</p>
              <h2 className="sec-title">Get in Touch</h2>
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