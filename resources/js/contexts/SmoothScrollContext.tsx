import type { LenisOptions, ScrollToOptions } from 'lenis';
import Lenis from 'lenis';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import 'lenis/dist/lenis.css';

export type ScrollTarget = string | number | HTMLElement;

export interface SmoothScrollContextType {
    lenis: Lenis | null;
    scrollTo: (target: ScrollTarget, options?: ScrollToOptions) => void;
    start: () => void;
    stop: () => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType | undefined>(undefined);

interface SmoothScrollProviderProps {
    children: ReactNode;
    options?: LenisOptions;
}

export const SmoothScrollProvider: React.FC<SmoothScrollProviderProps> = ({
    children,
    options
}) => {
    const [lenis, setLenis] = useState<Lenis | null>(null);
    const reqIdRef = useRef<number | null>(null);

    useEffect(() => {
        const instance = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 1.5,
            ...options,
        });

        setLenis(instance);

        const raf = (time: number) => {
            instance.raf(time);
            reqIdRef.current = requestAnimationFrame(raf);
        };

        reqIdRef.current = requestAnimationFrame(raf);

        return () => {
            if (reqIdRef.current !== null) {
                cancelAnimationFrame(reqIdRef.current);
            }

            instance.destroy();
            setLenis(null);
        };
    }, [options]);

    const scrollTo = (target: ScrollTarget, scrollOptions?: ScrollToOptions) => {
        lenis?.scrollTo(target, scrollOptions);
    };

    const start = () => lenis?.start();
    const stop = () => lenis?.stop();

    return (
        <SmoothScrollContext.Provider value={{ lenis, scrollTo, start, stop }}>
            {children}
        </SmoothScrollContext.Provider>
    );
};

export const useSmoothScroll = (): SmoothScrollContextType => {
    const context = useContext(SmoothScrollContext);

    if (!context) {
        throw new Error('useSmoothScroll must be used within a SmoothScrollProvider');
    }

    return context;
};