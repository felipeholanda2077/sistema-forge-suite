/* eslint-disable @typescript-eslint/no-unused-expressions */
import type { Meta, StoryObj } from '@storybook/react';
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
      control: { type: 'radio' },
      options: ['single', 'multiple'],
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'outline', 'ghost'],
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
  render: (args) => (
    <ToggleGroup {...args} type="single" defaultValue="left">
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
  ),
};

// Multiple selection toggle group
export const MultipleSelection: Story = {
  render: (args) => (
    <ToggleGroup {...args} type="multiple" defaultValue={['bold']}>
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
  ),
};

// Text toggle group
export const TextOnly: Story = {
  render: (args) => (
    <ToggleGroup {...args} type="single" defaultValue="day">
      <ToggleGroupItem value="day">Day</ToggleGroupItem>
      <ToggleGroupItem value="week">Week</ToggleGroupItem>
      <ToggleGroupItem value="month">Month</ToggleGroupItem>
      <ToggleGroupItem value="year">Year</ToggleGroupItem>
    </ToggleGroup>
  ),
};

// Icons with text
export const IconsWithText: Story = {
  render: (args) => (
    <ToggleGroup {...args} type="single" defaultValue="light">
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
  ),
};

// Different sizes
export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col space-y-4">
      <div>
        <p className="text-sm font-medium mb-2">Small</p>
        <ToggleGroup {...args} type="single" size="sm" defaultValue="list">
          <ToggleGroupItem value="list" aria-label="List view">
            <List className="h-3 w-3" />
          </ToggleGroupItem>
          <ToggleGroupItem value="grid" aria-label="Grid view">
            <Grid className="h-3 w-3" />
          </ToggleGroupItem>
          <ToggleGroupItem value="map" aria-label="Map view">
            <Map className="h-3 w-3" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      
      <div>
        <p className="text-sm font-medium mb-2">Default</p>
        <ToggleGroup {...args} type="single" size="default" defaultValue="list">
          <ToggleGroupItem value="list" aria-label="List view">
            <List className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="grid" aria-label="Grid view">
            <Grid className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="map" aria-label="Map view">
            <Map className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      
      <div>
        <p className="text-sm font-medium mb-2">Large</p>
        <ToggleGroup {...args} type="single" size="lg" defaultValue="list">
          <ToggleGroupItem value="list" aria-label="List view" className="gap-2">
            <List className="h-5 w-5" />
            <span>List</span>
          </ToggleGroupItem>
          <ToggleGroupItem value="grid" aria-label="Grid view" className="gap-2">
            <Grid className="h-5 w-5" />
            <span>Grid</span>
          </ToggleGroupItem>
          <ToggleGroupItem value="map" aria-label="Map view" className="gap-2">
            <Map className="h-5 w-5" />
            <span>Map</span>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  ),
};

// Different variants
export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-col space-y-8">
      <div>
        <p className="text-sm font-medium mb-2">Default</p>
        <ToggleGroup {...args} type="multiple" defaultValue={['bold']}>
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
        <p className="text-sm font-medium mb-2">Outline</p>
        <ToggleGroup {...args} type="multiple" variant="outline" defaultValue={['bold']}>
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
        <p className="text-sm font-medium mb-2">Ghost</p>
        <ToggleGroup {...args} type="multiple" variant="ghost" defaultValue={['bold']}>
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
    </div>
  ),
};

// Disabled state
export const Disabled: Story = {
  render: (args) => (
    <div className="flex flex-col space-y-4">
      <div>
        <p className="text-sm font-medium mb-2">Group Disabled</p>
        <ToggleGroup {...args} type="multiple" disabled>
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
        <ToggleGroup {...args} type="multiple">
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

// With custom styling
export const CustomStyling: Story = {
  render: (args) => (
    <div className="flex flex-col space-y-6">
      <div>
        <p className="text-sm font-medium mb-2">Rounded Full</p>
        <ToggleGroup {...args} type="single" className="rounded-full bg-muted p-1">
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
        <ToggleGroup {...args} type="single" className="bg-amber-50 p-1 rounded-md">
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
        <ToggleGroup {...args} type="single" className="bg-slate-100 p-1 rounded-lg">
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
            onValueChange={(value) => {
              if (value) setValue(value);
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
              value.includes('bold') && 'font-bold',
              value.includes('italic') && 'italic',
              value.includes('underline') && 'underline'
            )}
          >
            The quick brown fox jumps over the lazy dog
          </p>
        </div>
      </div>
    );
  },
};

// With controlled state
export const Controlled: Story = {
  render: (args) => {
    const [selected, setSelected] = React.useState('bold');
    
    return (
      <div className="space-y-4">
        <ToggleGroup 
          {...args} 
          type="single" 
          value={selected}
          onValueChange={(value) => {
            if (value) setSelected(value);
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
        
        <div className="text-sm text-muted-foreground">
          Selected: <span className="font-medium">{selected || 'None'}</span>
        </div>
      </div>
    );
  },
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
