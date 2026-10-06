import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);



let isRefreshing = false;

let waitingQueue = [];

// Waiting requests ko handle karega
const processQueue = (error, token = null) => {
  waitingQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });

  waitingQueue = [];
};

// Ye APIs refresh trigger nahi karengi
const SKIP_REFRESH = [
  "/auth/login",
  "/auth/register",
  "/auth/refresh",
  "/auth/logout",
];


api.interceptors.response.use(
  (response) => {
  
    return response;
  },

  async (error) => {
    const originalRequest = error.config;

   
    if (!error.response) {
      return Promise.reject(error);
    }


    const isSkipped = SKIP_REFRESH.some((url) =>
      originalRequest.url?.includes(url)
    );


    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      !isSkipped
    ) {


      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          waitingQueue.push({
            resolve,
            reject,
          });
        }).then((newAccessToken) => {
          originalRequest.headers.Authorization =
            `Bearer ${newAccessToken}`;

          return api(originalRequest);
        });
      }


      originalRequest._retry = true;
      isRefreshing = true;

      try {
        console.log("🔄 Access token expired. Refreshing...");

        const refreshResponse = await api.post("/auth/refresh");

        const newAccessToken = refreshResponse.data?.token;

        if (!newAccessToken) {
          throw new Error("New access token not received");
        }

        console.log("✅ New access token received");

        localStorage.setItem("token", newAccessToken);


        processQueue(null, newAccessToken);


        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        console.error("❌ Refresh token failed:", refreshError);


        processQueue(refreshError);


        localStorage.removeItem("token");


        window.dispatchEvent(new Event("auth:logout"));

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;