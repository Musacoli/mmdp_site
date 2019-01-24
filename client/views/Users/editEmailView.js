import React from "react";
import EditEmail from "../../containers/Users/EditEmail";
import Template from "../Templates";

const editEmailView = ({ ...props }) => (
  <Template {...props}>
    <EditEmail {...props} />
  </Template>
);

export default editEmailView;
