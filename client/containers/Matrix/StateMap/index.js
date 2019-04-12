import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as mapActions from '../../../store/actions/matrix/state';
import * as countryMapActions from '../../../store/actions/matrix/country';
import SVGForm from '../../../components/Matrix/svgForm';
import Pagination from '../../../components/common/Pagination/matrix_pagination';
import MapListing from '../../../components/common/MapListing';
import { valueIsEmpty } from '../../../utils/validations';

export class StateMap extends Component {
  state = {
    stateMaps: [],
    countrySvgFile: '',
    fileName: '',
    refresh: false,
    pagination: { data: {} },
    errors: {},
  };

  componentDidMount() {
    this.listStateMaps();
  }

  componentDidUpdate(prevState, prevProps) {
    const { fetchedMaps } = this.props;
    const data = fetchedMaps.data || [];
    const { refresh } = this.state;
    const pagination = fetchedMaps.pagination;
    if (data !== prevProps.stateMaps && data.length > 0 && !refresh) {
      // eslint-disable-next-line
      this.setState({ stateMaps: data, pagination, refresh: false });
    }
  }

  onChange = (e) => {
    this.setState({ errors: {} });
    if (e.target.name === 'countrySvgFile' && e.target.files.length) {
      const file = e.target.files[0];
      this.setState({
        fileName: file.name || '',
        // eslint-disable-next-line react/no-unused-state
        countrySvgFile: file,
      });
    }
  };

  onFormSubmit = () => {
    const { countrySvgFile, fileName } = this.state;
    const { match } = this.props;
    const countryName = match.params.country;
    const { updateCountryMap } = this.props;
    const fieldErrors = this.validate();
    const errorKeys = Object.keys(fieldErrors);
    if (errorKeys.length === 0) {
      const formData = new FormData();
      formData.append('countrySvgFile', countrySvgFile);
      formData.append('filename', fileName);
      formData.append('countryName', countryName);
      updateCountryMap(formData);
    } else {
      this.setState({ errors: fieldErrors });
    }
  };

  onUpdate = ({ id, name }) => {
    const { pagination } = this.state;
    const { updateStateMap, match } = this.props;
    const countryName = match.params.country;
    const data = { name, page: pagination.currentPage, countryName };
    updateStateMap({ id, data });
  };

  validate = () => {
    const errors = {};
    const { fileName } = this.state;
    if (valueIsEmpty(fileName)) {
      errors.fileName = 'Please enter country svg file';
    }
    return errors;
  };

  getStateMaps = (data) => {
    const stateMaps = data || [];
    return stateMaps.map((item) => {
      return {
        id: item.uniqueId,
        name: item.name,
        path: item.path,
      };
    });
  };

  listStateMaps = (page = 1) => {
    const { fetchStateMaps } = this.props;
    const {
      match: { params },
    } = this.props;
    const country = params.country;
    fetchStateMaps({ page, country, query: '' });
  };

  render() {
    const { stateMaps, fileName, pagination, errors } = this.state;
    const headers = ['UniqueID', 'Shape preview', 'State ID', 'More'];
    const {
      match: { params },
    } = this.props;
    const country = params.country;
    const maps = this.getStateMaps(stateMaps);
    return (
      <React.Fragment>
        <SVGForm
          onChange={this.onChange}
          onFormSubmit={this.onFormSubmit}
          {...this.props}
          fileName={fileName}
          errors={errors}
          country={country}
        />
        <MapListing
          Maps={maps}
          onUpdate={this.onUpdate}
          onMapView={this.onMapView}
          headers={headers}
          label="State maps found"
          btnName="Edit"
        />
        <br /> <br />
        <Pagination
          data={pagination}
          handlePageChange={this.listStateMaps}
          className="reports-pagination"
        />
      </React.Fragment>
    );
  }
}

export const mapStateToProps = (state) => ({
  fetchedMaps: state.stateMaps.data,
  loading: state.stateMaps.loading || state.countryMaps.loading,
});

export const mapDispatchToProps = {
  fetchStateMaps: mapActions.fetchStateMap,
  addStateMap: mapActions.addStateMap,
  updateStateMap: mapActions.updateStateMap,
  updateCountryMap: countryMapActions.updateCountryMap,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StateMap);
