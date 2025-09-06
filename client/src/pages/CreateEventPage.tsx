// client/src/pages/CreateEventPage.tsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../api/events';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const CreateEventPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createEvent(formData);
      navigate('/events'); // Redirect to the events list page on success
    } catch (error) {
      console.error('Failed to create event:', error);
      // TODO: Show an error message
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a New Event</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md space-y-4">
        <div>
          <label htmlFor="title">Title</label>
          <Input id="title" name="title" type="text" value={formData.title} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            rows={4}
          ></textarea>
        </div>
        <div>
          <label htmlFor="date">Date</label>
          <Input id="date" name="date" type="date" value={formData.date} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="location">Location</label>
          <Input id="location" name="location" type="text" value={formData.location} onChange={handleChange} required />
        </div>
        <Button type="submit">Create Event</Button>
      </form>
    </div>
  );
};

export default CreateEventPage;