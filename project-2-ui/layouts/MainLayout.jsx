import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../src/components/Navbar';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Navbar />
      
      <main className="flex-grow overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
