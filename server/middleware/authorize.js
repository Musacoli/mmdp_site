import keystone from 'keystone';

const importPolicies = keystone.importer(`${__dirname}/../core`);

const generateActionCallback = (actions, actionKey) => async (
  req,
  res,
  next,
) => {
  if (actions[actionKey](await req.user.permissions)) {
    next();
  } else {
    return res.status(403).json({
      status: 'error',
      message: 'You are not authorized to perform this action.',
    });
  }
};

const getActionCallbacks = (actions) => {
  const callbacks = {};

  Object.keys(actions).forEach((actionKey) => {
    callbacks[actionKey] = generateActionCallback(actions, actionKey);
  });

  return callbacks;
};

const getPolicyCallbacks = (policies) => {
  const callbacks = {};

  Object.keys(policies).forEach((policyKey) => {
    if (!policies[policyKey].default) {
      // recursive call to allow proper loading of nested/namespaced policies
      callbacks[policyKey] = getPolicyCallbacks(policies[policyKey]);
    } else {
      const actions = policies[policyKey].default;

      callbacks[policyKey] = getActionCallbacks(actions);
    }
  });

  return callbacks;
};

const policies = importPolicies('./policies');

const authorizationMiddleware = getPolicyCallbacks(policies);

export default authorizationMiddleware;
