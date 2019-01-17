import {getPermissionsMapArray} from "../../utils/permissions";

export const list = (req, res) => {
  return res.json( getPermissionsMapArray());
};
