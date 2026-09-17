import { Link } from 'react-router-dom';

export default function FooterText() {
  return (
    <div className="flex flex-col items-center text-center max-w-2xl mx-auto px-6 pb-24 pt-8">
      <p className="text-sm md:text-base text-gray-800 font-medium leading-relaxed mb-6">
        We design private residences and commercial spaces from a blank page. 
        No templates, no repeated floorplans, no shortcuts.
      </p>
      <div className="flex items-center gap-6 text-sm font-bold">
        <Link to="/contact" className="underline underline-offset-4 decoration-2 hover:text-gray-500 transition-colors">
          Book a meeting
        </Link>
        <Link to="/projects" className="underline underline-offset-4 decoration-2 hover:text-gray-500 transition-colors">
          See Projects
        </Link>
      </div>
    </div>
  );
}
