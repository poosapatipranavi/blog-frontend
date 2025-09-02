import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/">
          <div className="text-2xl font-bold text-gray-900 hover:text-indigo-600 transition-colors">
            Modern<span className="text-indigo-600">Blog</span>
          </div>
        </Link>
        <nav className="flex space-x-6 items-center">
          <Link href="/posts">
            <div className="text-gray-600 hover:text-indigo-600 font-semibold transition-colors">Blog</div>
          </Link>
          <Link href="/user">
            <div className="text-gray-600 hover:text-indigo-600 font-semibold transition-colors">Profile</div>
          </Link>
          <Link href="/admin">
            <div className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-indigo-100 transition-colors">Admin Panel</div>
          </Link>
        </nav>
      </div>
    </header>
  );
}