import { all, fork } from 'redux-saga/effects';
import loginSagaWatcher from './login/loginsaga';
import {
  watchFetchingGroups,
  watchFetchingGroup,
  watchCreateGroup,
  watchUpdateGroup,
  watchDeleteGroup,
} from './group';
import { watchReport } from './resources/report';
import { addUserResearchWatcher } from './resources/research';
import {
  getUserResearchWatcher,
  deleteUserResearchWatcher,
  archiveUserResearchWatcher,
} from './resources/getResearch';
import { watchFetchingPermissions } from './permission';
import * as aboutWatcher from './about';
import { watchRegistration, watchUserEdit } from './users/AddUsersSaga';
import { watchDeleteUser } from './users/deleteUser';
import { watchFetchingUsers } from './users/fetchUsers';
import { watchFetchingOneUser } from './users/fetchOneUser';
import { watchAddEventWatcher } from './events/addEventSaga';
import { watcherListEvent } from './events/listEventsSaga';
import { singleEventWatcher } from './events/singleEventSaga';
import { updateEventWatcher } from './events/editEventSaga';
import { archiveEventWatcher } from './events/archiveEvents';
import { watcherDeleteEvent } from './events/deleteEventSaga';
import { watchArchive } from './resources/archive';
import { watchDelete } from './resources/deleteDocument';
import * as pillarWatcher from './pillar/pillarMiddleware';
import {
  watchAddDocument,
  watchFetchDocument,
  watchEditDocument,
  watchFetchDocuments,
} from './resources/document';
import { watchDeleteMedia } from './resources/media';
import { AddStakeholderWatcher } from './stakeholders/addStakeholder';
import {
  watchFetchCountry,
  watchAddCountries,
  watchDeleteCountry,
} from './dropdowns/country';
import {
  watchAddStates,
  watchFetchStates,
  watchDeleteStates,
} from './dropdowns/state';
import {
  getAllwatcher,
  updateLGAWatcher,
  deleteLGAwatcher,
  addLGAWatcher,
} from './dropdowns/LGA';

import {
  watchAddWards,
  watchFetchWards,
  watchDeleteWards,
} from './dropdowns/ward';

import {
  watchAddStatuses,
  watchFetchStatuses,
  watchDeleteStatuses,
} from './dropdowns/status';
import {
  watchUpdateStaffStrengths,
  watchCreateStaffStrengths,
  watchDeleteStaffStrength,
  watchFetchingStaffStrengths,
} from './dropdowns/staffStrength';
import {
  watchAddPartnershipTypes,
  watchFetchPartnershipTypes,
  watchDeletePartnershipTypes,
} from './dropdowns/partnershipType';
import {
  watchAddTypes,
  watchFetchTypes,
  watchDeleteTypes,
  watchUpdateTypes,
} from './dropdowns/beneficiaryTypes';

import {
  watchAddFunding,
  watchFetchFunding,
  watchDeleteFunding,
} from './dropdowns/funding';
import {
  watchAddImpactType,
  watchFetchImpactTypes,
  watchDeleteImpactType,
} from './dropdowns/impactTypes';

import {
  getOrganizationTypewatcher,
  deleteOrganizationTypewatcher,
  updateOrganizationTypeWatcher,
  addOrganizationTypeWatcher,
} from './dropdowns/organizationType';
import {
  watchAddCommunities,
  watchFetchCommunities,
  watchDeleteCommunity,
} from './dropdowns/communities';

import {
  watchCreateTargetAudiences,
  watchFetchingTargetAudiences,
  watchDeleteTargetAudience,
  watchUpdateTargetAudiences,
} from './dropdowns/targetAudience';

import {
  watchAddFrequency,
  watchFetchFrequency,
  watchDeleteFrequency,
} from './dropdowns/frequency';

