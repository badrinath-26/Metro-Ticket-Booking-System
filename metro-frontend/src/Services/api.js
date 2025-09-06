import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Add token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const registerUser = (data) => api.post("/auth/register", data);
export const loginUser = (data) => api.post("/auth/login", data);

// Station APIs
export const getAllStations = () => api.get("/stations");

// Ticket APIs
export const bookTicket = (data) => api.post("/tickets/book", data);
export const getAllTickets = () => api.get("/tickets");
export const getTicketFare = (fromStationId, toStationId) => 
  api.get(`/tickets/fare?fromStationId=${fromStationId}&toStationId=${toStationId}`);

export default api;