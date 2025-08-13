import type { Meta, StoryObj } from '@storybook/react-vite';
import { Popover, PopoverContent, PopoverTrigger } from '../Popover/popover';
import { Button } from '../Button/button';
import { Calendar } from '../Calendar/calendar';
import { Bell, CalendarDays, Check, ChevronsUpDown, CreditCard, Info, LifeBuoy, LogOut, MessageCircle, MessageSquare, Plus, Server, Settings, User, UserPlus, X } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '../../../lib/utils';
import { useState } from 'react';

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Popover>;

// Basic popover
export const Basic: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensions</h4>
            <p className="text-sm text-muted-foreground">
              Set the dimensions for the layer.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <label htmlFor="width" className="text-sm">Width</label>
              <input
                id="width"
                defaultValue="100%"
                className="col-span-2 h-8 rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <label htmlFor="maxWidth" className="text-sm">Max. width</label>
              <input
                id="maxWidth"
                defaultValue="300px"
                className="col-span-2 h-8 rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <label htmlFor="height" className="text-sm">Height</label>
              <input
                id="height"
                defaultValue="25px"
                className="col-span-2 h-8 rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <label htmlFor="maxHeight" className="text-sm">Max. height</label>
              <input
                id="maxHeight"
                defaultValue="none"
                className="col-span-2 h-8 rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

// Date picker popover
export const DatePicker: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarDays className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    );
  },
};

// Notification popover
export const Notifications: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
          </div>
          <Bell className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h3 className="text-sm font-medium">Notifications</h3>
          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-muted-foreground">
            Mark all as read
          </Button>
        </div>
        <div className="max-h-[400px] overflow-y-auto">
          {[
            {
              id: 1,
              title: 'New message from Sarah',
              description: 'Hey, how are you doing?',
              time: '2m ago',
              read: false,
              icon: <MessageSquare className="h-4 w-4 text-blue-500" />,
            },
            {
              id: 2,
              title: 'New user registered',
              description: 'John Doe just signed up',
              time: '1h ago',
              read: false,
              icon: <UserPlus className="h-4 w-4 text-green-500" />,
            },
            {
              id: 3,
              title: 'Server rebooted',
              description: 'Server #12345 has been successfully rebooted',
              time: '3h ago',
              read: true,
              icon: <Server className="h-4 w-4 text-purple-500" />,
            },
            {
              id: 4,
              title: 'New comment',
              description: 'Alice commented on your post',
              time: '5h ago',
              read: true,
              icon: <MessageCircle className="h-4 w-4 text-yellow-500" />,
            },
          ].map((notification) => (
            <div 
              key={notification.id}
              className={cn(
                "border-b p-4 hover:bg-muted/50",
                !notification.read && "bg-muted/20"
              )}
            >
              <div className="flex items-start">
                <div className="mr-3 mt-0.5">
                  {notification.icon}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{notification.title}</p>
                    <span className="text-xs text-muted-foreground">
                      {notification.time}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {notification.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t p-2 text-center">
          <Button variant="ghost" size="sm" className="text-sm">
            View all notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

// Form in popover
export const FormInPopover: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Handle form submission
      console.log({ name, email, message });
      setOpen(false);
      // Reset form
      setName('');
      setEmail('');
      setMessage('');
    };
    
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="gap-1">
            <Plus className="h-4 w-4" />
            Add New Item
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" align="start">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Add New Item</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 w-6 p-0"
                onClick={() => setOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter name"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter email"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter your message"
                  rows={3}
                  required
                />
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" size="sm">
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    );
  },
};

// Tooltip-like popover
export const TooltipExample: Story = {
  render: () => (
    <div className="flex items-center justify-center space-x-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon">
            <Info className="h-5 w-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-3 text-sm" side="right" align="start">
          <p>This is a helpful tip or additional information about the feature.</p>
        </PopoverContent>
      </Popover>
      
      <span>Hover over the icon to see the tooltip</span>
    </div>
  ),
};

// Settings menu popover
export const SettingsMenu: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-2" align="end">
        <div className="space-y-1">
          <Button variant="ghost" className="w-full justify-start">
            <User className="mr-2 h-4 w-4" />
            Profile
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <CreditCard className="mr-2 h-4 w-4" />
            Billing
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <LifeBuoy className="mr-2 h-4 w-4" />
            Support
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

// Status selector
export const StatusSelector: Story = {
  render: () => {
    const statuses = [
      { value: 'backlog', label: 'Backlog', color: 'bg-gray-400' },
      { value: 'todo', label: 'Todo', color: 'bg-blue-400' },
      { value: 'in-progress', label: 'In Progress', color: 'bg-yellow-400' },
      { value: 'done', label: 'Done', color: 'bg-green-400' },
      { value: 'cancelled', label: 'Cancelled', color: 'bg-red-400' },
    ];
    
    const [selectedStatus, setSelectedStatus] = useState(statuses[1]);
    const [open, setOpen] = useState(false);
    
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            <div className="flex items-center">
              <div className={`mr-2 h-2 w-2 rounded-full ${selectedStatus.color}`} />
              {selectedStatus.label}
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <div className="py-1">
            {statuses.map((status) => (
              <div
                key={status.value}
                className={cn(
                  "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
                  selectedStatus.value === status.value && "bg-accent"
                )}
                onClick={() => {
                  setSelectedStatus(status);
                  setOpen(false);
                }}
              >
                <div className={`mr-2 h-2 w-2 rounded-full ${status.color}`} />
                {status.label}
                {selectedStatus.value === status.value && (
                  <Check className="ml-auto h-4 w-4" />
                )}
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    );
  },
};

// Popover with form validation
export const WithFormValidation: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    
    const validateEmail = (email: string) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    };
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      if (!email) {
        setError('Email is required');
        return;
      }
      
      if (!validateEmail(email)) {
        setError('Please enter a valid email address');
        return;
      }
      
      // Form is valid, proceed with submission
      console.log('Subscribing with email:', email);
      setEmail('');
      setError('');
      setOpen(false);
    };
    
    return (
      <Popover open={open} onOpenChange={(isOpen) => {
        if (!isOpen) {
          setError('');
        }
        setOpen(isOpen);
      }}>
        <PopoverTrigger asChild>
          <Button variant="outline">Subscribe to Newsletter</Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Subscribe</h4>
              <p className="text-sm text-muted-foreground">
                Get the latest updates and news.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="space-y-1">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  className={`flex h-10 w-full rounded-md border ${
                    error ? 'border-red-500' : 'border-input'
                  } bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`}
                  placeholder="Enter your email"
                />
                {error && (
                  <p className="text-sm text-red-500">{error}</p>
                )}
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" size="sm">
                  Subscribe
                </Button>
              </div>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    );
  },
};
