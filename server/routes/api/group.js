import keystone from 'keystone';
import Group from '../../models/Group';
import { getPermissionsMapArray } from '../../utils/permissions';

export const list = (req, res) => {
  Group.model.find().sort('-createdAt').exec(async (err, groups) => res.json({
    status: 'success',
    groups: await presentData(groups),
  }));
};

export const get = (req, res) => {
  Group.model.findById(req.params.id).exec(async (err, group) => res.send({
    status: 'success',
    group: await presentData(group),
  }));
};

export const create = (req, res) => {
  // try to check for the existence of the group
  Group.model.findOne({ name: req.body.name }, (err, group) => {
    if (!group) {
      group = new Group.model();

      group.getUpdateHandler(req).process(req.body, async err => res.status(201).json({
        status: 'success',
        message: `The ${group.name} group was created successfully.`,
        group: await presentData(group),
      }));
    } else {
      return res.status(409).json({
        status: 'error',
        message: `A group named ${req.body.name} already exists.`,
      });
    }
  });
};

export const update = (req, res) => {
  // try to query for the existence of a group with the same
  // name but different id
  Group.model.findOne({ name: req.body.name, _id: { $ne: req.params.id } }).exec((err, group) => {
    if (!group) {
      Group.model.findById(req.params.id).exec((err, group) => {
        group.getUpdateHandler(req).process(req.body, async err => res.json({
          status: 'success',
          message: `The ${group.name} group was updated successfully.`,
          group: await presentData(group),
        }));
      });
    } else {
      return res.status(409).json({
        status: 'error',
        message: `A group named ${req.body.name} already exists.`,
      });
    }
  });
};

export const remove = (req, res) => {
  Group.model.findById(req.params.id).exec((err, group) => {
    // todo check that the group does not have a dependant i.e. user
    group.remove(err => res.json({
      status: 'success',
      message: `The ${group.name} group was removed successfully.`,
    }));
  });
};

// view helper methods
/**
 * Converts the group data into the format expected by the user by adding users and
 * permission mappings.
 *
 * @param groupData - A collection or an array of collections to present.
 * @returns {Promise<any>}
 */
const presentData = groupData => new Promise((resolve, reject) => {
  if (Array.isArray(groupData)) {
    // many collections
    keystone.populateRelated(groupData, 'users', (err) => {
      if (err) reject(err);
      groupData.forEach((group, i) => {
        groupData[i] = group.toObject();
        groupData[i].permissions = getPermissionsMapArray(group.permissions);
      });
      resolve(groupData);
    });
  } else {
    // one collection
    groupData.populateRelated('users', (err) => {
      if (err) reject(err);
      groupData = groupData.toObject();
      groupData.permissions = getPermissionsMapArray(groupData.permissions);
      resolve(groupData);
    });
  }
});
