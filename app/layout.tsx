
import {
  ClerkProvider
} from '@clerk/nextjs'
import './globals.css'
import PageHeader from '@/components/page-header';
import FeedbacifyWidget from '@/components/feedback';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <PageHeader />
          {children}
          <FeedbacifyWidget projectId="4" />
        </body>
      </html>
    </ClerkProvider>
  )
}