import axios from 'axios';

const API_URL = 'http://localhost:3000/api/users';

export default {
  async fetchAndPopulateDB() {
    return axios.post(`${API_URL}/fetch`);
  },

  async getAllUsers() {
    const response = await axios.get(API_URL);
    return response.data;
  },

  async updateUser(uuid, userData) {
    return axios.put(`${API_URL}/${uuid}`, userData);
  }
};