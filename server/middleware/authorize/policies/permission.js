import {allPermissionsFor, hasAnyPermission} from "../../../utils/permissions";

export default {
  list: (userPermissions) => {
    return hasAnyPermission(userPermissions, allPermissionsFor('group'));
  }
};
