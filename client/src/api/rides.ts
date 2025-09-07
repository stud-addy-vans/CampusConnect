// client/src/api/rides.ts

import api from './axios';

export interface Ride {
  _id: string;
  origin: string;
  destination: string;
  date: string;
  seatsAvailable: number;
  driver: {
    _id: string;
    username: string;
  };
  createdAt: string;
}

interface RideData {
  origin: string;
  destination:string;
  date: string;
  seatsAvailable: number;
}

export const createRide = async (rideData: RideData) => {
  const response = await api.post('/rides', rideData);
  return response.data;
};

export const getRides = async (): Promise<Ride[]> => {
  const response = await api.get('/rides');
  return response.data;
};