// client/src/pages/CreateRidePage.tsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRide } from '../api/rides';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const CreateRidePage = () => {
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    date: '',
    seatsAvailable: 1,
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createRide({ ...formData, seatsAvailable: Number(formData.seatsAvailable) });
      navigate('../rides');
    } catch (error) {
      console.error('Failed to create ride:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-white">Offer a Ride</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-gray-800 p-8 rounded-lg shadow-lg space-y-4">
        <div>
          <label htmlFor="origin" className="text-white">Origin</label>
          <Input id="origin" name="origin" type="text" value={formData.origin} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="destination" className="text-white">Destination</label>
          <Input id="destination" name="destination" type="text" value={formData.destination} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="date" className="text-white">Date</label>
          <Input id="date" name="date" type="date" value={formData.date} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="seatsAvailable" className="text-white">Seats Available</label>
          <Input id="seatsAvailable" name="seatsAvailable" type="number" min="1" value={formData.seatsAvailable} onChange={handleChange} required />
        </div>
        <Button type="submit" className="bg-cyan-500 hover:bg-cyan-600">Post Ride</Button>
      </form>
    </div>
  );
};

export default CreateRidePage;