export async function getUserData() {
    try {
      const response = await fetch('/api/users/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      if (data.user || data.data) {
        return data.user || data.data; // Handle both response formats
      } else {
        throw new Error(data.error || 'Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  }