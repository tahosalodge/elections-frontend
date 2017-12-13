export function handleApiErrors(response) {
  if (!response.ok) {
    const error = new Error(response.statusText);
    error.code = 'API';
    throw error;
  }
  return response;
}

export function apiRequest(url, method = 'GET', data = null) {
  const token = localStorage.getItem('electionToken');
  const fetchParams = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: data ? JSON.stringify(data) : null,
  };
  if (token) {
    fetchParams.headers.Authorization = `Bearer ${token}`;
  }
  return fetch(`${process.env.REACT_APP_API_URL}${url}`, fetchParams)
    .then(handleApiErrors)
    .then(response => response.json())
    .catch(() => {
      const error = new Error('Connection issue');
      error.code = 'NETWORK';
      throw error;
    });
}