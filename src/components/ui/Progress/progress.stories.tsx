import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from './progress';
import { useState, useEffect } from 'react';
import { Button } from '../Button/button';

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: {
    value: 33,
  },
};

export const Indeterminate: Story = {
  render: () => <Progress />,
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex flex-col gap-2 w-[400px]">
      <div className="flex justify-between">
        <span className="text-sm font-medium">Storage Usage</span>
        <span className="text-sm text-muted-foreground">65%</span>
      </div>
      <Progress value={65} className="h-2" />
    </div>
  ),
};

export const DifferentColors: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-1">
        <span className="text-sm font-medium">Default</span>
        <Progress value={45} className="h-2" />
      </div>
      <div className="space-y-1">
        <span className="text-sm font-medium">Primary</span>
        <Progress value={65} className="h-2 bg-primary/20" indicatorClassName="bg-primary" />
      </div>
      <div className="space-y-1">
        <span className="text-sm font-medium">Destructive</span>
        <Progress value={85} className="h-2 bg-destructive/20" indicatorClassName="bg-destructive" />
      </div>
      <div className="space-y-1">
        <span className="text-sm font-medium">Success</span>
        <Progress value={75} className="h-2 bg-green-200" indicatorClassName="bg-green-600" />
      </div>
    </div>
  ),
};

export const DifferentSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-1">
        <span className="text-sm font-medium">Small (h-1)</span>
        <Progress value={33} className="h-1" />
      </div>
      <div className="space-y-1">
        <span className="text-sm font-medium">Default (h-2)</span>
        <Progress value={66} className="h-2" />
      </div>
      <div className="space-y-1">
        <span className="text-sm font-medium">Large (h-3)</span>
        <Progress value={100} className="h-3" />
      </div>
      <div className="space-y-1">
        <span className="text-sm font-medium">X-Large (h-4)</span>
        <Progress value={50} className="h-4" />
      </div>
    </div>
  ),
};

export const AnimatedProgress: Story = {
  render: () => {
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      if (!isLoading) return;
      
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress >= 100) {
            setIsLoading(false);
            clearInterval(timer);
            return 100;
          }
          return Math.min(oldProgress + Math.random() * 15, 100);
        });
      }, 500);

      return () => {
        clearInterval(timer);
      };
    }, [isLoading]);

    const handleClick = () => {
      setProgress(0);
      setIsLoading(true);
    };

    return (
      <div className="space-y-4">
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Uploading files...</span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        <Button onClick={handleClick} disabled={isLoading}>
          {isLoading ? 'Uploading...' : 'Start Upload'}
        </Button>
      </div>
    );
  },
};

export const WithSteps: Story = {
  render: () => {
    const steps = [
      { label: 'Account', value: 0 },
      { label: 'Profile', value: 33 },
      { label: 'Billing', value: 66 },
      { label: 'Complete', value: 100 },
    ];
    
    const [currentStep, setCurrentStep] = useState(0);
    
    return (
      <div className="space-y-8">
        <div className="relative
        ">
          <Progress 
            value={steps[currentStep].value} 
            className="h-2"
            indicatorClassName="bg-primary"
          />
          <div className="flex justify-between mt  -2">
            {steps.map((step, index) => (
              <div 
                key={step.label}
                className={`flex flex-col items-center ${index <= currentStep ? 'text-primary' : 'text-muted-foreground'}`}
              >
                <div 
                  className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-medium mb-1 ${
                    index <= currentStep 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted'
                  }`}
                >
                  {index + 1}
                </div>
                <span className="text-xs">{step.label}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={() => setCurrentStep(p => Math.max(0, p - 1))}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          <Button 
            onClick={() => setCurrentStep(p => Math.min(steps.length - 1, p + 1))}
            disabled={currentStep === steps.length - 1}
          >
            {currentStep === steps.length - 2 ? 'Finish' : 'Next'}
          </Button>
        </div>
      </div>
    );
  },
};
