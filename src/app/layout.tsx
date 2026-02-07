import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
    themeColor: '#ffffff',
    width: 'device-width',
    initialScale: 1,
};

export const metadata: Metadata = {
    title: 'User Dashboard',

    description:
        'High-performance hierarchical data grid built with Next.js, TypeScript, and Tailwind CSS. Features recursive tree rendering, sorting, and advanced filtering.',

    keywords: [
        'Next.js',
        'React',
        'TypeScript',
        'Tailwind CSS',
        'Tree Table',
        'Data Grid',
        'Recursive UI',
    ],

    authors: [{ name: 'Nail Abdullin', url: 'https://github.com/shinokamix' }],

    openGraph: {
        title: 'User Dashboard',
        description: 'Hierarchical user management system with real-time filtering and sorting.',
        type: 'website',
        locale: 'en_US',
    },

    icons: {
        icon: '/favicon.ico',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased">{children}</body>
        </html>
    );
}
