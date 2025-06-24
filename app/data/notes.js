const notes = [
  {
    id: 1,
    title: "Markdown Showcase",
    date: "2024-07-28",
    content: `
# Markdown Showcase 🚀

This note demonstrates **key Markdown syntax** and how it might be rendered in the app.

---

## ✨ Features Preview

- **Bold**, *italic*, and ***combined***
- ~~Strikethrough~~ text
- Inline code like \`const x = 10;\`
- Task Lists:
  - [x] Set up markdown parser
  - [x] Add styling to headings
  - [ ] Handle images and links
- Links: [Markdown Cheatsheet](https://www.markdownguide.org/cheat-sheet/)

---



## 📊 Markdown Table

| Syntax Type    | Example         | Rendered? |
|----------------|------------------|-----------|
| Heading        | \`# Title\`        | ✅        |
| Bold           | \`**bold**\`       | ✅        |
| Code Block     | \` \`\`\`js \`\`\` \` | ✅        |
| Link           | \`[text](url)\`   | ✅        |

> “Markdown is not a replacement for HTML, but it can cover most writing needs.”

---
    `,
  },
  {
    id: 2,
    title: "💡 Feature Brainstorm - Mobile App",
    date: "2024-07-27",
    content: `
### Goals
- Improve onboarding flow
- Add biometric login (TouchID/FaceID)
- Show daily tips via push notifications

### Feature Ideas
- **Streak Tracker**: Show progress over consecutive days
- **Custom Themes**: Light, Dark, Solarized
- **Offline Mode**: Save notes and sync later

### Notes
- Focus on accessibility (WCAG)
- Investigate user analytics integration
    `,
  },
  {
    id: 3,
    title: "📚 Next.js Learning Log",
    date: "2024-07-26",
    content: `
# Next.js Journey

Learned about key features in **Next.js**:

## ✅ Covered Topics
- File-based routing
- API routes
- Server Components (React 19)
- Dynamic metadata with \`generateMetadata\`

## 🧠 Insights
- The \`app/\` directory simplifies routing and layouts.
- Server Components + Suspense = Great performance
- Edge functions feel like magic!

## 🔗 Resources
- [Official Docs](https://nextjs.org/docs)
- [Server Components Intro](https://nextjs.org/docs/app/building-your-application/rendering/server-components)

---
`,
  },
];

export default notes;
