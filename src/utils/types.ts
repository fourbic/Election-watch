export interface RequestOptions extends RequestInit {
  timeout?: number;
  params?: Record<string, string | number | boolean>;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  organization: string;
  role: string;
  regions: string[];
  isActive: boolean;
  lastLogin: string;
}

export interface Narrative {
  id: number;
  title: string;
  category: string;
  confidence: number;
  contentCount: number;
  firstDetected: string;
  lastUpdated: string;
  keywords: string[];
  hashtags: string[];
  description: string;
  status: 'ACTIVE' | 'INACTIVE' | 'ARCHIVED';
  actor_ids: number[];
  region: string;
  trend: 'RISING' | 'FALLING' | 'STABLE';
  impact: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface Actor {
  id: number;
  name: string;
  type: string;
  influence: number;
  platform: string;
  followers: number;
  narratives: number[];
  status: 'ACTIVE' | 'INACTIVE' | 'WATCH';
  firstSeen: string;
  lastActive: string;
  region: string;
}

export interface Alert {
  id: number;
  title: string;
  type: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  timestamp: string;
  source: string;
  narrative_id?: number;
  actor_id?: number;
  status: 'NEW' | 'INVESTIGATING' | 'RESOLVED' | 'DISMISSED';
  region: string;
}

export interface Report {
  id: number;
  title: string;
  type: string;
  dateGenerated: string;
  author: string;
  status: string;
  narratives: number[];
  actors: number[];
  timespan: {
    start: string;
    end: string;
  };
  region: string;
}
