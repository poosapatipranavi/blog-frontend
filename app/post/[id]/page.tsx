import { notFound } from 'next/navigation';
import { getPostById } from '../../lib/api';
import CreatorView from '../../components/CreatorView';

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPostById(params.id);

  if (!post) {
    notFound();
  }

  const creatorData = {
    name: post.authorName,
    avatarUrl: post.authorAvatarUrl,
    publishDate: new Date(post.createdAt).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    }),
  };

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-12">
        <aside className="hidden lg:block lg:col-span-4 xl:col-span-3">
          <div className="sticky top-28">
            <CreatorView creator={creatorData} />
          </div>
        </aside>
        <main className="lg:col-span-8 xl:col-span-9">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <img src={post.coverImageUrl} alt={post.title} className="w-full h-64 md:h-96 object-cover" onError={(e) => { e.currentTarget.src = 'https://placehold.co/1200x600/cccccc/ffffff?text=Image+Error'; }} />
            <div className="p-6 md:p-8">
              <div className="lg:hidden mb-8">
                 <CreatorView creator={creatorData} />
              </div>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">{post.title}</h1>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag: string) => <span key={tag} className="bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full">{tag}</span>)}
              </div>
              <article className="prose prose-lg max-w-none mt-8 text-gray-700">
                <p>{post.content}</p>
              </article>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
