# Bookarry Client

Bookarry is a book ordering and delivery platform that connects readers with libraries and librarians. This repository contains the frontend application built with React and Vite.

Live site: https://bookarry.web.app/

## Product Overview

Bookarry lets users discover books, place orders, and track payments through a role-based dashboard. Librarians can publish and manage their inventory, while admins oversee users and the overall catalog.

## Key Features

- Book catalog with search by title and detailed book pages
- Wishlist management for saved books
- Order flow with Stripe checkout (via backend) and payment status tracking
- Invoices history with payment identifiers and dates
- Role-based dashboard: user, librarian, and admin views
- Librarian tools to add, edit, publish/unpublish, and remove books
- Admin tools to manage users and oversee all books
- Delivery coverage map with searchable locations
- Firebase authentication with email/password and Google sign-in
- Theme toggle support (light/dark)

## Tech Stack

- React 19, Vite 7
- React Router, TanStack React Query
- Tailwind CSS 4, DaisyUI
- Firebase Auth
- Axios
- Stripe (checkout flow handled by the backend)
- Leaflet (delivery coverage map)
- Swiper (hero slider)
- React Hook Form (forms), React Hot Toast (notifications), SweetAlert2 (modals)
- React Icons, Lucide React (icons)
- date-fns (date formatting)
- ESLint (linting)

## Project Structure

- `src/pages` — route-level pages (Books, Book Detail, Dashboard, Wishlist, Orders, etc.)
- `src/components` — shared UI components (cards, sliders, navbar, footer)
- `src/layouts` — layout shells for auth and dashboard
- `src/auth` — route guards and auth provider
- `src/hooks` — Axios clients, theme, and utility hooks
- `src/configs` — Firebase configuration

Tree view:

```
bookarry-client/
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images, icons, JSON data files
│   ├── auth/               # Auth provider and protected route guards
│   ├── components/         # Reusable UI components
│   ├── configs/            # App configs (Firebase, etc.)
│   ├── hooks/              # Custom React hooks (Axios, theme, helpers)
│   ├── layouts/            # Layout shells for auth and dashboard
│   ├── pages/              # Route-level pages and views
│   ├── routes/             # App route definitions
│   ├── index.css           # Global styles and Tailwind setup
│   ├── main.jsx            # App entry point
│   └── App.jsx             # Root component
├── firebase.json           # Firebase Hosting config
├── vite.config.js          # Vite config
└── package.json            # Project metadata and scripts
```

## API

The client consumes the Bookarry API:

- Base URL: `https://bookarry-server.vercel.app/api/v1/`

## Getting Started

### Prerequisites

- Node.js 18+ (recommended)
- npm

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```bash
VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_firebase_auth_domain
VITE_projectId=your_firebase_project_id
VITE_storageBucket=your_firebase_storage_bucket
VITE_messagingSenderId=your_firebase_messaging_sender_id
VITE_appId=your_firebase_app_id
```

### Run Locally

```bash
npm run dev
```

## Scripts

- `npm run dev` — start the development server
- `npm run build` — create a production build
- `npm run preview` — preview the production build
- `npm run lint` — run ESLint

## Deployment

This app is configured for Firebase Hosting (see `firebase.json`). Build the project and deploy the `dist` folder.
