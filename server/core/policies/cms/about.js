import { hasAnyPermission } from '../../../utils/permissions';

export default {
  get: (userPermissions) => {
    return hasAnyPermission(userPermissions, [
      'cms.*',
      'cms.view',
      'cms.about.*',
      'cms.about.view',
    ]);
  },
  create: (userPermissions) => {
    return hasAnyPermission(userPermissions, [
      'cms.*',
      'cms.create',
      'cms.about.*',
      'cms.about.create',
    ]);
  },
  update: (userPermissions) => {
    return hasAnyPermission(userPermissions, [
      'cms.*',
      'cms.update',
      'cms.about.*',
      'cms.about.update',
    ]);
  },
  delete: (userPermissions) => {
    return hasAnyPermission(userPermissions, [
      'cms.*',
      'cms.archive',
      'cms.about.*',
      'cms.about.archive',
    ]);
  },
};
