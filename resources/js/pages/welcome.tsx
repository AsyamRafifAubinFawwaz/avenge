import { Head } from '@inertiajs/react';
import CharacterSection from '@/components/avenge/character';
import { HeroSection } from '@/components/avenge/hero';
import MarqueeSeparator from '@/components/avenge/marquee_separator';
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
                <MarqueeSeparator />
                <CharacterSection />
            </MainLayout>
        </>
    );
}
