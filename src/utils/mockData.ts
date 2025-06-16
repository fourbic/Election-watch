/**
 * Mock data for Dexter platform
 * Used for development and testing before backend integration
 */

import { Narrative, Actor, Alert, Report } from './types';

interface DashboardStats {
  title: string;
  value: string;
  color: string;
  icon: string;
}

interface MockData {
  narratives: Narrative[];
  actors: Actor[];
  alerts: Alert[];
  reports: Report[];
  dashboardStats: DashboardStats[];
}

const mockData: MockData = {
  narratives: [
    {
      id: 1,
      title: "Vote Rigging Claims in Lagos",
      category: "ELECTION_INTEGRITY",
      confidence: 0.89,
      contentCount: 342,
      firstDetected: "2025-05-15T14:30:00Z",
      lastUpdated: "2025-05-16T08:45:00Z",
      keywords: ["rigging", "vote stuffing", "ballot box", "lagos"],
      hashtags: ["#LagosDecides", "#Election2025", "#VoterFraud"],
      description: "Reports of systematic vote rigging attempts in various polling units across Lagos State.",
      status: "ACTIVE",
      actor_ids: [1, 2, 3],
      region: "Lagos",
      trend: "RISING",
      impact: "HIGH"
    },
    {
      id: 2,
      title: "Voter Intimidation Reports",
      category: "VOTER_SUPPRESSION",
      confidence: 0.76,
      contentCount: 156,
      firstDetected: "2025-05-14T09:15:00Z",
      lastUpdated: "2025-05-15T16:30:00Z",
      keywords: ["intimidation", "threats", "polling units", "violence"],
      hashtags: ["#VoterSuppression", "#ElectionViolence", "#NigeriaDecides"],
      description: "Multiple reports of voter intimidation tactics being employed at polling stations.",
      status: "ACTIVE",
      actor_ids: [4, 5],
      region: "Abuja",
      trend: "STABLE",
      impact: "MEDIUM"
    }
  ],
  
  actors: [
    {
      id: 1,
      name: "Political Organization A",
      type: "ORGANIZATION",
      influence: 85,
      platform: "Twitter",
      followers: 50000,
      narratives: [1, 2],
      status: "ACTIVE",
      firstSeen: "2025-01-15T00:00:00Z",
      lastActive: "2025-05-16T12:30:00Z",
      region: "Lagos"
    },
    {
      id: 2,
      name: "Influencer Network B",
      type: "NETWORK",
      influence: 72,
      platform: "Facebook",
      followers: 35000,
      narratives: [1],
      status: "WATCH",
      firstSeen: "2025-02-01T00:00:00Z",
      lastActive: "2025-05-16T10:15:00Z",
      region: "Abuja"
    }
  ],
  
  alerts: [
    {
      id: 1,
      title: "Sudden spike in vote rigging narrative",
      type: "NARRATIVE_SURGE",
      severity: "HIGH",
      timestamp: "2025-05-16T08:30:00Z",
      source: "Social Media Monitor",
      narrative_id: 1,
      status: "NEW",
      region: "Lagos"
    },
    {
      id: 2,
      title: "New influential actor detected",
      type: "ACTOR_DETECTED",
      severity: "MEDIUM",
      timestamp: "2025-05-15T14:45:00Z",
      source: "Network Analysis",
      actor_id: 2,
      status: "INVESTIGATING",
      region: "Abuja"
    }
  ],
  
  reports: [
    {
      id: 1,
      title: "Weekly Narrative Analysis Report",
      type: "NARRATIVE_ANALYSIS",
      dateGenerated: "2025-05-16T00:00:00Z",
      author: "System",
      status: "PUBLISHED",
      narratives: [1, 2],
      actors: [1, 2],
      timespan: {
        start: "2025-05-09T00:00:00Z",
        end: "2025-05-16T00:00:00Z"
      },
      region: "National"
    },
    {
      id: 2,
      title: "Actor Network Analysis",
      type: "ACTOR_ANALYSIS",
      dateGenerated: "2025-05-15T00:00:00Z",
      author: "System",
      status: "DRAFT",
      narratives: [1],
      actors: [1, 2],
      timespan: {
        start: "2025-05-01T00:00:00Z",
        end: "2025-05-15T00:00:00Z"
      },
      region: "Lagos"
    }
  ],
  
  dashboardStats: [
    {
      title: "Active Narratives",
      value: "28",
      color: "bg-blue-100 text-blue-600",
      icon: "narratives"
    },
    {
      title: "Flagged Actors",
      value: "47",
      color: "bg-red-100 text-red-600",
      icon: "actors"
    },
    {
      title: "Open Alerts",
      value: "12",
      color: "bg-yellow-100 text-yellow-600",
      icon: "alerts"
    },
    {
      title: "Generated Reports",
      value: "89",
      color: "bg-green-100 text-green-600",
      icon: "reports"
    }
  ]
};

export default mockData;
