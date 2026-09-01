import { Head } from '@inertiajs/react';
import { HeroSection } from '@/components/avenge/hero';
import { NavbarHome } from '@/components/avenge/navbar';
import MainLayout from '@/layouts/MainLayouts';
import WorldSection from './section/world';

export default function Welcome() {

    return (
        <>
            <Head title="Avenge: Last Manager Kopdes" />
            <MainLayout>
                <NavbarHome />
                <HeroSection />
                <WorldSection />
            </MainLayout>
        </>
    );
}
