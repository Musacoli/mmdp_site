import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Joi from 'joi';
import GroupForm from '../../components/Group/GroupForm';
import { fetchingPermissions } from '../../store/actions/permission';
import {
  createGroup, clearGroupErrors, fetchGroup, setGroup, updateGroup,
} from '../../store/actions/groups';
import { groupValidationSchema } from '../../utils/validations';
import { permissionOptions } from '../../store/reducers/permission';

export class GroupFormContainer extends Component {
  static propTypes = {
    permissions: PropTypes.shape({}).isRequired,
    getPermissions: PropTypes.func.isRequired,
    addGroup: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    groups: PropTypes.shape({}).isRequired,
    history: PropTypes.shape({}).isRequired,
    match: PropTypes.shape({}).isRequired,
    getGroup: PropTypes.func.isRequired,
    removeGroup: PropTypes.func.isRequired,
    editGroup: PropTypes.func.isRequired,
  }

  state = {
    selectedOption: [],
    name: '',
    errors: {},
    id: null,
  }

  componentDidMount() {
    const {
      getPermissions, match: { params }, getGroup, clearErrors,
    } = this.props;
    if (params.id) {
      this.setState({ id: params.id });
      getGroup({ id: params.id });
    }
    getPermissions({});
    clearErrors({});
  }

  componentWillUnmount = () => {
    const { removeGroup, clearErrors } = this.props;
    removeGroup({ group: {} });
    clearErrors({});
  }

  componentDidUpdate = () => {
    const { groups, clearErrors, history } = this.props;
    const { name } = this.state;
    if (groups.errors) {
      setTimeout(() => {
        clearErrors({});
      }, 3000);
    }
    if (groups.success) {
      setTimeout(() => {
        history.push('/group/list');
      }, 4000);
    }
    if (Object.keys(groups.group).length > 0 && name === '') {
      const { group } = groups;
      this.setState({
        name: group.name,
        selectedOption: permissionOptions(group.permissions),
      });
    }
  }

  handleSelectChange = (selectedOption) => {
    this.setState({ selectedOption });
  }

  handleInputChange = (e) => {
    const { target } = e;
    const { name } = target;
    const { errors } = this.state;
    delete errors[name];

    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
      errors,
    });
  }

  handleSubmit = (event) => {
    const { name, selectedOption, id } = this.state;
    const { addGroup, editGroup } = this.props;
    event.preventDefault();
    Joi.validate({ name }, groupValidationSchema, (err) => {
      if (err) {
        const errors = {};
        errors.name = err.details[0].message;
        this.setState({ errors });
        return false;
      }
      const permissions = [];
      let data = { name };
      if (selectedOption.length > 0) {
        selectedOption.map(permission => permissions.push(permission.value[0]));
        data = { ...data, permissions };
      }
      if (id) {
        data = { ...data, id };
        editGroup(data);
        return true;
      }
      return addGroup(data);
    });
  }

  render() {
    const { permissions, groups } = this.props;
    const { selectedOption, name, errors } = this.state;
    return (
      <GroupForm
        selectedOption={selectedOption}
        options={permissions.options}
        handleSelectChange={this.handleSelectChange}
        handleInputChange={this.handleInputChange}
        handleSubmit={this.handleSubmit}
        name={name}
        errors={errors}
        serverError={groups.errors}
        success={groups.success}
        busy={groups.isFetching}
      />
    );
  }
}

export const mapStateToProps = state => ({
  permissions: state.permissions,
  groups: state.groups,
});

export const mapDispatchToProps = {
  getPermissions: fetchingPermissions,
  addGroup: createGroup,
  editGroup: updateGroup,
  clearErrors: clearGroupErrors,
  getGroup: fetchGroup,
  removeGroup: setGroup,
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupFormContainer);
