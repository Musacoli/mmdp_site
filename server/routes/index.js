import path from "path";
const keystone = require('keystone');
const importRoutes = keystone.importer(__dirname);
import cors from 'cors';
import {
  checkIfAdmin,
  requireUser,
  checkEmail,
  parseRegistration,
  updateDetails,
  validateEmail,
  verifyAccount,
  verifyEdit
} from "../middlewares/userMiddlewares";

export const baseUrl = "/api/v1";

exports = module.exports = app => {

  app.use(cors());
  
  const routes = {
    api: importRoutes("./api")
  };

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + "/index.html"));
  }),
    app.post(
      `${baseUrl}/users`,
      parseRegistration,
      checkEmail,
      routes.api.Users.createUser
    ),
    app.put(
      `${baseUrl}/users/confirmation`,
      verifyAccount,
      routes.api.Users.confirmed
    ),
    app.put(
      `${baseUrl}/users/`,
      validateEmail,
      updateDetails,
      routes.api.Users.updateEmail
    ),
    app.delete(`${baseUrl}/users/:id`, routes.api.Users.deleteUser),
    app.get(`${baseUrl}/users/:id`, routes.api.Users.fetchUser),
    app.get(`${baseUrl}/users`, routes.api.Users.fetchAllUsers);
    app.put(
    `${baseUrl}/users/edit`,
    verifyEdit,
    routes.api.Users.edited
  );
};
