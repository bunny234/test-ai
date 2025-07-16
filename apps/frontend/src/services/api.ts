import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

// Define interfaces for the data
export interface Strategy {
  id: string;
  name: string;
  status: string;
}

export interface Trade {
  id: string;
  symbol: string;
  quantity: number;
  price: number;
  timestamp: string;
}

export interface Pnl {
  totalPnl: number;
}

export interface Position {
  id: string;
  symbol: string;
  quantity: number;
  averagePrice: number;
}

// API service functions
export const getActiveStrategies = async (): Promise<Strategy[]> => {
  const response = await axios.get(`${API_BASE_URL}/strategies`);
  return response.data;
};

export const getRecentTrades = async (symbol?: string, date?: string): Promise<Trade[]> => {
  const response = await axios.get(`${API_BASE_URL}/trades`, { params: { symbol, date } });
  return response.data;
};

export const getTotalPnl = async (): Promise<Pnl> => {
  const response = await axios.get(`${API_BASE_URL}/pnl`);
  return response.data;
};

import { SetDhanTokenDto, PlaceOrderDto, ModifyOrderDto } from './dhan.interfaces';

export const getOpenPositions = async (symbol?: string): Promise<Position[]> => {
  const response = await axios.get(`${API_BASE_URL}/positions`, { params: { symbol } });
  return response.data;
};

export const setDhanAccessToken = async (data: SetDhanTokenDto): Promise<any> => {
  const response = await axios.post(`${API_BASE_URL}/dhan/set-token`, data);
  return response.data;
};

export const placeOrder = async (data: PlaceOrderDto): Promise<any> => {
  const response = await axios.post(`${API_BASE_URL}/dhan/orders`, data);
  return response.data;
};

export const modifyOrder = async (id: string, data: ModifyOrderDto): Promise<any> => {
  const response = await axios.patch(`${API_BASE_URL}/dhan/orders/${id}`, data);
  return response.data;
};

export const cancelOrder = async (id: string): Promise<any> => {
  const response = await axios.delete(`${API_BASE_URL}/dhan/orders/${id}`);
  return response.data;
};
