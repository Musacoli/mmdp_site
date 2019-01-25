import keystone from "./helpers/keystone";
import Group from "../models/Group";
import supertest from "supertest";
import expect from 'expect';

const app = supertest(keystone.app);

const groupData = {
  name: "Security Admin",
  permissions: [
    "user.*",
    "group.*",
    "cms.*",
  ]
};

const createGroup = async (data = groupData) => {
  return await app.post('/api/groups').send(data);
};

describe('Create group (POST)', () => {
  beforeEach(async () => {
    await Group.model.remove();
  });

  it('should create successfully when data is valid', async () => {
    const res = await createGroup();
    expect(res.status).toBe(201);
    expect(res.body.group).toMatchObject({name: groupData.name});
    expect(res.body.message).toBe(`The ${groupData.name} group was created successfully.`);
  });

  it('should fail if name is missing', async () => {
    const data = {...groupData, name: null};
    const res = await createGroup(data);
    expect(res.status).toBe(422);
  });

  it('should fail if permissions is missing', async () => {
    const data = {...groupData, permissions: null};
    const res = await createGroup(data);
    expect(res.status).toBe(422);
  });

  it('should fail if name is of incorrect type', async () => {
    const data = {...groupData, name: 1};
    const res = await createGroup(data);
    expect(res.status).toBe(422);
  });

  it('should fail if permissions is of incorrect type', async () => {
    const data = {...groupData, permissions: 1};
    const res = await createGroup(data);
    expect(res.status).toBe(422);
  });

  it('should fail if provided permissions do not exist on the system', async () => {
    const data = {...groupData, permissions: ['foo', 'bar', 'baz']};
    const res = await createGroup(data);
    expect(res.status).toBe(422);
  });

  it('should fail if group already exists', async () => {
    // add group
    await createGroup();
    // try adding the same group again
    const res = await createGroup();
    expect(res.status).toBe(409);
    expect(res.body.message).toBe(`A group named ${groupData.name} already exists.`);
  });
});

const updateGroup = async (id, data) => {
  return await app.put(`/api/groups/${id}`).send(data);
};

const validUpdateData = {name: 'Root', permissions: ['user.*', 'group.*', 'cms.*']};

describe('Update group (PUT)', async () => {
  let existingGroup;

  beforeEach(async () => {
    await Group.model.remove();
    existingGroup = (await createGroup()).body.group;
  });

  it('should update successfully when data is valid', async () => {
    const res = await updateGroup(existingGroup._id, validUpdateData);
    expect(res.status).toBe(200);
    expect(res.body.group).toMatchObject({name: validUpdateData.name});
    expect(res.body.message).toBe(`The ${validUpdateData.name} group was updated successfully.`);
  });

  it('should fail if the group does not exist', async () => {
    const res = await updateGroup(777777, validUpdateData);
    expect(res.status).toBe(404);
  });

  it('should fail if name is missing', async () => {
    const data = {...validUpdateData, name: null};
    const res = await updateGroup(existingGroup._id, data);
    expect(res.status).toBe(422);
  });

  it('should fail if permissions is missing', async () => {
    const data = {...validUpdateData, permissions: null};
    const res = await updateGroup(existingGroup._id, data);
    expect(res.status).toBe(422);
  });

  it('should fail if name is of incorrect type', async () => {
    const data = {...validUpdateData, name: 1};
    const res = await updateGroup(existingGroup._id, data);
    expect(res.status).toBe(422);
  });

  it('should fail if permissions is of incorrect type', async () => {
    const data = {...validUpdateData, permissions: 1};
    const res = await updateGroup(existingGroup._id, data);
    expect(res.status).toBe(422);
  });

  it('should fail if provided permissions do not exist on the system', async () => {
    const data = {...validUpdateData, permissions: ['foo', 'bar', 'baz']};
    const res = await updateGroup(existingGroup._id, data);
    expect(res.status).toBe(422);
  });

  it('should fail on attempt to rename group to existing group', async () => {
    // add a group named 'Super Admin'
    const superAdmin = (await createGroup({...groupData, name: 'Super Admin'})).body.group;
    // try renaming 'Super Admin' to 'Security Admin' which exists (from groupData)
    const res = await updateGroup(superAdmin._id, {...groupData, name: 'Security Admin'});
    expect(res.status).toBe(409);
    expect(res.body.message).toBe(`A group named ${groupData.name} already exists.`);
  });
});

const listGroups = async () => {
  return await app.get('/api/groups');
};

describe('List group (GET)', async () => {
  beforeEach(async () => {
    await Group.model.remove();
    for (let i = 0; i < 5; i++) {
      await createGroup({...groupData, name: `group_${i}`})
    }
  });

  it('should list all groups successfully', async () => {
    const res = await listGroups();
    expect(res.status).toBe(200);
  });

  it('should list all the existing groups', async () => {
    const res = await listGroups();
    const data = res.body.groups;
    expect(data.length).toBe(5);
    for (let i = 0; i < 5; i++) {
      expect(data).toContainEqual(expect.objectContaining({name: `group_${i}`}));
    }
  });
});

const getGroup = async (id) => {
  return await app.get(`/api/groups/${id}`);
};

describe('Get group (GET)', async () => {
  let existingGroup;

  beforeEach(async () => {
    await Group.model.remove();
    existingGroup = (await createGroup()).body.group;
  });

  it('should get an existing group successfully', async () => {
    const res = await getGroup(existingGroup._id);
    expect(res.status).toBe(200);
    expect(res.body.group.name).toBe(existingGroup.name);
  });

  it('should fail if the group does not exist', async () => {
    const res = await getGroup(99999);
    expect(res.status).toBe(404);
    expect(res.body.message).toBe('The group does not exist.');
  });
});

const deleteGroup = async (id) => {
  return await app.delete(`/api/groups/${id}`);
};

describe('Delete group (DELETE)', async () => {
  let existingGroup;

  beforeEach(async () => {
    await Group.model.remove();
    existingGroup = (await createGroup()).body.group;
  });

  it('should delete an existing group successfully', async () => {
    const res = await deleteGroup(existingGroup._id);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe(`The ${existingGroup.name} group was removed successfully.`);
  });

  it('should fail if the group does not exist', async () => {
    const res = await deleteGroup(22222);
    expect(res.status).toBe(404);
    expect(res.body.message).toBe('The group does not exist.');
  });
});
