import keystone from 'keystone';

const importPolicies = keystone.importer(__dirname);

const checkPermission = (userPermissions, validPermissions) => userPermissions.some(permission => validPermissions.indexOf(permission) >= 0);

const getActionCallbacks = (actions) => {
  const callbacks = {};

  Object.keys(actions).forEach((actionKey) => {
    callbacks[actionKey] = async (req, res, next) => {
      if (actions[actionKey](req)) {
        next();
      } else {
        return res.status(403).json({
          status: 'error',
          message: 'You are not authorized to perform this action.',
        });
      }
    };
  });

  return callbacks;
};

const getPolicyCallbacks = (policies) => {
  const callbacks = {};

  Object.keys(policies).forEach((policyKey) => {
    const actions = policies[policyKey].default;

    callbacks[policyKey] = getActionCallbacks(actions);
  });

  return callbacks;
};

const policies = importPolicies('./policies');

const authorizationMiddleware = getPolicyCallbacks(policies);

export default authorizationMiddleware;
