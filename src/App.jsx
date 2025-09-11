import {
  motion,
  useMotionValue,
  useScroll,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import logo from './assets/logo.png';
import whitelogo from './assets/logo_white.png';
import '@fontsource-variable/inter';
import './App.css';
import './index.css';
import { useEffect, useRef, useState } from 'react';
import feather from 'feather-icons';

// Data for Services and About sections
const servicesData = [
  {
    title: 'IT Consultation & Support',
    desc: 'Expert IT consultation and support to optimize your technology and resolve issues efficiently.',
    icon: 'message-circle',
  },
  {
    title: 'Web Development & Hosting',
    desc: 'Modern, secure web apps and hosting to elevate your online presence and reliability.',
    icon: 'code',
  },
  {
    title: 'Supply of IT Equipment',
    desc: 'Dependable procurement and provisioning of core IT equipment for businesses and schools.',
    icon: 'truck',
  },
  {
    title: 'Device Repair & Maintenance',
    desc: 'Fast, professional device repair and maintenance to keep your operations running smoothly.',
    icon: 'settings',
  },
];

const aboutCardsData = [
  { title: 'Personalized IT Solutions', desc: 'Tailored tech solutions to meet your unique needs.', icon: 'zap' },
  { title: 'Reliability and Support', desc: 'Dependable support to keep your systems running.', icon: 'shield' },
  { title: 'Innovation and Expertise', desc: 'Cutting-edge solutions backed by deep expertise.', icon: 'award' },
  { title: 'Commitment to Security', desc: 'Robust security to protect your digital assets.', icon: 'lock' },
  { title: 'Fostering Strong Relationships', desc: 'Building trust through strong partnerships.', icon: 'heart' },
  { title: 'Trust and Transparency', desc: 'Clear communication and honest practices.', icon: 'users' },
  { title: 'Holistic IT Solutions', desc: 'Comprehensive services for all your IT needs.', icon: 'grid' },
  { title: 'Cost-Effective Services', desc: 'Affordable solutions without compromising quality.', icon: 'dollar-sign' },
];

function App() {
  // Custom cursor
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Services scroll-linked motion values
  const servicesRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: servicesRef,
    offset: ['start end', 'end start'],
  });

  // Floating CTA visibility
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);

  useEffect(() => {
  feather.replace();
  const moveCursor = (e) => {
    try {
      cursorX.set(e.clientX - 8);
      cursorY.set(e.clientY - 8);
    } catch (error) {
      console.error('Cursor move error:', error);
    }
  };
  window.addEventListener('mousemove', moveCursor);
  const handleScroll = () => setShowFloatingCTA(window.scrollY > 300);
  window.addEventListener('scroll', handleScroll);
  return () => {
    window.removeEventListener('mousemove', moveCursor);
    window.removeEventListener('scroll', handleScroll);
  };
}, [cursorX, cursorY]);

  // Parallax for hero
  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start end', 'end start'] });
  const yParallax = useTransform(heroProgress, [0, 1], [0, -50]);

  // State for hamburger menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Link behavior for smooth scrolling with offset
  const handleNavLinkClick = (e) => {
    e.preventDefault();
    const targetId = e.target.textContent.toLowerCase();
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      const navHeight = document.querySelector('nav').offsetHeight || 56; // Default to 56px if not found
      const offsetTop = targetSection.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-gray-200 font-sans relative">
      {/* Grain Texture Overlay */}
      <div className="fixed top-0 left-0 w-full h-full bg-grain opacity-10 pointer-events-none z-0"></div>

      {/* Glowing Background Shapes */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <motion.div
          className="absolute w-64 h-64 opacity-25 blur-3xl top-20 left-10 bg-gradient-to-r from-yellow-400 to-gray-300 rounded-full"
          animate={{ y: [0, 40, 0], scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-72 h-72 opacity-20 blur-3xl top-1/2 right-10 bg-gradient-to-r from-gray-300 to-yellow-400 rounded-full"
          animate={{ y: [0, -30, 0], scale: [1, 1.25, 1] }}
          transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-56 h-56 opacity-25 blur-3xl bottom-20 left-20 bg-gradient-to-r from-yellow-400 to-gray-300 rounded-full"
          animate={{ x: [0, 25, 0], scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
        />
      </div>

      {/* Sticky Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-8 py-3 sm:py-4 bg-white/95 backdrop-blur-xl shadow-lg sticky top-0 z-50 w-full max-w-screen-xl mx-auto rounded-b-2xl"
      >
        <button
          onClick={() => window.location.reload()}
          className="focus:outline-none"
          aria-label="Reload Page"
        >
          <motion.img
            src={logo}
            alt="yellowgray Logo"
            className="h-10 sm:h-12 w-auto object-contain"
            whileHover={{ scale: 1.15, rotate: 8 }}
            transition={{ duration: 0.3 }}
          />
        </button>
        <div className="sm:hidden relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="focus:outline-none p-2 ml-auto"
            aria-label="Toggle Menu"
          >
            <svg
              className="w-7 h-7 stroke-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
              />
            </svg>
          </button>
          <AnimatePresence>
            {isMenuOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="absolute top-14 right-2 bg-white/95 backdrop-blur-xl shadow-xl rounded-xl p-4 w-40 border border-gray-100"
              >
                {['Home', 'About', 'Work', 'Contact'].map((item) => (
                  <motion.li
                    key={item}
                    className="hover:text-yellow-400 transition-colors cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-100/70 text-gray-800 font-semibold"
                    whileHover={{ scale: 1.05, color: '#facc15' }}
                    transition={{ duration: 0.2 }}
                    onClick={handleNavLinkClick}
                  >
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
        <ul className="hidden sm:flex flex-row gap-10 text-gray-800 font-semibold items-center text-lg">
          {['Home', 'About', 'Work', 'Contact'].map((item) => (
            <motion.li
              key={item}
              className="hover:text-yellow-400 transition-colors cursor-pointer px-5 py-2 rounded-full hover:bg-gray-100/70"
              whileHover={{ scale: 1.1, color: '#facc15' }}
              transition={{ duration: 0.2 }}
              onClick={handleNavLinkClick}
            >
              {item}
            </motion.li>
          ))}
        </ul>
      </motion.nav>

      {/* Hero Section (Card View) */}
      <main
        id="home"
        ref={heroRef}
        className="py-12 px-4 relative z-10 max-w-screen-xl mx-auto"
        style={{ position: 'relative', y: yParallax }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, type: 'spring', stiffness: 100 }}
          className="bg-white/95 backdrop-blur-xl shadow-xl rounded-3xl p-8 sm:p-12 flex flex-col items-center justify-center min-h-[60vh] sm:min-h-[80vh] text-center relative overflow-hidden"
        >
          {/* Interactive Particles */}
          <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-5 h-5 bg-yellow-400/40 rounded-full blur-sm"
                animate={{
                  x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
                  y: [Math.random() * 100 - 50, Math.random() * 100 - 50],
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{
                  duration: 5 + Math.random() * 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="text-5xl sm:text-7xl md:text-9xl font-extrabold text-black mb-6 sm:mb-8 leading-none drop-shadow-xl break-words tracking-tighter relative"
          >
            <motion.span className="flex items-center justify-center flex-wrap">
              Choose{' '}
              <motion.img
                src={logo}
                alt="yellowgray Logo"
                className="inline h-16 sm:h-28 md:h-36 max-h-[150px] sm:max-h-[250px] object-contain align-middle mx-3 sm:mx-4"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
                style={{ verticalAlign: 'middle' }}
              />
            </motion.span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
            className="text-lg sm:text-2xl md:text-3xl text-gray-700 max-w-lg sm:max-w-3xl md:max-w-5xl mb-6 sm:mb-8 leading-relaxed text-center"
          >
            We specialize in providing tailored IT solutions for small businesses, schools, and growing organizations.
            <br />
            Our services include expert IT consultation, reliable support, and comprehensive equipment supply.
            <br />
            <span className="text-gray-500 text-base sm:text-xl md:text-2xl block mt-2 sm:mt-3">
              We make technology simple, affordable, and effective—so you can focus on what matters most.
            </span>
          </motion.p>
          <motion.button
            whileHover={{
              scale: 1.15,
              rotate: 3,
              boxShadow: '0 12px 24px rgba(250, 204, 21, 0.4)',
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8, ease: 'easeOut' }}
            className="px-8 sm:px-12 py-4 sm:py-5 rounded-full bg-yellow-400 text-black font-bold shadow-2xl hover:bg-black hover:text-yellow-400 transition-all duration-300 text-lg sm:text-xl"
          >
            Contact Us
          </motion.button>
        </motion.div>
      </main>

      {/* Floating CTA Button */}
      <AnimatePresence>
        {showFloatingCTA && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <motion.button
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-full bg-yellow-400 text-black font-bold shadow-xl hover:bg-black hover:text-yellow-400 transition-all duration-300 text-base"
            >
              Get Started
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Services Section (Card View) */}
      <section
        id="work"
        ref={servicesRef}
        className="py-12 px-4 relative z-10 max-w-screen-xl mx-auto"
        style={{ position: 'relative' }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
          className="bg-white/95 backdrop-blur-xl shadow-xl rounded-3xl p-8 sm:p-12"
        >
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl font-extrabold text-black mb-6 text-center"
          >
            Our Core Services
          </motion.h3>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mb-10"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {servicesData.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: 'easeOut' }}
                whileHover={{
                  scale: 1.05,
                  y: -8,
                  rotate: 1,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                }}
                className="bg-white p-8 rounded-3xl shadow-lg border-2 border-transparent hover:border-yellow-400 transition-all duration-300 cursor-pointer will-change-transform relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                <div className="bg-yellow-400/20 p-5 rounded-2xl mb-6 inline-block relative z-10">
                  <i
                    data-feather={item.icon}
                    className="w-12 h-12 mx-auto text-yellow-500"
                  ></i>
                </div>
                <h4 className="text-2xl font-bold mb-3 text-gray-900">
                  {item.title}
                </h4>
                <p className="text-gray-700 leading-relaxed text-base">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* About Us Section (Card View, Improved) */}
      <section
        id="about"
        className="py-12 px-4 relative z-10 max-w-screen-xl mx-auto"
        style={{ position: 'relative' }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
          className="bg-white/95 backdrop-blur-xl shadow-xl rounded-3xl p-8 sm:p-12"
        >
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Left Column: Why Choose Yellow Gray */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <motion.h3
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8 }}
                className="text-4xl sm:text-5xl font-extrabold text-black mb-4"
              >
                Why Choose Yellow Gray
              </motion.h3>
              <motion.h4
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl sm:text-2xl text-gray-600 mb-6"
              >
                Your Trusted IT Partner
              </motion.h4>
              <div className="w-24 h-1 bg-yellow-400 mx-auto lg:mx-0 mb-8"></div>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-lg sm:text-xl text-gray-700 mb-6 leading-relaxed"
              >
                Based in Lusaka, Zambia, we’re a passionate team dedicated to making technology work for you. Our mission is to simplify IT for small businesses, schools, and growing organizations, ensuring seamless operations and growth.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg sm:text-xl text-gray-700 leading-relaxed"
              >
                With a focus on innovation and reliability, we provide tailored solutions to help you navigate the digital landscape with confidence. Let us handle the tech, so you can focus on what you do best.
              </motion.p>
            </div>

            {/* Right Column: Enhanced Cards */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {aboutCardsData.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, delay: i * 0.15, type: 'spring', stiffness: 120 }}
                    whileHover={{
                      y: -8,
                      rotate: 2,
                      boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                      scale: 1.05,
                    }}
                    className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 cursor-pointer transition-all duration-300 transform-gpu will-change-transform relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="flex justify-center md:justify-start items-center mb-4 relative z-10">
                      <div className="bg-yellow-400 p-4 rounded-2xl mr-4 shadow-md">
                        <i data-feather={item.icon} className="text-white w-8 h-8"></i>
                      </div>
                    </div>
                    <p className="text-gray-800 font-bold text-xl mb-2">
                      {item.title}
                    </p>
                    <p className="text-gray-600 text-base leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Contact Section (Card View) */}
      <section
        id="contact"
        className="py-12 px-4 relative z-10 max-w-screen-xl mx-auto"
        style={{ position: 'relative' }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
          className="bg-white/95 backdrop-blur-xl shadow-xl rounded-3xl p-8 sm:p-12 max-w-3xl mx-auto relative overflow-hidden"
        >
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl font-extrabold text-black mb-6 text-center"
          >
            Get in Touch
          </motion.h3>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mb-10"></div>
          {/* Animated Icons Background */}
          <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
            {['mail', 'phone', 'message-square', 'at-sign'].map((icon, i) => (
              <motion.div
                key={icon}
                className={`absolute w-8 h-8 text-yellow-500/20`}
                animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                transition={{ duration: 15 + i * 2, repeat: Infinity, ease: 'linear' }}
                style={{
                  x: i % 2 === 0 ? -100 + i * 50 : 100 - i * 50,
                  y: i % 2 === 0 ? -80 + i * 40 : 80 - i * 40,
                }}
              >
                <i data-feather={icon} className="w-full h-full"></i>
              </motion.div>
            ))}
          </div>
          {/* Form Content */}
          <form className="space-y-8 relative z-10">
            <div>
              <label
                htmlFor="name"
                className="block text-left text-base font-semibold text-gray-800 mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all text-black text-base"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-left text-base font-semibold text-gray-800 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all text-black text-base"
                required
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-left text-base font-semibold text-gray-800 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="Your Message"
                className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all text-black text-base"
                required
              ></textarea>
            </div>
            <motion.button
              type="submit"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 10px 20px rgba(250, 204, 21, 0.5)',
              }}
              whileTap={{ scale: 0.95 }}
              className="w-full px-8 py-5 rounded-full bg-yellow-400 text-black font-bold text-lg shadow-lg hover:bg-black hover:text-yellow-400 transition-all duration-300"
            >
              Submit
            </motion.button>
          </form>
        </motion.div>
      </section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
        className="w-full bg-black text-gray-400 py-12 relative z-20"
      >
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <div className="flex flex-col items-center">
            <motion.a
              href="#"
              className="flex items-center justify-center mb-6"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <img src={whitelogo} alt="yellowgray Logo" className="h-10 w-auto mr-3 object-contain" />
            </motion.a>
            <ul className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-6 font-semibold text-base">
              {['Home', 'About', 'Work', 'Contact'].map((item) => (
                <motion.li
                  key={item}
                  className="hover:text-yellow-400 transition-colors cursor-pointer"
                  whileHover={{ scale: 1.1, color: '#facc15' }}
                  onClick={handleNavLinkClick}
                >
                  {item}
                </motion.li>
              ))}
            </ul>
            <div className="flex justify-center gap-8 mb-6">
              {['facebook', 'twitter', 'linkedin', 'instagram'].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  aria-label={social.charAt(0).toUpperCase() + social.slice(1)}
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                  whileHover={{ y: -6 }}
                >
                  <i data-feather={social} className="w-7 h-7"></i>
                </motion.a>
              ))}
            </div>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()}. All rights reserved.
            </p>
          </div>
        </div>
      </motion.footer>

      {/* Custom Cursor */}
      <div className="pointer-events-none fixed top-0 left-0 w-full h-full z-50 hidden sm:block">
        <motion.div
          className="w-5 h-5 bg-yellow-400 rounded-full shadow-lg opacity-80 border border-white/50"
          style={{ x: cursorX, y: cursorY }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
        />
      </div>
    </div>
  );
}

export default App;