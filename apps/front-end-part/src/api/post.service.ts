import axios from 'axios';

export default class PostService {
  static async get(url: string) {
    const response = await axios.get(url);
    return response;
  }

  static async post(url: string, obj: object) {
    try {
      const result = await axios.post(url, obj);
      console.log(result.status);
    } catch (error) {
      console.log(error);
    }
  }
}
