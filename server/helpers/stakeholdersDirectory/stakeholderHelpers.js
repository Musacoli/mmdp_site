import mongoose from '../../utils/secondaryMongooseConnection';
import { Stakeholder, Address, Partnerships, ImpactType } from './static';
import { filterAndPaginate, getPaginationData } from '../../utils/search';
import StakeholderModel from '../../models/resources/stakeholdersDirectory/Stakeholders';
import { addBeneficiaries } from './returneeServicesHelpers';
import {
  fetchAddresses,
  fetchBeneficiaries,
  fetchPartners,
} from './fetchFunctionality';

/** define transaction methods used in transactions */
/** add/modify transactions */
const addModifyStakeholder = async (basicInformation, options) => {
  let stakeholder;
  if (basicInformation._id) {
    stakeholder = await Stakeholder.findOneAndUpdate(
      { _id: basicInformation._id },
      basicInformation,
      options,
    );
  } else {
    await Stakeholder.findOne({
      organisationName: basicInformation.organisationName,
    })
      .session(options.session) // if a user already exists, raise an error
      .then(async (res) => {
        if (res !== null)
          throw new Error(
            `Stakeholder ${basicInformation.organisationName} already exists`,
          ); // create a new stakeholder
        stakeholder = await Stakeholder.findOneAndUpdate(
          { organisationName: basicInformation.organisationName },
          basicInformation,
          options,
        );
      })
      .catch((e) => {
        throw e;
      });
  }
  return stakeholder; // return the value of the stakeholder
};

const addStakeholderAddress = async (stakeholderID, addressData, options) => {
  // find one or create if it does not exist
  // addressData is an array with two address. iterate through it creating new entries
  const addresses = [];
  await Promise.all(
    addressData.map(async (address) => {
      const data = address;
      data.stakeholderId = stakeholderID;

      const addressQuery = await Address.findOneAndUpdate(
        {
          stakeholderId: data.stakeholderId,
          addressType: data.addressType,
        },
        data,
        options,
      );
      addresses.push(addressQuery);
    }),
  );
  return addresses;
};

const partnershipQuery = (data) => ({
  $and: [
    {
      $or: [
        { stakeholder1Id: data.stakeholder1Id },
        { stakeholder1Id: data.stakeholder2Id },
      ],
    },
    {
      $or: [
        { stakeholder2Id: data.stakeholder1Id },
        { stakeholder2Id: data.stakeholder2Id },
      ],
    },
  ],
});

const addPartnerships = async (stakeholderID, partnerships = [], options) => {
  const addedPartnerships = [];
  await Promise.all(
    partnerships.map(async (partner) => {
      const data = partner;
      data.stakeholder1Id = stakeholderID;
      const partnership = await Partnerships.findOneAndUpdate(
        partnershipQuery(data),
        partner,
        options,
      );
      addedPartnerships.push(partnership);
    }),
  );

  return addedPartnerships;
};

export const handleCreateUpdateTransaction = async (
  basicInformation,
  address = [],
  partnerships = [],
  beneficiaries = [],
) => {
  // this is a function to handle a single stakeholderTransaction
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    /** new: bool - true to return the modified document rather than the original. defaults to false ; upsert: bool - creates the object if it doesn't exist. defaults to false. */
    const opts = { session, new: true, upsert: true }; // cary out the various transactions
    const stakeholder = await addModifyStakeholder(basicInformation, opts);
    await addStakeholderAddress(stakeholder._id, address, opts);
    await addPartnerships(stakeholder._id, partnerships, opts);
    await addBeneficiaries(stakeholder._id, beneficiaries, opts);
    await session.commitTransaction();
    session.endSession();
    await fetchBeneficiaries([stakeholder], opts);
    await fetchPartners([stakeholder], opts);
    await fetchAddresses([stakeholder], opts);
    return { stakeholder };
  } catch (e) {
    if (!session.hasEnded) {
      session.endSession();
    }
    throw e;
  }
};

export const handleFetchTransaction = async (req, res) => {
  try {
    filterAndPaginate(StakeholderModel, req)
      .populate('organisationTypeId')
      .populate({ path: 'impactTypeID', model: ImpactType })
      .populate('registrationStatusId')
      .populate('staffStrengthRangeId')
      .exec(async (err, data) => {
        if (err) return res.apiError('Database Error', { err });
        await fetchBeneficiaries(data.results);
        await fetchPartners(data.results);
        await fetchAddresses(data.results);

        return res.apiResponse({
          data: data.results,
          pagination: getPaginationData(data),
        });
      });
  } catch (e) {
    res.apiError(e);
  }
};
