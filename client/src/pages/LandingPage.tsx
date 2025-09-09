// client/src/pages/LandingPage.tsx
import { Link } from 'react-router-dom';
// import Button from '../components/ui/Button';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-5xl font-bold mb-4">Welcome to CampusConnect</h1>
      <p className="text-lg text-gray-300 mb-8">Your all-in-one portal for campus life.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {/* Guest Access Card */}
        <Link to="/home" className="bg-gray-800 p-8 rounded-lg shadow-lg hover:bg-gray-700 transition-all">
          <h2 className="text-2xl font-bold text-cyan-400 mb-2">Guest Access</h2>
          <p className="text-gray-400">Browse public events and campus info.</p>
        </Link>

        {/* Student Registration Card -- ADD THIS */}
        <Link to="/register/student" className="bg-gray-800 p-8 rounded-lg shadow-lg hover:bg-gray-700 transition-all">
          <h2 className="text-2xl font-bold text-cyan-400 mb-2">Student Registration</h2>
          <p className="text-gray-400">Create a new student account.</p>
        </Link>

        {/* Login Card */}
        <Link to="/login" className="bg-gray-800 p-8 rounded-lg shadow-lg hover:bg-gray-700 transition-all">
          <h2 className="text-2xl font-bold text-cyan-400 mb-2">Login</h2>
          <p className="text-gray-400">Access your student or admin dashboard.</p>
        </Link>

        {/* Official Registration is less common, can be a smaller link or button if needed */}
        <div className="md:col-span-2 lg:col-span-3 text-center mt-4">
           <Link to="/register/admin" className="text-gray-400 hover:text-cyan-400">
            Official Staff or Club Head? Register here.
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;