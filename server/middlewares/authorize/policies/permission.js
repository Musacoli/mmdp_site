import {allPermissionsFor, hasAnyPermission} from "../../../utils/permissions";

/*
todo refer to ./groups.js to see required refactor.
 */

// mocked user permissions
const userPermissions = ['group.*'];

export default {
  list: (req) => {
    return hasAnyPermission(userPermissions, allPermissionsFor('group'));
  }
};
