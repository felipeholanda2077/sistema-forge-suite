import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <div className="mt-4">
        <TabsContent value="account">
          <div className="rounded-md border p-4">
            <h3 className="text-lg font-medium mb-2">Account Settings</h3>
            <p className="text-sm text-muted-foreground">
              Make changes to your account here. Click save when you're done.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="password">
          <div className="rounded-md border p-4">
            <h3 className="text-lg font-medium mb-2">Change Password</h3>
            <p className="text-sm text-muted-foreground">
              Update your password here. Make sure it's secure and you remember it.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="notifications">
          <div className="rounded-md border p-4">
            <h3 className="text-lg font-medium mb-2">Notifications</h3>
            <p className="text-sm text-muted-foreground">
              Configure how you receive notifications.
            </p>
          </div>
        </TabsContent>
      </div>
    </Tabs>
  ),
};

export const VerticalTabs: Story = {
  render: () => (
    <Tabs defaultValue="account" className="flex gap-4" orientation="vertical">
      <TabsList className="flex-col h-auto">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <div className="w-[300px]">
        <TabsContent value="account">
          <div className="rounded-md border p-4">
            <h3 className="text-lg font-medium mb-2">Account Settings</h3>
            <p className="text-sm text-muted-foreground">
              Make changes to your account here.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="password">
          <div className="rounded-md border p-4">
            <h3 className="text-lg font-medium mb-2">Change Password</h3>
            <p className="text-sm text-muted-foreground">
              Update your password here.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="notifications">
          <div className="rounded-md border p-4">
            <h3 className="text-lg font-medium mb-2">Notifications</h3>
            <p className="text-sm text-muted-foreground">
              Configure how you receive notifications.
            </p>
          </div>
        </TabsContent>
      </div>
    </Tabs>
  ),
};

export const DisabledTab: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password" disabled>
          Password (Disabled)
        </TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <div className="mt-4">
        <TabsContent value="account">
          <div className="rounded-md border p-4">
            <h3 className="text-lg font-medium mb-2">Account Settings</h3>
            <p className="text-sm text-muted-foreground">
              This tab is active and functional.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="notifications">
          <div className="rounded-md border p-4">
            <h3 className="text-lg font-medium mb-2">Notifications</h3>
            <p className="text-sm text-muted-foreground">
              This tab is also functional.
            </p>
          </div>
        </TabsContent>
      </div>
    </Tabs>
  ),
};
