const API_BASE_URL = 'http://localhost:3000';

export const apiCall = async (endpoint, data = {}, method = 'POST') => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: method === 'GET' ? null : JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

// Test connection
export const testBackend = () => 
  apiCall('/api/test', { message: 'Hello from IntentIDE Frontend!' });