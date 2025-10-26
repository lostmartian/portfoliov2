import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              Portfolio
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-500 hover:text-gray-900 transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-gray-500 hover:text-gray-900 transition-colors">
              About
            </Link>
            <Link href="/projects" className="text-gray-500 hover:text-gray-900 transition-colors">
              Projects
            </Link>
            <Link href="/contact" className="text-gray-500 hover:text-gray-900 transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
