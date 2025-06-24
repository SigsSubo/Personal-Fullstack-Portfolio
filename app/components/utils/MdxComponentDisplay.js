"use client";

import { useMemo } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';

export default function MdxComponentDisplay({ code }) {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  return <Component />;
}
