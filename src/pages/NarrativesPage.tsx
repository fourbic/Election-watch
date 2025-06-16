import React, { useState } from 'react';

interface Narrative {
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

interface NarrativeDetailsProps {
  narrative: Narrative;
  onClose: () => void;
}

const NarrativeDetails: React.FC<NarrativeDetailsProps> = ({ narrative, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium text-gray-900">{narrative.title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Close</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mt-4 space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Description</h4>
            <p className="mt-1 text-sm text-gray-900">{narrative.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Category</h4>
              <p className="mt-1 text-sm text-gray-900">{narrative.category}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Region</h4>
              <p className="mt-1 text-sm text-gray-900">{narrative.region}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">First Detected</h4>
              <p className="mt-1 text-sm text-gray-900">
                {new Date(narrative.firstDetected).toLocaleDateString()}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Last Updated</h4>
              <p className="mt-1 text-sm text-gray-900">
                {new Date(narrative.lastUpdated).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500">Keywords</h4>
            <div className="mt-1 flex flex-wrap gap-2">
              {narrative.keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-100 text-blue-800"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500">Hashtags</h4>
            <div className="mt-1 flex flex-wrap gap-2">
              {narrative.hashtags.map((hashtag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800"
                >
                  {hashtag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NarrativesPage: React.FC = () => {
  const [selectedNarrative, setSelectedNarrative] = useState<Narrative | null>(null);
  const [filterView, setFilterView] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Mock data for narratives
  const narratives: Narrative[] = [
    {
      id: 1,
      title: "Vote Rigging in Lagos",
      category: "VOTE_RIGGING",
      confidence: 0.89,
      contentCount: 342,
      firstDetected: "2023-05-15T14:30:00Z",
      lastUpdated: "2023-05-16T08:45:00Z",
      keywords: ["rigging", "vote stuffing", "ballot box", "lagos"],
      hashtags: ["#LagosDecides", "#RiggedElection2023", "#VoterFraud"],
      description: "Reports of systematic vote rigging attempts in various polling units across Lagos State.",
      status: "ACTIVE",
      actor_ids: [1, 2, 3],
      region: "Lagos",
      trend: "RISING",
      impact: "HIGH"
    },
    // Add more mock narratives here
  ];

  const filteredNarratives = narratives.filter(narrative => {
    if (filterView !== 'all' && narrative.status.toLowerCase() !== filterView) {
      return false;
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        narrative.title.toLowerCase().includes(query) ||
        narrative.keywords.some(k => k.toLowerCase().includes(query)) ||
        narrative.hashtags.some(h => h.toLowerCase().includes(query))
      );
    }
    return true;
  });

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Narratives</h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Filters and Search */}
        <div className="mt-4 flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
          <div className="flex space-x-3">
            <button
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                filterView === 'all'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setFilterView('all')}
            >
              All
            </button>
            <button
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                filterView === 'active'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setFilterView('active')}
            >
              Active
            </button>
            <button
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                filterView === 'archived'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setFilterView('archived')}
            >
              Archived
            </button>
          </div>

          <div className="w-full sm:w-64">
            <input
              type="text"
              placeholder="Search narratives..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Narratives Grid */}
        <div className="mt-8 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredNarratives.map((narrative) => (
            <div
              key={narrative.id}
              className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200 cursor-pointer hover:shadow-md transition-shadow duration-200"
              onClick={() => setSelectedNarrative(narrative)}
            >
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900 truncate">
                    {narrative.title}
                  </h3>
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      narrative.status === 'ACTIVE'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {narrative.status}
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Confidence</p>
                    <p className="mt-1 text-sm text-gray-900">
                      {Math.round(narrative.confidence * 100)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Content Count</p>
                    <p className="mt-1 text-sm text-gray-900">{narrative.contentCount}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {narrative.keywords.slice(0, 3).map((keyword, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Narrative Details Modal */}
      {selectedNarrative && (
        <NarrativeDetails
          narrative={selectedNarrative}
          onClose={() => setSelectedNarrative(null)}
        />
      )}
    </div>
  );
};

export default NarrativesPage;
