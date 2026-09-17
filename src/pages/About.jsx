import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header />
      <main className="pt-40 px-6 max-w-5xl mx-auto pb-24">
        <motion.h1 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-5xl md:text-7xl font-bold tracking-tighter mb-12"
        >
          About Atelier
        </motion.h1>
        
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80" 
              alt="Studio" 
              className="w-full aspect-[4/5] object-cover rounded-sm shadow-xl"
            />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-6">Atelier Architecture Studio</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Atelier Architecture is an international architectural practice and design atelier dedicated to crafting bespoke spaces. We believe that true luxury lies in thoughtful space planning, natural light, and uncompromising material quality.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Whether it's a private residence or a commercial landmark, we approach every project from a blank page. No templates, no repeated floorplans, no shortcuts. Just pure, intentional design tailored to your vision.
            </p>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}