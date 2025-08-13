import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from './switch';
import { Label } from '../Label/label';
import { useState } from 'react';
import { Sun, Moon, Bell, BellOff, Wifi, WifiOff, Check, X } from 'lucide-react';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return <Switch {...args} checked={checked} onCheckedChange={setChecked} />;
  },
};

export const WithLabel: Story = {
  render: () => {
    const [airplaneMode, setAirplaneMode] = useState(false);
    
    return (
      <div className="flex items-center space-x-2">
        <Switch id="airplane-mode" checked={airplaneMode} onCheckedChange={setAirplaneMode} />
        <Label htmlFor="airplane-mode">Airplane Mode</Label>
      </div>
    );
  },
};

export const WithIcons: Story = {
  render: () => {
    const [darkMode, setDarkMode] = useState(false);
    
    return (
      <div className="flex items-center space-x-2">
        <Sun className="h-4 w-4 text-yellow-500" />
        <Switch 
          id="dark-mode" 
          checked={darkMode} 
          onCheckedChange={setDarkMode}
          className="data-[state=checked]:bg-slate-900 data-[state=unchecked]:bg-slate-200"
        />
        <Moon className="h-4 w-4 text-slate-700" />
      </div>
    );
  },
};

export const WithCustomIcons: Story = {
  render: () => {
    const [notifications, setNotifications] = useState(true);
    
    return (
      <div className="flex items-center space-x-2">
        <Switch 
          id="notifications" 
          checked={notifications} 
          onCheckedChange={setNotifications}
          className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-gray-200"
        >
          <span className="sr-only">Notifications</span>
          <span className="flex items-center justify-center h-full px-0.5">
            {notifications ? (
              <Bell className="h-3 w-3 text-white" />
            ) : (
              <BellOff className="h-3 w-3 text-gray-500" />
            )}
          </span>
        </Switch>
        <Label htmlFor="notifications">
          {notifications ? 'Notifications On' : 'Notifications Off'}
        </Label>
      </div>
    );
  },
};

export const WithForm: Story = {
  render: () => {
    const [settings, setSettings] = useState({
      wifi: true,
      bluetooth: false,
      location: true,
      darkMode: false,
    });

    const handleChange = (setting: string, checked: boolean) => {
      setSettings(prev => ({
        ...prev,
        [setting]: checked,
      }));
    };

    return (
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-blue-100">
                {settings.wifi ? (
                  <Wifi className="h-4 w-4 text-blue-600" />
                ) : (
                  <WifiOff className="h-4 w-4 text-gray-400" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium">Wi-Fi</p>
                <p className="text-xs text-muted-foreground">
                  {settings.wifi ? 'Connected' : 'Disconnected'}
                </p>
              </div>
            </div>
            <Switch 
              checked={settings.wifi} 
              onCheckedChange={(checked) => handleChange('wifi', checked)}
              className="data-[state=checked]:bg-blue-600"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-purple-100">
                {settings.bluetooth ? (
                  <Check className="h-4 w-4 text-purple-600" />
                ) : (
                  <X className="h-4 w-4 text-gray-400" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium">Bluetooth</p>
                <p className="text-xs text-muted-foreground">
                  {settings.bluetooth ? 'Connected' : 'Disconnected'}
                </p>
              </div>
            </div>
            <Switch 
              checked={settings.bluetooth} 
              onCheckedChange={(checked) => handleChange('bluetooth', checked)}
              className="data-[state=checked]:bg-purple-600"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-green-100">
                {settings.location ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <X className="h-4 w-4 text-gray-400" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium">Location Services</p>
                <p className="text-xs text-muted-foreground">
                  {settings.location ? 'Enabled' : 'Disabled'}
                </p>
              </div>
            </div>
            <Switch 
              checked={settings.location} 
              onCheckedChange={(checked) => handleChange('location', checked)}
              className="data-[state=checked]:bg-green-600"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-gray-100">
                {settings.darkMode ? (
                  <Moon className="h-4 w-4 text-gray-900" />
                ) : (
                  <Sun className="h-4 w-4 text-amber-500" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium">Dark Mode</p>
                <p className="text-xs text-muted-foreground">
                  {settings.darkMode ? 'On' : 'Off'}
                </p>
              </div>
            </div>
            <Switch 
              checked={settings.darkMode} 
              onCheckedChange={(checked) => handleChange('darkMode', checked)}
              className="data-[state=checked]:bg-gray-900"
            />
          </div>
        </div>

        <div className="mt-6 p-4 border rounded-md bg-muted/50">
          <h4 className="text-sm font-medium mb-2">Current Settings</h4>
          <pre className="text-xs bg-background p-2 rounded overflow-x-auto">
            {JSON.stringify(settings, null, 2)}
          </pre>
        </div>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [small, setSmall] = useState(false);
    const [medium, setMedium] = useState(false);
    const [large, setLarge] = useState(false);
    
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Switch 
            id="small" 
            checked={small} 
            onCheckedChange={setSmall}
            className="h-3 w-6 data-[state=checked]:translate-x-3"
          />
          <Label htmlFor="small">Small</Label>
        </div>
        
        <div className="flex items-center space-x-4">
          <Switch 
            id="medium" 
            checked={medium} 
            onCheckedChange={setMedium}
            className="h-4 w-9 data-[state=checked]:translate-x-4"
          />
          <Label htmlFor="medium">Medium (default)</Label>
        </div>
        
        <div className="flex items-center space-x-4">
          <Switch 
            id="large" 
            checked={large} 
            onCheckedChange={setLarge}
            className="h-5 w-11 data-[state=checked]:translate-x-5"
          />
          <Label htmlFor="large">Large</Label>
        </div>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch id="disabled-off" disabled />
        <Label htmlFor="disabled-off">Disabled (off)</Label>
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch id="disabled-on" checked disabled />
        <Label htmlFor="disabled-on">Disabled (on)</Label>
      </div>
    </div>
  ),
};

export const WithCustomStyles: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Primary Color</span>
          <Switch 
            checked={checked} 
            onCheckedChange={setChecked}
            className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-200"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Success Color</span>
          <Switch 
            checked={checked} 
            onCheckedChange={setChecked}
            className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-gray-200"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Danger Color</span>
          <Switch 
            checked={checked} 
            onCheckedChange={setChecked}
            className="data-[state=checked]:bg-red-600 data-[state=unchecked]:bg-gray-200"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Custom Size</span>
          <Switch 
            checked={checked} 
            onCheckedChange={setChecked}
            className="h-6 w-12 data-[state=unchecked]:bg-gray-300 data-[state=checked]:bg-purple-600"
          >
            <span className="h-5 w-5 bg-white rounded-full shadow-md transform transition-transform data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0" />
          </Switch>
        </div>
      </div>
    );
  },
};
