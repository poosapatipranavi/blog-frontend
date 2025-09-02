export default function Footer() {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="container mx-auto px-4 py-6 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} ModernBlog. All rights reserved.</p>
        <p>Built with NestJS, Next.js, and MongoDB.</p>
      </div>
    </footer>
  );
}