import type { Meta, StoryObj } from '@storybook/react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from './resizable';
import { Button } from './Button/button';
import { cn } from '../../../lib/utils';
import { GripVertical, PanelLeft, PanelRight } from 'lucide-react';

const meta: Meta<typeof ResizablePanelGroup> = {
  title: 'Components/Resizable',
  component: ResizablePanelGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof ResizablePanelGroup>;

// Basic horizontal resizable panels
export const Horizontal: Story = {
  render: () => (
    <div className="w-full max-w-4xl">
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[200px] max-w-full rounded-lg border"
      >
        <ResizablePanel defaultSize={25} minSize={15} className="p-4">
          <div className="h-full rounded-lg bg-muted/50 p-4">
            <h3 className="mb-2 text-sm font-medium">Sidebar</h3>
            <p className="text-sm text-muted-foreground">
              Resizable panel with a minimum size of 15%.
            </p>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75} className="p-4">
          <div className="h-full rounded-lg bg-muted/20 p-4">
            <h3 className="mb-2 text-sm font-medium">Content</h3>
            <p className="text-sm text-muted-foreground">
              Main content area that can be resized by dragging the handle.
            </p>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};

// Vertical resizable panels
export const Vertical: Story = {
  render: () => (
    <div className="w-full max-w-4xl">
      <ResizablePanelGroup
        direction="vertical"
        className="min-h-[400px] max-w-full rounded-lg border"
      >
        <ResizablePanel defaultSize={40} minSize={20} className="p-4">
          <div className="flex h-full items-center justify-center rounded-lg bg-muted/50 p-4">
            <p className="text-sm text-muted-foreground">
              Top panel (min 20% height)
            </p>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={60} className="p-4">
          <div className="flex h-full items-center justify-center rounded-lg bg-muted/20 p-4">
            <p className="text-sm text-muted-foreground">
              Bottom panel that can be resized
            </p>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};

// Nested resizable panels
export const Nested: Story = {
  render: () => (
    <div className="w-full max-w-5xl">
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[400px] max-w-full rounded-lg border"
      >
        <ResizablePanel defaultSize={20} minSize={15} className="p-4">
          <div className="h-full rounded-lg bg-muted/50 p-4">
            <h3 className="mb-2 text-sm font-medium">Navigation</h3>
            <p className="text-sm text-muted-foreground">
              Side navigation area
            </p>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        
        <ResizablePanel defaultSize={60}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={70} className="p-4">
              <div className="h-full rounded-lg bg-muted/20 p-4">
                <h3 className="mb-2 text-sm font-medium">Editor</h3>
                <p className="text-sm text-muted-foreground">
                  Main content editor area
                </p>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={30} minSize={15} className="p-4">
              <div className="h-full rounded-lg bg-muted/30 p-4">
                <h3 className="mb-2 text-sm font-medium">Terminal</h3>
                <p className="text-sm text-muted-foreground">
                  Terminal output and commands
                </p>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={20} minSize={15} className="p-4">
          <div className="h-full rounded-lg bg-muted/50 p-4">
            <h3 className="mb-2 text-sm font-medium">Properties</h3>
            <p className="text-sm text-muted-foreground">
              Properties panel
            </p>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};

// With collapsible panels
export const Collapsible: Story = {
  render: () => {
    const [isLeftCollapsed, setIsLeftCollapsed] = React.useState(false);
    const [isRightCollapsed, setIsRightCollapsed] = React.useState(false);
    
    return (
      <div className="w-full max-w-4xl">
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-[300px] max-w-full rounded-lg border"
        >
          <ResizablePanel 
            defaultSize={20} 
            minSize={15} 
            collapsible
            collapsedSize={4}
            onCollapse={() => setIsLeftCollapsed(true)}
            onExpand={() => setIsLeftCollapsed(false)}
            className={cn(
              "relative p-0 transition-all duration-300 ease-in-out",
              isLeftCollapsed && "min-w-[50px]"
            )}
          >
            <div className={cn(
              "h-full p-4 transition-opacity",
              isLeftCollapsed ? "opacity-0" : "opacity-100"
            )}>
              <h3 className="mb-2 text-sm font-medium">Sidebar</h3>
              <p className="text-sm text-muted-foreground">
                Collapsible panel
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "absolute right-1 top-4 h-6 w-6 rounded-full p-0",
                isLeftCollapsed ? "left-1/2 -translate-x-1/2" : "-right-3"
              )}
              onClick={() => setIsLeftCollapsed(!isLeftCollapsed)}
            >
              <GripVertical className="h-4 w-4" />
            </Button>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          <ResizablePanel defaultSize={60} className="p-4">
            <div className="h-full rounded-lg bg-muted/20 p-4">
              <h3 className="mb-2 text-sm font-medium">Content</h3>
              <p className="text-sm text-muted-foreground">
                Main content area
              </p>
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          <ResizablePanel 
            defaultSize={20} 
            minSize={15}
            collapsible
            collapsedSize={4}
            onCollapse={() => setIsRightCollapsed(true)}
            onExpand={() => setIsRightCollapsed(false)}
            className={cn(
              "relative p-0 transition-all duration-300 ease-in-out",
              isRightCollapsed && "min-w-[50px]"
            )}
          >
            <div className={cn(
              "h-full p-4 transition-opacity",
              isRightCollapsed ? "opacity-0" : "opacity-100"
            )}>
              <h3 className="mb-2 text-sm font-medium">Properties</h3>
              <p className="text-sm text-muted-foreground">
                Collapsible panel
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "absolute left-1/2 top-4 h-6 w-6 -translate-x-1/2 rounded-full p-0",
                isRightCollapsed ? "" : "-left-3"
              )}
              onClick={() => setIsRightCollapsed(!isRightCollapsed)}
            >
              <GripVertical className="h-4 w-4" />
            </Button>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    );
  },
};

