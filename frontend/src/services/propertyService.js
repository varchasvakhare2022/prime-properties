// Property service for API calls
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

class PropertyService {
  // Get auth headers
  getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }

  // Get all properties (public)
  async getAllProperties() {
    try {
      const response = await fetch(`${API_BASE_URL}/properties`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch properties');
      }
      
      return data;
    } catch (error) {
      throw error;
    }
  }

  // Get property by ID (public)
  async getPropertyById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/properties/${id}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch property');
      }
      
      return data;
    } catch (error) {
      throw error;
    }
  }

  // Get developer's properties
  async getMyProperties() {
    try {
      const response = await fetch(`${API_BASE_URL}/properties/developer/my-properties`, {
        headers: this.getAuthHeaders(),
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch your properties');
      }
      
      return data;
    } catch (error) {
      throw error;
    }
  }

  // Create new property
  async createProperty(propertyData) {
    try {
      const response = await fetch(`${API_BASE_URL}/properties/developer`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(propertyData),
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create property');
      }
      
      return data;
    } catch (error) {
      throw error;
    }
  }

  // Update property
  async updateProperty(id, propertyData) {
    try {
      const response = await fetch(`${API_BASE_URL}/properties/developer/${id}`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(propertyData),
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update property');
      }
      
      return data;
    } catch (error) {
      throw error;
    }
  }

  // Delete property
  async deleteProperty(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/properties/developer/${id}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to delete property');
      }
      
      return true;
    } catch (error) {
      throw error;
    }
  }

  // Mark property as sold
  async markPropertyAsSold(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/properties/developer/${id}/mark-sold`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to mark property as sold');
      }
      
      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default new PropertyService();