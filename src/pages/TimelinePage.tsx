import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../utils/api';

interface TimelineEvent {
  id: number;
  type: 'NARRATIVE' | 'ACTOR' | 'ALERT' | 'REPORT';
  title: string;
  description: string;
  timestamp: string;
  category: string;
  importance: 'HIGH' | 'MEDIUM' | 'LOW';
  source: string;
  relatedIds: number[];
  region: string;
}

interface TimelineVisualizationProps {
  data: TimelineEvent[];
  loading: boolean;
}

interface FilterState {
  startDate: string;
  endDate: string;
  eventTypes: string[];
  importance: string[];
  regions: string[];
}

// Timeline visualization component
const TimelineVisualization: React.FC<TimelineVisualizationProps> = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center bg-gray-50 rounded-lg">
        <div className="animate-pulse text-gray-400">Loading timeline data...</div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="h-96 flex items-center justify-center bg-gray-50 rounded-lg">
        <div className="text-gray-400">No timeline data available for the selected filters</div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-4">
        {data.map((event) => (
          <div
            key={event.id}
            className="relative pb-8"
          >
            <div className="relative flex items-start space-x-3">
              {/* Timeline line */}
              <div className="relative">
                <div className="h-full w-0.5 bg-gray-200 absolute left-2"></div>
                <div
                  className={`relative h-4 w-4 rounded-full border-2 ${
                    event.importance === 'HIGH'
                      ? 'bg-red-500 border-red-500'
                      : event.importance === 'MEDIUM'
                      ? 'bg-yellow-500 border-yellow-500'
                      : 'bg-blue-500 border-blue-500'
                  }`}
                ></div>
              </div>
              
              {/* Event content */}
              <div className="min-w-0 flex-1">
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {event.title}
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    {new Date(event.timestamp).toLocaleString()}
                  </p>
                </div>
                <div className="mt-2 text-sm text-gray-700">
                  <p>{event.description}</p>
                </div>
                <div className="mt-2">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      event.type === 'NARRATIVE'
                        ? 'bg-blue-100 text-blue-800'
                        : event.type === 'ACTOR'
                        ? 'bg-green-100 text-green-800'
                        : event.type === 'ALERT'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}
                  >
                    {event.type}
                  </span>
                  <span className="ml-2 text-xs text-gray-500">{event.region}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TimelinePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    startDate: searchParams.get('startDate') || '',
    endDate: searchParams.get('endDate') || '',
    eventTypes: searchParams.getAll('type') || [],
    importance: searchParams.getAll('importance') || [],
    regions: searchParams.getAll('region') || []
  });

  useEffect(() => {
    const fetchTimelineData = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call with filters
        // For now, using mock data
        const mockData: TimelineEvent[] = [
          {
            id: 1,
            type: 'NARRATIVE',
            title: 'New Election Fraud Narrative Detected',
            description: 'A new narrative about potential election fraud has emerged in social media discussions.',
            timestamp: new Date().toISOString(),
            category: 'ELECTION_INTEGRITY',
            importance: 'HIGH',
            source: 'Social Media Monitoring',
            relatedIds: [1, 2],
            region: 'Lagos'
          },
          {
            id: 2,
            type: 'ACTOR',
            title: 'New Influential Actor Identified',
            description: 'A new influential actor has been identified spreading election-related narratives.',
            timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
            category: 'ACTOR_TRACKING',
            importance: 'MEDIUM',
            source: 'Manual Analysis',
            relatedIds: [1],
            region: 'Abuja'
          },
          // Add more mock events as needed
        ];

        setEvents(mockData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching timeline data:', error);
        setLoading(false);
      }
    };

    fetchTimelineData();
  }, [filters]);

  const handleFilterChange = (filterType: keyof FilterState, value: string | string[]) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);

    // Update URL params
    const params = new URLSearchParams();
    if (newFilters.startDate) params.append('startDate', newFilters.startDate);
    if (newFilters.endDate) params.append('endDate', newFilters.endDate);
    newFilters.eventTypes.forEach(type => params.append('type', type));
    newFilters.importance.forEach(imp => params.append('importance', imp));
    newFilters.regions.forEach(region => params.append('region', region));

    setSearchParams(params);
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Timeline</h1>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Filters */}
        <div className="mt-4 bg-white shadow rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                value={filters.startDate}
                onChange={(e) => handleFilterChange('startDate', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                value={filters.endDate}
                onChange={(e) => handleFilterChange('endDate', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Timeline Visualization */}
        <div className="mt-4">
          <TimelineVisualization data={events} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default TimelinePage;
