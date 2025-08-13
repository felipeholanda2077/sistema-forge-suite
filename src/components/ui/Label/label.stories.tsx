import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label } from '../Label/label';
import { Input } from '../Input/input';
import { Checkbox } from '../Checkbox/checkbox';
import { Button } from '../Button/button';
import { RadioGroup, RadioGroupItem } from '../RadioGroup/radio-group';
import { Textarea } from '../TextArea/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../Select/select';
import { Switch } from '../Switch/switch';

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

// Basic label with input
export const Basic: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Enter your email" />
      <p className="text-sm text-muted-foreground">We'll never share your email.</p>
    </div>
  ),
};

// Required field
export const Required: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <div className="flex items-center">
        <Label htmlFor="username">Username</Label>
        <span className="ml-1 text-sm text-destructive">*</span>
      </div>
      <Input type="text" id="username" required />
      <p className="text-sm text-muted-foreground">This field is required.</p>
    </div>
  ),
};

// With checkbox
export const WithCheckbox: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
};

// With radio group
export const WithRadioGroup: Story = {
  render: () => (
    <div className="space-y-2">
      <Label>Notification Preference</Label>
      <RadioGroup defaultValue="all" className="mt-2">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="all" id="r1" />
          <Label htmlFor="r1">All notifications</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="mentions" id="r2" />
          <Label htmlFor="r2">Direct mentions only</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="none" id="r3" />
          <Label htmlFor="r3">No notifications</Label>
        </div>
      </RadioGroup>
    </div>
  ),
};

// With textarea
export const WithTextarea: Story = {
  render: () => (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="message">Your message</Label>
      <Textarea placeholder="Type your message here." id="message" className="min-h-[100px]" />
      <p className="text-sm text-muted-foreground">
        Your message will be sent to our support team.
      </p>
    </div>
  ),
};

// With select
export const WithSelect: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="country">Country</Label>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a country" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="us">United States</SelectItem>
          <SelectItem value="uk">United Kingdom</SelectItem>
          <SelectItem value="ca">Canada</SelectItem>
          <SelectItem value="au">Australia</SelectItem>
          <SelectItem value="nz">New Zealand</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

// With switch
export const WithSwitch: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  ),
};

// Disabled state
export const Disabled: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="disabled-input" className="text-muted-foreground">
        Disabled Input
      </Label>
      <Input id="disabled-input" disabled placeholder="This input is disabled" />
    </div>
  ),
};

// Error state
export const WithError: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <div className="flex items-center justify-between">
        <Label htmlFor="username" className="text-destructive">
          Username
        </Label>
        <p className="text-sm text-destructive">Username is required</p>
      </div>
      <Input id="username" className="border-destructive" />
    </div>
  ),
};

// Inline form
export const InlineForm: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-4 rounded-lg border p-6">
      <h2 className="text-xl font-semibold">Contact Us</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="first-name">First name</Label>
          <Input id="first-name" placeholder="John" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="last-name">Last name</Label>
          <Input id="last-name" placeholder="Doe" />
        </div>
      </div>
      
      <div className="space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="john@example.com" />
      </div>
      
      <div className="space-y-1.5">
        <Label htmlFor="subject">Subject</Label>
        <Input id="subject" placeholder="How can we help you?" />
      </div>
      
      <div className="space-y-1.5">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" placeholder="Type your message here..." className="min-h-[100px]" />
      </div>
      
      <div className="flex items-center space-x-2 pt-2">
        <Checkbox id="newsletter" />
        <Label htmlFor="newsletter" className="text-sm font-normal">
          Subscribe to our newsletter
        </Label>
      </div>
      
      <div className="pt-2">
        <Button>Send message</Button>
      </div>
    </div>
  ),
};

// With tooltip
export const WithTooltip: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <div className="flex items-center space-x-1">
        <Label htmlFor="api-key">API Key</Label>
        <button 
          type="button" 
          className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-muted text-xs text-muted-foreground hover:bg-accent"
          onClick={() => alert('Your API key is used to authenticate requests to our API.')}
          aria-label="More info"
        >
          i
        </button>
      </div>
      <Input id="api-key" type="password" placeholder="sk_test_..." />
      <p className="text-sm text-muted-foreground">
        Keep your API key secure and don't share it with others.
      </p>
    </div>
  ),
};

// In a settings form
export const SettingsForm: Story = {
  render: () => (
    <div className="w-full max-w-2xl space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">Profile</h2>
        <p className="text-sm text-muted-foreground">
          Update your account settings. Set your preferred language and timezone.
        </p>
      </div>
      
      <div className="space-y-6 rounded-lg border p-6">
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Personal Information</h3>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="first-name">First name</Label>
              <Input id="first-name" defaultValue="John" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="last-name">Last name</Label>
              <Input id="last-name" defaultValue="Doe" />
            </div>
          </div>
          
          <div className="space-y-1.5">
            <Label htmlFor="email">Email address</Label>
            <Input id="email" type="email" defaultValue="john@example.com" />
          </div>
        </div>
        
        <div className="border-t pt-6">
          <h3 className="mb-4 text-sm font-medium">Preferences</h3>
          
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="language">Language</Label>
              <Select defaultValue="en">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                  <SelectItem value="ja">Japanese</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="timezone">Timezone</Label>
              <Select defaultValue="pst">
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                  <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
                  <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
                  <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                  <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="marketing-emails" className="font-normal">
                  Marketing emails
                </Label>
                <Switch id="marketing-emails" defaultChecked />
              </div>
              <p className="text-sm text-muted-foreground">
                Receive emails about new products, features, and more.
              </p>
            </div>
            
            <div className="flex items-center justify-between pt-2">
              <div>
                <Label htmlFor="security-emails" className="font-normal">
                  Security emails
                </Label>
                <p className="text-sm text-muted-foreground">
                  Receive emails about your account security.
                </p>
              </div>
              <Switch id="security-emails" defaultChecked disabled />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end pt-4">
          <Button>Save changes</Button>
        </div>
      </div>
    </div>
  ),
};
