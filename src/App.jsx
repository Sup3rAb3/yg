import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion';
import logo from './assets/logo.png';
import '@fontsource-variable/inter';
import './App.css';
import './index.css';
import { useEffect, useRef } from 'react';
import feather from 'feather-icons'; // Import Feather Icons

function App() {
  // Custom cursor
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Services scroll-linked motion values
  const servicesRef = useRef(null);
  const { scrollYProgress: servicesProgress } = useScroll({
    target: servicesRef,
    offset: ['start end', 'end start'],
  });

  // Subtle parallax for cards (less aggressive than before)
  const translateYVals = [
    useTransform(servicesProgress, [0, 1], [10, -10]),
    useTransform(servicesProgress, [0, 1], [-10, 10]),
    useTransform(servicesProgress, [0, 1], [5, -5]),
    useTransform(servicesProgress, [0, 1], [-5, 5]),
  ];

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
  const { scrollYProgress } = useScroll({ target: heroRef });
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -50]);

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
        className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-8 py-3 sm:py-6 bg-white/90 backdrop-blur-lg shadow-md sticky top-0 z-50 w-full"
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
            className="h-8 sm:h-10 w-auto mb-2 sm:mb-0"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          />
        </button>
        <ul className="flex flex-col sm:flex-row gap-1 sm:gap-8 text-gray-700 font-medium w-full sm:w-auto items-center text-sm sm:text-base">
          {['Home', 'About', 'Work', 'Contact'].map((item) => (
            <motion.li
              key={item}
              className="hover:text-yellow-400 transition-colors cursor-pointer px-3 py-1 sm:px-4 sm:py-2 rounded-full hover:bg-gray-100/50"
              whileHover={{ scale: 1.05, color: '#facc15' }}
              transition={{ duration: 0.2 }}
            >
              {item}
            </motion.li>
          ))}
        </ul>
      </motion.nav>

      {/* Hero */}
      <main
        ref={heroRef}
        className="flex flex-col items-center justify-center min-h-[70vh] sm:min-h-screen py-8 sm:py-16 px-4 text-center relative w-full z-10"
      >
        <motion.h1
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="text-4xl sm:text-7xl md:text-9xl font-black text-black mb-6 sm:mb-8 leading-none drop-shadow-lg break-words tracking-tight"
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
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: 'easeOut' }}
          className="text-base sm:text-2xl md:text-3xl text-gray-700 max-w-md sm:max-w-2xl md:max-w-4xl mb-8 sm:mb-12 leading-relaxed text-center"
        >
          We specialize in providing tailored IT solutions for small businesses, schools, and growing organizations.
          <br />
          Our services include expert IT consultation, reliable support, and comprehensive equipment supply.
          <br />
          <span className="text-gray-500 text-sm sm:text-xl md:text-2xl block mt-2 sm:mt-4">
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
          initial={{ opacity: 0, y: 50 }}
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
        className="py-16 px-4 text-center bg-transparent relative z-10"
      >
        <motion.h3
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl font-bold text-black mb-4"
        >
          Our Core Business Model Includes...
        </motion.h3>

        <div className="w-20 h-1 bg-yellow-400 mx-auto mb-12"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
              // Initial state: slightly rotated and below
              initial={{ opacity: 0, y: 50 }}
              // Aminamte in when in view: lift, and fade in
              whileInView={{
                opacity: 1,
                y: 0,
                rotate: 0,
                transition: {
                  type: 'spring',
                  stiffness: 100,
                  damping: 20,
                  delay: i * 0.1, // Staggered entry
                },
              }}
              // Subtle scroll-based parallax
              style={{ y: translateYVals[i] }}
              // Hover effect: lift and straighten
              whileHover={{ scale: 1.03, y: -6 }}
              viewport={{ once: true, amount: 0.3 }} // Trigger when 30% of card is visible
              className="bg-white shadow-lg rounded-2xl p-6 transform transition-all will-change-transform"
            >
              <motion.div
                // Icon micro-animation
                initial={{ rotate: 0 }}
                whileInView={{ rotate: [0, 10, 0] }}
                whileHover={{ rotate: 12 }}
                transition={{ duration: 0.6 }}
                className="text-yellow-500 mb-4"
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