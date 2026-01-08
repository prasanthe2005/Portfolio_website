# Prasanth E – Portfolio (React + Vite)

Modern, responsive IT fresher portfolio for Prasanth E with hero spotlight, about section, skills showcase, project highlights, resume download, and EmailJS-enabled contact form.

## Features

✨ **Complete Portfolio Sections**:
- **Hero/Introduction**: Eye-catching header with professional photo and key stats
- **About Me**: Detailed background story and career goals
- **Skills**: Interactive skill cards organized by category
- **Projects**: Featured work with descriptions and live links
- **Resume**: Combined education, certifications, and achievements with download button
- **Contact**: Working contact form (EmailJS) with social links

🎨 **Modern Design**:
- Fully responsive (mobile, tablet, desktop)
- Dark theme with gradient accents
- Smooth scroll animations (Framer Motion)
- Glassmorphism effects
- Interactive hover states
- Mobile hamburger navigation

♿ **Accessibility**:
- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Screen reader friendly
- Proper heading hierarchy

## Quick start

1) Install dependencies

```bash
npm install
```

2) Start the dev server

```bash
npm run dev
```

3) Build for production

```bash
npm run build
```

## Customization

### 1. Update Your Content

Edit [src/data/content.ts](src/data/content.ts) to update:
- Personal information (name, email, phone, location)
- Skills and technologies
- Project details
- Education and certifications
- Social media links

### 2. Add Your Photo

Replace `public/profile.jpg` with your professional headshot:
- Recommended size: 800x1000px (4:5 aspect ratio)
- Format: JPG or PNG
- Keep filename as `profile.jpg` or update the path in [src/App.tsx](src/App.tsx)
- A placeholder SVG is included until you add your photo

### 3. Add Your Resume PDF

1. Export your resume as PDF
2. Place it in the `public` folder as `resume.pdf`
3. Update the `resumeUrl` in [src/data/content.ts](src/data/content.ts):
   ```typescript
   resumeUrl: '/resume.pdf'
   ```

### 4. Setup Contact Form (EmailJS)

To enable the contact form:

1. Create a free account at [EmailJS](https://www.emailjs.com/)
2. Create an email service and template
3. In [src/App.tsx](src/App.tsx), find the `ContactForm` component and replace:
   - `YOUR_SERVICE_ID` with your EmailJS service ID
   - `YOUR_TEMPLATE_ID` with your template ID
   - `YOUR_PUBLIC_KEY` with your public key

Your template should have these fields: `user_name`, `user_email`, `message`

### 5. Customize Theme & Colors

Edit [tailwind.config.js](tailwind.config.js) to change:
- Primary color palette
- Shadow effects
- Custom animations

Edit [src/index.css](src/index.css) for:
- Global styles
- Background gradients
- Typography

## Tech stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 3
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: EmailJS Browser
- **Router**: React Router DOM

## Scripts

- `npm run dev` – Start local dev server (http://localhost:5173)
- `npm run build` – Type-check and create production build
- `npm run preview` – Preview the production build locally
- `npm run lint` – Run ESLint

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project at [vercel.com](https://vercel.com)
3. Vercel auto-detects Vite config
4. Deploy!

### Deploy to Netlify

1. Run `npm run build` to create `dist` folder
2. Drag `dist` folder to [Netlify Drop](https://app.netlify.com/drop)
3. Or connect your GitHub repo for auto-deploys

### Deploy to GitHub Pages

1. Install: `npm install -D gh-pages`
2. Update `vite.config.ts`:
   ```typescript
   export default defineConfig({
     base: '/your-repo-name/',
     // ... rest of config
   })
   ```
3. Add to `package.json`:
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```
4. Run: `npm run deploy`

## Project Structure

```
portfolio/
├── public/
│   ├── profile.jpg              # Your photo (replace this!)
│   ├── profile-placeholder.svg  # Fallback placeholder
│   └── resume.pdf              # Your resume PDF (add this!)
├── src/
│   ├── data/
│   │   └── content.ts          # All your portfolio content
│   ├── App.tsx                 # Main app component
│   ├── index.css               # Global styles
│   └── main.tsx                # Entry point
├── .github/
│   └── copilot-instructions.md # Development workflow
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Lighthouse Score: 95+ (Performance, Accessibility, Best Practices, SEO)
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Bundle size: ~380KB (gzipped: ~121KB)

## License

Free to use for personal portfolios. Attribution appreciated but not required.

---

Built with ❤️ using React + Vite + Tailwind
