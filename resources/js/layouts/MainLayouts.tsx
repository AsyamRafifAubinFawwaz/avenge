import React from 'react';
import type { ReactNode } from 'react';
import BugReport from '@/components/avenge/bug-report';
import MusicToggle from '@/components/avenge/music-toggle';
import { SmoothScrollProvider } from '@/contexts/SmoothScrollContext';

interface MainLayoutProps {
    children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <SmoothScrollProvider>
            <div className="min-h-screen bg-[#81081F] text-foreground selection:bg-primary selection:text-primary-foreground antialiased">
                {children}
            </div>
            <BugReport />
            <MusicToggle />
        </SmoothScrollProvider>
    );
}