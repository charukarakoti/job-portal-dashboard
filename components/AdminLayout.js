import Link from 'next/link';
import Header from './header';

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-lg sticky top-0 h-screen">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-gray-700">🛠 Admin Panel</h1>
        </div>
        <nav className="p-4">
          <ul className="space-y-4">
            <li>
              <Link href="/admin" className="block py-2 px-3 rounded hover:bg-gray-100">
                📋 Dashboard
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  localStorage.removeItem('admin-auth');
                  window.location.href = '/admin/login';
                }}
                className="block w-full text-left text-red-500 hover:text-red-700"
              >
                🚪 Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content area */}
      <main className="flex-1 p-6 overflow-auto bg-gray-50 min-h-screen">
        <Header />
        <div className="mt-6">
          {children}
        </div>
      </main>
    </div>
  );
}
