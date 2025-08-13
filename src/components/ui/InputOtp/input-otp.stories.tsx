import type { Meta, StoryObj } from '@storybook/react';
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from './input-otp';
import { Button } from '../Button/button';
import { Check, Loader2, RotateCw, ShieldAlert } from 'lucide-react';
import React from 'react';

const meta: Meta<typeof InputOTP> = {
  title: 'Components/Input OTP',
  component: InputOTP,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof InputOTP>;

// Basic OTP input
export const Basic: Story = {
  render: () => (
    <div className="space-y-2">
      <InputOTP maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <p className="text-sm text-muted-foreground">Enter your one-time password.</p>
    </div>
  ),
};

// OTP with separator
export const WithSeparator: Story = {
  render: () => (
    <div className="space-y-2">
      <InputOTP maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <p className="text-sm text-muted-foreground">Enter the 6-digit code sent to your email.</p>
    </div>
  ),
};

// OTP with validation
export const WithValidation: Story = {
  render: () => {
    const validateOTP = (value: string) => {
      // In a real app, you would validate against your backend
      return value === '123456';
    };

    return (
      <div className="space-y-4">
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            {[...Array(6)].map((_, i) => (
              <InputOTPSlot key={i} index={i} />
            ))}
          </InputOTPGroup>
        </InputOTP>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              const value = document.querySelector('input[type="text"]')?.value || '';
              const isValid = validateOTP(value);
              alert(isValid ? 'Verification successful!' : 'Invalid code. Please try again.');
            }}
          >
            Verify Code
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            Resend Code
          </Button>
        </div>
      </div>
    );
  },
};

// OTP with loading state
export const WithLoading: Story = {
  render: () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [isVerified, setIsVerified] = React.useState(false);
    
    const handleVerify = () => {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        setIsVerified(true);
        
        // Reset after 3 seconds
        setTimeout(() => {
          setIsVerified(false);
        }, 3000);
      }, 1500);
    };
    
    return (
      <div className="space-y-4">
        <InputOTP maxLength={6} disabled={isLoading || isVerified}>
          <InputOTPGroup>
            {[...Array(6)].map((_, i) => (
              <InputOTPSlot key={i} index={i} />
            ))}
          </InputOTPGroup>
        </InputOTP>
        
        {isVerified ? (
          <div className="flex items-center justify-center space-x-2 text-green-600">
            <Check className="h-4 w-4" />
            <span>Verified successfully!</span>
          </div>
        ) : (
          <Button 
            onClick={handleVerify}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : 'Verify'}
          </Button>
        )}
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-muted-foreground w-full"
          disabled={isLoading}
        >
          <RotateCw className="mr-2 h-4 w-4" />
          Resend Code
        </Button>
      </div>
    );
  },
};

// OTP with error state
export const WithError: Story = {
  render: () => {
    const [hasError, setHasError] = React.useState(false);
    
    return (
      <div className="space-y-4">
        <InputOTP 
          maxLength={6} 
          className={hasError ? 'border-red-500' : ''}
          onComplete={(value) => {
            // Simple validation - in a real app, you'd validate with your backend
            setHasError(value !== '123456');
          }}
        >
          <InputOTPGroup>
            {[...Array(6)].map((_, i) => (
              <InputOTPSlot key={i} index={i} className={hasError ? 'border-red-500' : ''} />
            ))}
          </InputOTPGroup>
        </InputOTP>
        
        {hasError && (
          <div className="flex items-center text-sm text-red-500">
            <ShieldAlert className="mr-2 h-4 w-4" />
            <span>Invalid verification code. Please try again.</span>
          </div>
        )}
        
        <Button className="w-full">Verify</Button>
        
        <div className="text-center text-sm text-muted-foreground">
          Didn't receive a code?{' '}
          <button className="text-primary hover:underline">Resend</button>
        </div>
      </div>
    );
  },
};

// OTP with custom styling
export const CustomStyled: Story = {
  render: () => (
    <div className="space-y-4">
      <InputOTP maxLength={4}>
        <InputOTPGroup className="space-x-2">
          {[...Array(4)].map((_, i) => (
            <InputOTPSlot 
              key={i} 
              index={i}
              className="h-14 w-12 text-lg border-2 border-foreground/20 hover:border-foreground/50 transition-colors"
            />
          ))}
        </InputOTPGroup>
      </InputOTP>
      <p className="text-sm text-muted-foreground">Enter the 4-digit code sent to your phone.</p>
    </div>
  ),
};

// OTP with auto-submit
export const WithAutoSubmit: Story = {
  render: () => {
    const [value, setValue] = React.useState('');
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [isVerified, setIsVerified] = React.useState(false);
    
    const handleComplete = (code: string) => {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        
        // In a real app, you would verify the code with your backend
        if (code === '123456') {
          setIsVerified(true);
        }
      }, 1000);
    };
    
    if (isVerified) {
      return (
        <div className="text-center space-y-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <Check className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-lg font-medium">Verification Successful!</h3>
          <p className="text-sm text-muted-foreground">You've been successfully verified.</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => {
              setValue('');
              setIsVerified(false);
            }}
          >
            Start Over
          </Button>
        </div>
      );
    }
    
    return (
      <div className="space-y-4">
        <div className="text-center space-y-1">
          <h3 className="text-lg font-medium">Verify your identity</h3>
          <p className="text-sm text-muted-foreground">Enter the verification code sent to your email</p>
        </div>
        
        <InputOTP 
          maxLength={6} 
          value={value}
          onChange={(value) => setValue(value)}
          onComplete={handleComplete}
          disabled={isSubmitting}
        >
          <InputOTPGroup>
            {[...Array(6)].map((_, i) => (
              <InputOTPSlot 
                key={i} 
                index={i}
                className="h-12 w-10 text-lg"
              />
            ))}
          </InputOTPGroup>
        </InputOTP>
        
        {isSubmitting && (
          <div className="flex justify-center">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        )}
        
        <div className="text-center text-sm text-muted-foreground">
          Didn't receive a code?{' '}
          <button className="text-primary hover:underline">Resend</button>
        </div>
      </div>
    );
  },
};

// OTP with countdown timer
export const WithCountdown: Story = {
  render: () => {
    const [seconds, setSeconds] = React.useState(30);
    const [isActive, setIsActive] = React.useState(true);
    
    React.useEffect(() => {
      let interval: NodeJS.Timeout | null = null;
      
      if (isActive && seconds > 0) {
        interval = setInterval(() => {
          setSeconds((secs) => secs - 1);
        }, 1000);
      } else if (seconds === 0) {
        setIsActive(false);
      }
      
      return () => {
        if (interval) clearInterval(interval);
      };
    }, [isActive, seconds]);
    
    const handleResend = () => {
      setSeconds(30);
      setIsActive(true);
      // In a real app, you would trigger the resend OTP logic here
    };
    
    return (
      <div className="space-y-4">
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            {[...Array(6)].map((_, i) => (
              <InputOTPSlot key={i} index={i} />
            ))}
          </InputOTPGroup>
        </InputOTP>
        
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-muted-foreground"
            onClick={handleResend}
            disabled={isActive}
          >
            Resend Code
          </Button>
          
          {isActive && (
            <span className="text-sm text-muted-foreground">
              Resend in {seconds}s
            </span>
          )}
        </div>
      </div>
    );
  },
};
