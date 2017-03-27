import mongoose, { Schema } from 'mongoose';

export default mongoose.model('message', new Schema({
  text: String,
  userId: String,
  createdAt: { type: Date, default: Date.now }
}));
