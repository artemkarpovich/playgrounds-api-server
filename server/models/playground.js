import mongoose, { Schema } from 'mongoose';

export default mongoose.model('playground', new Schema({
  category: String,
  userId: String,
  title: String,
  location: String,
  latitude: Number,
  longitude: Number,
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
}));
