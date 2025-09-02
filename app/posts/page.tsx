import { getPosts } from '../lib/api';
import PostCard from '../components/PostCard';

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-900">Latest Articles</h1>
        <p className="text-gray-500 mt-2">Discover new ideas and stay up-to-date.</p>
      </header>
      
      {!posts || posts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-700">No posts found.</h2>
          <p className="text-gray-500 mt-2">Ensure the backend is running and posts have been added to the database.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}