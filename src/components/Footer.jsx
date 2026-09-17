import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-[#111] text-white pt-32 pb-12 px-6" id="contact">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 mb-24">
        
        {/* Brand / Intro */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">Let's talk.</h2>
          <p className="text-gray-400 text-lg mb-12 max-w-sm">
            Whether you have a clear vision or just a blank page, we are ready to build the extraordinary.
          </p>
          
          <div className="space-y-4 text-sm font-medium tracking-wide">
            <p className="text-gray-500 uppercase text-xs tracking-widest mb-2">Studio</p>
            <p className="text-xl font-bold tracking-tight">Atelier Architecture</p>
            <p className="text-gray-400">High-End Architecture & Interior Atelier</p>
          </div>
        </motion.div>

        {/* Inquiry Form */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="border-b border-gray-700 pb-2">
              <input type="text" placeholder="Your Name" className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none text-lg" />
            </div>
            <div className="border-b border-gray-700 pb-2">
              <input type="email" placeholder="Email Address" className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none text-lg" />
            </div>
            <div className="border-b border-gray-700 pb-2">
              <textarea placeholder="Tell us about your project" rows="3" className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none text-lg resize-none"></textarea>
            </div>
            <button className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition-colors w-full md:w-auto">
              Submit Inquiry
            </button>
          </form>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 font-medium">
        <p>&copy; {new Date().getFullYear()} Atelier Architecture Studio. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-white transition-colors">Pinterest</a>
        </div>
      </div>
    </footer>
  );
}