// client/src/pages/EventsPage.tsx

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast'; // <-- Import toast
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner'; // <-- Import Spinner
import { getEvents, type Event } from '../api/events';

const EventsPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (err) {
        // --- CHANGE: Show a toast notification on error ---
        toast.error('Failed to fetch events. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // --- CHANGE: Use the Spinner component while loading ---
  if (loading) return <Spinner />;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Upcoming Events</h1>
          <Link to="/events/create">
            <Button className="bg-cyan-500 hover:bg-cyan-600">Create Event</Button>
          </Link>
        </div>

        {events.length === 0 ? (
          <div className="text-center bg-gray-800 p-6 rounded-lg shadow-md">
            <p>No events found. Be the first to create one!</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div key={event._id} className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 hover:border-cyan-500 transition-colors duration-300">
                <h2 className="text-xl font-bold mb-2 text-cyan-400">{event.title}</h2>
                <p className="text-gray-400 mb-1"><strong>Location:</strong> {event.location}</p>
                <p className="text-gray-400 mb-4"><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                <p className="text-gray-300 mb-4">{event.description}</p>
                <p className="text-sm text-gray-500">Created by: {event.createdBy.username}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;