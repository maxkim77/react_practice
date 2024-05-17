import './App.css'
import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RootPage from "./pages/RootPage";
import LoginPage from './pages/LoginPage';
import ProductPage from './pages/ProductPage';
import SinglePage from './pages/SinglePage'; 
import AboutUsPage from './pages/AboutUsPage'; 
import ContactUsPage from './pages/ContactUsPage'; 
import Mypage from './pages/Mypage'; 
import { CartProvider } from './pages/Cart'; 

const router = createBrowserRouter([
  {
    path: '/root',
    element: <RootPage />
  },
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/products',
    element: <ProductPage />
  },
  {
    path: '/products/:productId', 
    element: <SinglePage />
  },
  {
    path: '/about', 
    element: <AboutUsPage />
  },
  {
    path: '/contact', 
    element: <ContactUsPage />
  },
  {
    path: '/mypage', 
    element: <Mypage />
  },
]);

function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}

export default App;
