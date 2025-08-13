import type { Meta, StoryObj } from '@storybook/react';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './sheet';
import { Button } from '../Button/button';
import { Label } from '../Label/label';
import { Input } from '../Input/input';
import { Textarea } from '../TextArea/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../Select/select';
import { Checkbox } from '../Checkbox/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../Tabs/tabs';
import { Badge } from '../Badge/badge';
import { Separator } from '../Separator/separator';
import { Avatar, AvatarFallback } from '../Avatar/avatar';
import { cn } from '../../../lib/utils';
import { X, Plus, Filter, Search, Check, ChevronDown, ChevronUp, Settings, Bell, User, LogOut, CreditCard, LifeBuoy, MessageSquare } from 'lucide-react';

const meta: Meta<typeof Sheet> = {
  title: 'Components/Sheet',
  component: Sheet,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Sheet>;

// Basic sheet
export const Basic: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="John Doe" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@johndoe" className="col-span-3" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

// Sheet with form
export const WithForm: Story = {
  render: () => {
    const [formData, setFormData] = React.useState({
      title: 'Senior Software Engineer',
      type: 'full-time',
      location: 'Remote',
    });

    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="gap-1">
            <Plus className="h-4 w-4" />
            Create Job Posting
          </Button>
        </SheetTrigger>
        <SheetContent className="sm:max-w-[600px] overflow-y-auto">
          <SheetHeader className="mb-6">
            <SheetTitle>Create Job Posting</SheetTitle>
            <SheetDescription>
              Fill in the details below to create a new job posting.
            </SheetDescription>
          </SheetHeader>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="e.g. Senior Software Engineer"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Job Type</Label>
                <Select 
                  value={formData.type}
                  onValueChange={(value) => setFormData({...formData, type: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="e.g. Remote"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Salary Range</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                    <Input
                      id="min-salary"
                      type="number"
                      className="pl-8"
                      placeholder="Min"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                    <Input
                      id="max-salary"
                      type="number"
                      className="pl-8"
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <SheetFooter className="mt-8">
            <SheetClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </SheetClose>
            <Button type="submit">Create Job Posting</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  },
};

// Sheet with navigation
export const WithNavigation: Story = {
  render: () => {
    const [activeTab, setActiveTab] = React.useState('account');
    
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Open Settings</Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-[300px] sm:w-[350px]">
          <div className="h-full flex flex-col">
            <SheetHeader className="p-6 pb-0">
              <SheetTitle>Settings</SheetTitle>
              <SheetDescription>
                Manage your account settings and preferences.
              </SheetDescription>
            </SheetHeader>
            
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="flex-1 flex flex-col"
            >
              <TabsList className="rounded-none border-b bg-transparent p-0">
                <TabsTrigger 
                  value="account" 
                  className="relative h-12 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-4 pt-2 font-medium text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                >
                  Account
                </TabsTrigger>
                <TabsTrigger 
                  value="notifications" 
                  className="relative h-12 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-4 pt-2 font-medium text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                >
                  Notifications
                </TabsTrigger>
              </TabsList>
              
              <div className="flex-1 overflow-y-auto p-6">
                <TabsContent value="account" className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Profile</h3>
                    <p className="text-sm text-muted-foreground">
                      Update your account information and settings.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-16 w-16">
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <Button variant="outline" size="sm" className="h-8">
                        Change
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" defaultValue="John Doe" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="john.doe@example.com" />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="notifications" className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Notifications</h3>
                    <p className="text-sm text-muted-foreground">
                      Configure how you receive notifications.
                    </p>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Communication</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="email-notifications">Email notifications</Label>
                            <p className="text-sm text-muted-foreground">
                              Receive emails about your account and updates.
                            </p>
                          </div>
                          <Checkbox id="email-notifications" defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="marketing-emails">Marketing emails</Label>
                            <p className="text-sm text-muted-foreground">
                              Receive emails about new products and features.
                            </p>
                          </div>
                          <Checkbox id="marketing-emails" />
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
            
            <div className="border-t p-4">
              <Button variant="outline" className="w-full">
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
  },
};

// Sheet with filters
export const WithFilters: Story = {
  render: () => {
    const [filters, setFilters] = React.useState({
      status: ['in-stock'],
      categories: ['electronics', 'clothing'],
      priceRange: [0, 1000],
    });
    
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="gap-1">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[350px] sm:w-[400px] p-0 overflow-hidden">
          <div className="h-full flex flex-col">
            <SheetHeader className="p-6 pb-4">
              <div className="flex items-center justify-between">
                <SheetTitle>Filters</SheetTitle>
                <Button variant="ghost" size="sm" className="h-8 px-2 text-sm">
                  Reset all
                </Button>
              </div>
              <SheetDescription className="text-left">
                Narrow down your search results
              </SheetDescription>
            </SheetHeader>
            
            <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-8">
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Availability</h4>
                <div className="space-y-2">
                  {[
                    { id: 'in-stock', label: 'In Stock' },
                    { id: 'out-of-stock', label: 'Out of Stock' },
                    { id: 'pre-order', label: 'Pre-order' },
                  ].map((item) => (
                    <div key={item.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`status-${item.id}`} 
                        checked={filters.status.includes(item.id)}
                        onCheckedChange={(checked) => {
                          setFilters(prev => ({
                            ...prev,
                            status: checked 
                              ? [...prev.status, item.id]
                              : prev.status.filter(id => id !== item.id)
                          }));
                        }}
                      />
                      <Label htmlFor={`status-${item.id}`} className="text-sm font-normal">
                        {item.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Categories</h4>
                <div className="space-y-2">
                  {[
                    { id: 'electronics', label: 'Electronics' },
                    { id: 'clothing', label: 'Clothing' },
                    { id: 'home', label: 'Home & Kitchen' },
                  ].map((item) => (
                    <div key={item.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`category-${item.id}`}
                        checked={filters.categories.includes(item.id)}
                        onCheckedChange={(checked) => {
                          setFilters(prev => ({
                            ...prev,
                            categories: checked 
                              ? [...prev.categories, item.id]
                              : prev.categories.filter(id => id !== item.id)
                          }));
                        }}
                      />
                      <Label htmlFor={`category-${item.id}`} className="text-sm font-normal">
                        {item.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Price range</h4>
                  <span className="text-sm text-muted-foreground">
                    ${filters.priceRange[0]} - ${filters.priceRange[1]}
                  </span>
                </div>
                <div className="space-y-4">
                  <div className="relative">
                    <div className="h-2 rounded-full bg-muted">
                      <div 
                        className="h-full rounded-full bg-primary"
                        style={{
                          width: `${(filters.priceRange[1] / 1000) * 100}%`,
                          marginLeft: `${(filters.priceRange[0] / 1000) * 100}%`,
                        }}
                      />
                    </div>
                    <div className="relative">
                      <input
                        type="range"
                        min="0"
                        max="1000"
                        value={filters.priceRange[0]}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          if (value < filters.priceRange[1]) {
                            setFilters(prev => ({
                              ...prev,
                              priceRange: [value, prev.priceRange[1]]
                            }));
                          }
                        }}
                        className="absolute top-0 h-2 w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:cursor-pointer"
                      />
                      <input
                        type="range"
                        min="0"
                        max="1000"
                        value={filters.priceRange[1]}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          if (value > filters.priceRange[0]) {
                            setFilters(prev => ({
                              ...prev,
                              priceRange: [prev.priceRange[0], value]
                            }));
                          }
                        }}
                        className="absolute top-0 h-2 w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <SheetFooter className="p-4 border-t">
              <Button className="w-full">
                <Check className="mr-2 h-4 w-4" />
                Apply Filters
              </Button>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>
    );
  },
};
