export function handleResponse(response) {
  if (response.ok) {
    return response.json();
  }

  if (response.status === 500) {
    const error = new Error('Connection error.');
    error.status = 500;
    throw error;
  }
  return response.json().then((error) => {
    throw new Error(error.message);
  });
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
  return fetch(`/api${url}`, fetchParams)
    .then(handleResponse)
    .catch((error) => {
      throw new Error(error);
    });
}
