import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
  formData: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  status: {
    type: String,
    enum: ['new', 'under-review', 'accepted', 'rejected'],
    default: 'new',
  },
}, { timestamps: true });

export default mongoose.models.Application || mongoose.model('Application', ApplicationSchema);
