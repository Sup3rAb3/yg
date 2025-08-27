
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';
import '@fontsource-variable/inter';
import './App.css';
import './index.css';


function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-gray-200 font-sans" style={{ fontFamily: 'InterVariable, sans-serif' }}>
      {/* Navigation */}
      <nav className="flex justify-between items-center px-8 py-6 bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-30">
        <span className="text-2xl font-extrabold text-black tracking-tight">YourBrand</span>
        <ul className="flex gap-8 text-gray-700 font-medium">
          <li className="hover:text-yellow-400 transition-colors cursor-pointer">Home</li>
          <li className="hover:text-yellow-400 transition-colors cursor-pointer">About</li>
          <li className="hover:text-yellow-400 transition-colors cursor-pointer">Work</li>
          <li className="hover:text-yellow-400 transition-colors cursor-pointer">Contact</li>
        </ul>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center h-[80vh] text-center relative">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-6xl md:text-7xl font-extrabold text-black mb-6 leading-tight drop-shadow"
        >
          Welcome to <span className="text-yellow-400">YourBrand</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-xl md:text-2xl text-gray-600 max-w-2xl mb-10"
        >
          We craft interactive, fluid, and minimal digital experiences. <br />
          <span className="text-gray-400 text-base">(Inspired by lusion.co, minus the heavy videos!)</span>
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.97 }}
          className="px-8 py-3 rounded-full bg-yellow-400 text-black font-bold shadow-lg hover:bg-black hover:text-yellow-400 transition-colors text-lg"
        >
          See Our Work
        </motion.button>
      </main>
    </div>
  );
}

export default App
