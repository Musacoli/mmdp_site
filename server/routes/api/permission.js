import { getPermissionsMapArray } from '../../utils/permissions';

export const list = (req, res) => res.json(getPermissionsMapArray());
