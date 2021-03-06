/**
 * Sidebar items and divider
 * Keys:
 *  title(required): String: name appearing on the sidebar menu
 *  menuItems(required): Array: A list of items to be shown on the dropdown
 *            [name]: String name displayed on a specific dropdown
 *            [path]: String a path to redirect user when a menu item in the dropdown is clicked
 *                    NB: provide a empty array if a menu item doesn't have a dropdown
 *  path(optional): String A path to redirect user if the menu doesn't dropdown
 *  dividerTitle(optional): String This places a divider text between menu items
 */
import { hasAccess } from '../../utils/auth';

export const sidebarItems = [
  {
    title: 'Thematic Pillars',
    menuItems: [
      { name: 'Pillar 1', path: '/pillar-1' },
      { name: 'Pillar 2', path: '/pillar-2' },
      { name: 'Pillar 3', path: '/pillar-3' },
      { name: 'Pillar 4', path: '/pillar-4' },
    ],
  },
  {
    title: 'About',
    menuItems: [
      {
        name: 'Message from the Governor',
        path: '/about/governor-message',
      },
      {
        name: 'About MMDP',
        path: '/about/about-mmdp',
      },
      {
        name: 'The Edo State Approach',
        path: '/about/edo-state-approach',
      },
      {
        name: 'Coordination',
        path: '/about/coordination',
      },
      {
        name: 'Objectives',
        path: '/about/objectives',
      },
    ],
  },
  {
    title: 'Events',
    menuItems: [],
    path: '/list-events',
  },
  {
    title: 'Resources',
    menuItems: [
      { name: 'Research', path: '/resources/research/all' },
      { name: 'Report', path: '/resources/reports' },
      { name: 'Media', path: '/resources/media' },
      { name: 'Documents', path: '/resources/documents' },
      { name: 'Stakeholder directory', path: '/stakeholder-directory' },
    ],
    dividerTitle: 'COORDINATION MATRIX',
  },
  {
    title: 'National level',
    menuItems: [],
    path: '/national-level',
  },
  {
    title: 'State level',
    menuItems: [],
    dividerTitle: 'DROPDOWNS',
  },
  {
    title: 'Manage dropdowns',
    menuItems: [],
    path: '/manage/dropdowns',
    dividerTitle: 'USERS & GROUPS',
    permissions: ['user', 'group'],
  },
  {
    title: 'Users',
    menuItems: [],
    path: '/users/all',
    permissions: ['user'],
  },
  {
    title: 'Groups',
    menuItems: [],
    path: '/group/list',
    permissions: ['group'],
  },
  {
    title: 'Log out',
    menuItems: [],
    path: '/logout',
  },
];

export default () =>
  sidebarItems.filter((item) =>
    item.permissions ? hasAccess(item.permissions) : true,
  );
