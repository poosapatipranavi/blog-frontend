import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Post } from './AdminPostCard';

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (post: Partial<Post>) => void;
  post: Post | null;
}

export default function PostModal({ isOpen, onClose, onSave, post }: PostModalProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [errors, setErrors] = useState<{ title?: string; authorName?: string; content?: string }>({});
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (isOpen) {
      if (post) {
        setTitle(post.title ?? '');
        setContent(post.content ?? '');
        setAuthorName(post.author ?? ''); // ✅ backend expects "author"
      } else {
        setTitle('');
        setContent('');
        setAuthorName('');
      }
      setErrors({});
    }
  }, [post, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: typeof errors = {};
    if (title.trim().length < 4) newErrors.title = "Title must be at least 4 characters.";
    if (authorName.trim().length < 4) newErrors.authorName = "Author name must be at least 4 characters.";
    if (content.trim().length < 4) newErrors.content = "Content must be at least 4 characters.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;

    // ✅ send "author" not "authorName"
    const newPost = { title, content, authorName };

    try {
      const res = await fetch(
        post ? `${API_URL}/posts/${post._id}` : `${API_URL}/posts`,
        {
          method: post ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newPost),
        }
      );

      if (res.ok) {
        const savedPost = await res.json();
        onSave(savedPost);
        onClose();
      } else {
        const errMsg = await res.text();
        console.error('Failed to save post:', errMsg);
        alert(errMsg || "Failed to save post");
      }
    } catch (error) {
      console.error('Error saving post:', error);
      alert("Network error: Could not save post");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div
        className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg relative transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>
        <h3 className="text-2xl font-bold mb-6 text-gray-800">
          {post ? 'Edit Post' : 'Create New Post'}
        </h3>
        <div className="space-y-4">
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post Title"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
          </div>
          <div>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Author Name"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
            {errors.authorName && <p className="text-red-500 text-sm">{errors.authorName}</p>}
          </div>
          <div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your amazing content here..."
              className="w-full p-3 border border-gray-300 rounded-md h-48 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              rows={5}
            ></textarea>
            {errors.content && <p className="text-red-500 text-sm">{errors.content}</p>}
          </div>
        </div>
        <div className="flex justify-end space-x-4 mt-8">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 font-semibold transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-semibold shadow-md transition"
          >
            Save Post
          </button>
        </div>
      </div>
    </div>
  );
}
