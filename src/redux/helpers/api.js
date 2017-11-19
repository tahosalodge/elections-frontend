export function handleApiErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
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
    .catch((error) => {
      throw error;
    });
}
