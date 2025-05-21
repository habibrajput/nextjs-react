"use client";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


const defaultHeaders = ((authToken: string) => {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${authToken}`
  }
});

type RequestOptions = {
  headers?: Record<string, string>;
};

// Helper to handle fetch response and errors
async function handleResponse(response: Response) : Promise<Response> {
  let data = await response.json();
  return data;
}

async function get(endpoint: string, authToken: string, options: RequestOptions = {}) : Promise<Response> {
  const config = {
    method: 'GET',
    headers: {
      ...defaultHeaders(authToken),
    },
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

export const apiServices = {
  get,
  post,
  put,
  delete: del
};