// With toggle buttons
export const WithToggleButtons: Story = {
  render: () => {
    const [leftPanelSize, setLeftPanelSize] = React.useState(20);
    const [rightPanelSize, setRightPanelSize] = React.useState(20);
    const [isLeftVisible, setIsLeftVisible] = React.useState(true);
    const [isRightVisible, setIsRightVisible] = React.useState(true);
    
    const toggleLeftPanel = () => {
      if (leftPanelSize < 10) {
        setLeftPanelSize(20);
        setIsLeftVisible(true);
      } else {
        setLeftPanelSize(5);
        setIsLeftVisible(false);
      }
    };
    
    const toggleRightPanel = () => {
      if (rightPanelSize < 10) {
        setRightPanelSize(20);
        setIsRightVisible(true);
      } else {
        setRightPanelSize(5);
        setIsRightVisible(false);
      }
    };
    
    return (
      <div className="w-full max-w-4xl">
        <div className="mb-2 flex items-center justify-between">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={toggleLeftPanel}
            className="gap-1"
          >
            <PanelLeft className="h-4 w-4" />
            {isLeftVisible ? 'Hide' : 'Show'} Sidebar
          </Button>
          
          <div className="text-sm text-muted-foreground">
            Toggle panels using the buttons or drag the handles
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={toggleRightPanel}
            className="gap-1"
          >
            <PanelRight className="h-4 w-4" />
            {isRightVisible ? 'Hide' : 'Show'} Properties
          </Button>
        </div>
        
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-[300px] max-w-full rounded-lg border"
          onLayout={(sizes: number[]) => {
            setLeftPanelSize(sizes[0]);
            setRightPanelSize(sizes[2]);
          }}
        >
          <ResizablePanel 
            defaultSize={leftPanelSize} 
            minSize={5} 
            maxSize={40}
            className={cn(
              "overflow-hidden transition-all duration-200",
              leftPanelSize < 10 && "min-w-[40px]"
            )}
          >
            <div className={cn(
              "h-full p-4 transition-opacity",
              leftPanelSize < 10 ? "opacity-0" : "opacity-100"
            )}>
              <h3 className="mb-2 text-sm font-medium">Sidebar</h3>
              <p className="text-sm text-muted-foreground">
                Resizable panel with toggle
              </p>
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          <ResizablePanel defaultSize={60} className="p-4">
            <div className="h-full rounded-lg bg-muted/20 p-4">
              <h3 className="mb-2 text-sm font-medium">Content</h3>
              <p className="text-sm text-muted-foreground">
                Main content area that adjusts based on side panels
              </p>
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          <ResizablePanel 
            defaultSize={rightPanelSize} 
            minSize={5}
            maxSize={40}
            className={cn(
              "overflow-hidden transition-all duration-200",
              rightPanelSize < 10 && "min-w-[40px]"
            )}
          >
            <div className={cn(
              "h-full p-4 transition-opacity",
              rightPanelSize < 10 ? "opacity-0" : "opacity-100"
            )}>
              <h3 className="mb-2 text-sm font-medium">Properties</h3>
              <p className="text-sm text-muted-foreground">
                Resizable panel with toggle
              </p>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    );
  },
};

