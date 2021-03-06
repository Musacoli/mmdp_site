import { hasAnyPermission } from '../../../utils/permissions';

export default {
  create: (userPermissions) =>
    hasAnyPermission(userPermissions, [
      'cms.*',
      'cms.create',
      'cms.events.*',
      'cms.events.create',
    ]),
  update: (userPermissions) =>
    hasAnyPermission(userPermissions, [
      'cms.*',
      'cms.update',
      'cms.events.*',
      'cms.events.update',
    ]),
  delete: (userPermissions) =>
    hasAnyPermission(userPermissions, [
      'cms.*',
      'cms.delete',
      'cms.events.*',
      'cms.events.delete',
    ]),
};
