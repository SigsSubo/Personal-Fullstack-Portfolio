import "server-only";

import { bundleMDX } from "mdx-bundler";
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// This function will bundle the MDX content.
// It's in a .server.js file and uses "server-only" to ensure it's not bundled for the client.
export async function bundleMdxContent(content) {
  const { code } = await bundleMDX({
    source: content,
    // esbuildOptions can be set here if needed
    // esbuildOptions: (options) => {
    //   options.target = 'es2020';
    //   return options;
    // },
    mdxOptions(options) {
      options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkGfm];
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      ];
      return options;
    },
  });
  return code;
}
