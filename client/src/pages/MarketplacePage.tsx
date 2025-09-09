// // client/src/pages/MarketplacePage.tsx

// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import toast from "react-hot-toast"; // <-- Import toast
// import Button from "../components/ui/Button";
// import Spinner from "../components/ui/Spinner"; // <-- Import Spinner
// import { getItems, type MarketplaceItem } from "../api/marketplace";
// import { useAuth } from "../context/AuthContext";

// const MarketplacePage = () => {
//   const [items, setItems] = useState<MarketplaceItem[]>([]);
//   const [loading, setLoading] = useState(true);
//   const { user } = useAuth();

//   useEffect(() => {
//     const fetchItems = async () => {
//       try {
//         const data = await getItems();
//         setItems(data);
//       } catch (err) {
//         toast.error("Failed to fetch marketplace items."); // <-- Show toast on error
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchItems();
//   }, []);

//   if (loading) return <Spinner />; // <-- Use Spinner while loading

//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-4">
//       <div className="container mx-auto">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold">Marketplace</h1>
//           {user && (
//             <Link to="../marketplace/create">
//               <Button className="bg-cyan-500 hover:bg-cyan-600">
//                 Sell an Item
//               </Button>
//             </Link>
//           )}
//         </div>

//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//           {items.map((item) => (
//             <div
//               key={item._id}
//               className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700"
//             >
//               <h2 className="text-xl font-bold mb-2 text-cyan-400">
//                 {item.title}
//               </h2>
//               <p className="text-lg font-semibold mb-2">₹{item.price}</p>
//               <p className="text-gray-400 mb-4 h-20 overflow-hidden">
//                 {item.description}
//               </p>
//               <p className="text-sm text-gray-500">
//                 Seller: {item.seller?.username ?? "Deleted User"}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MarketplacePage;


// client/src/pages/MarketplacePage.tsx

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Button from "../components/ui/Button";
import Spinner from "../components/ui/Spinner";
import { getItems, type MarketplaceItem } from "../api/marketplace";
import { useAuth } from "../context/AuthContext";

const MarketplacePage = () => {
  const [items, setItems] = useState<MarketplaceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getItems();
        setItems(data);
      } catch (err) {
        toast.error("Failed to fetch marketplace items.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Marketplace</h1>
          {user && (
            <Link to="/dashboard/marketplace/create">
              <Button className="bg-cyan-500 hover:bg-cyan-600">
                Sell an Item
              </Button>
            </Link>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            // --- CHANGE 1: Add overflow-hidden to the card container ---
            <div
              key={item._id}
              className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden"
            >
              {/* --- CHANGE 2: Add the image tag --- */}
              <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover" />

              {/* This content will now appear below the image */}
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2 text-cyan-400">
                  {item.title}
                </h2>
                <p className="text-lg font-semibold mb-2">₹{item.price}</p>
                <p className="text-gray-400 mb-4 h-20 overflow-hidden">
                  {item.description}
                </p>
                <p className="text-sm text-gray-500">
                  Seller: {item.seller?.username ?? "Deleted User"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketplacePage;