import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion';
import { Card } from '../Card/card';
import { Check, ChevronDown, ChevronUp, Plus, Minus } from 'lucide-react';
import { useState } from 'react';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['single', 'multiple'],
    },
    collapsible: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

const faqItems = [
  {
    question: 'What is the return policy?',
    answer: 'You can return your purchase within 30 days for a full refund. The item must be in its original condition and packaging.'
  },
  {
    question: 'How long does shipping take?',
    answer: 'Standard shipping typically takes 3-5 business days. Express shipping is available for an additional fee and delivers within 1-2 business days.'
  },
  {
    question: 'Do you offer international shipping?',
    answer: 'Yes, we ship to most countries worldwide. International shipping costs and delivery times vary by destination.'
  },
  {
    question: 'How can I track my order?',
    answer: 'Once your order ships, you will receive a tracking number via email. You can use this number to track your package on our website or the carrier\'s website.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and Apple Pay. All transactions are secure and encrypted.'
  },
];

const features = [
  {
    title: 'Easy Integration',
    description: 'Quickly integrate with your existing workflow with our simple API and comprehensive documentation.',
    icon: Check,
  },
  {
    title: 'Advanced Security',
    description: 'Enterprise-grade security with end-to-end encryption and compliance with industry standards.',
    icon: Check,
  },
  {
    title: '24/7 Support',
    description: 'Our dedicated support team is available around the clock to assist you with any issues or questions.',
    icon: Check,
  },
  {
    title: 'Scalable Infrastructure',
    description: 'Our platform scales with your business, handling everything from startups to enterprise-level traffic.',
    icon: Check,
  },
];

export const Default: Story = {
  args: {
    type: 'single',
    collapsible: true,
    className: 'w-full max-w-2xl',
  },
  render: (args) => (
    <Accordion {...args}>
      {faqItems.map((item, i) => (
        <AccordionItem key={i} value={`item-${i + 1}`}>
          <AccordionTrigger className="text-left">
            <span className="font-medium">{item.question}</span>
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-muted-foreground">{item.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
};

export const Multiple: Story = {
  args: {
    type: 'multiple',
    className: 'w-full max-w-2xl',
  },
  render: (args) => (
    <Accordion {...args}>
      {faqItems.map((item, i) => (
        <AccordionItem key={i} value={`item-${i + 1}`}>
          <AccordionTrigger className="text-left">
            <span className="font-medium">{item.question}</span>
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-muted-foreground">{item.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
};

export const Styled: Story = {
  render: () => {
    const [openItems, setOpenItems] = useState<string[]>([]);
    
    return (
      <div className="space-y-4 w-full max-w-2xl mx-auto">
        <h3 className="text-lg font-medium">Frequently Asked Questions</h3>
        <Accordion 
          type="multiple" 
          value={openItems} 
          onValueChange={setOpenItems}
          className="space-y-2"
        >
          {faqItems.map((item, i) => {
            const isOpen = openItems.includes(`item-${i + 1}`);
            const Icon = isOpen ? Minus : Plus;
            
            return (
              <Card key={i} className="overflow-hidden">
                <AccordionItem value={`item-${i + 1}`} className="border-0">
                  <AccordionTrigger 
                    className={`p-4 hover:no-underline ${
                      isOpen ? 'bg-muted/50' : 'hover:bg-muted/30'
                    } transition-colors`}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <span className="font-medium text-left flex-1">
                        {item.question}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 pt-0">
                    <div className="pl-11">
                      <p className="text-muted-foreground">{item.answer}</p>
                      {i === 0 && (
                        <div className="mt-3 pt-3 border-t">
                          <button className="text-sm text-primary hover:underline">
                            Learn more about our return policy
                          </button>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Card>
            );
          })}
        </Accordion>
      </div>
    );
  },
};

export const FeatureList: Story = {
  render: () => {
    const [openItems, setOpenItems] = useState<string[]>(['item-1']);
    
    return (
      <div className="w-full max-w-3xl mx-auto space-y-2">
        <h3 className="text-xl font-semibold mb-4">Why Choose Us</h3>
        <Accordion 
          type="multiple" 
          value={openItems} 
          onValueChange={setOpenItems}
          className="space-y-3"
        >
          {features.map((feature, i) => {
            const isOpen = openItems.includes(`item-${i + 1}`);
            const Icon = feature.icon;
            
            return (
              <div key={i} className="border rounded-lg overflow-hidden">
                <AccordionItem value={`item-${i + 1}`} className="border-0">
                  <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-muted/30">
                    <div className="flex items-center gap-3 w-full">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-medium text-left flex-1">
                        {feature.title}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-4 pt-0">
                    <div className="pl-[52px]">
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </div>
            );
          })}
        </Accordion>
      </div>
    );
  },
};

export const Animated: Story = {
  render: () => {
    const [openItems, setOpenItems] = useState<string[]>([]);
    
    return (
      <div className="w-full max-w-2xl mx-auto space-y-4">
        <h3 className="text-lg font-medium">Product Details</h3>
        <Accordion 
          type="multiple" 
          value={openItems} 
          onValueChange={setOpenItems}
          className="space-y-3"
        >
          <div className="border rounded-lg overflow-hidden">
            <AccordionItem value="description" className="border-0">
              <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-muted/30">
                <span className="font-medium">Description</span>
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-4 pt-0">
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Our premium product is designed with cutting-edge technology to provide 
                    exceptional performance and durability. Made from high-quality materials, 
                    it's built to last through years of regular use.
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>High-performance materials</li>
                    <li>Ergonomic design</li>
                    <li>Easy to clean and maintain</li>
                    <li>Eco-friendly manufacturing</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          </div>
          
          <div className="border rounded-lg overflow-hidden">
            <AccordionItem value="specs" className="border-0">
              <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-muted/30">
                <span className="font-medium">Specifications</span>
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-4 pt-0">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <h4 className="font-medium mb-2">Dimensions</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>Height: 12.3" (31.2 cm)</li>
                      <li>Width: 8.5" (21.6 cm)</li>
                      <li>Depth: 0.6" (1.5 cm)</li>
                      <li>Weight: 2.0 lbs (0.9 kg)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Materials</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>Aluminum alloy casing</li>
                      <li>Gorilla Glass display</li>
                      <li>Recycled plastic components</li>
                      <li>Rubberized grip</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </div>
          
          <div className="border rounded-lg overflow-hidden">
            <AccordionItem value="shipping" className="border-0">
              <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-muted/30">
                <span className="font-medium">Shipping & Returns</span>
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-4 pt-0">
                <div className="space-y-4 text-muted-foreground">
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Shipping</h4>
                    <p className="text-sm">
                      We offer free standard shipping on all orders. Orders are typically processed 
                      within 1-2 business days and delivered within 3-5 business days.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Returns</h4>
                    <p className="text-sm">
                      Not satisfied? Return your purchase within 30 days for a full refund. 
                      Items must be in original condition with all packaging and accessories included.
                    </p>
                  </div>
                  <button className="text-sm text-primary hover:underline">
                    View full shipping and return policy
                  </button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </div>
        </Accordion>
      </div>
    );
  },
};
