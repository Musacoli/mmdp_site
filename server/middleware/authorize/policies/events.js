import { hasAnyPermission } from '../../../utils/permissions';

export default {
  list: (userPermissions) =>
    hasAnyPermission(userPermissions, ['events.*', 'events.view']),
  get: (userPermissions) =>
    hasAnyPermission(userPermissions, ['events.*', 'events.view']),
  create: (userPermissions) =>
    hasAnyPermission(userPermissions, ['events.*', 'events.create']),
  update: (userPermissions) =>
    hasAnyPermission(userPermissions, ['events.*', 'events.update']),
  delete: (userPermissions) =>
    hasAnyPermission(userPermissions, ['events.*', 'events.delete']),
};
