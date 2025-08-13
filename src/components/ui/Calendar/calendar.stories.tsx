/* eslint-disable storybook/no-renderer-packages */
import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from './calendar';
import { format } from 'date-fns';
import { Button } from '../Button/button';
import { Popover, PopoverContent, PopoverTrigger } from '../Popover/popover';
import { cn } from '../../../lib/utils';
import { Calendar as CalendarIcon } from 'lucide-react';
import React from 'react';

const meta: Meta<typeof Calendar> = {
  title: 'Components/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

// Basic calendar
export const Basic: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    
    return (
      <div className="flex flex-col items-center gap-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
        <div className="text-sm text-muted-foreground">
          Selected: {date ? format(date, 'PPP') : 'No date selected'}
        </div>
      </div>
    );
  },
};

// With date picker
export const WithDatePicker: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date>();
    
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    );
  },
};

// Date range picker
export const DateRange: Story = {
  render: () => {
    const [date, setDate] = React.useState<{
      from: Date | undefined;
      to: Date | undefined;
    }>({
      from: undefined,
      to: undefined,
    });
    
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !date.from && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} - {" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={{
                  from: date?.from,
                  to: date?.to,
                }}
                onSelect={(range) => {
                  setDate({
                    from: range?.from,
                    to: range?.to,
                  });
                }}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="text-sm text-muted-foreground">
          {date?.from && date?.to ? (
            <p>
              Selected: {format(date.from, 'PPP')} to {format(date.to, 'PPP')}
            </p>
          ) : (
            <p>Please select a date range</p>
          )}
        </div>
      </div>
    );
  },
};

// With form field
export const WithForm: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    
    return (
      <div className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-medium mb-1">Event Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Select a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">Event Details</label>
          <input
            type="text"
            placeholder="Event name"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <textarea
            placeholder="Event description"
            rows={3}
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[60px]"
          />
        </div>
        
        <div className="flex justify-end">
          <Button>Create Event</Button>
        </div>
      </div>
    );
  },
};

// With time picker
export const WithTimePicker: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    const [time, setTime] = React.useState<string>(
      new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })
    );
    
    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTime(e.target.value);
    };
    
    return (
      <div className="space-y-4">
        <div className="flex gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[200px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          
          <div className="relative">
            <label className="sr-only" htmlFor="time">Time</label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={handleTimeChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </div>
        
        <div className="text-sm text-muted-foreground">
          {date && (
            <p>
              Selected: {format(date, 'PPP')} at {time}
            </p>
          )}
        </div>
      </div>
    );
  },
};

// With disabled dates
export const WithDisabledDates: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    
    // Disable weekends and past dates
    const isDateDisabled = (day: Date) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      // Disable past dates
      if (day < today) return true;
      
      // Disable weekends (0 = Sunday, 6 = Saturday)
      const dayOfWeek = day.getDay();
      return dayOfWeek === 0 || dayOfWeek === 6;
    };
    
    return (
      <div className="flex flex-col items-center gap-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={isDateDisabled}
          className="rounded-md border"
        />
        <p className="text-sm text-muted-foreground text-center">
          Weekends and past dates are disabled
        </p>
      </div>
    );
  },
};

// With date indicators
export const WithDateIndicators: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    
    // Sample events data
    const events = [
      { date: new Date(2023, 5, 15), type: 'meeting' },
      { date: new Date(2023, 5, 20), type: 'deadline' },
      { date: new Date(2023, 5, 25), type: 'event' },
      { date: new Date(2023, 5, 25), type: 'meeting' },
    ];
    
    // Check if a date has events
    const hasEvents = (day: Date) => {
      return events.some(event => 
        event.date.getDate() === day.getDate() &&
        event.date.getMonth() === day.getMonth() &&
        event.date.getFullYear() === day.getFullYear()
      );
    };
    
    // Get event types for a date
    const getEventTypes = (day: Date) => {
      return events
        .filter(event => 
          event.date.getDate() === day.getDate() &&
          event.date.getMonth() === day.getMonth() &&
          event.date.getFullYear() === day.getFullYear()
        )
        .map(event => event.type);
    };
    
    return (
      <div className="space-y-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
          components={{
            Day: (props) => {
              const day = props.date;
              const hasEvent = hasEvents(day);
              const eventTypes = hasEvent ? getEventTypes(day) : [];
              
              return (
                <div className="relative">
                  <div
                    {...props}
                    className={cn(
                      'relative flex h-9 w-9 items-center justify-center p-0 text-sm font-normal',
                      'hover:bg-accent hover:text-accent-foreground',
                      'focus:bg-accent focus:text-accent-foreground',
                      'data-[selected]:bg-primary data-[selected]:text-primary-foreground',
                      'data-[disabled]:text-muted-foreground data-[disabled]:opacity-50',
                      'data-[outside]:text-muted-foreground/50',
                      'data-[selected]:data-[outside]:text-primary-foreground/50',
                      'rounded-full',
                      'transition-colors',
                      'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                      props.className
                    )}
                  >
                    {day.getDate()}
                  </div>
                  
                  {hasEvent && (
                    <div className="absolute -bottom-1 left-1/2 flex -translate-x-1/2 transform space-x-0.5">
                      {eventTypes.map((type, i) => (
                        <span
                          key={i}
                          className={cn(
                            'h-1 w-1 rounded-full',
                            type === 'meeting' && 'bg-blue-500',
                            type === 'deadline' && 'bg-red-500',
                            type === 'event' && 'bg-green-500'
                          )}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            },
          }}
        />
        
        <div className="flex items-center justify-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-blue-500"></span>
            <span>Meeting</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-red-500"></span>
            <span>Deadline</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            <span>Event</span>
          </div>
        </div>
      </div>
    );
  },
};
