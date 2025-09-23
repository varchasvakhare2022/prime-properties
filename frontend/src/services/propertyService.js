import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const propertyService = {
  getAllProperties: () => {
    return axios.get(`${API_URL}/properties/public`);
  },

  getDeveloperProperties: () => {
    return axios.get(`${API_URL}/properties/developer`);
  },

  createProperty: (propertyData) => {
    return axios.post(`${API_URL}/properties/developer`, propertyData);
  },

  updateProperty: (id, propertyData) => {
    return axios.put(`${API_URL}/properties/developer/${id}`, propertyData);
  },

  markPropertyAsSold: (id) => {
    return axios.put(`${API_URL}/properties/developer/${id}/mark-sold`);
  }
};

export default propertyService;
