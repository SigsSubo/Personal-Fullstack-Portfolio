const notes = [
  {
    id: 1,
    title: "Markdown Enhanced Note", // Updated title
    date: "2024-07-28",
    content: `
This note demonstrates **various Markdown features**. 
It's important to ensure *proper rendering* of these elements.

### Key Features to Test:
- Headings (like the one above)
- Bold and Italic text (already shown)
- Unordered lists
- Hyperlinks
- Code blocks

<h1>HTML Heading</h1>

For more information, you can [visit the Markdown Guide](https://www.markdownguide.org).

\`\`\`javascript
// Example code block
function greet(name) {
  console.log(\`Hello, \${name} from this Markdown note!\`);
}
greet('User');
\`\`\`

Further discussion on project milestones and upcoming deadlines. Key takeaways: focus on user testing and iterate on feedback.
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
