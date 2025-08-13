import type { Meta, StoryObj } from '@storybook/react-vite';
import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarGroup, SidebarMenuButton, SidebarLabel, SidebarSeparator, SidebarMenu, SidebarMenuItem, SidebarItem } from './sidebar';
import { Button } from '../Button/button';
import { Badge } from '../Badge/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../Avatar/avatar';
import { Input } from '../Input/input';
import { Separator } from '../Separator/separator';
import { cn } from '../../../lib/utils';
import { Home, Search, Bell, Settings, User, LogOut, Plus, Folder, FileText, Users, BarChart2, HelpCircle, MessageSquare, Calendar, Inbox, Star, File, List, CheckSquare, Flag, Download, ChevronRight, ChevronLeft, ChevronDown, CreditCard, Clock } from 'lucide-react';
import React from 'react';

const meta: Meta<typeof Sidebar> = {
  title: 'Components/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

// Basic sidebar
export const Basic: Story = {
  render: () => (
    <div className="flex h-screen">
      <Sidebar className="border-r">
        <SidebarHeader>
          <div className="flex items-center space-x-2">
            <div className="h-6 w-6 rounded-md bg-primary flex items-center justify-center text-primary-foreground">
              <span className="text-sm font-bold">A</span>
            </div>
            <span className="font-semibold">Acme Inc</span>
          </div>
        </SidebarHeader>
        
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenuButton isActive>
              <Home className="h-4 w-4" />
              <SidebarLabel>Dashboard</SidebarLabel>
              <Badge variant="secondary" className="ml-auto">5</Badge>
            </SidebarMenuButton>
            <SidebarMenuButton>
              <Inbox className="h-4 w-4" />
              <SidebarLabel>Inbox</SidebarLabel>
              <Badge variant="secondary" className="ml-auto">12</Badge>
            </SidebarMenuButton>
            <SidebarMenuButton>
              <Users className="h-4 w-4" />
              <SidebarLabel>Team</SidebarLabel>
            </SidebarMenuButton>
            <SidebarMenuButton>
              <Calendar className="h-4 w-4" />
              <SidebarLabel>Calendar</SidebarLabel>
              <Badge variant="secondary" className="ml-auto">20+</Badge>
            </SidebarMenuButton>
            <SidebarMenuButton>
              <FileText className="h-4 w-4" />
              <SidebarLabel>Documents</SidebarLabel>
            </SidebarMenuButton>
            <SidebarMenuButton>
              <BarChart2 className="h-4 w-4" />
              <SidebarLabel>Reports</SidebarLabel>
            </SidebarMenuButton>
          </SidebarGroup>
          
          <SidebarSeparator />
          
          <SidebarGroup>
            <SidebarLabel className="px-4 text-xs font-medium text-muted-foreground">Projects</SidebarLabel>
            <SidebarMenuButton>
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <SidebarLabel>Website Redesign</SidebarLabel>
            </SidebarMenuButton>
            <SidebarMenuButton>
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <SidebarLabel>Mobile App</SidebarLabel>
            </SidebarMenuButton>
            <SidebarMenuButton>
              <div className="h-2 w-2 rounded-full bg-purple-500" />
              <SidebarLabel>Marketing Site</SidebarLabel>
            </SidebarMenuButton>
            <SidebarMenuButton>
              <div className="h-2 w-2 rounded-full bg-yellow-500" />
              <SidebarLabel>API Integration</SidebarLabel>
            </SidebarMenuButton>
          </SidebarGroup>
        </SidebarContent>
        
        <SidebarFooter>
          <div className="flex items-center space-x-2 p-4">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatars/01.png" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">John Doe</p>
              <p className="text-xs text-muted-foreground truncate">johndoe@example.com</p>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
      
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <p className="text-muted-foreground">
          This is the main content area. The sidebar is on the left.
        </p>
      </main>
    </div>
  ),
};

// Collapsible sidebar
export const Collapsible: Story = {
  render: () => {
    const [isCollapsed, setIsCollapsed] = React.useState(false);
    
    return (
      <div className="flex h-screen">
        <Sidebar className={cn(
          "border-r transition-all duration-300 ease-in-out",
          isCollapsed ? "w-16" : "w-64"
        )}>
          <SidebarHeader>
            <div className={cn(
              "flex items-center space-x-2 overflow-hidden transition-all",
              isCollapsed ? "justify-center" : ""
            )}>
              <div className="h-6 w-6 rounded-md bg-primary flex items-center justify-center text-primary-foreground flex-shrink-0">
                <span className="text-sm font-bold">A</span>
              </div>
              {!isCollapsed && <span className="font-semibold">Acme Inc</span>}
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 ml-auto"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </SidebarHeader>
          
          <SidebarContent>
            <div className="px-3 py-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={isCollapsed ? "" : "Search..."}
                  className={cn(
                    "w-full bg-background pl-8",
                    isCollapsed ? "px-2" : "pr-8"
                  )}
                />
              </div>
            </div>
            
            <SidebarGroup>
              <SidebarMenuButton>
              <Home className="h-4 w-4" />
              <SidebarLabel className={cn("transition-opacity", isCollapsed ? "opacity-0 w-0" : "opacity-100")}>
                Dashboard
              </SidebarLabel>
            </SidebarMenuButton>
            <SidebarMenuButton>
              <Inbox className="h-4 w-4" />
              <SidebarLabel className={cn("transition-opacity", isCollapsed ? "opacity-0 w-0" : "opacity-100")}>
                Inbox
              </SidebarLabel>
              <Badge variant="secondary" className={cn("ml-auto transition-opacity", isCollapsed ? "opacity-0" : "opacity-100")}>
                12
              </Badge>
            </SidebarMenuButton>
            <SidebarMenuButton>
              <Users className="h-4 w-4" />
              <SidebarLabel className={cn("transition-opacity", isCollapsed ? "opacity-0 w-0" : "opacity-100")}>
                Team
              </SidebarLabel>
            </SidebarMenuButton>
            <SidebarMenuButton>
              <Calendar className="h-4 w-4" />
              <SidebarLabel className={cn("transition-opacity", isCollapsed ? "opacity-0 w-0" : "opacity-100")}>
                Calendar
              </SidebarLabel>
            </SidebarMenuButton>
            </SidebarGroup>
            
            <SidebarSeparator />
            
            <SidebarGroup>
              <SidebarLabel className={cn(
                "px-4 text-xs font-medium text-muted-foreground transition-opacity",
                isCollapsed ? "opacity-0 w-0" : "opacity-100"
              )}>
                Projects
              </SidebarLabel>
              <SidebarItem>
                <div className="h-2 w-2 rounded-full bg-green-500 flex-shrink-0" />
                <SidebarLabel className={cn("transition-opacity", isCollapsed ? "opacity-0 w-0" : "opacity-100")}>
                  Website Redesign
                </SidebarLabel>
              </SidebarItem>
              <SidebarItem>
                <div className="h-2 w-2 rounded-full bg-blue-500 flex-shrink-0" />
                <SidebarLabel className={cn("transition-opacity", isCollapsed ? "opacity-0 w-0" : "opacity-100")}>
                  Mobile App
                </SidebarLabel>
              </SidebarItem>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter>
            <div className={cn(
              "flex items-center p-4 transition-all",
              isCollapsed ? "justify-center" : ""
            )}>
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarImage src="/avatars/01.png" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              {!isCollapsed && (
                <div className="ml-3 min-w-0">
                  <p className="text-sm font-medium truncate">John Doe</p>
                  <p className="text-xs text-muted-foreground truncate">johndoe@example.com</p>
                </div>
              )}
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <main className="flex-1 p-8 transition-all duration-300 ease-in-out">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => setIsCollapsed(!isCollapsed)}>
                {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                <span className="ml-2">{isCollapsed ? "Expand" : "Collapse"} Sidebar</span>
              </Button>
            </div>
          </div>
          <p className="text-muted-foreground">
            This is the main content area. The sidebar can be toggled to show/hide labels.
          </p>
        </main>
      </div>
    );
  },
};

// With nested navigation
export const WithNestedNavigation: Story = {
  render: () => {
    const [expandedItems, setExpandedItems] = React.useState<Record<string, boolean>>({
      projects: true,
      team: false,
      settings: false,
    });
    
    const toggleItem = (item: string) => {
      setExpandedItems(prev => ({
        ...prev,
        [item]: !prev[item]
      }));
    };
    
    return (
      <div className="flex h-screen">
        <Sidebar className="border-r w-64">
          <SidebarHeader>
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded-md bg-primary flex items-center justify-center text-primary-foreground">
                <span className="text-sm font-bold">A</span>
              </div>
              <span className="font-semibold">Acme Inc</span>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarItem>
                <Home className="h-4 w-4" />
                <SidebarLabel>Dashboard</SidebarLabel>
              </SidebarItem>
              <SidebarItem>
                <Inbox className="h-4 w-4" />
                <SidebarLabel>Inbox</SidebarLabel>
                <Badge variant="secondary" className="ml-auto">12</Badge>
              </SidebarItem>
              
              <SidebarItem 
                onClick={() => toggleItem('projects')}
                className="cursor-pointer"
              >
                <Folder className="h-4 w-4" />
                <SidebarLabel>Projects</SidebarLabel>
                <ChevronDown className={cn(
                  "ml-auto h-4 w-4 transition-transform",
                  expandedItems.projects ? "rotate-0" : "-rotate-90"
                )} />
              </SidebarItem>
              
              {expandedItems.projects && (
                <div className="pl-8 py-1 space-y-1">
                  <SidebarItem>
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <SidebarLabel>Website Redesign</SidebarLabel>
                  </SidebarItem>
                  <SidebarItem>
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                    <SidebarLabel>Mobile App</SidebarLabel>
                  </SidebarItem>
                  <SidebarItem>
                    <div className="h-2 w-2 rounded-full bg-purple-500" />
                    <SidebarLabel>Marketing Site</SidebarLabel>
                  </SidebarItem>
                  <SidebarItem>
                    <Plus className="h-4 w-4 text-muted-foreground" />
                    <SidebarLabel className="text-muted-foreground">
                      New Project
                    </SidebarLabel>
                  </SidebarItem>
                </div>
              )}
              
              <SidebarItem 
                onClick={() => toggleItem('team')}
                className="cursor-pointer"
              >
                <Users className="h-4 w-4" />
                <SidebarLabel>Team</SidebarLabel>
                <ChevronDown className={cn(
                  "ml-auto h-4 w-4 transition-transform",
                  expandedItems.team ? "rotate-0" : "-rotate-90"
                )} />
              </SidebarItem>
              
              {expandedItems.team && (
                <div className="pl-8 py-1 space-y-1">
                  <SidebarItem>
                    <Avatar className="h-4 w-4">
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <SidebarLabel>John Doe</SidebarLabel>
                    <Badge variant="outline" className="ml-auto text-xs">You</Badge>
                  </SidebarItem>
                  <SidebarItem>
                    <Avatar className="h-4 w-4">
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <SidebarLabel>Jane Smith</SidebarLabel>
                  </SidebarItem>
                  <SidebarItem>
                    <Avatar className="h-4 w-4">
                      <AvatarFallback>RJ</AvatarFallback>
                    </Avatar>
                    <SidebarLabel>Robert Johnson</SidebarLabel>
                  </SidebarItem>
                  <SidebarItem>
                    <Plus className="h-4 w-4 text-muted-foreground" />
                    <SidebarLabel className="text-muted-foreground">
                      Invite Member
                    </SidebarLabel>
                  </SidebarItem>
                </div>
              )}
              
              <SidebarItem>
                <BarChart2 className="h-4 w-4" />
                <SidebarLabel>Analytics</SidebarLabel>
              </SidebarItem>
              
              <SidebarItem>
                <MessageSquare className="h-4 w-4" />
                <SidebarLabel>Messages</SidebarLabel>
                <Badge variant="secondary" className="ml-auto">3</Badge>
              </SidebarItem>
              
              <SidebarItem 
                onClick={() => toggleItem('settings')}
                className="cursor-pointer"
              >
                <Settings className="h-4 w-4" />
                <SidebarLabel>Settings</SidebarLabel>
                <ChevronDown className={cn(
                  "ml-auto h-4 w-4 transition-transform",
                  expandedItems.settings ? "rotate-0" : "-rotate-90"
                )} />
              </SidebarItem>
              
              {expandedItems.settings && (
                <div className="pl-8 py-1 space-y-1">
                  <SidebarItem>
                    <User className="h-4 w-4" />
                    <SidebarLabel>Profile</SidebarLabel>
                  </SidebarItem>
                  <SidebarItem>
                    <Bell className="h-4 w-4" />
                    <SidebarLabel>Notifications</SidebarLabel>
                  </SidebarItem>
                  <SidebarItem>
                    <CreditCard className="h-4 w-4" />
                    <SidebarLabel>Billing</SidebarLabel>
                  </SidebarItem>
                </div>
              )}
            </SidebarGroup>
            
            <SidebarSeparator />
            
            <SidebarGroup>
              <SidebarLabel className="px-4 text-xs font-medium text-muted-foreground">
                Quick Access
              </SidebarLabel>
              <SidebarItem>
                <Star className="h-4 w-4" />
                <SidebarLabel>Starred</SidebarLabel>
              </SidebarItem>
              <SidebarItem>
                <Clock className="h-4 w-4" />
                <SidebarLabel>Recent</SidebarLabel>
              </SidebarItem>
              <SidebarItem>
                <Download className="h-4 w-4" />
                <SidebarLabel>Downloads</SidebarLabel>
              </SidebarItem>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter>
            <div className="p-4">
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/01.png" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">John Doe</p>
                  <p className="text-xs text-muted-foreground truncate">johndoe@example.com</p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
          <p className="text-muted-foreground">
            This is the main content area. The sidebar includes expandable/collapsible sections.
          </p>
        </main>
      </div>
    );
  },
};

// With footer content
export const WithFooterContent: Story = {
  render: () => (
    <div className="flex h-screen">
      <Sidebar className="border-r w-64">
        <SidebarHeader>
          <div className="flex items-center space-x-2">
            <div className="h-6 w-6 rounded-md bg-primary flex items-center justify-center text-primary-foreground">
              <span className="text-sm font-bold">A</span>
            </div>
            <span className="font-semibold">Acme Inc</span>
          </div>
        </SidebarHeader>
        
        <SidebarContent>
          <SidebarGroup>
            <SidebarItem>
              <Home className="h-4 w-4" />
              <SidebarLabel>Dashboard</SidebarLabel>
            </SidebarItem>
            <SidebarItem>
              <Inbox className="h-4 w-4" />
              <SidebarLabel>Inbox</SidebarLabel>
              <Badge variant="secondary" className="ml-auto">12</Badge>
            </SidebarItem>
            <SidebarItem>
              <Users className="h-4 w-4" />
              <SidebarLabel>Team</SidebarLabel>
            </SidebarItem>
            <SidebarItem>
              <Calendar className="h-4 w-4" />
              <SidebarLabel>Calendar</SidebarLabel>
            </SidebarItem>
            <SidebarItem>
              <FileText className="h-4 w-4" />
              <SidebarLabel>Documents</SidebarLabel>
            </SidebarItem>
            <SidebarItem>
              <BarChart2 className="h-4 w-4" />
              <SidebarLabel>Reports</SidebarLabel>
            </SidebarItem>
          </SidebarGroup>
          
          <SidebarSeparator />
          
          <SidebarGroup>
            <SidebarLabel className="px-4 text-xs font-medium text-muted-foreground">
              Projects
            </SidebarLabel>
            <SidebarMenuButton>
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <SidebarLabel>Website Redesign</SidebarLabel>
              <Badge variant="outline" className="ml-auto text-xs">Active</Badge>
            </SidebarMenuButton>
            <SidebarMenuButton>
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <SidebarLabel>Mobile App</SidebarLabel>
              <Badge variant="outline" className="ml-auto text-xs">Active</Badge>
            </SidebarMenuButton>
            <SidebarMenuButton>
              <div className="h-2 w-2 rounded-full bg-gray-300" />
              <SidebarLabel className="text-muted-foreground">Marketing Site</SidebarLabel>
              <Badge variant="outline" className="ml-auto text-xs">Paused</Badge>
            </SidebarMenuButton>
          </SidebarGroup>
        </SidebarContent>
        
        <SidebarFooter className="border-t p-4">
          <div className="space-y-4">
            <div className="rounded-lg bg-muted p-3">
              <div className="flex items-start space-x-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Star className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium">Upgrade to Pro</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Get access to all features and unlimited projects
                  </p>
                  <Button size="sm" className="mt-2 w-full">
                    Upgrade Now
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatars/01.png" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">John Doe</p>
                <p className="text-xs text-muted-foreground truncate">johndoe@example.com</p>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <p className="text-muted-foreground">
          This is the main content area. The sidebar has a footer with additional content.
        </p>
      </main>
    </div>
  ),
};

// With search and custom styles
export const WithSearch: Story = {
  render: () => (
    <div className="flex h-screen">
      <Sidebar className="border-r w-64 bg-gradient-to-b from-background to-muted/10">
        <SidebarHeader className="border-b px-4 py-3">
          <div className="flex items-center space-x-2">
            <div className="h-6 w-6 rounded-md bg-primary flex items-center justify-center text-primary-foreground">
              <span className="text-sm font-bold">A</span>
            </div>
            <span className="font-semibold">Acme Inc</span>
          </div>
        </SidebarHeader>
        
        <div className="p-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full bg-background pl-8"
            />
          </div>
        </div>
        
        <SidebarContent>
          <SidebarGroup>
            <SidebarItem className="group">
              <div className="absolute left-0 top-0 h-full w-1 bg-primary rounded-r-md opacity-0 group-hover:opacity-100 group-data-[active=true]:opacity-100 transition-opacity" />
              <Home className="h-4 w-4" />
              <SidebarLabel>Dashboard</SidebarLabel>
              <Badge variant="secondary" className="ml-auto">5</Badge>
            </SidebarItem>
            <SidebarItem className="group">
              <div className="absolute left-0 top-0 h-full w-1 bg-primary rounded-r-md opacity-0 group-hover:opacity-100 group-data-[active=true]:opacity-100 transition-opacity" />
              <Inbox className="h-4 w-4" />
              <SidebarLabel>Inbox</SidebarLabel>
              <Badge variant="secondary" className="ml-auto">12</Badge>
            </SidebarItem>
            <SidebarItem className="group">
              <div className="absolute left-0 top-0 h-full w-1 bg-primary rounded-r-md opacity-0 group-hover:opacity-100 group-data-[active=true]:opacity-100 transition-opacity" />
              <Users className="h-4 w-4" />
              <SidebarLabel>Team</SidebarLabel>
            </SidebarItem>
            <SidebarItem className="group">
              <div className="absolute left-0 top-0 h-full w-1 bg-primary rounded-r-md opacity-0 group-hover:opacity-100 group-data-[active=true]:opacity-100 transition-opacity" />
              <Calendar className="h-4 w-4" />
              <SidebarLabel>Calendar</SidebarLabel>
            </SidebarItem>
            <SidebarItem className="group">
              <div className="absolute left-0 top-0 h-full w-1 bg-primary rounded-r-md opacity-0 group-hover:opacity-100 group-data-[active=true]:opacity-100 transition-opacity" />
              <FileText className="h-4 w-4" />
              <SidebarLabel>Documents</SidebarLabel>
            </SidebarItem>
          </SidebarGroup>
          
          <SidebarSeparator />
          
          <SidebarGroup>
            <SidebarLabel className="px-4 text-xs font-medium text-muted-foreground">
              Projects
            </SidebarLabel>
            <SidebarItem className="group">
              <div className="absolute left-0 top-0 h-full w-1 bg-primary rounded-r-md opacity-0 group-hover:opacity-100 group-data-[active=true]:opacity-100 transition-opacity" />
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <SidebarLabel>Website Redesign</SidebarLabel>
              <Badge variant="outline" className="ml-auto text-xs">Active</Badge>
            </SidebarItem>
            <SidebarItem className="group">
              <div className="absolute left-0 top-0 h-full w-1 bg-primary rounded-r-md opacity-0 group-hover:opacity-100 group-data-[active=true]:opacity-100 transition-opacity" />
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <SidebarLabel>Mobile App</SidebarLabel>
              <Badge variant="outline" className="ml-auto text-xs">Active</Badge>
            </SidebarItem>
            <SidebarItem className="group">
              <div className="absolute left-0 top-0 h-full w-1 bg-primary rounded-r-md opacity-0 group-hover:opacity-100 group-data-[active=true]:opacity-100 transition-opacity" />
              <div className="h-2 w-2 rounded-full bg-purple-500" />
              <SidebarLabel>Marketing Site</SidebarLabel>
              <Badge variant="outline" className="ml-auto text-xs">Active</Badge>
            </SidebarItem>
          </SidebarGroup>
        </SidebarContent>
        
        <SidebarFooter className="border-t p-4">
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatars/01.png" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">John Doe</p>
              <p className="text-xs text-muted-foreground truncate">johndoe@example.com</p>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
      
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <p className="text-muted-foreground">
          This is the main content area. The sidebar has a search input and custom styling.
        </p>
      </main>
    </div>
  ),
};
