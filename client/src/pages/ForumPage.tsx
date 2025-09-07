// client/src/pages/ForumPage.tsx

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';
import { getPosts, type Post } from '../api/posts';

const ForumPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (err) {
        toast.error('Failed to fetch forum posts.');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Student Forum</h1>
        <Link to="/forum/create">
          <Button className="bg-cyan-500 hover:bg-cyan-600">Create Post</Button>
        </Link>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <Link to={`/forum/${post._id}`} key={post._id} className="block bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 hover:border-cyan-500 transition-colors duration-300">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold text-cyan-400">{post.title}</h2>
                <p className="text-sm text-gray-500">
                  Posted by {post.author.username} on {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
              <span className="bg-gray-700 text-xs font-semibold px-2.5 py-1 rounded-full">{post.category}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ForumPage;