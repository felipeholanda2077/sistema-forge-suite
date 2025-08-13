import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from '../TextArea/textarea';
import { useState } from 'react';
import { Paperclip, Mic, Smile, Send, X, Check, AlertCircle } from 'lucide-react';
import { Button } from '../Button/button';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
    },
    rows: {
      control: { type: 'number', min: 1, max: 20 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    placeholder: 'Type your message here...',
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full gap-1.5">
      <label htmlFor="message" className="text-sm font-medium">
        Your message
      </label>
      <Textarea 
        placeholder="Type your message here..." 
        id="message" 
      />
      <p className="text-sm text-muted-foreground">
        Your message will be copied to the support team.
      </p>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    placeholder: 'This textarea is disabled',
    disabled: true,
  },
};

export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [error, setError] = useState('');
    
    const validate = (text: string) => {
      if (text.length < 10) {
        setError('Message must be at least 10 characters long');
        return false;
      }
      setError('');
      return true;
    };
    
    return (
      <div className="space-y-2 w-full max-w-lg">
        <label htmlFor="feedback" className="text-sm font-medium">
          Your feedback
        </label>
        <div className="relative">
          <Textarea
            id="feedback"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (error) validate(e.target.value);
            }}
            onBlur={() => validate(value)}
            className={error ? 'border-destructive focus-visible:ring-destructive' : ''}
            placeholder="Tell us what you think..."
            rows={4}
          />
          {error && (
            <div className="absolute -bottom-5 left-0 flex items-center text-xs text-destructive">
              <AlertCircle className="mr-1 h-3 w-3" />
              {error}
            </div>
          )}
        </div>
        <div className="flex justify-between items-center pt-1">
          <span className="text-xs text-muted-foreground">
            {value.length}/500 characters
          </span>
          <Button 
            size="sm" 
            disabled={!!error || value.length < 10}
            onClick={() => alert('Feedback submitted!')}
          >
            Submit
          </Button>
        </div>
      </div>
    );
  },
};

export const ChatInput: Story = {
  render: () => {
    const [message, setMessage] = useState('');
    
    return (
      <div className="w-full max-w-2xl rounded-lg border bg-background p-2 shadow-sm">
        <div className="flex items-end gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Paperclip className="h-4 w-4" />
            <span className="sr-only">Attach file</span>
          </Button>
          
          <div className="relative flex-1">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="min-h-[40px] max-h-32 resize-none border-0 shadow-none focus-visible:ring-0"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  if (message.trim()) {
                    alert(`Sending: ${message}`);
                    setMessage('');
                  }
                }
              }}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Smile className="h-4 w-4" />
                <span className="sr-only">Add emoji</span>
              </Button>
            </div>
          </div>
          
          <Button 
            size="icon" 
            className="h-8 w-8"
            disabled={!message.trim()}
            onClick={() => {
              if (message.trim()) {
                alert(`Sending: ${message}`);
                setMessage('');
              }
            }}
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </div>
    );
  },
};

export const CommentBox: Story = {
  render: () => {
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    
    const handleSubmit = () => {
      if (!comment.trim()) return;
      
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        console.log('Comment submitted:', comment);
        setSubmitted(true);
        setIsSubmitting(false);
        
        // Reset after showing success
        setTimeout(() => {
          setSubmitted(false);
          setComment('');
        }, 2000);
      }, 1000);
    };
    
    if (submitted) {
      return (
        <div className="flex items-center gap-2 p-4 border rounded-lg bg-green-50">
          <Check className="h-5 w-5 text-green-500" />
          <span className="text-sm text-green-800">Comment posted successfully!</span>
        </div>
      );
    }
    
    return (
      <div className="space-y-3 w-full max-w-2xl">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-full bg-muted flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="border rounded-lg overflow-hidden">
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write a comment..."
                className="min-h-[100px] border-0 focus-visible:ring-0"
                disabled={isSubmitting}
              />
              <div className="border-t bg-muted/50 p-2 flex justify-between items-center">
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8" disabled={isSubmitting}>
                    <Paperclip className="h-4 w-4" />
                    <span className="sr-only">Attach file</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8" disabled={isSubmitting}>
                    <Smile className="h-4 w-4" />
                    <span className="sr-only">Add emoji</span>
                  </Button>
                </div>
                <Button 
                  size="sm" 
                  onClick={handleSubmit}
                  disabled={!comment.trim() || isSubmitting}
                >
                  {isSubmitting ? 'Posting...' : 'Post comment'}
                </Button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Press Enter to add a new line. Press Ctrl+Enter to submit.
            </p>
          </div>
        </div>
      </div>
    );
  },
};

export const CodeEditor: Story = {
  render: () => {
    const [code, setCode] = useState(
      'function greet(name) {\n  return `Hello, ${name}!`;\n}\n\n// Example usage\nconsole.log(greet("World"));'
    );
    
    return (
      <div className="w-full max-w-4xl space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">script.js</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-7 gap-1 text-xs">
              <span>Run</span>
              <span className="text-xs opacity-50">⌘⏎</span>
            </Button>
            <Button variant="outline" size="sm" className="h-7 text-xs">
              Copy
            </Button>
          </div>
        </div>
        <div className="relative">
          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="font-mono text-sm h-64 w-full bg-[#1e1e1e] text-[#d4d4d4] border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-4 resize-none"
            style={{
              fontFamily: 'var(--font-mono)',
              lineHeight: '1.5',
              tabSize: 2,
            }}
            spellCheck={false}
          />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#1e1e1e] to-transparent pointer-events-none" />
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>JavaScript</span>
          <span>{code.split('\n').length} lines</span>
        </div>
      </div>
    );
  },
};

export const CharacterCounter: Story = {
  render: () => {
    const [bio, setBio] = useState('');
    const maxLength = 280;
    const remaining = maxLength - bio.length;
    const isLimitReached = remaining <= 0;
    
    return (
      <div className="space-y-2 w-full max-w-lg">
        <div>
          <label htmlFor="bio" className="block text-sm font-medium mb-1">
            Bio
          </label>
          <Textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell us about yourself..."
            maxLength={maxLength}
            className={isLimitReached ? 'border-red-500 focus-visible:ring-red-500' : ''}
            rows={4}
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="text-xs text-muted-foreground">
            {isLimitReached ? (
              <span className="text-red-500 font-medium">
                Max length reached
              </span>
            ) : (
              <span>
                {remaining} character{remaining !== 1 ? 's' : ''} remaining
              </span>
            )}
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setBio('')}
            disabled={!bio}
          >
            Clear
          </Button>
        </div>
      </div>
    );
  },
};
