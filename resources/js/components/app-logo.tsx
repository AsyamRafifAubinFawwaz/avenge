import { usePage } from '@inertiajs/react';

import AppLogoIcon from '@/components/app-logo-icon';

export default function AppLogo() {
    const { name } = usePage().props;

    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center border-2 border-black bg-sidebar-primary text-sidebar-primary-foreground shadow-[2px_2px_0px_0px_#000]">
                <AppLogoIcon className="size-5 fill-current text-white dark:text-black" />
            </div>
            <div className="ml-2 grid flex-1 text-left">
                <span className="truncate leading-tight font-kemco text-xl text-white drop-shadow-[2px_2px_0_#000]">
                    {name}
                </span>
            </div>
        </>
    );
}
