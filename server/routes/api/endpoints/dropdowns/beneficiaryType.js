import keystone from 'keystone';
import validate from 'express-validation';
import validator from '../../../../validation';
import authorize from '../../../../middleware/authorize';
import authenticate, {
  authOptional,
} from '../../../../middleware/authenticate';

export const baseUrl = '/api/v1';

const beneficiaryTypePath = `${baseUrl}/beneficiary-type`;

const BeneficiaryType = (app, routes) => {
  app.post(
    `${beneficiaryTypePath}`,
    [
      authenticate,
      authorize.cms.dropdowns.create,
      validate(validator.beneficiaryType.addBeneficiaryType),
    ],
    routes.api.dropdowns.beneficiaryType.create,
  );

  app.get(
    `${beneficiaryTypePath}`,
    [authOptional],
    routes.api.dropdowns.beneficiaryType.list,
  );

  app.put(
    `${beneficiaryTypePath}`,
    [
      authenticate,
      authorize.cms.dropdowns.update,
      keystone.middleware.api,
      validate(validator.beneficiaryType.addBeneficiaryType),
    ],
    routes.api.dropdowns.beneficiaryType.updateMany,
  );
  app.put(
    `${beneficiaryTypePath}/:id`,
    [
      authenticate,
      authorize.cms.dropdowns.update,
      keystone.middleware.api,
      validate(validator.beneficiaryType.addBeneficiaryType),
    ],
    routes.api.dropdowns.beneficiaryType.update,
  );
  app.delete(
    `${beneficiaryTypePath}/:id`,
    [authenticate, authorize.cms.dropdowns.delete, keystone.middleware.api],
    routes.api.dropdowns.beneficiaryType.remove,
  );
};
export default BeneficiaryType;
