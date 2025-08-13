import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';
import { Button } from '../Button/button';
import { Info, HelpCircle, AlertCircle, CheckCircle2 } from 'lucide-react';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <TooltipProvider>
        <div className="flex items-center justify-center p-20">
          <Story />
        </div>
      </TooltipProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This is a tooltip</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon">
          <Info className="h-4 w-4" />
          <span className="sr-only">Information</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Additional information about this action</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const WithCustomContent: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon">
          <HelpCircle className="h-4 w-4" />
          <span className="sr-only">Help</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent className="max-w-[300px]">
        <h4 className="font-semibold mb-1">Need help?</h4>
        <p className="text-sm">
          This is a more detailed tooltip that can contain additional information,
          links, or even interactive elements.
        </p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const WithStatusIcons: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon">
            <Info className="h-4 w-4 text-blue-500" />
            <span className="sr-only">Info</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>This is an informational message</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span className="sr-only">Success</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Operation completed successfully</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon">
            <AlertCircle className="h-4 w-4 text-yellow-500" />
            <span className="sr-only">Warning</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>This action requires your attention</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
};

export const WithDelay: Story = {
  render: () => (
    <Tooltip delayDuration={500}>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me (500ms delay)</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This tooltip has a 500ms delay</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" disabled>
          Disabled Button
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This tooltip won't show because the button is disabled</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const WithCustomStyling: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Custom Styled Tooltip</Button>
      </TooltipTrigger>
      <TooltipContent className="bg-purple-900 text-white border-purple-700">
        <p>This tooltip has custom styling</p>
      </TooltipContent>
    </Tooltip>
  ),
};
