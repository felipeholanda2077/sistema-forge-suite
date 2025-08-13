import type { Meta, StoryObj } from '@storybook/react-vite';
import { LineChart, BarChart, PieChart, AreaChart, RadarChart } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../Card/card';
import { Button } from '../Button/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../Tabs/tabs';
import { ArrowUp, ArrowDown, TrendingUp, BarChart as BarChartIcon, PieChart as PieChartIcon, LineChart as LineChartIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const meta: Meta<typeof LineChart> = {
  title: 'Components/Chart',
  component: LineChart,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};


export default meta;
type Story = StoryObj<typeof LineChart>;

// Sample data for charts
const lineChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'Revenue',
      data: [65000, 59000, 80000, 81000, 86000, 85000, 90000],
      borderColor: 'hsl(var(--primary))',
      backgroundColor: 'hsl(var(--primary) / 0.1)',
      tension: 0.4,
      fill: true,
    },
    {
      label: 'Expenses',
      data: [28000, 48000, 40000, 19000, 86000, 27000, 35000],
      borderColor: 'hsl(var(--destructive))',
      backgroundColor: 'hsl(var(--destructive) / 0.1)',
      tension: 0.4,
      fill: true,
    },
  ],
};

const barChartData = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  datasets: [
    {
      label: '2023',
      data: [540, 325, 702, 620],
      backgroundColor: 'hsl(var(--primary))',
      borderRadius: 4,
    },
    {
      label: '2024',
      data: [600, 480, 800, 790],
      backgroundColor: 'hsl(var(--muted-foreground) / 0.5)',
      borderRadius: 4,
    },
  ],
};

const pieChartData = {
  labels: ['Desktop', 'Mobile', 'Tablet'],
  datasets: [
    {
      data: [63, 30, 7],
      backgroundColor: [
        'hsl(var(--primary))',
        'hsl(var(--primary) / 0.7)',
        'hsl(var(--primary) / 0.4)',
      ],
      borderWidth: 0,
    },
  ],
};

const areaChartData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Active Users',
      data: [1200, 1900, 1500, 2800, 2200, 3000, 2500],
      borderColor: 'hsl(var(--primary))',
      backgroundColor: 'hsl(var(--primary) / 0.2)',
      tension: 0.4,
      fill: true,
    },
  ],
};

const radarChartData = {
  labels: ['Design', 'Development', 'Marketing', 'Sales', 'Support', 'HR'],
  datasets: [
    {
      label: 'Team A',
      data: [65, 59, 90, 81, 56, 55],
      backgroundColor: 'hsl(var(--primary) / 0.2)',
      borderColor: 'hsl(var(--primary))',
      pointBackgroundColor: 'hsl(var(--primary))',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'hsl(var(--primary))',
    },
    {
      label: 'Team B',
      data: [28, 48, 40, 19, 96, 27],
      backgroundColor: 'hsl(var(--muted-foreground) / 0.1)',
      borderColor: 'hsl(var(--muted-foreground))',
      pointBackgroundColor: 'hsl(var(--muted-foreground))',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'hsl(var(--muted-foreground))',
    },
  ],
};

// Line chart with trend indicator
export const Line: Story = {
  render: () => {
    const total = lineChartData.datasets[0].data.reduce((a, b) => a + b, 0);
    const change = ((lineChartData.datasets[0].data[6] - lineChartData.datasets[0].data[0]) / lineChartData.datasets[0].data[0]) * 100;
    
    return (
      <Card className="w-[600px]">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base font-medium">Revenue Overview</CardTitle>
          <Button variant="outline" size="sm" className="h-7 gap-1 text-sm">
            View All
            <ArrowUp className="h-3.5 w-3.5" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-2 mb-4">
            <div className="text-3xl font-bold">${(total / 1000).toFixed(1)}k</div>
            <div className={cn(
              "flex items-center text-sm font-medium",
              change >= 0 ? "text-green-500" : "text-red-500"
            )}>
              {change >= 0 ? (
                <ArrowUp className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDown className="h-4 w-4 mr-1" />
              )}
              {Math.abs(change).toFixed(1)}%
            </div>
            <div className="text-sm text-muted-foreground ml-auto">vs last 6 months</div>
          </div>
          <div className="h-[300px]">
            <LineChart data={lineChartData} />
          </div>
        </CardContent>
      </Card>
    );
  },
};

