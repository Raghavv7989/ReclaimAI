'use client';

import { useState, useEffect } from 'react';
import { 
  mockUser, 
  mockNotifications, 
  mockItems, 
  mockMatches, 
  mockDashboardStats, 
  mockAdminAnalytics 
} from '../data';
import { UserDTO, NotificationDTO, ItemDTO, MatchDTO, DashboardStatsDTO, AdminAnalyticsDTO } from '../types';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export function useMockUser() {
  const [data, setData] = useState<UserDTO | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    delay(500).then(() => {
      if (mounted) {
        setData(mockUser);
        setIsLoading(false);
      }
    });
    return () => { mounted = false; };
  }, []);

  return { data, isLoading };
}

export function useMockNotifications() {
  const [data, setData] = useState<NotificationDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    delay(800).then(() => {
      if (mounted) {
        setData(mockNotifications);
        setIsLoading(false);
      }
    });
    return () => { mounted = false; };
  }, []);

  return { data, setData, isLoading };
}

export function useMockItems() {
  const [data, setData] = useState<ItemDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    delay(1000).then(() => {
      if (mounted) {
        setData(mockItems);
        setIsLoading(false);
      }
    });
    return () => { mounted = false; };
  }, []);

  return { data, setData, isLoading };
}

export function useMockMatches() {
  const [data, setData] = useState<MatchDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    delay(1200).then(() => {
      if (mounted) {
        setData(mockMatches);
        setIsLoading(false);
      }
    });
    return () => { mounted = false; };
  }, []);

  return { data, setData, isLoading };
}

export function useMockDashboardStats() {
  const [data, setData] = useState<DashboardStatsDTO | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    delay(600).then(() => {
      if (mounted) {
        setData(mockDashboardStats);
        setIsLoading(false);
      }
    });
    return () => { mounted = false; };
  }, []);

  return { data, isLoading };
}

export function useMockAdminAnalytics() {
  const [data, setData] = useState<AdminAnalyticsDTO | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    delay(1000).then(() => {
      if (mounted) {
        setData(mockAdminAnalytics);
        setIsLoading(false);
      }
    });
    return () => { mounted = false; };
  }, []);

  return { data, isLoading };
}
