import Link from 'next/link';

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-gray-700">🛠 Admin Panel</h1>
        </div>
        <nav className="p-4">
          <ul className="space-y-3">
            <li>
              <Link href="/admin" className="text-gray-700 hover:text-black">
                📋 Dashboard
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  localStorage.removeItem('admin-auth');
                  window.location.href = '/admin/login';
                }}
                className="text-red-500 hover:text-red-700"
              >
                🚪 Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
