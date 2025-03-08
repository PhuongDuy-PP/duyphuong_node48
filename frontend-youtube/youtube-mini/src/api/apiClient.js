import axios from 'axios';

// Cấu hình axios
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor (nếu cần, thêm token vào header)
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('USER_LOGIN');
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// part 2: define const MAX_RETRIES để xác định số lần retry khi call API extend token
// nếu vượt quá số lần retry, thì sẽ chuyển sang trang login
const MAX_RETRIES = 10;
let retryCount = 0;

apiClient.interceptors.response.use(
  (response) => response, // nếu response thành công, trả về response
  async (error) => {
    const originalRequest = error.config; // lấy request gốc

    console.log("error.response: ", error.response);

    if (error.response.status === 401) {
      if (retryCount < MAX_RETRIES) {
        retryCount++;
        // nếu response status = 401, gọi API extend-token
        const response = await extendToken();
        // response: message, token
        console.log("response: ", response);
        const newAccessToken = response.token

        // lưu token mới vào localStorage
        localStorage.setItem('USER_LOGIN', newAccessToken);

        // gán token mới vào header
        originalRequest.headers.Authorization = newAccessToken;

        // thực hiện request cũ với token mới
        return apiClient(originalRequest);
      } else {
        window.location.href = '/login';
      }

    }
    return Promise.reject(error);
  }
)

// tạo function call API extend-token
const extendToken = async () => {
  try {
    const { data } = await apiClient.post('/auth/extend-token', {}, {
      withCredentials: true
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export default apiClient;
