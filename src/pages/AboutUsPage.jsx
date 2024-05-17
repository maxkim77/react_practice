// AboutUsPage.jsx
import React from 'react';
import Menu from './Menu';
import '../assets/AboutPage.css';

const AboutUsPage = () => {
  return (
    <div className="cover-screen">
      <Menu />
      <div className="page-content bg-white p-6 rounded-lg">
        <h1 className="text-3xl font-bold">📖 About Us</h1>
        <p className="mt-4">
          Welcome to Mars, your one-stop destination for all your shopping needs! At Mars, we are committed to providing you with the best shopping experience possible.
        </p>
        <p className="mt-4">
          Our mission is to offer a wide range of high-quality products at competitive prices, delivered with exceptional customer service. Whether you're looking for electronics, fashion, home goods, or more, we've got you covered.
        </p>
        <p className="mt-4">
          With our user-friendly website and secure payment options, shopping at Mars is convenient and hassle-free. Plus, our dedicated team is always here to assist you with any questions or concerns you may have.
        </p>
        <p className="mt-4">
          Thank you for choosing Mars for all your shopping needs. We look forward to serving you!
        </p>
      </div>
    </div>
  );
};

export default AboutUsPage;
