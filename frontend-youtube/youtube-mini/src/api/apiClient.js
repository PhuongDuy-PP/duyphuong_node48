import axios from 'axios';

// Cấu hình axios
const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor (nếu cần, thêm token vào header)
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
