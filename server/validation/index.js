import login from './auth/login';
import { resetPassword, changePassword } from './auth';
import report from './resources/report';
import research from './resources/research';
import document from './resources/document';
import media from './resources/media';
import state from './dropdowns/state';
import ward from './dropdowns/ward';
import status from './dropdowns/status';
import community from './dropdowns/communities';
import partnershipType from './dropdowns/partnershipType';
import targetAudience from './dropdowns/targetAudience';
import LGA from './dropdowns/LGA';
import staffStrength from './dropdowns/staffStrength';
import beneficiaryType from './dropdowns/beneficiaryType';
import funding from './dropdowns/funding';
import organizationTypes from './dropdowns/organizationDropdown';
import country from './dropdowns/country';
import frequency from './dropdowns/frequency';
import thematicPillars from './dropdowns/thematicPillars';
import amountInvested from './dropdowns/amountInvested';
import subTheme from './dropdowns/subTheme';
import focusArea from './dropdowns/focusArea';

export default {
  login,
  resetPassword,
  changePassword,
  report,
  research,
  document,
  media,
  state,
  ward,
  status,
  staffStrength,
  community,
  partnershipType,
  targetAudience,
  LGA,
  beneficiaryType,
  funding,
  organizationTypes,
  country,
  frequency,
  thematicPillars,
  amountInvested,
  subTheme,
  focusArea,
};
