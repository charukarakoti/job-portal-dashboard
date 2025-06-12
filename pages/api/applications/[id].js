import { dbConnect } from '../../../lib/dbConnect';
import Application from '../../../models/Application';

export default async function handler(req, res) {
  await dbConnect();

  const { id } = req.query;

  if (req.method === 'PATCH') {
    try {
      const { status } = req.body;
      const updated = await Application.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );
      res.status(200).json({ success: true, data: updated });
    } catch (err) {
      console.error('Error updating application:', err); // ✅ now `err` is used
      res.status(500).json({ success: false, message: 'Update failed' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
