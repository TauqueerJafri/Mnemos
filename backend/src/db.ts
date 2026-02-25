import mongoose, { Schema, Types, model} from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoUri = process.env.MONGODB_URI || '';
if (!mongoUri) {
  throw new Error('MONGODB_URI not set in .env');
}

mongoose.connect(mongoUri)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// ----------------------------------------------------------
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const UserModel = model("User", userSchema)

// ----------------------------------------------------------
const contentTypes = ['tweet', 'video', 'document', 'links']; // Extend as needed

const contentSchema = new Schema({
  title: { type: String, required: true },
  link: { type: String, required: true },
  type: { type: String, enum: contentTypes, required: true },
  tags: [{ type: Types.ObjectId, ref: 'Tag' }],
  userId: { type: Types.ObjectId, ref: 'User', required: true },
});

export const ContentModel = model("Content", contentSchema)

// -----------------------------------------------------------
const linkSchema = new mongoose.Schema({
  hash: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

export const LinkModel = model("Link", linkSchema)