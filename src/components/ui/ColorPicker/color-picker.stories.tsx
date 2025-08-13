import type { Meta, StoryObj } from '@storybook/react';
import { ColorPicker } from './color-picker';
import { useState } from 'react';
import { Button } from '../Button/button';
import { Check, Palette, X } from 'lucide-react';

const meta: Meta<typeof ColorPicker> = {
  title: 'Components/Color Picker',
  component: ColorPicker,
  tags: ['autodocs'],
  argTypes: {
    defaultColor: {
      control: 'color',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ColorPicker>;

// Basic color picker
export const Basic: Story = {
  render: () => {
    const [color, setColor] = useState('#3b82f6');
    
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <ColorPicker
            color={color}
            onChange={setColor}
          />
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-1">Selected color:</p>
            <div className="flex items-center gap-2">
              <div 
                className="w-8 h-8 rounded-md border"
                style={{ backgroundColor: color }}
              />
              <span className="font-mono text-sm">{color}</span>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

// With default colors
export const WithPresets: Story = {
  render: () => {
    const [color, setColor] = useState('#3b82f6');
    
    const presets = [
      '#3b82f6', // blue-500
      '#8b5cf6', // violet-500
      '#ec4899', // pink-500
      '#f43f5e', // rose-500
      '#f59e0b', // amber-500
      '#10b981', // emerald-500
      '#06b6d4', // cyan-500
      '#6366f1', // indigo-500
    ];
    
    return (
      <div className="space-y-4">
        <ColorPicker
          color={color}
          onChange={setColor}
          presets={presets}
        />
        
        <div className="mt-4 p-4 border rounded-lg">
          <h3 className="text-sm font-medium mb-2">Selected Color</h3>
          <div className="flex items-center gap-4">
            <div 
              className="w-16 h-16 rounded-lg border"
              style={{ backgroundColor: color }}
            />
            <div>
              <p className="font-mono text-sm mb-1">{color}</p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigator.clipboard.writeText(color)}
              >
                Copy
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

// With custom trigger
export const CustomTrigger: Story = {
  render: () => {
    const [color, setColor] = useState('#8b5cf6');
    
    return (
      <ColorPicker
        color={color}
        onChange={setColor}
      >
        <Button variant="outline" className="gap-2">
          <Palette className="h-4 w-4" />
          Pick a color
        </Button>
      </ColorPicker>
    );
  },
};

// With custom actions
export const WithActions: Story = {
  render: () => {
    const [color, setColor] = useState('#10b981');
    const [savedColor, setSavedColor] = useState('#10b981');
    const [isOpen, setIsOpen] = useState(false);
    
    const handleSave = () => {
      setSavedColor(color);
      setIsOpen(false);
    };
    
    const handleCancel = () => {
      setColor(savedColor);
      setIsOpen(false);
    };
    
    return (
      <div className="space-y-4">
        <ColorPicker
          color={color}
          onChange={setColor}
          open={isOpen}
          onOpenChange={setIsOpen}
        >
          <div className="flex items-center gap-2">
            <div 
              className="w-6 h-6 rounded-full border cursor-pointer"
              style={{ backgroundColor: savedColor }}
              onClick={() => setIsOpen(true)}
            />
            <span className="text-sm">Click to change color</span>
          </div>
          
          <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleCancel}
            >
              <X className="h-4 w-4 mr-1" />
              Cancel
            </Button>
            <Button 
              size="sm"
              onClick={handleSave}
            >
              <Check className="h-4 w-4 mr-1" />
              Apply
            </Button>
          </div>
        </ColorPicker>
        
        <div className="p-4 border rounded-lg">
          <p className="text-sm text-muted-foreground mb-2">Current color:</p>
          <div 
            className="w-full h-12 rounded-lg"
            style={{ backgroundColor: savedColor }}
          />
          <p className="mt-2 text-sm font-mono">{savedColor}</p>
        </div>
      </div>
    );
  },
};

// With alpha channel
export const WithAlpha: Story = {
  render: () => {
    const [color, setColor] = useState('rgba(59, 130, 246, 0.7)');
    
    return (
      <div className="space-y-4">
        <ColorPicker
          color={color}
          onChange={setColor}
          showAlpha
        />
        
        <div className="p-4 border rounded-lg">
          <p className="text-sm text-muted-foreground mb-2">Selected color with alpha:</p>
          <div 
            className="w-full h-12 rounded-lg mb-2 relative"
            style={{ 
              backgroundColor: color,
              backgroundImage: 'linear-gradient(45deg, #e5e7eb 25%, transparent 25%), linear-gradient(-45deg, #e5e7eb 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e5e7eb 75%), linear-gradient(-45deg, transparent 75%, #e5e7eb 75%)',
              backgroundSize: '16px 16px',
              backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px',
            }}
          >
            <div 
              className="absolute inset-0 rounded-lg"
              style={{ backgroundColor: color }}
            />
          </div>
          <p className="font-mono text-sm">{color}</p>
        </div>
      </div>
    );
  },
};

// In a form
export const InForm: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      title: 'My Awesome Project',
      color: '#3b82f6',
      description: '',
    });
    
    const handleChange = (field: string, value: string) => {
      setFormData(prev => ({
        ...prev,
        [field]: value,
      }));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert(JSON.stringify(formData, null, 2));
    };
    
    return (
      <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
        <div>
          <h2 className="text-lg font-semibold mb-4">Create New Project</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Project Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Accent Color</label>
              <ColorPicker
                color={formData.color}
                onChange={(color) => handleChange('color', color)}
              >
                <div className="flex items-center gap-2 p-2 border rounded-md w-fit cursor-pointer">
                  <div 
                    className="w-6 h-6 rounded-md border"
                    style={{ backgroundColor: formData.color }}
                  />
                  <span className="text-sm">Choose color</span>
                </div>
              </ColorPicker>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className="w-full px-3 py-2 border rounded-md min-h-[100px]"
                placeholder="Enter project description..."
              />
            </div>
            
            <div className="pt-2">
              <Button type="submit">
                Create Project
              </Button>
            </div>
          </div>
        </div>
        
        <div className="p-4 border rounded-lg bg-muted/30">
          <h3 className="text-sm font-medium mb-2">Form Data Preview</h3>
          <pre className="text-xs bg-background p-2 rounded overflow-auto">
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      </form>
    );
  },
};
