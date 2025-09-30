import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { type ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo and App Name */}
          <Link href="/dashboard" className="flex items-center space-x-2">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">U</span>
            </div>
            <span className="text-xl font-bold text-gray-900">UniQuest Dashboard</span>
          </Link>

          {/* User Profile Button */}
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
}
