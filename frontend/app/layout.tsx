import './globals.css'
import Providers from './providers'

export const metadata = {
  title: 'Office Space Calculator',
  description: 'Professional workspace planning tool',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

