// client/src/pages/MarketplacePage.tsx

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { getItems, type MarketplaceItem } from '../api/marketplace';

const MarketplacePage = () => {
  const [items, setItems] = useState<MarketplaceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getItems();
        setItems(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  if (loading) return <p className="text-white text-center">Loading items...</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Marketplace</h1>
          <Link to="/marketplace/create">
            <Button className="bg-cyan-500 hover:bg-cyan-600">Sell an Item</Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <div key={item._id} className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
              <h2 className="text-xl font-bold mb-2 text-cyan-400">{item.title}</h2>
              <p className="text-lg font-semibold mb-2">₹{item.price}</p>
              <p className="text-gray-400 mb-4 h-20 overflow-hidden">{item.description}</p>
              <p className="text-sm text-gray-500">Seller: {item.seller.username}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketplacePage;