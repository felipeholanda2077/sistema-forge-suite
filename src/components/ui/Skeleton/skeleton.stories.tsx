import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton } from './skeleton';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../Card/card';
import { Avatar, AvatarFallback, AvatarImage } from '../Avatar/avatar';
import { Button } from '../Button/button';
import { useState, useEffect } from 'react';
import { Badge } from '../Badge/badge';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

// Basic skeleton loader
export const Basic: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  ),
};

// Card skeleton
export const CardSkeleton: Story = {
  render: () => (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  ),
};

// Profile card with skeleton
export const ProfileCard: Story = {
  render: () => {
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }, []);
    
    return (
      <Card className="w-[350px]">
        <CardHeader className="items-center">
          {isLoading ? (
            <Skeleton className="h-20 w-20 rounded-full" />
          ) : (
            <Avatar className="h-20 w-20">
              <AvatarImage src="https://github.com/shadcn.png" alt="Profile" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          )}
          <div className="w-full space-y-2 text-center">
            {isLoading ? (
              <>
                <Skeleton className="mx-auto h-6 w-3/4" />
                <Skeleton className="mx-auto h-4 w-1/2" />
              </>
            ) : (
              <>
                <CardTitle className="text-xl">John Doe</CardTitle>
                <CardDescription>Frontend Developer</CardDescription>
              </>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Email</span>
              {isLoading ? (
                <Skeleton className="h-4 w-32" />
              ) : (
                <span className="text-sm">john@example.com</span>
              )}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Location</span>
              {isLoading ? (
                <Skeleton className="h-4 w-24" />
              ) : (
                <span className="text-sm">San Francisco, CA</span>
              )}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Joined</span>
              {isLoading ? (
                <Skeleton className="h-4 w-20" />
              ) : (
                <span className="text-sm">January 2023</span>
              )}
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-14 rounded-full" />
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              <Badge>React</Badge>
              <Badge variant="secondary">TypeScript</Badge>
              <Badge variant="outline">UI/UX</Badge>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {isLoading ? (
            <Skeleton className="h-9 w-24" />
          ) : (
            <Button variant="outline" size="sm">
              Message
            </Button>
          )}
          {isLoading ? (
            <Skeleton className="h-9 w-16" />
          ) : (
            <Button size="sm">Follow</Button>
          )}
        </CardFooter>
      </Card>
    );
  },
};

