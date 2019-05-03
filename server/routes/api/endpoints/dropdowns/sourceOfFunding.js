import keystone from 'keystone';
import validate from 'express-validation';
import validator from '../../../../validation';
import authorize from '../../../../middleware/authorize';
import authenticate, {
  authOptional,
} from '../../../../middleware/authenticate';

export const baseUrl = '/api/v1';

const fundingSourcePath = `${baseUrl}/funding-source`;

const SourceOfFunding = (app, routes) => {
  /* Source of funding dropdown */
  app.post(
    `${fundingSourcePath}`,
    [
      authenticate,
      authorize.cms.dropdowns.create,
      keystone.middleware.api,
      validate(validator.funding.addFunding),
    ],
    routes.api.dropdowns.fundingSource.create,
  );

  app.get(
    `${fundingSourcePath}`,
    [authOptional],
    routes.api.dropdowns.fundingSource.list,
  );

  app.delete(
    `${fundingSourcePath}/:id`,
    [authenticate, authorize.cms.dropdowns.delete, keystone.middleware.api],
    routes.api.dropdowns.fundingSource.remove,
  );

  app.put(
    `${fundingSourcePath}/:id`,
    [
      authenticate,
      authorize.cms.dropdowns.update,
      keystone.middleware.api,
      validate(validator.funding.addFunding),
    ],
    routes.api.dropdowns.fundingSource.update,
  );

  app.put(
    `${fundingSourcePath}`,
    [
      authenticate,
      authorize.cms.dropdowns.update,
      keystone.middleware.api,
      validate(validator.funding.addFunding),
    ],
    routes.api.dropdowns.fundingSource.updateMany,
  );
};
export default SourceOfFunding;
