import Navigation from './Navigation.js';
import GlobalStyles from '../GlobalStyles.js';

export default {
  title: 'Component/Navigation',
  component: Navigation,
  decorators: [
    Story => (
      <>
        <GlobalStyles />
        <Story />
      </>
    ),
  ],
};

const Template = () => <Navigation />;

export const NavigationComplete = Template.bind({});
