import { hasAnyPermission } from '../../../../utils/permissions';

export default {
  get: (userPermissions) => {
    return hasAnyPermission(userPermissions, [
      'cms.*',
      'cms.view',
      'cms.dropdowns.*',
      'cms.dropdowns.view',
    ]);
  },
  create: (userPermissions) => {
    return hasAnyPermission(userPermissions, [
      'cms.*',
      'cms.create',
      'cms.dropdowns.*',
      'cms.dropdowns.create',
    ]);
  },
  update: (userPermissions) => {
    return hasAnyPermission(userPermissions, [
      'cms.*',
      'cms.update',
      'cms.dropdowns.*',
      'cms.dropdowns.update',
    ]);
  },
  delete: (userPermissions) => {
    return hasAnyPermission(userPermissions, [
      'cms.*',
      'cms.delete',
      'cms.dropdowns.*',
      'cms.dropdowns.delete',
    ]);
  },
};
