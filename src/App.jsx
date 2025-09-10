import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion';
import logo from './assets/logo.png';
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
              x: [
                -40,
                40 * Math.cos(0),
                40 * Math.cos(Math.PI / 2),
                40 * Math.cos(Math.PI),
                40 * Math.cos((3 * Math.PI) / 2),
                -40,
              ],
              y: [
                0,
                20 * Math.sin(0), // Reduced y-radius for a more elliptical shape
                20 * Math.sin(Math.PI / 2),
                20 * Math.sin(Math.PI),
                20 * Math.sin((3 * Math.PI) / 2),
                0,
              ],
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
              x: [
                -50,
                50 * Math.cos(0),
                50 * Math.cos(Math.PI / 2),
                50 * Math.cos(Math.PI),
                50 * Math.cos((3 * Math.PI) / 2),
                -50,
              ],
              y: [
                0,
                25 * Math.sin(0), // Reduced y-radius for a more elliptical shape
                25 * Math.sin(Math.PI / 2),
                25 * Math.sin(Math.PI),
                25 * Math.sin((3 * Math.PI) / 2),
                0,
              ],
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
        >
          <motion.span className="flex items-center justify-center">Choose{' '}</motion.span>
          <motion.img
            src={logo}
            alt="yellowgray Logo"
            className="inline h-12 sm:h-24 md:h-32 align-middle mx-2 sm:mx-3"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
            style={{ verticalAlign: 'middle' }}
          />
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: 'easeOut' }}
          className="text-base sm:text-2xl md:text-3xl text-gray-700 max-w-md sm:max-w-2xl md:max-w-4xl mb-4 sm:mb-6 leading-relaxed text-center"
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
            scale: 1.15,
            rotate: 2,
            boxShadow: '0 10px 20px rgba(250, 204, 21, 0.3)',
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
          className="px-6 sm:px-10 py-3 sm:py-4 rounded-full bg-yellow-400 text-black font-bold shadow-xl hover:bg-black hover:text-yellow-400 transition-all duration-300 text-base sm:text-xl"
        >
          Learn More
        </motion.button>
      </main>

      {/* Services */}
      <section
        ref={servicesRef}
        className="py-6 px-4 text-center bg-transparent relative z-10 max-w-screen-xl mx-auto"
      >
        <motion.h3
          initial={{ opacity: 0, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl font-bold text-black mb-4"
        >
          Our Core Business Model Includes...
        </motion.h3>

        <div className="w-20 h-1 bg-yellow-400 mx-auto mb-4"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'IT Consultation & Support',
              desc:
                'Expert IT consultation and support to optimize your technology and resolve issues efficiently.',
              icon: 'message-circle',
            },
            {
              title: 'Web Development & Hosting',
              desc:
                'Modern, secure web apps and hosting to elevate your online presence and reliability.',
              icon: 'code',
            },
            {
              title: 'Supply of IT Equipment',
              desc:
                'Dependable procurement and provisioning of core IT equipment for businesses and schools.',
              icon: 'truck',
            },
            {
              title: 'Device Repair & Maintenance',
              desc:
                'Fast, professional device repair and maintenance to keep your operations running smoothly.',
              icon: 'settings',
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 0 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                  type: 'spring',
                  stiffness: 100,
                  damping: 20,
                  delay: i * 0.1,
                },
              }}
              whileHover={{ scale: 1.03 }}
              viewport={{ once: true, amount: 0 }}
              className="bg-white shadow-lg rounded-2xl p-6 transform transition-all will-change-transform"
            >
              <motion.div
                className="text-yellow-500 mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <i data-feather={item.icon} className="w-10 h-10 mx-auto"></i>
              </motion.div>
              <h4 className="text-xl font-semibold mb-2 text-gray-900">{item.title}</h4>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

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