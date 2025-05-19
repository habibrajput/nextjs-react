import { auth } from '@/lib/auth';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const getToken = async () => await auth;

const defaultHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: `Bearer ${getToken}`
};

type RequestOptions = {
  headers?: Record<string, string>;
};

// Helper to handle fetch response and errors
async function handleResponse(response: Response) {
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

async function get(endpoint: string, options: RequestOptions = {}) {
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

async function post(endpoint: string, body: {}, options: RequestOptions = {}) {
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

async function put(endpoint: string, body: {}, options: RequestOptions = {}) {
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

async function del(endpoint: string, options: RequestOptions = {}) {
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
