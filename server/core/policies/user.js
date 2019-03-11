import { hasAnyPermission } from '../../utils/permissions';

export default {
  list: (userPermissions) => {
    return hasAnyPermission(userPermissions, ['user.*', 'user.view']);
  },
  get: (userPermissions) => {
    return hasAnyPermission(userPermissions, ['user.*', 'user.view']);
  },
  create: (userPermissions) => {
    return hasAnyPermission(userPermissions, ['user.*', 'user.create']);
  },
  update: (userPermissions) => {
    return hasAnyPermission(userPermissions, ['user.*', 'user.update']);
  },
  delete: (userPermissions) => {
    return hasAnyPermission(userPermissions, ['user.*', 'user.delete']);
  },
};
