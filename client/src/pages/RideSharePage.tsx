// client/src/pages/RideSharePage.tsx

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast'; // <-- Import toast
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner'; // <-- Import Spinner
import { getRides, type Ride } from '../api/rides';

const RideSharePage = () => {
  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const data = await getRides();
        setRides(data);
      } catch (err) {
        toast.error('Failed to fetch rides.'); // <-- Show toast on error
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRides();
  }, []);

  if (loading) return <Spinner />; // <-- Use Spinner while loading

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Ride Sharing Board</h1>
        <Link to="/rides/create">
          <Button className="bg-cyan-500 hover:bg-cyan-600">Offer a Ride</Button>
        </Link>
      </div>

      <div className="space-y-4">
        {rides.map((ride) => (
          <div key={ride._id} className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 flex justify-between items-center">
            <div>
              <p className="text-lg font-semibold text-cyan-400">{ride.origin} → {ride.destination}</p>
              <p className="text-gray-400">Date: {new Date(ride.date).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-gray-300">{ride.seatsAvailable} seat(s) available</p>
              <p className="text-sm text-gray-500">Driver: {ride.driver.username}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RideSharePage;