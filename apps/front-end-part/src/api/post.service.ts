import axios from 'axios';

export default class PostService {
  static async get(url: string) {
    const response = await axios.get(url);
    return response;
  }

  static async post(url: string, obj: object) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj),
    };

    const response = await fetch(url, requestOptions);
    return response;
  }
}
