import { Head } from '@inertiajs/react';
import CharacterSection from '@/components/avenge/character';
import { HeroSection } from '@/components/avenge/hero';
import MarqueeSeparator from '@/components/avenge/marquee_separator';
import { NavbarHome } from '@/components/avenge/navbar';
import NewsSection from '@/components/avenge/news';
import MainLayout from '@/layouts/MainLayouts';
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
                <CharacterSection />
                <NewsSection latestNews={latestNews} />
            </MainLayout>
        </>
    );
}


