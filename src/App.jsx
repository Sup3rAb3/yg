import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';
import logo from './assets/logo.png';
import '@fontsource-variable/inter';
import './App.css';
import './index.css';

function App() {
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
        <motion.div
          className="absolute w-24 h-24 bg-yellow-400 rounded-full opacity-30 top-20 left-10"
          animate={{ y: [0, 20, 0] }}   // Moves up and down
          transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-32 h-32 bg-gray-400 rounded-full opacity-20 top-40 right-10"
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
        />
      </div>
      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center min-h-[70vh] py-8 px-4 text-center relative w-full">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-black mb-6 leading-tight drop-shadow break-words"
        >
          <span>Welcome to{' '}</span>
          <img
            src={logo}
            alt="yellowgray Logo"
            className="inline h-14 sm:h-20 align-middle mx-2"
            style={{ verticalAlign: 'middle' }}
          />
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-base sm:text-xl md:text-2xl text-gray-600 max-w-xs sm:max-w-xl md:max-w-2xl mb-10"
        >
          We craft interactive, fluid, and minimal digital experiences. <br />
          <span className="text-gray-400 text-sm sm:text-base">
            (Inspired by lusion.co, minus the heavy videos!)
          </span>
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.97 }}
          className="px-6 sm:px-8 py-3 rounded-full bg-yellow-400 text-black font-bold shadow-lg hover:bg-black hover:text-yellow-400 transition-colors text-base sm:text-lg"
        >
          See Our Work
        </motion.button>
      </main>
    </div>
  );
}

export default App;
