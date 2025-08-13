import type { Meta, StoryObj } from '@storybook/react-vite';
// Import Recharts components
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Recharts component props
type LineChartProps = React.ComponentProps<typeof LineChart>;
type BarChartProps = React.ComponentProps<typeof BarChart>;
type PieChartProps = React.ComponentProps<typeof PieChart>;
type AreaChartProps = React.ComponentProps<typeof AreaChart>;
type RadarProps = React.ComponentProps<typeof Radar>;
type LineProps = React.ComponentProps<typeof Line>;
type BarProps = React.ComponentProps<typeof Bar>;
type PieProps = React.ComponentProps<typeof Pie>;
type AreaProps = React.ComponentProps<typeof Area>;
type CellProps = React.ComponentProps<typeof Cell>;
type XAxisProps = React.ComponentProps<typeof XAxis>;
type YAxisProps = React.ComponentProps<typeof YAxis>;
type CartesianGridProps = React.ComponentProps<typeof CartesianGrid>;
type TooltipProps = React.ComponentProps<typeof Tooltip>;
type LegendProps = React.ComponentProps<typeof Legend>;
type ResponsiveContainerProps = React.ComponentProps<typeof ResponsiveContainer>;
import { Card, CardContent, CardHeader, CardTitle } from '../Card/card';
import { Button } from '../Button/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../Tabs/tabs';
import { ArrowUp, ArrowDown, TrendingUp, BarChart as BarChartIcon, PieChart as PieChartIcon, LineChart as LineChartIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

// Define the meta configuration for Storybook
const meta = {
  title: 'Components/Chart',
  component: LineChart,
  tags: ['autodocs'] as const,
  parameters: {
    layout: 'centered' as const,
  },
  // Add argTypes for better controls in Storybook
  argTypes: {
    width: { control: 'number' },
    height: { control: 'number' },
    data: { control: 'object' },
    margin: { control: 'object' },
  },
} satisfies Meta<typeof LineChart>;

export default meta;

type Story = StoryObj<typeof meta>;

// Types for chart data
type ChartData = Array<{
  name: string;
  [key: string]: string | number;
}>;

// Type for pie chart data
type PieChartData = Array<{
  name: string;
  value: number;
  color?: string;
}>;

// Colors for charts
const COLORS = [
  'hsl(var(--primary))',
  'hsl(var(--muted-foreground))',
  'hsl(var(--accent))',
  'hsl(var(--primary))',
  'hsl(var(--muted-foreground))',
  'hsl(var(--accent))',
];

// Sample data for charts
const lineChartData = [
  {
    name: 'Jan',
    Revenue: 65000,
    Expenses: 28000,
  },
  {
    name: 'Feb',
    Revenue: 59000,
    Expenses: 48000,
  },
  {
    name: 'Mar',
    Revenue: 80000,
    Expenses: 40000,
  },
  {
    name: 'Apr',
    Revenue: 81000,
    Expenses: 19000,
  },
  {
    name: 'May',
    Revenue: 86000,
    Expenses: 86000,
  },
  {
    name: 'Jun',
    Revenue: 85000,
    Expenses: 27000,
  },
  {
    name: 'Jul',
    Revenue: 90000,
    Expenses: 35000,
  },
];

const barChartData = [
  {
    name: 'Q1',
    '2023': 540,
    '2024': 620,
  },
  {
    name: 'Q2',
    '2023': 325,
    '2024': 480,
  },
  {
    name: 'Q3',
    '2023': 702,
    '2024': 650,
  },
  {
    name: 'Q4',
    '2023': 620,
    '2024': 900,
  },
];

const pieChartData: PieChartData = [
  { name: 'Desktop', value: 63, color: 'hsl(var(--primary))' },
  { name: 'Mobile', value: 27, color: 'hsl(var(--muted-foreground))' },
  { name: 'Tablet', value: 10, color: 'hsl(var(--accent))' },
];

const pieChartColors = pieChartData.map(item => item.color);

const areaChartData = [
  { name: 'Mon', Users: 120 },
  { name: 'Tue', Users: 190 },
  { name: 'Wed', Users: 300 },
  { name: 'Thu', Users: 500 },
  { name: 'Fri', Users: 200 },
  { name: 'Sat', Users: 300 },
  { name: 'Sun', Users: 400 },
];

const radarChartData = [
  { subject: 'Design', 'Skill Level': 90, 'Team Average': 65 },
  { subject: 'Development', 'Skill Level': 85, 'Team Average': 75 },
  { subject: 'Marketing', 'Skill Level': 80, 'Team Average': 60 },
  { subject: 'Sales', 'Skill Level': 75, 'Team Average': 70 },
  { subject: 'Support', 'Skill Level': 70, 'Team Average': 80 },
  { subject: 'HR', 'Skill Level': 65, 'Team Average': 55 },
];

const radarChartColors = {
  'Skill Level': 'hsl(var(--primary))',
  'Team Average': 'hsl(var(--muted-foreground))',
};

// Helper function to safely sum chart data
const sumChartData = (data: readonly number[]): number => {
  return data.reduce((sum, point) => sum + point, 0);
};

// Type to make all properties mutable
type Mutable<T> = {
  -readonly [P in keyof T]: T[P] extends readonly (infer U)[] ? U[] : T[P];
};

// Line chart with trend indicator
export const LineChartExample: Story = {
  args: {
    width: 600,
    height: 300,
  },
  render: (args) => {
    // Calculate total and change for the first data series (Revenue)
    const firstValue = lineChartData[0].Revenue;
    const lastValue = lineChartData[lineChartData.length - 1].Revenue;
    const total = lineChartData.reduce((sum, point) => sum + point.Revenue, 0);
    const change = ((lastValue - firstValue) / Math.max(1, firstValue)) * 100;
    
    // The data is already in the correct format for Recharts
    const chartData = [...lineChartData];
    
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
            <LineChart
              width={args.width}
              height={args.height}
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  borderColor: 'hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                }}
              />
              <Line
                type="monotone"
                dataKey="Revenue"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
              <Line
                type="monotone"
                dataKey="Expenses"
                stroke="hsl(var(--muted-foreground))"
                strokeWidth={2}
                dot={false}
                strokeDasharray="5 5"
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </LineChart>
          </div>
        </CardContent>
      </Card>
    );
  },
};

