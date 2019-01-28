import keystone from "keystone";
import Group from '../../models/Group';
import {getPermissionsMapArray} from "../../utils/permissions";

export const list = (req, res) => {
  Group.model.find().sort('-createdAt').exec(async (err, groups) => {
    return res.json({
      status: "success",
      groups: await presentData(groups)
    })
  });
};

export const get = async (req, res) => {
  return res.send({
    status: "success",
    group: await presentData(req.group),
  });
};

export const create = (req, res) => {
  // try to check for the existence of the group
  Group.model.findOne({name: req.body.name}, (err, group) => {
    if (!group) {
      group = new Group.model();

      group.getUpdateHandler(req).process(req.body, async (err) => {
        return res.status(201).json({
          status: "success",
          message: `The ${group.name} group was created successfully.`,
          group: await presentData(group),
        });
      });
    } else {
      return res.status(409).json({
        status: "error",
        message: `A group named ${req.body.name} already exists.`,
      })
    }
  });
};

export const update = (req, res) => {
  // try to query for the existence of a group with the same
  // name but different id
  Group.model.findOne({name: req.body.name, _id: {$ne: req.params.id}}).exec((err, existingGroup) => {
    if (!existingGroup) {
      const group = req.group;
      let updates;
      const {name, permissions} = req.body;
      if (name) {
        group.name = name;
      }
      if (permissions) {
        group.permissions = permissions;
      }
      group.save(async (err) => {
        return res.json({
          status: "success",
          message: `The ${group.name} group was updated successfully.`,
          group: await presentData(group),
        });
      });
    } else {
      return res.status(409).json({
        status: "error",
        message: `A group named ${req.body.name} already exists.`,
      })
    }
  });
};

export const remove = async (req, res) => {
  const group = req.group;
  const groupData = await presentData(group);
  if (groupData.users && groupData.users.length) {
    return res.status(400).json({
      status: "error",
      message: 'The group cannot be deleted as there are users that belong to it.'
    });
  }
  group.remove((err) => {
    return res.json({
      status: "success",
      message: `The ${group.name} group was removed successfully.`
    });
  })
};

// view helper methods
/**
 * Converts the group data into the format expected by the user by adding users and
 * permission mappings.
 *
 * @param groupData - A collection or an array of collections to present.
 * @returns {Promise<any>}
 */
const presentData = (groupData) => new Promise((resolve, reject) => {
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
