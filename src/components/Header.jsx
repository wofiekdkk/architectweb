import { useState } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 w-full flex justify-between items-center px-6 py-6 bg-white/80 backdrop-blur-md z-50">
        <Link to="/" className="text-sm font-bold tracking-tighter uppercase hover:opacity-70 transition-opacity">
          Atelier Architecture
        </Link>
        
        <button 
          onClick={() => setIsOpen(true)}
          className="text-2xl font-light tracking-widest hover:opacity-70 transition-opacity"
        >
          =
        </button>

        <Link to="/contact" className="bg-[#1c1c1c] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-black transition-colors">
          Book a meeting
        </Link>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-white z-[60] flex flex-col items-center justify-center"
          >
            <button onClick={() => setIsOpen(false)} className="absolute top-8 right-8">
              <X size={32} />
            </button>
            <nav className="flex flex-col items-center gap-8 text-4xl font-bold tracking-tighter">
              <Link onClick={() => setIsOpen(false)} to="/" className="hover:text-gray-500 transition-colors">Home</Link>
              <Link onClick={() => setIsOpen(false)} to="/about" className="hover:text-gray-500 transition-colors">About Studio</Link>
              <Link onClick={() => setIsOpen(false)} to="/architecture" className="hover:text-gray-500 transition-colors">Architecture</Link>
              <Link onClick={() => setIsOpen(false)} to="/interior" className="hover:text-gray-500 transition-colors">Interior Design</Link>
              <Link onClick={() => setIsOpen(false)} to="/projects" className="hover:text-gray-500 transition-colors">Projects</Link>
              <Link onClick={() => setIsOpen(false)} to="/contact" className="hover:text-gray-500 transition-colors">Contact</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}