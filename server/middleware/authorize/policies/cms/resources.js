import { hasAnyPermission } from '../../../../utils/permissions';

export default {
  list: (userPermissions) => {
    return hasAnyPermission(userPermissions, [
      'cms.*',
      'cms.view',
      'cms.resources.*',
      'cms.resources.view',
    ]);
  },
  get: (userPermissions) => {
    return hasAnyPermission(userPermissions, [
      'cms.*',
      'cms.view',
      'cms.resources.*',
      'cms.resources.view',
    ]);
  },
  create: (userPermissions) => {
    return hasAnyPermission(userPermissions, [
      'cms.*',
      'cms.create',
      'cms.resources.*',
      'cms.resources.create',
    ]);
  },
  update: (userPermissions) => {
    return hasAnyPermission(userPermissions, [
      'cms.*',
      'cms.update',
      'cms.resources.*',
      'cms.resources.update',
    ]);
  },
  archive: (userPermissions) => {
    return hasAnyPermission(userPermissions, [
      'cms.*',
      'cms.archive',
      'cms.resources.*',
      'cms.resources.archive',
    ]);
  },
  delete: (userPermissions) => {
    return hasAnyPermission(userPermissions, [
      'cms.*',
      'cms.delete',
      'cms.resources.*',
      'cms.resources.delete',
    ]);
  },
};
