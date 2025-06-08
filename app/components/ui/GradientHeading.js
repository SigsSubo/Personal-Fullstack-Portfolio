import React from 'react';
// import clsx from 'clsx'; // Optional: for more robust class merging

export default function GradientHeading({
  as: Tag = 'h1', // Default to 'h1'
  children,
  className, // User-provided classes
  gradientClassName = 'from-sky-400 via-blue-500 to-indigo-600', // Default gradient
  defaultSizeVariant, // e.g., "4xl", "3xl"
}) {
  let sizeClasses = '';
  // Use defaultSizeVariant if provided, otherwise, it remains empty for Tag-based fallback
  const selectedSizeVariant = defaultSizeVariant || ''; 

  // Determine size class based on defaultSizeVariant or Tag
  if (selectedSizeVariant === '4xl') sizeClasses = 'text-4xl font-bold';
  else if (selectedSizeVariant === '3xl') sizeClasses = 'text-3xl font-bold';
  else if (selectedSizeVariant === '2xl') sizeClasses = 'text-2xl font-bold';
  else if (selectedSizeVariant === 'xl') sizeClasses = 'text-xl font-bold';
  else if (selectedSizeVariant === 'lg') sizeClasses = 'text-lg font-semibold';
  else if (selectedSizeVariant === 'md') sizeClasses = 'text-base font-semibold'; // Changed to text-base
  else if (selectedSizeVariant === 'sm') sizeClasses = 'text-sm font-semibold';
  else {
    // Fallback to Tag-based sizing if no defaultSizeVariant is provided
    if (Tag === 'h1') sizeClasses = 'text-4xl font-bold';
    else if (Tag === 'h2') sizeClasses = 'text-3xl font-bold';
    else if (Tag === 'h3') sizeClasses = 'text-2xl font-bold';
    else if (Tag === 'h4') sizeClasses = 'text-xl font-bold';
    else if (Tag === 'h5') sizeClasses = 'text-lg font-semibold';
    else if (Tag === 'h6') sizeClasses = 'text-base font-semibold';
    // No default size for p, span etc. unless specified by defaultSizeVariant or className
  }

  const combinedClassName = `
    ${sizeClasses}
    bg-gradient-to-r ${gradientClassName} 
    text-transparent bg-clip-text 
    ${className || ''}
  `.replace(/\s+/g, ' ').trim(); // Basic cleanup for extra spaces

  return React.createElement(Tag, { className: combinedClassName }, children);
}
