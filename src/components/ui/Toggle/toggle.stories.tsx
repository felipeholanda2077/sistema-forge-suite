import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from './Toggle/toggle';
import { Moon, Sun, Bell, BellOff, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { useState } from 'react';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'outline', 'ghost'],
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

// Basic toggle
export const Default: Story = {
  render: () => {
    const [isToggled, setIsToggled] = useState(false);
    
    return (
      <div className="flex items-center space-x-4">
        <Toggle 
          pressed={isToggled}
          onPressedChange={setIsToggled}
          aria-label="Toggle"
        >
          {isToggled ? 'On' : 'Off'}
        </Toggle>
        <span className="text-sm text-muted-foreground">
          {isToggled ? 'Toggle is on' : 'Toggle is off'}
        </span>
      </div>
    );
  },
};

// Toggle with icons
export const WithIcons: Story = {
  render: () => {
    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState(true);
    
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <Toggle 
            pressed={darkMode}
            onPressedChange={setDarkMode}
            aria-label="Toggle dark mode"
            className="gap-2"
          >
            {darkMode ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
            {darkMode ? 'Dark' : 'Light'} Mode
          </Toggle>
          
          <Toggle 
            pressed={notifications}
            onPressedChange={setNotifications}
            aria-label="Toggle notifications"
            variant="outline"
            className="gap-2"
          >
            {notifications ? (
              <Bell className="h-4 w-4" />
            ) : (
              <BellOff className="h-4 w-4" />
            )}
            Notifications {notifications ? 'On' : 'Off'}
          </Toggle>
        </div>
        
        <div className="p-4 rounded-lg border">
          <p className="text-sm text-muted-foreground mb-2">
            Current settings:
          </p>
          <ul className="text-sm space-y-1">
            <li>• Dark Mode: {darkMode ? 'On' : 'Off'}</li>
            <li>• Notifications: {notifications ? 'On' : 'Off'}</li>
          </ul>
        </div>
      </div>
    );
  },
};

// Text formatting toggles
export const TextFormatting: Story = {
  render: () => {
    const [formats, setFormats] = useState({
      bold: false,
      italic: false,
      underline: false,
    });
    
    const toggleFormat = (format: keyof typeof formats) => {
      setFormats(prev => ({
        ...prev,
        [format]: !prev[format],
      }));
    };
    
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2 p-2 border rounded-lg">
          <Toggle 
            pressed={formats.bold}
            onPressedChange={() => toggleFormat('bold')}
            aria-label="Toggle bold"
            variant="ghost"
            size="sm"
          >
            <Bold className="h-4 w-4" />
          </Toggle>
          
          <Toggle 
            pressed={formats.italic}
            onPressedChange={() => toggleFormat('italic')}
            aria-label="Toggle italic"
            variant="ghost"
            size="sm"
          >
            <Italic className="h-4 w-4" />
          </Toggle>
          
          <Toggle 
            pressed={formats.underline}
            onPressedChange={() => toggleFormat('underline')}
            aria-label="Toggle underline"
            variant="ghost"
            size="sm"
          >
            <Underline className="h-4 w-4" />
          </Toggle>
          
          <div className="h-6 w-px bg-border mx-1" />
          
          <Toggle 
            pressed={true}
            onPressedChange={() => {}}
            aria-label="Align left"
            variant="ghost"
            size="sm"
          >
            <AlignLeft className="h-4 w-4" />
          </Toggle>
          
          <Toggle 
            pressed={false}
            onPressedChange={() => {}}
            aria-label="Align center"
            variant="ghost"
            size="sm"
          >
            <AlignCenter className="h-4 w-4" />
          </Toggle>
          
          <Toggle 
            pressed={false}
            onPressedChange={() => {}}
            aria-label="Align right"
            variant="ghost"
            size="sm"
          >
            <AlignRight className="h-4 w-4" />
          </Toggle>
        </div>
        
        <div className="p-4 border rounded-lg">
          <p 
            className={`
              ${formats.bold ? 'font-bold' : ''}
              ${formats.italic ? 'italic' : ''}
              ${formats.underline ? 'underline' : ''}
            `}
          >
            The quick brown fox jumps over the lazy dog.
          </p>
        </div>
      </div>
    );
  },
};

// Toggle group for single selection
export const SingleSelection: Story = {
  render: () => {
    const [selected, setSelected] = useState('day');
    
    return (
      <div className="space-y-4">
        <div className="flex items-center">
          <Toggle
            pressed={selected === 'day'}
            onPressedChange={() => setSelected('day')}
            variant="outline"
            className="rounded-r-none"
          >
            Day
          </Toggle>
          <Toggle
            pressed={selected === 'week'}
            onPressedChange={() => setSelected('week')}
            variant="outline"
            className="rounded-none"
          >
            Week
          </Toggle>
          <Toggle
            pressed={selected === 'month'}
            onPressedChange={() => setSelected('month')}
            variant="outline"
            className="rounded-none"
          >
            Month
          </Toggle>
          <Toggle
            pressed={selected === 'year'}
            onPressedChange={() => setSelected('year')}
            variant="outline"
            className="rounded-l-none"
          >
            Year
          </Toggle>
        </div>
        
        <p className="text-sm text-muted-foreground">
          Selected view: <span className="font-medium">{selected}</span>
        </p>
      </div>
    );
  },
};

// Toggle group for multiple selection
export const MultipleSelection: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(['email']);
    
    const toggleOption = (option: string) => {
      setSelected(prev => 
        prev.includes(option)
          ? prev.filter(item => item !== option)
          : [...prev, option]
      );
    };
    
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {['email', 'sms', 'push', 'browser'].map(option => (
            <Toggle
              key={option}
              pressed={selected.includes(option)}
              onPressedChange={() => toggleOption(option)}
              variant={selected.includes(option) ? 'default' : 'outline'}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </Toggle>
          ))}
        </div>
        
        <div className="p-4 border rounded-lg">
          <p className="text-sm font-medium mb-2">Notification preferences:</p>
          {selected.length > 0 ? (
            <ul className="text-sm space-y-1">
              {selected.map(option => (
                <li key={option} className="flex items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                  {option.charAt(0).toUpperCase() + option.slice(1)} notifications
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No notification methods selected</p>
          )}
        </div>
      </div>
    );
  },
};

// Disabled state
export const Disabled: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <Toggle disabled aria-label="Toggle disabled">
        Disabled
      </Toggle>
      
      <Toggle disabled pressed aria-label="Toggle disabled pressed">
        Disabled (Pressed)
      </Toggle>
      
      <Toggle disabled variant="outline" aria-label="Toggle disabled outline">
        <Bell className="h-4 w-4 mr-2" />
        Disabled
      </Toggle>
    </div>
  ),
};

// Different sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <Toggle size="sm" aria-label="Small toggle">
        Small
      </Toggle>
      
      <Toggle size="default" aria-label="Default toggle">
        Default
      </Toggle>
      
      <Toggle size="lg" aria-label="Large toggle">
        Large
      </Toggle>
    </div>
  ),
};
