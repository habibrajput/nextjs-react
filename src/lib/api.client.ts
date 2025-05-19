const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const defaultHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
};

// Helper to handle fetch response and errors
async function handleResponse(response) {
  const contentType = response.headers.get('content-type');
  let data = null;

  if (contentType && contentType.includes('application/json')) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    const error = data?.message || response.statusText || 'API error';
    throw new Error(error);
  }

  return data;
}

async function get(endpoint, options = {}) {
  const config = {
    method: 'GET',
    headers: {
      ...defaultHeaders,
      ...(options.headers || {})
    },
    ...options
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);
  return handleResponse(response);
}

async function post(endpoint, body, options = {}) {
  const config = {
    method: 'POST',
    headers: {
      ...defaultHeaders,
      ...(options.headers || {})
    },
    body: JSON.stringify(body),
    ...options
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);
  return handleResponse(response);
}

async function put(endpoint, body, options = {}) {
  const config = {
    method: 'PUT',
    headers: {
      ...defaultHeaders,
      ...(options.headers || {})
    },
    body: JSON.stringify(body),
    ...options
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);
  return handleResponse(response);
}

async function del(endpoint, options = {}) {
  const config = {
    method: 'DELETE',
    headers: {
      ...defaultHeaders,
      ...(options.headers || {})
    },
    ...options
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);
  return handleResponse(response);
}

export const apiClient = {
  get,
  post,
  put,
  delete: del
};
