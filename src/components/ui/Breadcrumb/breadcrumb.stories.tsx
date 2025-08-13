/* eslint-disable storybook/no-renderer-packages */
import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from './breadcrumb';
import { Home, ChevronRight } from 'lucide-react';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

// Basic breadcrumb
export const Basic: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Products</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>Current Page</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};

// With icons
export const WithIcons: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#" className="flex items-center gap-1">
            <Home className="h-4 w-4" />
            <span>Home</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <ChevronRight className="h-4 w-4" />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Documents</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <ChevronRight className="h-4 w-4" />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>Documentation</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};

// Custom separator
export const CustomSeparator: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-muted-foreground">→</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Settings</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-muted-foreground">→</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>Account</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};

// With dropdown menu
export const WithDropdown: Story = {
  render: () => {
    // In a real app, you would import and use the DropdownMenu component
    const DropdownMenu = ({ children }: { children: React.ReactNode }) => (
      <div className="relative inline-block">
        <div className="group inline-flex items-center">
          <button className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Settings
          </button>
          <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground group-hover:text-foreground" />
          <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute top-full left-0 mt-1 w-48 bg-popover border rounded-md shadow-lg z-10 transition-opacity">
            <div className="py-1">
              <a href="#" className="block px-4 py-2 text-sm hover:bg-accent">Profile</a>
              <a href="#" className="block px-4 py-2 text-sm hover:bg-accent">Billing</a>
              <a href="#" className="block px-4 py-2 text-sm hover:bg-accent">Team</a>
              <a href="#" className="block px-4 py-2 text-sm hover:bg-accent">Subscription</a>
            </div>
          </div>
        </div>
      </div>
    );

    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbItem>
            <DropdownMenu children={''} />
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Team</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  },
};

// Responsive breadcrumb
export const Responsive: Story = {
  render: () => (
    <div className="max-w-md mx-auto">
      <Breadcrumb>
        <BreadcrumbList className="flex flex-wrap items-center gap-1">
          <BreadcrumbItem>
            <BreadcrumbLink href="#" className="text-sm">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-muted-foreground">/</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="#" className="text-sm">E-commerce</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-muted-foreground">/</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="#" className="text-sm">Electronics</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-muted-foreground">/</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="#" className="text-sm">Smartphones</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-muted-foreground">/</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage className="text-sm font-medium">iPhone 15 Pro</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  ),
};

// With ellipsis for long paths
export const WithEllipsis: Story = {
  render: () => {
    // In a real app, you would implement the dropdown functionality
    const DropdownBreadcrumb = () => (
      <div className="relative inline-block">
        <button className="text-sm font-medium text-muted-foreground hover:text-foreground">
          ...
        </button>
        <div className="invisible opacity-0 hover:visible hover:opacity-100 absolute bottom-full left-0 mb-1 w-48 bg-popover border rounded-md shadow-lg z-10 transition-opacity">
          <div className="py-1">
            <a href="#" className="block px-4 py-2 text-sm hover:bg-accent">Category A</a>
            <a href="#" className="block px-4 py-2 text-sm hover:bg-accent">Category B</a>
            <a href="#" className="block px-4 py-2 text-sm hover:bg-accent">Category C</a>
          </div>
        </div>
      </div>
    );

    return (
      <div className="max-w-md mx-auto">
        <Breadcrumb>
          <BreadcrumbList className="flex items-center gap-1 overflow-hidden">
            <BreadcrumbItem>
              <BreadcrumbLink href="#" className="text-sm truncate">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-muted-foreground">/</BreadcrumbSeparator>
            
            <BreadcrumbItem className="hidden sm:inline-flex">
              <BreadcrumbLink href="#" className="text-sm">Products</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-muted-foreground hidden sm:inline-flex">/</BreadcrumbSeparator>
            
            <BreadcrumbItem className="hidden md:inline-flex">
              <BreadcrumbLink href="#" className="text-sm">Electronics</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-muted-foreground hidden md:inline-flex">/</BreadcrumbSeparator>
            
            <BreadcrumbItem className="hidden lg:inline-flex">
              <BreadcrumbLink href="#" className="text-sm">Mobile Phones</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-muted-foreground hidden lg:inline-flex">/</BreadcrumbSeparator>
            
            <BreadcrumbItem className="lg:hidden">
              <DropdownBreadcrumb />
            </BreadcrumbItem>
            
            <BreadcrumbItem>
              <BreadcrumbPage className="text-sm font-medium truncate">
                iPhone 15 Pro Max 256GB - Space Black
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    );
  },
};

// In a page header
export const InPageHeader: Story = {
  render: () => (
    <div className="border-b">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col space-y-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#" className="text-sm">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="#" className="text-sm">Projects</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="text-sm font-medium">Acme Inc.</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Project Overview</h1>
              <p className="text-muted-foreground">Manage your project settings and team members</p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                Share
              </button>
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                New Task
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};
