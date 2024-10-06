
import {
  ClerkProvider
} from '@clerk/nextjs'
import './globals.css'
import PageHeader from '@/components/page-header';
import MyWidget from '@/components/feedback';

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
          <MyWidget/>
        </body>
      </html>
    </ClerkProvider>
  )
}