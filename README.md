# DigiRoots - Business Website

A modern, professional business website built with React, TypeScript, Tailwind CSS, and subtle 3D animations.

## 🚀 Tech Stack

- **React 18** with TypeScript
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **Three.js / React Three Fiber** - Subtle 3D elements
- **Lucide React** - Beautiful icons

## 📁 Project Structure

```
digiroots-website/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── Scene3D.tsx
│   ├── sections/            # Page sections
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── HowWeWork.tsx
│   │   ├── About.tsx
│   │   └── Contact.tsx
│   ├── pages/               # Full pages
│   │   └── Home.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## 🎨 Features

### Core Features
- ✅ Responsive design (mobile-first)
- ✅ Smooth scroll navigation
- ✅ Subtle 3D background animations
- ✅ Framer Motion page transitions
- ✅ Clean, minimal design
- ✅ Professional color palette
- ✅ Optimized performance

### Sections
1. **Hero** - Eye-catching landing with 3D background and CTAs
2. **Services** - 6 service cards with icons
3. **How We Work** - 4-step process timeline
4. **About** - Company story and values
5. **Contact** - Professional contact form

## 🛠️ Development

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🎯 Customization Guide

### Colors
Edit `tailwind.config.js` to customize the color palette:
- Primary color: Used for CTAs and accents
- Dark colors: Text and backgrounds

### Content
Update content in the following files:
- **Hero section**: `src/sections/Hero.tsx`
- **Services**: `src/sections/Services.tsx`
- **About**: `src/sections/About.tsx`
- **Contact info**: `src/components/Footer.tsx`

### Form Integration
The contact form in `src/sections/Contact.tsx` logs to console. Integrate with:
- **Email services**: SendGrid, Mailgun
- **Automation**: n8n, Zapier, Make
- **CRM**: HubSpot, Salesforce

### 3D Elements
Modify `src/components/Scene3D.tsx` to adjust:
- Sphere count and positions
- Colors and opacity
- Animation speed

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag and drop 'dist' folder to Netlify
```

### GitHub Pages
```bash
npm run build
# Deploy 'dist' folder
```

## 📱 Mobile Responsive

The website is fully responsive with breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## ⚡ Performance

- Lazy loading for images
- Optimized bundle size
- Minimal 3D rendering
- Efficient animations
- Fast load times

## 🎨 Design Philosophy

- **Minimal**: Plenty of white space
- **Professional**: Clean typography and layout
- **Subtle**: Non-distracting animations
- **Trustworthy**: Business-focused design
- **Modern**: Current design trends

## 📝 License

MIT License - feel free to use for your projects

## 🤝 Support

For questions or issues, contact: hello@digiroots.com

---

Built with ❤️ by DigiRoots
