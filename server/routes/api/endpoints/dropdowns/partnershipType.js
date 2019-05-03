import keystone from 'keystone';
import validate from 'express-validation';
import validator from '../../../../validation';
import authorize from '../../../../middleware/authorize';
import authenticate, {
  authOptional,
} from '../../../../middleware/authenticate';

export const baseUrl = '/api/v1';

const partnershipTypePath = `${baseUrl}/partnership-type`;

const PartnershipType = (app, routes) => {
  // partnership Types
  app.post(
    `${partnershipTypePath}`,
    [
      authenticate,
      authorize.cms.dropdowns.create,
      validate(validator.partnershipType.partnershipType),
    ],
    routes.api.dropdowns.partnershipType.create,
  );

  app.get(
    `${partnershipTypePath}`,
    [authOptional],
    routes.api.dropdowns.partnershipType.list,
  );

  app.put(
    `${partnershipTypePath}`,
    [
      authenticate,
      authorize.cms.dropdowns.update,
      keystone.middleware.api,
      validate(validator.partnershipType.partnershipType),
    ],
    routes.api.dropdowns.partnershipType.updateMany,
  );
  app.delete(
    `${partnershipTypePath}/:id`,
    [authenticate, authorize.cms.dropdowns.delete, keystone.middleware.api],
    routes.api.dropdowns.partnershipType.remove,
  );
};
export default PartnershipType;
