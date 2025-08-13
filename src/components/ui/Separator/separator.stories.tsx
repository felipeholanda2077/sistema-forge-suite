import type { Meta, StoryObj } from '@storybook/react';
import { Separator } from './Separator/separator';
import { cn } from '../../lib/utils';
import { Button } from './Button/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './Card/card';
import { Input } from './Input/input';
import { Label } from './label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs/tabs';
import { Textarea } from './TextArea/textarea';
import { Badge } from './Badge/badge';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { Checkbox } from './Checkbox/checkbox';
import { RadioGroup, RadioGroupItem } from './radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { Switch } from './switch';

const meta: Meta<typeof Separator> = {
  title: 'Components/Separator',
  component: Separator,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Separator>;

// Basic separator
export const Basic: Story = {
  render: () => (
    <div className="w-[300px] space-y-4">
      <div>
        <h3 className="text-sm font-medium">Section 1</h3>
        <p className="text-sm text-muted-foreground">This is the first section of content.</p>
      </div>
      <Separator />
      <div>
        <h3 className="text-sm font-medium">Section 2</h3>
        <p className="text-sm text-muted-foreground">This is the second section of content.</p>
      </div>
    </div>
  ),
};

// Vertical separator
export const Vertical: Story = {
  render: () => (
    <div className="flex h-[200px] items-center justify-center space-x-4">
      <div className="text-center">
        <div className="text-2xl font-bold">42</div>
        <div className="text-sm text-muted-foreground">Projects</div>
      </div>
      <Separator orientation="vertical" className="h-12" />
      <div className="text-center">
        <div className="text-2xl font-bold">12.5k</div>
        <div className="text-sm text-muted-foreground">Commits</div>
      </div>
      <Separator orientation="vertical" className="h-12" />
      <div className="text-center">
        <div className="text-2xl font-bold">1.2k</div>
        <div className="text-sm text-muted-foreground">Stars</div>
      </div>
    </div>
  ),
};

// With text
export const WithText: Story = {
  render: () => (
    <div className="w-[400px] space-y-4">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          Manage your profile and account settings.
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Personal Information</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="first-name">First name</Label>
              <Input id="first-name" defaultValue="John" />
            </div>
            <div>
              <Label htmlFor="last-name">Last name</Label>
              <Input id="last-name" defaultValue="Doe" />
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" defaultValue="john.doe@example.com" />
        </div>
        
        <div className="space-y-2">
          <Label>Bio</Label>
          <Textarea
            placeholder="Tell us a little bit about yourself"
            className="min-h-[100px]"
            defaultValue="I'm a software engineer passionate about building great user experiences."
          />
        </div>
      </div>
      
      <Separator className="my-4" />
      
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Preferences</h4>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="theme" className="font-normal">
                Theme
              </Label>
              <p className="text-sm text-muted-foreground">
                Select your preferred theme
              </p>
            </div>
            <Select defaultValue="system">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="notifications" className="font-normal">
                Email notifications
              </Label>
              <p className="text-sm text-muted-foreground">
                Receive email notifications
              </p>
            </div>
            <Switch id="notifications" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="marketing" className="font-normal">
                Marketing emails
              </Label>
              <p className="text-sm text-muted-foreground">
                Receive marketing emails
              </p>
            </div>
            <Switch id="marketing" />
          </div>
        </div>
      </div>
      
      <Separator className="my-4" />
      
      <div className="flex justify-end">
        <Button>Save changes</Button>
      </div>
    </div>
  ),
};

// In a card
export const InCard: Story = {
  render: () => (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Team Members</CardTitle>
        <CardDescription>
          Manage your team members and their permissions.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-sm text-muted-foreground">john@example.com</p>
            </div>
          </div>
          <Badge variant="outline">Owner</Badge>
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Jane Smith</p>
              <p className="text-sm text-muted-foreground">jane@example.com</p>
            </div>
          </div>
          <Select defaultValue="member">
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="member">Member</SelectItem>
              <SelectItem value="viewer">Viewer</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarFallback>RJ</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Robert Johnson</p>
              <p className="text-sm text-muted-foreground">robert@example.com</p>
            </div>
          </div>
          <Select defaultValue="viewer">
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="member">Member</SelectItem>
              <SelectItem value="viewer">Viewer</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Separator />
        
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarFallback>+</AvatarFallback>
          </Avatar>
          <Button variant="ghost" className="text-muted-foreground">
            Add team member
          </Button>
        </div>
      </CardContent>
    </Card>
  ),
};

// In tabs
export const InTabs: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="John Doe" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="@johndoe" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  ),
};

// In a form
export const InForm: Story = {
  render: () => (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>Checkout</CardTitle>
        <CardDescription>Complete your purchase</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h4 className="font-medium">Contact information</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-name">First name</Label>
              <Input id="first-name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input id="last-name" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" />
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <h4 className="font-medium">Shipping address</h4>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" placeholder="123 Main St" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="au">Australia</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="state">State/Province</Label>
              <Input id="state" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zip">ZIP/Postal code</Label>
              <Input id="zip" />
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <h4 className="font-medium">Payment</h4>
          <div className="space-y-2">
            <Label htmlFor="card-number">Card number</Label>
            <Input id="card-number" placeholder="0000 0000 0000 0000" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry">Expiry date</Label>
              <Input id="expiry" placeholder="MM/YY" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvc">CVC</Label>
              <Input id="cvc" placeholder="CVC" />
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <h4 className="font-medium">Order summary</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Subtotal</span>
              <span className="text-sm">$99.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Shipping</span>
              <span className="text-sm">$5.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Tax</span>
              <span className="text-sm">$8.91</span>
            </div>
            <Separator />
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>$112.91</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Back</Button>
        <Button>Place order</Button>
      </CardFooter>
    </Card>
  ),
};

// With custom styles
export const CustomStyles: Story = {
  render: () => (
    <div className="w-[400px] space-y-6">
      <div>
        <h3 className="text-lg font-medium">Custom Separators</h3>
        <p className="text-sm text-muted-foreground">
          Examples of separators with different styles
        </p>
      </div>
      
      <div>
        <div className="flex items-center">
          <span className="text-sm font-medium">Default</span>
          <Separator className="mx-4 flex-1" />
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          This is the default separator style.
        </p>
      </div>
      
      <div>
        <div className="flex items-center">
          <span className="text-sm font-medium">Dashed</span>
          <Separator className="mx-4 flex-1 border-dashed" />
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          This separator uses a dashed border.
        </p>
      </div>
      
      <div>
        <div className="flex items-center">
          <span className="text-sm font-medium">Dotted</span>
          <Separator className="mx-4 flex-1 border-dotted" />
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          This separator uses a dotted border.
        </p>
      </div>
      
      <div>
        <div className="flex items-center">
          <span className="text-sm font-medium">Thick</span>
          <Separator className="mx-4 flex-1 border-2" />
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          This separator has a thicker border.
        </p>
      </div>
      
      <div>
        <div className="flex items-center">
          <span className="text-sm font-medium">Colored</span>
          <Separator className="mx-4 flex-1 border-primary" />
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          This separator uses the primary color.
        </p>
      </div>
      
      <div>
        <div className="flex items-center">
          <span className="text-sm font-medium">With Text</span>
          <Separator className="mx-4 flex-1" />
          <span className="px-2 text-xs text-muted-foreground">OR</span>
          <Separator className="mx-4 flex-1" />
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          This separator includes centered text.
        </p>
      </div>
    </div>
  ),
};
