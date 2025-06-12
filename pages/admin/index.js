import React from 'react';
import { getSession } from 'next-auth/react';
import dbConnect from '@/lib/dbConnect';
import Application from '@/models/Application';

import ApplicationsTable from '@/components/ApplicationsTable';
import AdminLayout from '../../components/AdminLayout';
import StatsCards from '@/components/StatsCards';

const AdminDashboard = ({ applications }) => {
  return (
    <AdminLayout>
      <StatsCards applications={applications} />
      <ApplicationsTable applications={applications} />
    </AdminLayout>
  );
};

export default AdminDashboard;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session || session.user.email !== process.env.ADMIN_EMAIL) {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    };
  }

  await dbConnect();

  const apps = await Application.find({}); // ✅ FIX: define 'apps'

  const applications = apps.map((a) => ({
    ...a.toObject(), // convert Mongoose doc to plain object
    _id: a._id.toString(),
    status: a.status || 'under-review',
    createdAt: a.createdAt?.toString() || '',
    updatedAt: a.updatedAt?.toString() || '',
  }));

  return { props: { applications } };
}
