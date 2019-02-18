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
        name: 'Message from the governor',
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
      { name: 'Research', path: '/resources/research/add' },
      { name: 'Report', path: '/resources/reports/add' },
      { name: 'Media', path: '/resources/report/media' },
      { name: 'Documents', path: '/resources/documents' },
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
    dividerTitle: 'USERS & GROUPS',
  },
  {
    title: 'Users',
    menuItems: [],
    path: '/users/all',
  },
  {
    title: 'Groups',
    menuItems: [],
    path: '/group/list',
  },
];

export default sidebarItems;
