import type { Meta, StoryObj } from '@storybook/react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './collapsible';
import { Button } from './Button/button';
import { ChevronDown, ChevronRight, ChevronsUpDown, GripVertical, List, Plus, X } from 'lucide-react';
import { useState } from 'react';

const meta: Meta<typeof Collapsible> = {
  title: 'Components/Collapsible',
  component: Collapsible,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Collapsible>;

// Basic collapsible
export const Basic: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div className="w-[350px] space-y-2">
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
          <div className="flex items-center justify-between space-x-4 px-4">
            <h4 className="text-sm font-semibold">
              @peduarte starred 3 repositories
            </h4>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="w-9 p-0">
                <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <div className="rounded-md border px-4 py-3 font-mono text-sm">
            @radix-ui/primitives
          </div>
          <CollapsibleContent className="space-y-2">
            <div className="rounded-md border px-4 py-3 font-mono text-sm">
              @radix-ui/colors
            </div>
            <div className="rounded-md border px-4 py-3 font-mono text-sm">
              @stitches/react
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    );
  },
};

// Animated accordion style
export const AnimatedAccordion: Story = {
  render: () => {
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);
    
    return (
      <div className="w-[400px] space-y-2">
        <Collapsible 
          open={isOpen1} 
          onOpenChange={setIsOpen1} 
          className="space-y-2"
        >
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between p-4 rounded-lg border cursor-pointer hover:bg-accent/50 transition-colors">
              <div className="flex items-center space-x-3">
                <ChevronRight className={`h-4 w-4 transition-transform ${isOpen1 ? 'rotate-90' : ''}`} />
                <h4 className="font-medium">What is React?</h4>
              </div>
              <span className="text-sm text-muted-foreground">
                {isOpen1 ? 'Hide' : 'Show'} answer
              </span>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown">
            <div className="px-4 pb-4 text-muted-foreground">
              React is a free and open-source front-end JavaScript library for building user interfaces based on components. It is maintained by Meta and a community of individual developers and companies.
            </div>
          </CollapsibleContent>
        </Collapsible>
        
        <Collapsible 
          open={isOpen2} 
          onOpenChange={setIsOpen2} 
          className="space-y-2"
        >
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between p-4 rounded-lg border cursor-pointer hover:bg-accent/50 transition-colors">
              <div className="flex items-center space-x-3">
                <ChevronRight className={`h-4 w-4 transition-transform ${isOpen2 ? 'rotate-90' : ''}`} />
                <h4 className="font-medium">What are React Hooks?</h4>
              </div>
              <span className="text-sm text-muted-foreground">
                {isOpen2 ? 'Hide' : 'Show'} answer
              </span>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown">
            <div className="px-4 pb-4 text-muted-foreground">
              Hooks are functions that let you "hook into" React state and lifecycle features from function components. They don't work inside classes — they let you use React without classes.
            </div>
          </CollapsibleContent>
        </Collapsible>
        
        <Collapsible 
          open={isOpen3} 
          onOpenChange={setIsOpen3} 
          className="space-y-2"
        >
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between p-4 rounded-lg border cursor-pointer hover:bg-accent/50 transition-colors">
              <div className="flex items-center space-x-3">
                <ChevronRight className={`h-4 w-4 transition-transform ${isOpen3 ? 'rotate-90' : ''}`} />
                <h4 className="font-medium">What is JSX?</h4>
              </div>
              <span className="text-sm text-muted-foreground">
                {isOpen3 ? 'Hide' : 'Show'} answer
              </span>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown">
            <div className="px-4 pb-4 text-muted-foreground">
              JSX is a syntax extension for JavaScript that looks similar to XML or HTML. It's not necessary to use JSX in React development, but it makes the code more readable and easier to write. JSX gets compiled to React.createElement() calls which return plain JavaScript objects.
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    );
  },
};

