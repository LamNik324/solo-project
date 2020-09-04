import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
  title: String,
  author: String,
  text: String,
  progress: {
    default: 0,
    type: Number,
  },
  createdAt: Date,
});

TodoSchema.statics.LatestTodos = async function () {
  return this.find().sort({ createdAt: -1 }).limit(5).exec()
}

export default mongoose.model('Todo', TodoSchema);
