import {app, removeAllGroupsAndUsers} from "../../helpers/commons/base";
import expect from "expect";
import permissions from "../../../core/permissions";
import {allPermissionsFor, getPermissionsMapArray} from "../../../utils/permissions";

const apiGetPermissions = () => {
  return app.get('/api/permissions').send();
};

describe('Permissions', function () {
  describe('List (GET) permissions', () => {
    beforeEach(async () => {
      await removeAllGroupsAndUsers();
    });

    it('should list permissions successfully for user with any group permission', async () => {
      const groupPermissions = allPermissionsFor('group');
      for (let i = 0; i < groupPermissions.length; i++) {
        await app.loginRandom([groupPermissions[i]]);
        const permissionsResp = await apiGetPermissions();
        expect(permissionsResp.status).toBe(200);
      }
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
