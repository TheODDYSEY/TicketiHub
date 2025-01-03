import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

import Footer from '@/components/shared/Footer'
import Header from '@/components/shared/Header'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'TicketiHub',
  description: 'TicketiHub is a platform for event management.',
  icons: {
    icon: '/assets/images/logo3.svg',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex h-screen flex-col'>
        <Header/>
        <main className='flex-1'>{children}</main>
        <Footer/>
    </div>  
      
  )
}