import Link from 'next/link';

interface PublicPost {
  _id: string;
  title: string;
  content: string;
  authorName: string;
  authorAvatarUrl: string;
  coverImageUrl: string;
  createdAt: string;
}

export default function PostCard({ post }: { post: PublicPost }) {
  return (
    <Link href={`/post/${post._id}`}>
      <div className="bg-white rounded-2xl shadow-md overflow-hidden group transform hover:-translate-y-2 transition-transform duration-300 h-full flex flex-col">
        <img src={post.coverImageUrl} alt={post.title} className="w-full h-48 object-cover" onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x400/cccccc/ffffff?text=Image+Error'; }} />
        <div className="p-6 flex flex-col flex-grow">
          <h2 className="text-2xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">{post.title}</h2>
          <p className="text-gray-600 mt-2 line-clamp-3 flex-grow">{post.content}</p>
          <div className="mt-4 flex items-center pt-4 border-t">
            <img src={post.authorAvatarUrl} alt={post.authorName} className="w-10 h-10 rounded-full object-cover" onError={(e) => { e.currentTarget.src = 'https://placehold.co/40x40/e0e7ff/4338ca?text=User'; }} />
            <div className="ml-3">
              <p className="font-semibold text-gray-700">{post.authorName}</p>
              <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}