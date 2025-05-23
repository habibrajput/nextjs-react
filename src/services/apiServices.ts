"use client";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const setHeaders = ((authToken: string) => {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${authToken}`
  }
});

const setBody = ((body: {}) => {
  return setBody;
})

async function get(endpoint: string, authToken?: string): Promise<Response> {
  const config = {
    method: 'GET',
    ...(authToken && { headers: setHeaders(authToken) }),
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);
  return handleResponse(response);
}

async function post(endpoint: string, body: {}, authToken?: string) {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);
  return handleResponse(response);
}

async function put(endpoint: string, body: {}, authToken?: string) {
  const config = {
    method: 'PUT',
    ...(authToken && { headers: setHeaders(authToken) }),
    body: setBody,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);
  return handleResponse(response);
}

async function del(endpoint: string, body: {}, authToken?: string) {
  const config = {
    method: 'DELETE',
    ...(authToken && { headers: setHeaders(authToken) }),
    body: setBody,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);
  return handleResponse(response);
}

async function handleResponse(response: Response): Promise<Response> {
  let data = await response.json();

  if (data._metaData.statusCode === 401) {
    window.location.href = '/signin'
  }
  return data;
}

export const apiServices = {
  get,
  post,
  put,
  delete: del
};