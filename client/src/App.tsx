// // client/src/App.tsx

// import { Link } from 'react-router-dom';
// import { useAuth } from './context/AuthContext';

// function App() {
//   const { user } = useAuth();

//   return (
//     <div className="container mx-auto p-4 text-white">
//       <div className="text-center py-12">
//         <h1 className="text-4xl font-bold mb-2">Welcome to CampusConnect, {user?.username}!</h1>
//         <p className="text-lg text-gray-300">Your central hub for college life.</p>
//       </div>

//       <div className="grid md:grid-cols-2 gap-8 mt-8">
//         {/* Events Card */}
//         <Link to="./events" className="bg-gray-800 p-8 rounded-lg shadow-lg hover:bg-gray-700 hover:border-cyan-500 border-2 border-transparent transition-all duration-300">
//           <h2 className="text-2xl font-bold text-cyan-400 mb-2">Event Hub</h2>
//           <p className="text-gray-400">Discover and create events happening on campus.</p>
//         </Link>

//         {/* Marketplace Card */}
//         <Link to="./marketplace" className="bg-gray-800 p-8 rounded-lg shadow-lg hover:bg-gray-700 hover:border-cyan-500 border-2 border-transparent transition-all duration-300">
//           <h2 className="text-2xl font-bold text-cyan-400 mb-2">Marketplace</h2>
//           <p className="text-gray-400">Buy and sell textbooks, electronics, and more.</p>
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default App;



// client/src/App.tsx

import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { getDashboardStats, type DashboardStats } from './api/dashboard';
import Spinner from './components/ui/Spinner';
import toast from 'react-hot-toast';

function App() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        toast.error("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="container mx-auto p-4 text-white">
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold mb-2">Welcome, {user?.username}!</h1>
        <p className="text-lg text-gray-300">Here's what's happening on campus.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-4xl font-bold text-cyan-400">{stats?.userCount}</h2>
          <p className="text-gray-400">Total Users</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-4xl font-bold text-cyan-400">{stats?.eventCount}</h2>
          <p className="text-gray-400">Total Events</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-4xl font-bold text-cyan-400">{stats?.itemCount}</h2>
          <p className="text-gray-400">Marketplace Items</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl font-bold mb-4">Recent Events</h3>
          <div className="space-y-4">
            {stats?.recentEvents.map(event => (
              <div key={event._id} className="bg-gray-800 p-4 rounded-lg shadow-md">
                <p className="font-semibold text-cyan-400">{event.title}</p>
                <p className="text-sm text-gray-500">by {event.createdBy.username}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-4">Latest Marketplace Items</h3>
          <div className="space-y-4">
            {stats?.recentItems.map(item => (
              <div key={item._id} className="bg-gray-800 p-4 rounded-lg shadow-md">
                <p className="font-semibold text-cyan-400">{item.title}</p>
                <p className="text-sm text-gray-500">by {item.seller.username}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;