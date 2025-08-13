import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { cn } from '@/lib/utils';
import { ToggleGroup, ToggleGroupItem } from './toggle-group';
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Sun, Moon, Laptop, List, Grid, Map } from 'lucide-react';

const meta: Meta<typeof ToggleGroup> = {
  title: 'Components/ToggleGroup',
  component: ToggleGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['single', 'multiple'],
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'outline'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'default', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
  },
  args: {
    type: 'single',
    variant: 'default',
    size: 'default',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof ToggleGroup>;

// Single selection toggle group
export const SingleSelection: Story = {
  args: {
    // Only include non-conflicting args here
    variant: 'default',
    size: 'default',
    disabled: false,
  },
  render: (args) => {
    // For type="single", value should be a string
    const [value, setValue] = React.useState<string>('left');
    
    const handleValueChange = (newValue: string) => {
      setValue(newValue);
    };
    
    // Explicitly pass only the props we want to forward
    const { variant, size, disabled } = args;
    
    return (
      <ToggleGroup 
        type="single"
        variant={variant}
        size={size}
        disabled={disabled}
        value={value}
        onValueChange={handleValueChange}
      >
        <ToggleGroupItem value="left" aria-label="Left aligned">
          <AlignLeft className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Center aligned">
          <AlignCenter className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Right aligned">
          <AlignRight className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    );
  },
};

// Multiple selection toggle group
export const MultipleSelection: Story = {
  args: {
    // Only include non-conflicting args here
    variant: 'default',
    size: 'default',
    disabled: false,
  },
  render: (args) => {
    // For type="multiple", value should be string[]
    const [value, setValue] = React.useState<string[]>(['bold']);
    
    const handleValueChange = (newValue: string[]) => {
      setValue(newValue);
    };
    
    // Explicitly pass only the props we want to forward
    const { variant, size, disabled } = args;
    
    return (
      <ToggleGroup 
        type="multiple"
        variant={variant}
        size={size}
        disabled={disabled}
        value={value}
        onValueChange={handleValueChange}
      >
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <Bold className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <Italic className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline">
          <Underline className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    );
  },
};

// Text toggle group
export const TextOnly: Story = {
  render: () => {
    const [value, setValue] = React.useState('left');
    
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="text-sm font-medium">Text Alignment</div>
        <ToggleGroup
          type="single"
          value={value}
          onValueChange={(newValue) => setValue(newValue as string)}
          className="gap-0"
        >
          <ToggleGroupItem value="left" aria-label="Left aligned">
            Left
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Center aligned">
            Center
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Right aligned">
            Right
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    );
  },
};

// Icons with text
export const IconsWithText: Story = {
  args: {
    type: 'single',
  },
  render: (args) => {
    const [value, setValue] = React.useState<string>(args.type === 'single' ? 'light' : ['light'] as any);
    
    return (
      <ToggleGroup 
        {...args} 
        value={value as any}
        onValueChange={(newValue: string | string[]) => {
          setValue(newValue as any);
        }}
      >
        <ToggleGroupItem value="light" className="gap-2">
          <Sun className="h-4 w-4" />
          <span>Light</span>
        </ToggleGroupItem>
        <ToggleGroupItem value="dark" className="gap-2">
          <Moon className="h-4 w-4" />
          <span>Dark</span>
        </ToggleGroupItem>
        <ToggleGroupItem value="system" className="gap-2">
          <Laptop className="h-4 w-4" />
          <span>System</span>
        </ToggleGroupItem>
      </ToggleGroup>
    );
  },
};

// Different sizes
export const Sizes: Story = {
  render: () => {
    const sizes = ["sm", "default", "lg"] as const;
    
    return (
      <div className="flex flex-col items-center gap-8">
        {sizes.map((size) => (
          <div key={size} className="flex flex-col items-center gap-2">
            <div className="text-sm font-medium">
              {size === "default" ? "Default" : size === "sm" ? "Small (sm)" : "Large (lg)"}
            </div>
            <ToggleGroup type="single" size={size}>
              <ToggleGroupItem value="left" aria-label="Left aligned">
                <AlignLeft className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="center" aria-label="Center aligned">
                <AlignCenter className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="right" aria-label="Right aligned">
                <AlignRight className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        ))}
      </div>
    );
  },
};

// Different variants
export const Variants: Story = {
  args: {
    type: 'multiple',
    defaultValue: ['bold', 'italic']
  },
  render: (args) => (
    <div className="flex flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <div className="text-sm font-medium">Default</div>
        <ToggleGroup {...args}>
          <ToggleGroupItem value="bold" aria-label="Toggle bold">
            <Bold className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Toggle italic">
            <Italic className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Toggle underline">
            <Underline className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="text-sm font-medium">Outline</div>
        <ToggleGroup {...args} type="multiple" variant="outline" defaultValue={['bold', 'italic']}>
          <ToggleGroupItem value="bold" aria-label="Toggle bold">
            <Bold className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Toggle italic">
            <Italic className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Toggle underline">
            <Underline className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="text-sm font-medium">Outline with Disabled Items</div>
        <ToggleGroup {...args} type="multiple" variant="outline" defaultValue={['bold']}>
          <ToggleGroupItem value="bold" aria-label="Toggle bold">
            <Bold className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Toggle italic" disabled>
            <Italic className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Toggle underline">
            <Underline className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  ),
};

