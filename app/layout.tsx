import { ThemeProvider } from '@/providers/theme-provider';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SchemaViz: JSON & SQL Data Structure Visualizer and Formatter',
  description: 'SchemaViz is a powerful tool for visualizing, formatting, and previewing JSON and SQL data structures. Easily transform and preview complex data to ensure accuracy and clarity in your projects.',
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/schemaviz.png", type: "image/png", sizes: "32x32" }],
    apple: [{ url: "/schemaviz.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >

        {children}
          </ThemeProvider>
        </body>
    </html>
  );
}
