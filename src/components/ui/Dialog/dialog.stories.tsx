import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '../Button/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from './dialog';

export default {
  title: 'Components/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof Dialog>;

type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account and remove your
              data from our servers.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <p>This is the dialog content. You can put any content here.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => setOpen(false)}>
              Delete account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
};

export const AlertDialog = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Show Alert</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Important Notice</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Your session is about to expire in 2 minutes. Would you like to stay signed in?</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Sign out
            </Button>
            <Button onClick={() => setOpen(false)}>Stay signed in</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
};

export const FormDialog = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right">
                Name
              </label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3 border p-2 rounded"
                placeholder="Enter your name"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="username" className="text-right">
                Username
              </label>
              <input
                id="username"
                className="col-span-3 border p-2 rounded"
                placeholder="Enter your username"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={() => setOpen(false)}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
};

export const FullScreenDialog = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">View Full Screen</Button>
        </DialogTrigger>
        <DialogContent className="h-[90vh] max-w-[90vw] w-full">
          <DialogHeader>
            <DialogTitle>Full Screen Content</DialogTitle>
            <DialogDescription>
              This dialog takes up most of the screen space.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 overflow-auto h-full">
            <p className="mb-4">Scrollable content area</p>
            {Array.from({ length: 20 }).map((_, i) => (
              <p key={i} className="p-2 border-b">Content item {i + 1}</p>
            ))}
          </div>
          <DialogFooter>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
};
