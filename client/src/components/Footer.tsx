// client/src/components/Footer.tsx

import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-400 py-8 mt-auto">
      <div className="container mx-auto text-center">
        <div className="flex justify-center space-x-6 mb-4">
          <Link to="/about" className="hover:text-cyan-400">About</Link>
          <Link to="/gallery" className="hover:text-cyan-400">Gallery</Link>
          <Link to="/contact" className="hover:text-cyan-400">Contact</Link>
        </div>
        <p>&copy; 2025 CampusConnect. A Final Year Project.</p>
      </div>
    </footer>
  );
};

export default Footer;