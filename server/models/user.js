import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  points: Number,
  todo: [{
    type: String
  }],
  goals: [{
    type: String,
  }],
});



export default mongoose.model('User', UserSchema);
