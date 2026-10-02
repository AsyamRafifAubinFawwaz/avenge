import { Head } from '@inertiajs/react';
import Footer from '@/components/avenge/footer';
import { HeroSection } from '@/components/avenge/hero';
import MarqueeSeparator from '@/components/avenge/marquee_separator';
import { NavbarHome } from '@/components/avenge/navbar';
import NewsSection from '@/components/avenge/news';
import TeamSection from '@/components/avenge/team';
import MainLayout from '@/layouts/MainLayouts';
import sharedNewsCharacterBackground from '../../assets/bg_section.webp';
import TrailerSection from '../components/avenge/trailer';
import WorldSection from './section/world';
import CharacterSection from '@/components/avenge/character';
import { GameplaySection } from '@/components/avenge/gameplay';
import LoadingScreen from '@/components/avenge/LoadingScreen';

type NewsItem = {
    id: number;
    title: string;
    slug: string;
    image: string | null;
    description: string;
    category_id: number;
    category?: { id: number; name: string };
    created_at: string;
};

type Props = {
    latestNews: NewsItem[];
};

export default function Welcome({ latestNews }: Props) {
    return (
        <>
            <Head title="Avenge" />
            <MainLayout>
                <LoadingScreen />
                <NavbarHome />
                <HeroSection />
                <WorldSection />
                <MarqueeSeparator />
                <div
                    className="relative overflow-hidden bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url(${sharedNewsCharacterBackground})`,
                        backgroundPosition: 'top center',
                        backgroundSize: '100% 100%',
                    }}
                >
                    <div className="pointer-events-none absolute inset-0 z-0 bg-black/50" />
                    <TrailerSection />  
                    <CharacterSection />
                    <GameplaySection/>
                    <NewsSection latestNews={latestNews} />
                </div>
                <TeamSection />
                <Footer />
            </MainLayout>
        </>
    );
}
