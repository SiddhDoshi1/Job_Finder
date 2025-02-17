import React from 'react';
import { MapPin, Building, Clock } from 'lucide-react';

// Mock job results data (replace this with your actual import or fetch logic)
const jobResults = {
  count: 15,
  hits: [
    {
      company_name: "Podtech IO",
      formatted_relative_time: "Just posted",
      id: "26d15523b840572e",
      link: "/job/26d15523b840572e?locality=in",
      locality: "in",
      location: "Gurugram, Haryana",
      pub_date_ts_milli: 1739167200000,
      salary: {},
      title: "SQL Database Administrator"
    },
  ],
  indeed_final_url: "https://in.indeed.com" // Use the base domain here
};

interface JobListProps {
  jobList: any[];
}

const JobList: React.FC<JobListProps> = ({ jobList }) => {
  // Use the base domain from jobResults.indeed_final_url
  const baseUrl = jobResults.indeed_final_url;

  return (
    <div className="space-y-6">
      {Array.isArray(jobList) && jobList.length > 0 ? (
        jobList.map((job) => (
          <div key={job.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                <div className="mt-2 space-y-2">
                  {/* Company Name */}
                  <div className="flex items-center text-gray-600">
                    <Building className="h-4 w-4 mr-2" />
                    {job.company_name}
                  </div>
                  {/* Job Location */}
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {job.location}
                  </div>
                </div>
              </div>
              {/* Posted Time */}
              <span className="flex items-center text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                {job.formatted_relative_time}
              </span>
            </div>

            {/* Apply Button */}
            <div className="mt-4 flex justify-end">
              <a
                href={`${baseUrl}${job.link}`} // Combine baseUrl with the relative job link
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                  Apply Now
                </button>
              </a>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No jobs available</p>
      )}
    </div>
  );
};

export default JobList;
