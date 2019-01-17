import allPermissions from "../core/permissions";
import Group from "../models/Group";

/**
 * Get all the permissions for an entity. For example passing 'x' will
 * return [ 'x.*', 'x.list', 'x.get', 'c.create', ..., ].
 *
 * @param item
 * @returns {string[]}
 */
export const allPermissionsFor = (item) => {
  return Object.keys(allPermissions).filter(p => p.startsWith(item));
};

/**
 * Get an array containing mappings (key : description) of all system permissions
 * or those provided.
 *
 * @param permissions
 * @returns {Array}
 */
export const getPermissionsMapArray = (permissions = Object.keys(allPermissions)) => {
  let permissionsArray = [];

  permissions.forEach(permission => {
    permissionsArray.push({[permission]: allPermissions[permission]});
  });

  return permissionsArray;
};

/**
 * Get an array of permissions for the specified user.
 *
 * @param user
 * @returns {Promise<any>}
 */
export const getUserPermissions = (user) => new Promise((resolve) => {
  Group.model.find({_id: {$in: user.groups.toObject()}}).exec((err, groups) => {
    let permissions = [];

    groups.forEach(group => {
      permissions = permissions.concat(group.permissions.toObject());
    });

    resolve(Array.from(new Set(permissions)));
  });
});

/**
 * Check whether the user has any valid permission. If the list of valid permissions
 * is empty it returns true since it is basically checking against nothing.
 *
 * @param userPermissions
 * @param validPermissions
 * @returns boolean
 */
export const hasAnyPermission = (userPermissions, validPermissions) => {
  if (!validPermissions.length) {
    return true;
  }
  return userPermissions.some(permission => validPermissions.indexOf(permission) >= 0);
};

/**
 * Check whether the user has all the required permissions. If the list of required permissions
 * is empty it returns true since it is basically checking against nothing.
 *
 * @param userPermissions
 * @param requiredPermissions
 * @returns boolean
 */
export const hasAllPermissions = (userPermissions, requiredPermissions) => {
  let hasAllRequired = true;
  requiredPermissions.forEach(permission => {
    if (userPermissions.indexOf(permission) < 0) {
      hasAllRequired = false;
    }
  });
  return hasAllRequired;
};
