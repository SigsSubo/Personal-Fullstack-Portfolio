"use client";

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import notesData from '../../data/notes'; 
import ReactMarkdown from 'react-markdown'; // Added import for ReactMarkdown
import MarkdownRenderer from '@/app/components/utils/MarkdownRenderer';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

export default function NoteDetailPage() {
  const params = useParams();
  const id = params.id;

  const note = notesData.find(n => n.id.toString() === id);

  if (!note) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-6 py-8">
        <h1 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-slate-100">Note not found</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          Sorry, we couldn't find the note you're looking for.
        </p>
        <Link 
          href="/notes" 
          className="inline-flex items-center text-sky-600 dark:text-sky-400 hover:text-sky-500 dark:hover:text-sky-300 group transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 transform transition-transform duration-200 ease-in-out group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back to Notes
        </Link>
      </div>
    );
  }

  const parts = note.date.split('-');
  const localDate = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
  const displayDate = localDate.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 sm:py-16 lg:py-20 mt-30">
      <motion.div
        layoutId={`note-card-${note.id}`} 
        className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut", delay: 0.1 }} 
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-3 sm:mb-4">{note.title}</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 sm:mb-8">{displayDate}</p>
        
        <div className="prose prose-slate mx-auto p-6" // Removed whitespace-pre-wrap and base text styling
        >
          {/* Content is now rendered by ReactMarkdown */}
        <ReactMarkdown remarkPlugins={[remarkGfm]}   rehypePlugins={[rehypeHighlight]}>
          {note.content}
        </ReactMarkdown>
        </div>

        
      </motion.div>

      {/* Comments Section Placeholder */}
      <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl sm:text-3xl font-semibold text-slate-800 dark:text-slate-100 mb-8">
          Comments
        </h2>

        <div className="mb-10 p-6 border border-dashed border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-800/30 text-center">
          <p className="text-slate-500 dark:text-slate-400 italic">
            {/* TODO: Implement Comment Submission Form */}
            Comment submission form will be implemented here. (Future integration with backend)
          </p>
        </div>

        <div className="p-6 border border-dashed border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-800/30 text-center">
          <p className="text-slate-500 dark:text-slate-400 italic">
            {/* TODO: Implement Comments List Display */}
            User comments will be loaded and displayed here. (Future integration with backend: gRPC/Kafka via Spring Boot)
          </p>
        </div>
      </div>

      <div className="mt-12 text-center"> 
        <Link 
          href="/notes" 
          className="inline-flex items-center text-sky-600 dark:text-sky-400 hover:text-sky-500 dark:hover:text-sky-300 group transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 transform transition-transform duration-200 ease-in-out group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back to Notes
        </Link>
      </div>
    </div>
  );
}
