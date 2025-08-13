
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button/button';
import { toast, Toaster } from './sonner';
import { Check, X, Info, AlertTriangle, Loader2, Star } from 'lucide-react';

const meta: Meta<typeof Toaster> = {
  title: 'Components/Sonner',
  component: Toaster,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster position="top-right" />
      </>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Toaster>;

// Basic toast
export const Basic: Story = {
  render: () => (
    <div className="flex flex-col space-y-4">
      <Button
        variant="outline"
        onClick={() => toast('Event has been created')}
      >
        Show Toast
      </Button>
      <p className="text-sm text-muted-foreground">
        Click the button to show a basic toast notification
      </p>
    </div>
  ),
};

// Toast with title
export const WithTitle: Story = {
  render: () => (
    <div className="flex flex-col space-y-4">
      <Button
        variant="outline"
        onClick={() =>
          toast('Success', {
            description: 'Event has been created',
          })
        }
      >
        Show Toast with Title
      </Button>
    </div>
  ),
};

// Toast with description
export const WithDescription: Story = {
  render: () => (
    <div className="flex flex-col space-y-4">
      <Button
        variant="outline"
        onClick={() =>
          toast('Success', {
            description: 'The event has been updated in the database.',
          })
        }
      >
        Show Toast with Description
      </Button>
    </div>
  ),
};

// Different toast variants
export const Variants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <Button
        variant="outline"
        onClick={() =>
          toast('Success', {
            description: 'Your message has been sent',
          })
        }
      >
        Success Toast
      </Button>
      
      <Button
        variant="outline"
        onClick={() =>
          toast('Error', {
            description: 'Please try again later',
          })
        }
      >
        Error Toast
      </Button>
      
      <Button
        variant="outline"
        onClick={() =>
          toast('Info', {
            description: 'New update available',
          })
        }
      >
        Info Toast
      </Button>
      
      <Button
        variant="outline"
        onClick={() =>
          toast('Warning', {
            description: 'Your session will expire soon',
          })
        }
      >
        Warning Toast
      </Button>
    </div>
  ),
};

// Toast with custom icon
export const WithCustomIcon: Story = {
  render: () => (
    <div className="flex flex-col space-y-4">
      <Button
        variant="outline"
        onClick={() =>
          toast('Premium', {
            description: 'Your subscription is active',
            icon: <Star className="h-5 w-5 text-yellow-500" />,
          })
        }
      >
        Show Toast with Custom Icon
      </Button>
    </div>
  ),
};

// Toast with action
export const WithAction: Story = {
  render: () => (
    <div className="flex flex-col space-y-4">
      <Button
        variant="outline"
        onClick={() =>
          toast('This action cannot be undone', {
            description: 'Are you sure?',
            action: {
              label: 'Undo',
              onClick: () => console.log('Undo action triggered'),
            },
          })
        }
      >
        Show Toast with Action
      </Button>
    </div>
  ),
};

// Loading toast
export const Loading: Story = {
  render: () => {
    const handleClick = () => {
      const toastId = toast.loading('Processing your request...', {
        description: 'Uploading file',
      });
      
      // Simulate an async operation
      setTimeout(() => {
        toast.success('File uploaded successfully', {
          id: toastId,
        });
      }, 2000);
    };
    
    return (
      <Button variant="outline" onClick={handleClick}>
        Show Loading Toast
      </Button>
    );
  },
};

// Promise toast
export const PromiseToast: Story = {
  render: () => {
    const handleClick = () => {
      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.5) {
            resolve('Data loaded successfully');
          } else {
            reject(new Error('Failed to load data'));
          }
        }, 2000);
      });
      
      toast.promise(promise, {
        loading: 'Loading data...',
        success: (data) => `${data}`,
        error: (err) => `Error: ${err.message}`,
      });
    };
    
    return (
      <Button variant="outline" onClick={handleClick}>
        Show Promise Toast
      </Button>
    );
  },
};

// Custom toast component
export const CustomToast: Story = {
  render: () => {
    const showCustomToast = () => {
      toast.custom((t) => (
        <div className="flex items-center space-x-3 p-4 bg-background border rounded-lg shadow-lg">
          <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
          <div>
            <p className="font-medium">Custom Notification</p>
            <p className="text-sm text-muted-foreground">This is a custom toast component</p>
          </div>
          <button
            onClick={() => toast.dismiss(t)}
            className="ml-auto text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ));
    };
    
    return (
      <Button variant="outline" onClick={showCustomToast}>
        Show Custom Toast
      </Button>
    );
  },
};

// Toast with different positions
export const Positions: Story = {
  render: () => {
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
              toast(`Toast at ${position}`, {
                position,
                description: position,
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

// Toast with duration
export const Duration: Story = {
  render: () => (
    <div className="flex flex-col space-y-4">
      <Button
        variant="outline"
        onClick={() =>
          toast('This toast will disappear after 1 second', {
            duration: 1000,
          })
        }
      >
        Show Short Toast (1s)
      </Button>
      
      <Button
        variant="outline"
        onClick={() =>
          toast('This toast will stay for 10 seconds', {
            duration: 10000,
          })
        }
      >
        Show Long Toast (10s)
      </Button>
      
      <Button
        variant="outline"
        onClick={() =>
          toast('This toast will stay until dismissed', {
            duration: Infinity,
          })
        }
      >
        Show Persistent Toast
      </Button>
    </div>
  ),
};

// Toast with rich content
export const RichContent: Story = {
  render: () => (
    <div className="flex flex-col space-y-4">
      <Button
        variant="outline"
        onClick={() =>
          toast(
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Check className="h-5 w-5 text-green-500" />
                <h4 className="font-medium">Payment Successful</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Your payment of $19.99 has been processed successfully.
              </p>
              <div className="mt-2 flex justify-end space-x-2">
                <Button variant="outline" size="sm">
                  View Receipt
                </Button>
                <Button size="sm">Continue Shopping</Button>
              </div>
            </div>
          )
        }
      >
        Show Rich Content Toast
      </Button>
    </div>
  ),
};

// Toast with different icons
export const WithIcons: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <Button
        variant="outline"
        onClick={() =>
          toast('Your action was successful', {
            description: 'Success',
            icon: <Check className="h-5 w-5 text-green-500" />,
          })
        }
      >
        Success with Icon
      </Button>
      
      <Button
        variant="outline"
        onClick={() =>
          toast('Please check your connection', {
            description: 'Error',
            icon: <X className="h-5 w-5 text-red-500" />,
          })
        }
      >
        Error with Icon
      </Button>
      
      <Button
        variant="outline"
        onClick={() =>
          toast('New features available', {
            description: 'Info',
            icon: <Info className="h-5 w-5 text-blue-500" />,
          })
        }
      >
        Info with Icon
      </Button>
      
      <Button
        variant="outline"
        onClick={() =>
          toast('Please check your settings', {
            description: 'Warning',
            icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
          })
        }
      >
        Warning with Icon
      </Button>
      
      <Button
        variant="outline"
        onClick={() =>
          toast('Processing your request', {
            description: 'Loading',
            icon: <Loader2 className="h-5 w-5 animate-spin" />,
          })
        }
      >
        Loading with Icon
      </Button>
    </div>
  ),
};

// Toast with dismiss button
export const WithDismissButton: Story = {
  render: () => (
    <div className="flex flex-col space-y-4">
      <Button
        variant="outline"
        onClick={() =>
          toast('This toast has a close button', {
            description: 'Dismissible',
            dismissible: true,
          })
        }
      >
        Show Dismissible Toast
      </Button>
    </div>
  ),
};
