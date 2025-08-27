import { motion, useMotionValue, useSpring } from 'framer-motion';
import logo from './assets/logo.png';
import '@fontsource-variable/inter';
import './App.css';
import './index.css';
import { useEffect } from 'react';

function App() {
  // Custom cursor position
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Update cursor position
  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 8); // Adjust for cursor size
      cursorY.set(e.clientY - 8);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-gray-200 font-sans"
      style={{ fontFamily: 'InterVariable, sans-serif' }}
    >
      {/* Navigation */}
      <nav className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-8 py-4 sm:py-6 bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-30 w-full">
        <img src={logo} alt="yellowgray Logo" className="h-10 w-auto mb-2 sm:mb-0" />
        <ul className="flex flex-col sm:flex-row gap-2 sm:gap-8 text-gray-700 font-medium w-full sm:w-auto items-center">
          <li className="hover:text-yellow-400 transition-colors cursor-pointer">Home</li>
          <li className="hover:text-yellow-400 transition-colors cursor-pointer">About</li>
          <li className="hover:text-yellow-400 transition-colors cursor-pointer">Work</li>
          <li className="hover:text-yellow-400 transition-colors cursor-pointer">Contact</li>
        </ul>
      </nav>
      {/* Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        {/* Circles */}
        <motion.div
          className="absolute w-24 h-24 rounded-full opacity-40 top-20 left-10"
          animate={{ 
            y: [0, 20, 0], 
            scale: [1, 1.1, 1], 
            backgroundColor: ['#facc15', '#9ca3af', '#facc15'] 
          }}
          transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-32 h-32 rounded-full opacity-30 top-40 right-10"
          animate={{ 
            y: [0, -15, 0], 
            rotate: [0, 360, 0], 
            backgroundColor: ['#9ca3af', '#facc15', '#9ca3af'] 
          }}
          transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-16 h-16 rounded-full opacity-40 bottom-20 left-20"
          animate={{ 
            x: [0, 15, 0], 
            opacity: [0.4, 0.6, 0.4], 
            backgroundColor: ['#facc15', '#9ca3af', '#facc15'] 
          }}
          transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-20 h-20 rounded-full opacity-35 bottom-40 right-20"
          animate={{ 
            y: [0, 25, 0], 
            scale: [1, 1.3, 1], 
            backgroundColor: ['#9ca3af', '#facc15', '#9ca3af'] 
          }}
          transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-28 h-28 rounded-full opacity-40 top-1/3 left-1/3"
          animate={{ 
            x: [0, -20, 0], 
            y: [0, 15, 0], 
            rotate: [0, 180, 0], 
            backgroundColor: ['#facc15', '#9ca3af', '#facc15'] 
          }}
          transition={{ repeat: Infinity, duration: 9, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-12 h-12 rounded-full opacity-45 top-10 left-1/4"
          animate={{ 
            y: [0, 10, 0], 
            scale: [1, 1.2, 1], 
            backgroundColor: ['#facc15', '#9ca3af', '#facc15'] 
          }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-36 h-36 rounded-full opacity-35 top-1/4 right-1/4"
          animate={{ 
            x: [0, -10, 0], 
            opacity: [0.35, 0.5, 0.35], 
            backgroundColor: ['#9ca3af', '#facc15', '#9ca3af'] 
          }}
          transition={{ repeat: Infinity, duration: 6.5, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-28 h-28 rounded-full opacity-40 bottom-1/3 left-1/5"
          animate={{ 
            y: [0, -20, 0], 
            rotate: [0, 90, 0], 
            backgroundColor: ['#9ca3af', '#facc15', '#9ca3af'] 
          }}
          transition={{ repeat: Infinity, duration: 7.5, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-20 h-20 rounded-full opacity-45 bottom-1/4 right-1/5"
          animate={{ 
            x: [0, 15, 0], 
            scale: [1, 1.15, 1], 
            backgroundColor: ['#facc15', '#9ca3af', '#facc15'] 
          }}
          transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-16 h-16 rounded-full opacity-40 top-1/2 left-15"
          animate={{ 
            y: [0, 12, 0], 
            opacity: [0.4, 0.6, 0.4], 
            backgroundColor: ['#facc15', '#9ca3af', '#facc15'] 
          }}
          transition={{ repeat: Infinity, duration: 8.5, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-24 h-24 rounded-full opacity-35 bottom-10 right-15"
          animate={{ 
            x: [0, -15, 0], 
            rotate: [0, 270, 0], 
            backgroundColor: ['#9ca3af', '#facc15', '#9ca3af'] 
          }}
          transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
        />
        {/* Corner Lines */}
        <motion.div
          className="absolute w-32 h-1 bg-yellow-400 top-0 left-0"
          animate={{ scaleX: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-32 h-1 bg-yellow-400 top-0 right-0"
          animate={{ scaleX: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-1 h-32 bg-yellow-400 bottom-0 left-0"
          animate={{ scaleY: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-1 h-32 bg-yellow-400 bottom-0 right-0"
          animate={{ scaleY: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut' }}
        />
      </div>
        
      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center min-h-[70vh] py-8 px-4 text-center relative w-full">
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 1 }}
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-black mb-6 leading-tight drop-shadow break-words"
        >
          <span>Welcome to{' '}</span>
          <img src={logo} alt="yellowgray Logo" className="inline h-14 sm:h-20 align-middle mx-2" style={{ verticalAlign: 'middle' }} />
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-base sm:text-xl md:text-2xl text-gray-600 max-w-xs sm:max-w-xl md:max-w-2xl mb-10"
        >
         Buzz me we rap! <br />
          <span className="text-gray-400 text-sm sm:text-base">
            (buidling this site from scratch!)
          </span>
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.1, rotate: 3 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 sm:px-8 py-3 rounded-full bg-yellow-400 text-black font-bold shadow-lg hover:bg-black hover:text-yellow-400 transition-colors text-base sm:text-lg"
        >
          See Our Work
        </motion.button>
        <div className="pointer-events-none fixed top-0 left-0 w-full h-full z-0">
          <motion.div
            className="w-2 h-2 bg-yellow-400 rounded-full"
            style={{ translateX: cursorXSpring, translateY: cursorYSpring }}
          />
        </div>
      </main>
    </div>
  );
}

export default App;