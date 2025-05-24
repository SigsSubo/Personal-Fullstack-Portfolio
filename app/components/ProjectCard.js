"use client";

import Card from './Card';
import Link from 'next/link'; // Import Link
import { ExternalLink } from 'lucide-react';

export default function ProjectCard({ project }) {
  if (!project) {
    return null;
  }

  // Handler for the external link click
  const handleExternalLinkClick = (e) => {
    e.stopPropagation(); // Prevent the Link wrapper's navigation
    // The browser's default behavior for an <a> tag will handle the external navigation
  };

  return (
    <Link href={`/projects/${project.id}`} passHref legacyBehavior>
      <a className="block no-underline text-current h-full"> {/* Wrapper <a> tag, h-full makes it fill the card */}
        <Card 
          title={project.title} 
          className="mb-6 flex flex-col h-full" // Existing className
          layoutId={`project-card-${project.id}`} // Added layoutId
        >
          <p className="text-slate-700 dark:text-slate-300 mb-4 flex-grow">{project.description}</p>
          
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2">Technologies:</h4>
            <div className="flex flex-wrap gap-2">
              {project.tags && project.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 px-2 py-1 text-xs rounded-md"
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
              className="inline-flex items-center text-sm text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-500 transition-colors group"
              onClick={handleExternalLinkClick} // Added onClick handler
            >
              View Project
              <ExternalLink className="ml-1.5 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          )}
        </Card>
      </a>
    </Link>
  );
}
