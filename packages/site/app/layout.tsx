import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'SuprForm - React Forms Library Built on React Hook Form | Best Formik Alternative | TypeScript-First',
  description:
    'SuprForm is a lightweight, TypeScript-first React forms library built on top of react-hook-form. Works with any UI framework. Better alternative to Formik with zero UI dependencies. Build dynamic, validated forms with conditional visibility and async validation.',
  keywords: [
    'react forms',
    'react form library',
    'react-hook-form',
    'built on react-hook-form',
    'react-hook-form wrapper',
    'react-hook-form alternative',
    'formik alternative',
    'formik',
    'form validation',
    'typescript forms',
    'headless forms',
    'dynamic forms',
    'form builder',
    'react form validation',
    'controlled forms',
    'form library',
    'form control',
    'suprform',
    'best react form library',
    'lightweight form library',
  ],
  authors: [{ name: 'SuprForm Team' }],
  metadataBase: new URL('https://suprform.com'),
  alternates: {
    canonical: 'https://suprform.com',
  },
  openGraph: {
    title: 'SuprForm - React Forms Library: Best Alternative to React Hook Form & Formik',
    description:
      'A lightweight, TypeScript-first React form library built on react-hook-form. Design-system agnostic. Works with any UI framework. Better than Formik alternative.',
    type: 'website',
    siteName: 'SuprForm',
    url: 'https://suprform.com',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SuprForm - React Forms Library',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SuprForm - React Forms Library: Alternative to React Hook Form & Formik',
    description:
      'TypeScript-first React form library built on react-hook-form with zero UI dependencies. Works with Material-UI, Ant Design, Tailwind, shadcn/ui, and plain HTML.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
        <link
          href='https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap'
          rel='stylesheet'
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
