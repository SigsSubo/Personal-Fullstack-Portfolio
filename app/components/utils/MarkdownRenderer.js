// This component remains a Server Component by convention (async function in app dir)
// It imports the MDX bundling logic from a .server.js file.

import { bundleMdxContent } from '@/lib/mdxUtils.server';
import MdxComponentDisplay from './MdxComponentDisplay';

export default async function MarkdownRenderer({ content }) {
  // The actual bundling now happens in a server-only context
  const code = await bundleMdxContent(content);

  return (
    <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl prose-slate mx-auto indent-4">
      <MdxComponentDisplay code={code} />
    </div>
  );
}
