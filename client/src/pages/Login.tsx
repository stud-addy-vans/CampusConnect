// client/src/pages/Login.tsx

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(formData);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full text-white">
        <h1 className="text-3xl font-bold text-center mb-6">Login to CampusConnect</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email">Email</label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <Input id="password" name="password" type="password" value={formData.password} onChange={handleChange} required />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600">Login</Button>
        </form>
        <div className="text-center mt-6">
          <p className="text-gray-400">Don't have an account?{' '}
            <Link to="/register" className="text-cyan-400 hover:underline">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;