import { getPermissionsMapArray } from '../../utils/permissions';

// eslint-disable-next-line import/prefer-default-export
export const list = (req, res) => res.json(getPermissionsMapArray());
