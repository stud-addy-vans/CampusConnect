// client/src/pages/StudentRegisterPage.tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { registerStudent } from '../api/auth'; // We'll create this function next
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const StudentRegisterPage = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const data = await registerStudent(formData);
        toast.success(data.message);
        navigate('/login');
    } catch (error: any) {
        toast.error(error.response?.data?.message || 'Registration failed.');
    }
};


  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full text-white">
        <h1 className="text-3xl font-bold text-center mb-6">Create Student Account</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input name="username" placeholder="Username" onChange={handleChange} required />
          <Input name="email" type="email" placeholder="Email" onChange={handleChange} required />
          <Input name="password" type="password" placeholder="Password" onChange={handleChange} required />
          <Button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600">Register</Button>
        </form>
        <div className="text-center mt-6">
          <p className="text-gray-400">Already have an account?{' '}
            <Link to="/login" className="text-cyan-400 hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentRegisterPage;