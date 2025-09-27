import { ConfigAPIURL } from '../config/ConfigAPIURL';

export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${ConfigAPIURL}/api/v1/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    return data.data;
  } catch (error) {
    throw new Error(error.message || 'Network error occurred');
  }
};