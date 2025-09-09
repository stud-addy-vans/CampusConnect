// client/src/components/PublicHeader.tsx
import { Link } from 'react-router-dom';

const PublicHeader = () => {
  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-2xl font-bold text-cyan-400">
          CampusConnect
        </Link>
        <div className="space-x-4">
          <Link to="/login" className="hover:text-cyan-400">Login</Link>
          <Link to="/register/admin" className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-md font-bold">Admin Register</Link>
        </div>
      </div>
    </header>
  );
};

export default PublicHeader;