import type { Metadata } from 'next';
import { Fredoka, Nunito } from 'next/font/google';
import './globals.css';
import { AppContextProvider } from '@/context/AppContext';
import { GameCompleteModal } from '@/components/GameCompleteModal';

const fredoka = Fredoka({
  variable: '--font-fredoka',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
});

const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800']
});

export const metadata: Metadata = {
  title: 'ChotaPlay — Interactive Early-Learning Platform',
  description: 'Teacher-led interactive early-learning platform for LKG, UKG, 1st Class and Explore topics.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fredoka.variable} ${nunito.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#EAF6FC] text-[#1B5E7A] font-nunito">
        <AppContextProvider>
          {children}
          <GameCompleteModal />
        </AppContextProvider>
      </body>
    </html>
  );
}
