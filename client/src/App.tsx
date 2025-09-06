// client/src/App.tsx

import { Link } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Button from './components/ui/Button';

function App() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Welcome to CampusConnect</h1>
      {isAuthenticated ? (
        <div className="text-center">
          <p className="text-xl mb-4">Hello, {user?.username}!</p>
          <Button onClick={logout}>Logout</Button>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link to="/login">
            <Button>Login</Button>
          </Link>
          <Link to="/register">
            <Button>Register</Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default App;