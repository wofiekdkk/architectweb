import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import { motion } from 'framer-motion';

export default function Projects() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header />
      <main className="pt-40 px-6 max-w-7xl mx-auto pb-24">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-16">Selected Works</h1>
        
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-16">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index % 2 === 0 ? 0 : 0.2 }}
            >
              <Link to={`/projects/${project.id}`} className="group block">
                <div className="overflow-hidden rounded-sm shadow-lg mb-6 h-[50vh]">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <h2 className="text-2xl font-bold tracking-tight mb-2">{project.title}</h2>
                <p className="text-gray-500 font-medium">{project.category} — {project.location}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
