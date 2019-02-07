import expect from 'expect';
import { app, removeAllGroupsAndUsers } from '../../helpers/commons/base';
import permissions from '../../../core/permissions';
import {
  allPermissionsFor,
  getPermissionsMapArray,
} from '../../../utils/permissions';

const apiGetPermissions = () => {
  return app.get('/api/permissions').send();
};

describe('Permissions', () => {
  describe('List (GET) permissions', () => {
    beforeEach(async () => {
      await removeAllGroupsAndUsers();
    });

    it('should list permissions successfully for user with any group permission', async () => {
      const groupPermissions = allPermissionsFor('group');
      await Promise.all(
        [...Array(groupPermissions.length)].map(async (item, key) => {
          await app.loginRandom([groupPermissions[key]]);
          const permissionsResp = await apiGetPermissions();
          expect(permissionsResp.status).toBe(200);
        }),
      );
    });

    it('should list all system permissions', async () => {
      await app.loginRandom(['group.view']);
      const resPermissions = (await apiGetPermissions()).body;
      expect(resPermissions.length).toBe(Object.keys(permissions).length);
      expect(resPermissions).toEqual(getPermissionsMapArray());
    });

    it('should fail for unauthorized users', async () => {
      await app.loginRandom([]);
      const res = await apiGetPermissions();
      expect(res.status).toBe(403);
    });
  });
});
