/* eslint-disable @typescript-eslint/no-unused-expressions */
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button/button';
import { useToast } from '../use-toast';
import { Toaster } from './toaster';
import { Check, X, AlertTriangle, Info, Bell, Loader2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

// Toast component for demonstration
const ToastDemo = () => {
  const { toast } = useToast();

  return (
    <div className="flex flex-col space-y-4">
      <Button
        variant="outline"
        onClick={() => {
          toast({
            title: 'Scheduled: Catch up',
            description: 'Friday, February 10, 2023 at 5:57 PM',
          });
        }}
      >
        Show Toast
      </Button>
      
      <p className="text-sm text-muted-foreground">
        Click the button to show a toast notification
      </p>
    </div>
  );
};

const meta: Meta<typeof Toaster> = {
  title: 'Components/Toaster',
  component: Toaster,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster />
      </>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Toaster>;

// Basic toast
export const Basic: Story = {
  render: () => {
    const { toast } = useToast();
    
    return (
      <Button
        variant="outline"
        onClick={() => {
          toast({
            title: 'Success',
            description: 'Your changes have been saved.',
          });
        }}
      >
        Show Toast
      </Button>
    );
  },
};

// Toast variants
export const Variants: Story = {
  render: () => {
    const { toast } = useToast();
    
    return (
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          onClick={() => {
            toast({
              title: 'Success',
              description: 'Your changes have been saved.',
              variant: 'default',
            });
          }}
        >
          Default
        </Button>
        
        <Button
          variant="outline"
          onClick={() => {
            toast({
              title: 'Success',
              description: 'Your changes have been saved.',
              variant: 'default',
            });
          }}
        >
          Success
        </Button>
        
        <Button
          variant="outline"
          onClick={() => {
            toast({
              title: 'Error',
              description: 'Failed to save changes.',
              variant: 'destructive',
            });
          }}
        >
          Destructive
        </Button>
        
        <Button
          variant="outline"
          onClick={() => {
            toast({
              title: 'Heads up!',
              description: 'Your subscription is about to expire.',
              variant: 'default',
            });
          }}
        >
          Warning
        </Button>
      </div>
    );
  },
};

// Toast with custom icons
export const WithIcons: Story = {
  render: () => {
    const { toast } = useToast();
    
    return (
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          onClick={() => {
            toast({
              title: 'Success',
              description: 'Your changes have been saved.',
              action: (
                <div className="inline-flex h-6 w-6 items-center justify-center">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
              ),
            });
          }}
        >
          Success Icon
        </Button>
        
        <Button
          variant="outline"
          onClick={() => {
            toast({
              title: 'Error',
              description: 'Failed to save changes.',
              action: (
                <div className="inline-flex h-6 w-6 items-center justify-center">
                  <X className="h-5 w-5 text-red-500" />
                </div>
              ),
            });
          }}
        >
          Error Icon
        </Button>
        
        <Button
          variant="outline"
          onClick={() => {
            toast({
              title: 'Warning',
              description: 'Your subscription is about to expire.',
              action: (
                <div className="inline-flex h-6 w-6 items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                </div>
              ),
            });
          }}
        >
          Warning Icon
        </Button>
        
        <Button
          variant="outline"
          onClick={() => {
            toast({
              title: 'Info',
              description: 'Check out our new features!',
              action: (
                <div className="inline-flex h-6 w-6 items-center justify-center">
                  <Info className="h-5 w-5 text-blue-500" />
                </div>
              ),
            });
          }}
        >
          Info Icon
        </Button>
        
        <Button
          variant="outline"
          onClick={() => {
            toast({
              title: 'Notification',
              description: 'You have 3 new messages.',
              action: (
                <div className="inline-flex h-6 w-6 items-center justify-center">
                  <Bell className="h-5 w-5 text-purple-500" />
                </div>
              ),
            });
          }}
        >
          Custom Icon
        </Button>
        
        <Button
          variant="outline"
          onClick={() => {
            toast({
              title: 'Loading',
              description: 'Processing your request...',
              action: (
                <div className="inline-flex h-6 w-6 items-center justify-center">
                  <Loader2 className="h-5 w-5 animate-spin" />
                </div>
              ),
            });
          }}
        >
          Loading Icon
        </Button>
      </div>
    );
  },
};

// Toast with actions
export const WithActions: Story = {
  render: () => {
    const { toast } = useToast();
    
    return (
      <div className="flex flex-col space-y-4">
        <Button
          variant="outline"
          onClick={() => {
            toast({
              title: 'Message sent',
              description: 'Your message has been delivered.',
              action: (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => console.log('Undo action triggered')}
                >
                  Undo
                </Button>
              ),
            });
          }}
        >
          Show Toast with Action
        </Button>
        
        <Button
          variant="outline"
          onClick={() => {
            toast({
              title: 'New update available',
              description: 'Version 2.0 is now available!',
              action: (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open('https://example.com/update', '_blank')}
                >
                  Update
                </Button>
              ),
            });
          }}
        >
          Toast with Link Action
        </Button>
        
        <Button
          variant="outline"
          onClick={() => {
            toast({
              title: 'This action cannot be undone',
              description: 'The file will be permanently deleted.',
              variant: 'destructive',
              action: (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => console.log('File deleted')}
                >
                  Delete
                </Button>
              ),
            });
          }}
        >
          Destructive Action
        </Button>
      </div>
    );
  },
};

