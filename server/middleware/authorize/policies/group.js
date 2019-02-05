import {hasAnyPermission} from "../../../utils/permissions";

export default {
  list: (userPermissions) => {
    return hasAnyPermission(userPermissions, ['group.*', 'group.view']);
  },
  get: (userPermissions) => {
    return hasAnyPermission(userPermissions, ['group.*', 'group.view']);
  },
  create: (userPermissions) => {
    return hasAnyPermission(userPermissions, ['group.*', 'group.create']);
  },
  update: (userPermissions) => {
    return hasAnyPermission(userPermissions, ['group.*', 'group.update']);
  },
  delete: (userPermissions) => {
    return hasAnyPermission(userPermissions, ['group.*', 'group.delete']);
  },
};
