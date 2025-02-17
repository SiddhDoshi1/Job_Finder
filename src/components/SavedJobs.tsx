import React from 'react';
import { Bookmark, MapPin, Building, DollarSign, Clock } from 'lucide-react';

const SavedJobs: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Saved Jobs</h2>
        <div className="flex items-center text-gray-600">
          <Bookmark className="h-5 w-5 mr-2" />
          <span>2 jobs saved</span>
        </div>
      </div>

      <div className="space-y-6">
        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Senior Full Stack Developer</h3>
              <div className="mt-2 space-y-2">
                <div className="flex items-center text-gray-600">
                  <Building className="h-4 w-4 mr-2" />
                  TechCorp Inc.
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  San Francisco, CA
                </div>
                <div className="flex items-center text-gray-600">
                  <DollarSign className="h-4 w-4 mr-2" />
                  $120k - $180k
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <span className="flex items-center text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                Saved 2d ago
              </span>
            </div>
          </div>
          <div className="mt-4 flex justify-end space-x-3">
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Remove
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedJobs;