# DigiRoots - Business Website

A modern, professional business website built with React, TypeScript, Tailwind CSS, and subtle 3D animations. Features a complete authentication system with secure password reset functionality.

## 🚀 Tech Stack

### Frontend
- **React 19** with TypeScript
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **Three.js / React Three Fiber** - Subtle 3D elements
- **React Router DOM** - Client-side routing
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **nodemailer** - Email sending
- **crypto** - Secure token generation

## 📁 Project Structure

```
digiroots-website/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── Scene3D.tsx
│   ├── context/             # React Context
│   │   └── AuthContext.tsx
│   ├── sections/            # Page sections
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── HowWeWork.tsx
│   │   ├── About.tsx
│   │   └── Contact.tsx
│   ├── pages/               # Full pages
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── Signup.tsx
│   │   ├── Dashboard.tsx
│   │   ├── ForgotPassword.tsx
│   │   └── ResetPassword.tsx
│   ├── services/            # API services
│   │   └── api.ts
│   ├── backend/             # Backend server
│   │   ├── server.js
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── middleware/
│   │   │   └── authMiddleware.js
│   │   ├── models/
│   │   │   └── User.js
│   │   ├── routes/
│   │   │   └── auth.js
│   │   └── utils/
│   │       └── sendEmail.js
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

### Authentication System
- ✅ User registration (Signup)
- ✅ User login with JWT
- ✅ Protected routes
- ✅ User profile page
- ✅ Forgot password with email
- ✅ Secure password reset
- ✅ Auth-aware navbar
- ✅ Persistent sessions

### Sections
1. **Hero** - Eye-catching landing with 3D background and CTAs
2. **Services** - 6 service cards with icons
3. **How We Work** - 4-step process timeline
4. **About** - Company story and values
5. **Contact** - Professional contact form

## 🛠️ Development

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Gmail account (for sending emails)

### Environment Variables

Create `.env` file in `src/backend/`:
```env
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret
FRONTEND_URL=http://localhost:5173

# Email Configuration (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@digiroots.com
```

> **Note:** For Gmail, use an [App Password](https://support.google.com/accounts/answer/185833) instead of your regular password.

### Install Dependencies

```bash
# Frontend
npm install

# Backend
cd src/backend
npm install
```

### Run Development Server

```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
cd src/backend
node server.js
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🔐 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user (protected) |
| POST | `/api/auth/forgot-password` | Send password reset email |
| POST | `/api/auth/reset-password/:token` | Reset password with token |

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

### Backend Deployment
Deploy the backend separately on:
- **Railway** - Easy Node.js hosting
- **Render** - Free tier available
- **Heroku** - Classic PaaS
- **DigitalOcean App Platform**

Remember to update `FRONTEND_URL` and API base URL for production.

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

## 🔒 Security Features

- Password hashing with bcrypt (10 salt rounds)
- JWT tokens with 1-day expiration
- Reset tokens hashed before storage
- Reset links expire in 15 minutes
- One-time use reset tokens
- Generic error messages (no email enumeration)
- Protected API routes with middleware

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
