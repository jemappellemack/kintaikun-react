import React from 'react';
import KintaiApplyModal, { KintaiApplyModalProps } from './KintaiApplyModal';
import { Story, Meta } from '@storybook/react/types-6-0';
import format from 'date-fns/format';

export default {
  title: 'Example/KintaiApplyModal',
  Component: KintaiApplyModal,
} as Meta;

const Template: Story<KintaiApplyModalProps> = (args) => <KintaiApplyModal {...args} />;
export const KintaiApplyModals = Template.bind({});
KintaiApplyModals.args = {
  selectdate: {
    dateString: format(new Date(), 'yyyy-MM-dd')
  }
};