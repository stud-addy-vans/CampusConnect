// client/src/components/layout/MainLayout.tsx

import { Outlet } from 'react-router-dom';
import Header from '../Header';
import { Toaster } from 'react-hot-toast';
import Footer from '../Footer';
import ChatbotWidget from '../ChatbotWidget';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Header />
      <Toaster position="top-center" reverseOrder={false} /> {}
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <ChatbotWidget /> {}
    </div>
  );
};

export default MainLayout;