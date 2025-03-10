import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// login
export const loginUser = async (email, password) => {
  return API.post('/auth/login', { email, password });
};

// register
export const registerUser = async (name, email, password) => {
  return API.post('/auth/register', { name, email, password });
};

// get user profile
export const getUserProfile = async (token) => {
  return API.get('/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// board nou
export const createBoard = async (token, boardName) => {
  return API.post(
    '/boards/create',
    { name: boardName },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// get la toate boardurile userului
export const getBoards = async (token) => {
  return API.get('/boards', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// sterge board
export const deleteBoard = async (token, boardId) => {
  return API.delete(`/boards/${boardId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// update board
export const updateBoard = async (token, boardId, newName) => {
  return API.put(`/boards/${boardId}`,
    { name: newName },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

// endpoint taskuri
export const getTasks = (token, boardId) => {
  return API.get(`/boards/${boardId}/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createTask = (token, boardId, taskData) => {
  return API.post(`/boards/${boardId}/tasks`, taskData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateTask = (token, boardId, taskId, taskData) => {
  return API.put(`/boards/${boardId}/tasks/${taskId}`, taskData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteTask = (token, boardId, taskId) => {
  return API.delete(`/boards/${boardId}/tasks/${taskId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};