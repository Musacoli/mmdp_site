import { hasAnyPermission } from '../../../utils/permissions';

export default {
  get: (userPermissions) => {
    return hasAnyPermission(userPermissions, [
      'cms.*',
      'cms.view',
      'cms.stakeholder.*',
      'cms.stakeholder.view',
    ]);
  },
  create: (userPermissions) => {
    return hasAnyPermission(userPermissions, [
      'cms.*',
      'cms.create',
      'cms.stakeholder.*',
      'cms.stakeholder.create',
    ]);
  },
  update: (userPermissions) => {
    return hasAnyPermission(userPermissions, [
      'cms.*',
      'cms.update',
      'cms.stakeholder.*',
      'cms.stakeholder.update',
    ]);
  },
  delete: (userPermissions) => {
    return hasAnyPermission(userPermissions, [
      'cms.*',
      'cms.delete',
      'cms.stakeholder.*',
      'cms.stakeholder.delete',
    ]);
  },
};
