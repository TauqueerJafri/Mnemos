import mongoose, { Schema, model} from 'mongoose';

mongoose.connect("Connection String");

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const UserModel = model("User", userSchema)