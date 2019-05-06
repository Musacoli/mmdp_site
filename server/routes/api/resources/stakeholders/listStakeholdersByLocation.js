import _ from 'lodash';
import keystone from 'keystone';
import {
  fetchAddresses,
  fetchBeneficiaries,
  fetchPartners,
} from '../../../../helpers/stakeholdersDirectory/fetchFunctionality';

const searchAliases = {
  communityId: 'community',
  countryId: 'country',
  stateId: 'state',
  lgaId: 'lga',
};
const BeneficiaryServiceCommunityModel = keystone.list(
  'BeneficiaryServiceCommunity',
);
const ReturneeServices = keystone.list('ReturneeService');

const getBeneficiaryServicesCount = async (uniqueBeneficaries, query) => {
  const obj = [];
  // await all promises that search for individual beneficiaries based on the location parameter provided
  await Promise.all(
    uniqueBeneficaries.map((beneficiary) => {
      // create a copy of the original query
      const modifiedQuery = _.cloneDeep(query);
      // updated the copy of the query with the current beneficiary information
      modifiedQuery.beneficiaryServiceId = beneficiary;
      return BeneficiaryServiceCommunityModel.model
        .find(modifiedQuery)
        .lean()
        .distinct('beneficiaryServiceId')
        .then((result) => {
          // resolve the reusults containing distinct beneficiary services
          if (result !== null) {
            obj.push(...result);
          }
        });
    }),
  );
  return obj.length;
};

const getFocusAreasCount = async (uniqueBeneficaries) => {
  let count = 0;
  await ReturneeServices.model
    .find({
      _id: {
        $in: uniqueBeneficaries,
      },
    })
    .distinct('focusArea')
    .then((docs) => {
      count = docs.length;
    });

  return count;
};

const getModel = (alias, value) => {
  let query;
  let model;
  switch (alias) {
    case 'community':
      query = { communityName: value };
      model = keystone.list('Community');
      return { query, model, alias };
    case 'country':
      query = { countryName: value };
      model = keystone.list('Country');
      return { query, model, alias };
    case 'lga':
      query = { lgaName: value };
      model = keystone.list('LGA');
      return { query, model, alias };
    case 'state':
      query = { stateName: value };
      model = keystone.list('State');
      return { query, model, alias };
    default:
      throw new Error('The search query provided is not valid');
  }
};

const getFilterId = async (params) => {
  const Model = params.model;
  const query = params.query;
  let resposeId = {};
  await Model.model
    .findOne(query)
    .then((docs) => {
      if (docs === null) {
        throw new Error(
          `There are no results for the ${params.alias} provided`,
        );
      } else {
        resposeId = docs._id;
      }
    })
    .catch((e) => {
      throw e;
    });
  return resposeId;
};

const getSearchQuery = (searchAliases, alias, paramId) => {
  let queryKey = '';
  Object.keys(searchAliases).forEach((key) => {
    if (searchAliases[key] === alias) {
      queryKey = key;
    }
  });
  const query = {};
  query[queryKey] = paramId;
  return query;
};

const searchBeneficiaryServiceCommunity = async (query) => {
  let results = [];
  const Model = keystone.list('BeneficiaryServiceCommunity');
  let uniqueBeneficiaryServices = [];

  // get all distinct entries in the table
  await Model.model
    .find(query)
    .distinct('beneficiaryServiceId')
    .then((docs) => {
      uniqueBeneficiaryServices = docs;
    })
    .catch((e) => {
      throw e;
    });
  // get all distinct stakeholders associated with the distinct beneficiary services
  const totalNumberOfBeneficiaryServices = await getBeneficiaryServicesCount(
    uniqueBeneficiaryServices,
    query,
  );
  const totalNumberOfFocusAreas = await getFocusAreasCount(
    uniqueBeneficiaryServices,
  );

  await ReturneeServices.model
    .find({
      _id: { $in: uniqueBeneficiaryServices },
    })
    .populate('stakeholderId')
    .distinct('stakeholderId')
    .then((docs) => {
      results = docs;
    });
  return { results, totalNumberOfBeneficiaryServices, totalNumberOfFocusAreas };
};

export const list = async (req, res) => {
  const params = req.query;
  const keys = Object.keys(params);
  const alias = keys[0];
  const value = params[alias];

  try {
    const queryParams = getModel(alias, value);
    const paramId = await getFilterId(queryParams);
    const query = getSearchQuery(searchAliases, alias, paramId);
    const searchResults = await searchBeneficiaryServiceCommunity(query);
    const results = searchResults.results;
    const stakeholderCount = results.length;
    const beneficiaryServicesCount =
      searchResults.totalNumberOfBeneficiaryServices;
    const focusAreasCount = searchResults.totalNumberOfFocusAreas;

    const stakeholderModel = keystone.list('Stakeholder');
    const data = [];
    await Promise.all(
      results.map((result) =>
        stakeholderModel.model.find({ _id: result }).then(async (docs) => {
          await fetchBeneficiaries(docs);
          await fetchPartners(docs);
          await fetchAddresses(docs);
          data.push(...docs);
        }),
      ),
    ).catch((e) => {
      throw e;
    });
    return res.status(200).send({
      message: 'stakeholders succesfully fetched',
      stakeholderCount,
      beneficiaryServicesCount,
      focusAreasCount,
      data,
    });
  } catch (e) {
    return res.status(500).send({ error: e.message });
  }
};
