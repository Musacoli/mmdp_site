import { combineReducers } from "redux";
import login from "./auth/login";
import register from "./users/";
import userEdit from "./users/editUser";
import sidebar from "./sidebar";
import Users from "./users/fetchUsers";

const rootReducer = combineReducers({
  login,
  register,
  sidebar,
  Users,
  userEdit
});

export default rootReducer;
