import axios, { AxiosInstance } from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const TOKEN_KEY = "mittel_auth_token";

export const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // ✅ ADD THIS LINE
});

const withDataEnvelope = <T = unknown>(promise: Promise<{ data: any }>) =>
  promise.then((response: any) => {
    if (
      response &&
      typeof response.data === "object" &&
      response.data !== null &&
      "success" in response.data
    ) {
      return { ...response, data: response.data.data as T };
    }
    return response;
  });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (r) => r,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      if (!window.location.pathname.startsWith("/login")) {
        window.location.href = "/login";
      }
    }
    if (error?.response?.status === 403) {
      error.response.data = { ...(error.response.data || {}), message: "Access Denied" };
    }
    return Promise.reject(error);
  }
);

// ---- Endpoint helpers (frontend integration points) ----
export const AuthAPI = {
  register: (email: string, password: string, name?: string) =>
    withDataEnvelope(api.post("/api/auth/register", { email, password, ...(name ? { name } : {}) })),
  login: (email: string, password: string) =>
    withDataEnvelope(api.post("/api/auth/login", { email, password })),
};

export const InquiryAPI = {
  create: (payload: { name: string; email: string; phone: string; message: string }) =>
    withDataEnvelope(api.post("/api/inquiry", payload)),
};

export const WorkersAPI = {
  list: () => withDataEnvelope(api.get("/api/workers")),
  create: (data: any) => withDataEnvelope(api.post("/api/workers", data)),
  update: (id: string, data: any) => withDataEnvelope(api.put(`/api/workers/${id}`, data)),
  remove: (id: string) => withDataEnvelope(api.delete(`/api/workers/${id}`)),
};

export const AttendanceAPI = {
  mark: (payload: { date: string; entries: { workerId: string; present: boolean }[] }) =>
    withDataEnvelope(api.post("/api/attendance/mark", payload)),
  list: (params?: { date?: string; from?: string; to?: string }) =>
    withDataEnvelope(api.get("/api/attendance", { params: params ?? {} })),
  export: (params: { fromDate: string; toDate: string }) =>
    api.get("/api/attendance/export", {
      params,
      responseType: "blob",
    }),
};

export const InventoryAPI = {
  list: () => withDataEnvelope(api.get("/api/inventory")),
  create: (data: any) => withDataEnvelope(api.post("/api/inventory", data)),
  update: (id: string, data: any) => withDataEnvelope(api.put(`/api/inventory/${id}`, data)),
  remove: (id: string) => withDataEnvelope(api.delete(`/api/inventory/${id}`)),
  logs: (itemId: string) => withDataEnvelope(api.get(`/api/inventory/logs/${itemId}`)),
};

export const OrdersAPI = {
  list: () => withDataEnvelope(api.get("/api/orders")),
  get: (referenceId: string) => withDataEnvelope(api.get(`/api/orders/${referenceId}`)),
  create: (data: any) => withDataEnvelope(api.post("/api/orders", data)),
  updateStatus: (referenceId: string, status: string) =>
    withDataEnvelope(api.put(`/api/orders/${referenceId}/status`, { status })),
};
