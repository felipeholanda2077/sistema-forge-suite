import type { Meta, StoryObj } from '@storybook/react-vite';
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList, 
  NavigationMenuTrigger, 
  navigationMenuTriggerStyle 
} from './navigation-menu';
import { Button } from '../Button/button';
import { cn } from '../../../lib/utils';
import { useState } from 'react';
import { Home, User, Settings, LogOut, ChevronDown, Plus, Star, Clock, BarChart2, HelpCircle, Menu, X } from 'lucide-react';

const meta: Meta<typeof NavigationMenu> = {
  title: 'Components/Navigation Menu',
  component: NavigationMenu,
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof NavigationMenu>;

const navigationItems: { title: string; href: string; description: string }[] = [
  {
    title: 'Alert Dialog',
    href: '/docs/primitives/alert-dialog',
    description:
      'A modal dialog that interrupts the user with important content and expects a response.',
  },
  {
    title: 'Hover Card',
    href: '/docs/primitives/hover-card',
    description:
      'For sighted users to preview content available behind a link.',
  },
  {
    title: 'Progress',
    href: '/docs/primitives/progress',
    description:
      'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
  },
  {
    title: 'Scroll-area',
    href: '/docs/primitives/scroll-area',
    description: 'Visually or semantically separates content.',
  },
  {
    title: 'Tabs',
    href: '/docs/primitives/tabs',
    description:
      'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
  },
  {
    title: 'Tooltip',
    href: '/docs/primitives/tooltip',
    description:
      'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
  },
];

const ListItem = ({
  className,
  title,
  children,
  ...props
}: {
  className?: string;
  title: string;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<'a'>) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
};

export const Default: Story = {
  render: () => (
    <div className="w-full">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                        shadcn/ui
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Beautifully designed components built with Radix UI and
                        Tailwind CSS.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/docs" title="Introduction">
                  Re-usable components built using Radix UI and Tailwind CSS.
                </ListItem>
                <ListItem href="/docs/installation" title="Installation">
                  How to install dependencies and structure your app.
                </ListItem>
                <ListItem href="/docs/primitives/typography" title="Typography">
                  Styles for headings, paragraphs, lists...etc
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Components</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {navigationItems.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="/docs"
              className={navigationMenuTriggerStyle()}
            >
              Documentation
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('home');
    
    const menuItems = [
      { id: 'home', label: 'Home', icon: Home },
      { id: 'profile', label: 'Profile', icon: User },
      { id: 'settings', label: 'Settings', icon: Settings },
    ];
    
    return (
      <div className="w-full">
        <NavigationMenu>
          <NavigationMenuList className="gap-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <NavigationMenuItem key={item.id}>
                  <NavigationMenuLink
                    href={`#${item.id}`}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      'flex items-center gap-2',
                      isActive ? 'bg-accent text-accent-foreground' : ''
                    )}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab(item.id);
                    }}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
            
            <NavigationMenuItem>
              <NavigationMenuTrigger className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                <span>More</span>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[200px] gap-1 p-2">
                  <li>
                    <NavigationMenuLink
                      asChild
                      className={cn(
                        'flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground',
                        activeTab === 'favorites' ? 'bg-accent' : ''
                      )}
                      onClick={() => setActiveTab('favorites')}
                    >
                      <a href="#favorites">
                        <Star className="h-4 w-4" />
                        <span>Favorites</span>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink
                      asChild
                      className={cn(
                        'flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground',
                        activeTab === 'recent' ? 'bg-accent' : ''
                      )}
                      onClick={() => setActiveTab('recent')}
                    >
                      <a href="#recent">
                        <Clock className="h-4 w-4" />
                        <span>Recent</span>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink
                      asChild
                      className={cn(
                        'flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground',
                        activeTab === 'analytics' ? 'bg-accent' : ''
                      )}
                      onClick={() => setActiveTab('analytics')}
                    >
                      <a href="#analytics">
                        <BarChart2 className="h-4 w-4" />
                        <span>Analytics</span>
                      </a>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        
        <div className="mt-8 p-4 border rounded-lg">
          {activeTab === 'home' && (
            <div>
              <h3 className="text-lg font-medium mb-2">Welcome to the Dashboard</h3>
              <p className="text-muted-foreground">
                This is your personalized dashboard. Use the navigation above to explore different sections.
              </p>
            </div>
          )}
          {activeTab === 'profile' && (
            <div>
              <h3 className="text-lg font-medium mb-2">Your Profile</h3>
              <p className="text-muted-foreground">
                Manage your account settings and preferences here.
              </p>
            </div>
          )}
          {activeTab === 'settings' && (
            <div>
              <h3 className="text-lg font-medium mb-2">Settings</h3>
              <p className="text-muted-foreground">
                Configure your application settings and preferences.
              </p>
            </div>
          )}
          {activeTab === 'favorites' && (
            <div>
              <h3 className="text-lg font-medium mb-2">Favorites</h3>
              <p className="text-muted-foreground">
                Your saved items will appear here.
              </p>
            </div>
          )}
          {activeTab === 'recent' && (
            <div>
              <h3 className="text-lg font-medium mb-2">Recent Activity</h3>
              <p className="text-muted-foreground">
                Your recent activity will be displayed here.
              </p>
            </div>
          )}
          {activeTab === 'analytics' && (
            <div>
              <h3 className="text-lg font-medium mb-2">Analytics</h3>
              <p className="text-muted-foreground">
                View your analytics and statistics here.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  },
};

export const MobileFriendly: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('home');
    
    const menuItems = [
      { id: 'home', label: 'Home', icon: Home },
      { id: 'profile', label: 'Profile', icon: User },
      { id: 'settings', label: 'Settings', icon: Settings },
      { id: 'help', label: 'Help', icon: HelpCircle },
      { id: 'logout', label: 'Logout', icon: LogOut },
    ];
    
    return (
      <div className="w-full">
        {/* Mobile menu button */}
        <div className="md:hidden flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">
            {menuItems.find(item => item.id === activeTab)?.label}
          </h2>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden"
          >
            {isOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
        
        <div className="flex h-[calc(100vh-64px)]">
          {/* Sidebar - Mobile */}
          <div className={cn(
            'fixed inset-y-0 left-0 z-40 w-64 bg-background border-r transition-transform duration-300 ease-in-out md:hidden',
            isOpen ? 'translate-x-0' : '-translate-x-full'
          )}>
            <nav className="h-full flex flex-col">
              <div className="p-4 border-b">
                <h3 className="text-lg font-semibold">Menu</h3>
              </div>
              <div className="flex-1 overflow-y-auto p-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  
                  return (
                    <button
                      key={item.id}
                      className={cn(
                        'w-full flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                        isActive 
                          ? 'bg-accent text-accent-foreground' 
                          : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                      )}
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsOpen(false);
                      }}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                      {isActive && (
                        <span className="ml-auto h-2 w-2 rounded-full bg-primary" />
                      )}
                    </button>
                  );
                })}
              </div>
            </nav>
          </div>
          
          {/* Overlay for mobile */}
          {isOpen && (
            <div 
              className="fixed inset-0 z-30 bg-black/50 md:hidden"
              onClick={() => setIsOpen(false)}
            />
          )}
          
          {/* Main content */}
          <div className="flex-1 p-4 md:p-6">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-2xl font-bold mb-6">
                {menuItems.find(item => item.id === activeTab)?.label}
              </h1>
              <div className="bg-card p-6 rounded-lg border">
                <p className="text-muted-foreground">
                  This is the {menuItems.find(item => item.id === activeTab)?.label.toLowerCase()} page content.
                  {activeTab === 'home' && ' Welcome to your dashboard!'}
                  {activeTab === 'profile' && ' Update your profile information and preferences.'}
                  {activeTab === 'settings' && ' Configure your application settings.'}
                  {activeTab === 'help' && ' Find answers to common questions and contact support.'}
                  {activeTab === 'logout' && ' Are you sure you want to log out?'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};
