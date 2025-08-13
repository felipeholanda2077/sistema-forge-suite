import type { Meta, StoryObj } from '@storybook/react';
import { Toaster } from '../Toaster/toaster';
import { Button } from '../Button/button';
import { useToast } from '../use-toast';
import { ToastAction } from '@radix-ui/react-toast';
import { Check, X, AlertTriangle, Info, Bell, CheckCircle, XCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

const meta: Meta<typeof Toaster> = {
  title: 'Components/Toast',
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

// Toast component that uses the useToast hook
const ToastDemo = () => {
  const { toast } = useToast();
  
  return (
    <div className="flex flex-wrap gap-4">
      <Button
        variant="outline"
        onClick={() => {
          toast({
            title: 'Scheduled: Catch up',
            description: 'Friday, February 10, 2023 at 5:57 PM',
            action: (
              <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
            ),
          });
        }}
      >
        Show Toast
      </Button>
      
      <Button
        variant="outline"
        onClick={() => {
          toast({
            title: 'Success!',
            description: 'Your changes have been saved.',
            variant: 'success',
          });
        }}
      >
        Success Toast
      </Button>
      
      <Button
        variant="outline"
        onClick={() => {
          toast({
            title: 'Error!',
            description: 'There was an error processing your request.',
            variant: 'destructive',
          });
        }}
      >
        Error Toast
      </Button>
    </div>
  );
};

// Toast with icons
const ToastWithIcons = () => {
  const { toast } = useToast();
  
  return (
    <div className="flex flex-wrap gap-4">
      <Button
        variant="outline"
        onClick={() => {
          toast({
            title: 'Info',
            description: 'This is an informational message.',
            icon: <Info className="h-5 w-5 text-blue-500" />,
          });
        }}
      >
        Info with Icon
      </Button>
      
      <Button
        variant="outline"
        onClick={() => {
          toast({
            title: 'Warning',
            description: 'This action cannot be undone.',
            icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
          });
        }}
      >
        Warning with Icon
      </Button>
      
      <Button
        variant="outline"
        onClick={() => {
          toast({
            title: 'Success',
            description: 'Your action was successful!',
            icon: <CheckCircle className="h-5 w-5 text-green-500" />,
          });
        }}
      >
        Success with Icon
      </Button>
      
      <Button
        variant="outline"
        onClick={() => {
          toast({
            title: 'Error',
            description: 'Something went wrong!',
            icon: <XCircle className="h-5 w-5 text-red-500" />,
          });
        }}
      >
        Error with Icon
      </Button>
    </div>
  );
};

// Toast with actions
const ToastWithActions = () => {
  const { toast } = useToast();
  
  return (
    <div className="flex flex-wrap gap-4">
      <Button
        variant="outline"
        onClick={() => {
          toast({
            title: 'New update available',
            description: 'A new version of the app is available.',
            action: (
              <ToastAction altText="Update now" onClick={() => alert('Updating...')}>
                Update
              </ToastAction>
            ),
          });
        }}
      >
        Update Available
      </Button>
      
      <Button
        variant="outline"
        onClick={() => {
          toast({
            title: 'Message sent',
            description: 'Your message has been sent successfully.',
            action: (
              <ToastAction altText="Dismiss" className="text-muted-foreground">
                Dismiss
              </ToastAction>
            ),
          });
        }}
      >
        Message Sent
      </Button>
      
      <Button
        variant="outline"
        onClick={() => {
          const toastId = 'custom-id';
          toast({
            id: toastId,
            title: 'Item added to cart',
            description: 'Check your cart to proceed to checkout.',
            action: (
              <>
                <ToastAction altText="View cart" onClick={() => alert('Viewing cart...')}>
                  View Cart
                </ToastAction>
                <ToastAction altText="Undo" onClick={() => alert('Undo add to cart')}>
                  Undo
                </ToastAction>
              </>
            ),
          });
        }}
      >
        Cart Action
      </Button>
    </div>
  );
};

// Auto-dismissing toast
const AutoDismissToast = () => {
  const { toast } = useToast();
  
  return (
    <div className="flex flex-wrap gap-4">
      <Button
        variant="outline"
        onClick={() => {
          toast({
            title: 'This will auto-dismiss',
            description: 'This toast will automatically close after 3 seconds.',
            duration: 3000,
          });
        }}
      >
        Auto Dismiss (3s)
      </Button>
      
      <Button
        variant="outline"
        onClick={() => {
          toast({
            title: 'This will stay longer',
            description: 'This toast will stay for 10 seconds.',
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
            title: 'This will stay until dismissed',
            description: 'Click the X to close this toast.',
            duration: 1000000, // Effectively never auto-close
          });
        }}
      >
        Manual Dismiss
      </Button>
    </div>
  );
};

// Positioned toasts
const PositionedToasts = () => {
  const { toast } = useToast();
  
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Top-Left</h3>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            toast({
              title: 'Top-Left Toast',
              description: 'This toast appears in the top-left corner.',
              position: 'top-left',
            });
          }}
        >
          Top-Left
        </Button>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Top-Right</h3>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            toast({
              title: 'Top-Right Toast',
              description: 'This toast appears in the top-right corner.',
              position: 'top-right',
            });
          }}
        >
          Top-Right
        </Button>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Bottom-Left</h3>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            toast({
              title: 'Bottom-Left Toast',
              description: 'This toast appears in the bottom-left corner.',
              position: 'bottom-left',
            });
          }}
        >
          Bottom-Left
        </Button>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Bottom-Right</h3>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            toast({
              title: 'Bottom-Right Toast',
              description: 'This toast appears in the bottom-right corner.',
              position: 'bottom-right',
            });
          }}
        >
          Bottom-Right
        </Button>
      </div>
    </div>
  );
};

