import axios from 'axios';

const url = 'http://localhost:9989/registration'

class Auth {
  static async createUser() {
    return await axios.post(url, )
  }
}
