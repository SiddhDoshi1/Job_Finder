import React, { useState, useEffect } from 'react';
import { Upload, FileText, CheckCircle, XCircle } from 'lucide-react';

interface ResumeUploadProps {
  onJobListUpdate: (jobs: any[]) => void;
}

const ResumeUpload: React.FC<ResumeUploadProps> = ({ onJobListUpdate }) => {
  const [file, setFile] = useState<File | null>(null);
  const [skills, setSkills] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem('extractedSkills') || '[]');
  });
  const [extracting, setExtracting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('extractedSkills', JSON.stringify(skills));
  }, [skills]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      setFile(files[0]);
      setExtracting(true);
      setError(null);
  
      const formData = new FormData();
      formData.append('resume', files[0]);
  
      try {
        const response = await fetch('https://job-finder-delta-mocha.vercel.app/upload', {
          method: 'POST',
          body: formData,
        });
  
        const data = await response.json();
        if (response.ok) {
          setSkills(data.skills);
          // console.log(data.job_list)
          const jobListArray = data.job_list.hits;
          onJobListUpdate(jobListArray);
        } else {
          setError(data.error || 'Failed to extract skills');
        }
      } catch (err) {
        setError('Failed to upload file');
        console.error(err);
      } finally {
        setExtracting(false);
      }
    }
  };  

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Upload Your Resume</h2>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        {!file ? (
          <>
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4">
              <label htmlFor="file-upload" className="cursor-pointer">
                <span className="mt-2 block text-sm font-medium text-gray-600">
                  Drop your resume here, or{' '}
                  <span className="text-indigo-600 hover:text-indigo-500">browse</span>
                </span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                />
              </label>
              <p className="mt-1 text-xs text-gray-500">PDF, DOC up to 10MB</p>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <FileText className="mx-auto h-12 w-12 text-indigo-600" />
            <p className="text-sm font-medium text-gray-900">{file.name}</p>
            {extracting ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600"></div>
                <span className="text-sm text-gray-600">Extracting information...</span>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center space-x-2 text-red-600">
                <XCircle className="h-5 w-5" />
                <span className="text-sm">{error}</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm text-gray-600">Processing complete</span>
              </div>
            )}
          </div>
        )}
      </div>

      {skills.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Extracted Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;
