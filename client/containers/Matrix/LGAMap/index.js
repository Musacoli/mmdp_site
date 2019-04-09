import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as mapActions from '../../../store/actions/matrix/lga';
import { valueIsEmpty } from '../../../utils/validations';
import LGA from '../../../components/Matrix/LGA';
import Pagination from '../../../components/common/Pagination/matrix_pagination';

export class LGAMap extends Component {
  state = {
    stateSVGMaps: [],
    StateSVGFile: '',
    fileName: '',
    refresh: false,
    pagination: { data: {} },
    errors: {},
  };

  componentDidMount() {
    this.listLGAMaps();
  }

  componentDidUpdate(prevState, prevProps) {
    const { refresh } = this.state;
    const { fetchedMaps } = this.props;
    const data = fetchedMaps.data || [];
    const pagination = fetchedMaps.pagination;
    if (data !== prevProps.stateSVGMaps && data.length > 0 && !refresh) {
      // eslint-disable-next-line
      this.setState({
        stateSVGMaps: data,
        pagination,
        refresh: false,
      });
    }
  }

  onChange = (e) => {
    if (e.target.name === 'StateSVGFile' && e.target.files.length) {
      const file = e.target.files[0];
      this.setState({
        fileName: file.name || '',
        StateSVGFile: file,
      });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  onFormSubmit = () => {
    const details = this.state;
    const { addLGAMap } = this.props;
    const fieldErrors = this.validate();
    const errorKeys = Object.keys(fieldErrors);
    if (errorKeys.length === 0) {
      const formData = new FormData();
      Object.keys(details).forEach((key) => {
        formData.append(key, details[key]);
      });
      addLGAMap(formData);
    } else {
      console.log('we cant see anything');
      this.setState({ errors: fieldErrors });
    }
  };

  validate = () => {
    const errors = {};
    const { fileName } = this.state;
    if (valueIsEmpty(fileName)) {
      errors.fileName = 'Please enter state svg file';
    }
    return errors;
  };

  editLGA = ({ id, name }) => {
    const { pagination } = this.state;
    const data = { name, page: pagination.currentPage };
    const { updateLGA } = this.props;
    updateLGA({ id, data });
  };

  getLGAMaps = (data) => {
    const stateMaps = data || [];
    return stateMaps.map((item) => {
      return {
        id: item.uniqueId,
        name: item.name,
        path: item.path,
        lga: item.lga,
      };
    });
  };

  listLGAMaps = (page = 1) => {
    const { fetchLGAMaps } = this.props;
    const {
      match: { params },
    } = this.props;
    const state = params.state;
    fetchLGAMaps({ page, state, query: '' });
  };

  render() {
    const { stateSVGMaps, fileName, errors, pagination } = this.state;
    const headers = ['Unique ID', 'Shape preview', 'LGA ID', 'More'];
    return (
      <React.Fragment>
        <LGA
          onChange={this.onChange}
          onFormSubmit={this.onFormSubmit}
          Maps={this.getLGAMaps(stateSVGMaps)}
          onUpdate={this.editLGA}
          label="Local Government Area found"
          headers={headers}
          {...this.props}
          fileName={fileName}
          btnName="Edit"
          errors={errors}
        />
        <br /> <br />
        <Pagination
          data={pagination}
          handlePageChange={this.listLGAMaps}
          className="reports-pagination"
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  fetchedMaps: state.LGAMap.payload,
  loading: state.LGAMap.loading,
});

const mapDispatchToProps = {
  fetchLGAMaps: mapActions.getLGAMapRequest,
  addLGAMap: mapActions.addStateMatrix,
  updateLGA: mapActions.updateLGAMatrix,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LGAMap);
