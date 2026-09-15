import { Head } from '@inertiajs/react';
import { LayoutDashboard, Plus } from 'lucide-react';
import { useState } from 'react';
import PendingInvitationsModal from '@/components/pending-invitations-modal';
import { Button } from '@/components/ui/button';
import { dashboard } from '@/routes';
import type { DashboardInvitation } from '@/types';

type Props = {
    pendingInvitations?: DashboardInvitation[];
};

export default function Dashboard({ pendingInvitations = [] }: Props) {
    const [showInvitations, setShowInvitations] = useState(
        pendingInvitations.length > 0,
    );

    return (
        <>
            <Head title="Dashboard" />
            <PendingInvitationsModal
                invitations={pendingInvitations}
                open={pendingInvitations.length > 0 && showInvitations}
                onOpenChange={setShowInvitations}
            />
            <div className="flex h-full flex-1 flex-col gap-1 p-4">
                <div className="dashboard-section-header flex items-center justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                        <LayoutDashboard className="size-5 shrink-0 text-amber-400" />
                        <div className="min-w-0">
                            <h1 className="font-kemco text-base leading-tight tracking-normal text-white">
                                Dashboard
                            </h1>
                            <p className="mt-1 truncate font-depixel text-xs font-normal normal-case tracking-normal text-white/65">
                                Kelola dan pantau aktivitas aplikasi kamu
                            </p>
                        </div>
                    </div>
                    <Button type="button" className="pixel-button pixel-button--default shrink-0">
                        <Plus className="size-4" />
                        Tambah Data
                    </Button>
                </div>
                <div className="dashboard-content flex-1">
                </div>
            </div>
        </>
    );
}

Dashboard.layout = (props: { currentTeam?: { slug: string } | null }) => ({
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: props.currentTeam ? dashboard(props.currentTeam.slug) : '/',
        },
    ],
});
