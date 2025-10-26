# Next.js Static Export Portfolio Boilerplate

A modern, responsive portfolio boilerplate built with Next.js 16, TypeScript, and Tailwind CSS. This project is configured for static site generation, making it perfect for hosting on CDNs and static hosting platforms.

## 🚀 Features

- **Next.js 16** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Static Export** configuration
- **ESLint** for code quality
- **Responsive Design** - mobile-first approach
- **Modern Components** - Header, Footer, Button, Card
- **SEO Optimized** with proper metadata

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18.0 or later)
- **npm** or **yarn** package manager

You can check your Node.js version by running:
```bash
node --version
```

## 🛠️ Installation Steps

### 1. Clone or Download the Project

If you're starting from scratch, you can create a new Next.js project with the same configuration:

```bash
npx create-next-app@latest your-portfolio-name --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --yes
```

### 2. Navigate to Project Directory

```bash
cd your-portfolio-name
```

### 3. Install Dependencies

The dependencies should already be installed, but if you need to reinstall:

```bash
npm install
```

### 4. Configure for Static Export

The project is already configured for static export with the following settings in `next.config.ts`:

```typescript
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  experimental: {
    esmExternals: false
  }
};
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 🏗️ Build and Export

### Build for Production

```bash
npm run build
```

This will create an optimized production build and export static files to the `out` directory.

### Serve Static Files Locally

To test the static export locally:

```bash
npm run serve
```

This will serve the static files from the `out` directory.

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── components/
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Footer.tsx
│       └── Header.tsx
├── public/
│   └── (static assets)
├── next.config.ts
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## 🎨 Customization

### Adding New Pages

1. Create a new file in `src/app/` directory
2. Export a default React component
3. Add navigation links in `src/components/Header.tsx`

Example:
```typescript
// src/app/about/page.tsx
export default function About() {
  return (
    <div>
      <h1>About Page</h1>
    </div>
  );
}
```

### Styling

The project uses Tailwind CSS. You can:

1. Modify `src/app/globals.css` for global styles
2. Use Tailwind utility classes in components
3. Customize `tailwind.config.ts` for theme modifications

### Components

The boilerplate includes reusable components:

- **Header**: Navigation component
- **Footer**: Site footer
- **Button**: Reusable button with variants
- **Card**: Content card component

## 🚀 Deployment

### GitHub Pages (Free with Custom Domain)

This project is pre-configured for GitHub Pages deployment with automatic CI/CD:

1. **Push to GitHub**: Push your code to a GitHub repository
2. **Enable Pages**: Go to Settings → Pages → Source: GitHub Actions
3. **Add Custom Domain**: In Pages settings, add your domain
4. **Configure DNS**: Point your domain to GitHub Pages
5. **Automatic Deployment**: Every push to `main` triggers deployment

📖 **Detailed Guide**: See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete instructions.

### Other Hosting Platforms

This project can also be deployed to:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS S3 + CloudFront**
- **Any CDN or static hosting service**

### Manual Deployment

1. Run `npm run build`
2. Upload the contents of the `out` directory to your hosting service

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run export` - Export static files (same as build)
- `npm run start` - Start production server (not used for static export)
- `npm run lint` - Run ESLint
- `npm run serve` - Serve static files locally

## 🔧 Configuration Files

### next.config.ts
Contains Next.js configuration for static export.

### tailwind.config.ts
Tailwind CSS configuration for styling.

### tsconfig.json
TypeScript configuration for type checking.

### package.json
Project dependencies and scripts.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Troubleshooting

### Common Issues

1. **Build Errors**: Ensure all dependencies are installed with `npm install`
2. **TypeScript Errors**: Check your TypeScript configuration
3. **Styling Issues**: Verify Tailwind CSS is properly configured
4. **Static Export Issues**: Ensure `output: 'export'` is set in `next.config.ts`

### Getting Help

- Check the [Next.js Documentation](https://nextjs.org/docs)
- Review [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- Open an issue in this repository

## 🎯 Next Steps

1. Customize the content and styling
2. Add your projects and portfolio items
3. Configure SEO metadata
4. Add analytics (Google Analytics, etc.)
5. Set up a custom domain
6. Deploy to your preferred hosting platform

---

Happy coding! 🚀