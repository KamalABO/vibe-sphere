# 🌌 VibeSphere

> **The next-generation social platform where creativity meets innovation**

[![Next.js](https://img.shields.io/badge/Next.js-16.0.1-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.2.0-blue?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🚀 Tech Stack](#-tech-stack)
- [📦 Installation](#-installation)
- [🔧 Environment Setup](#-environment-setup)
- [💻 Usage](#-usage)
- [📁 Project Structure](#-project-structure)
- [🔐 Authentication](#-authentication)
- [🎨 UI Components](#-ui-components)
- [🗄️ Database](#️-database)
- [📚 API Endpoints](#-api-endpoints)
- [🎬 Demo Features](#-demo-features)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

### 🎯 Core Features

```
✅ User Authentication
   ├─ Registration with bcrypt password hashing
   ├─ Login with JWT token generation
   ├─ Secure session management
   └─ Protected routes with middleware

✅ Post Management
   ├─ Create posts with rich text
   ├─ Upload images/videos via Cloudinary
   ├─ Real-time post feed
   └─ Post deletion & editing (coming soon)

✅ Social Interactions
   ├─ Like/Unlike posts
   ├─ Real-time like updates
   ├─ User engagement tracking
   └─ Comment system (coming soon)

✅ User Profiles
   ├─ Personalized user profiles
   ├─ Avatar upload & display
   ├─ User statistics
   └─ Profile editing (coming soon)

✅ Modern UI/UX
   ├─ Smooth animations with Framer Motion
   ├─ Dark/Light theme support
   ├─ Responsive design
   ├─ Accessible components (Radix UI)
   └─ Glassmorphism effects
```

### 🎨 Design Highlights

- **Gradient Theme**: Purple → Pink color scheme
- **Smooth Animations**: Framer Motion transitions
- **Responsive Layout**: Mobile, Tablet, Desktop
- **Real-time Sync**: Auto-refresh user data
- **Glassmorphism**: Backdrop blur effects
- **Dark Mode Support**: Next-themes integration

---

## 🚀 Tech Stack

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Next.js** | 16.0.1 | React framework with SSR |
| **React** | 19.2.0 | UI library |
| **TypeScript** | 5.0 | Type safety |
| **Tailwind CSS** | 4.0 | Styling & utility-first CSS |
| **Framer Motion** | 12.23.24 | Animation library |
| **Shadcn/ui** | 0.0.4 | Pre-built components |
| **Radix UI** | Latest | Accessible primitives |

### Backend & Database
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Prisma ORM** | 6.18.0 | Database abstraction |
| **NextAuth.js** | 4.24.13 | Authentication |
| **JSON Web Token** | 9.0.2 | Secure token management |
| **Bcrypt** | 6.0.0 | Password hashing |

### External Services
| Service | Purpose |
|---------|---------|
| **Cloudinary** | Image/Video hosting |
| **Database** | PostgreSQL / MySQL / MongoDB |

### Development Tools
| Tool | Version |
|------|---------|
| **ESLint** | 9 |
| **PostCSS** | 4 |
| **Webpack** | Next.js default |

---

## 📦 Installation

### Prerequisites
- **Node.js** ≥ 18.x
- **npm** ≥ 9.x or **yarn** ≥ 3.x
- **Git**
- Database (PostgreSQL / MySQL)
- Cloudinary account

### Step 1: Clone Repository

```bash
git clone https://github.com/KamalABO/vibe-sphere.git
cd vibe-sphere
```

### Step 2: Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Step 3: Setup Environment Variables

```bash
# Create .env.local file
cp .env.example .env.local
```

---

## 🔧 Environment Setup

Create a `.env.local` file in the root directory:

```env
# ============ DATABASE ============
DATABASE_URL=postgresql://user:password@localhost:5432/vibe_sphere
# or mysql://user:password@localhost:3306/vibe_sphere

# ============ AUTHENTICATION ============
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NEXTAUTH_SECRET=your_nextauth_secret_key
NEXTAUTH_URL=http://localhost:3000

# ============ CLOUDINARY ============
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# ============ NODE ENVIRONMENT ============
NODE_ENV=development
# development | production

# ============ API CONFIG ============
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 🔑 Getting API Keys

**Cloudinary:**
1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up for free account
3. Go to Dashboard → Settings
4. Copy `Cloud Name`, `API Key`, `API Secret`

**Database:**
- Use local PostgreSQL/MySQL or cloud services like:
  - [Supabase](https://supabase.com) (PostgreSQL)
  - [Railway](https://railway.app) (Multi-DB)
  - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

## 💻 Usage

### Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

### Lint Code

```bash
npm run lint
```

---

## 📁 Project Structure

```
vibe-sphere/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth route group
│   │   ├── login/
│   │   └── register/
│   ├── (main)/                   # Main routes
│   │   ├── home/
│   │   ├── feed/
│   │   └── profile/[id]/
│   ├── (admin)/                  # Admin routes
│   │   └── dashboard/
│   ├── (protected)/              # Protected routes
│   │   └── settings/
│   ├── api/                      # API routes
│   │   ├── auth/
│   │   ├── posts/
│   │   ├── likes/
│   │   └── users/
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Landing page
│   ├── globals.css               # Global styles
│   └── utils/                    # App utilities
│
├── components/                   # React components
│   ├── Navbar.tsx               # Navigation bar
│   ├── Sidebar.tsx              # Sidebar menu
│   ├── PostCard.tsx             # Post display
│   ├── CreatePostModal.tsx      # Create post form
│   ├── AddPostModal.tsx         # Add post modal
│   ├── CommentCard.tsx          # Comment component
│   ├── ThemeSwitcher.tsx        # Dark/Light theme
│   ├── ThemeProviderWrapper.tsx # Theme provider
│   ├── ClientLayout.tsx         # Client layout wrapper
│   └── ui/                      # Shadcn UI components
│       ├── button.tsx
│       ├── dialog.tsx
│       ├── select.tsx
│       └── ...
│
├── context/                     # React Context
│   ├── AuthContext.tsx          # Auth context
│   ├── PostsContext.tsx         # Posts context
│   └── ThemeContext.tsx         # Theme context
│
├── lib/                         # Utility libraries
│   ├── prisma.ts               # Prisma client
│   ├── api.ts                  # API utilities
│   ├── auth.ts                 # Auth utilities
│   ├── cloudinary.ts           # Cloudinary config
│   └── utils.ts                # Helpers
│
├── prisma/                      # Database
│   ├── schema.prisma           # Prisma schema
│   └── migrations/             # DB migrations
│
├── public/                      # Static assets
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── styles/                      # Global styles
│   └── globals.css
│
├── middleware.ts                # JWT verification middleware
├── next.config.ts               # Next.js configuration
├── tailwind.config.ts           # Tailwind config
├── tsconfig.json                # TypeScript config
├── package.json
└── README.md
```

---

## 🔐 Authentication

### JWT Token Flow

```
User Registration/Login
        ↓
Generate JWT Token
        ↓
Store in HTTP-Only Cookie
        ↓
Middleware verifies token
        ↓
Access Protected Routes
```

### Protected Routes

Middleware automatically redirects unauthenticated users:

```
Public routes (no auth required):
/
/landing
/login
/register
/api/auth

Protected routes (auth required):
/home
/feed
/profile
/admin/dashboard
/settings
```

### Session Management

```typescript
// Stored in localStorage & cookies
{
  user: {
    id: "user-id",
    name: "John Doe",
    email: "john@example.com",
    avatarUrl: "https://..."
  },
  token: "jwt-token-here"
}
```

---

## 🎨 UI Components

### Built with Shadcn/ui & Radix UI

```typescript
// Available Components
<Button />           // Primary action
<Dialog />           // Modal dialogs
<Select />           // Dropdown select
<Input />            // Text input
<Textarea />         // Text area
<Card />             // Card container
<Avatar />           // User avatar
<Badge />            // Labels/Tags
<Toast />            // Notifications (Sonner)
```

### Theme Support

```typescript
// Dark/Light mode with next-themes
<ThemeProviderWrapper>
  <ThemeSwitcher />  // Toggle button
</ThemeProviderWrapper>
```

---

## 🗄️ Database

### Prisma Schema

```prisma
model User {
  id        String     @id @default(cuid())
  email     String     @unique
  name      String
  password  String     // hashed with bcrypt
  avatarUrl String?
  posts     Post[]
  likes     Like[]
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt
}

model Post {
  id        String     @id @default(cuid())
  content   String
  imageUrl  String?
  author    User       @relation(fields: [authorId], references: [id], onDelete: Cascade)
  authorId  String
  likes     Like[]
  comments  Comment[]
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt
}

model Like {
  id        String     @id @default(cuid())
  post      Post       @relation(fields: [postId], references: [id], onDelete: Cascade)
  postId    String
  user      User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId    String
  createdAt DateTime   @default(now())

  @@unique([postId, userId])
}

model Comment {
  id        String     @id @default(cuid())
  content   String
  post      Post       @relation(fields: [postId], references: [id], onDelete: Cascade)
  postId    String
  author    User       @relation(fields: [authorId], references: [id], onDelete: Cascade)
  authorId  String
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt
}
```

### Setup Database

```bash
# Generate Prisma client
npx prisma generate

# Create & migrate database
npx prisma migrate dev --name init

# View database GUI
npx prisma studio
```

---

## 📚 API Endpoints

### Authentication

```
POST   /api/auth/register     # Register new user
POST   /api/auth/login        # User login
POST   /api/auth/logout       # User logout
GET    /api/auth/me           # Get current user
```

### Posts

```
GET    /api/posts             # Get all posts
GET    /api/posts/[id]        # Get single post
POST   /api/posts             # Create post
PUT    /api/posts/[id]        # Update post
DELETE /api/posts/[id]        # Delete post
```

### Likes

```
POST   /api/posts/[id]/like   # Like a post
DELETE /api/posts/[id]/like   # Unlike a post
GET    /api/posts/[id]/likes  # Get post likes
```

### Users

```
GET    /api/users             # Get all users
GET    /api/users/[id]        # Get user profile
PUT    /api/users/[id]        # Update profile
GET    /api/users/[id]/posts  # Get user posts
```

---

## 🎬 Demo Features

### Landing Page

```
┌─────────────────────────────────────────┐
│  🌌 VibeSphere                          │
│  Welcome to Dynamic Social              │
│  The next-generation platform...        │
│                                         │
│  [Get Started] [Login]                  │
└─────────────────────────────────────────┘
│ Feature Cards | Create & Explore        │
├─────────────────────────────────────────┤
│ 🚀 Fast & Dynamic                       │
│ 💡 Smart Design                         │
│ 🌍 Global Community                     │
└─────────────────────────────────────────┘
```

### Feed Page

```
┌────────────────────────────────────────┐
│ VibeSphere          🌙 [Theme]         │
├────────────────────────────────────────┤
│ Sidebar | [Create Post]                │
│         │                              │
│         ├─ 👤 John Doe  2 min ago      │
│         │  "Loving the new features!"  │
│         │  [Image]                     │
│         │  ❤️ Like  💬 Comment 🔄 Share
│         │                              │
│         ├─ 👤 Jane Smith  15 min ago   │
│         │  "Amazing platform!"         │
│         │  ❤️ Like  💬 Comment 🔄 Share
│         │                              │
│         └─ [Load More]                 │
└────────────────────────────────────────┘
```

---

## 🚀 Quick Start Commands

```bash
# Clone & Setup
git clone https://github.com/KamalABO/vibe-sphere.git
cd vibe-sphere
npm install

# Environment
cp .env.example .env.local
# Edit .env.local with your credentials

# Database
npx prisma migrate dev --name init

# Development
npm run dev

# Build
npm run build
npm run start
```

---

## 🎯 Roadmap

- [ ] Comments system
- [ ] Direct messaging
- [ ] Notifications system
- [ ] User search
- [ ] Hashtags & trending
- [ ] Follow/Unfollow system
- [ ] User recommendations
- [ ] Analytics dashboard
- [ ] Admin panel
- [ ] Mobile app (React Native)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style

- Use TypeScript for type safety
- Follow ESLint rules
- Use Prettier for formatting
- Write meaningful commit messages

---

## 📞 Support & Contact

**Developer:** Kamal ABO

- 📧 Email: kamal@example.com
- 🐙 GitHub: [@KamalABO](https://github.com/KamalABO)
- 💬 WhatsApp: [+20 101 723 2631](https://wa.me/201017232631)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## ✨ Special Thanks

- [Vercel](https://vercel.com) - Next.js creators
- [Tailwind Labs](https://tailwindlabs.com) - Tailwind CSS
- [Shadcn](https://shadcn.com) - UI components
- [Framer](https://www.framer.com) - Animation library

---

## 🌟 Show Your Support

If you like this project, please give it a ⭐ on GitHub!

```
        ⭐
       ⭐⭐⭐
      ⭐⭐⭐⭐⭐
        VibeSphere
     Thanks for your support!
```

---

<div align="center">

**Made with ❤️ by [Kamal ABO](https://github.com/KamalABO)**

*Building the future of social platforms, one commit at a time.*

**[⬆ Back to top](#-vibesphere)**

</div>
