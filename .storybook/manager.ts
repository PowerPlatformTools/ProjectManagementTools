import { addons } from '@storybook/manager-api';
import yourTheme from './YourTheme';

addons.setConfig({
  theme: yourTheme,
  sidebar:{showRoots:false,},
 
});