// With custom handle
export const WithCustomHandle: Story = {
  render: () => (
    <div className="w-full max-w-4xl">
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[200px] max-w-full rounded-lg border"
      >
        <ResizablePanel defaultSize={30} minSize={20} className="p-4">
          <div className="h-full rounded-lg bg-muted/50 p-4">
            <h3 className="mb-2 text-sm font-medium">Panel 1</h3>
            <p className="text-sm text-muted-foreground">
              Resizable panel with custom handle
            </p>
          </div>
        </ResizablePanel>
        
        <ResizableHandle className="bg-transparent">
          <div className="flex h-8 w-2 items-center justify-center">
            <div className="h-6 w-1 rounded-full bg-border" />
          </div>
        </ResizableHandle>
        
        <ResizablePanel defaultSize={70} className="p-4">
          <div className="h-full rounded-lg bg-muted/20 p-4">
            <h3 className="mb-2 text-sm font-medium">Panel 2</h3>
            <p className="text-sm text-muted-foreground">
              Main content area with custom handle
            </p>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};

// With percentage-based min and max sizes
export const WithPercentageSizes: Story = {
  render: () => {
    const [sizes, setSizes] = React.useState([30, 40, 30]);
    
    return (
      <div className="w-full max-w-4xl">
        <div className="mb-2 flex justify-between text-sm text-muted-foreground">
          <div>Left: {Math.round(sizes[0])}%</div>
          <div>Middle: {Math.round(sizes[1])}%</div>
          <div>Right: {Math.round(sizes[2])}%</div>
        </div>
        
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-[200px] max-w-full rounded-lg border"
          onLayout={(newSizes: number[]) => setSizes(newSizes)}
        >
          <ResizablePanel 
            defaultSize={sizes[0]} 
            minSize={20}
            maxSize={50}
            className="p-4"
          >
            <div className="h-full rounded-lg bg-muted/50 p-4">
              <h3 className="mb-2 text-sm font-medium">Panel 1</h3>
              <p className="text-sm text-muted-foreground">
                Min: 20%, Max: 50%
              </p>
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          <ResizablePanel 
            defaultSize={sizes[1]} 
            minSize={30}
            maxSize={70}
            className="p-4"
          >
            <div className="h-full rounded-lg bg-muted/30 p-4">
              <h3 className="mb-2 text-sm font-medium">Panel 2</h3>
              <p className="text-sm text-muted-foreground">
                Min: 30%, Max: 70%
              </p>
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          <ResizablePanel 
            defaultSize={sizes[2]} 
            minSize={10}
            maxSize={40}
            className="p-4"
          >
            <div className="h-full rounded-lg bg-muted/50 p-4">
              <h3 className="mb-2 text-sm font-medium">Panel 3</h3>
              <p className="text-sm text-muted-foreground">
                Min: 10%, Max: 40%
              </p>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    );
  },
};

// With pixel-based min and max sizes
export const WithPixelSizes: Story = {
  render: () => {
    const [sizes, setSizes] = React.useState([200, '1fr', 300]);
    
    return (
      <div className="w-full max-w-4xl">
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-[200px] max-w-full rounded-lg border"
          onLayout={(newSizes: any[]) => setSizes(newSizes)}
        >
          <ResizablePanel 
            defaultSize={200}
            minSize={150}
            maxSize={400}
            className="p-4"
          >
            <div className="h-full rounded-lg bg-muted/50 p-4">
              <h3 className="mb-2 text-sm font-medium">Sidebar</h3>
              <p className="text-sm text-muted-foreground">
                Min: 150px, Max: 400px
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Current: {typeof sizes[0] === 'number' ? `${sizes[0]}px` : sizes[0]}
              </p>
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          <ResizablePanel defaultSize="1fr" className="p-4">
            <div className="h-full rounded-lg bg-muted/20 p-4">
              <h3 className="mb-2 text-sm font-medium">Content</h3>
              <p className="text-sm text-muted-foreground">
                Flexible content area that takes remaining space
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Current: {typeof sizes[1] === 'number' ? `${sizes[1]}px` : sizes[1]}
              </p>
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          <ResizablePanel 
            defaultSize={300}
            minSize={200}
            maxSize={500}
            className="p-4"
          >
            <div className="h-full rounded-lg bg-muted/50 p-4">
              <h3 className="mb-2 text-sm font-medium">Properties</h3>
              <p className="text-sm text-muted-foreground">
                Min: 200px, Max: 500px
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Current: {typeof sizes[2] === 'number' ? `${sizes[2]}px` : sizes[2]}
              </p>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    );
  },
};
