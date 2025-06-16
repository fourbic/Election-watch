import React, { useState, useEffect } from 'react';

import ErrorBoundary from '../components/common/ErrorBoundary';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

interface TrendChartProps {
  data: Array<{
    date: string;
    value: number;
  }>;
  color: string;
}

interface ActivityLogProps {
  activities: Array<{
    id: string;
    type: string;
    description: string;
    timestamp: string;
    user: string;
  }>;
}

// Dashboard widget components
const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-5">
        <div className="flex items-center">
          <div className={`flex-shrink-0 rounded-md p-3 ${color}`}>
            {icon}
          </div>
          <div className="ml-5">
            <p className="text-sm font-medium text-gray-500 truncate">
              {title}
            </p>
            <p className="mt-1 text-3xl font-semibold text-gray-900">
              {value}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const TrendChart: React.FC<TrendChartProps> = (_props) => {
  // Chart implementation would go here
  return (
    <div className="h-48 bg-white rounded-lg shadow p-4">
      {/* Chart would be rendered here */}
      <div className="text-center text-gray-500">
        Trend visualization would go here
      </div>
    </div>
  );
};

const ActivityLog: React.FC<ActivityLogProps> = ({ activities }) => {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
      </div>
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          {activities.map((activity) => (
            <li key={activity.id} className="px-4 py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {activity.description}
                  </p>
                  <p className="text-sm text-gray-500">
                    {activity.user} • {new Date(activity.timestamp).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState({
    narratives: 0,
    actors: 0,
    alerts: 0,
    reports: 0
  });

  const [activities, setActivities] = useState<ActivityLogProps['activities']>([]);
  const [trendData, setTrendData] = useState<TrendChartProps['data']>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // In a real app, this would be an API call
        // Mocking data for demo purposes
        setStats({
          narratives: 145,
          actors: 67,
          alerts: 23,
          reports: 89
        });

        setActivities([
          {
            id: '1',
            type: 'narrative',
            description: 'New narrative identified: "Election Fraud Claims"',
            timestamp: new Date().toISOString(),
            user: 'John Doe'
          },
          {
            id: '2',
            type: 'actor',
            description: 'Updated actor profile: "Political Group A"',
            timestamp: new Date().toISOString(),
            user: 'Jane Smith'
          },
          // Add more mock activities as needed
        ]);

        setTrendData([
          { date: '2025-01', value: 30 },
          { date: '2025-02', value: 45 },
          { date: '2025-03', value: 55 },
          { date: '2025-04', value: 40 },
          { date: '2025-05', value: 65 },
          { date: '2025-06', value: 75 }
        ]);

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Stats Grid */}
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Active Narratives"
              value={stats.narratives}
              icon={
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              }
              color="bg-indigo-500"
            />
            <StatCard
              title="Tracked Actors"
              value={stats.actors}
              icon={
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              }
              color="bg-purple-500"
            />
            <StatCard
              title="Active Alerts"
              value={stats.alerts}
              icon={
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              }
              color="bg-red-500"
            />
            <StatCard
              title="Generated Reports"
              value={stats.reports}
              icon={
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              }
              color="bg-green-500"
            />
          </div>

          {/* Charts and Activity Log */}
          <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Narrative Trends</h3>
              <TrendChart data={trendData} color="indigo" />
            </div>
            <div>
              <ActivityLog activities={activities} />
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default DashboardPage;
