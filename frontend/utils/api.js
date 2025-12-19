const API_BASE_URL = 'http://localhost:3000/api';

// Get auth token from localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

// Get auth headers
const getAuthHeaders = () => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// API request wrapper
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    let data;
    
    try {
      data = await response.json();
    } catch (jsonError) {
      // If response is not JSON, create error
      throw new Error(`Server returned non-JSON response: ${response.status} ${response.statusText}`);
    }
    
    // Handle both success and error responses from backend
    if (!response.ok) {
      const errorMessage = data.message || data.error || `API request failed with status ${response.status}`;
      const error = new Error(errorMessage);
      error.status = response.status;
      error.data = data;
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Auth APIs
export const authAPI = {
  register: (userData) => apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
  
  login: (credentials) => apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
  
  getMe: () => apiRequest('/auth/me'),
};

// Village APIs
export const villageAPI = {
  getAll: () => apiRequest('/villages'),
  
  getById: (id) => apiRequest(`/villages/${id}`),
  
  create: (villageData) => apiRequest('/villages', {
    method: 'POST',
    body: JSON.stringify(villageData),
  }),
  
  update: (id, villageData) => apiRequest(`/villages/${id}`, {
    method: 'PUT',
    body: JSON.stringify(villageData),
  }),
  
  delete: (id) => apiRequest(`/villages/${id}`, {
    method: 'DELETE',
  }),
  
  approve: (id) => apiRequest(`/villages/${id}/approve`, {
    method: 'PUT',
  }),
};

// Forecast APIs
export const forecastAPI = {
  generate: (villageId) => apiRequest(`/villages/${villageId}/forecast`),
};

// AI Plan APIs
export const aiPlanAPI = {
  generate: (villageId) => apiRequest(`/villages/${villageId}/ai-plan`),
};

// Analytics APIs
export const analyticsAPI = {
  getSummary: () => apiRequest('/analytics/summary'),
  
  getAmenitiesStatus: () => apiRequest('/analytics/amenities-status'),
  
  getPriorityRanking: () => apiRequest('/analytics/priority-ranking'),
};

