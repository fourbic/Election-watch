import React, { useState, useEffect } from 'react';

import { Alert } from '../utils/types';
import api from '../utils/api';

interface SeverityBadgeProps {
  severity: Alert['severity'];
}

interface AlertFilterState {
  severity: string[];
  status: string[];
  type: string[];
  dateRange: {
    start: string;
    end: string;
  };
}

// Alert severity badge component
const SeverityBadge: React.FC<SeverityBadgeProps> = ({ severity }) => {
  const severityStyles = {
    HIGH: 'bg-red-100 text-red-800',
    MEDIUM: 'bg-yellow-100 text-yellow-800',
    LOW: 'bg-blue-100 text-blue-800',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${severityStyles[severity]}`}>
      {severity}
    </span>
  );
};

const AlertsPage: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState<AlertFilterState>({
    severity: [],
    status: [],
    type: [],
    dateRange: {
      start: '',
      end: ''
    }
  });

  useEffect(() => {
    const fetchAlerts = async () => {      try {
        setLoading(true);        const params: Record<string, string | number | boolean> = {
          page: 1,
          limit: 20,
          ...(filters.severity.length > 0 && { severity: filters.severity.join(',') }),
          ...(filters.status.length > 0 && { status: filters.status.join(',') }),
          ...(filters.type.length > 0 && { type: filters.type.join(',') }),
          ...(filters.dateRange.start && { 'dateRange.start': filters.dateRange.start }),
          ...(filters.dateRange.end && { 'dateRange.end': filters.dateRange.end })
        };

        const response = await api.get<Alert[]>('/alerts', { params });

        if (response.success && response.data) {
          setAlerts(response.data);
        }
      } catch (error) {
        console.error('Error fetching alerts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, [filters]);
  const handleFilterChange = (
    filterType: keyof AlertFilterState,
    value: string | string[] | { start: string; end: string }
  ) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleAlertAction = async (alertId: number, action: 'investigate' | 'resolve' | 'dismiss') => {
    try {
      const response = await api.patch<Alert>(`/alerts/${alertId}`, {
        status: action === 'investigate' ? 'INVESTIGATING' :
               action === 'resolve' ? 'RESOLVED' :
               'DISMISSED'
      });

      if (response.success && response.data) {
        setAlerts(prev => 
          prev.map(alert => 
            alert.id === alertId ? response.data! : alert
          )
        );
      }
    } catch (error) {
      console.error(`Error updating alert status:`, error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Alerts</h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Filters */}
        <div className="mt-4 bg-white shadow rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Severity
              </label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={filters.severity[0] || ''}
                onChange={(e) => handleFilterChange('severity', [e.target.value])}
              >
                <option value="">All</option>
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={filters.status[0] || ''}
                onChange={(e) => handleFilterChange('status', [e.target.value])}
              >
                <option value="">All</option>
                <option value="NEW">New</option>
                <option value="INVESTIGATING">Investigating</option>
                <option value="RESOLVED">Resolved</option>
                <option value="DISMISSED">Dismissed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date Range
              </label>
              <input
                type="date"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={filters.dateRange.start}
                onChange={(e) => handleFilterChange('dateRange', { ...filters.dateRange, start: e.target.value })}
              />
            </div>

            <div className="flex items-end">
              <button
                className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => setFilters({
                  severity: [],
                  status: [],
                  type: [],
                  dateRange: { start: '', end: '' }
                })}
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* Alerts List */}
        <div className="mt-4">
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {alerts.map((alert) => (
                <li key={alert.id}>
                  <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-indigo-600 truncate">
                          {alert.title}
                        </p>
                        <div className="mt-2 flex">
                          <SeverityBadge severity={alert.severity} />
                          <span className="ml-2 text-sm text-gray-500">
                            {new Date(alert.timestamp).toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {alert.status === 'NEW' && (
                          <button
                            onClick={() => handleAlertAction(alert.id, 'investigate')}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
                          >
                            Investigate
                          </button>
                        )}
                        {alert.status === 'INVESTIGATING' && (
                          <button
                            onClick={() => handleAlertAction(alert.id, 'resolve')}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green active:bg-green-700 transition ease-in-out duration-150"
                          >
                            Resolve
                          </button>
                        )}
                        {(alert.status === 'NEW' || alert.status === 'INVESTIGATING') && (
                          <button
                            onClick={() => handleAlertAction(alert.id, 'dismiss')}
                            className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
                          >
                            Dismiss
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertsPage;