// Disabled state
export const Disabled: Story = {
  render: (args) => {
    const [selected, setSelected] = React.useState<string[]>(['bold']);
    
    return (
      <div className="flex flex-col space-y-4">
        <div>
          <p className="text-sm font-medium mb-2">Group Disabled</p>
          <ToggleGroup 
            {...args} 
            type="multiple" 
            disabled 
            value={selected}
            onValueChange={(newValues) => setSelected(newValues as string[])}
          >
            <ToggleGroupItem value="bold" aria-label="Toggle bold">
              <Bold className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Toggle italic">
              <Italic className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Toggle underline">
              <Underline className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        
        <div>
          <p className="text-sm font-medium mb-2">Item Disabled</p>
          <ToggleGroup 
            {...args} 
            type="multiple" 
            value={selected}
            onValueChange={(newValues) => setSelected(newValues as string[])}
          >
            <ToggleGroupItem value="bold" aria-label="Toggle bold">
              <Bold className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Toggle italic" disabled>
              <Italic className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Toggle underline">
              <Underline className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
    );
  },
  args: {
    type: 'multiple',
    value: ['bold']
  },
};

// With custom styling
export const CustomStyling: Story = {
  render: (args) => (
    <div className="flex flex-col space-y-6">
      <div>
        <p className="text-sm font-medium mb-2">Rounded Full</p>
        <ToggleGroup {...args} type="single" defaultValue="day" className="rounded-full bg-muted p-1">
          <ToggleGroupItem 
            value="day" 
            className="rounded-full data-[state=on]:bg-background data-[state=on]:shadow-sm"
          >
            Day
          </ToggleGroupItem>
          <ToggleGroupItem 
            value="week" 
            className="rounded-full data-[state=on]:bg-background data-[state=on]:shadow-sm"
          >
            Week
          </ToggleGroupItem>
          <ToggleGroupItem 
            value="month" 
            className="rounded-full data-[state=on]:bg-background data-[state=on]:shadow-sm"
          >
            Month
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      
      <div>
        <p className="text-sm font-medium mb-2">Custom Colors</p>
        <ToggleGroup {...args} type="single" defaultValue="medium" className="bg-amber-50 p-1 rounded-md">
          <ToggleGroupItem 
            value="low" 
            className="data-[state=on]:bg-amber-100 data-[state=on]:text-amber-900"
          >
            Low
          </ToggleGroupItem>
          <ToggleGroupItem 
            value="medium" 
            className="data-[state=on]:bg-amber-200 data-[state=on]:text-amber-900"
          >
            Medium
          </ToggleGroupItem>
          <ToggleGroupItem 
            value="high" 
            className="data-[state=on]:bg-amber-500 data-[state=on]:text-white"
          >
            High
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      
      <div>
        <p className="text-sm font-medium mb-2">Custom Icons</p>
        <ToggleGroup {...args} type="single" defaultValue="grid" className="bg-slate-100 p-1 rounded-lg">
          <ToggleGroupItem 
            value="list" 
            className="data-[state=on]:bg-white data-[state=on]:shadow-sm gap-2"
          >
            <List className="h-4 w-4" />
            <span>List</span>
          </ToggleGroupItem>
          <ToggleGroupItem 
            value="grid" 
            className="data-[state=on]:bg-white data-[state=on]:shadow-sm gap-2"
          >
            <Grid className="h-4 w-4" />
            <span>Grid</span>
          </ToggleGroupItem>
          <ToggleGroupItem 
            value="map" 
            className="data-[state=on]:bg-white data-[state=on]:shadow-sm gap-2"
          >
            <Map className="h-4 w-4" />
            <span>Map</span>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  ),
  args: {
    type: 'single',
    defaultValue: 'day'
  }
};

// With form integration
export const WithForm: Story = {
  render: (args) => {
    const [value, setValue] = React.useState('bold');
    
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm font-medium">Text Formatting</p>
          <ToggleGroup 
            {...args} 
            type="single" 
            value={value}
            onValueChange={(newValue: string) => {
              setValue(newValue);
            }}
          >
            <ToggleGroupItem value="bold" aria-label="Toggle bold">
              <Bold className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Toggle italic">
              <Italic className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Toggle underline">
              <Underline className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        
        <div className="border rounded-md p-4">
          <p className="text-sm text-muted-foreground mb-2">Preview:</p>
          <p 
            className={cn(
              'text-base',
              value === 'bold' && 'font-bold',
              value === 'italic' && 'italic',
              value === 'underline' && 'underline'
            )}
          >
            The quick brown fox jumps over the lazy dog
          </p>
        </div>
      </div>
    );
  },
  args: {
    type: 'single',
    defaultValue: 'bold'
  }
};

// With controlled state
export const Controlled: Story = {
  render: (args) => {
    const [selected, setSelected] = React.useState<string>('bold');
    
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm font-medium">Controlled Toggle Group</p>
          <ToggleGroup 
            {...args} 
            type="single" 
            value={selected}
            onValueChange={(newValue: string) => setSelected(newValue)}
          >
            <ToggleGroupItem value="bold" aria-label="Toggle bold">
              <Bold className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Toggle italic">
              <Italic className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Toggle underline">
              <Underline className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <p className="text-sm text-muted-foreground">
          Selected: {selected || 'none'}
        </p>
      </div>
    );
  },
  args: {
    type: 'single',
    value: 'bold'
  }
};

// Accessibility example
export const Accessibility: Story = {
  render: (args) => (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        This toggle group has proper ARIA attributes for accessibility.
      </p>
      
      <div className="space-y-2">
        <label id="font-style" className="block text-sm font-medium">
          Font Style
        </label>
        <ToggleGroup 
          {...args} 
          type="single" 
          defaultValue="bold"
          aria-labelledby="font-style"
        >
          <ToggleGroupItem 
            value="bold" 
            aria-label="Bold"
            aria-pressed="false"
            data-state="off"
          >
            <Bold className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem 
            value="italic" 
            aria-label="Italic"
            aria-pressed="false"
            data-state="off"
          >
            <Italic className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem 
            value="underline" 
            aria-label="Underline"
            aria-pressed="false"
            data-state="off"
          >
            <Underline className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  ),
};
