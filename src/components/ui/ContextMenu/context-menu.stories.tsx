import type { Meta, StoryObj } from '@storybook/react-vite';
import { ContextMenu, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuGroup, ContextMenuItem, ContextMenuLabel, ContextMenuPortal, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuShortcut, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger } from './context-menu';
import { Button } from '../Button/button';
import { Check, ChevronRight, Copy, CreditCard, Edit, ExternalLink, Eye, File, FileText, Folder, MoreHorizontal, Plus, Save, Settings, Share, Star, Trash2, User, Zap } from 'lucide-react';
import { useState } from 'storybook/internal/preview-api';

const meta: Meta<typeof ContextMenu> = {
  title: 'Components/Context Menu',
  component: ContextMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof ContextMenu>;

// Basic context menu
export const Basic: Story = {
  render: () => (
    <div className="flex items-center justify-center p-16 border rounded-lg">
      <ContextMenu>
        <ContextMenuTrigger className="p-4 rounded-md hover:bg-accent/50">
          Right click here
        </ContextMenuTrigger>
        <ContextMenuContent className="w-48">
          <ContextMenuItem>
            <FileText className="mr-2 h-4 w-4" />
            New File
          </ContextMenuItem>
          <ContextMenuItem>
            <Folder className="mr-2 h-4 w-4" />
            New Folder
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>
            <Copy className="mr-2 h-4 w-4" />
            Copy
          </ContextMenuItem>
          <ContextMenuItem>
            <Edit className="mr-2 h-4 w-4" />
            Rename
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem className="text-destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  ),
};

// With submenus
export const WithSubmenus: Story = {
  render: () => (
    <div className="flex items-center justify-center p-16 border rounded-lg">
      <ContextMenu>
        <ContextMenuTrigger className="p-4 rounded-md hover:bg-accent/50">
          Right click here
        </ContextMenuTrigger>
        <ContextMenuContent className="w-56">
          <ContextMenuGroup>
            <ContextMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile
              <ContextMenuShortcut>⇧⌘P</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              <CreditCard className="mr-2 h-4 w-4" />
              Billing
              <ContextMenuShortcut>⌘B</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
              <ContextMenuShortcut>⌘S</ContextMenuShortcut>
            </ContextMenuItem>
          </ContextMenuGroup>
          
          <ContextMenuSeparator />
          
          <ContextMenuSub>
            <ContextMenuSubTrigger>
              <Share className="mr-2 h-4 w-4" />
              Share
              <ChevronRight className="ml-auto h-4 w-4" />
            </ContextMenuSubTrigger>
            <ContextMenuPortal>
              <ContextMenuSubContent className="w-48">
                <ContextMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Share with people
                </ContextMenuItem>
                <ContextMenuItem>
                  <File className="mr-2 h-4 w-4" />
                  Get shareable link
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Share on social
                </ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuPortal>
          </ContextMenuSub>
          
          <ContextMenuSub>
            <ContextMenuSubTrigger>
              <Zap className="mr-2 h-4 w-4" />
              Actions
              <ChevronRight className="ml-auto h-4 w-4" />
            </ContextMenuSubTrigger>
            <ContextMenuPortal>
              <ContextMenuSubContent className="w-48">
                <ContextMenuItem>
                  <Save className="mr-2 h-4 w-4" />
                  Save changes
                </ContextMenuItem>
                <ContextMenuItem>
                  <Plus className="mr-2 h-4 w-4" />
                  Create new
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuPortal>
          </ContextMenuSub>
          
          <ContextMenuSeparator />
          
          <ContextMenuItem>
            <ExternalLink className="mr-2 h-4 w-4" />
            Open in new tab
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  ),
};

// With checkboxes and radio items
export const WithFormElements: Story = {
  render: () => {
    const [showStatusBar, setShowStatusBar] = useState(true);
    const [showPanel, setShowPanel] = useState(true);
    const [position, setPosition] = useState('bottom');
    
    return (
      <div className="flex items-center justify-center p-16 border rounded-lg">
        <ContextMenu>
          <ContextMenuTrigger className="p-4 rounded-md hover:bg-accent/50">
            Right click here
          </ContextMenuTrigger>
          <ContextMenuContent className="w-56">
            <ContextMenuLabel>Appearance</ContextMenuLabel>
            <ContextMenuSeparator />
            
            <ContextMenuCheckboxItem 
              checked={showStatusBar} 
              onCheckedChange={setShowStatusBar}
            >
              <div className="flex items-center">
                {showStatusBar && <Check className="mr-2 h-4 w-4" />}
                <span className={showStatusBar ? 'ml-6' : 'ml-6 opacity-0'}>Status Bar</span>
              </div>
            </ContextMenuCheckboxItem>
            
            <ContextMenuCheckboxItem 
              checked={showPanel} 
              onCheckedChange={setShowPanel}
            >
              <div className="flex items-center">
                {showPanel && <Check className="mr-2 h-4 w-4" />}
                <span className={showPanel ? 'ml-6' : 'ml-6 opacity-0'}>Activity Bar</span>
              </div>
            </ContextMenuCheckboxItem>
            
            <ContextMenuSeparator />
            
            <ContextMenuLabel>Panel Position</ContextMenuLabel>
            <ContextMenuRadioGroup value={position} onValueChange={setPosition}>
              <ContextMenuRadioItem value="top">
                <div className="flex items-center">
                  {position === 'top' && <Check className="mr-2 h-4 w-4" />}
                  <span className={position === 'top' ? 'ml-6' : 'ml-6 opacity-0'}>Top</span>
                </div>
              </ContextMenuRadioItem>
              <ContextMenuRadioItem value="bottom">
                <div className="flex items-center">
                  {position === 'bottom' && <Check className="mr-2 h-4 w-4" />}
                  <span className={position === 'bottom' ? 'ml-6' : 'ml-6 opacity-0'}>Bottom</span>
                </div>
              </ContextMenuRadioItem>
              <ContextMenuRadioItem value="right">
                <div className="flex items-center">
                  {position === 'right' && <Check className="mr-2 h-4 w-4" />}
                  <span className={position === 'right' ? 'ml-6' : 'ml-6 opacity-0'}>Right</span>
                </div>
              </ContextMenuRadioItem>
            </ContextMenuRadioGroup>
            
            <ContextMenuSeparator />
            
            <ContextMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              View settings
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </div>
    );
  },
};

// File item context menu
export const FileItem: Story = {
  render: () => {
    const [isStarred, setIsStarred] = useState(false);
    const [isWatching, setIsWatching] = useState(false);
    
    return (
      <div className="p-8 border rounded-lg w-[400px]">
        <div className="flex items-center justify-between p-3 border rounded-md">
          <div className="flex items-center space-x-3">
            <FileText className="h-5 w-5 text-blue-500" />
            <div>
              <div className="font-medium">document.pdf</div>
              <div className="text-xs text-muted-foreground">2.4 MB • Modified 2 hours ago</div>
            </div>
          </div>
          <ContextMenu>
            <ContextMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-64">
              <ContextMenuItem>
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </ContextMenuItem>
              <ContextMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Rename
              </ContextMenuItem>
              <ContextMenuItem>
                <Copy className="mr-2 h-4 w-4" />
                Make a copy
              </ContextMenuItem>
              
              <ContextMenuSeparator />
              
              <ContextMenuCheckboxItem 
                checked={isStarred} 
                onCheckedChange={setIsStarred}
              >
                <div className="flex items-center">
                  {isStarred ? (
                    <Star className="mr-2 h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ) : (
                    <Star className="mr-2 h-4 w-4" />
                  )}
                  <span>{isStarred ? 'Starred' : 'Add to starred'}</span>
                </div>
              </ContextMenuCheckboxItem>
              
              <ContextMenuCheckboxItem 
                checked={isWatching} 
                onCheckedChange={setIsWatching}
              >
                <div className="flex items-center">
                  {isWatching ? (
                    <Eye className="mr-2 h-4 w-4 text-blue-500" />
                  ) : (
                    <Eye className="mr-2 h-4 w-4" />
                  )}
                  <span>{isWatching ? 'Watching' : 'Watch'}</span>
                </div>
              </ContextMenuCheckboxItem>
              
              <ContextMenuSeparator />
              
              <ContextMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Move to trash
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </div>
      </div>
    );
  },
};

// Table row context menu
export const TableRow: Story = {
  render: () => {
    const users = [
      { id: 1, name: 'Olivia Martin', email: 'olivia.martin@email.com', role: 'Admin' },
      { id: 2, name: 'Jackson Lee', email: 'jackson.lee@email.com', role: 'Member' },
      { id: 3, name: 'Isabella Nguyen', email: 'isabella.nguyen@email.com', role: 'Member' },
    ];
    
    return (
      <div className="border rounded-lg w-[600px] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="h-12 px-4 text-left font-medium">Name</th>
              <th className="h-12 px-4 text-left font-medium">Email</th>
              <th className="h-12 px-4 text-left font-medium">Role</th>
              <th className="h-12 px-4 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <ContextMenu key={user.id}>
                <ContextMenuTrigger asChild>
                  <tr className="border-b hover:bg-muted/50 cursor-pointer">
                    <td className="p-4">{user.name}</td>
                    <td className="p-4 text-muted-foreground">{user.email}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.role === 'Admin' 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </td>
                  </tr>
                </ContextMenuTrigger>
                <ContextMenuContent className="w-48">
                  <ContextMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    View profile
                  </ContextMenuItem>
                  <ContextMenuItem>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit user
                  </ContextMenuItem>
                  {user.role === 'Member' && (
                    <ContextMenuItem>
                      <Zap className="mr-2 h-4 w-4" />
                      Make admin
                    </ContextMenuItem>
                  )}
                  <ContextMenuSeparator />
                  <ContextMenuItem className="text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete user
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
};

// Custom styles and animations
export const CustomStyled: Story = {
  render: () => {
    return (
      <div className="flex items-center justify-center p-16 border rounded-lg">
        <ContextMenu>
          <ContextMenuTrigger className="p-4 rounded-md hover:bg-accent/50 transition-colors">
            Right click for custom menu
          </ContextMenuTrigger>
          <ContextMenuContent className="w-56 rounded-xl bg-gradient-to-b from-background to-muted/50 backdrop-blur-md border border-muted/50 shadow-lg overflow-hidden">
            <div className="p-2">
              <ContextMenuItem className="group relative px-3 py-2 rounded-lg transition-colors hover:bg-primary/10 focus:bg-primary/10 data-[highlighted]:bg-primary/10">
                <FileText className="mr-3 h-5 w-5 text-primary" />
                <span className="font-medium">New File</span>
                <span className="ml-auto text-xs text-muted-foreground">⌘N</span>
                <span className="absolute left-0 top-0 h-full w-1 bg-primary opacity-0 group-hover:opacity-100 group-focus:opacity-100 rounded-l-md transition-opacity"></span>
              </ContextMenuItem>
              
              <ContextMenuItem className="group relative px-3 py-2 rounded-lg transition-colors hover:bg-primary/10 focus:bg-primary/10 data-[highlighted]:bg-primary/10">
                <Folder className="mr-3 h-5 w-5 text-amber-500" />
                <span className="font-medium">New Folder</span>
                <span className="ml-auto text-xs text-muted-foreground">⇧⌘N</span>
                <span className="absolute left-0 top-0 h-full w-1 bg-amber-500 opacity-0 group-hover:opacity-100 group-focus:opacity-100 rounded-l-md transition-opacity"></span>
              </ContextMenuItem>
              
              <ContextMenuSeparator className="my-1 bg-muted/50" />
              
              <ContextMenuItem className="group relative px-3 py-2 rounded-lg transition-colors hover:bg-primary/10 focus:bg-primary/10 data-[highlighted]:bg-primary/10">
                <Share className="mr-3 h-5 w-5 text-emerald-500" />
                <span className="font-medium">Share</span>
                <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
                <span className="absolute left-0 top-0 h-full w-1 bg-emerald-500 opacity-0 group-hover:opacity-100 group-focus:opacity-100 rounded-l-md transition-opacity"></span>
              </ContextMenuItem>
              
              <ContextMenuItem className="group relative px-3 py-2 rounded-lg transition-colors hover:bg-primary/10 focus:bg-primary/10 data-[highlighted]:bg-primary/10">
                <Star className="mr-3 h-5 w-5 text-yellow-400" />
                <span className="font-medium">Add to Favorites</span>
                <span className="absolute left-0 top-0 h-full w-1 bg-yellow-400 opacity-0 group-hover:opacity-100 group-focus:opacity-100 rounded-l-md transition-opacity"></span>
              </ContextMenuItem>
              
              <ContextMenuSeparator className="my-1 bg-muted/50" />
              
              <ContextMenuItem className="group relative px-3 py-2 rounded-lg text-destructive transition-colors hover:bg-destructive/10 focus:bg-destructive/10 data-[highlighted]:bg-destructive/10">
                <Trash2 className="mr-3 h-5 w-5 text-destructive" />
                <span className="font-medium">Move to Trash</span>
                <span className="absolute left-0 top-0 h-full w-1 bg-destructive opacity-0 group-hover:opacity-100 group-focus:opacity-100 rounded-l-md transition-opacity"></span>
              </ContextMenuItem>
            </div>
          </ContextMenuContent>
        </ContextMenu>
      </div>
    );
  },
};
