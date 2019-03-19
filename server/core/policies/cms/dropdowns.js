import { hasAnyPermission } from '../../../utils/permissions';

export default {
  get: (userPermissions) =>
    hasAnyPermission(userPermissions, [
      'cms.*',
      'cms.view',
      'cms.dropdowns.*',
      'cms.dropdowns.view',
    ]),
  create: (userPermissions) =>
    hasAnyPermission(userPermissions, [
      'cms.*',
      'cms.create',
      'cms.dropdowns.*',
      'cms.dropdowns.create',
    ]),
  update: (userPermissions) =>
    hasAnyPermission(userPermissions, [
      'cms.*',
      'cms.update',
      'cms.dropdowns.*',
      'cms.dropdowns.update',
    ]),
  delete: (userPermissions) =>
    hasAnyPermission(userPermissions, [
      'cms.*',
      'cms.delete',
      'cms.dropdowns.*',
      'cms.dropdowns.delete',
    ]),
};
