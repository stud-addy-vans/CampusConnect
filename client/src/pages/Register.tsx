// client/src/pages/Register.tsx

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const Register = () => {
  const [emailError, setEmailError] = useState('');
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { register } = useAuth();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email is required.');
    } else if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'email') {
      validateEmail(e.target.value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await register(formData);
      navigate('/login'); // Redirect to login after successful registration
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full text-white">
        <h1 className="text-3xl font-bold text-center mb-6">Create Your Account</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username">Username</label>
            <Input id="username" name="username" type="text" value={formData.username} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <Input id="password" name="password" type="password" value={formData.password} onChange={handleChange} required />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
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

export default Register;