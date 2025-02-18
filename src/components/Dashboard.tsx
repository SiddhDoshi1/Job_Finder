import React, { useState, useRef, useEffect } from 'react';
import { Upload, Briefcase, BookmarkCheck, Bell, Search } from 'lucide-react';
import ResumeUpload from './ResumeUpload';
import JobList from './JobList';
import SavedJobs from './SavedJobs';
import Notifications from './Notifications';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('jobs');
  const [showNotifications, setShowNotifications] = useState(false);
  const [jobList, setJobList] = useState<any[]>([]); // Add state for job list
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleJobListUpdate = (newJobs: any[]) => {
    console.log(newJobs)
    if (Array.isArray(newJobs)) {
      setJobList(newJobs); // ✅ Update job list correctly
    } else {
      console.error("Received invalid job list:", newJobs);
      setJobList([]); // ✅ Fallback to an empty array
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Briefcase className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">JobMatch AI</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative" ref={notificationRef}>
                <button 
                  className={`p-2 rounded-full hover:bg-gray-100 ${showNotifications ? 'bg-gray-100' : ''}`}
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <Bell className="h-6 w-6 text-gray-600" />
                  <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-600 ring-2 ring-white" />
                </button>
                
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Notifications</h3>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">New job match found!</p>
                            <p className="text-xs text-gray-500 mt-1">A new Senior Developer position matches your profile</p>
                            <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                          </div>
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                        </div>
                        <div className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">Application viewed</p>
                            <p className="text-xs text-gray-500 mt-1">TechCorp Inc. viewed your application</p>
                            <p className="text-xs text-gray-400 mt-1">1 day ago</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 pt-3 border-t">
                        <button 
                          className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                          onClick={() => setActiveTab('notifications')}
                        >
                          View all notifications
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="relative">
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="User avatar"
                />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-3">
            <div className="bg-white rounded-lg shadow">
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('jobs')}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium ${
                    activeTab === 'jobs'
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Search className="h-5 w-5 mr-3" />
                  Find Jobs
                </button>
                <button
                  onClick={() => setActiveTab('resume')}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium ${
                    activeTab === 'resume'
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Upload className="h-5 w-5 mr-3" />
                  Resume Upload
                </button>
                {/* <button
                  onClick={() => setActiveTab('saved')}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium ${
                    activeTab === 'saved'
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <BookmarkCheck className="h-5 w-5 mr-3" />
                  Saved Jobs
                </button> */}
              </nav>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-9">
            {activeTab === 'jobs' && <JobList jobList={jobList} />} {/* Pass job list to JobList */}
            {/* {activeTab === 'saved' && <SavedJobs />} */}
            {activeTab === 'resume' && <ResumeUpload onJobListUpdate={handleJobListUpdate} />}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;