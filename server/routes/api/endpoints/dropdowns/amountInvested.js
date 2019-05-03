import keystone from 'keystone';
import validate from 'express-validation';
import validator from '../../../../validation';
import authorize from '../../../../middleware/authorize';
import authenticate from '../../../../middleware/authenticate';

export const baseUrl = '/api/v1';

const amountInvested = `${baseUrl}/amount-invested`;

const AmountInvested = (app, routes) => {
  /* ---------- Amount Invested Dropdown ----------- */
  app.post(
    `${amountInvested}`,
    [
      authenticate,
      authorize.cms.dropdowns.create,
      keystone.middleware.api,
      validate(validator.amountInvested.validateAmount),
    ],
    routes.api.dropdowns.amountInvested.create,
  );

  app.get(
    `${amountInvested}`,
    [authenticate, authorize.cms.dropdowns.create],
    routes.api.dropdowns.amountInvested.list,
  );

  app.put(
    `${amountInvested}/:id`,
    [
      authenticate,
      authorize.cms.dropdowns.update,
      keystone.middleware.api,
      validate(validator.amountInvested.validateAmount),
    ],
    routes.api.dropdowns.amountInvested.update,
  );

  app.put(
    `${amountInvested}`,
    [
      authenticate,
      authorize.cms.dropdowns.update,
      keystone.middleware.api,
      validate(validator.amountInvested.validateAmount),
    ],
    routes.api.dropdowns.amountInvested.updateMany,
  );

  app.delete(
    `${amountInvested}/:id`,
    [authenticate, authorize.cms.dropdowns.delete, keystone.middleware.api],
    routes.api.dropdowns.amountInvested.remove,
  );
};
export default AmountInvested;
