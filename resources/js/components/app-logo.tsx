import AppLogoIcon from '@/components/app-logo-icon';

export default function AppLogo() {
    return (
        <AppLogoIcon
            className="h-8 w-auto max-w-[148px] shrink-0 object-contain object-center drop-shadow-sm"
            style={{ imageRendering: 'pixelated' }}
        />
    );
}