// Dashboard with multiple skeletons
export const DashboardLoading: Story = {
  render: () => {
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }, []);
    
    // Stats data
    const stats = [
      { name: 'Total Users', value: '12,345', change: '+12%', changeType: 'increase' },
      { name: 'Revenue', value: '$45,231', change: '+19%', changeType: 'increase' },
      { name: 'Active Now', value: '573', change: '-3%', changeType: 'decrease' },
      { name: 'Conversion', value: '3.2%', change: '+2.1%', changeType: 'increase' },
    ];
    
    // Recent activity data
    const activities = [
      { id: 1, user: 'John Doe', action: 'created a new project', time: '2 minutes ago' },
      { id: 2, user: 'Jane Smith', action: 'updated the dashboard', time: '1 hour ago' },
      { id: 3, user: 'Alex Johnson', action: 'commented on your post', time: '3 hours ago' },
      { id: 4, user: 'Sarah Williams', action: 'shared a document', time: '5 hours ago' },
      { id: 5, user: 'Michael Brown', action: 'assigned you a task', time: '1 day ago' },
    ];
    
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          {isLoading ? (
            <Skeleton className="h-9 w-48" />
          ) : (
            <h1 className="text-2xl font-bold">Dashboard</h1>
          )}
          {isLoading ? (
            <Skeleton className="h-9 w-32" />
          ) : (
            <Button>Generate Report</Button>
          )}
        </div>
        
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                {isLoading ? (
                  <Skeleton className="h-4 w-24" />
                ) : (
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.name}
                  </CardTitle>
                )}
                {!isLoading && (
                  <div className="h-4 w-4 text-muted-foreground">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-8 w-24 mt-2" />
                ) : (
                  <div className="text-2xl font-bold">{stat.value}</div>
                )}
                {!isLoading && (
                  <p className={`text-xs ${
                    stat.changeType === 'increase' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {stat.change} from last month
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          {/* Chart Placeholder */}
          <Card className="col-span-4">
            <CardHeader>
              {isLoading ? (
                <Skeleton className="h-6 w-48" />
              ) : (
                <CardTitle>Overview</CardTitle>
              )}
            </CardHeader>
            <CardContent className="pl-2">
              {isLoading ? (
                <div className="h-[300px] flex items-center justify-center">
                  <Skeleton className="h-[280px] w-full" />
                </div>
              ) : (
                <div className="h-[300px] flex items-center justify-center bg-muted/50 rounded">
                  <p className="text-muted-foreground">Chart will be displayed here</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Recent Activity */}
          <Card className="col-span-3">
            <CardHeader>
              {isLoading ? (
                <Skeleton className="h-6 w-36" />
              ) : (
                <CardTitle>Recent Activity</CardTitle>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {isLoading ? (
                  Array(5).fill(0).map((_, i) => (
                    <div key={i} className="flex items-center">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="ml-4 space-y-1">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                      <Skeleton className="ml-auto h-3 w-12" />
                    </div>
                  ))
                ) : (
                  activities.map((activity) => (
                    <div key={activity.id} className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                        {activity.user.charAt(0)}
                      </div>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {activity.user} {activity.action}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  },
};

// Table with skeleton rows
export const TableLoading: Story = {
  render: () => {
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }, []);
    
    const invoices = [
      { id: 'INV001', customer: 'John Doe', status: 'Paid', amount: '$250.00', date: '2023-06-12' },
      { id: 'INV002', customer: 'Jane Smith', status: 'Pending', amount: '$150.00', date: '2023-06-13' },
      { id: 'INV003', customer: 'Robert Johnson', status: 'Unpaid', amount: '$350.00', date: '2023-06-14' },
      { id: 'INV004', customer: 'Emily Davis', status: 'Paid', amount: '$450.00', date: '2023-06-15' },
      { id: 'INV005', customer: 'Michael Wilson', status: 'Paid', amount: '$550.00', date: '2023-06-16' },
    ];
    
    return (
      <div className="w-full">
        <div className="rounded-md border">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Invoice
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Customer
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Amount
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {isLoading ? (
                  // Skeleton rows
                  Array(5).fill(0).map((_, i) => (
                    <tr key={i} className="border-b transition-colors hover:bg-muted/50">
                      <td className="p-4 align-middle">
                        <Skeleton className="h-4 w-20" />
                      </td>
                      <td className="p-4 align-middle">
                        <Skeleton className="h-4 w-32" />
                      </td>
                      <td className="p-4 align-middle">
                        <Skeleton className="h-6 w-16 rounded-full" />
                      </td>
                      <td className="p-4 align-middle">
                        <Skeleton className="h-4 w-20" />
                      </td>
                      <td className="p-4 align-middle">
                        <Skeleton className="h-4 w-24" />
                      </td>
                    </tr>
                  ))
                ) : (
                  // Actual data rows
                  invoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b transition-colors hover:bg-muted/50">
                      <td className="p-4 font-medium">{invoice.id}</td>
                      <td className="p-4">{invoice.customer}</td>
                      <td className="p-4">
                        <Badge
                          variant={
                            invoice.status === 'Paid' 
                              ? 'default' 
                              : invoice.status === 'Pending' 
                                ? 'secondary' 
                                : 'outline'
                          }
                        >
                          {invoice.status}
                        </Badge>
                      </td>
                      <td className="p-4">{invoice.amount}</td>
                      <td className="p-4">{invoice.date}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        {!isLoading && (
          <div className="flex items-center justify-end space-x-2 py-4">
            <Button variant="outline" size="sm">
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        )}
      </div>
    );
  },
};

// Custom skeleton with animation
export const Animated: Story = {
  render: () => {
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }, []);
    
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          {isLoading ? (
            <Skeleton className="h-12 w-12 rounded-full" />
          ) : (
            <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white font-bold">
              JD
            </div>
          )}
          <div className="space-y-2 flex-1">
            {isLoading ? (
              <Skeleton className="h-4 w-3/4" />
            ) : (
              <h3 className="font-medium">John Doe</h3>
            )}
            {isLoading ? (
              <Skeleton className="h-3 w-1/2" />
            ) : (
              <p className="text-sm text-muted-foreground">Frontend Developer</p>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          {isLoading ? (
            <Skeleton className="h-4 w-full" />
          ) : (
            <p>This is a post content that will be displayed when loading is complete.</p>
          )}
          
          {isLoading ? (
            <div className="flex gap-2">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-24" />
            </div>
          ) : (
            <div className="flex gap-2 pt-2">
              <Button variant="outline" size="sm">Like</Button>
              <Button variant="outline" size="sm">Comment</Button>
              <Button variant="outline" size="sm">Share</Button>
            </div>
          )}
        </div>
        
        <div className="pt-4">
          {isLoading ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-16 w-full" />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                  JS
                </div>
                <span className="text-sm font-medium">Jane Smith</span>
              </div>
              <p className="text-sm">
                This is a great post! I really enjoyed reading it. The content is very informative and well-structured.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  },
};
