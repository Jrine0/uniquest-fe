import { type Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';

export const metadata: Metadata = {
  title: 'EduMitra: Your Smart Campus Assistant',
  description: 'Your 24/7 AI-powered campus support for admissions, fees, and more.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          // This removes the default Clerk header from the sign-in modal
          header: {
            display: 'none',
          },
        },
      }}
    >
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
