import SectionCard from './components/SectionCard';
import { Home, Shield, User } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-900">Welcome to ModernBlog</h1>
        <p className="text-gray-500 mt-2">Your platform for creating, managing, and sharing content.</p>
      </header>

      <div className="flex flex-col items-center gap-8 max-w-2xl mx-auto">
        <SectionCard
          icon={<Home size={40} className="text-blue-500" />}
          title="View Blog"
          description="Read the latest articles, discover new ideas, and explore content from our creators."
          href="/posts"
        />
        <SectionCard
          icon={<Shield size={40} className="text-green-500" />}
          title="Admin Panel"
          description="Manage your content. Create, edit, and delete posts from your dedicated dashboard."
          href="/admin"
        />
        <SectionCard
          icon={<User size={40} className="text-purple-500" />}
          title="User Profile"
          description="View your profile, manage your settings, and see your activity across the platform."
          href="/user"
        />
      </div>
    </div>
  );
}