import { Head } from '@inertiajs/react';
import CharacterSection from '@/components/avenge/character';
import { HeroSection } from '@/components/avenge/hero';
import MarqueeSeparator from '@/components/avenge/marquee_separator';
import { NavbarHome } from '@/components/avenge/navbar';
import NewsSection from '@/components/avenge/news';
import TeamSection from '@/components/avenge/team';
import MainLayout from '@/layouts/MainLayouts';
import sharedNewsCharacterBackground from '../../assets/bg_news_n_character.png';
import WorldSection from './section/world';

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
            <Head title="Avenge: Last Manager Kopdes" />
            <MainLayout>
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
                    <CharacterSection />
                    <NewsSection latestNews={latestNews} />
                </div>
                <TeamSection />
            </MainLayout>
        </>
    );
}


