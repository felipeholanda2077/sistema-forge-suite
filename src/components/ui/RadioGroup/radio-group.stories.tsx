import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup, RadioGroupItem } from './radio-group';
import { Label } from '../Label/label';
import { useState } from 'react';
import { Check, Circle, Star } from 'lucide-react';

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/Radio Group',
  component: RadioGroup,
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('default');
    return (
      <RadioGroup {...args} value={value} onValueChange={setValue}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="default" id="r1" />
          <Label htmlFor="r1">Default</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="comfortable" id="r2" />
          <Label htmlFor="r2">Comfortable</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="compact" id="r3" />
          <Label htmlFor="r3">Compact</Label>
        </div>
      </RadioGroup>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const [value, setValue] = useState('default');
    return (
      <RadioGroup value={value} onValueChange={setValue} disabled>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="default" id="r1-disabled" />
          <Label htmlFor="r1-disabled">Default (disabled)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="comfortable" id="r2-disabled" />
          <Label htmlFor="r2-disabled">Comfortable (disabled)</Label>
        </div>
      </RadioGroup>
    );
  },
};

export const WithCards: Story = {
  render: () => {
    const [value, setValue] = useState('free');
    
    const plans = [
      {
        id: 'free',
        name: 'Free',
        price: '$0',
        description: 'Basic features for personal use',
        features: ['Up to 5 projects', 'Basic support', '1GB storage'],
      },
      {
        id: 'pro',
        name: 'Pro',
        price: '$15',
        description: 'For professionals and teams',
        features: ['Unlimited projects', 'Priority support', '10GB storage', 'Advanced analytics'],
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        price: 'Custom',
        description: 'For large organizations',
        features: ['Unlimited everything', '24/7 support', 'Custom storage', 'Dedicated account manager'],
      },
    ];

    return (
      <RadioGroup 
        value={value} 
        onValueChange={setValue}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {plans.map((plan) => (
          <div key={plan.id}>
            <RadioGroupItem value={plan.id} id={plan.id} className="peer sr-only" />
            <Label
              htmlFor={plan.id}
              className={`flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                value === plan.id 
                  ? 'border-primary bg-primary/10' 
                  : 'border-muted hover:border-primary/50'
              }`}
            >
              <div className="w-full flex justify-between items-center mb-2">
                <h3 className="font-medium">{plan.name}</h3>
                {value === plan.id && (
                  <Check className="h-5 w-5 text-primary" />
                )}
              </div>
              <div className="text-2xl font-bold mb-2">{plan.price}</div>
              <p className="text-sm text-muted-foreground text-center mb-4">
                {plan.description}
              </p>
              <ul className="space-y-2 text-sm text-left w-full">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <Circle className="h-2 w-2 mr-2 fill-current" />
                    {feature}
                  </li>
                ))}
              </ul>
            </Label>
          </div>
        ))}
      </RadioGroup>
    );
  },
};

export const WithIcons: Story = {
  render: () => {
    const [value, setValue] = useState('star');
    
    const options = [
      { id: 'star', label: 'Star', icon: Star },
      { id: 'circle', label: 'Circle', icon: Circle },
      { id: 'check', label: 'Check', icon: Check },
    ];

    return (
      <RadioGroup 
        value={value} 
        onValueChange={setValue}
        className="flex gap-4"
      >
        {options.map((option) => {
          const Icon = option.icon;
          return (
            <div key={option.id}>
              <RadioGroupItem 
                value={option.id} 
                id={option.id} 
                className="peer sr-only" 
              />
              <Label
                htmlFor={option.id}
                className={`flex flex-col items-center justify-center w-20 h-20 border-2 rounded-lg cursor-pointer transition-all ${
                  value === option.id 
                    ? 'border-primary bg-primary/10' 
                    : 'border-muted hover:border-primary/50'
                }`}
              >
                <Icon className={`h-6 w-6 mb-1 ${
                  value === option.id ? 'text-primary' : 'text-muted-foreground'
                }`} />
                <span className="text-sm">{option.label}</span>
              </Label>
            </div>
          );
        })}
      </RadioGroup>
    );
  },
};

export const Horizontal: Story = {
  render: () => {
    const [value, setValue] = useState('option-1');
    
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <RadioGroup 
            value={value} 
            onValueChange={setValue}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-1" id="h1" />
              <Label htmlFor="h1">Option 1</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-2" id="h2" />
              <Label htmlFor="h2">Option 2</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-3" id="h3" />
              <Label htmlFor="h3">Option 3</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="p-4 border rounded-md">
          <p className="text-sm">
            Selected option: <span className="font-medium">{value}</span>
          </p>
        </div>
      </div>
    );
  },
};

export const WithForm: Story = {
  render: () => {
    const [form, setForm] = useState({
      notification: 'all',
      theme: 'system',
    });

    const handleChange = (field: string, value: string) => {
      setForm(prev => ({
        ...prev,
        [field]: value,
      }));
    };

    return (
      <div className="space-y-6 max-w-md">
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Notification Preferences</h3>
          <p className="text-sm text-muted-foreground">
            How would you like to receive notifications?
          </p>
          <RadioGroup 
            value={form.notification} 
            onValueChange={(value) => handleChange('notification', value)}
            className="space-y-2 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all">All notifications</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="mentions" id="mentions" />
              <Label htmlFor="mentions">Mentions only</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="none" id="none" />
              <Label htmlFor="none">No notifications</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Theme</h3>
          <p className="text-sm text-muted-foreground">
            Select your preferred theme
          </p>
          <RadioGroup 
            value={form.theme} 
            onValueChange={(value) => handleChange('theme', value)}
            className="space-y-2 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="light" id="light" />
              <Label htmlFor="light">Light</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="dark" id="dark" />
              <Label htmlFor="dark">Dark</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="system" id="system" />
              <Label htmlFor="system">System</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="p-4 border rounded-md bg-muted/50">
          <h4 className="text-sm font-medium mb-2">Form Data</h4>
          <pre className="text-xs bg-background p-2 rounded">
            {JSON.stringify(form, null, 2)}
          </pre>
        </div>
      </div>
    );
  },
};
