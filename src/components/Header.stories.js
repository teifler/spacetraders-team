import Header from './Header.js';
import GlobalStyles from '../GlobalStyles.js';

export default {
  title: 'Component/Header',
  component: Header,
  decorators: [
    Story => (
      <>
        <GlobalStyles />
        <Story />
      </>
    ),
  ],
};

const Template = args => <Header {...args} />;

export const HeaderDefault = Template.bind({});
HeaderDefault.args = {
  user: { data: { username: 'Andrea', credits: 0 }, error: false },
};

export const HeaderWithError = Template.bind({});
HeaderWithError.args = {
  user: { data: { username: 'Andrea', credits: 0 }, error: true },
};
