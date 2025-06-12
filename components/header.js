import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gray-100 px-8 py-4 rounded shadow mb-6 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800">Job Portal</h1>
      <nav className="space-x-6 text-gray-700 font-medium">
        <Link href="/admin/openings" className="hover:text-black">Job Openings</Link>
        <Link href="/admin/applications" className="hover:text-black">Job Applications</Link>
        <Link href="/admin/profile" className="hover:text-black">Admin</Link>
      </nav>
    </header>
  );
}

