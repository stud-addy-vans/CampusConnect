// client/src/api/events.ts

import api from './axios';

interface EventData {
  title: string;
  description: string;
  date: string;
  location: string;
}

// Function to create a new event
export const createEvent = async (eventData: EventData) => {
  const response = await api.post('/events', eventData);
  return response.data;
};

// Function to get all events
export const getEvents = async () => {
  const response = await api.get('/events');
  return response.data;
};