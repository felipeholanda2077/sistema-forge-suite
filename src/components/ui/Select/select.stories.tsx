import type { Meta, StoryObj } from '@storybook/react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './select';
import { useState } from 'react';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

const fruits = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
  { value: 'grape', label: 'Grape' },
  { value: 'strawberry', label: 'Strawberry' },
];

const countries = [
  { value: 'us', label: 'United States', code: 'US' },
  { value: 'ca', label: 'Canada', code: 'CA' },
  { value: 'uk', label: 'United Kingdom', code: 'GB' },
  { value: 'au', label: 'Australia', code: 'AU' },
  { value: 'de', label: 'Germany', code: 'DE' },
  { value: 'fr', label: 'France', code: 'FR' },
  { value: 'jp', label: 'Japan', code: 'JP' },
];

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    
    return (
      <Select value={value} onValueChange={setValue} {...args}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          {fruits.map((fruit) => (
            <SelectItem key={fruit.value} value={fruit.value}>
              {fruit.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  },
};

export const WithLabel: Story = {
  render: () => {
    const [value, setValue] = useState('');
    
    return (
      <div className="space-y-2 w-[300px]">
        <label htmlFor="fruit-select" className="text-sm font-medium">
          Favorite Fruit
        </label>
        <Select value={value} onValueChange={setValue}>
          <SelectTrigger id="fruit-select">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            {fruits.map((fruit) => (
              <SelectItem key={fruit.value} value={fruit.value}>
                {fruit.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  },
};

export const WithGroups: Story = {
  render: () => {
    const [value, setValue] = useState('');
    
    return (
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Select a country" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>North America</SelectLabel>
            {countries
              .filter(c => ['us', 'ca'].includes(c.value))
              .map((country) => (
                <SelectItem key={country.value} value={country.value}>
                  {country.label}
                </SelectItem>
              ))}
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Europe</SelectLabel>
            {countries
              .filter(c => ['uk', 'de', 'fr'].includes(c.value))
              .map((country) => (
                <SelectItem key={country.value} value={country.value}>
                  {country.label}
                </SelectItem>
              ))}
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Others</SelectLabel>
            {countries
              .filter(c => ['au', 'jp'].includes(c.value))
              .map((country) => (
                <SelectItem key={country.value} value={country.value}>
                  {country.label}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  },
};

export const WithIcons: Story = {
  render: () => {
    const [value, setValue] = useState('');
    
    return (
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Select a country" />
        </SelectTrigger>
        <SelectContent>
          {countries.map((country) => (
            <SelectItem key={country.value} value={country.value}>
              <div className="flex items-center gap-2">
                <span className={`fi fi-${country.value.toLowerCase()} w-5 h-4`}></span>
                <span>{country.label}</span>
                <span className="ml-auto text-muted-foreground text-xs">{country.code}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="space-y-4">
      <Select disabled>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
      </Select>
      
      <Select disabled defaultValue="apple">
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
      </Select>
    </div>
  ),
};

export const WithCustomTrigger: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const selectedFruit = fruits.find(fruit => fruit.value === value);
    
    return (
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="w-[200px] justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary"></span>
            <SelectValue placeholder="Select a fruit" />
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </SelectTrigger>
        <SelectContent>
          {fruits.map((fruit) => (
            <SelectItem key={fruit.value} value={fruit.value}>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                {fruit.label}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  },
};

export const WithCustomContent: Story = {
  render: () => {
    const [value, setValue] = useState('apple');
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <Select 
        value={value} 
        onValueChange={setValue}
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <SelectTrigger className="w-[280px] justify-between">
          <SelectValue />
          {isOpen ? (
            <ChevronUp className="h-4 w-4 opacity-50" />
          ) : (
            <ChevronDown className="h-4 w-4 opacity-50" />
          )}
        </SelectTrigger>
        <SelectContent className="p-0">
          <div className="p-2 border-b">
            <h4 className="text-sm font-medium">Select a fruit</h4>
            <p className="text-xs text-muted-foreground">
              Choose your favorite fruit from the list
            </p>
          </div>
          <div className="max-h-[200px] overflow-y-auto p-1">
            {fruits.map((fruit) => (
              <SelectItem 
                key={fruit.value} 
                value={fruit.value}
                className="flex justify-between items-center"
              >
                <span>{fruit.label}</span>
                {value === fruit.value && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </SelectItem>
            ))}
          </div>
          <div className="p-2 border-t text-center">
            <button 
              className="text-xs text-primary hover:underline"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </div>
        </SelectContent>
      </Select>
    );
  },
};

export const WithForm: Story = {
  render: () => {
    const [form, setForm] = useState({
      country: '',
      fruit: '',
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
          <label className="text-sm font-medium">Country</label>
          <Select 
            value={form.country} 
            onValueChange={(value) => handleChange('country', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.value} value={country.value}>
                  {country.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Favorite Fruit</label>
          <Select 
            value={form.fruit} 
            onValueChange={(value) => handleChange('fruit', value)}
            disabled={!form.country}
          >
            <SelectTrigger>
              <SelectValue placeholder={
                form.country 
                  ? "Select a fruit" 
                  : "Please select a country first"
              } />
            </SelectTrigger>
            <SelectContent>
              {fruits.map((fruit) => (
                <SelectItem key={fruit.value} value={fruit.value}>
                  {fruit.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