// Bar chart with comparison
export const Bar: Story = {
  render: () => (
    <Card className="w-[600px]">
      <CardHeader>
        <CardTitle>Quarterly Sales</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <BarChart 
            data={barChartData} 
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                  grid: {
                    color: 'hsl(var(--border))',
                  },
                  ticks: {
                    callback: function(value) {
                      return '$' + value + 'k';
                    },
                  },
                },
                x: {
                  grid: {
                    display: false,
                  },
                },
              },
              plugins: {
                legend: {
                  position: 'top' as const,
                },
                tooltip: {
                  callbacks: {
                    label: function(context) {
                      return context.dataset.label + ': $' + context.parsed.y + 'k';
                    },
                  },
                },
              },
            }}
          />
        </div>
      </CardContent>
    </Card>
  ),
};

// Pie chart with legend
export const Pie: Story = {
  render: () => (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>Traffic Sources</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center gap-8">
        <div className="w-[200px] h-[200px]">
          <PieChart 
            data={pieChartData} 
            options={{
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
        </div>
        <div className="space-y-4">
          {pieChartData.labels.map((label, index) => (
            <div key={label} className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ 
                  backgroundColor: pieChartData.datasets[0].backgroundColor[index] 
                }} 
              />
              <span className="text-sm font-medium">{label}</span>
              <span className="ml-auto text-sm text-muted-foreground">
                {pieChartData.datasets[0].data[index]}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  ),
};

// Area chart with gradient
export const Area: Story = {
  render: () => (
    <Card className="w-[600px]">
      <CardHeader>
        <CardTitle>Weekly Active Users</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <AreaChart 
            data={areaChartData} 
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                  grid: {
                    color: 'hsl(var(--border))',
                  },
                },
                x: {
                  grid: {
                    display: false,
                  },
                },
              },
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
        </div>
      </CardContent>
    </Card>
  ),
};

// Radar chart for skill assessment
export const Radar: Story = {
  render: () => (
    <Card className="w-[600px]">
      <CardHeader>
        <CardTitle>Team Skills Assessment</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <RadarChart 
            data={radarChartData} 
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                r: {
                  angleLines: {
                    color: 'hsl(var(--border))',
                  },
                  grid: {
                    color: 'hsl(var(--border))',
                  },
                  pointLabels: {
                    color: 'hsl(var(--foreground))',
                  },
                  ticks: {
                    display: false,
                    beginAtZero: true,
                  },
                },
              },
              plugins: {
                legend: {
                  position: 'top' as const,
                },
              },
            }}
          />
        </div>
      </CardContent>
    </Card>
  ),
};

// Dashboard with multiple charts
export const Dashboard: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">+180.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-muted-foreground">+19% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">+201 since last hour</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px]">
              <BarChart data={barChartData} />
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>You made 265 sales this month.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={`/avatars/0${i}.png`} alt="Avatar" />
                    <AvatarFallback>OM</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Olivia Martin</p>
                    <p className="text-sm text-muted-foreground">olivia.martin@email.com</p>
                  </div>
                  <div className="ml-auto font-medium">+$1,999.00</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue by Category</CardTitle>
            <PieChartIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <PieChart data={pieChartData} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                  </div>
                  <div className="ml-auto text-xs text-muted-foreground">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  ),
};

// Sample data for dashboard
const recentActivity = [
  {
    title: "New project",
    description: "Team Dashboard UI",
    time: "Just now",
  },
  {
    title: "Updated project",
    description: "Fixed responsive issues",
    time: "2 hours ago",
  },
  {
    title: "Added new feature",
    description: "Dark mode support",
    time: "1 day ago",
  },
  {
    title: "Fixed bug",
    description: "Login form validation",
    time: "2 days ago",
  },
  {
    title: "Updated dependencies",
    description: "React 18 migration",
    time: "1 week ago",
  },
];

// Add missing icon components
function DollarSign(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="12" y1="2" x2="12" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function Users(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function CreditCard(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );
}

function Activity(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}

function Avatar({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)} {...props}>
      {props.children}
    </div>
  );
}

interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
}

function AvatarImage({ src, alt, className, ...props }: AvatarImageProps) {
  return (
    <img 
      src={src} 
      alt={alt} 
      className={cn("aspect-square h-full w-full", className)} 
      {...props} 
    />
  );
}

function AvatarFallback({ children }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="flex h-full w-full items-center justify-center rounded-full bg-muted">
      {children || 'U'}
    </div>
  );
}

// Add missing CardDescription component
function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("text-sm text-muted-foreground", className)} {...props} />;
}
