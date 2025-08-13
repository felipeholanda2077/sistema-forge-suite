/* eslint-disable storybook/no-renderer-packages */
import type { Meta, StoryObj } from '@storybook/react';
import { Alert, AlertDescription, AlertTitle } from './alert';
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from 'lucide-react';
import { useState } from 'storybook/internal/preview-api';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'destructive'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
  ),
};

export const InfoAlert: Story = {
  render: () => (
    <Alert>
      <Info className="h-4 w-4" />
      <AlertTitle>Info</AlertTitle>
      <AlertDescription>
        This is an informational alert that can be used to provide context to the user.
      </AlertDescription>
    </Alert>
  ),
};

export const SuccessAlert: Story = {
  render: () => (
    <Alert className="border-green-600 bg-green-50 text-green-800">
      <CheckCircle2 className="h-4 w-4" />
      <AlertTitle>Success!</AlertTitle>
      <AlertDescription>
        Your account has been created successfully.
      </AlertDescription>
    </Alert>
  ),
};

export const WarningAlert: Story = {
  render: () => (
    <Alert className="border-yellow-600 bg-yellow-50 text-yellow-800">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Warning</AlertTitle>
      <AlertDescription>
        Your storage is almost full. Consider upgrading your plan.
      </AlertDescription>
    </Alert>
  ),
};

export const ErrorAlert: Story = {
  render: () => (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
  ),
};

export const WithActions: Story = {
  render: () => (
    <Alert>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <AlertTitle>New feature available!</AlertTitle>
          <AlertDescription>
            Check out our new dashboard with improved analytics.
          </AlertDescription>
        </div>
        <button className="ml-4 text-sm font-medium text-blue-600 hover:text-blue-700">
          View
        </button>
      </div>
    </Alert>
  ),
};

export const Dismissible: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    
    if (!isOpen) return null;
    
    return (
      <Alert>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <AlertTitle>Dismissible Alert</AlertTitle>
            <AlertDescription>
              This alert can be dismissed by clicking the close button.
            </AlertDescription>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>
      </Alert>
    );
  },
};
