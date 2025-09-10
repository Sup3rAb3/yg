import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion';
import logo from './assets/logo.png';
import whitelogo from './assets/logo_white.png';
import '@fontsource-variable/inter';
import './App.css';
import './index.css';
import { useEffect, useRef, useState } from 'react';
import feather from 'feather-icons';

function App() {
  // Custom cursor
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Services scroll-linked motion values
  const servicesRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: servicesRef,
    offset: ['start end', 'end start'],
  });

  useEffect(() => {
    // Initialize Feather Icons
    feather.replace();

    // Cursor movement
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 8);
      cursorY.set(e.clientY - 8);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  // Parallax for hero
  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef });
  const yParallax = useTransform(heroProgress, [0, 1], [0, -50]);

  // State for hamburger menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-gray-200 font-sans relative"
      style={{ fontFamily: 'InterVariable, sans-serif' }}
    >
      {/* Background Shapes - now full-page */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <motion.div
          className="absolute w-64 h-64 opacity-20 blur-2xl top-20 left-10 bg-gradient-to-r from-yellow-400 to-gray-300 rounded-full"
          animate={{ y: [0, 30, 0], scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-72 h-72 opacity-15 blur-3xl top-1/2 right-10 bg-gradient-to-r from-gray-300 to-yellow-400 rounded-full"
          animate={{ y: [0, -25, 0], scale: [1, 1.3, 1] }}
          transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-56 h-56 opacity-20 blur-2xl bottom-20 left-20 bg-gradient-to-r from-yellow-400 to-gray-300 rounded-full"
          animate={{ x: [0, 20, 0], scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-full h-full bg-gradient-radial from-yellow-100/20 to-transparent opacity-40"
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ repeat: Infinity, duration: 15, ease: 'easeInOut' }}
        />
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 py-2 sm:py-3 bg-white/90 backdrop-blur-lg shadow-md sticky top-0 z-50 w-full max-w-screen-xl mx-auto"
      >
        <button
          onClick={() => window.location.reload()}
          className="focus:outline-none"
          style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
          aria-label="Reload Page"
        >
          <motion.img
            src={logo}
            alt="yellowgray Logo"
            className="h-8 sm:h-10 w-auto"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
            style={{ transform: 'translateZ(0)' }}
          />
        </button>
        <div className="sm:hidden relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="focus:outline-none p-2 ml-auto"
            aria-label="Toggle Menu"
          >
            <svg
              className="w-6 h-6 stroke-black"
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
          {isMenuOpen && (
            <ul className="absolute top-12 right-2 bg-white/90 backdrop-blur-lg shadow-md rounded-md p-2 w-32">
              {['Home', 'About', 'Work', 'Contact'].map((item) => (
                <motion.li
                  key={item}
                  className="hover:text-yellow-400 transition-colors cursor-pointer px-3 py-1 rounded-full hover:bg-gray-100/50 text-gray-700 text-center"
                  whileHover={{ scale: 1.05, color: '#facc15' }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setIsMenuOpen(false)}
                  style={{ transform: 'translateZ(0)' }}
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          )}
        </div>
        <ul className="hidden sm:flex flex-row gap-8 text-gray-700 font-medium items-center text-base">
          {['Home', 'About', 'Work', 'Contact'].map((item) => (
            <motion.li
              key={item}
              className="hover:text-yellow-400 transition-colors cursor-pointer px-4 py-2 rounded-full hover:bg-gray-100/50"
              whileHover={{ scale: 1.05, color: '#facc15' }}
              transition={{ duration: 0.2 }}
              style={{ transform: 'translateZ(0)' }}
            >
              {item}
            </motion.li>
          ))}
        </ul>
      </motion.nav>

      {/* Hero with Orbiting Shapes */}
      <main
        ref={heroRef}
        className="flex flex-col items-center justify-center min-h-[50vh] sm:min-h-[70vh] py-3 sm:py-4 px-4 text-center relative w-full z-10 max-w-screen-xl mx-auto"
        style={{ y: yParallax }}
      >
        {/* Orbiting Shapes (behind text, around logo) */}
        <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
          <motion.div
            className="absolute w-6 h-6 bg-yellow-400/30 rounded-full blur-sm"
            animate={{
              x: [-40, 0, 40, 0, -40],
              y: [0, 20, 0, -20, 0],
              rotate: 360,
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          <motion.div
            className="absolute w-8 h-8 bg-gray-300/20 rounded-full blur-sm"
            animate={{
              x: [-50, 0, 50, 0, -50],
              y: [0, 25, 0, -25, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="text-4xl sm:text-7xl md:text-9xl font-black text-black mb-4 sm:mb-6 leading-none drop-shadow-lg break-words tracking-tight relative"
          style={{ transform: 'translateZ(0)' }}
        >
          <motion.span className="flex items-center justify-center">Choose{' '}</motion.span>
          <motion.img
            src={logo}
            alt="yellowgray Logo"
            className="inline h-12 sm:h-24 md:h-32 align-middle mx-2 sm:mx-3"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
            style={{ verticalAlign: 'middle', transform: 'translateZ(0)' }}
          />
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: 'easeOut' }}
          className="text-base sm:text-2xl md:text-3xl text-gray-700 max-w-md sm:max-w-2xl md:max-w-4xl mb-4 sm:mb-6 leading-relaxed text-center"
          style={{ transform: 'translateZ(0)' }}
        >
          We specialize in providing tailored IT solutions for small businesses, schools, and growing organizations.
          <br />
          Our services include expert IT consultation, reliable support, and comprehensive equipment supply.
          <br />
          <span className="text-gray-500 text-sm sm:text-xl md:text-2xl block mt-1 sm:mt-2">
            We make technology simple, affordable, and effective—so you can focus on what matters most.
          </span>
        </motion.p>
        <motion.button
          whileHover={{
            scale: 1.1,
            rotate: 2,
            boxShadow: '0 10px 20px rgba(250, 204, 21, 0.3)',
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
          className="px-6 sm:px-10 py-3 sm:py-4 rounded-full bg-yellow-400 text-black font-bold shadow-xl hover:bg-black hover:text-yellow-400 transition-all duration-300 text-base sm:text-xl"
          style={{ transform: 'translateZ(0)' }}
        >
          Contact Us
        </motion.button>
      </main>

      {/* Services */}
      <section
        ref={servicesRef}
        className="py-6 px-4 text-center relative z-10 max-w-screen-xl mx-auto"
      >
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl font-bold text-black mb-4"
          style={{ transform: 'translateZ(0)' }}
        >
          Our Core Business Model Includes...
        </motion.h3>

        <div className="w-20 h-1 bg-yellow-400 mx-auto mb-8"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
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
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
              whileHover={{
                scale: 1.03,
                y: -6,
                boxShadow: '0 15px 30px rgba(0,0,0,0.12)',
              }}
              className="bg-white p-6 rounded-2xl shadow-lg border-2 border-transparent hover:border-yellow-400 transition-all duration-300 cursor-pointer will-change-transform"
              style={{ transform: 'translateZ(0)' }}
            >
              <div className="bg-yellow-400/10 p-4 rounded-xl mb-4 inline-block">
                <i
                  data-feather={item.icon}
                  className="w-10 h-10 mx-auto text-yellow-500"
                ></i>
              </div>
              <h4 className="text-xl font-bold mb-2 text-gray-900" style={{ transform: 'translateZ(0)' }}>
                {item.title}
              </h4>
              <p className="text-gray-700 leading-relaxed" style={{ transform: 'translateZ(0)' }}>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Updated About Us Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100 relative z-10 max-w-screen-xl mx-auto rounded-3xl shadow-xl">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          {/* Left Column: Why Choose Yellow Gray */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8 }}
              className="text-3xl sm:text-4xl font-bold text-black mb-4"
              style={{ transform: 'translateZ(0)' }}
            >
              Why Choose Yellow Gray
            </motion.h3>
            <div className="w-20 h-1 bg-yellow-400 mx-auto lg:mx-0 mb-8"></div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg sm:text-xl text-gray-700 mb-8 leading-relaxed"
              style={{ transform: 'translateZ(0)' }}
            >
              We are a dedicated team passionate about making technology accessible and efficient for businesses and educational institutions. Our journey began with a simple belief: that technology should be a solution, not a problem. Our headquarters is located in Lusaka, Zambia, serving the local community and beyond.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg sm:text-xl text-gray-700 leading-relaxed"
              style={{ transform: 'translateZ(0)' }}
            >
              <p>
                With a deep understanding of the challenges small organizations face, we are committed to helping you stay ahead of the curve with innovative IT solutions. Whether you're scaling your business or optimizing your current setup, we’re here to provide the support and tools you need to succeed in a fast-evolving digital landscape.
              </p>
            </motion.div>
          </div>

          {/* Right Column: Beautiful Cards with Icons */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: 'Personalized IT Solutions', icon: 'zap' },
                { title: 'Reliability and Support', icon: 'shield' },
                { title: 'Innovation and Expertise', icon: 'award' },
                { title: 'Commitment to Security', icon: 'lock' },
                { title: 'Fostering Strong Relationships', icon: 'heart' },
                { title: 'Trust and Transparency', icon: 'users' },
                { title: 'Holistic IT Solutions', icon: 'grid' },
                { title: 'Cost-Effective Services', icon: 'dollar-sign' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  whileHover={{ y: -6, boxShadow: '0 15px 30px rgba(0,0,0,0.1)', scale: 1.05 }}
                  className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 cursor-pointer transition-all duration-300 transform-gpu will-change-transform"
                  style={{ transform: 'translateZ(0)' }}
                >
                  <div className="flex justify-center md:justify-start items-center mb-4">
                    <div className="bg-yellow-400 p-3 rounded-xl mr-4 shadow-sm">
                      <i data-feather={item.icon} className="text-white w-7 h-7"></i>
                    </div>
                  </div>
                  <p className="text-gray-800 font-bold text-lg" style={{ transform: 'translateZ(0)' }}>
                    {item.title}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact info Section */}
      <section className="py-20 px-4 text-center bg-transparent relative z-10 max-w-screen-xl mx-auto">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl font-bold text-black mb-4"
          style={{ transform: 'translateZ(0)' }}
        >
          Get in Touch
        </motion.h3>
        
        <div className="w-20 h-1 bg-yellow-400 mx-auto mb-8"></div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
          className="bg-white shadow-xl rounded-3xl p-8 sm:p-12 max-w-2xl mx-auto relative overflow-hidden"
        >
          {/* Mouse-responsive icons container */}
          <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
            <motion.div
              className="absolute w-8 h-8 text-yellow-500/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              style={{ x: -100, y: -80 }}
            >
              <i data-feather="mail" className="w-full h-full"></i>
            </motion.div>
            <motion.div
              className="absolute w-6 h-6 text-gray-400/30"
              animate={{ rotate: -360 }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              style={{ x: 120, y: 40 }}
            >
              <i data-feather="phone" className="w-full h-full"></i>
            </motion.div>
            <motion.div
              className="absolute w-7 h-7 text-yellow-500/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
              style={{ x: -150, y: 100 }}
            >
              <i data-feather="message-square" className="w-full h-full"></i>
            </motion.div>
            <motion.div
              className="absolute w-6 h-6 text-gray-400/30"
              animate={{ rotate: -360 }}
              transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
              style={{ x: 160, y: -120 }}
            >
              <i data-feather="at-sign" className="w-full h-full"></i>
            </motion.div>
          </div>
          
          {/* Form Content (z-index ensures it's on top) */}
          <form className="space-y-6 relative z-10">
            <div>
              <label htmlFor="name" className="block text-left text-sm font-medium text-gray-700 mb-1">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                placeholder="Your Name" 
                className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors text-black" 
                required 
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-left text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder="Your Email" 
                className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors text-black" 
                required 
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-left text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea 
                id="message" 
                name="message" 
                rows="4" 
                placeholder="Your Message" 
                className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors text-black" 
                required 
              ></textarea>
            </div>
            <motion.button
              type="submit"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: '0 8px 15px rgba(250, 204, 21, 0.4)' 
              }}
              whileTap={{ scale: 0.95 }}
              className="w-full px-6 py-4 rounded-full bg-yellow-400 text-black font-bold text-lg shadow-md hover:bg-black hover:text-yellow-400 transition-all duration-300"
              style={{ transform: 'translateZ(0)' }}
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
        className="w-full bg-black text-gray-400 py-10 relative z-20"
      >
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <div className="flex flex-col items-center">
            {/* Logo and Name */}
            <motion.a 
              href="#" 
              className="flex items-center justify-center mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              style={{ transform: 'translateZ(0)' }}
            >
              <img src={whitelogo} alt="yellowgray Logo" className="h-8 w-auto mr-2" />
            </motion.a>

            {/* Navigation Links */}
            <ul className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-4 font-medium">
              {['Home', 'About', 'Work', 'Contact'].map((item) => (
                <motion.li
                  key={item}
                  className="hover:text-yellow-400 transition-colors cursor-pointer"
                  whileHover={{ scale: 1.05, color: '#facc15' }}
                  style={{ transform: 'translateZ(0)' }}
                >
                  {item}
                </motion.li>
              ))}
            </ul>

            {/* Social Media Icons */}
            <div className="flex justify-center gap-6 mb-4">
              <motion.a 
                href="#" 
                aria-label="Facebook"
                className="text-gray-400 hover:text-yellow-400 transition-colors"
                whileHover={{ y: -4 }}
                style={{ transform: 'translateZ(0)' }}
              >
                <i data-feather="facebook" className="w-6 h-6"></i>
              </motion.a>
              <motion.a 
                href="#" 
                aria-label="Twitter"
                className="text-gray-400 hover:text-yellow-400 transition-colors"
                whileHover={{ y: -4 }}
                style={{ transform: 'translateZ(0)' }}
              >
                <i data-feather="twitter" className="w-6 h-6"></i>
              </motion.a>
              <motion.a 
                href="#" 
                aria-label="LinkedIn"
                className="text-gray-400 hover:text-yellow-400 transition-colors"
                whileHover={{ y: -4 }}
                style={{ transform: 'translateZ(0)' }}
              >
                <i data-feather="linkedin" className="w-6 h-6"></i>
              </motion.a>
              <motion.a 
                href="#" 
                aria-label="Instagram"
                className="text-gray-400 hover:text-yellow-400 transition-colors"
                whileHover={{ y: -4 }}
                style={{ transform: 'translateZ(0)' }}
              >
                <i data-feather="instagram" className="w-6 h-6"></i>
              </motion.a>
            </div>

            {/* Copyright */}
            <p className="text-sm text-gray-500 mt-2">
              © {new Date().getFullYear()}. All rights reserved.
            </p>
          </div>
        </div>
      </motion.footer>

      {/* Custom Cursor (always visible) */}
      <div className="pointer-events-none fixed top-0 left-0 w-full h-full z-50 hidden sm:block">
        <motion.div
          className="w-4 h-4 bg-yellow-400 rounded-full shadow-lg opacity-90"
          style={{ translateX: cursorXSpring, translateY: cursorYSpring }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        />
      </div>
    </div>
  );
}

export default App;