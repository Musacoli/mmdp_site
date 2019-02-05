import expect from 'expect';
import Group from '../../../models/Group';
import {User} from '../../../models/User';
import {
  allPermissionsFor,
  getPermissionsMapArray,
  getUserPermissions,
  hasAllPermissions,
  hasAnyPermission
} from "../../../utils/permissions";

const createUser = async (data, groups = []) => {
  return (await User.model.create({...data, groups})).populate('groups');
};

const createGroup = async (data) => {
  return (await Group.model.create(data));
};

describe('utils - permissions.js', () => {
  describe('allPermissionsFor()', () => {
    it('should list all permissions for a permission group', () => {
      const allGroupPermissions = [
        'group.*', 'group.create', 'group.edit', 'group.view', 'group.delete',
      ];

      expect(allPermissionsFor('group')).toEqual(allGroupPermissions);
    });

    it('should give an empty list when permission group does not exist', () => {
      expect(allPermissionsFor('foo')).toEqual([]);
    });
  });

  describe('getPermissionsMapArray()', () => {
    it('should map permissions correctly', () => {
      const cmsPermissions = [
        'cms.about.*', 'cms.about.create', 'cms.about.edit', 'cms.about.view', 'cms.about.archive'
      ];

      const cmsPermissionsMap = [
        {'cms.about.*': "Full about access"},
        {'cms.about.create': "Create about content"},
        {'cms.about.edit': "Edit about content"},
        {'cms.about.view': "View about content"},
        {'cms.about.archive': "Archive about content"},
      ];

      expect(getPermissionsMapArray(cmsPermissions)).toEqual(cmsPermissionsMap);
    });

    it('should give an empty list when passed list is empty ', () => {
      expect(getPermissionsMapArray([])).toEqual([]);
    });
  });

  describe('hasAnyPermission()', () => {
    const validPermissions = ['cms.about.*', 'cms.about.view', 'cms.about.archive'];
    const withValidPermissions = ['cms.about.view', 'group.about'];
    const withoutValidPermissions = ['user.*'];

    it('should return true when user has any valid permission', () => {
      expect(hasAnyPermission(withValidPermissions, validPermissions)).toEqual(true);
    });

    it('should return false when user has no valid permission', () => {
      expect(hasAnyPermission(withoutValidPermissions, validPermissions)).toEqual(false);
    });

    it('should return false when user has no permissions', () => {
      expect(hasAnyPermission([], validPermissions)).toEqual(false);
    });

    it('should return true when no valid permissions are provided', () => {
      expect(hasAnyPermission(withoutValidPermissions, [])).toEqual(true);
    });
  });

  describe('hasAllPermissions()', () => {
    const requiredPermissions = ['cms.about.view', 'cms.about.archive'];
    const withRequiredPermissions = ['cms.about.view', 'cms.about.archive', 'group.*'];
    const withoutRequiredPermissions = ['user.*'];

    it('should return true when user has all required permissions', () => {
      expect(hasAllPermissions(withRequiredPermissions, requiredPermissions)).toEqual(true);
    });

    it('should return false when user is missing any of the required permissions', () => {
      expect(hasAllPermissions(withoutRequiredPermissions, requiredPermissions)).toEqual(false);
    });

    it('should return false when user has no permissions', () => {
      expect(hasAllPermissions([], requiredPermissions)).toEqual(false);
    });

    it('should return true when required permissions are not provided', () => {
      expect(hasAllPermissions(withoutRequiredPermissions, [])).toEqual(true);
    });
  });

  describe('getUserPermissions()', () => {
    before(async () => {
      await Group.model.remove();
      await User.model.remove();
    });

    it('should get user permissions', async () => {
      const permissions = ['group.*', 'user.*'];
      // create a group
      const group = await createGroup({
        name: 'Super Admin',
        permissions: permissions
      });
      // create a user belonging to the group
      const user = await createUser({
        first_name: 'Theodore',
        last_name: 'T-Bag',
        username: 'tbag',
        email: 'tbag@pb.com',
        password: 'Pas$Word',
      }, [group._id]);
      expect(await getUserPermissions(user)).toEqual(permissions)
    });

    it('should return an empty array if user has no permissions', async () => {
      // create a user belonging to no group
      const user = await createUser({
        first_name: 'Shakes',
        last_name: 'Makena',
        username: 'makena',
        email: 'makena@ss.com',
        password: 'Pas$Word',
      });
      expect(await getUserPermissions(user)).toEqual([])
    });
  });
});
