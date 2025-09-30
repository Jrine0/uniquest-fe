import { auth, currentUser } from "@clerk/nextjs/server";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, FileText, Users, MessageSquare, Ticket } from "lucide-react";

// This file creates the main dashboard page located at the `/dashboard` route.
// It's a server component, which allows it to fetch data directly on the server before rendering.

// STEP 1: Define TypeScript types for the analytics data from your backend.
// In a larger app, you would move these types to a dedicated `lib/types.ts` file.
type AnalyticsOverview = {
  overview: {
    total_documents: number;
    total_users: number;
    total_sessions: number;
    total_tickets: number;
  };
  document_analytics: {
    by_type: { [key: string]: number };
    by_department: { [key: string]: number };
  };
  user_analytics: {
    by_channel: { [key: string]: number };
  };
};

// STEP 2: Create a secure function to fetch data from your backend.
// This function gets the auth token from the user's Clerk session and includes it in the request header.
// In a larger app, this would live in `lib/api-client.ts`.
async function getAnalyticsOverview(): Promise<AnalyticsOverview | null> {
  const { getToken } = auth();
  const token = await getToken();

  // IMPORTANT: Replace this with your actual backend URL.
  // It's best practice to store this in an environment variable (e.g., .env.local).
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://127.0.0.1:8000";

  if (!token) {
    console.error("Authentication token not found. User might be logged out.");
    return null;
  }

  try {
    const response = await fetch(`${backendUrl}/api/v1/admin/analytics/overview`, {
      headers: {
        // The Authorization header is crucial for your backend to verify the user.
        Authorization: `Bearer ${token}`,
      },
      // 'no-store' ensures you always get the latest data on every page load.
      cache: 'no-store',
    });

    if (!response.ok) {
      // Log detailed error for easier debugging.
      const errorBody = await response.text();
      console.error(`Failed to fetch analytics: ${response.status} ${response.statusText}`, errorBody);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("An error occurred while fetching analytics data:", error);
    return null;
  }
}

// STEP 3: Create reusable presentational components for the dashboard UI.

// A simple card to display a single statistic (e.g., "Total Users").
const StatCard = ({ title, value, icon: Icon }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
    </CardContent>
  </Card>
);

// A reusable bar chart component using the 'recharts' library.
const AnalyticsChart = ({ data, title, dataKey = "count" }) => {
    // Recharts expects an array of objects, so we transform the data from `{ key: value }`
    // to `[{ name: key, count: value }]`.
    const chartData = Object.entries(data).map(([name, value]) => ({
        name,
        [dataKey]: value,
    }));

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey={dataKey} fill="#3b82f6" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
};

// STEP 4: The main DashboardPage component.
export default async function DashboardPage() {
  const user = await currentUser();
  const data = await getAnalyticsOverview();

  // If data fetching fails, show a helpful error message.
  if (!data) {
    return (
      <div className="flex h-full items-center justify-center rounded-lg border border-dashed shadow-sm">
         <div className="flex flex-col items-center gap-2 text-center bg-red-50 p-6 rounded-lg">
          <AlertCircle className="h-10 w-10 text-red-500" />
          <h3 className="text-lg font-semibold text-red-700">Failed to Load Dashboard Data</h3>
          <p className="text-sm text-red-600">
            There was a problem connecting to the backend service. Please ensure it's running and try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {user?.firstName || 'User'}!
        </h1>
      </div>
      <p className="text-muted-foreground">
        Here's a high-level overview of your campus assistant's activity.
      </p>

      {/* Grid for the main statistics cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Documents" value={data.overview.total_documents} icon={FileText} />
        <StatCard title="Total Users" value={data.overview.total_users} icon={Users} />
        <StatCard title="Total Sessions" value={data.overview.total_sessions} icon={MessageSquare} />
        <StatCard title="Support Tickets" value={data.overview.total_tickets} icon={Ticket} />
      </div>

      {/* Grid for the analytics charts */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
         <AnalyticsChart data={data.document_analytics.by_department} title="Documents by Department" />
         <AnalyticsChart data={data.document_analytics.by_type} title="Documents by Type" />
      </div>
    </div>
  );
}
