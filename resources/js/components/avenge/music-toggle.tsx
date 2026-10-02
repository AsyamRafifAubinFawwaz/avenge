import { Volume2, VolumeX } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const MUSIC_SRC = '/backsound_king_hall.wav';
const MUSIC_VOLUME = 0.35;
const MUSIC_PREFERENCE_KEY = 'avenge-music-enabled';

export default function MusicToggle() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isMuted, setIsMuted] = useState(true);

    useEffect(() => {
        const audio = new Audio(MUSIC_SRC);
        const savedPreference = window.localStorage.getItem(MUSIC_PREFERENCE_KEY);
        const musicEnabled = savedPreference !== 'false';

        audio.loop = true;
        audio.volume = MUSIC_VOLUME;
        audio.muted = !musicEnabled;
        audioRef.current = audio;
        setIsMuted(!musicEnabled);

        audio.play().catch(() => {
            audio.muted = true;
            setIsMuted(true);
        });

        const startMusicAfterInteraction = () => {
            if (!musicEnabled || !audio.muted) {
                return;
            }

            audio.muted = false;
            audio.play().catch(() => {
                audio.muted = true;
                setIsMuted(true);
            });
        };

        document.addEventListener('pointerdown', startMusicAfterInteraction, { once: true });

        return () => {
            document.removeEventListener('pointerdown', startMusicAfterInteraction);
            audio.pause();
            audio.currentTime = 0;
            audioRef.current = null;
        };
    }, []);

    const toggleMusic = () => {
        const audio = audioRef.current;

        if (!audio) {
            return;
        }

        const nextMuted = !audio.muted;
        audio.muted = nextMuted;
        setIsMuted(nextMuted);
        window.localStorage.setItem(MUSIC_PREFERENCE_KEY, String(!nextMuted));

        if (!nextMuted) {
            audio.play().catch(() => {
                audio.muted = true;
                setIsMuted(true);
                window.localStorage.setItem(MUSIC_PREFERENCE_KEY, 'false');
            });
        }
    };

    return (
        <button
            type="button"
            onClick={toggleMusic}
            aria-label={isMuted ? 'Nyalakan musik' : 'Matikan musik'}
            title={isMuted ? 'Nyalakan musik' : 'Matikan musik'}
            className="fixed right-4 bottom-4 z-120 grid h-11 w-11 cursor-pointer place-items-center border-2 border-amber-300 bg-[#180507]/90 text-amber-300 shadow-[3px_3px_0_#000] backdrop-blur-sm transition-[background-color,color,transform] hover:bg-amber-300 hover:text-[#180507] active:translate-y-0.5 sm:right-6 sm:bottom-6"
        >
            {isMuted ? (
                <VolumeX className="h-5 w-5" aria-hidden="true" />
            ) : (
                <Volume2 className="h-5 w-5" aria-hidden="true" />
            )}
        </button>
    );
}
