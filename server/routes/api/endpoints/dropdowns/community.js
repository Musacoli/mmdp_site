import keystone from 'keystone';
import validate from 'express-validation';
import validator from '../../../../validation';
import authorize from '../../../../middleware/authorize';
import authenticate, {
  authOptional,
} from '../../../../middleware/authenticate';

export const baseUrl = '/api/v1';

const communityDropdownPath = `${baseUrl}/community`;

const Community = (app, routes) => {
  /* -------- Community Resources  ---------- */
  app.post(
    `${communityDropdownPath}`,
    [
      authenticate,
      authorize.cms.dropdowns.create,
      validate(validator.community.addCommunity),
    ],
    routes.api.dropdowns.communities.create,
  );
  app.get(
    `${communityDropdownPath}`,
    [authOptional],
    routes.api.dropdowns.communities.list,
  );
  app.get(
    `${communityDropdownPath}/:ward_Id`,
    [authOptional],
    routes.api.dropdowns.communities.list,
  );
  app.delete(
    `${communityDropdownPath}/:id`,
    [authenticate, authorize.cms.dropdowns.delete, keystone.middleware.api],
    routes.api.dropdowns.communities.remove,
  );
  app.put(
    `${communityDropdownPath}`,
    [
      authenticate,
      authorize.cms.dropdowns.update,
      validate(validator.community.addCommunity),
    ],
    routes.api.dropdowns.communities.updateMany,
  );
  app.put(
    `${communityDropdownPath}/:id`,
    [authenticate, authorize.cms.dropdowns.update],
    routes.api.dropdowns.communities.update,
  );
  /* -------- End Community Resources  ---------- */
};
export default Community;
