import { NavLink, Outlet } from 'react-router-dom';

import {
  Bell,
  Menu,
  Search,
  FlaskConical,
  Pipette,
  Map,
  Zap,
  LucideProps,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import { ProfileMenu } from '@/components/ProfileMenu';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

type NavItem = {
  name: string;
  link: string;
  badgeNum?: number;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >;
};

const navigation: NavItem[] = [
  {
    name: 'Specs',
    link: '/specs',
    // badgeNum: 6,
    icon: Map,
  },
  {
    name: 'Drams',
    link: '/drams',
    icon: FlaskConical,
  },
  {
    name: 'Ingredients',
    link: '/ingredients',
    icon: Pipette,
  },
];

export default function MainLayout() {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      {/* Hidden if screensize below `md` */}
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <NavLink to={'/'} className="flex items-center gap-2 font-semibold">
              <Zap className="h-6 w-6" />
              <span className="">InstaDram</span>
            </NavLink>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {navigation.map((navItem) => (
                <NavLink
                  key={`navItem-${navItem.name}`}
                  to={navItem.link}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <navItem.icon className="h-4 w-4" />
                  {navItem.name}
                  {navItem.badgeNum && (
                    <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                      {navItem.badgeNum}
                    </Badge>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            {/* Hidden if screensize at or above `md` */}
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <NavLink
                  to={'#'}
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Zap className="h-6 w-6" />
                  <span className="sr-only">InstaDram</span>
                </NavLink>
                {navigation.map((navItem) => (
                  <NavLink
                    key={`navItem-${navItem.name}`}
                    to={navItem.link}
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    <navItem.icon className="h-5 w-5" />
                    {navItem.name}
                    {navItem.badgeNum && (
                      <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                        {navItem.badgeNum}
                      </Badge>
                    )}
                  </NavLink>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <ProfileMenu />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
