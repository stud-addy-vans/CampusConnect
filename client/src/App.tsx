// client/src/App.tsx

import { Link } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

function App() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto p-4 text-white">
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold mb-2">Welcome to CampusConnect, {user?.username}!</h1>
        <p className="text-lg text-gray-300">Your central hub for college life.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-8">
        {/* Events Card */}
        <Link to="/events" className="bg-gray-800 p-8 rounded-lg shadow-lg hover:bg-gray-700 hover:border-cyan-500 border-2 border-transparent transition-all duration-300">
          <h2 className="text-2xl font-bold text-cyan-400 mb-2">Event Hub</h2>
          <p className="text-gray-400">Discover and create events happening on campus.</p>
        </Link>

        {/* Marketplace Card */}
        <Link to="/marketplace" className="bg-gray-800 p-8 rounded-lg shadow-lg hover:bg-gray-700 hover:border-cyan-500 border-2 border-transparent transition-all duration-300">
          <h2 className="text-2xl font-bold text-cyan-400 mb-2">Marketplace</h2>
          <p className="text-gray-400">Buy and sell textbooks, electronics, and more.</p>
        </Link>
      </div>
    </div>
  );
}

export default App;