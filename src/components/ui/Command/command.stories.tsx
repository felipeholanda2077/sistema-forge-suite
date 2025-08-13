import type { Meta, StoryObj } from '@storybook/react-vite';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from './command';
import { useState } from 'react';
import { Check, ChevronsUpDown, Plus, Search, Settings, User, Users, LogOut, Moon, Sun, Laptop } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { Button } from '../Button/button';
import { Popover, PopoverContent, PopoverTrigger } from '../Popover/popover';

const meta: Meta<typeof Command> = {
  title: 'Components/Command',
  component: Command,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Command>;

// Basic command menu
export const Basic: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");

    return (
      <div className="w-[300px]">
        <Command className="rounded-lg border shadow-md">
          <CommandInput 
            placeholder="Type a command or search..." 
            value={value}
            onValueChange={setValue}
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>
                <span>Calendar</span>
              </CommandItem>
              <CommandItem>
                <span>Search Emoji</span>
              </CommandItem>
              <CommandItem>
                <span>Calculator</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem>
                <span>Profile</span>
              </CommandItem>
              <CommandItem>
                <span>Billing</span>
              </CommandItem>
              <CommandItem>
                <span>Settings</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    );
  },
};

// Command menu with icons
export const WithIcons: Story = {
  render: () => {
    const [value, setValue] = useState("");
    
    const menuItems = [
      {
        name: "Profile",
        icon: User,
        shortcut: "⌘P",
      },
      {
        name: "Team",
        icon: Users,
        shortcut: "⌘T",
      },
      {
        name: "Settings",
        icon: Settings,
        shortcut: "⌘S",
      },
      {
        name: "New Team",
        icon: Plus,
        shortcut: "⌘N",
      },
    ];

    return (
      <div className="w-[300px]">
        <Command className="rounded-lg border shadow-md">
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <CommandInput 
              placeholder="Type a command or search..."
              value={value}
              onValueChange={setValue}
              className="[&>input]:border-0 [&>input]:ring-0"
            />
          </div>
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Menu">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <CommandItem 
                    key={item.name}
                    value={item.name}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <Icon className="mr-2 h-4 w-4" />
                      <span>{item.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {item.shortcut}
                    </span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    );
  },
};

// Command menu with search and filtering
export const WithSearch: Story = {
  render: () => {
    const [search, setSearch] = useState("");
    
    const frameworks = [
      {
        value: "next.js",
        label: "Next.js",
      },
      {
        value: "sveltekit",
        label: "SvelteKit",
      },
      {
        value: "nuxt.js",
        label: "Nuxt.js",
      },
      {
        value: "remix",
        label: "Remix",
      },
      {
        value: "astro",
        label: "Astro",
      },
    ];

    return (
      <div className="w-[300px]">
        <Command className="rounded-lg border shadow-md">
          <CommandInput 
            placeholder="Search framework..." 
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup heading="Frameworks">
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(value) => {
                    console.log(`Selected ${value}`);
                    setSearch("");
                  }}
                  className="cursor-pointer"
                >
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    );
  },
};

// Command menu with combobox
export const WithCombobox: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");

    const frameworks = [
      {
        value: "next.js",
        label: "Next.js",
      },
      {
        value: "sveltekit",
        label: "SvelteKit",
      },
      {
        value: "nuxt.js",
        label: "Nuxt.js",
      },
      {
        value: "remix",
        label: "Remix",
      },
      {
        value: "astro",
        label: "Astro",
      },
    ];

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {value
              ? frameworks.find((framework) => framework.value === value)?.label
              : "Select framework..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search framework..." />
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    );
  },
};

// Command menu with theme switcher
export const WithThemeSwitcher: Story = {
  render: () => {
    const [value, setValue] = useState("");
    const [theme, setTheme] = useState("system");
    
    const themes = [
      {
        value: "light",
        label: "Light",
        icon: Sun,
      },
      {
        value: "dark",
        label: "Dark",
        icon: Moon,
      },
      {
        value: "system",
        label: "System",
        icon: Laptop,
      },
    ];

    return (
      <div className="w-[300px]">
        <Command className="rounded-lg border shadow-md">
          <CommandInput 
            placeholder="Search themes..." 
            value={value}
            onValueChange={setValue}
          />
          <CommandList>
            <CommandEmpty>No themes found.</CommandEmpty>
            <CommandGroup heading="Themes">
              {themes.map((t) => {
                const Icon = t.icon;
                return (
                  <CommandItem
                    key={t.value}
                    value={t.value}
                    onSelect={() => {
                      setTheme(t.value);
                      console.log(`Theme set to ${t.label}`);
                    }}
                    className="cursor-pointer"
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    <span>{t.label}</span>
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        theme === t.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    );
  },
};

// Command menu with nested items
export const WithNestedItems: Story = {
  render: () => {
    const [value, setValue] = useState("");
    
    const commands = [
      {
        heading: "File",
        items: [
          {
            name: "New File",
            shortcut: "⌘N",
          },
          {
            name: "Open File",
            shortcut: "⌘O",
          },
          {
            name: "Save",
            shortcut: "⌘S",
          },
        ],
      },
      {
        heading: "Edit",
        items: [
          {
            name: "Undo",
            shortcut: "⌘Z",
          },
          {
            name: "Redo",
            shortcut: "⇧⌘Z",
          },
          {
            name: "Cut",
            shortcut: "⌘X",
          },
          {
            name: "Copy",
            shortcut: "⌘C",
          },
          {
            name: "Paste",
            shortcut: "⌘V",
          },
        ],
      },
      {
        heading: "View",
        items: [
          {
            name: "Toggle Sidebar",
            shortcut: "⌘B",
          },
          {
            name: "Toggle Fullscreen",
            shortcut: "⌃⌘F",
          },
        ],
      },
    ];

    return (
      <div className="w-[400px]">
        <Command className="rounded-lg border shadow-md">
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <CommandInput 
              placeholder="Type a command or search..."
              value={value}
              onValueChange={setValue}
              className="[&>input]:border-0 [&>input]:ring-0"
            />
            <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            
            {commands.map((group) => (
              <CommandGroup key={group.heading} heading={group.heading}>
                {group.items.map((item) => (
                  <CommandItem 
                    key={item.name}
                    value={item.name}
                    className="flex items-center justify-between"
                    onSelect={() => {
                      console.log(`Selected: ${item.name}`);
                      setValue("");
                    }}
                  >
                    <span>{item.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {item.shortcut}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
            
            <CommandSeparator />
            
            <CommandGroup>
              <CommandItem>
                <span>Settings</span>
              </CommandItem>
              <CommandItem>
                <span>Documentation</span>
              </CommandItem>
              <CommandItem>
                <span>Keyboard Shortcuts</span>
                <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                  <span className="text-xs">⌘</span>/
                </kbd>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    );
  },
};
