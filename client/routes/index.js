/* eslint import/no-named-as-default: 0 */
import Dashboard from '../views/Dashboard';
import Group from '../views/Group';
import GroupForm from '../views/Group/GroupForm';
import GroupUpdateForm from '../views/Group/GroupUpdateView';
import Login from '../containers/Login';
import Logout from '../containers/Login/logout';
import AddReport from '../views/Resources/Report/AddReport';
import EditReport from '../views/Resources/Report/EditReport';
import ListReport from '../views/Resources/Report/ListReport';
import AddDocument from '../views/Resources/Document/AddDocument';
import EditDocument from '../views/Resources/Document/EditDocument';
import DocumentList from '../views/Resources/Document/DocumentList';
import editEmailView from '../views/Users/editEmailView';
import AddUserView, { EditUserView } from '../views/Users';
import CreateEvent from '../views/Events/AddEventView';
import ListEvents from '../views/Events/ListEventsView';
import EditEvents from '../views/Events/EditEvent';
import {
  GovernorMessage,
  AboutMMDP,
  Coordination,
  Objectives,
  EdoStateApproach,
} from '../views/About';
import PillarOneView from '../views/Pillar/pillarOne';
import PillarTwoView from '../views/Pillar/pillarTwo';
import PillarThreeView from '../views/Pillar/pillarThree';
import PillarFourView from '../views/Pillar/pillarFour';
import AddResearch from '../views/Resources/Research/AddResearch';
import UpdateResearch from '../views/Resources/Research/EditResearch';
import AddMedia from '../views/Resources/Document/AddMedia';
import ListResearch from '../views/Resources/Research/ListResearch';
import MediaListView from '../views/Resources/Media/MediaList';
import StakeholdersView from '../views/Stakeholders/stakeholderDirectory';
import AddStakeholderView from '../views/Stakeholders/addBasicInfo';
import BeneficiaryServicesView from '../views/Stakeholders/addBeneficiaryServices';
import StateView from '../views/DropDowns/State';
import FundingView from '../views/DropDowns/SourceOfFunding';
import Country from '../views/DropDowns/Country';
import RegistrationStatusView from '../views/DropDowns/RegistrationStatus';
import StaffStrengthsView from '../views/DropDowns/StaffStrength';
import CommunityView from '../views/DropDowns/Community';
import TargetAudienceView from '../views/DropDowns/TargetAudience';
import LGAView from '../views/DropDowns/LGA';
import PartnershipType from '../views/DropDowns/PartnershipType';
import BeneficiaryTypeView from '../views/DropDowns/BeneficiaryType';
import OrganizationTypeView from '../views/DropDowns/OrganizationType';
import WardView from '../views/DropDowns/Ward';
import ImpactTypeView from '../views/DropDowns/ImpactType';
import FrequencyView from '../views/DropDowns/Frequency';

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    exact: true,
    protected: true,
  },
  {
    path: '/group',
    name: 'Add Group',
    component: GroupForm,
    exact: true,
    protected: true,
    permissions: ['group'],
  },
  {
    path: '/group/edit/:id',
    name: 'Edit Group',
    component: GroupUpdateForm,
    exact: false,
    protected: true,
    permissions: ['group'],
  },
  {
    path: '/group/list',
    name: 'List Groups',
    component: Group,
    exact: false,
    protected: true,
    permissions: ['group'],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    exact: false,
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout,
    exact: false,
  },
  {
    path: '/about',
    name: 'About',
    component: GovernorMessage,
    exact: true,
    protected: true,
  },
  {
    path: '/about/governor-message',
    name: 'Governor Message',
    component: GovernorMessage,
    exact: false,
    protected: true,
  },
  {
    path: '/about/about-mmdp',
    name: 'About MMDP',
    component: AboutMMDP,
    exact: false,
    protected: true,
  },
  {
    path: '/about/coordination',
    name: 'Coordination',
    component: Coordination,
    exact: false,
    protected: true,
  },
  {
    path: '/about/edo-state-approach',
    name: 'The Edo State Approach',
    component: EdoStateApproach,
    exact: false,
    protected: true,
  },
  {
    path: '/about/objectives',
    name: 'Objectives',
    component: Objectives,
    exact: false,
    protected: true,
  },
  {
    path: '/resources/reports/add',
    name: 'Add Report',
    component: AddReport,
    exact: true,
    protected: true,
  },
  {
    path: '/resources/reports/:id/edit',
    name: 'Edit Report',
    component: EditReport,
    exact: true,
    protected: true,
  },
  {
    path: '/resources/reports',
    name: 'Reports',
    component: ListReport,
    exact: true,
    protected: true,
  },
  {
    path: '/resources/research/add',
    name: 'Add Research',
    component: AddResearch,
    protected: true,
  },
  {
    path: '/resources/document/add',
    name: 'Add Document',
    component: AddDocument,
    exact: true,
    protected: true,
  },
  {
    path: '/resources/documents',
    name: 'List Documents',
    component: DocumentList,
    exact: true,
    protected: true,
  },
  {
    path: '/create-event',
    name: 'create-event',
    component: CreateEvent,
    protected: true,
  },
  {
    path: '/list-events',
    name: 'list-events',
    component: ListEvents,
    protected: true,
  },
  {
    path: '/edit-event/:id',
    name: 'edit-event',
    component: EditEvents,
    protected: true,
  },
  {
    path: '/create-event',
    name: 'create-event',
    component: CreateEvent,
    protected: true,
  },
  {
    path: '/list-events',
    name: 'list-events',
    component: ListEvents,
    protected: true,
  },
  {
    path: '/edit-event/:id',
    name: 'edit-event',
    component: EditEvents,
    protected: true,
  },
  {
    path: '/resources/research/add',
    name: 'Add Report',
    component: AddResearch,
    exact: true,
    protected: true,
  },

  {
    path: '/resources/research/edit/:id',
    name: 'Edit Research',
    component: UpdateResearch,
    protected: true,
  },
  {
    path: '/resources/research/all',
    name: 'Research',
    component: ListResearch,
    exact: true,
    protected: true,
  },
  {
    path: '/users',
    name: 'users',
    component: AddUserView,
    exact: true,
    protected: true,
    permissions: ['user'],
  },
  {
    path: '/users/edit/:email/:username',
    name: 'edit',
    component: editEmailView,
    exact: true,
    protected: true,
    permissions: ['user'],
  },
  {
    path: '/users/all',
    name: 'confirmation',
    component: EditUserView,
    exact: true,
    protected: true,
    permissions: ['user'],
  },
  {
    path: '/pillar-1',
    name: 'PillarOne',
    component: PillarOneView,
    exact: false,
    protected: true,
  },
  {
    path: '/pillar-2',
    name: 'PillarTwo',
    component: PillarTwoView,
    exact: false,
    protected: true,
  },
  {
    path: '/pillar-3',
    name: 'PillarThree',
    component: PillarThreeView,
    exact: false,
    protected: true,
  },
  {
    path: '/pillar-4',
    name: 'PillarFour',
    component: PillarFourView,
    exact: false,
    protected: true,
  },
  {
    path: '/resources/documents/edit/:id',
    name: 'Edit resources document',
    component: EditDocument,
  },
  {
    path: '/stakeholder-directory',
    name: 'stakeholder-directory',
    component: StakeholdersView,
    exact: true,
  },
  {
    path: '/stakeholder-directory/add-basic-information',
    name: 'add-stakeholder',
    component: AddStakeholderView,
    exact: true,
  },
  {
    path: '/stakeholder-directory/add-beneficiary-services',
    name: 'add-beneficiary-services',
    component: BeneficiaryServicesView,
    exact: true,
    protected: true,
  },
  {
    path: '/resources/media/edit/:id',
    name: 'Edit resources media',
    component: EditDocument,
    exact: true,
    protected: true,
  },
  {
    path: '/resources/media/add',
    name: 'Add resources media',
    component: AddMedia,
  },
  {
    path: '/resources/media',
    name: 'List Media',
    component: MediaListView,
    exact: true,
    protected: true,
  },
  {
    path: '/dropdowns/state',
    name: 'State Dropdown',
    component: StateView,
    exact: true,
    protected: true,
  },
  {
    path: '/dropdowns/country',
    name: 'Country Dropdown',
    component: Country,
    exact: true,
    protected: true,
  },
  {
    path: '/dropdowns/registration-status',
    name: 'Registration Status Dropdown',
    component: RegistrationStatusView,
    exact: true,
    protected: true,
  },
  {
    path: '/dropdowns/staff-strength',
    name: 'Staff Strength Dropdown',
    component: StaffStrengthsView,
    exact: true,
    protected: true,
  },
  {
    path: '/dropdowns/target-audience',
    name: 'Target Audience Dropdown',
    component: TargetAudienceView,
    exact: true,
    protected: true,
  },
  {
    path: '/dropdowns/community',
    name: 'Community Dropdown',
    component: CommunityView,
    exact: true,
    protected: true,
  },
  {
    path: '/dropdowns/LGA',
    name: 'State Dropdown',
    component: LGAView,
    exact: true,
    protected: true,
  },
  {
    path: '/dropdowns/organization-type',
    name: 'OrganizationType Dropdown',
    component: OrganizationTypeView,
    exact: true,
    protected: true,
  },
  {
    path: '/dropdowns/partnership-type',
    name: 'Partnership Type',
    component: PartnershipType,
  },
  {
    path: '/dropdowns/beneficiary-type',
    name: 'Beneficiary Type Dropdown',
    component: BeneficiaryTypeView,
  },
  {
    path: '/dropdowns/funding-source',
    name: 'Funding Dropdown',
    component: FundingView,
  },
  {
    path: '/dropdowns/impact-type',
    name: 'Impact Type Dropdown',
    component: ImpactTypeView,
    exact: true,
    protected: true,
  },
  {
    path: '/dropdowns/ward',
    name: 'Ward Dropdown',
    component: WardView,
    exact: true,
    protected: true,
  },
  {
    path: '/dropdowns/partnership-type',
    name: 'Partnership Type',
    component: PartnershipType,
  },
  {
    path: '/dropdowns/beneficiary-type',
    name: 'Beneficiary Type Dropdown',
    component: BeneficiaryTypeView,
    exact: true,
    protected: true,
  },
  {
    path: '/dropdowns/frequency',
    name: 'Frequency Options',
    component: FrequencyView,
    exact: true,
    protected: true,
  },
  {
    path: '*',
    component: Dashboard,
    protected: true,
  },
];

export default routes;
