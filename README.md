# Next.js Blog Platform

A modern, performant, and customizable blog platform built with [Next.js](https://nextjs.org/). This project is designed to be developer-friendly, SEO-optimized, and easily extendable for personal blogs, portfolios, or content websites.

## 🚀 Features

- ⚡️ **Next.js** for server-side rendering and static site generation
- 📝 **Markdown/MDX** support for writing blog posts
- 🎨 **Custom theming** with Tailwind CSS
- 🔍 **SEO optimized** with Open Graph and Twitter meta tags
- 🌐 **Dynamic routing** for blog pages
- 📅 **Post metadata** (date, tags, author)
- 🔗 **Social sharing links**
- 🧠 **Syntax highlighting** for code blocks
- 🔍 **Search functionality**
- 🧩 Easily extensible with plugins or CMS integrations

## 🛠️ Tech Stack

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MDX](https://mdxjs.com/)
- [gray-matter](https://github.com/jonschlinkert/gray-matter) for frontmatter parsing
- [remark](https://github.com/remarkjs/remark) / [rehype](https://github.com/rehypejs/rehype) for content processing

## 📁 Project Structure

```bash
.
├── components/       # Reusable components (Header, Footer, PostCard, etc.)
├── lib/              # Utility functions (e.g., markdown parser, date formatters)
├── pages/            # Next.js pages (index, blog/[slug], etc.)
├── posts/            # Markdown/MDX blog posts
├── public/           # Static assets
├── styles/           # Global styles and Tailwind config
├── .env.local        # Environment variables
└── next.config.js    # Next.js config
```

## 🧑‍💻 Getting Started

1. **Clone the repo**

```bash
git clone https://github.com/your-username/nextjs-blog-platform.git
cd nextjs-blog-platform
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Run the development server**

```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser to view the blog.

## ✅ TODO / Customization Ideas

- [ ] Add CMS integration (e.g., Sanity, Contentful, Notion)
- [ ] Implement comments (e.g., Disqus, Giscus)
- [ ] Add dark mode toggle
- [ ] Add RSS feed
- [ ] Deploy to Vercel or other hosting provider

## 🧪 Testing

```bash
npm run test
# or
yarn test
```

## 📦 Deployment

Ready to deploy? You can deploy this blog platform to any platform that supports Next.js:

- [Vercel (recommended)](https://vercel.com/)
- Netlify
- Render
- Your own server

## 📄 License

[MIT](LICENSE)# nextjs-blog-platform
