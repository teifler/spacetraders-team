import Button from './Button.js';
import GlobalStyles from '../GlobalStyles.js';

export default {
  title: 'Component/Button',
  component: Button,
  decorators: [
    Story => (
      <>
        <GlobalStyles />
        <Story />
      </>
    ),
  ],
};

const Template = args => <Button {...args} />;

export const ButtonComplete = Template.bind({});
ButtonComplete.args = {
  children: 'Purchase',
  disabled: false,
};

export const ButtonDisabled = Template.bind({});
ButtonDisabled.args = {
  children: 'Purchase',
  disabled: true,
};
