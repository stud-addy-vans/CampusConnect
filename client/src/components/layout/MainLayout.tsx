// client/src/components/layout/MainLayout.tsx

import { Outlet } from 'react-router-dom';
import Header from '../Header';
import { Toaster } from 'react-hot-toast';
import Footer from '../Footer';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Header />
      <Toaster position="top-center" reverseOrder={false} /> {}
      <main>
        <Outlet />
      </main>
       <Footer />
    </div>
  );
};

export default MainLayout;