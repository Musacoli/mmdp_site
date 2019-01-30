import { hasAnyPermission } from '../../../utils/permissions';

/**
 * Foreach of the actions provide an array of valid permissions i.e.
 * those that allow the action to be performed. Other conditions
 * resulting to a boolean can be added.
 */

/*
todo must refactor this
The user will be available via the req object but right now it's not.
It will be added by the authentication middleware.
Get user permissions:
 - const user = await User.model.findOne({email: req.user.email});
 - const permissions = await getUserPermissions(user)
*/

// mocked user permissions
const userPermissions = ['group.*', 'user.*'];

export default {
  list: req => hasAnyPermission(userPermissions, ['group.*', 'group.list']),
  get: req => hasAnyPermission(userPermissions, ['group.*', 'group.get']),
  create: req => hasAnyPermission(userPermissions, ['group.*', 'group.create']),
  update: req => hasAnyPermission(userPermissions, ['group.*', 'group.update']),
  delete: req => hasAnyPermission(userPermissions, ['group.*', 'group.delete']),
};
