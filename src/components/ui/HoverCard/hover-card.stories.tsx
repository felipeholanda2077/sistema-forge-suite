import type { Meta, StoryObj } from '@storybook/react-vite';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './hover-card';
import { Avatar, AvatarFallback, AvatarImage } from '../Avatar/avatar';
import { Button } from '../Button/button';
import { ArrowRight, CalendarDays, CalendarPlus, CheckCircle, Clock, Heart, Link, Mail, MapPin, Truck, Twitter, Users } from 'lucide-react';

const meta: Meta<typeof HoverCard> = {
  title: 'Components/Hover Card',
  component: HoverCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof HoverCard>;

// Basic hover card
export const Basic: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@shadcn</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="Shadcn" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@shadcn</h4>
            <p className="text-sm">
              Creator of shadcn/ui and TaxPal.
            </p>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-xs text-muted-foreground">
                Joined December 2021
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

// User profile with more details
export const UserProfile: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="cursor-pointer">
          <div className="flex items-center space-x-3 p-3 hover:bg-accent/50 rounded-md">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">@johndoe</p>
            </div>
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 p-0" align="start">
        <div className="relative">
          <div className="h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-md" />
          <div className="absolute -bottom-8 left-4">
            <Avatar className="h-16 w-16 border-4 border-background">
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className="pt-10 px-4 pb-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">John Doe</h3>
              <p className="text-sm text-muted-foreground">@johndoe</p>
            </div>
            <Button size="sm" className="rounded-full">
              Follow
            </Button>
          </div>
          
          <p className="mt-3 text-sm">
            Product designer, photographer, and tech enthusiast. Building digital experiences that matter.
          </p>
          
          <div className="mt-3 flex items-center space-x-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="mr-1 h-4 w-4" />
              San Francisco, CA
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Link className="mr-1 h-4 w-4" />
              <a href="#" className="text-blue-500 hover:underline">website.com</a>
            </div>
          </div>
          
          <div className="mt-4 flex space-x-4 text-sm">
            <div className="flex items-center">
              <span className="font-semibold">1,234</span>
              <span className="ml-1 text-muted-foreground">Following</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold">5,678</span>
              <span className="ml-1 text-muted-foreground">Followers</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

// Product card
export const ProductCard: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="group cursor-pointer">
          <div className="aspect-square overflow-hidden rounded-lg border bg-background">
            <img
              src="https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=300"
              alt="Product"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="mt-2">
            <h3 className="font-medium">Acme Prism T-Shirt</h3>
            <p className="text-sm text-muted-foreground">$29.99</p>
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 p-0" align="start">
        <div className="p-4">
          <h3 className="text-lg font-semibold">Acme Prism T-Shirt</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            A comfortable and stylish t-shirt with a unique prism design.
          </p>
          
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Price</span>
              <span className="font-semibold">$29.99</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Color</span>
              <span className="text-sm text-muted-foreground">Black</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Sizes</span>
              <div className="flex space-x-1">
                {['S', 'M', 'L', 'XL'].map((size) => (
                  <div key={size} className="flex h-6 w-6 items-center justify-center rounded border text-xs">
                    {size}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex space-x-2">
            <Button className="flex-1">Add to cart</Button>
            <Button variant="outline" size="icon">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center">
              <CheckCircle className="mr-1 h-3 w-3 text-green-500" />
              In stock
            </div>
            <div className="flex items-center">
              <Truck className="mr-1 h-3 w-3" />
              Free shipping
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

// Event card
export const EventCard: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="cursor-pointer overflow-hidden rounded-lg border">
          <div className="aspect-video bg-gradient-to-r from-purple-500 to-pink-500" />
          <div className="p-4">
            <h3 className="font-medium">Tech Conference 2023</h3>
            <p className="text-sm text-muted-foreground">Tomorrow • 9:00 AM</p>
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 p-0" align="start">
        <div className="relative">
          <div className="h-24 bg-gradient-to-r from-purple-500 to-pink-500" />
          <div className="absolute -bottom-4 left-4">
            <div className="rounded-lg border bg-background p-2 shadow-sm">
              <div className="text-center text-sm font-medium">JUN</div>
              <div className="text-center text-lg font-bold">15</div>
            </div>
          </div>
        </div>
        
        <div className="px-4 pt-6 pb-4">
          <h3 className="text-lg font-semibold">Tech Conference 2023</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Join us for the biggest tech event of the year with industry leaders and innovators.
          </p>
          
          <div className="mt-4 space-y-3">
            <div className="flex items-start">
              <CalendarDays className="mr-2 h-4 w-4 mt-0.5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Thursday, June 15, 2023</p>
                <p className="text-sm text-muted-foreground">9:00 AM - 6:00 PM</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <MapPin className="mr-2 h-4 w-4 mt-0.5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Moscone Center</p>
                <p className="text-sm text-muted-foreground">747 Howard St, San Francisco, CA</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Users className="mr-2 h-4 w-4 mt-0.5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Organized by Tech Events Inc.</p>
                <p className="text-sm text-muted-foreground">1,200+ people are attending</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex space-x-2">
            <Button className="flex-1">Get tickets</Button>
            <Button variant="outline">
              <CalendarPlus className="mr-2 h-4 w-4" />
              Save
            </Button>
          </div>
          
          <div className="mt-4 pt-4 border-t">
            <h4 className="text-sm font-medium mb-2">Speakers</h4>
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <Avatar key={i} className="h-8 w-8 border-2 border-background">
                  <AvatarImage src={`https://i.pravatar.cc/150?img=${i + 10}`} alt="Speaker" />
                  <AvatarFallback>S{i}</AvatarFallback>
                </Avatar>
              ))}
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-medium border-2 border-background">
                +5
              </div>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

// Article preview
export const ArticlePreview: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <a 
          href="#" 
          className="block max-w-2xl p-6 border rounded-lg hover:bg-accent/50 transition-colors"
        >
          <h3 className="text-lg font-semibold">The Future of Web Development in 2023</h3>
          <p className="mt-2 text-muted-foreground line-clamp-2">
            Explore the latest trends and technologies shaping the future of web development, 
            from server components to edge computing and beyond.
          </p>
          <div className="mt-4 flex items-center text-sm text-muted-foreground">
            <span>Read more</span>
            <ArrowRight className="ml-1 h-4 w-4" />
          </div>
        </a>
      </HoverCardTrigger>
      <HoverCardContent className="w-[600px] p-0 overflow-hidden" align="start">
        <div className="grid grid-cols-3">
          <div className="col-span-2 p-6">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Web Development</span>
              <span>•</span>
              <span>10 min read</span>
            </div>
            
            <h3 className="mt-2 text-2xl font-bold">The Future of Web Development in 2023</h3>
            
            <p className="mt-4 text-muted-foreground">
              The web development landscape is evolving at an unprecedented pace. 
              In this article, we explore the key trends and technologies that 
              are shaping the future of web development.
            </p>
            
            <div className="mt-6 space-y-4">
              <div className="flex items-start">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary mr-3 mt-0.5">
                  <span className="text-xs font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-medium">Server Components</h4>
                  <p className="text-sm text-muted-foreground">
                    React Server Components are changing how we think about component architecture.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary mr-3 mt-0.5">
                  <span className="text-xs font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-medium">Edge Computing</h4>
                  <p className="text-sm text-muted-foreground">
                    Bringing computation closer to users for faster experiences.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary mr-3 mt-0.5">
                  <span className="text-xs font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-medium">WebAssembly</h4>
                  <p className="text-sm text-muted-foreground">
                    High-performance applications running in the browser.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex items-center justify-between">
              <Button>Read full article</Button>
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <span>Written by</span>
                <Avatar className="h-6 w-6">
                  <AvatarImage src="https://github.com/shadcn.png" alt="Author" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <span className="font-medium">John Doe</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=500"
              alt="Web Development"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-background/80 to-transparent" />
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

// Team member card
export const TeamMember: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="group cursor-pointer">
          <div className="relative overflow-hidden rounded-lg border bg-card p-4 transition-all group-hover:shadow-md">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src="https://github.com/shadcn.png" alt="Team member" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">John Doe</h3>
                <p className="text-sm text-muted-foreground">Lead Designer</p>
              </div>
            </div>
            <div className="absolute -right-8 -top-8 h-16 w-16 rounded-full bg-primary/10 transition-transform duration-300 group-hover:scale-150" />
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 p-0" align="start">
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src="https://github.com/shadcn.png" alt="Team member" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">John Doe</h3>
                <p className="text-sm text-muted-foreground">Lead Designer</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="rounded-full">
              <Mail className="mr-1 h-4 w-4" />
              Message
            </Button>
          </div>
          
          <p className="mt-4 text-sm text-muted-foreground">
            Passionate about creating beautiful and functional user experiences. 
            Loves typography, photography, and coffee.
          </p>
          
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {['UI/UX Design', 'Figma', 'User Research', 'Prototyping', 'Design Systems'].map((skill) => (
                <span 
                  key={skill}
                  className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t">
            <h4 className="text-sm font-medium mb-2">Contact</h4>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <Mail className="mr-2 h-4 w-4" />
                john.doe@example.com
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Twitter className="mr-2 h-4 w-4" />
                @johndoe
              </div>
            </div>
          </div>
          
          <Button className="mt-6 w-full">View full profile</Button>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};
