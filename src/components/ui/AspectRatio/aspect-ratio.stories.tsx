import type { Meta, StoryObj } from '@storybook/react';
import { AspectRatio } from './aspect-ratio';
import { Card, CardContent } from '../Card/card';

const meta: Meta<typeof AspectRatio> = {
  title: 'Components/Aspect Ratio',
  component: AspectRatio,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof AspectRatio>;

// Sample images for the aspect ratio examples
const sampleImages = {
  landscape: 'https://images.unsplash.com/photo-1574169208507-84376144848b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1479&q=80',
  portrait: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
  square: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
};

// 16:9 aspect ratio
export const Landscape: Story = {
  render: () => (
    <div className="w-[500px]">
      <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg overflow-hidden">
        <img
          src={sampleImages.landscape}
          alt="Landscape"
          className="w-full h-full object-cover"
        />
      </AspectRatio>
      <p className="mt-2 text-sm text-muted-foreground text-center">16:9 Aspect Ratio</p>
    </div>
  ),
};

// 1:1 aspect ratio
export const Square: Story = {
  render: () => (
    <div className="w-[300px]">
      <AspectRatio ratio={1} className="bg-muted rounded-lg overflow-hidden">
        <img
          src={sampleImages.square}
          alt="Square"
          className="w-full h-full object-cover"
        />
      </AspectRatio>
      <p className="mt-2 text-sm text-muted-foreground text-center">1:1 Aspect Ratio</p>
    </div>
  ),
};

// 4:5 aspect ratio (common for portraits)
export const Portrait: Story = {
  render: () => (
    <div className="w-[300px]">
      <AspectRatio ratio={4 / 5} className="bg-muted rounded-lg overflow-hidden">
        <img
          src={sampleImages.portrait}
          alt="Portrait"
          className="w-full h-full object-cover"
        />
      </AspectRatio>
      <p className="mt-2 text-sm text-muted-foreground text-center">4:5 Aspect Ratio</p>
    </div>
  ),
};

// 21:9 aspect ratio (ultrawide)
export const UltraWide: Story = {
  render: () => (
    <div className="w-full max-w-3xl">
      <AspectRatio ratio={21 / 9} className="bg-muted rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
          <span className="text-white font-medium text-lg">21:9 Ultra Wide Content</span>
        </div>
      </AspectRatio>
      <p className="mt-2 text-sm text-muted-foreground text-center">21:9 Ultra Wide Aspect Ratio</p>
    </div>
  ),
};

// Video embed with 16:9 aspect ratio
export const VideoEmbed: Story = {
  render: () => (
    <div className="w-[600px]">
      <AspectRatio ratio={16 / 9} className="bg-black rounded-lg overflow-hidden">
        <iframe
          src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=5Pk4d7fQ8JY8X9vR"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </AspectRatio>
      <p className="mt-2 text-sm text-muted-foreground text-center">16:9 Video Embed</p>
    </div>
  ),
};

// Responsive aspect ratio in a card
export const InCard: Story = {
  render: () => (
    <Card className="w-[350px]">
      <AspectRatio ratio={4 / 3} className="bg-muted">
        <img
          src={sampleImages.landscape}
          alt="Card cover"
          className="w-full h-full object-cover"
        />
      </AspectRatio>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold">Beautiful Landscape</h3>
        <p className="text-sm text-muted-foreground mt-1">
          This card maintains a 4:3 aspect ratio for the image, ensuring consistent
          dimensions across different screen sizes.
        </p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Photo by Jane Doe</span>
          <button className="text-sm font-medium text-primary hover:underline">
            View More
          </button>
        </div>
      </CardContent>
    </Card>
  ),
};

// Multiple aspect ratios in a grid
export const GridLayout: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
      {[
        { ratio: 1, title: '1:1', subtitle: 'Square' },
        { ratio: 4/3, title: '4:3', subtitle: 'Standard' },
        { ratio: 16/9, title: '16:9', subtitle: 'Widescreen' },
        { ratio: 2/3, title: '2:3', subtitle: 'Portrait' },
        { ratio: 3/2, title: '3:2', subtitle: 'Classic 35mm' },
        { ratio: 9/16, title: '9:16', subtitle: 'Vertical' },
      ].map((item) => (
        <div key={item.ratio} className="space-y-2">
          <AspectRatio 
            ratio={item.ratio} 
            className="bg-muted rounded-lg overflow-hidden border"
          >
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center p-4">
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.subtitle}</p>
              </div>
            </div>
          </AspectRatio>
          <p className="text-sm text-muted-foreground text-center">
            {item.title} ({item.subtitle})
          </p>
        </div>
      ))}
    </div>
  ),
};

// Custom content with overlay
export const WithOverlay: Story = {
  render: () => (
    <div className="w-[500px]">
      <div className="relative">
        <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg overflow-hidden">
          <img
            src={sampleImages.landscape}
            alt="Landscape with overlay"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
            <div>
              <h3 className="text-xl font-bold text-white">Amazing View</h3>
              <p className="text-white/80">Experience the beauty of nature</p>
            </div>
          </div>
        </AspectRatio>
      </div>
      <p className="mt-2 text-sm text-muted-foreground text-center">
        16:9 with Text Overlay
      </p>
    </div>
  ),
};
