import React from 'react';
import { getSession } from 'next-auth/react';
import { dbConnect } from '@/lib/dbConnect';
import Application from '@/models/Application';
import ApplicationsTable from '@/components/ApplicationsTable';
import AdminLayout from '../../components/AdminLayout';

import StatsCards from '@/components/StatsCards'; // ✅ Add this line

const AdminDashboard = ({ applications }) => {
  return (
    <AdminLayout>
      {/* ✅ Add Stat Cards at the top */}
      <StatsCards applications={applications} />
      {/* Table of applications */}
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

  const apps = await Application.find().sort({ createdAt: -1 }).lean();
  const applications = apps.map((doc) => ({
    ...doc,
    _id: doc._id.toString(),
    createdAt: doc.createdAt?.toISOString(),
    updatedAt: doc.updatedAt?.toISOString(),
  }));
  

  return { props: { applications } };
}

