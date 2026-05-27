import axios from 'axios';

const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' }
});

// Add auth token to requests
api.interceptors.request.use(config => {
  const token = localStorage.getItem('adminToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('adminToken');
      if (window.location.pathname.startsWith('/admin')) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(err);
  }
);

// Auth
export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  me: () => api.get('/auth/me'),
  createAdmin: (data) => api.post('/auth/create-admin', data),
};

// Programs
export const programsAPI = {
  getAll: (params) => api.get('/programs', { params }),
  getById: (id) => api.get(`/programs/${id}`),
  create: (data) => api.post('/programs', data),
  update: (id, data) => api.put(`/programs/${id}`, data),
  delete: (id) => api.delete(`/programs/${id}`),
  uploadImage: (file) => {
    const formData = new FormData();
    formData.append('image', file);
    return api.post('/programs/upload-image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
};

// Events
export const eventsAPI = {
  getAll: (params) => api.get('/events', { params }),
  getById: (id) => api.get(`/events/${id}`),
  create: (data) => api.post('/events', data),
  update: (id, data) => api.put(`/events/${id}`, data),
  delete: (id) => api.delete(`/events/${id}`),
};

// Retreats
export const retreatsAPI = {
  getAll: (params) => api.get('/retreats', { params }),
  getById: (id) => api.get(`/retreats/${id}`),
  create: (data) => api.post('/retreats', data),
  update: (id, data) => api.put(`/retreats/${id}`, data),
  delete: (id) => api.delete(`/retreats/${id}`),
};

// Careers
export const careersAPI = {
  getAll: () => api.get('/careers'),
  getById: (id) => api.get(`/careers/${id}`),
  create: (data) => api.post('/careers', data),
  update: (id, data) => api.put(`/careers/${id}`, data),
  delete: (id) => api.delete(`/careers/${id}`),
  apply: (id, data) => api.post(`/careers/${id}/apply`, data),
  getApplications: (id) => api.get(`/careers/${id}/applications`),
};

// Testimonials
export const testimonialsAPI = {
  getAll: (params) => api.get('/testimonials', { params }),
  getAllAdmin: () => api.get('/testimonials/admin/all'),
  create: (data) => api.post('/testimonials', data),
  update: (id, data) => api.put(`/testimonials/${id}`, data),
  delete: (id) => api.delete(`/testimonials/${id}`),
};

// Contact
export const contactAPI = {
  submit: (data) => api.post('/contact', data),
  getAll: (params) => api.get('/contact', { params }),
  update: (id, data) => api.put(`/contact/${id}`, data),
  delete: (id) => api.delete(`/contact/${id}`),
};

// Donations
export const donationsAPI = {
  createOrder: (data) => api.post('/donations/create-order', data),
  verify: (data) => api.post('/donations/verify', data),
  getAll: () => api.get('/donations'),
};

// Volunteers
export const volunteersAPI = {
  submit: (data) => api.post('/volunteers', data),
  getAll: (params) => api.get('/volunteers', { params }),
  update: (id, data) => api.put(`/volunteers/${id}`, data),
  delete: (id) => api.delete(`/volunteers/${id}`),
};

// Media
export const mediaAPI = {
  getAll: (params) => api.get('/media', { params }),
  create: (data) => api.post('/media', data),
  update: (id, data) => api.put(`/media/${id}`, data),
  delete: (id) => api.delete(`/media/${id}`),
  uploadImage: (file) => {
    const formData = new FormData();
    formData.append('image', file);
    return api.post('/media/upload-image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  uploadImages: (files) => {
    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append('images', file));
    return api.post('/media/upload-images', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
};

// Analytics
export const analyticsAPI = {
  overview: () => api.get('/analytics/overview'),
};

export default api;
