// Using direct import with @ts-expect-error as a temporary solution
// The project should install @storybook/react-vite for better Vite integration
// @ts-expect-error - Using direct import as a fallback
import type { Meta, StoryObj } from '@storybook/react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './carousel';
import { Card, CardContent } from '../Card/card';
import { Button } from '../Button/button';
import { useState } from 'react';
import { Play, Pause } from 'lucide-react';

const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  argTypes: {
    className: { control: 'text' },
    opts: { control: { disable: true } },
  } as const,
};

export default meta;
type Story = StoryObj<typeof Carousel>;

// Sample images
const images = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80',
];

// Basic image carousel
export const Basic: Story = {
  args: {
    className: 'w-full max-w-md',
  } as const,
  render: (args) => (
    <div className={args.className}>
      <Carousel className="w-full">
        <CarouselContent>
          {images.map((image, i) => (
            <CarouselItem key={i}>
              <div className="p-1">
                <Card>
                  <CardContent className="p-0">
                    <img 
                      src={image} 
                      alt={`Slide ${i + 1}`} 
                      className="aspect-video w-full object-cover rounded-md"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
};

// Auto-playing carousel
export const AutoPlaying: Story = {
  render: () => {
    const [isPlaying, setIsPlaying] = useState(true);
    
    return (
      <div className="w-full max-w-md">
        <div className="flex justify-end mb-2">
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => setIsPlaying(!isPlaying)}
            className="gap-2"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {isPlaying ? 'Pause' : 'Play'}
          </Button>
        </div>
        <Carousel 
          opts={{ 
            loop: true,
          }}
        >
          <CarouselContent>
            {images.map((image, i) => (
              <CarouselItem key={i}>
                <div className="relative aspect-video">
                  <img 
                    src={image} 
                    alt={`Slide ${i + 1}`} 
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
                    <h3 className="font-medium">Slide {i + 1}</h3>
                    <p className="text-sm opacity-80">Description for slide {i + 1}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-4 top-1/2 -translate-y-1/2" />
          <CarouselNext className="-right-4 top-1/2 -translate-y-1/2" />
        </Carousel>
      </div>
    );
  },
};

// Multiple items per view
export const MultipleItems: Story = {
  render: () => (
    <div className="w-full max-w-3xl">
      <Carousel
        opts={{
          align: 'start',
        }}
        className="w-full"
      >
        <CarouselContent>
          {Array.from({ length: 10 }).map((_, i) => (
            <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card>
                  <CardContent className="p-4">
                    <div className="aspect-square bg-muted rounded-md mb-4" />
                    <h3 className="font-medium">Item {i + 1}</h3>
                    <p className="text-sm text-muted-foreground">Description for item {i + 1}</p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-4 top-1/2 -translate-y-1/2" />
        <CarouselNext className="-right-4 top-1/2 -translate-y-1/2" />
      </Carousel>
    </div>
  ),
};
