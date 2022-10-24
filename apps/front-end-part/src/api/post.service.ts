import axios from 'axios';

export default class PostService {
  static async getAll() {
    const response = await axios.get('http://localhost:3000/api/test');
    return response;
  }
}
