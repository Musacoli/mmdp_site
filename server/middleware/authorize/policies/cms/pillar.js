import { hasAnyPermission } from '../../../../utils/permissions';

export default {
  view: (userPermissions) =>
    hasAnyPermission(userPermissions, [
      'cms.*',
      'cms.view',
      'cms.pillars.*',
      'cms.pillars.view',
    ]),
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
