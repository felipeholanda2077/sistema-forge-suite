import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox/checkbox';
import { Label } from './label';
import { useState } from 'react';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  render: (args) => <Checkbox {...args} />,
};

export const WithLabel: Story = {
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" {...args} />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
};

export const Checked: Story = {
  render: (args) => <Checkbox {...args} checked />,
};

export const Disabled: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox id="disabled-unchecked" disabled />
        <Label htmlFor="disabled-unchecked">Disabled unchecked</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="disabled-checked" checked disabled />
        <Label htmlFor="disabled-checked">Disabled checked</Label>
      </div>
    </div>
  ),
};

export const WithForm: Story = {
  render: () => {
    const [checkedItems, setCheckedItems] = useState({
      react: false,
      nextjs: false,
      typescript: true,
      tailwind: true,
    });

    const handleChange = (name: string) => {
      setCheckedItems(prev => ({
        ...prev,
        [name]: !prev[name as keyof typeof prev],
      }));
    };

    const allChecked = Object.values(checkedItems).every(Boolean);
    const someChecked = Object.values(checkedItems).some(Boolean) && !allChecked;

    const handleSelectAll = () => {
      const newValue = !allChecked;
      setCheckedItems({
        react: newValue,
        nextjs: newValue,
        typescript: newValue,
        tailwind: newValue,
      });
    };

    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="select-all"
            checked={allChecked}
            onCheckedChange={handleSelectAll}
            ref={(el) => {
              if (el) {
                el.indeterminate = someChecked;
              }
            }}
          />
          <Label htmlFor="select-all">Select all</Label>
        </div>
        
        <div className="ml-6 space-y-2">
          {Object.entries(checkedItems).map(([key, value]) => (
            <div key={key} className="flex items-center space-x-2">
              <Checkbox
                id={key}
                checked={value}
                onCheckedChange={() => handleChange(key)}
              />
              <Label htmlFor={key} className="capitalize">
                {key}
              </Label>
            </div>
          ))}
        </div>
        
        <div className="pt-4">
          <pre className="p-4 bg-muted rounded-md text-sm">
            {JSON.stringify(checkedItems, null, 2)}
          </pre>
        </div>
      </div>
    );
  },
};

export const CustomStyling: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox id="custom-1" className="h-6 w-6 border-2 border-blue-500 data-[state=checked]:bg-blue-500" />
        <Label htmlFor="custom-1">Blue checkbox</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="custom-2" className="h-5 w-5 rounded-full border-pink-500 data-[state=checked]:bg-pink-500" />
        <Label htmlFor="custom-2">Pink rounded checkbox</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="custom-3" 
          className="h-6 w-6 border-2 border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-white"
        />
        <Label htmlFor="custom-3">Green checkbox</Label>
      </div>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="icon-checkbox"
            checked={checked}
            onCheckedChange={() => setChecked(!checked)}
            className="h-8 w-8 rounded-md data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
          >
            {checked ? (
              <span className="text-white">✓</span>
            ) : (
              <span className="text-gray-400">+</span>
            )}
          </Checkbox>
          <Label htmlFor="icon-checkbox">
            {checked ? 'Added to cart' : 'Add to cart'}
          </Label>
        </div>
      </div>
    );
  },
};
