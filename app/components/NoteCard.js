"use client";

import Card from './Card';
import Link from 'next/link'; // Import Link

export default function NoteCard({ note }) {
  if (!note) {
    return null; 
  }

  return (
    <Link href={`/notes/${note.id}`} passHref legacyBehavior className='mt-40'>
      <a className="block no-underline text-current"> {/* Wrapper <a> tag */}
        <Card 
          title={note.title} 
          className="mb-6" // Existing className
          layoutId={`note-card-${note.id}`} // Added layoutId
        >
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">{note.date}</p>
          <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{note.content.split(/\s+/).slice(0, 20).join(' ')}</p>
        </Card>
      </a>
    </Link>
  );
}
