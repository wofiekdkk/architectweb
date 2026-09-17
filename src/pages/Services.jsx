import Header from '../components/Header';
import { motion } from 'framer-motion';

export default function Services({ type }) {
  const isArch = type === 'architecture';
  const title = isArch ? "Architecture Services" : "Interior Design Services";
  const image = isArch 
    ? "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
    : "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2070&auto=format&fit=crop";

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header />
      <main className="pt-40 px-6 max-w-6xl mx-auto pb-24">
        <motion.h1 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-5xl md:text-7xl font-bold tracking-tighter mb-16 text-center"
        >
          {title}
        </motion.h1>
        
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <img src={image} alt={title} className="w-full h-[60vh] object-cover rounded-sm shadow-2xl mb-16" />
        </motion.div>

        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xl md:text-2xl text-gray-800 leading-relaxed font-medium">
            {isArch 
              ? "We shape the built environment with precision, creating structural masterpieces that harmonize with their surroundings and stand the test of time."
              : "We curate internal spaces that evoke emotion, meticulously selecting materials, textures, and lighting to craft environments of unparalleled comfort."}
          </p>
        </div>
      </main>
    </div>
  );
}
