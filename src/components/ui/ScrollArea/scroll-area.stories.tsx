import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScrollArea, ScrollBar } from './scroll-area';
import { cn } from '../../../lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../Avatar/avatar';
import { Button } from '../Button/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../Card/card';
import { Separator } from '../Separator/separator';
import { Badge } from '../Badge/badge';
import { Check, ChevronDown, ChevronUp, Filter, Search } from 'lucide-react';
import React from 'react';

const meta: Meta<typeof ScrollArea> = {
  title: 'Components/Scroll Area',
  component: ScrollArea,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof ScrollArea>;

// Basic scroll area
export const Basic: Story = {
  render: () => (
    <div className="w-[300px] space-y-4">
      <h3 className="text-sm font-medium">Recent Activity</h3>
      <ScrollArea className="h-[200px] w-full rounded-md border p-4">
        <div className="space-y-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex items-start space-x-3">
              <div className="h-2 w-2 mt-1.5 rounded-full bg-primary" />
              <div>
                <p className="text-sm font-medium">Update #{i + 1}</p>
                <p className="text-sm text-muted-foreground">
                  This is a sample update message that might be longer and need to wrap to the next line.
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {i + 1} hour ago
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  ),
};

// Horizontal scroll
export const Horizontal: Story = {
  render: () => (
    <div className="w-[500px] space-y-4">
      <h3 className="text-sm font-medium">Featured Products</h3>
      <ScrollArea className="w-full">
        <div className="flex space-x-4 pb-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div 
              key={i}
              className="flex-shrink-0 w-[150px] h-[200px] rounded-lg bg-muted flex items-center justify-center"
            >
              <p className="text-muted-foreground">Product {i + 1}</p>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  ),
};

// With custom scrollbar
export const CustomScrollbar: Story = {
  render: () => (
    <div className="w-[400px] space-y-4">
      <h3 className="text-sm font-medium">Team Members</h3>
      <ScrollArea className="h-[300px] w-full rounded-md border">
        <div className="p-4">
          <div className="space-y-4">
            {[
              { name: 'John Doe', email: 'john@example.com', role: 'Admin', avatar: 'JD' },
              { name: 'Jane Smith', email: 'jane@example.com', role: 'Developer', avatar: 'JS' },
              { name: 'Robert Johnson', email: 'robert@example.com', role: 'Designer', avatar: 'RJ' },
              { name: 'Emily Davis', email: 'emily@example.com', role: 'Developer', avatar: 'ED' },
              { name: 'Michael Wilson', email: 'michael@example.com', role: 'Product Manager', avatar: 'MW' },
              { name: 'Sarah Brown', email: 'sarah@example.com', role: 'QA Engineer', avatar: 'SB' },
              { name: 'David Lee', email: 'david@example.com', role: 'DevOps', avatar: 'DL' },
              { name: 'Lisa Wang', email: 'lisa@example.com', role: 'UX Designer', avatar: 'LW' },
            ].map((user, i) => (
              <div key={i} className="flex items-center space-x-4 p-2 hover:bg-muted/50 rounded-md">
                <Avatar>
                  <AvatarFallback>{user.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {user.role}
                </Badge>
              </div>
            ))}
          </div>
        </div>
        <ScrollBar className="w-2" />
      </ScrollArea>
    </div>
  ),
};

// With table
export const WithTable: Story = {
  render: () => (
    <div className="w-[600px]">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>View and manage recent orders</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="h-8">
                <Filter className="mr-2 h-3.5 w-3.5" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="h-8">
                <Search className="mr-2 h-3.5 w-3.5" />
                Search
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[300px] w-full">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Order</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Customer</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                  <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Total</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {Array.from({ length: 20 }).map((_, i) => {
                  const statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
                  const status = statuses[Math.floor(Math.random() * statuses.length)];
                  const statusColors = {
                    pending: 'bg-yellow-100 text-yellow-800',
                    processing: 'bg-blue-100 text-blue-800',
                    shipped: 'bg-purple-100 text-purple-800',
                    delivered: 'bg-green-100 text-green-800',
                    cancelled: 'bg-red-100 text-red-800',
                  };
                  
                  return (
                    <tr key={i} className="border-b transition-colors hover:bg-muted/50">
                      <td className="p-4 align-middle font-medium">#{(1000 + i).toString().padStart(4, '0')}</td>
                      <td className="p-4 align-middle">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{`U${i + 1}`}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">Customer {i + 1}</p>
                            <p className="text-xs text-muted-foreground">customer{i + 1}@example.com</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="flex items-center">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[status as keyof typeof statusColors]}`}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-right align-middle font-medium">
                        ${(Math.random() * 1000).toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </ScrollArea>
        </CardContent>
        <CardFooter className="flex items-center justify-between border-t px-6 py-3">
          <div className="text-sm text-muted-foreground">
            Showing <strong>1-10</strong> of <strong>20</strong> orders
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  ),
};

// With collapsible sections
export const WithCollapsibleSections: Story = {
  render: () => {
    const [expandedSections, setExpandedSections] = React.useState<Record<string, boolean>>({
      'getting-started': true,
      'components': false,
      'api': false,
    });
    
    const toggleSection = (section: string) => {
      setExpandedSections(prev => ({
        ...prev,
        [section]: !prev[section]
      }));
    };
    
    const sections = [
      {
        id: 'getting-started',
        title: 'Getting Started',
        items: [
          'Installation',
          'Introduction',
          'Theming',
          'Dark Mode',
          'Accessibility'
        ]
      },
      {
        id: 'components',
        title: 'Components',
        items: [
          'Button',
          'Input',
          'Dropdown Menu',
          'Dialog',
          'Alert Dialog',
          'Toast',
          'Tooltip',
          'Popover',
          'Tabs',
          'Accordion',
          'Checkbox',
          'Radio Group',
          'Select',
          'Switch',
          'Slider',
          'Table',
          'Card',
          'Form',
          'Alert',
          'Badge',
          'Avatar',
          'Progress',
          'Skeleton',
          'Separator',
          'Label',
          'Sheet',
          'Calendar',
          'Date Picker',
          'Command',
          'Context Menu',
          'Dropdown Menu',
          'Hover Card',
          'Menubar',
          'Navigation Menu',
          'Pagination',
          'Scroll Area',
          'Tabs',
          'Textarea',
          'Toggle',
          'Toggle Group',
          'Tooltip',
        ]
      },
      {
        id: 'api',
        title: 'API Reference',
        items: [
          'Introduction',
          'Components',
          'Hooks',
          'Utils',
          'Theming',
          'CLI',
          'Changelog'
        ]
      }
    ];
    
    return (
      <div className="w-[300px] rounded-lg border">
        <div className="flex items-center justify-between border-b p-4">
          <h3 className="text-lg font-semibold">Documentation</h3>
          <Button variant="ghost" size="sm" className="h-8">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>
        <ScrollArea className="h-[400px] w-full">
          <div className="p-2">
            {sections.map((section) => (
              <div key={section.id} className="mb-2">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="flex w-full items-center justify-between rounded-md px-2 py-2 text-sm font-medium hover:bg-muted/50"
                >
                  <span>{section.title}</span>
                  {expandedSections[section.id] ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
                {expandedSections[section.id] && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-muted pl-3">
                    {section.items.map((item, i) => (
                      <a
                        key={i}
                        href="#"
                        className="group flex items-center rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                      >
                        <span className="truncate">{item}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    );
  },
};

// With chat interface
export const ChatInterface: Story = {
  render: () => {
    const messages = [
      { id: 1, sender: 'John', text: 'Hey, how are you?', time: '10:30 AM', isMe: false },
      { id: 2, sender: 'You', text: 'I\'m doing great, thanks for asking! How about you?', time: '10:31 AM', isMe: true },
      { id: 3, sender: 'John', text: 'I\'m good too! Just working on some projects.', time: '10:32 AM', isMe: false },
      { id: 4, sender: 'John', text: 'Have you had a chance to look at the design mockups I sent?', time: '10:33 AM', isMe: false },
      { id: 5, sender: 'You', text: 'Yes, I went through them yesterday. They look amazing!', time: '10:35 AM', isMe: true },
      { id: 6, sender: 'You', text: 'I especially love the new color scheme and layout.', time: '10:35 AM', isMe: true },
      { id: 7, sender: 'John', text: 'Great! I was a bit unsure about the color choices, but I\'m glad you like them.', time: '10:37 AM', isMe: false },
      { id: 8, sender: 'John', text: 'Do you have any feedback or suggestions for improvements?', time: '10:37 AM', isMe: false },
      { id: 9, sender: 'You', text: 'I was thinking we could make the call-to-action buttons more prominent.', time: '10:40 AM', isMe: true },
      { id: 10, sender: 'You', text: 'Also, the font size in the pricing table could be a bit larger for better readability.', time: '10:41 AM', isMe: true },
      { id: 11, sender: 'John', text: 'Those are great suggestions! I\'ll make those changes and send you an updated version.', time: '10:43 AM', isMe: false },
      { id: 12, sender: 'You', text: 'Perfect, looking forward to seeing the updates!', time: '10:45 AM', isMe: true },
      { id: 13, sender: 'John', text: 'I should have them ready by tomorrow. Thanks for the feedback!', time: '10:46 AM', isMe: false },
    ];
    
    return (
      <div className="flex h-[500px] w-[400px] flex-col rounded-lg border bg-card">
        <div className="border-b p-4">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">John Doe</h3>
              <p className="text-xs text-muted-foreground">Online</p>
            </div>
          </div>
        </div>
        
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex max-w-[80%]",
                  message.isMe ? "ml-auto justify-end" : "mr-auto"
                )}
              >
                <div
                  className={cn(
                    "rounded-lg px-4 py-2",
                    message.isMe
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  {!message.isMe && (
                    <p className="text-xs font-medium">{message.sender}</p>
                  )}
                  <p>{message.text}</p>
                  <p
                    className={cn(
                      "mt-0.5 text-xs",
                      message.isMe
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground"
                    )}
                  >
                    {message.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <div className="border-t p-4">
          <div className="relative
">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <Button
              type="submit"
              size="sm"
              className="absolute right-1 top-1/2 h-8 -translate-y-1/2"
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    );
  },
};

// With infinite scroll
export const WithInfiniteScroll: Story = {
  render: () => {
    const [items, setItems] = React.useState(Array.from({ length: 20 }, (_, i) => i + 1));
    const [isLoading, setIsLoading] = React.useState(false);
    const [hasMore, setHasMore] = React.useState(true);
    
    const loadMore = () => {
      if (isLoading || !hasMore) return;
      
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        const newItems = Array.from({ length: 10 }, (_, i) => items.length + i + 1);
        setItems(prev => [...prev, ...newItems]);
        
        // Stop loading more if we've reached 50 items
        if (items.length + 10 >= 50) {
          setHasMore(false);
        }
        
        setIsLoading(false);
      }, 1000);
    };
    
    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
      
      // Load more when scrolled to bottom
      if (scrollHeight - scrollTop <= clientHeight + 100) {
        loadMore();
      }
    };
    
    return (
      <div className="w-[400px] rounded-lg border">
        <div className="border-b p-4">
          <h3 className="text-lg font-medium">Infinite Scroll</h3>
          <p className="text-sm text-muted-foreground">
            Scroll down to load more items
          </p>
        </div>
        
        <ScrollArea 
          className="h-[400px] w-full"
          onScroll={handleScroll}
        >
          <div className="p-4">
            {items.map((item) => (
              <div 
                key={item}
                className="mb-2 rounded-md border p-4 hover:bg-muted/50"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Item #{item}</h4>
                    <p className="text-sm text-muted-foreground">
                      This is item number {item}
                    </p>
                  </div>
                  <Badge variant="outline">
                    #{item}
                  </Badge>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-center py-4">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              </div>
            )}
            
            {!hasMore && (
              <div className="py-4 text-center text-sm text-muted-foreground">
                No more items to load
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    );
  },
};
