// client/src/api/posts.ts

import api from './axios';

// Type for a user/author reference
interface Author {
  _id: string;
  username: string;
}

// Type for a reply
export interface Reply {
  _id: string;
  content: string;
  author: Author;
  createdAt: string;
}

// Type for a single post
export interface Post {
  _id: string;
  title: string;
  content: string;
  category: string;
  author: Author;
  replies: Reply[];
  createdAt: string;
}

// Type for creating a new post
interface PostData {
  title: string;
  content: string;
  category: string;
}

export const createPost = async (postData: PostData) => {
  const response = await api.post('/posts', postData);
  return response.data;
};

export const getPosts = async (): Promise<Post[]> => {
  const response = await api.get('/posts');
  return response.data;
};

export const getPostById = async (id: string): Promise<Post> => {
  const response = await api.get(`/posts/${id}`);
  return response.data;
};

export const addReply = async (postId: string, content: string) => {
  const response = await api.post(`/posts/${postId}/replies`, { content });
  return response.data;
};