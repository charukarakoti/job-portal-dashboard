import { dbConnect } from '@/lib/dbConnect';
import Application from '@/models/Application';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    await dbConnect();

    console.log("📥 Received from Elementor:", req.body); // log full body
    const { fields } = req.body;

    if (!fields?.name || !fields?.email) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newApp = await Application.create({
      formData: fields,
      source: req.headers.referer || 'unknown',
    });

    return res.status(201).json({ success: true, application: newApp });
  } catch (error) {
    console.error('❌ Error:', error);
    return res.status(500).json({ message: 'Server Error' });
  }
}
