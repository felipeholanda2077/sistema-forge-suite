import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './input';
import { Search, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Type something...',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
  },
};

export const WithLabel = () => (
  <div className="grid w-full max-w-sm items-center gap-1.5">
    <label htmlFor="email">Email</label>
    <Input type="email" id="email" placeholder="Email" />
  </div>
);

export const WithIcon = () => (
  <div className="relative">
    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
    <Input
      type="search"
      placeholder="Search..."
      className="pl-8"
    />
  </div>
);

export const PasswordInput = () => {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <div className="relative">
      <Lock className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type={showPassword ? 'text' : 'password'}
        placeholder="Password"
        className="pl-8 pr-10"
      />
      <button
        type="button"
        className="absolute right-2.5 top-2.5 text-muted-foreground"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );
};

export const ErrorState = () => (
  <div className="grid w-full max-w-sm items-center gap-1.5">
    <Input
      placeholder="Enter your email"
      className="border-destructive focus-visible:ring-destructive"
      defaultValue="invalid.email@"
    />
    <p className="text-sm text-destructive">Please enter a valid email address</p>
  </div>
);

export const Sizes = () => (
  <div className="space-y-4">
    <Input placeholder="Small input" className="h-8" />
    <Input placeholder="Default input" />
    <Input placeholder="Large input" className="h-10" />
  </div>
);
