import Header from '../components/Header';
import CurvedGallery from '../components/CurvedGallery';
import Footer from '../components/Footer';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header />
      
      <main>
        {/* HERO SECTION */}
        <section className="pt-32 md:pt-40 pb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center px-6"
          >
            <h1 className="text-6xl md:text-[7.5rem] font-bold tracking-tighter leading-[0.95] mb-8 text-[#111]">
              Atelier<br />
              Architecture<br />
              Studio
            </h1>
            <p className="text-sm md:text-base text-gray-700 font-medium max-w-md mx-auto">
              Where structural purity meets timeless space.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <CurvedGallery />
          </motion.div>

          <div className="flex flex-col items-center text-center max-w-2xl mx-auto px-6 pb-24 pt-8">
            <p className="text-sm md:text-base text-gray-800 font-medium leading-relaxed mb-6">
              We design private residences and commercial spaces from a blank page. 
              No templates, no repeated floorplans, no shortcuts.
            </p>
            <div className="flex items-center gap-6 text-sm font-bold">
              <Link to="/contact" className="underline underline-offset-4 decoration-2 hover:text-gray-500 transition-colors cursor-pointer">
                Book a meeting
              </Link>
              <Link to="/projects" className="underline underline-offset-4 decoration-2 hover:text-gray-500 transition-colors">
                See Projects
              </Link>
            </div>
          </div>
        </section>

        {/* PHILOSOPHY SECTION */}
        <section className="py-32 bg-white px-6">
          <div className="max-w-5xl mx-auto">
            <motion.h2 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
              className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight mb-12"
            >
              We believe architecture is more than structure. It is the silent art of shaping human experience through light, space, and materiality.
            </motion.h2>
            
            <div className="grid md:grid-cols-2 gap-12 text-gray-600 text-lg font-medium">
              <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                Atelier Architecture approaches every site as a unique dialogue between the natural environment and refined human living. 
              </motion.p>
              <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ delay: 0.2 }}>
                We reject the generic. By utilizing carefully selected materials and intentional design, we craft homes that breathe and commercial spaces that inspire.
              </motion.p>
            </div>
          </div>
        </section>

        {/* PARALLAX SERVICES SECTION */}
        <section ref={containerRef} className="py-32 overflow-hidden px-6 bg-[#fafafa]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-16 items-center">
              
              <div className="w-full md:w-1/2 space-y-16">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                  <p className="text-sm font-bold tracking-widest uppercase text-gray-400 mb-4">01. Architecture</p>
                  <h3 className="text-4xl font-bold tracking-tighter mb-4">Form & Function</h3>
                  <p className="text-gray-600 mb-8">Ground-up construction designing distinct silhouettes that stand as modern landmarks while deeply respecting their natural topology.</p>
                  <Link to="/architecture" className="text-black font-bold border-b-2 border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors">Explore Architecture</Link>
                </motion.div>
                
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                  <p className="text-sm font-bold tracking-widest uppercase text-gray-400 mb-4">02. Interior Design</p>
                  <h3 className="text-4xl font-bold tracking-tighter mb-4">Tactile Spaces</h3>
                  <p className="text-gray-600 mb-8">Curating bespoke interiors focused on organic textures, warm palettes, and custom furniture that perfectly aligns with your lifestyle.</p>
                  <Link to="/interior" className="text-black font-bold border-b-2 border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors">Explore Interiors</Link>
                </motion.div>
              </div>

              <div className="w-full md:w-1/2 relative h-[80vh] flex justify-center items-center">
                <motion.div style={{ y: y1 }} className="absolute w-[60%] h-[60%] top-0 right-0 z-10 overflow-hidden shadow-2xl">
                  <img src="https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&w=1000&q=80" alt="Interior Details" className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" />
                </motion.div>
                <motion.div style={{ y: y2 }} className="absolute w-[70%] h-[50%] bottom-0 left-0 overflow-hidden shadow-xl">
                  <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80" alt="Exterior Details" className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" />
                </motion.div>
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}