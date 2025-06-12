import { useState, useMemo } from 'react';
import axios from 'axios';

export default function ApplicationsTable({ applications }) {
  const [data, setData] = useState(applications);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`/api/applications/${id}`, { status });
      const updated = data.map((app) =>
        app._id === id ? { ...app, status } : app
      );
      setData(updated);
    } catch {
      alert('Status update failed');
    }
  };

  const filteredData = useMemo(() => {
    return data.filter((app) => {
      const textMatch =
        app.formData.name?.toLowerCase().includes(search.toLowerCase()) ||
        app.formData.email?.toLowerCase().includes(search.toLowerCase()) ||
        app.formData.job_role?.toLowerCase().includes(search.toLowerCase());

      const statusMatch = filter === 'all' || app.status === filter;

      return textMatch && statusMatch;
    });
  }, [search, filter, data]);

  return (
    <div className="mt-8">
      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
        <input
          type="text"
          placeholder="🔍 Search by name, email or role"
          className="border border-gray-300 rounded px-4 py-2 w-full sm:w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border border-gray-300 rounded px-4 py-2"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="new">New</option>
          <option value="under-review">Under Review</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold">
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Job Role</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((app) => (
              <tr key={app._id} className="border-t text-sm">
                <td className="py-2 px-4">{app.formData.name}</td>
                <td className="py-2 px-4">{app.formData.email}</td>
                <td className="py-2 px-4">{app.formData.job_role}</td>
                <td className="py-2 px-4 capitalize">{app.status}</td>
                <td className="py-2 px-4 space-x-2">
                  <button
                    onClick={() => updateStatus(app._id, 'accepted')}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => updateStatus(app._id, 'rejected')}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => updateStatus(app._id, 'under-review')}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Review
                  </button>
                </td>
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan="5" className="py-4 px-4 text-center text-gray-500">
                  No applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
