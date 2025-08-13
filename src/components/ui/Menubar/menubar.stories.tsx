import type { Meta, StoryObj } from '@storybook/react-vite';
import { 
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarLabel,
  MenubarGroup,
} from './menubar';
import { Button } from '../Button/button';
import { 
  Bookmark, 
  Check, 
  ChevronRight, 
  Circle, 
  File, 
  Moon, 
  MoreHorizontal, 
  Plus, 
  Sun, 
  User 
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../../lib/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import { DialogHeader } from '../Dialog/dialog';
import { Menu } from '@radix-ui/react-menubar';

const meta: Meta<typeof Menubar> = {
  title: 'Components/Menubar',
  component: Menubar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Menubar>;

// Basic menubar
export const Basic: Story = {
  render: (args) => (
    <Menubar {...args}>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>New Tab <MenubarShortcut>⌘T</MenubarShortcut></MenubarItem>
          <MenubarItem>New Window <MenubarShortcut>⌘N</MenubarShortcut></MenubarItem>
          <MenubarItem disabled>New Incognito Window</MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Share</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Email link</MenubarItem>
              <MenubarItem>Messages</MenubarItem>
              <MenubarItem>Notes</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>Print... <MenubarShortcut>⌘P</MenubarShortcut></MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Undo <MenubarShortcut>⌘Z</MenubarShortcut></MenubarItem>
          <MenubarItem>Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut></MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Find</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Search the web</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Find...</MenubarItem>
              <MenubarItem>Find Next</MenubarItem>
              <MenubarItem>Find Previous</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>Cut</MenubarItem>
          <MenubarItem>Copy</MenubarItem>
          <MenubarItem>Paste</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem>Always Show Bookmarks Bar</MenubarCheckboxItem>
          <MenubarCheckboxItem checked>Always Show Full URLs</MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarItem>
            Reload <MenubarShortcut>⌘R</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Toggle Fullscreen</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Hide Sidebar</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Profiles</MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup value="benoit">
            <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
            <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
            <MenubarRadioItem value="Luis">Luis</MenubarRadioItem>
          </MenubarRadioGroup>
          <MenubarSeparator />
          <MenubarItem>Edit...</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Add Profile...</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
};

// With icons and groups
export const WithIconsAndGroups: Story = {
  render: () => {
    const [theme, setTheme] = useState('system');
    
    return (
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger className="flex items-center gap-2">
            <File className="h-4 w-4" />
            <span>File</span>
          </MenubarTrigger>
          <MenubarContent>
            <MenubarGroup>
              <MenubarLabel>New</MenubarLabel>
              <MenubarItem>
                <File className="mr-2 h-4 w-4" />
                New File
                <MenubarShortcut>⌘N</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                <Plus className="mr-2 h-4 w-4" />
                New Project
                <MenubarShortcut>⇧⌘N</MenubarShortcut>
              </MenubarItem>
            </MenubarGroup>
            <MenubarSeparator />
            <MenubarItem>
              <Bookmark className="mr-2 h-4 w-4" />
              Open Recent
              <ChevronRight className="ml-auto h-4 w-4" />
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Undo</MenubarItem>
            <MenubarItem>Redo</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Cut</MenubarItem>
            <MenubarItem>Copy</MenubarItem>
            <MenubarItem>Paste</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarCheckboxItem>
              Show Sidebar
              <MenubarShortcut>⌘B</MenubarShortcut>
            </MenubarCheckboxItem>
            <MenubarCheckboxItem checked>
              Show Status Bar
            </MenubarCheckboxItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Appearance</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarRadioGroup value={theme} onValueChange={setTheme}>
                  <MenubarRadioItem value="light">
                    <Sun className="mr-2 h-4 w-4" />
                    Light
                    {theme === 'light' && <Check className="ml-auto h-4 w-4" />}
                  </MenubarRadioItem>
                  <MenubarRadioItem value="dark">
                    <Moon className="mr-2 h-4 w-4" />
                    Dark
                    {theme === 'dark' && <Check className="ml-auto h-4 w-4" />}
                  </MenubarRadioItem>
                  <MenubarRadioItem value="system">
                    <Circle className="mr-2 h-2 w-2" />
                    System
                    {theme === 'system' && <Check className="ml-auto h-4 w-4" />}
                  </MenubarRadioItem>
                </MenubarRadioGroup>
              </MenubarSubContent>
            </MenubarSub>
          </MenubarContent>
        </MenubarMenu>
        
        <MenubarMenu>
          <MenubarTrigger>Account</MenubarTrigger>
          <MenubarContent>
            <div className="flex items-center justify-start gap-2 p-2">
              <Avatar className="h-8 w-8">
                <div className="flex h-full items-center justify-center rounded-full bg-primary">
                  <User className="h-4 w-4 text-primary-foreground" />
                </div>
              </Avatar>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs leading-none text-muted-foreground">john@example.com</p>
              </div>
            </div>
            <MenubarSeparator />
            <MenubarItem>Profile</MenubarItem>
            <MenubarItem>Billing</MenubarItem>
            <MenubarItem>Settings</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Sign out</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );
  },
};

// With search and actions
export const WithSearchAndActions: Story = {
  render: () => (
    <div className="flex w-full max-w-3xl items-center justify-between space-x-4">
      <Menubar className="border-0 p-0">
        <MenubarMenu>
          <MenubarTrigger className="font-semibold">File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New File</MenubarItem>
            <MenubarItem>Open File...</MenubarItem>
            <MenubarItem>Save</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Export</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="font-semibold">Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Undo</MenubarItem>
            <MenubarItem>Redo</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Cut</MenubarItem>
            <MenubarItem>Copy</MenubarItem>
            <MenubarItem>Paste</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="font-semibold">View</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Toggle Sidebar</MenubarItem>
            <MenubarItem>Toggle Fullscreen</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Zoom In</MenubarItem>
            <MenubarItem>Zoom Out</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search files..."
          className="w-full rounded-lg bg-background pl-8"
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" className="h-8">
          Share
        </Button>
        <Button size="sm" className="h-8">
          Save Changes
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View in Finder</DropdownMenuItem>
            <DropdownMenuItem>Download</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  ),
};

// With nested submenus
export const WithNestedSubmenus: Story = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>New <MenubarShortcut>⌘N</MenubarShortcut></MenubarItem>
          <MenubarItem>Open <MenubarShortcut>⌘O</MenubarShortcut></MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Share</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Email</MenubarItem>
              <MenubarItem>Messages</MenubarItem>
              <MenubarSub>
                <MenubarSubTrigger>More...</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem>Copy Link</MenubarItem>
                  <MenubarItem>AirDrop</MenubarItem>
                  <MenubarItem>Add to Notes</MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>Print <MenubarShortcut>⌘P</MenubarShortcut></MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Undo <MenubarShortcut>⌘Z</MenubarShortcut></MenubarItem>
          <MenubarItem>Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut></MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Find</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Search the web</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Find...</MenubarItem>
              <MenubarItem>Find Next</MenubarItem>
              <MenubarItem>Find Previous</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>Cut</MenubarItem>
          <MenubarItem>Copy</MenubarItem>
          <MenubarItem>Paste</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem>Always Show Bookmarks Bar</MenubarCheckboxItem>
          <MenubarCheckboxItem checked>Always Show Full URLs</MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarItem>
            Reload <MenubarShortcut>⌘R</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Toggle Fullscreen</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
};

// With keyboard shortcuts
export const WithKeyboardShortcuts: Story = {
  render: () => (
    <div className="space-y-4">
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              New Tab <MenubarShortcut>⌘T</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              New Window <MenubarShortcut>⌘N</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled>
              New Incognito Window
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              Print... <MenubarShortcut>⌘P</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              Undo <MenubarShortcut>⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              Cut <MenubarShortcut>⌘X</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Copy <MenubarShortcut>⌘C</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Paste <MenubarShortcut>⌘V</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              Zoom In <MenubarShortcut>⌘+</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Zoom Out <MenubarShortcut>⌘-</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Actual Size <MenubarShortcut>⌘0</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              Toggle Full Screen <MenubarShortcut>⌃⌘F</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      
      <div className="rounded-md border p-4">
        <h3 className="mb-2 text-sm font-medium">Common Keyboard Shortcuts</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">New Tab</span>
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">⌘</span>T
              </kbd>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Close Tab</span>
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">⌘</span>W
              </kbd>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">New Window</span>
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">⌘</span>N
              </kbd>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Undo</span>
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">⌘</span>Z
              </kbd>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Copy</span>
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">⌘</span>C
              </kbd>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Paste</span>
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">⌘</span>V
              </kbd>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Responsive menubar
export const Responsive: Story = {
  render: () => (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">My App</h2>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            Sign In
          </Button>
        </div>
      </div>
      
      <div className="hidden md:block">
        <Menubar className="border-0 px-0">
          <MenubarMenu>
            <MenubarTrigger className="cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
              Dashboard
            </MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger className="cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
              Projects
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>All Projects</MenubarItem>
              <MenubarItem>Create New</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Recent</MenubarItem>
              <MenubarItem>Starred</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger className="cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
              Team
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Members</MenubarItem>
              <MenubarItem>Invite People</MenubarItem>
              <MenubarItem>Teams</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger className="cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
              Calendar
            </MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger className="cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
              Documents
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>All Documents</MenubarItem>
              <MenubarItem>Shared with me</MenubarItem>
              <MenubarItem>Recent</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Upload New</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
      
      <div className="md:hidden">
        <div className="flex items-center justify-between overflow-x-auto pb-2">
          <Button variant="ghost" size="sm" className="shrink-0">
            Dashboard
          </Button>
          <Button variant="ghost" size="sm" className="shrink-0">
            Projects
          </Button>
          <Button variant="ghost" size="sm" className="shrink-0">
            Team
          </Button>
          <Button variant="ghost" size="sm" className="shrink-0">
            Calendar
          </Button>
          <Button variant="ghost" size="sm" className="shrink-0">
            Documents
          </Button>
        </div>
      </div>
      
      <div className="rounded-lg border p-4">
        <p className="text-sm text-muted-foreground">
          This is a responsive menubar that collapses into a mobile menu on smaller screens.
          Resize your browser window to see the responsive behavior.
        </p>
      </div>
    </div>
  ),
};

// Mobile menu (for reference, not using Menubar)
export const MobileMenu: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <div className="md:hidden">
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={() => setOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </Button>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="top-0 max-h-screen translate-y-0 sm:max-w-[425px]" style={{ top: 0, transform: 'none' }}>
            <DialogHeader>
              <DialogTitle>Menu</DialogTitle>
              <DialogDescription>
                Navigate through the application
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-1 py-4">
              <Button variant="ghost" className="justify-start">
                Dashboard
              </Button>
              <Button variant="ghost" className="justify-start">
                Projects
              </Button>
              <Button variant="ghost" className="justify-start">
                Team
              </Button>
              <Button variant="ghost" className="justify-start">
                Calendar
              </Button>
              <Button variant="ghost" className="justify-start">
                Documents
              </Button>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  },
};
