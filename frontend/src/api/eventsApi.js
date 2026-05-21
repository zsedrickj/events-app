import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getEvents = async () => {
  const response = await axios.get(`${BASE_URL}/api/events`);
  return response.data;
};

export const createEvent = async (eventData) => {
  const response = await axios.post(`${BASE_URL}/api/events`, eventData);
  return response.data;
};