// Toast with custom duration
export const WithDuration: Story = {
  render: () => {
    const { toast } = useToast();
    
    return (
      <div className="flex flex-col space-y-4">
        <Button
          variant="outline"
          onClick={() => {
            toast({
              title: 'Quick notification',
              description: 'This will disappear in 1 second',
              duration: 1000,
            });
          }}
        >
          Short Duration (1s)
        </Button>
        
        <Button
          variant="outline"
          onClick={() => {
            toast({
              title: 'Longer notification',
              description: 'This will stay for 10 seconds',
              duration: 10000,
            });
          }}
        >
          Long Duration (10s)
        </Button>
        
        <Button
          variant="outline"
          onClick={() => {
            toast({
              title: 'Persistent notification',
              description: 'This will stay until dismissed',
              duration: Infinity,
            });
          }}
        >
          Persistent Toast
        </Button>
      </div>
    );
  },
};

// Toast with custom class names
export const WithCustomClassNames: Story = {
  render: () => {
    const { toast } = useToast();
    
    return (
      <div className="flex flex-col space-y-4">
        <Button
          variant="outline"
          onClick={() => {
            toast({
              title: 'Custom Styled Toast',
              description: 'This toast has custom styling',
              className: 'border-l-4 border-blue-500',
            });
          }}
        >
          Custom Border
        </Button>
        
        <Button
          variant="outline"
          onClick={() => {
            toast({
              title: 'Gradient Background',
              description: 'This toast has a gradient background',
              className: 'bg-gradient-to-r from-blue-500 to-purple-500 text-white',
            });
          }}
        >
          Gradient Background
        </Button>
        
        <Button
          variant="outline"
          onClick={() => {
            toast({
              title: 'Dark Theme',
              description: 'This toast has dark theme styling',
              className: 'bg-gray-900 text-white border-gray-800',
            });
          }}
        >
          Dark Theme
        </Button>
      </div>
    );
  },
};

// Toast with rich content
export const WithRichContent: Story = {
  render: () => {
    const { toast } = useToast();
    
    return (
      <Button
        variant="outline"
        onClick={() => {
          toast({
            title: 'New Message',
            description: (
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/avatars/01.png" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">John Doe</span>
                </div>
                <p className="text-sm">Hey! How's it going? I wanted to check in and see how the project is coming along.</p>
                <div className="flex justify-end space-x-2 mt-2">
                  <Button variant="outline" size="sm">Reply</Button>
                  <Button size="sm">View Chat</Button>
                </div>
              </div>
            ),
            className: 'w-[400px]',
          });
        }}
      >
        Rich Content Toast
      </Button>
    );
  },
};

// Toast with promise
export const WithPromise: Story = {
  render: () => {
    const { toast } = useToast();
    
    const handleClick = () => {
      // Simulate a promise that resolves after 2 seconds
      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          // Randomly resolve or reject
          Math.random() > 0.5 
            ? resolve('Successfully saved changes!')
            : reject(new Error('Failed to save changes.'));
        }, 2000);
      });
      
      toast.promise(promise, {
        loading: 'Saving changes...',
        success: (data) => ({
          title: 'Success!',
          description: String(data),
          variant: 'success',
        }),
        error: (err) => ({
          title: 'Error',
          description: err instanceof Error ? err.message : 'Something went wrong',
          variant: 'destructive',
        }),
      });
    };
    
    return (
      <Button variant="outline" onClick={handleClick}>
        Show Promise Toast
      </Button>
    );
  },
};

// Toast with different positions
export const Positions: Story = {
  render: () => {
    const { toast } = useToast();
    
    const positions = [
      'top-left',
      'top-center',
      'top-right',
      'bottom-left',
      'bottom-center',
      'bottom-right',
    ] as const;
    
    return (
      <div className="grid grid-cols-2 gap-4">
        {positions.map((position) => (
          <Button
            key={position}
            variant="outline"
            onClick={() => {
              toast({
                title: position,
                description: `This toast appears at the ${position}`,
                position,
              });
            }}
          >
            {position}
          </Button>
        ))}
      </div>
    );
  },
};

// Toast with dismiss button
export const WithDismissButton: Story = {
  render: () => {
    const { toast } = useToast();
    
    return (
      <Button
        variant="outline"
        onClick={() => {
          toast({
            title: 'Dismissible Toast',
            description: 'This toast can be dismissed by clicking the X button',
            dismissible: true,
          });
        }}
      >
        Show Dismissible Toast
      </Button>
    );
  },
};

// Toast with custom close button
export const WithCustomCloseButton: Story = {
  render: () => {
    const { toast } = useToast();
    
    return (
      <Button
        variant="outline"
        onClick={() => {
          toast({
            title: 'Custom Close Button',
            description: 'This toast has a custom close button',
            action: {
              label: 'Close',
              onClick: () => console.log('Toast closed'),
            },
          });
        }}
      >
        Show Toast with Custom Close
      </Button>
    );
  },
};

// Toast with custom component
export const WithCustomComponent: Story = {
  render: () => {
    const { toast } = useToast();
    
    return (
      <Button
        variant="outline"
        onClick={() => {
          toast({
            title: 'Custom Component',
            description: 'This toast uses a custom component',
            children: (
              <div className="mt-2 p-3 bg-muted rounded-md">
                <p className="text-sm font-medium">Custom Content</p>
                <p className="text-xs text-muted-foreground">
                  You can put any React component here
                </p>
              </div>
            ),
          });
        }}
      >
        Show Custom Component Toast
      </Button>
    );
  },
};
