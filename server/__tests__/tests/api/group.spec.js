import expect from 'expect';
import {
  app, createGroup, createUser, removeAllGroupsAndUsers,
} from '../../helpers/commons/base';
import { getPermissionsMapArray } from '../../../utils/permissions';

// data
const fullGroupPermission = ['group.*'];

const groupData = {
  name: 'Security Admin',
  permissions: [
    'user.*',
    'group.*',
    'cms.*',
  ],
};

const validUpdateData = {
  name: 'Root',
  permissions: ['user.*', 'group.*', 'cms.*'],
};

// api helper functions
const apiCreateGroup = (data = groupData) => app.post('/api/groups').send(data);

const apiUpdateGroup = (id, data) => app.put(`/api/groups/${id}`).send(data);

const apiListGroups = () => app.get('/api/groups').send();

const apiGetGroup = id => app.get(`/api/groups/${id}`).send();

const apiDeleteGroup = id => app.delete(`/api/groups/${id}`).send();

describe('Groups', () => {
  describe('Create group (POST)', () => {
    beforeEach(async () => {
      await removeAllGroupsAndUsers();
      await app.loginRandom(['group.create']);
    });

    it('should create successfully when data is valid', async () => {
      const res = await apiCreateGroup();
      expect(res.status).toBe(201);
      expect(res.body.group).toMatchObject({ name: groupData.name });
      expect(res.body.message).toBe(`The ${groupData.name} group was created successfully.`);
    });

    it('should create successfully with full group permissions', async () => {
      await app.loginRandom(fullGroupPermission);
      const res = await apiCreateGroup();
      expect(res.status).toBe(201);
    });

    it('should fail if name is missing', async () => {
      const data = { ...groupData, name: null };
      const res = await apiCreateGroup(data);
      expect(res.status).toBe(400);
    });

    it('should fail if permissions is missing', async () => {
      const data = { ...groupData, permissions: null };
      const res = await apiCreateGroup(data);
      expect(res.status).toBe(400);
    });

    it('should fail if name is of incorrect type', async () => {
      const data = { ...groupData, name: 1 };
      const res = await apiCreateGroup(data);
      expect(res.status).toBe(400);
    });

    it('should fail if permissions is of incorrect type', async () => {
      const data = { ...groupData, permissions: 1 };
      const res = await apiCreateGroup(data);
      expect(res.status).toBe(400);
    });

    it('should fail if provided permissions do not exist on the system', async () => {
      const data = { ...groupData, permissions: ['foo', 'bar', 'baz'] };
      const res = await apiCreateGroup(data);
      expect(res.status).toBe(400);
    });

    it('should fail if group already exists', async () => {
      // add group
      await apiCreateGroup();
      // try adding the same group again
      const res = await apiCreateGroup();
      expect(res.status).toBe(409);
      expect(res.body.message).toBe(`A group named ${groupData.name} already exists.`);
    });

    it('should fail if user is not authorized', async () => {
      await app.loginRandom([]);
      const res = await apiCreateGroup();
      expect(res.status).toBe(403);
    });
  });

  describe('Update group (PUT)', async () => {
    let existingGroup;

    beforeEach(async () => {
      await removeAllGroupsAndUsers();
      existingGroup = (await createGroup([], groupData)).toObject();
      await app.loginRandom(['group.update']);
    });

    it('should update successfully when data is valid', async () => {
      const res = await apiUpdateGroup(existingGroup._id, validUpdateData);
      expect(res.status).toBe(200);
      expect(res.body.group).toMatchObject({ name: validUpdateData.name });
      expect(res.body.message).toBe(`The ${validUpdateData.name} group was updated successfully.`);
    });

    it('should update successfully with full groups permission', async () => {
      await app.loginRandom(fullGroupPermission);
      const res = await apiUpdateGroup(existingGroup._id, validUpdateData);
      expect(res.status).toBe(200);
      expect(res.body.group).toMatchObject({ name: validUpdateData.name });
      expect(res.body.message).toBe(`The ${validUpdateData.name} group was updated successfully.`);
    });

    it('should fail if the group does not exist', async () => {
      const res = await apiUpdateGroup(777777, validUpdateData);
      expect(res.status).toBe(404);
    });

    it('should fail if name is missing', async () => {
      const data = { ...validUpdateData, name: null };
      const res = await apiUpdateGroup(existingGroup._id, data);
      expect(res.status).toBe(400);
    });

    it('should fail if name is of incorrect type', async () => {
      const data = { ...validUpdateData, name: 1 };
      const res = await apiUpdateGroup(existingGroup._id, data);
      expect(res.status).toBe(400);
    });

    it('should fail if permissions is of incorrect type', async () => {
      const data = { ...validUpdateData, permissions: 1 };
      const res = await apiUpdateGroup(existingGroup._id, data);
      expect(res.status).toBe(400);
    });

    it('should fail if provided permissions do not exist on the system', async () => {
      const data = { ...validUpdateData, permissions: ['foo', 'bar', 'baz'] };
      const res = await apiUpdateGroup(existingGroup._id, data);
      expect(res.status).toBe(400);
    });

    it('should allow update of permissions only', async () => {
      const data = { permissions: ['cms.create'] };
      const res = await apiUpdateGroup(existingGroup._id, data);
      expect(res.status).toBe(200);
      expect(res.body.group).toMatchObject({
        name: existingGroup.name,
        permissions: getPermissionsMapArray(data.permissions),
      });
    });

    it('should allow creation without only name', async () => {
      const data = { name: 'Content creator' };
      const res = await apiUpdateGroup(existingGroup._id, data);
      expect(res.status).toBe(200);
      expect(res.body.group).toMatchObject({
        ...data,
        permissions: getPermissionsMapArray(existingGroup.permissions),
      });
    });

    it('should fail on attempt to rename group to existing group', async () => {
      // add a group named 'Super Admin'
      const superAdmin = (await createGroup([], { name: 'Super Admin' })).toObject();
      // try renaming 'Super Admin' to 'Security Admin' which exists (from groupData)
      const res = await apiUpdateGroup(superAdmin._id, { ...groupData, name: 'Security Admin' });
      expect(res.status).toBe(409);
      expect(res.body.message).toBe(`A group named ${groupData.name} already exists.`);
    });

    it('should fail if user is not authorized', async () => {
      await app.loginRandom([]);
      const res = await apiUpdateGroup(existingGroup._id, validUpdateData);
      expect(res.status).toBe(403);
    });
  });

  describe('List group (GET)', async () => {
    beforeEach(async () => {
      await removeAllGroupsAndUsers();
      // populate some groups
      for (let i = 0; i < 5; i++) {
        await createGroup([], { ...groupData, name: `group_${i}` });
      }
      await app.loginRandom(['group.view']);
    });

    it('should list all groups successfully', async () => {
      const res = await apiListGroups();
      expect(res.status).toBe(200);
    });

    it('should list successfully with full groups permission', async () => {
      await app.loginRandom(fullGroupPermission);
      const res = await apiListGroups();
      expect(res.status).toBe(200);
    });

    it('should list all the existing groups', async () => {
      const res = await apiListGroups();
      const data = res.body.groups;
      // add one for the logged in user
      expect(data.length).toBe(5 + 1);
      for (let i = 0; i < 5; i++) {
        expect(data).toContainEqual(expect.objectContaining({ name: `group_${i}` }));
      }
    });

    it('should fail if user is not authorized', async () => {
      await app.loginRandom([]);
      const res = await apiListGroups();
      expect(res.status).toBe(403);
    });
  });

  describe('Get group (GET)', async () => {
    let existingGroup;

    beforeEach(async () => {
      await removeAllGroupsAndUsers();
      existingGroup = (await createGroup()).toObject();
      await app.loginRandom(['group.view']);
    });

    it('should get an existing group successfully', async () => {
      const res = await apiGetGroup(existingGroup._id);
      expect(res.status).toBe(200);
      expect(res.body.group.name).toBe(existingGroup.name);
    });

    it('should get group successfully with full groups permission', async () => {
      await app.loginRandom(fullGroupPermission);
      const res = await apiGetGroup(existingGroup._id);
      expect(res.status).toBe(200);
      expect(res.body.group.name).toBe(existingGroup.name);
    });

    it('should fail if the group does not exist', async () => {
      const res = await apiGetGroup(99999);
      expect(res.status).toBe(404);
      expect(res.body.message).toBe('The group does not exist.');
    });

    it('should fail if user is not authorized', async () => {
      await app.loginRandom([]);
      const res = await apiGetGroup(existingGroup._id);
      expect(res.status).toBe(403);
    });
  });

  describe('Delete group (DELETE)', async () => {
    let existingGroup;

    beforeEach(async () => {
      await removeAllGroupsAndUsers();
      existingGroup = (await createGroup()).toObject();
      await app.loginRandom(['group.delete']);
    });

    it('should delete an existing group successfully', async () => {
      const res = await apiDeleteGroup(existingGroup._id);
      expect(res.status).toBe(200);
      expect(res.body.message).toBe(`The ${existingGroup.name} group was removed successfully.`);
    });

    it('should delete successfully with full group permission', async () => {
      await app.loginRandom(fullGroupPermission);
      const res = await apiDeleteGroup(existingGroup._id);
      expect(res.status).toBe(200);
      expect(res.body.message).toBe(`The ${existingGroup.name} group was removed successfully.`);
    });

    it('should fail if the group does not exist', async () => {
      const res = await apiDeleteGroup(22222);
      expect(res.status).toBe(404);
      expect(res.body.message).toBe('The group does not exist.');
    });

    it('should fail if the group has dependants - users', async () => {
      const groupId = (await createGroup())._id;
      const user = await createUser([], { groups: [groupId] });
      const res = await apiDeleteGroup(groupId);
      expect(res.status).toBe(400);
      expect(res.body.message).toBe('The group cannot be deleted as there are users that belong to it.');
    });

    it('should fail if user is not authorized', async () => {
      await app.loginRandom([]);
      const res = await apiDeleteGroup(existingGroup._id);
      expect(res.status).toBe(403);
    });
  });
});