// Nested collapsible
export const Nested: Story = {
  render: () => {
    const [openItems, setOpenItems] = useState<Record<string, boolean>>({
      'react': true,
      'react-dom': false,
      'next': false,
      'react-query': false,
    });
    
    const toggleItem = (key: string) => {
      setOpenItems(prev => ({
        ...prev,
        [key]: !prev[key]
      }));
    };
    
    const dependencies = {
      'react': ['react-dom'],
      'next': ['react', 'react-dom'],
      'react-query': ['react']
    };
    
    const getDependencyCount = (pkg: string): number => {
      const deps = dependencies[pkg as keyof typeof dependencies] || [];
      return deps.length;
    };
    
    const isDependency = (pkg: string, dep: string): boolean => {
      const deps = dependencies[pkg as keyof typeof dependencies] || [];
      return deps.includes(dep);
    };
    
    return (
      <div className="w-[300px] space-y-1">
        {Object.entries(openItems).map(([pkg, isOpen]) => (
          <Collapsible 
            key={pkg}
            open={isOpen} 
            onOpenChange={() => toggleItem(pkg)}
            className="space-y-1"
          >
            <CollapsibleTrigger asChild>
              <div className="flex items-center justify-between p-2 rounded-md hover:bg-accent/50 cursor-pointer">
                <div className="flex items-center space-x-2">
                  <GripVertical className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{pkg}</span>
                  <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                    {getDependencyCount(pkg)} {getDependencyCount(pkg) === 1 ? 'dependency' : 'dependencies'}
                  </span>
                </div>
                <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-8 pt-1">
              {getDependencyCount(pkg) > 0 ? (
                <div className="space-y-1">
                  {Object.keys(openItems).map(dep => (
                    isDependency(pkg, dep) && (
                      <div key={dep} className="flex items-center p-2 text-sm text-muted-foreground">
                        <span className="w-4 h-px bg-border mr-2"></span>
                        {dep}
                      </div>
                    )
                  ))}
                </div>
              ) : (
                <div className="text-sm text-muted-foreground p-2">No dependencies</div>
              )}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    );
  },
};

// Todo list with collapsible items
export const TodoList: Story = {
  render: () => {
    const [todos, setTodos] = useState([
      { id: 1, title: 'Buy groceries', completed: false, details: 'Milk, eggs, bread, fruits', dueDate: '2023-06-15' },
      { id: 2, title: 'Finish project', completed: true, details: 'Complete all tasks and submit the project', dueDate: '2023-06-10' },
      { id: 3, title: 'Call mom', completed: false, details: 'Wish her happy birthday', dueDate: '2023-06-20' },
    ]);
    
    const [openId, setOpenId] = useState<number | null>(null);
    const [newTodo, setNewTodo] = useState('');
    
    const toggleTodo = (id: number) => {
      setTodos(todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ));
    };
    
    const addTodo = (e: React.FormEvent) => {
      e.preventDefault();
      if (!newTodo.trim()) return;
      
      const newTodoItem = {
        id: Date.now(),
        title: newTodo,
        completed: false,
        details: '',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      };
      
      setTodos([...todos, newTodoItem]);
      setNewTodo('');
    };
    
    const deleteTodo = (id: number, e: React.MouseEvent) => {
      e.stopPropagation();
      setTodos(todos.filter(todo => todo.id !== id));
      if (openId === id) setOpenId(null);
    };
    
    return (
      <div className="w-[400px] space-y-4">
        <form onSubmit={addTodo} className="flex space-x-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <Button type="submit" size="sm" className="gap-1">
            <Plus className="h-4 w-4" />
            Add
          </Button>
        </form>
        
        <div className="border rounded-md divide-y">
          {todos.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              No tasks yet. Add one above!
            </div>
          ) : (
            todos.map(todo => (
              <Collapsible 
                key={todo.id}
                open={openId === todo.id}
                onOpenChange={(isOpen) => setOpenId(isOpen ? todo.id : null)}
                className="group"
              >
                <div className={`p-3 ${todo.completed ? 'bg-muted/30' : 'hover:bg-accent/50'} transition-colors cursor-pointer`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo.id)}
                        onClick={(e) => e.stopPropagation()}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className={`${todo.completed ? 'line-through text-muted-foreground' : ''}`}>
                        {todo.title}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">
                        Due: {new Date(todo.dueDate).toLocaleDateString()}
                      </span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6 opacity-0 group-hover:opacity-100"
                        onClick={(e) => deleteTodo(todo.id, e)}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <ChevronDown className={`h-4 w-4 transition-transform ${openId === todo.id ? 'rotate-180' : ''}`} />
                          <span className="sr-only">Toggle details</span>
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                  </div>
                </div>
                <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown">
                  <div className="px-3 pb-3 pt-1 text-sm text-muted-foreground bg-muted/20">
                    <div className="mb-2">{todo.details || 'No additional details'}</div>
                    <div className="flex justify-between items-center text-xs">
                      <span>Created: {new Date().toLocaleDateString()}</span>
                      <span className={`px-2 py-0.5 rounded-full ${todo.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {todo.completed ? 'Completed' : 'In Progress'}
                      </span>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))
          )}
        </div>
        
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <span>
            {todos.filter(t => t.completed).length} of {todos.length} completed
          </span>
          <div className="flex items-center space-x-1">
            <List className="h-4 w-4" />
            <span>Total: {todos.length}</span>
          </div>
        </div>
      </div>
    );
  },
};

// File explorer
export const FileExplorer: Story = {
  render: () => {
    const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({
      'src': true,
      'public': false,
      'node_modules': false,
    });
    
    const toggleFolder = (folder: string) => {
      setOpenFolders(prev => ({
        ...prev,
        [folder]: !prev[folder]
      }));
    };
    
    const fileStructure = {
      'src': {
        'components': ['Button.tsx', 'Card.tsx', 'Modal.tsx'],
        'pages': ['Home.tsx', 'About.tsx', 'Contact.tsx'],
        'App.tsx': 'file',
        'index.tsx': 'file',
      },
      'public': ['index.html', 'favicon.ico'],
      'node_modules': ['react', 'react-dom', 'typescript'],
      'package.json': 'file',
      'tsconfig.json': 'file',
      'README.md': 'file',
    };
    
    const renderFileStructure = (structure: any, level = 0) => {
      return Object.entries(structure).map(([name, contents]) => {
        const isFolder = Array.isArray(contents) || (typeof contents === 'object' && contents !== null);
        const isOpen = openFolders[name] === true;
        
        if (!isFolder) {
          return (
            <div key={name} className="flex items-center py-1 pl-6 text-sm text-muted-foreground">
              <span className="w-4"></span>
              <span>{name}</span>
            </div>
          );
        }
        
        return (
          <Collapsible 
            key={name}
            open={isOpen}
            onOpenChange={() => toggleFolder(name)}
            className="select-none"
          >
            <CollapsibleTrigger asChild>
              <div className="flex items-center py-1 pl-2 pr-2 rounded-md hover:bg-accent/50 cursor-pointer">
                <ChevronRight className={`h-4 w-4 mr-1 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                <span className="font-medium">{name}</span>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown">
              <div className="pl-4 border-l border-border">
                {Array.isArray(contents) 
                  ? contents.map((file) => (
                      <div key={file} className="flex items-center py-1 pl-6 text-sm text-muted-foreground">
                        <span className="w-4"></span>
                        <span>{file}</span>
                      </div>
                    ))
                  : renderFileStructure(contents, level + 1)}
              </div>
            </CollapsibleContent>
          </Collapsible>
        );
      });
    };
    
    return (
      <div className="w-[300px] border rounded-md p-2 bg-background">
        <div className="p-2 font-medium border-b mb-2">Project Explorer</div>
        <div className="space-y-1">
          {renderFileStructure(fileStructure)}
        </div>
      </div>
    );
  },
};

// Custom animation example
export const CustomAnimation: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div className="w-[400px] space-y-4">
        <Button onClick={() => setIsOpen(!isOpen)} className="mb-4">
          {isOpen ? 'Collapse' : 'Expand'} Content
        </Button>
        
        <Collapsible 
          open={isOpen} 
          onOpenChange={setIsOpen}
          className="space-y-2"
        >
          <CollapsibleTrigger asChild>
            <div className="p-4 border rounded-lg cursor-pointer hover:bg-accent/50 transition-colors">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Click to {isOpen ? 'collapse' : 'expand'}</h3>
                <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent 
            className="overflow-hidden"
            style={{
              transition: 'max-height 0.3s ease-in-out',
              maxHeight: isOpen ? '500px' : '0px'
            }}
          >
            <div className="p-4 mt-2 border rounded-lg bg-muted/20">
              <h4 className="font-medium mb-2">Animated Content</h4>
              <p className="text-muted-foreground text-sm">
                This content is revealed with a custom animation. The height transitions smoothly 
                between 0 and auto using max-height. You can adjust the duration and timing function 
                to match your design system.
              </p>
              <div className="mt-4 p-3 bg-background rounded border text-sm">
                <pre className="text-xs">
                  {`transition: max-height 0.3s ease-in-out;
max-height: ${isOpen ? '500px' : '0px'};`}
                </pre>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    );
  },
};
