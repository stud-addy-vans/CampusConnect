// client/src/pages/EventsPage.tsx

import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const EventsPage = () => {
  // We will add the logic to fetch and display events here later
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Upcoming Events</h1>
        <Link to="/events/create">
          <Button>Create Event</Button>
        </Link>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p>Events will be listed here...</p>
      </div>
    </div>
  );
};

export default EventsPage;