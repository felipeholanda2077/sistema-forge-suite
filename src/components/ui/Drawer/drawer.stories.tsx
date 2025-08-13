import type { Meta, StoryObj } from '@storybook/react-vite';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from './drawer';
import { Button } from '../Button/button';
import { Input } from '../Input/input';
import { Label } from '../Label/label';
import { Card, CardContent, CardHeader, CardTitle } from '../Card/card';
import { ScrollArea } from '../ScrollArea/scroll-area';
import { Separator } from '../Separator/separator';
import { useState } from 'react';
import { Menu, X, Settings, User, Mail, CreditCard, LogOut, Plus, Check, ChevronDown, MoreHorizontal } from 'lucide-react';

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

// Basic drawer
export const Basic: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[80vh] overflow-y-auto">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Move Goal</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                <span className="sr-only">Decrease</span>
                <X className="h-4 w-4" />
              </Button>
              <div className="flex-1 text-center">
                <div className="text-7xl font-bold tracking-tighter">10,000</div>
                <div className="text-muted-foreground text-sm uppercase">Steps/day</div>
              </div>
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                <span className="sr-only">Increase</span>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  ),
};

// Navigation drawer
export const Navigation: Story = {
  render: () => {
    const menuItems = [
      { id: 'inbox', icon: Mail, label: 'Inbox', badge: 5 },
      { id: 'profile', icon: User, label: 'Profile' },
      { id: 'billing', icon: CreditCard, label: 'Billing' },
      { id: 'settings', icon: Settings, label: 'Settings' },
    ];
    
    return (
      <Drawer direction="left">
        <DrawerTrigger asChild>
          <Button variant="outline">
            <Menu className="h-4 w-4 mr-2" />
            Open Menu
          </Button>
        </DrawerTrigger>
        <DrawerContent className="h-full w-[300px] ml-auto mt-0 rounded-r-xl rounded-l-none">
          <div className="h-full flex flex-col">
            <DrawerHeader className="border-b">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">John Doe</p>
                  <p className="text-sm text-muted-foreground">john@example.com</p>
                </div>
              </div>
            </DrawerHeader>
            
            <nav className="flex-1 p-4 space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  className="w-full flex items-center space-x-3 p-3 rounded-md transition-colors hover:bg-accent/50"
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto bg-primary text-primary-foreground text-xs font-medium px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </nav>
            
            <div className="p-4 border-t">
              <Button variant="ghost" className="w-full justify-start">
                <LogOut className="h-4 w-4 mr-2" />
                Sign out
              </Button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    );
  },
};

// Form in drawer
export const Form: Story = {
  render: () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button>Edit Profile</Button>
        </DrawerTrigger>
        <DrawerContent className="max-h-[90vh] overflow-y-auto">
          <div className="mx-auto w-full max-w-md">
            <DrawerHeader>
              <DrawerTitle>Edit Profile</DrawerTitle>
              <DrawerDescription>Update your profile information.</DrawerDescription>
            </DrawerHeader>
            <div className="p-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  placeholder="Enter your name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <DrawerFooter>
              <Button>Save Changes</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    );
  },
};

// Nested content
export const NestedContent: Story = {
  render: () => {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">View Details</Button>
        </DrawerTrigger>
        <DrawerContent className="max-h-[80vh] overflow-y-auto">
          <div className="mx-auto w-full max-w-2xl">
            <DrawerHeader>
              <DrawerTitle>Project Details</DrawerTitle>
              <DrawerDescription>Overview of your project</DrawerDescription>
            </DrawerHeader>
            
            <ScrollArea className="h-[400px] p-4">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Project Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-1">Project Name</h4>
                      <p className="text-sm text-muted-foreground">Website Redesign</p>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="text-sm font-medium mb-1">Description</h4>
                      <p className="text-sm text-muted-foreground">
                        Complete redesign of the company website with modern UI/UX principles and improved performance.
                      </p>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium mb-1">Start Date</h4>
                        <p className="text-sm text-muted-foreground">Jun 1, 2023</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-1">Due Date</h4>
                        <p className="text-sm text-muted-foreground">Aug 31, 2023</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Team Members</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {['Alex Johnson', 'Sam Wilson', 'Taylor Swift', 'Jordan Lee'].map((name, i) => (
                        <div key={i} className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-md">
                          <div className="flex items-center space-x-3">
                            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                              <span className="text-xs font-medium">{name.split(' ').map(n => n[0]).join('')}</span>
                            </div>
                            <span className="text-sm">{name}</span>
                          </div>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>
            
            <DrawerFooter>
              <Button>Save Changes</Button>
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    );
  },
};
