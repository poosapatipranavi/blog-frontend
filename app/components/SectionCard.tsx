import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface SectionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}

export default function SectionCard({ icon, title, description, href }: SectionCardProps) {
  return (
    <Link href={href} className="w-full">
      <div className="bg-white rounded-2xl shadow-lg p-8 h-full flex flex-col items-center text-center group transform hover:-translate-y-2 transition-transform duration-300 border-t-4 border-transparent hover:border-indigo-500">
        <div className="bg-gray-100 p-4 rounded-full mb-6">
          {icon}
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">{title}</h2>
        <p className="text-gray-600 flex-grow">{description}</p>
        <div className="mt-6 font-semibold text-indigo-600 flex items-center group-hover:underline">
          Go to {title} <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
} // <-- This closing brace was missing

