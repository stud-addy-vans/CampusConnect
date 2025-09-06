// client/src/pages/CreateItemPage.tsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createItem } from '../api/marketplace';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const CreateItemPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    category: 'Books',
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createItem({ ...formData, price: Number(formData.price) });
      navigate('/marketplace');
    } catch (error) {
      console.error('Failed to create item:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">List an Item for Sale</h1>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-gray-800 p-8 rounded-lg shadow-lg space-y-4">
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
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
              rows={4}
            ></textarea>
          </div>
          <div>
            <label htmlFor="price">Price (INR)</label>
            <Input id="price" name="price" type="number" value={formData.price} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
            >
              <option>Books</option>
              <option>Electronics</option>
              <option>Furniture</option>
              <option>Other</option>
            </select>
          </div>
          <Button type="submit" className="bg-cyan-500 hover:bg-cyan-600">List Item</Button>
        </form>
      </div>
    </div>
  );
};

export default CreateItemPage;