// "use client"; // Removed

// import { useParams } from 'next/navigation'; // Removed
import Link from 'next/link';
// import { motion } from 'framer-motion'; // Removed
import notesData from '../../data/notes'; 
// import ReactMarkdown from 'react-markdown'; // Removed

import MarkdownRenderer from '@/app/components/utils/MarkdownRenderer';

import NoteContentClient from '@/app/components/NoteContentClient';



// import remarkGfm from 'remark-gfm'; // Removed
// import rehypeHighlight from 'rehype-highlight'; // Removed

export default async function NoteDetailPage({ params }) { // Made async as MarkdownRenderer is async
  // const params = useParams(); // Removed
  const id = params.id; // Get id from params

  const note = notesData.find(n => n.id.toString() === id);

  if (!note) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-6 py-8">
        <h1 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-slate-100">Note not found</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          Sorry, we couldn&apos;t find the note you&apos;re looking for.
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

  // NoteDetailPage is a Server Component. It can render other Server Components like MarkdownRenderer.
  const mdxOutput = <MarkdownRenderer content={note.content} />;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 sm:py-16 lg:py-20 mt-30">
      {/* Pass the rendered Markdown (JSX) to the Client Component */}
      <NoteContentClient note={note} displayDate={displayDate} mdxOutput={mdxOutput} />

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
            User comments will be loaded and displayed here. (Future integration with backend: gRPC/Kafkac via Spring Boot)
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
