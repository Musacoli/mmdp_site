import { server } from './keys';
import { formatObjectToParams } from './helpers';

const apiVersion = 'api/v1/';
const documentsApiPrefix = `${apiVersion}resources/repository/document`;
const mediaApiPrefix = `${apiVersion}resources/repository/media`;
const stateApiPrefix = `${apiVersion}state`;
const wardApiPrefix = `${apiVersion}ward`;
const regStatusApiPrefix = `${apiVersion}registration-status`;
const countryApiPrefix = `${apiVersion}country`;
const partnershipTypeApiPrefix = `${apiVersion}partnership-type`;
const beneficiaryTypeApiPrefix = `${apiVersion}beneficiary-type`;
const sourceOfFundingPrefix = `${apiVersion}funding-source`;
const impactTypePrefix = `${apiVersion}impact-type`;
const communityApiPrefix = `${apiVersion}community`;
const frequencyApiPrefix = `${apiVersion}frequency`;
const amountInvestedPrefix = `${apiVersion}amount-invested`;
const subThemeApiPrefix = `${apiVersion}sub-theme`;
const focusAreaPrefix = `${apiVersion}focus-area`;
const truncateApiPrefix = `${apiVersion}truncate`;
const manageDropdownsPrefix = `${apiVersion}dropdowns-list`;

// mock server
const thematicPillarsApiPrefix = `${apiVersion}thematic-pillars`;

