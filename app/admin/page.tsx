'use client';

import { useState, useEffect } from 'react';
import AdminPostCard, { Post } from '../components/AdminPostCard';
import PostModal from '../components/PostModal';
import { getPosts, createPost, updatePost, deletePost } from '../lib/api';
import { PlusCircle } from 'lucide-react';
import axios from 'axios';

export default function AdminPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts`);
  const fetchedPosts = res.data;
  if (fetchedPosts) setPosts(fetchedPosts);
};


  const handleOpenModal = (post: Post | null = null) => {
    setEditingPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPost(null);
  };

  const handleSavePost = async (postData: Partial<Post>) => {
    if (editingPost) {
      await updatePost(editingPost._id, postData);
    } else {
      // await createPost({ tags: ['new'], ...postData });
    }
    await loadPosts();
    handleCloseModal();
  };

  const handleDeletePost = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await deletePost(id);
      await loadPosts();
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Manage Posts</h1>
        <button onClick={() => handleOpenModal()} className="flex items-center space-x-2 bg-indigo-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg">
          <PlusCircle size={20} />
          <span>Create New Post</span>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <AdminPostCard key={post._id} post={post} onEdit={() => handleOpenModal(post)} onDelete={() => handleDeletePost(post._id)} />
        ))}
      </div>
      <PostModal isOpen={isModalOpen} onClose={handleCloseModal} onSave={handleSavePost} post={editingPost} />
    </div>
  );
}
