import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from './card';
import { Button } from '../Button/button';
import { Avatar, AvatarFallback, AvatarImage } from '../Avatar/avatar';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the card content. You can put any content here.</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Continue</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithImage: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>User Profile</CardTitle>
            <CardDescription>@username</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p>User information and details can be displayed here.</p>
      </CardContent>
    </Card>
  ),
};

export const StatsCard: Story = {
  render: () => (
    <Card className="w-[200px] text-center">
      <CardHeader className="pb-2">
        <CardTitle className="text-4xl font-bold">1,234</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Total Users</p>
      </CardContent>
    </Card>
  ),
};

export const InteractiveCard: Story = {
  render: () => (
    <Card className="w-[300px] overflow-hidden transition-shadow hover:shadow-lg">
      <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600" />
      <CardHeader>
        <CardTitle>Interactive Card</CardTitle>
        <CardDescription>Hover over me!</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This card has a hover effect and gradient header.</p>
      </CardContent>
    </Card>
  ),
};
