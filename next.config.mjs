import mdx from '@next/mdx';

/** @type {import('next').NextConfig} */
const withMDX = mdx();

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
};

export default withMDX(nextConfig);
