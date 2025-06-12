import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';

const AdminProfile = () => {
  const [image, setImage] = useState(null);
  const [username, setUsername] = useState('Admin User');
  const [email, setEmail] = useState('admin@example.com');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Just for preview
    }
  };

  const handleProfileUpdate = async () => {
    try {
      const res = await fetch('/api/admin/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          email,
          password: currentPassword || 'default123',
          profileImage: image || null,
        }),
      });

      const result = await res.json();
      if (result.success) {
        alert('Profile updated successfully!');
      } else {
        alert(result.message || 'Failed to update profile.');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong while updating profile.');
    }
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      alert("New passwords don't match.");
      return;
    }

    try {
      const res = await fetch('/api/admin/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          email,
          password: newPassword,
          profileImage: image || null,
        }),
      });

      const result = await res.json();
      if (result.success) {
        alert('Password changed successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        alert(result.message || 'Failed to change password.');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong while changing password.');
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Profile Section */}
        <div className="bg-white shadow p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Admin Profile</h2>
          <div className="flex items-center gap-6 mb-4">
            <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
              {image ? (
                <img src={image} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500 text-sm">No Image</div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="text-sm text-gray-600"
            />
          </div>
          <div className="space-y-3">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              placeholder="Admin Name"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              placeholder="Admin Email"
            />
            <button
              onClick={handleProfileUpdate}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Update Profile
            </button>
          </div>
        </div>

        {/* Password Section */}
        <div className="bg-white shadow p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Change Password</h2>
          <div className="space-y-3">
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              placeholder="Current Password"
            />
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              placeholder="New Password"
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              placeholder="Confirm New Password"
            />
            <button
              onClick={handlePasswordChange}
              className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProfile;
