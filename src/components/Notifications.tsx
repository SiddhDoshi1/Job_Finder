import React from 'react';
import { Bell } from 'lucide-react';

const Notifications: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
        <Bell className="h-6 w-6 text-gray-600" />
      </div>

      <div className="space-y-4">
        <div className="flex items-start p-4 bg-indigo-50 rounded-lg">
          <div className="flex-1">
            <p className="font-medium text-gray-900">New job match found!</p>
            <p className="text-sm text-gray-600 mt-1">
              A new Senior Developer position at TechCorp matches your profile.
            </p>
            <p className="text-xs text-gray-500 mt-2">2 hours ago</p>
          </div>
        </div>

        <div className="flex items-start p-4 border rounded-lg">
          <div className="flex-1">
            <p className="font-medium text-gray-900">Application viewed</p>
            <p className="text-sm text-gray-600 mt-1">
              AI Solutions Ltd has viewed your application.
            </p>
            <p className="text-xs text-gray-500 mt-2">1 day ago</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;