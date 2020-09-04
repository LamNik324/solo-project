import axios from 'axios';

const url = 'http://localhost:9989/main/'

class TodoService {
  // get posts
  static getTodos() {
    return new Promise((resolve, reject) => {
      axios.get(url).then((res) => {
        const data = res.data;
        data.sort((el) => {
          if (el.createdAt) {
            return -1
          }
        })
        console.log(data);
        resolve(
          data.map(todo => ({
            ...todo,
            title: todo.title,
            text: todo.text,
            createdAt: new Date(todo.createdAt),
          }))
        );
      })
        .catch((err) => {
          reject(err);
        })
    });
  }
  // create posts
  static async createTodo(text, title) {
    return await axios.post(url, {
      text,
      title
    });
  }

  // delete post 
  static async deleteTodo(id) {
    return await axios.delete(`${url}${id}`)
  }

  static async addProgress(id) {
    return await axios.put(`${url}${id}`)
  }

  static async deleteProgress(id) {
    return await axios.put(`${url}regress/${id}`)
  }

  static async done(id) {
    return await axios.put(`${url}done/${id}`)
  }

  static async sendMessage() {
    return await axios.get(`${url}send`)
  }
}

export default TodoService;
