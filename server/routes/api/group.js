import keystone from 'keystone';
import Group from '../../models/Group';
import { getPermissionsMapArray } from '../../utils/permissions';
import { filterAndPaginate, getPaginationData } from '../../utils/search';

// view helper methods
/**
 * Converts the group data into the format expected by the user by adding users and
 * permission mappings.
 *
 * @param groupData - A collection or an array of collections to present.
 * @returns {Promise<any>}
 */
const presentData = (groupData) =>
  new Promise((resolve, reject) => {
    if (Array.isArray(groupData)) {
      // many collections
      keystone.populateRelated(groupData, 'users', (err) => {
        if (err) reject(err);
        const data = groupData;
        groupData.forEach((group, i) => {
          data[i] = group.toObject();
          data[i].permissions = getPermissionsMapArray(group.permissions);
        });
        resolve(data);
      });
    } else {
      // one collection
      let data = groupData;
      groupData.populateRelated('users', (err) => {
        if (err) reject(err);
        data = groupData.toObject();
        data.permissions = getPermissionsMapArray(groupData.permissions);
        resolve(data);
      });
    }
  });

export const list = (req, res) => {
  filterAndPaginate(Group, req)
    .sort('-createdAt')
    .exec(async (err, data) => {
      res.json({
        status: 'success',
        groups: await presentData(data.results),
        pagination: getPaginationData(data),
      });
    });
};

export const get = async (req, res) => {
  return res.send({
    status: 'success',
    group: await presentData(req.group),
  });
};

export const create = (req, res) => {
  // try to check for the existence of the group
  Group.model.findOne({ name: req.body.name }, (err, foundGroup) => {
    if (!foundGroup) {
      // eslint-disable-next-line new-cap
      const group = new Group.model();

      group.getUpdateHandler(req).process(req.body, async () =>
        res.status(201).json({
          status: 'success',
          message: `The ${group.name} group was created successfully.`,
          group: await presentData(group),
        }),
      );
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
  Group.model
    .findOne({ name: req.body.name, _id: { $ne: req.params.id } })
    .exec((err, existingGroup) => {
      if (!existingGroup) {
        const { group } = req;
        const { name, permissions } = req.body;
        if (name) {
          group.name = name;
        }
        if (permissions) {
          group.permissions = permissions;
        }
        group.save(async () => {
          return res.json({
            status: 'success',
            message: `The ${group.name} group was updated successfully.`,
            group: await presentData(group),
          });
        });
      } else {
        return res.status(409).json({
          status: 'error',
          message: `A group named ${req.body.name} already exists.`,
        });
      }
    });
};

export const remove = async (req, res) => {
  const { group } = req;
  const groupData = await presentData(group);
  if (groupData.users && groupData.users.length) {
    return res.status(400).json({
      status: 'error',
      message:
        'The group cannot be deleted as there are users that belong to it.',
    });
  }
  group.remove(() => {
    return res.json({
      status: 'success',
      message: `The ${group.name} group was removed successfully.`,
    });
  });
};
