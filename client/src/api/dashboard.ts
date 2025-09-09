// client/src/api/dashboard.ts

import api from './axios';
import { type Event } from './events';
import { type MarketplaceItem } from './marketplace';

export interface DashboardStats {
  userCount: number;
  eventCount: number;
  itemCount: number;
  recentEvents: Event[];
  recentItems: MarketplaceItem[];
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await api.get('/dashboard/stats');
  return response.data;
};