import React, { useState, useEffect } from 'react';
import { Actor } from '../utils/types';
import api from '../utils/api';

interface ActorCardProps {
  actor: Actor;
  onSelect: (actor: Actor) => void;
}

const ActorCard: React.FC<ActorCardProps> = ({ actor, onSelect }) => {
  const influenceColor = actor.influence > 75 ? 'text-red-600' :
                        actor.influence > 50 ? 'text-yellow-600' :
                        'text-green-600';

  return (
    <div 
      className="bg-white rounded-lg shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => onSelect(actor)}
    >
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-medium text-gray-900">{actor.name}</h3>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          actor.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
          actor.status === 'WATCH' ? 'bg-yellow-100 text-yellow-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {actor.status}
        </span>
      </div>
      
      <div className="mt-2 grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Type</p>
          <p className="text-sm font-medium text-gray-900">{actor.type}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Platform</p>
          <p className="text-sm font-medium text-gray-900">{actor.platform}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Influence Score</p>
          <p className={`text-sm font-medium ${influenceColor}`}>{actor.influence}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Followers</p>
          <p className="text-sm font-medium text-gray-900">{actor.followers.toLocaleString()}</p>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-500">Last Active</p>
        <p className="text-sm text-gray-900">
          {new Date(actor.lastActive).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

const ActorsPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [actors, setActors] = useState<Actor[]>([]);
  const [selectedActor, setSelectedActor] = useState<Actor | null>(null);
  const [filters, setFilters] = useState({
    type: '',
    status: '',
    influence: '',
    searchQuery: ''
  });

  useEffect(() => {
    const fetchActors = async () => {
      try {
        setIsLoading(true);
        const response = await api.get<Actor[]>('/actors', {
          params: filters
        });

        if (response.success && response.data) {
          setActors(response.data);
        }
      } catch (error) {
        console.error('Error fetching actors:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActors();
  }, [filters]);

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Actors</h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Filters */}
        <div className="mt-4 bg-white shadow rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Type
              </label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
              >
                <option value="">All Types</option>
                <option value="ORGANIZATION">Organization</option>
                <option value="INDIVIDUAL">Individual</option>
                <option value="NETWORK">Network</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="">All Status</option>
                <option value="ACTIVE">Active</option>
                <option value="WATCH">Watch</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Influence
              </label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={filters.influence}
                onChange={(e) => handleFilterChange('influence', e.target.value)}
              >
                <option value="">All Levels</option>
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Search
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Search actors..."
                value={filters.searchQuery}
                onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Actors Grid */}
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {actors.map((actor) => (
            <ActorCard
              key={actor.id}
              actor={actor}
              onSelect={setSelectedActor}
            />
          ))}
        </div>

        {/* Selected Actor Modal */}
        {selectedActor && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div>
                    <div className="mt-3 text-center sm:mt-5">
                      <h3 className="text-lg font-medium leading-6 text-gray-900">
                        {selectedActor.name}
                      </h3>
                      <div className="mt-4">
                        {/* Actor details here */}
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                      onClick={() => setSelectedActor(null)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActorsPage;
