// client/src/pages/AdminRegisterPage.tsx
// This is similar to your old register page, but with an "Admin Key" field.
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { registerAdmin } from "../api/auth"; // We'll create this API function
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

const AdminRegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    adminKey: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const data = await registerAdmin(formData);
        toast.success(data.message);
        navigate('/login');
    } catch (error: any) {
        toast.error(error.response?.data?.message || 'Registration failed.');
    }
};


  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full text-white">
        <h1 className="text-3xl font-bold text-center mb-6">
          Official Registration
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Fields for username, email, password */}
          <Input
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
          />
          <Input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <Input
            name="adminKey"
            type="password"
            placeholder="Admin Secret Key"
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600"
          >
            Register
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminRegisterPage;
