const notes = [
  {
    id: 1,
    title: "Markdown Enhanced Note", // Updated title
    date: "2024-07-28",
    content: `
# Project Notes

This note demonstrates **various Markdown features**.  
It's important to ensure *proper rendering* of these elements.

### Key Features to Test:
- Headings (like the one above)
- Bold and Italic text (already shown)
- ~~Strikethrough~~ support
- [x] Completed Task  
- [ ] Incomplete Task  
- Unordered lists
- [Visit Markdown Guide](https://www.markdownguide.org)

### Code Example:
\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}\`);
}
greet('User');
\`\`\`

### Table Example:

| Feature         | Supported |
|----------------|-----------|
| Bold           | ✅        |
| Tables         | ✅        |
| Code Blocks    | ✅        |
| Task Lists     | ✅        |
| Links          | ✅        |
`,
  },
  {
    id: 2,
    title: "Brainstorming Ideas",
    date: "2024-07-27",
    content: "Generated several ideas for the new feature. Explored potential user flows and UI designs.",
  },
  {
    id: 3,
    title: "Learning Next.js",
    date: "2024-07-26",
    content: "Started learning Next.js. Covered routing, data fetching, and server components. Exciting stuff!",
  },
];

export default notes;
