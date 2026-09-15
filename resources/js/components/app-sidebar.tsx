import { Link, usePage } from '@inertiajs/react';
import {
    BookOpen,
    FolderGit2,
    LayoutGrid,
    Tags,
    Newspaper,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { TeamSwitcher } from '@/components/team-switcher';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { index as categoriesIndex } from '@/actions/App/Http/Controllers/SuperAdmin/CategoryController';
import type { NavItem } from '@/types';
import { index as newsIndex } from '@/actions/App/Http/Controllers/SuperAdmin/NewsController';
import TextureLeft from '../../assets/dashboard/left-texture-sidebar.png';
import TextureCenter from '../../assets/dashboard/center-texture-sidebar.png';
import TextureRight from '../../assets/dashboard/right-texture-sidebar.png';

export function AppSidebar() {
    const page = usePage();
    const dashboardUrl = page.props.currentTeam
        ? dashboard(page.props.currentTeam.slug)
        : '/';

    const mainNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: dashboardUrl,
            icon: LayoutGrid,
        },
        {
            title: 'Kategori',
            href: categoriesIndex.url(),
            icon: Tags,
        },
        {
            title: 'Berita',
            href: newsIndex.url(),
            icon: Newspaper,
        },
    ];

    return (
        <Sidebar
            collapsible="icon"
            variant="inset"
            className="sidebar-texture "
            style={
                {
                    '--sidebar-bg-left': `url(${TextureLeft})`,
                    '--sidebar-bg-center': `url(${TextureCenter})`,
                    '--sidebar-bg-right': `url(${TextureRight})`,
                } as React.CSSProperties
            }
        >
            <SidebarHeader className="h-20 justify-center py-2 group-has-data-[collapsible=icon]/sidebar-wrapper:h-16">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboardUrl} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
