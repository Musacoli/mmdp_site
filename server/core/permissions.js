export const userPermissions = {
  'user.*': 'Full users access',
  'user.create': 'Create users',
  'user.edit': 'Edit users',
  'user.view': 'View users',
  'user.delete': 'Delete users',
};

export const groupPermissions = {
  'group.*': 'Full groups access',
  'group.create': 'Create groups',
  'group.edit': 'Edit groups',
  'group.view': 'View groups',
  'group.delete': 'Delete groups',
};

export const allPagesPermissions = {
  'cms.*': 'Full cms access',
  'cms.create': 'Create content for any page',
  'cms.edit': 'Edit content for any page',
  'cms.view': 'View content for any page',
  'cms.archive': 'Archive content for any page',
};

export const pillarsPagePermissions = {
  'cms.pillars.*': "Full thematic pillars access",
  'cms.pillars.create': "Create thematic pillars content",
  'cms.pillars.edit': "Edit thematic pillars content",
  'cms.pillars.view': "View thematic pillars content",
  'cms.pillars.archive': "Archive thematic pillars content",
};

export const aboutPagePermissions = {
  'cms.about.*': "Full about access",
  'cms.about.create': "Create about content",
  'cms.about.edit': "Edit about content",
  'cms.about.view': "View about content",
  'cms.about.archive': "Archive about content",
};

export const eventsPagePermissions = {
  'cms.events.*': "Full events access",
  'cms.events.create': "Create events content",
  'cms.events.edit': "Edit events content",
  'cms.events.view': "View events content",
  'cms.events.archive': "Archive events content",
};

export const resourcesPagePermissions = {
  'cms.resources.*': "Full resources access",
  'cms.resources.create': "Create resources content",
  'cms.resources.edit': "Edit resources content",
  'cms.resources.view': "View resources content",
  'cms.resources.archive': "Archive resources content",
};

export default {
  ...userPermissions,
  ...groupPermissions,
  ...allPagesPermissions,
  ...pillarsPagePermissions,
  ...aboutPagePermissions,
  ...eventsPagePermissions,
  ...resourcesPagePermissions,
};
