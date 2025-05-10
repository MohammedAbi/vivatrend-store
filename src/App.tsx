import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLocation,
} from "react-router-dom";

import { useEffect } from "react";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { Cart } from "./pages/Cart";
import Toaster from "./components/ui/Toaster";
import { AuthProvider } from "./context";
import { CartProvider } from "./context/cart/CartContext";
import { ProductsProvider } from "./context/product/ProductsContext";
import { Home } from "./pages/Home/Home";
import Products from "./pages/Product/Products";
import ProductPage from "./pages/Product/ProductPage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import TermsAndPrivacy from "./pages/TermsPrivacy";
import Contact from "./components/Contact";
import Checkout from "./components/ui/checkout/CheckoutSteps/Checkout";
import Profile from "./pages/Profile/Profile";
import NotFound from "./pages/NotFound";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
};

const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Header />
      <div className="flex-grow bg-primary">
        <Outlet />
      </div>
      <Footer />
      <Cart />
      <Toaster />
    </div>
  );
};

const router = createBrowserRouter([
  {
    element: (
      <AuthProvider>
        <CartProvider>
          <ProductsProvider>
            {" "}
            <AppLayout />
          </ProductsProvider>
        </CartProvider>
      </AuthProvider>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/:id",
        element: <ProductPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/terms-privacy",
        element: <TermsAndPrivacy />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
