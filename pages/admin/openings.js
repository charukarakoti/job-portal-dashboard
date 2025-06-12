import React from 'react';
import AdminLayout from '../../components/AdminLayout';

const jobs = [
  {
    id: 1,
    title: 'Frontend Developer',
    department: 'Engineering',
    type: 'Full-time',
    status: 'Open',
  },
  {
    id: 2,
    title: 'UI/UX Designer',
    department: 'Design',
    type: 'Contract',
    status: 'Closed',
  },
  {
    id: 3,
    title: 'Marketing Executive',
    department: 'Marketing',
    type: 'Part-time',
    status: 'Open',
  },
];

const JobOpeningsPage = () => {
  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Job Openings</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">
            + Add New Job
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white p-5 rounded shadow border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">{job.title}</h2>
              <p className="text-sm text-gray-500 mb-1">Department: {job.department}</p>
              <p className="text-sm text-gray-500 mb-1">Type: {job.type}</p>
              <p className={`text-sm font-medium mt-2 ${
                job.status === 'Open' ? 'text-green-600' : 'text-red-500'
              }`}>
                Status: {job.status}
              </p>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default JobOpeningsPage;
