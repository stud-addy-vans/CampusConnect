// client/src/pages/CreatePostPage.tsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../api/posts';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';

const CreatePostPage = () => {
  const [formData, setFormData] = useState({ title: '', content: '', category: 'General' });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createPost(formData);
      toast.success('Post created successfully!');
      navigate('/forum');
    } catch (error) {
      toast.error('Failed to create post.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-white">Create a New Post</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg space-y-4">
        <div>
          <label htmlFor="title" className="text-white">Title</label>
          <Input id="title" name="title" type="text" value={formData.title} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="category" className="text-white">Category</label>
          <select id="category" name="category" value={formData.category} onChange={handleChange} className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md">
            <option>General</option>
            <option>Academics</option>
            <option>Clubs</option>
            <option>Hostel Life</option>
          </select>
        </div>
        <div>
          <label htmlFor="content" className="text-white">Content</label>
          <textarea id="content" name="content" value={formData.content} onChange={handleChange} required className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md" rows={8}></textarea>
        </div>
        <Button type="submit" className="bg-cyan-500 hover:bg-cyan-600">Submit Post</Button>
      </form>
    </div>
  );
};

export default CreatePostPage;