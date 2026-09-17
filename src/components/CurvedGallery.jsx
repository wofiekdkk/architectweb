import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';

export default function CurvedGallery() {
  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // Recalculate width when component mounts or window resizes
    const updateWidth = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.scrollWidth - containerRef.current.offsetWidth);
      }
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    
    // Give images a moment to load before recalculating
    setTimeout(updateWidth, 500);
    
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return (
    <div className="relative w-full overflow-hidden py-16 perspective-container cursor-grab active:cursor-grabbing" ref={containerRef}>
      <motion.div 
        drag="x" 
        dragConstraints={{ right: 0, left: -width }}
        dragElastic={0.1}
        className="flex items-center gap-4 px-[10vw] preserve-3d"
      >
        {projects.map((project, i) => {
          // Adjust curve dynamically for a longer list of images
          const middle = Math.floor(projects.length / 2);
          const offset = i - middle;
          
          // Smoother curve math for 9 items
          const rotateY = offset * -8; // Slightly looser angle for more items
          const translateZ = Math.abs(offset) * -45;
          
          return (
            <motion.div 
              key={project.id}
              className="w-[75vw] md:w-[25vw] min-w-[280px] h-[55vh] min-h-[400px] shrink-0 rounded-sm overflow-hidden shadow-2xl bg-gray-200"
              style={{
                transform: `rotateY(${rotateY}deg) translateZ(${translateZ}px)`,
                transition: "transform 0.4s ease-out"
              }}
            >
              <img 
                src={project.image} 
                alt={project.title} 
                loading="lazy"
                className="w-full h-full object-cover pointer-events-none" 
              />
            </motion.div>
          );
        })}
      </motion.div>
      
      {/* Desktop drag hint */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity hidden md:flex">
        <div className="w-16 h-16 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/><path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/><path d="M6 11V6a2 2 0 0 1 2-2v0a2 2 0 0 1 2 2v0"/></svg>
        </div>
      </div>
    </div>
  );
}