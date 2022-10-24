import axios from 'axios';

export default class PostService {
  static async get(url: string) {
    const response = await axios.get(url);
    return response;
  }
}
