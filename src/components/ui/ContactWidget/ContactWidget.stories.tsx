import type { Meta, StoryObj } from "@storybook/react-vite";
import ContactWidget from "./ContactWidget";

const meta: Meta<typeof ContactWidget> = {
  title: "Components/UI/ContactWidget",
  component: ContactWidget,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A floating contact widget with WhatsApp and LinkedIn links.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    // Since our component doesn't take any props yet, we can add them here if needed in the future
  },
};

export default meta;
type Story = StoryObj<typeof ContactWidget>;

export const Default: Story = {
  render: () => (
    <div style={{ position: "relative", width: "360px", height: "640px", border: "1px solid #ccc" }}>
      <div style={{ position: "absolute", bottom: "24px", right: "24px" }}>
        <ContactWidget />
      </div>
      <div style={{ padding: "20px" }}>
        <h2>Page Content</h2>
        <p>Scroll and interact with the contact widget in the bottom right corner.</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Default contact widget with WhatsApp and LinkedIn icons.",
      },
    },
  },
};

export const WithCustomPosition: Story = {
  render: () => (
    <div style={{ position: "relative", width: "360px", height: "640px", border: "1px solid #ccc" }}>
      <div style={{ position: "absolute", top: "50px", left: "50px" }}>
        <ContactWidget />
      </div>
      <div style={{ padding: "20px" }}>
        <h2>Custom Position Example</h2>
        <p>Contact widget positioned at the top left instead of bottom right.</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Example showing how the widget can be positioned anywhere on the page.",
      },
    },
  },
};
