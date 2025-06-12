import React from 'react';
import AdminLayout from '../../components/AdminLayout';

const JobApplicationsPage = () => {
  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Job Applications</h1>
        <p className="text-gray-600">
          This is the Job Applications page. Application data will be shown here.
        </p>
      </div>
    </AdminLayout>
  );
};

export default JobApplicationsPage;
