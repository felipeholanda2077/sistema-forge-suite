import React from 'react';
import type { Preview, Decorator } from '@storybook/react';
import '../src/index.css';

const withThemeProvider: Decorator = (Story, context) => {
  return (
    <div className="min-h-screen w-full p-8">
      <Story {...context} />
    </div>
  );
};

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1a1a1a' },
      ],
    },
    layout: 'centered',
  },
  decorators: [withThemeProvider],
};

export default preview;
