import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header />
      <main className="pt-40 px-6 max-w-4xl mx-auto pb-24 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold tracking-tighter mb-8"
        >
          Book a meeting
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="text-xl text-gray-600 mb-16 max-w-2xl mx-auto"
        >
          Ready to start your bespoke project? Share a few details and we'll get back to you.
        </motion.p>

        <motion.form 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="max-w-xl mx-auto text-left space-y-6"
          onSubmit={(e) => { e.preventDefault(); alert('Form is temporary. Connect a backend to enable real submissions.'); }}
        >
          <div>
            <label className="block text-sm font-bold mb-2">Name</label>
            <input type="text" className="w-full bg-white border border-gray-300 p-4 rounded-sm focus:outline-none focus:border-black" required />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Email</label>
            <input type="email" className="w-full bg-white border border-gray-300 p-4 rounded-sm focus:outline-none focus:border-black" required />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Project Details</label>
            <textarea className="w-full bg-white border border-gray-300 p-4 rounded-sm h-32 focus:outline-none focus:border-black" required></textarea>
          </div>
          <button type="submit" className="w-full bg-[#1c1c1c] text-white py-4 rounded-full font-bold hover:bg-black transition-colors">
            Send Inquiry
          </button>
        </motion.form>
      </main>
      <Footer />
    </div>
  );
}