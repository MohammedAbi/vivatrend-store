# JavaScript Frameworks: VivaTrend Store

## Product Showcase

![VivaTrend UI](https://github.com/user-attachments/assets/d314bff8-afa1-4f87-a058-5255a3b36080)

This image gives a glimpse into the VivaTrend fashion store's user interface, featuring a modern, minimal, and mobile-first design. The application leverages Tailwind CSS for responsiveness and clean layouts, providing an optimal shopping experience on all devices.

## Description

VivaTrend is a front-end e-commerce application where users can browse fashion products, view details, add items to a cart, and complete checkout. Users can also register, log in, and access a personalized profile. The app integrates with Noroff’s public API to fetch products and handle authentication.

## Features

- **User Registration & Login**: Authenticated user experience using Noroff API
- **Product Listings**: Browse a grid of products with filtering and search
- **Product Detail Page**: View product info, select color and size, and add to cart
- **Cart Page**: Update quantities, remove items, and view totals
- **Checkout Success Page**: Displays confirmation after completing purchase
- **User Profile**: View personal information and manage session
- **Search & Filter**: Find products by title or category
- **Contact Form**: Fully validated form for user communication
- **Toast Notifications**: Alerts for actions like login, add to cart, and logout
- **Responsive Design**: Built with Tailwind CSS and mobile-first principles

## Technologies Used

- React 18
- Vite
- TypeScript
- Tailwind CSS
- React Router DOM
- React Toastify
- Swiper.js
- Vitest
- React Testing Library

## Feedback & Grading

### Grade: Passed ✅

### Teacher's Feedback:

Dear Mohammed,

Thank you for your JavaScript Frameworks work. Your commitment to completing this project is evident.

Fantastic achievement in your JavaScript Frameworks assignment! Everything was aligned perfectly with the criteria. Great execution!

## Folder Structure

```
src/
├── assets/          # Static assets and images
├── components/      # Reusable components like Header, Footer, ProductCard
├── context/         # React Context for Auth and Cart state
├── hooks/           # Custom hooks (e.g., useCart, useAuth, useProducts)
├── pages/           # Route-level components (e.g., Home, ProductPage, Cart)
├── services/        # API configuration and service logic
├── types/           # Global TypeScript types
├── App.tsx          # App wrapper with routing
├── main.tsx         # React DOM entry point
└── vite-env.d.ts    # Vite env types
```

## Setup & Running the Project

1. **Clone the repository**:

```bash
git clone https://github.com/your-username/vivatrend-store.git
```

2. **Navigate into the folder**:

```bash
cd vivatrend-store
```

3. **Install dependencies**:

```bash
npm install
```

4. **Create .env file**:

```bash
VITE_API_KEY=your-api-key
```

5. **Run the development server**:

```bash
npm run dev
```

6. **Build the project**:

```bash
npm run build
```

7. **Preview the production build**:

```bash
npm run preview
```

8. **Run tests**:

```bash
npm run test
```

## API Endpoints

```ts
export const API_CONFIG = {
  BASE_URL: "https://v2.api.noroff.dev/",
  ENDPOINTS: {
    AUTH: {
      REGISTER: "auth/register",
      LOGIN: "auth/login",
    },
    PRODUCTS: {
      ALL: "online-shop",
      SINGLE: (id: string) => `online-shop/${id}`,
    },
  },
  DEFAULT_HEADERS: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};
```

## Test User

For demonstration purposes, you can use the following credentials:

- **Email**: `bulibuli@stud.noroff.no`
- **Password**: `bulibuli`

## Links

- **Live Website**: [https://vivatrend-store.netlify.app](https://vivatrend-store.netlify.app)
- **GitHub Repository**: [https://github.com/MohammedAbi/vivatrend-store](https://github.com/MohammedAbi/vivatrend-store)