// Toast with progress
const ToastWithProgress = () => {
  const { toast } = useToast();
  const [progress, setProgress] = useState(0);
  
  const showProgressToast = () => {
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
    
    toast({
      title: 'Uploading...',
      description: 'Your file is being uploaded.',
      duration: 6000,
      progress: progress,
    });
  };
  
  return (
    <Button variant="outline" onClick={showProgressToast}>
      Show Progress Toast
    </Button>
  );
};

// Toast with custom content
const CustomToastContent = () => {
  const { toast } = useToast();
  
  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          title: 'Custom Styled Toast',
          description: 'This toast has custom styling.',
          className: 'border-l-4 border-blue-500',
          action: (
            <ToastAction altText="Dismiss">
              <X className="h-4 w-4" />
            </ToastAction>
          ),
        });
      }}
    >
      Custom Styled Toast
    </Button>
  );
};

// Toast with promise
const ToastWithPromise = () => {
  const { toast } = useToast();
  
  const handleClick = () => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          resolve('Success!');
        } else {
          reject(new Error('Something went wrong'));
        }
      }, 3000);
    });
    
    toast.promise(promise, {
      loading: 'Loading...',
      success: (data) => `Successfully completed: ${data}`,
      error: (err) => `Error: ${err.message}`,
    });
  };
  
  return (
    <Button variant="outline" onClick={handleClick}>
      Show Promise Toast
    </Button>
  );
};

// Toast with countdown
const ToastWithCountdown = () => {
  const { toast } = useToast();
  const [countdown, setCountdown] = useState(5);
  
  const showCountdownToast = () => {
    setCountdown(5);
    
    const toastId = 'countdown-toast';
    
    toast({
      id: toastId,
      title: 'Action required',
      description: `This will be automatically dismissed in ${countdown} seconds.`,
      duration: 6000,
    });
    
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  
  return (
    <Button variant="outline" onClick={showCountdownToast}>
      Show Countdown Toast
    </Button>
  );
};

export const Default: Story = {
  render: () => <ToastDemo />,
};

export const WithIcons: Story = {
  render: () => <ToastWithIcons />,
};

export const WithActions: Story = {
  render: () => <ToastWithActions />,
};

export const AutoDismiss: Story = {
  render: () => <AutoDismissToast />,
};

export const Positions: Story = {
  render: () => <PositionedToasts />,
};

export const WithProgress: Story = {
  render: () => <ToastWithProgress />,
};

export const CustomContent: Story = {
  render: () => <CustomToastContent />,
};

export const WithPromise: Story = {
  render: () => <ToastWithPromise />,
};

export const WithCountdown: Story = {
  render: () => <ToastWithCountdown />,
};