// Bar chart with comparison
export const BarChartExample: Story = {
  render: () => (
    <Card className="w-[600px]">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Quarterly Revenue</CardTitle>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-primary mr-2" />
              <span className="text-sm">2023</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-muted-foreground mr-2" />
              <span className="text-sm">2024</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={barChartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                tickFormatter={(value) => `$${value}K`}
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                formatter={(value) => [`$${value}K`, 'Revenue']}
                labelFormatter={(label) => `Quarter ${label}`}
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  borderColor: 'hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                }}
              />
              <Bar dataKey="2023" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]}>
                {barChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill="hsl(var(--primary))" />
                ))}
              </Bar>
              <Bar dataKey="2024" fill="hsl(var(--muted-foreground))" radius={[4, 4, 0, 0]}>
                {barChartData.map((entry, index) => (
                  <Cell key={`cell-${index}-2024`} fill="hsl(var(--muted-foreground))" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  ),
};

// Pie chart with legend
export const PieChartExample: Story = {
  render: () => {
    const total = pieChartData.reduce((sum, item) => sum + item.value, 0);
    
    return (
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>Traffic Sources</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center gap-8">
          <div className="w-[200px] h-[200px]">
            <PieChart width={200} height={200}>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                nameKey="name"
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number, name: string) => {
                  const percentage = ((value / total) * 100).toFixed(1);
                  return [`${value} (${percentage}%)`, name];
                }}
              />
            </PieChart>
          </div>
          <div className="space-y-4">
            {pieChartData.map((item, index) => (
              <div key={item.name} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ 
                    backgroundColor: item.color
                  }} 
                />
                <span className="text-sm font-medium">{item.name}</span>
                <span className="ml-auto text-sm text-muted-foreground">
                  {((item.value / total) * 100).toFixed(0)}%
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  },
};

// Area chart with gradient
export const AreaChartExample: Story = {
  render: () => (
    <Card className="w-[600px]">
      <CardHeader>
        <CardTitle>Weekly Active Users</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={areaChartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="name" 
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                axisLine={false}
                tickLine={false}
              />
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  borderColor: 'hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                }}
              />
              <Area 
                type="monotone" 
                dataKey="Users" 
                stroke="hsl(var(--primary))" 
                fillOpacity={1} 
                fill="url(#colorUsers)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  ),
};

// Radar chart for skill assessment
export const RadarChartExample: Story = {
  render: () => (
    <Card className="w-[600px]">
      <CardHeader>
        <CardTitle>Team Skills Assessment</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarChartData}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis 
                dataKey="subject" 
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <PolarRadiusAxis 
                angle={30} 
                domain={[0, 100]}
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  borderColor: 'hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                }}
              />
              <Legend />
              <Radar 
                name="Skill Level" 
                dataKey="Skill Level" 
                stroke="hsl(var(--primary))" 
                fill="hsl(var(--primary))" 
                fillOpacity={0.3} 
              />
              <Radar 
                name="Team Average" 
                dataKey="Team Average" 
                stroke="hsl(var(--muted-foreground))" 
                fill="hsl(var(--muted-foreground))" 
                fillOpacity={0.3} 
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  ),
};

// Dashboard with multiple charts
export const DashboardExample: Story = {
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
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      borderColor: 'hsl(var(--border))',
                      borderRadius: 'var(--radius)',
                    }}
                  />
                  <Legend />
                  <Bar dataKey="Revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Expenses" fill="hsl(var(--muted-foreground))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
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
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      borderColor: 'hsl(var(--border))',
                      borderRadius: 'var(--radius)',
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
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
