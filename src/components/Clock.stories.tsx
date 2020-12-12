import React from 'react';
import Clock from './Clock';
import { Story, Meta } from '@storybook/react/types-6-0';

export default {
  title: 'Example/Clock',
  Component: Clock,
} as Meta;

const Template: Story = (args) => <Clock {...args} />;
export const Clocks = Template.bind({});