export default function* root() {
  yield all([
    fork(watchFetchingGroups),
    fork(watchFetchingPermissions),
    fork(watchCreateGroup),
    fork(watchFetchingGroup),
    fork(watchUpdateGroup),
    fork(watchDeleteGroup),
    fork(loginSagaWatcher),
    fork(aboutWatcher.createGovernorMessageWatcher),
    fork(aboutWatcher.updateGovernorMessageWatcher),
    fork(aboutWatcher.getGovernorMessageWatcher),
    fork(aboutWatcher.createAboutMMDPWatcher),
    fork(aboutWatcher.updateAboutMMDPWatcher),
    fork(aboutWatcher.getAboutMMDPWatcher),
    fork(aboutWatcher.createCoordinationWatcher),
    fork(aboutWatcher.updateCoordinationWatcher),
    fork(aboutWatcher.getCoordinationWatcher),
    fork(aboutWatcher.createEdoStateApproachWatcher),
    fork(aboutWatcher.updateEdoStateApproachWatcher),
    fork(aboutWatcher.getEdoStateApproachWatcher),
    fork(aboutWatcher.createObjectivesWatcher),
    fork(aboutWatcher.updateObjectivesWatcher),
    fork(aboutWatcher.getObjectivesWatcher),
    fork(watchReport),
    fork(watchFetchDocuments),
    fork(watchRegistration),
    fork(watchUserEdit),
    fork(watchFetchingUsers),
    fork(watchDeleteUser),
    fork(watchFetchingOneUser),
    fork(watchAddEventWatcher),
    fork(watcherListEvent),
    fork(singleEventWatcher),
    fork(updateEventWatcher),
    fork(archiveEventWatcher),
    fork(watcherDeleteEvent),
    fork(addUserResearchWatcher),
    fork(pillarWatcher.createPillarWatcher1),
    fork(pillarWatcher.createPillarWatcher2),
    fork(pillarWatcher.createPillarWatcher3),
    fork(pillarWatcher.createPillarWatcher4),

    fork(pillarWatcher.getPillarWatcher1),
    fork(pillarWatcher.getPillarWatcher2),
    fork(pillarWatcher.getPillarWatcher3),
    fork(pillarWatcher.getPillarWatcher4),

    fork(pillarWatcher.updatePillarWatcher1),
    fork(pillarWatcher.updatePillarWatcher2),
    fork(pillarWatcher.updatePillarWatcher3),
    fork(pillarWatcher.updatePillarWatcher4),
    fork(watchAddDocument),
    fork(watchFetchDocument),
    fork(watchEditDocument),
    fork(watchArchive),
    fork(watchDelete),
    fork(getUserResearchWatcher),
    fork(deleteUserResearchWatcher),
    fork(archiveUserResearchWatcher),
    fork(watchDeleteMedia),

    fork(AddStakeholderWatcher),
    fork(watchAddStates),
    fork(watchFetchStates),
    fork(watchDeleteStates),

    fork(watchAddWards),
    fork(watchFetchWards),
    fork(watchDeleteWards),
    fork(watchFetchCountry),
    fork(watchAddCountries),
    fork(watchDeleteCountry),

    fork(watchAddStatuses),
    fork(watchFetchStatuses),
    fork(watchDeleteStatuses),
    fork(watchFetchingStaffStrengths),
    fork(watchDeleteStaffStrength),
    fork(watchUpdateStaffStrengths),
    fork(watchCreateStaffStrengths),

    fork(watchFetchingTargetAudiences),
    fork(watchCreateTargetAudiences),
    fork(watchDeleteTargetAudience),
    fork(watchUpdateTargetAudiences),

    fork(watchFetchCommunities),
    fork(watchAddCommunities),
    fork(watchDeleteCommunity),

    fork(getAllwatcher),
    fork(deleteLGAwatcher),
    fork(updateLGAWatcher),
    fork(addLGAWatcher),

    fork(watchAddPartnershipTypes),
    fork(watchFetchPartnershipTypes),
    fork(watchDeletePartnershipTypes),

    fork(watchAddTypes),
    fork(watchFetchTypes),
    fork(watchDeleteTypes),
    fork(watchUpdateTypes),

    fork(watchAddFunding),
    fork(watchFetchFunding),
    fork(watchDeleteFunding),

    fork(getOrganizationTypewatcher),
    fork(deleteOrganizationTypewatcher),
    fork(updateOrganizationTypeWatcher),
    fork(addOrganizationTypeWatcher),

    fork(watchAddImpactType),
    fork(watchFetchImpactTypes),
    fork(watchDeleteImpactType),

    fork(watchAddFrequency),
    fork(watchFetchFrequency),
    fork(watchDeleteFrequency),
  ]);
}
