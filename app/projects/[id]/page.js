"use client";

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import projectsData from '../../data/projects'; // Correct path
import { ExternalLink as ExternalLinkIcon, ArrowLeft } from 'lucide-react'; // Using specific name for icon

export default function ProjectDetailPage() {
  const params = useParams();
  const id = params.id;

  const project = projectsData.find(p => p.id.toString() === id);

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-6 py-8">
        <h1 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-slate-100">Project not found</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          Sorry, we couldn't find the project you're looking for.
        </p>
        <Link 
          href="/projects" 
          className="inline-flex items-center text-sky-600 dark:text-sky-400 hover:text-sky-500 dark:hover:text-sky-300 group transition-colors duration-200"
        >
          <ArrowLeft className="h-4 w-4 mr-2 transform transition-transform duration-200 ease-in-out group-hover:-translate-x-1" />
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 sm:py-16 lg:py-20 mt-16">
      <motion.div
        layoutId={`project-card-${project.id}`} // Matching layoutId
        className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut", delay: 0.1 }} // Delay allows layout to settle before content fades in
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">{project.title}</h1>
        <p className="text-slate-600 dark:text-slate-300 mb-6 whitespace-pre-wrap text-base sm:text-lg leading-relaxed">{project.description}</p>
        
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-3">Technologies:</h4>
          <div className="flex flex-wrap gap-2">
            {project.tags && project.tags.map((tag) => (
              <span 
                key={tag} 
                className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 px-3 py-1.5 text-sm rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        {project.link && project.link !== "#" && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-500 transition-colors group text-lg"
          >
            View Project
            <ExternalLinkIcon className="ml-2 h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        )}
      </motion.div>

      <div className="mt-10 sm:mt-12 text-center">
        <Link 
          href="/projects" 
          className="inline-flex items-center text-sky-600 dark:text-sky-400 hover:text-sky-500 dark:hover:text-sky-300 group transition-colors duration-200"
        >
          <ArrowLeft className="h-4 w-4 mr-2 transform transition-transform duration-200 ease-in-out group-hover:-translate-x-1" />
          Back to Projects
        </Link>
      </div>
    </div>
  );
}
