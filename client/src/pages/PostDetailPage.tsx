// client/src/pages/PostDetailPage.tsx

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Spinner from '../components/ui/Spinner';
import { getPostById, addReply, type Post } from '../api/posts';
import Button from '../components/ui/Button';

const PostDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [replyContent, setReplyContent] = useState('');

  const fetchPost = async () => {
    if (!id) return;
    try {
      const data = await getPostById(id);
      setPost(data);
    } catch (err) {
      toast.error('Failed to fetch post details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !replyContent.trim()) return;
    try {
      await addReply(id, replyContent);
      setReplyContent('');
      toast.success('Reply added!');
      fetchPost(); // Re-fetch post to show the new reply
    } catch (error) {
      toast.error('Failed to add reply.');
    }
  };

  if (loading) return <Spinner />;
  if (!post) return <p className="text-white text-center">Post not found.</p>;

  return (
    <div className="container mx-auto p-4 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg mb-6">
        <h1 className="text-3xl font-bold text-cyan-400 mb-2">{post.title}</h1>
        <p className="text-sm text-gray-500 mb-4">
          By {post.author.username} on {new Date(post.createdAt).toLocaleDateString()}
        </p>
        <p className="text-gray-300 whitespace-pre-wrap">{post.content}</p>
      </div>

      <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Replies ({post.replies.length})</h2>
        <div className="space-y-4 mb-6">
          {post.replies.map(reply => (
            <div key={reply._id} className="bg-gray-700 p-4 rounded-md">
              <p className="text-gray-300">{reply.content}</p>
              <p className="text-xs text-gray-500 mt-2">
                - {reply.author.username} on {new Date(reply.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
        <form onSubmit={handleReplySubmit}>
          <textarea value={replyContent} onChange={(e) => setReplyContent(e.target.value)} placeholder="Write a reply..." required className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md mb-2" rows={3}></textarea>
          <Button type="submit" className="bg-cyan-500 hover:bg-cyan-600">Post Reply</Button>
        </form>
      </div>
    </div>
  );
};

export default PostDetailPage;