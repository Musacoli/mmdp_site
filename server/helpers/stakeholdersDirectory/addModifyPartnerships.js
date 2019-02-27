import _ from 'lodash';
import PartnershipsModel from '../../models/resources/stakeholdersDirectory/StakeholderPartnership';
import { deleteEntry, listAllEntries } from './editReturneeServiceHelpers';

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
export const addModifyPartnerships = async (
  stakeholderID,
  partnerships = [],
  options,
) => {
  const addedPartnerships = [];
  await Promise.all(
    partnerships.map(async (partner) => {
      const data = partner;
      data.stakeholder1Id = stakeholderID;
      // make sure a stakeholder is not a partner to themself
      if (data.stakeholder1Id !== data.stakeholder2Id) {
        await PartnershipsModel.model
          .findOneAndUpdate(partnershipQuery(data), partner, options)
          .exec((err, doc) => {
            if (err) {
              throw err;
            } else addedPartnerships.push(doc);
          });
      }
    }),
  ).catch((e) => {
    throw e;
  });
  return addedPartnerships;
};

export const editPartnerships = async (stakeholderId, partnerships) => {
  const currentPartnerships = await listAllEntries(
    PartnershipsModel,
    {
      $or: [
        { stakeholder1Id: stakeholderId },
        { stakeholder2Id: stakeholderId },
      ],
    },
    ['stakeholder1Id', 'stakeholder2Id', 'partnershipTypeId'],
  );
  const newPartnerships = [];
  const deletedPartnerships = [];
  // identify newly added of removed partnerships
  _.forEach(partnerships, (partner) => {
    const inCurrent1 = _.find(currentPartnerships, {
      stakeholder2Id: partner.stakeholder2Id,
    });
    const inCurrent12 = _.find(currentPartnerships, {
      stakeholder1Id: partner.stakeholder2Id,
    });
    if (inCurrent1 === undefined && inCurrent12 === undefined) {
      newPartnerships.push(partner);
    }
  });
  _.forEach(currentPartnerships, (partner) => {
    const inUpdate1 = _.find(partnerships, {
      stakeholder2Id: partner.stakeholder2Id,
    });
    const inUpdate2 = _.find(partnerships, {
      stakeholder2Id: partner.stakeholder1Id,
    });
    if (inUpdate1 === undefined && inUpdate2 === undefined) {
      deletedPartnerships.push(partner.id);
    }
  });
  // now commit the delete and add transaction to the DB
  await Promise.all(
    deletedPartnerships.map((partner) =>
      deleteEntry(PartnershipsModel, { _id: partner }),
    ),
  ).catch((e) => {
    throw e;
  });
  // add new entries
  await addModifyPartnerships(stakeholderId, newPartnerships, {
    upsert: true,
  }).catch((e) => {
    throw e;
  });
};
