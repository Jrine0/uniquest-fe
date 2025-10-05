'use client'

import { useState, type FormEvent } from 'react';
import { useAuth, useUser } from '@clerk/nextjs';
import { UploadCloud, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function IngestPage() {
  const { getToken } = useAuth();
  const { user } = useUser();
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
      setUploadStatus('idle'); // Reset status when a new file is selected
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file || !user) {
      setStatusMessage('Please select a file and ensure you are logged in.');
      setUploadStatus('error');
      return;
    }

    setIsUploading(true);
    setUploadStatus('idle');

    const formData = new FormData();
    formData.append('file', file);
    // These fields are taken from your backend's ingest.py endpoint
    formData.append('title', file.name.replace(/\.pdf$/i, '')); // Use filename as title
    formData.append('dept', 'General'); // Default value
    formData.append('uploader', user.id); // Securely get user ID from Clerk
    formData.append('effective_date', new Date().toISOString());
    formData.append('document_type', 'User Upload'); // Default value
    formData.append('language', 'en'); // Default value

    try {
      const token = await getToken();
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/ingest/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.detail || 'Failed to upload document.');
      }

      setStatusMessage(`Successfully uploaded "${file.name}". Chunks created: ${result.chunks_created}.`);
      setUploadStatus('success');
      setFile(null); // Clear the file input

    } catch (err) {
      setStatusMessage(err instanceof Error ? err.message : 'An unknown error occurred.');
      setUploadStatus('error');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload New Document</h1>
        <p className="text-gray-600 mb-6">Upload a PDF document to add it to your knowledge base.</p>

        <form onSubmit={handleSubmit}>
          <div className="mt-4 border-2 border-dashed border-gray-300 rounded-lg p-10 text-center">
            <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
            <label htmlFor="file-upload" className="mt-4 block text-sm font-medium text-blue-600 hover:text-blue-500 cursor-pointer">
              <span>{file ? 'Replace file' : 'Upload a file'}</span>
              <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".pdf" />
            </label>
            {file && <p className="mt-2 text-sm text-gray-500">{file.name}</p>}
            <p className="mt-1 text-xs text-gray-500">PDF up to 50MB</p>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={!file || isUploading}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Uploading...
                </>
              ) : (
                'Upload Document'
              )}
            </button>
          </div>
        </form>

        {uploadStatus !== 'idle' && (
          <div className="mt-6">
            <Alert variant={uploadStatus === 'error' ? 'destructive' : 'default'}>
              {uploadStatus === 'success' ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
              <AlertTitle>{uploadStatus === 'success' ? 'Success' : 'Error'}</AlertTitle>
              <AlertDescription>
                {statusMessage}
              </AlertDescription>
            </Alert>
          </div>
        )}
      </div>
    </div>
  );
}
