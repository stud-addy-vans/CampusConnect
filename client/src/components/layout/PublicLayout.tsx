// client/src/components/layout/PublicLayout.tsx
import { Outlet } from 'react-router-dom';
import PublicHeader from '../PublicHeader';
import Footer from '../Footer';

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <PublicHeader />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;