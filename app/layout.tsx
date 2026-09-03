import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://hirmay.github.io'),
  title: 'Hirmay Sandesara | Quantum Computing & Tensor Networks',
  description:
    'Hirmay Sandesara is a Computational Science and Engineering student at TUM working on tensor-network algorithms for fermionic quantum systems and seeking PhD positions for Fall 2027.',
  authors: [{ name: 'Hirmay Sandesara' }],
  keywords: [
    'Hirmay Sandesara',
    'tensor networks',
    'matrix product states',
    'quantum many-body physics',
    'quantum computing',
    'fermionic systems',
  ],
  openGraph: {
    title: 'Hirmay Sandesara | Quantum Computing & Tensor Networks',
    description:
      'Numerical methods for quantum many-body systems, with a focus on tensor networks, fermionic dynamics, and PhD opportunities for Fall 2027.',
    type: 'website',
    url: 'https://hirmay.github.io',
    images: [
      {
        url: '/og.png',
        width: 1731,
        height: 909,
        alt: 'Hirmay Sandesara — Tensor networks and quantum many-body systems',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hirmay Sandesara | Quantum Computing & Tensor Networks',
    description:
      'Numerical methods for quantum many-body systems, with a focus on tensor networks, fermionic dynamics, and PhD opportunities for Fall 2027.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
