import Todo from '../models/todo.js';
import faker from 'faker';
import mongoose from 'mongoose';

const db = mongoose.connect(`mongodb+srv://test:1111@cluster0.qhdd8.mongodb.net/soloProject?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})

db.then(async () => {
  // await mongoose.connection.db.dropDatabase();
  const createTodo = async (amount) => {
    for (let item = 0; item < amount; item += 1) {
      await Todo.create({
        title: faker.lorem.words(),
        text: faker.lorem.sentences(),
        author: faker.name.firstName(),
        created_at: Date.now(),
      });
    }
  }
  await createTodo(5);
  
  mongoose.disconnect();
})
