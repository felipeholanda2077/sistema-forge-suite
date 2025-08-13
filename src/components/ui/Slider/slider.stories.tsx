import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from './slider';
import { useState } from 'react';
import { Volume2, VolumeX, Sun, Moon, ZoomIn, ZoomOut } from 'lucide-react';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    min: {
      control: { type: 'number', min: 0, max: 100, step: 1 },
    },
    max: {
      control: { type: 'number', min: 1, step: 1 },
    },
    step: {
      control: { type: 'number', min: 0.1, step: 0.1 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

const SliderWithState = (args: any) => {
  const [value, setValue] = useState(args.defaultValue || 50);
  return (
    <div className="w-full max-w-md">
      <Slider 
        {...args} 
        value={[value]} 
        onValueChange={([val]) => setValue(val)} 
      />
      <div className="mt-2 text-sm text-muted-foreground">
        Value: {value}
      </div>
    </div>
  );
};

export const Default: Story = {
  render: (args) => <SliderWithState {...args} />,
};

export const WithLabel: Story = {
  render: () => {
    const [value, setValue] = useState(50);
    
    return (
      <div className="space-y-4 w-full max-w-md">
        <div className="flex justify-between">
          <label htmlFor="slider" className="text-sm font-medium">
            Volume Level
          </label>
          <span className="text-sm text-muted-foreground">{value}%</span>
        </div>
        <Slider
          id="slider"
          value={[value]}
          onValueChange={([val]) => setValue(val)}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Mute</span>
          <span>Max</span>
        </div>
      </div>
    );
  },
};

export const WithIcons: Story = {
  render: () => {
    const [volume, setVolume] = useState(70);
    const [brightness, setBrightness] = useState(50);
    const [zoom, setZoom] = useState(30);
    
    return (
      <div className="space-y-8 w-full max-w-md">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <VolumeX className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Volume</span>
            </div>
            <span className="text-sm text-muted-foreground">{volume}%</span>
          </div>
          <Slider
            value={[volume]}
            onValueChange={([val]) => setVolume(val)}
            className="w-full"
          />
          <div className="flex justify-between">
            <VolumeX className="h-4 w-4 text-muted-foreground" />
            <Volume2 className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Moon className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Brightness</span>
            </div>
            <span className="text-sm text-muted-foreground">{brightness}%</span>
          </div>
          <Slider
            value={[brightness]}
            onValueChange={([val]) => setBrightness(val)}
            className="w-full"
          />
          <div className="flex justify-between">
            <Moon className="h-4 w-4 text-muted-foreground" />
            <Sun className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ZoomOut className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Zoom</span>
              <ZoomIn className="h-4 w-4 text-muted-foreground" />
            </div>
            <span className="text-sm text-muted-foreground">{zoom}%</span>
          </div>
          <Slider
            value={[zoom]}
            onValueChange={([val]) => setZoom(val)}
            className="w-full"
          />
        </div>
      </div>
    );
  },
};

export const RangeSlider: Story = {
  render: () => {
    const [values, setValues] = useState([20, 80]);
    
    return (
      <div className="space-y-4 w-full max-w-md">
        <div>
          <h3 className="text-sm font-medium mb-2">Price Range</h3>
          <div className="flex justify-between mb-4">
            <div className="rounded-md border px-3 py-1.5 text-sm">
              ${values[0]}
            </div>
            <div className="h-10 flex items-center px-2 text-muted-foreground">
              to
            </div>
            <div className="rounded-md border px-3 py-1.5 text-sm">
              ${values[1]}
            </div>
          </div>
          <Slider
            value={values}
            onValueChange={setValues}
            min={0}
            max={1000}
            step={10}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>$0</span>
            <span>$500</span>
            <span>$1000</span>
          </div>
        </div>
        
        <div className="pt-4 border-t">
          <h3 className="text-sm font-medium mb-2">Age Range</h3>
          <div className="flex justify-between mb-1">
            <span className="text-sm text-muted-foreground">
              {values[0]} - {values[1]} years
            </span>
          </div>
          <Slider
            value={[25, 45]}
            min={18}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>18</span>
            <span>59</span>
            <span>100+</span>
          </div>
        </div>
      </div>
    );
  },
};

export const WithSteps: Story = {
  render: () => {
    const [value, setValue] = useState(3);
    
    const steps = [
      { value: 0, label: '0%' },
      { value: 1, label: '25%' },
      { value: 2, label: '50%' },
      { value: 3, label: '75%' },
      { value: 4, label: '100%' },
    ];
    
    return (
      <div className="w-full max-w-md space-y-2">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">Progress</span>
          <span className="text-sm text-muted-foreground">
            {steps[value].label}
          </span>
        </div>
        
        <Slider
          value={[value]}
          min={0}
          max={steps.length - 1}
          step={1}
          onValueChange={([val]) => setValue(val)}
          className="w-full"
        />
        
        <div className="flex justify-between text-xs text-muted-foreground px-1">
          {steps.map((step, i) => (
            <button
              key={i}
              className={`w-6 h-6 flex items-center justify-center rounded-full transition-colors ${
                i <= value ? 'bg-primary text-primary-foreground' : 'bg-muted'
              }`}
              onClick={() => setValue(i)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="space-y-8 w-full max-w-md">
      <div className="space-y-2">
        <div className="flex justify-between">
          <label className="text-sm font-medium text-muted-foreground">
            Volume (disabled)
          </label>
          <span className="text-sm text-muted-foreground">50%</span>
        </div>
        <Slider
          value={[50]}
          disabled
          className="w-full opacity-50"
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <label className="text-sm font-medium">
            Range (disabled)
          </label>
          <span className="text-sm text-muted-foreground">20% - 80%</span>
        </div>
        <Slider
          value={[20, 80]}
          disabled
          className="w-full opacity-50"
        />
      </div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => {
    const [volume, setVolume] = useState(70);
    
    return (
      <div className="flex items-center gap-8 h-64">
        <div className="flex flex-col items-center h-full justify-between">
          <VolumeX className="h-5 w-5 text-muted-foreground" />
          <Slider
            orientation="vertical"
            value={[volume]}
            onValueChange={([val]) => setVolume(val)}
            className="h-48"
          />
          <Volume2 className="h-5 w-5 text-muted-foreground" />
          <div className="mt-2 text-sm font-medium">{volume}%</div>
        </div>
        
        <div className="h-full flex flex-col justify-between py-2">
          <div className="text-sm font-medium mb-2">Vertical Slider</div>
          <div className="flex-1 flex items-center">
            <Slider
              orientation="vertical"
              value={[volume]}
              onValueChange={([val]) => setVolume(val)}
              className="h-32"
            />
          </div>
          <div className="text-xs text-muted-foreground mt-2">
            Drag to adjust
          </div>
        </div>
      </div>
    );
  },
};

export const CustomStyling: Story = {
  render: () => {
    const [value, setValue] = useState(50);
    
    return (
      <div className="space-y-8 w-full max-w-md">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Primary</span>
            <span className="text-sm text-muted-foreground">{value}%</span>
          </div>
          <Slider
            value={[value]}
            onValueChange={([val]) => setValue(val)}
            className="w-full [&_[role=slider]]:h-2 [&_[role=slider]]:bg-primary/20 [&_[role=slider][data-state=active]]:bg-primary/40 [&_[role=range]]:bg-primary"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Danger</span>
            <span className="text-sm text-muted-foreground">{value}%</span>
          </div>
          <Slider
            value={[value]}
            onValueChange={([val]) => setValue(val)}
            className="w-full [&_[role=slider]]:h-3 [&_[role=slider]]:bg-destructive/20 [&_[role=slider][data-state=active]]:bg-destructive/30 [&_[role=range]]:bg-destructive"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Custom</span>
            <span className="text-sm text-muted-foreground">{value}%</span>
          </div>
          <Slider
            value={[value]}
            onValueChange={([val]) => setValue(val)}
            className="w-full [&_[role=slider]]:h-1.5 [&_[role=slider]]:bg-purple-100 [&_[role=slider][data-state=active]]:bg-purple-200 [&_[role=range]]:bg-gradient-to-r from-purple-500 to-pink-500 [&_[role=thumb]]:h-5 [&_[role=thumb]]:w-5 [&_[role=thumb]]:border-2 [&_[role=thumb]]:border-purple-500 [&_[role=thumb]]:bg-background [&_[role=thumb]]:shadow-lg [&_[role=thumb]]:ring-offset-background"
          />
        </div>
      </div>
    );
  },
};
