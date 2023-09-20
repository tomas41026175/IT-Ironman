import axios from "axios";

//Todo api position
const apiClient = axios.create({ baseURL: "/api" });

// req 前進行操作
apiClient.interceptors.request.use((config) => {
    //add header...
  return config;
});

// res 前進行操作
apiClient.interceptors.response.use(
  (response) => {
    // refine data
    return response;
  },
  (error) => {
    // handle error
    return Promise.reject(error);
  }
);

export const getTodoData = async() => apiClient.get("/handleTodoRequest");
