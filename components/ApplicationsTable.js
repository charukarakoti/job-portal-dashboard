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
        app?.formData?.name?.toLowerCase().includes(search.toLowerCase()) ||
        app?.formData?.email?.toLowerCase().includes(search.toLowerCase()) ||
        app?.formData?.job_role?.toLowerCase().includes(search.toLowerCase());

      const statusMatch = filter === 'all' || app.status === filter;
      return textMatch && statusMatch;
    });
  }, [data, search, filter]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      case 'followup':
      case 'under-review':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name, email, or role"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded"
        >
          <option value="all">All Status</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
          <option value="followup">Follow-Up</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2 font-semibold">Name</th>
              <th className="px-4 py-2 font-semibold">Email</th>
              <th className="px-4 py-2 font-semibold">Role</th>
              <th className="px-4 py-2 font-semibold">Status</th>
              <th className="px-4 py-2 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((app) => (
              <tr key={app._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{app?.formData?.name || '-'}</td>
                <td className="px-4 py-2">{app?.formData?.email || '-'}</td>
                <td className="px-4 py-2">{app?.formData?.job_role || '-'}</td>
                <td className="px-4 py-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(app.status)}`}>
                    {app.status}
                  </span>
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => updateStatus(app._id, 'accepted')}
                    className="px-3 py-1 bg-green-500 text-white rounded text-xs"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => updateStatus(app._id, 'rejected')}
                    className="px-3 py-1 bg-red-500 text-white rounded text-xs"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => updateStatus(app._id, 'followup')}
                    className="px-3 py-1 bg-yellow-500 text-white rounded text-xs"
                  >
                    Follow-Up
                  </button>
                </td>
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400">
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
