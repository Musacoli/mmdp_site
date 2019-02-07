import GovernorMessageComponent from './GovernorMessage';
import AboutMMDPComponent from './AboutMMDP';

const routes = [
  {
    path: '/about',
    name: 'About',
    component: GovernorMessageComponent,
    exact: true,
  },
  {
    path: '/about/governor-message',
    name: 'Governor Message',
    component: GovernorMessageComponent,
    exact: false,
  },
  {
    path: '/about/about-mmdp',
    name: 'About MMDP',
    component: AboutMMDPComponent,
    exact: false,
  },
];

export default routes;
