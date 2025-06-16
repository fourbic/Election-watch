import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Report } from '../utils/types';
import api from '../utils/api';

interface ReportListProps {
  reports: Report[];
  onView: (report: Report) => void;
  onExport: (report: Report) => void;
  onDelete: (reportId: number) => void;
}

interface ReportFilterState {
  type: string;
  dateRange: {
    start: string;
    end: string;
  };
  status: string;
  searchQuery: string;
}

// Report list component
const ReportList: React.FC<ReportListProps> = ({ reports, onView, onExport, onDelete }) => {
  return (
    <div className="bg-white shadow overflow-hidden rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Generated Reports</h3>
        <p className="mt-1 text-sm text-gray-500">
          View, export, or delete previously generated reports
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Generated On
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reports.map((report) => (
              <tr key={report.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{report.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{report.type}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {new Date(report.dateGenerated).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    report.status === 'PUBLISHED' ? 'bg-green-100 text-green-800' :
                    report.status === 'DRAFT' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {report.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => onView(report)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    View
                  </button>
                  <button
                    onClick={() => onExport(report)}
                    className="text-green-600 hover:text-green-900"
                  >
                    Export
                  </button>
                  <button
                    onClick={() => onDelete(report.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ReportsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState<ReportFilterState>({
    type: searchParams.get('type') || '',
    dateRange: {
      start: searchParams.get('startDate') || '',
      end: searchParams.get('endDate') || ''
    },
    status: searchParams.get('status') || '',
    searchQuery: searchParams.get('q') || ''
  });

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const response = await api.get<Report[]>('/reports', {
          params: {
            type: filters.type,
            startDate: filters.dateRange.start,
            endDate: filters.dateRange.end,
            status: filters.status,
            q: filters.searchQuery
          }
        });

        if (response.success && response.data) {
          setReports(response.data);
        }
      } catch (error) {
        console.error('Error fetching reports:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [filters]);

  const handleView = async (report: Report) => {
    // Implementation for viewing report
    console.log('Viewing report:', report.id);
  };

  const handleExport = async (report: Report) => {
    try {
      const response = await api.get<Blob>(`/reports/${report.id}/export`, {
        // Set response type to blob
      });
      
      if (response.success) {
        // Handle the exported file
        console.log('Report exported successfully');
      }
    } catch (error) {
      console.error('Error exporting report:', error);
    }
  };

  const handleDelete = async (reportId: number) => {
    if (!window.confirm('Are you sure you want to delete this report?')) {
      return;
    }

    try {
      const response = await api.delete(`/reports/${reportId}`);
      if (response.success) {
        setReports(prev => prev.filter(report => report.id !== reportId));
      }
    } catch (error) {
      console.error('Error deleting report:', error);
    }
  };

  const handleFilterChange = (key: keyof ReportFilterState, value: string | { start: string; end: string }) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));

    // Update URL params
    const params = new URLSearchParams(searchParams);
    if (typeof value === 'string') {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    } else if (key === 'dateRange') {
      if (value.start) params.set('startDate', value.start);
      if (value.end) params.set('endDate', value.end);
    }
    setSearchParams(params);
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
        <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>
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
                <option value="NARRATIVE_ANALYSIS">Narrative Analysis</option>
                <option value="ACTOR_ANALYSIS">Actor Analysis</option>
                <option value="TREND_ANALYSIS">Trend Analysis</option>
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
                <option value="PUBLISHED">Published</option>
                <option value="DRAFT">Draft</option>
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
                onChange={(e) => handleFilterChange('dateRange', {
                  ...filters.dateRange,
                  start: e.target.value
                })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Search
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Search reports..."
                value={filters.searchQuery}
                onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Reports List */}
        <div className="mt-4">
          <ReportList
            reports={reports}
            onView={handleView}
            onExport={handleExport}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
