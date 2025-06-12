import dbConnect from '@/lib/dbConnect';
import Admin from '@/models/Admin';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { username, email, password, profileImage } = req.body;
  console.log('Received data:', { username, email, password, profileImage });

  if (!username || !email || !password) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed password:', hashedPassword);

    const updatedAdmin = await Admin.findOneAndUpdate(
      {}, // only one admin expected
      {
        username,
        email,
        password: hashedPassword,
        profileImage,
      },
      { new: true, upsert: true }
    );

    console.log('Updated admin:', updatedAdmin);
    res.status(200).json({ success: true, admin: updatedAdmin });
  } catch (error) {
    console.error('Update failed:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}
