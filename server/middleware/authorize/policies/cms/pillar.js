import { hasAnyPermission } from '../../../../utils/permissions';

const viewPermissions = [
  'cms.*',
  'cms.view',
  'cms.pillars.*',
  'cms.pillars.view',
];

export default {
  list: (userPermissions) => hasAnyPermission(userPermissions, viewPermissions),
  get: (userPermissions) => hasAnyPermission(userPermissions, viewPermissions),
  create: (userPermissions) =>
    hasAnyPermission(userPermissions, [
      'cms.*',
      'cms.create',
      'cms.pillars.*',
      'cms.pillars.create',
    ]),
  update: (userPermissions) =>
    hasAnyPermission(userPermissions, [
      'cms.*',
      'cms.update',
      'cms.pillars.*',
      'cms.pillars.update',
    ]),
  delete: (userPermissions) =>
    hasAnyPermission(userPermissions, [
      'cms.*',
      'cms.delete',
      'cms.pillars.*',
      'cms.pillars.delete',
    ]),
};
