const config = {
  plugins: [
    "@tailwindcss/postcss", // Use the dedicated PostCSS plugin
    "autoprefixer",
    // postcss-nesting might be needed if @tailwindcss/postcss doesn't handle it
    // or if specific nesting features are desired.
    // For now, let's see if @tailwindcss/postcss is sufficient.
    // "postcss-nesting": {}, 
  ]
};

export default config;
