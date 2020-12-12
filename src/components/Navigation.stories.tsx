import React from 'react';
import Navigation from './Navigation';
import { Story, Meta } from '@storybook/react/types-6-0';

export default {
  title: 'Example/Navigation',
  Component: Navigation,
} as Meta;

const Template: Story = (args) => <Navigation {...args} />;
export const Navigations = Template.bind({});