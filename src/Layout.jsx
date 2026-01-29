import React from 'react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import CustomCursor from '@/components/shared/CustomCursor';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white">
      <CustomCursor />
      <Navbar />
      <main className="pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}