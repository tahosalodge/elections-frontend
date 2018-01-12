export function handleResponse(response) {
  if (response.ok) {
    return response.json();
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
  return fetch(`${process.env.REACT_APP_API_URL}${url}`, fetchParams)
    .then(handleResponse)
    .catch((error) => {
      throw new Error(error);
    });
}
