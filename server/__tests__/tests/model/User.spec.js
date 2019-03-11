import expect from 'expect';
import {
  createUser,
  removeAllGroupsAndUsers,
} from '../../helpers/commons/base';

describe('User Model', () => {
  beforeEach(async () => {
    await removeAllGroupsAndUsers();
  });

  it('should get accurate permissions - permissions virtual', async () => {
    const permissions = ['cms.*', 'group.*'];

    const user = await createUser(permissions);

    expect(await user.permissions).toEqual(permissions);
  });
});
