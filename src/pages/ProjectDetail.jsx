import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import { projects } from '../data/projects';
import { motion } from 'framer-motion';

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find(p => p.id === id);

  if (!project) return <div>Project not found</div>;

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header />
      <main className="pt-32 pb-24">
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="w-full h-[70vh] relative mb-16"
        >
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        </motion.div>

        <div className="max-w-4xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">{project.title}</h1>
            
            <div className="flex gap-8 mb-12 border-b pb-8 border-gray-200">
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Category</p>
                <p className="font-semibold">{project.category}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Location</p>
                <p className="font-semibold">{project.location}</p>
              </div>
            </div>

            <p className="text-xl leading-relaxed text-gray-700 mb-16">
              {project.description}
            </p>

            <Link to="/projects" className="inline-block bg-[#1c1c1c] text-white px-8 py-3 rounded-full font-semibold hover:bg-black transition-colors">
              Back to Projects
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
