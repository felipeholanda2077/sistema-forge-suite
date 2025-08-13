import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './badge';
import { Check, X, AlertTriangle, Bell, Star } from 'lucide-react';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'secondary', 'destructive', 'outline', 'success'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="success">Success</Badge>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>
        <Check className="mr-1 h-3 w-3" />
        Active
      </Badge>
      <Badge variant="secondary">
        <Bell className="mr-1 h-3 w-3" />
        Notifications
      </Badge>
      <Badge variant="destructive">
        <X className="mr-1 h-3 w-3" />
        Error
      </Badge>
      <Badge variant="outline">
        <AlertTriangle className="mr-1 h-3 w-3" />
        Warning
      </Badge>
      <Badge variant="success">
        <Star className="mr-1 h-3 w-3 fill-current" />
        Featured
      </Badge>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Badge className="text-xs">Small</Badge>
      <Badge>Default</Badge>
      <Badge className="text-base">Large</Badge>
      <Badge className="px-3 py-1 text-lg">Extra Large</Badge>
    </div>
  ),
};

export const WithAvatar: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div className="h-10 w-10 rounded-full bg-gray-200"></div>
        <Badge className="absolute -right-1 -top-1 h-5 w-5 items-center justify-center rounded-full p-0">
          3
        </Badge>
      </div>
      <div className="relative">
        <div className="h-10 w-10 rounded-full bg-gray-200"></div>
        <Badge 
          variant="destructive" 
          className="absolute -right-1 -top-1 h-5 w-5 items-center justify-center rounded-full p-0"
        >
          <Bell className="h-3 w-3" />
        </Badge>
      </div>
    </div>
  ),
};

export const WithButton: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <button className="relative inline-flex items-center rounded-md border px-4 py-2">
        Notifications
        <Badge className="absolute -right-2 -top-2 h-5 w-5 items-center justify-center rounded-full p-0">
          3
        </Badge>
      </button>
      
      <button className="relative inline-flex items-center rounded-md border px-4 py-2">
        Messages
        <Badge 
          variant="destructive"
          className="absolute -right-2 -top-2 h-5 w-5 items-center justify-center rounded-full p-0"
        >
          5
        </Badge>
      </button>
    </div>
  ),
};

export const CustomColors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
        Purple
      </Badge>
      <Badge className="bg-pink-100 text-pink-800 hover:bg-pink-200">
        Pink
      </Badge>
      <Badge className="bg-cyan-100 text-cyan-800 hover:bg-cyan-200">
        Cyan
      </Badge>
      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">
        Amber
      </Badge>
    </div>
  ),
};
