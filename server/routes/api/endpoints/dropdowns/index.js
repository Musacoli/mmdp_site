import keystone from 'keystone';
import errorHandler from '../../../../middleware/errorHandler';
import authorize from '../../../../middleware/authorize';
import authenticate, {
  authOptional,
} from '../../../../middleware/authenticate';
import LGA from './LGA';
import Country from './country';
import State from './state';
import ThematicPillars from './thematicPillars';
import PartnershipType from './partnershipType';
import RegistrationStatus from './registrationStatus';
import StaffStrength from './staffStrength';
import BeneficiaryType from './beneficiaryType';
import SourceOfFunding from './sourceOfFunding';
import OrganizationType from './organizationType';
import Community from './community';
import Ward from './ward';
import TargetAudience from './targetAudience';
import ImpactType from './impactType';
import Frequency from './frequency';
import SubTheme from './subTheme';
import AmountInvested from './amountInvested';
import FocusArea from './focusArea';

export const baseUrl = '/api/v1';

const truncatePath = `${baseUrl}/truncate`;
const listDropdownsPath = `${baseUrl}/dropdowns-list`;

const Dropdowns = (app, routes) => {
  // register all dropdown endpoints
  LGA(app, routes);
  Country(app, routes);
  State(app, routes);
  ThematicPillars(app, routes);
  PartnershipType(app, routes);
  RegistrationStatus(app, routes);
  StaffStrength(app, routes);
  BeneficiaryType(app, routes);
  SourceOfFunding(app, routes);
  OrganizationType(app, routes);
  Community(app, routes);
  Ward(app, routes);
  TargetAudience(app, routes);
  ImpactType(app, routes);
  Frequency(app, routes);
  SubTheme(app, routes);
  AmountInvested(app, routes);
  FocusArea(app, routes);

  // remove all collections
  app.delete(
    `${truncatePath}/:name`,
    [authenticate, authorize.cms.dropdowns.delete, keystone.middleware.api],
    routes.api.dropdowns.truncateCollection.remove,
  );

  // manage dropdowns
  app.get(
    `${listDropdownsPath}`,
    [authOptional],
    routes.api.dropdowns.manageDropdowns.list,
  );

  app.use(errorHandler);
};

export default Dropdowns;
