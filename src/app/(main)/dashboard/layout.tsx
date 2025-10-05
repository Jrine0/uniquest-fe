'use client'

import { UserButton, useUser, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { type ReactNode, useState, useEffect } from "react";
import { Home, FileText, Loader2, Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Define the structure of a document based on your backend
interface Document {
  doc_id: string;
  title: string;
  uploader: string;
  // Add other fields you might want to display
}

// A new component to handle fetching and displaying user documents
function UserDocumentsList() {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      if (!user) {
        // Wait for the user object to be available
        setIsLoading(false);
        return;
      }

      try {
        const token = await getToken();
        // NOTE: This uses the admin endpoint. In a real-world scenario, you would
        // ideally have a dedicated endpoint like `/api/v1/documents?user_id=${user.id}`
        // to fetch documents only for the current user.
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/admin/documents`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          // throw new Error('Failed to fetch documents.');
        }

        const data = await response.json();
        
        // Filter documents to show only those uploaded by the current user
        const userDocs = data.documents.filter((doc: Document) => doc.uploader === user.id);
        setDocuments(userDocs);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocuments();
  }, [user, getToken]);

  return (
    <div className="flex-grow flex flex-col min-h-0">
      <h3 className="px-4 pt-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">My Documents</h3>
      <div className="flex-grow overflow-y-auto mt-2 pr-2">
        {isLoading && (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
          </div>
        )}
        {error && (
          <div className="p-4">
            <Alert variant="destructive">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {error}
              </AlertDescription>
            </Alert>
          </div>
        )}
        {!isLoading && !error && documents.length > 0 && (
          <ul className="space-y-1 px-2">
            {documents.map((doc) => (
              <li key={doc.doc_id}>
                <Link href={`/dashboard/documents/${doc.doc_id}`} className="flex items-center p-2 text-sm text-gray-600 rounded-md hover:bg-gray-100 transition-colors">
                  <FileText className="w-4 h-4 mr-3 flex-shrink-0" />
                  <span className="truncate">{doc.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
        {!isLoading && !error && documents.length === 0 && (
          <p className="px-4 text-sm text-gray-400">You haven't uploaded any documents yet.</p>
        )}
      </div>
    </div>
  );
}

// Skeleton loader to prevent hydration mismatch
function SidebarSkeleton() {
    return (
        <div className="flex-grow flex flex-col px-2 py-4 animate-pulse">
            <div className="px-2 mb-4">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
            </div>
            <div className="border-t border-gray-200 -mx-2"></div>
            <div className="flex-grow flex flex-col min-h-0">
                <h3 className="px-4 pt-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">My Documents</h3>
                <div className="flex items-center justify-center h-full">
                    <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
                </div>
            </div>
        </div>
    );
}


export default function MainLayout({ children }: { children: ReactNode }) {
  const { user, isLoaded } = useUser();

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col">
        {/* Sidebar Header (Logo) */}
        <div className="h-16 flex items-center justify-center px-4 border-b border-gray-200">
           <Link href="/dashboard" className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center">
              <img src="/uniquest.png" alt="UniQuest Logo" className="w-full h-full object-cover rounded-lg" />
            </div>
            <span className="text-2xl font-bold text-gray-900">UniQuest</span>
          </Link>
        </div>
        
        {/* User Details & Document List - Conditionally render based on Clerk's loading state */}
        {!isLoaded ? (
          <SidebarSkeleton />
        ) : (
          <nav className="flex-grow flex flex-col px-2 py-4">
            {user && (
              <div className="px-2 mb-4">
                <p className="text-sm font-semibold text-gray-800">{user.fullName}</p>
                <p className="text-xs text-gray-500 truncate">{user.primaryEmailAddress?.toString()}</p>
              </div>
            )}
            
            <div className="border-t border-gray-200 -mx-2"></div>
            
            <UserDocumentsList />
          </nav>
        )}
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
          <div className="h-16 flex items-center justify-end px-6">
            <div className="flex items-center space-x-5">
              <Link href="/" className="flex items-center text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
                <Home className="w-4 h-4 mr-2" />
                <span>Home</span>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