export const api = {
  group: {
    create: (data) => server.post('api/groups/', data),
    list: (payload) => {
      if (payload) {
        const { page, search } = payload;
        return server.get(
          `api/groups?${formatObjectToParams({
            page,
            name: search,
          })}`,
        );
      }
      return server.get('api/groups');
    },
    edit: (id, data) => server.put(`api/groups/${id}/`, data),
    delete: (id) => server.delete(`api/groups/${id}/`),
    retrieve: (id) => server.get(`api/groups/${id}/`),
  },
  permission: {
    list: () => server.get('api/permissions'),
  },
  users: {
    create: (data) => server.post('api/v1/users', data),
    edit: (data) => server.put('api/v1/users/', data),
    list: ({ page, search, selectedOption }) =>
      server.get(
        `api/v1/users?${formatObjectToParams({
          page,
          groups: selectedOption,
          username: search,
        })}`,
      ),
    getOne: (username) => server.get(`api/v1/users/${username}`),
    delete: (data) => server.delete(`api/v1/users/${data}`),
  },
  resources: {
    document: {
      create: (data) => server.post(documentsApiPrefix, data),
      update: (data, id) => server.put(`${documentsApiPrefix}/${id.id}`, data),
      retrieve: (id) => server.get(`${documentsApiPrefix}/${id}/`),
      list: ({ page, search }) =>
        server.get(
          `${documentsApiPrefix}?${formatObjectToParams({
            page,
            title: search,
          })}`,
        ),
      archive: (id) =>
        server.patch(`api/v1/resources/repository/document/${id}/archive`),
      delete: (id) =>
        server.delete(`api/v1/resources/repository/document/${id}`),
    },
    media: {
      create: (data) => server.post(mediaApiPrefix, data),
      update: (data, id) => server.put(`${mediaApiPrefix}/${id.id}`, data),
      retrieve: (id) => server.get(`${mediaApiPrefix}/${id}/`),
      list: () => server.get(mediaApiPrefix),
      delete: (id) => server.delete(`${mediaApiPrefix}/${id}`),
    },
  },
  dropdowns: {
    state: {
      create: (data) => server.post(stateApiPrefix, data),
      list: (data) => server.get(stateApiPrefix, data),
      get: (id) => server.get(`${stateApiPrefix}/${id}`),
      update: (data) => server.put(`${stateApiPrefix}`, data),
      delete: (id) => server.delete(`${stateApiPrefix}/${id}`),
    },
    ward: {
      create: (data) => server.post(wardApiPrefix, data),
      list: (data) => server.get(wardApiPrefix, data),
      update: (data) => server.put(`${wardApiPrefix}`, data),
      delete: (id) => server.delete(`${wardApiPrefix}/${id}`),
    },
    regStatus: {
      create: (data) => server.post(regStatusApiPrefix, data),
      list: (data) => server.get(regStatusApiPrefix, data),
      update: (data) => server.put(`${regStatusApiPrefix}`, data),
      delete: (id) => server.delete(`${regStatusApiPrefix}/${id}`),
    },
    beneficiaryType: {
      create: (data) => server.post(beneficiaryTypeApiPrefix, data),
      list: (data) => server.get(beneficiaryTypeApiPrefix, data),
      update: (data) => server.put(`${beneficiaryTypeApiPrefix}`, data),
      delete: (id) => server.delete(`${beneficiaryTypeApiPrefix}/${id}`),
    },

    community: {
      create: (data) => server.post(communityApiPrefix, data),
      list: (data) => server.get(`${communityApiPrefix}`, data),
      update: (data) => server.put(`${communityApiPrefix}`, data),
      delete: (id) => server.delete(`${communityApiPrefix}/${id}`),
    },
    country: {
      list: () => server.get(`${countryApiPrefix}`),
      create: (data) => server.post(countryApiPrefix, data),
      update: (data) => server.put(`${countryApiPrefix}`, data),
      delete: (id) => server.delete(`${countryApiPrefix}/${id}`),
    },
    staffStrength: {
      create: (data) =>
        server.post(`${apiVersion}dropdowns/staff-strength/create`, data),
      list: () => server.get(`${apiVersion}dropdowns/staff-strength`),
      update: (data) =>
        server.put(`${apiVersion}dropdowns/staff-strength/update`, data),
      get: (id) => server.get(`${apiVersion}dropdowns/staff-strength/${id}`),
      delete: (id) =>
        server.delete(`${apiVersion}dropdowns/staff-strength/${id}/remove`),
    },

    partnershipType: {
      create: (data) => server.post(partnershipTypeApiPrefix, data),
      list: (data) => server.get(partnershipTypeApiPrefix, data),
      update: (data) => server.put(`${partnershipTypeApiPrefix}`, data),
      delete: (id) => server.delete(`${partnershipTypeApiPrefix}/${id}`),
    },

    funding: {
      create: (data) => server.post(sourceOfFundingPrefix, data),
      list: (data) => server.get(sourceOfFundingPrefix, data),
      update: (data) => server.put(`${sourceOfFundingPrefix}`, data),
      delete: (id) => server.delete(`${sourceOfFundingPrefix}/${id}`),
    },
    organizationType: {
      create: (data) => server.post(`${apiVersion}organizationTypes`, data),
      list: () => server.get(`${apiVersion}organizationTypes`),
      update: (data) => server.put(`${apiVersion}organizationTypes`, data),
      delete: (id) => server.delete(`${apiVersion}organizationTypes/${id}`),
    },
    targetAudience: {
      create: (data) =>
        server.post(`${apiVersion}dropdowns/target-audience/create`, data),
      list: () => server.get(`${apiVersion}dropdowns/target-audience`),
      update: (data) =>
        server.put(`${apiVersion}dropdowns/target-audience/update`, data),
      get: (id) => server.get(`${apiVersion}dropdowns/target-audience/${id}`),
      delete: (id) =>
        server.delete(`${apiVersion}dropdowns/target-audience/${id}/remove`),
    },
    impactType: {
      create: (data) => server.post(impactTypePrefix, data),
      list: (data) => server.get(impactTypePrefix, data),
      update: (data) => server.put(`${impactTypePrefix}`, data),
      delete: (id) => server.delete(`${impactTypePrefix}/${id}`),
    },
    frequency: {
      create: (data) => server.post(frequencyApiPrefix, data),
      list: (data) => server.get(frequencyApiPrefix, data),
      update: (data) => server.put(`${frequencyApiPrefix}`, data),
      delete: (id) => server.delete(`${frequencyApiPrefix}/${id}`),
    },
    thematicPillars: {
      create: (data) => server.post(thematicPillarsApiPrefix, data),
      list: (data) => server.get(thematicPillarsApiPrefix, data),
      update: (data) => server.put(`${thematicPillarsApiPrefix}`, data),
      delete: (id) => server.delete(`${thematicPillarsApiPrefix}/${id}`),
    },
    amountInvested: {
      create: (data) => server.post(amountInvestedPrefix, data),
      list: (data) => server.get(amountInvestedPrefix, data),
      update: (data) => server.put(`${amountInvestedPrefix}`, data),
      delete: (id) => server.delete(`${amountInvestedPrefix}/${id}`),
    },
    subTheme: {
      create: (data) => server.post(subThemeApiPrefix, data),
      list: (data) => server.get(subThemeApiPrefix, data),
      update: (data) => server.put(`${subThemeApiPrefix}`, data),
      delete: (id) => server.delete(`${subThemeApiPrefix}/${id}`),
    },
    focusArea: {
      create: (data) => server.post(focusAreaPrefix, data),
      list: (data) => server.get(focusAreaPrefix, data),
      update: (data) => server.put(`${focusAreaPrefix}`, data),
      delete: (id) => server.delete(`${focusAreaPrefix}/${id}`),
    },
    manageDropdowns: {
      list: (data) => server.get(manageDropdownsPrefix, data),
    },
  },
  manageDropdowns: {
    truncate: {
      delete: (id) => server.delete(`${truncateApiPrefix}/${id}`),
    },
    localGovernmentArea: {
      create: (data) => server.post('/api/v1/dropdowns/LGA', data),
      list: () => server.get(`/api/v1/dropdowns/LGA`),
      get: (stateId) => server.get(`/api/v1/dropdowns/LGA/${stateId}`),
      edit: (data) => server.put(`/api/v1/dropdowns/LGA`, data),
      delete: (id) => server.delete(`/api/v1/dropdowns/LGA/${id}`),
    },
  },
  stakeholdersDirectory: {
    create: (data) => server.post('/api/v1/stakeholders-directory', data),
    delete: (id) => server.delete(`/api/v1/stakeholders-directory/${id}`),
    edit: (id, data) =>
      server.put(`/api/v1/stakeholders-directory/${id}`, data),
  },
};
