import { hasAnyPermission } from '../../../../utils/permissions';

export default {
  list: (userPermissions) => {
    return hasAnyPermission(userPermissions, [
      'cms.resources.*',
      'cms.resources.view',
    ]);
  },
  get: (userPermissions) => {
    return hasAnyPermission(userPermissions, [
      'cms.resources.*',
      'cms.resources.view',
    ]);
  },
  create: (userPermissions) => {
    return hasAnyPermission(userPermissions, [
      'cms.resources.*',
      'cms.resources.create',
    ]);
  },
  update: (userPermissions) => {
    return hasAnyPermission(userPermissions, [
      'cms.resources.*',
      'cms.resources.update',
    ]);
  },
  delete: (userPermissions) => {
    return hasAnyPermission(userPermissions, [
      'cms.resources.*',
      'cms.resources.archive',
    ]);
  },
};
