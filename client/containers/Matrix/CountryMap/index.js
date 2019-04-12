import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as mapActions from '../../../store/actions/matrix/country';
import SVGForm from '../../../components/Matrix/svgForm';
import { valueIsEmpty } from '../../../utils/validations';
import Pagination from '../../../components/common/Pagination/matrix_pagination';
import MapListing from '../../../components/common/MapListing';

export class Country extends Component {
  state = {
    countryMaps: [],
    countrySvgFile: '',
    fileName: '',
    refresh: false,
    countryName: '',
    errors: {},
    pagination: { data: {} },
  };

  componentDidMount() {
    this.listCountryMaps();
  }

  componentDidUpdate(prevState, prevProps) {
    const { fetchedMaps } = this.props;
    const data = fetchedMaps.data || [];
    const pagination = fetchedMaps.pagination;
    const { refresh } = this.state;
    if (data !== prevProps.countryMaps && data.length > 0 && !refresh) {
      // eslint-disable-next-line
      this.setState({ countryMaps: data,pagination, refresh: false });
    } else if (data !== prevProps.countryMaps && data.length > 0 && refresh) {
      // eslint-disable-next-line
      this.setState({ countryMaps: data,pagination, refresh: false });
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
    } else {
      this.setState({ [e.target.name]: e.target.value, refresh: true });
    }
  };

  validate = () => {
    const errors = {};
    const { countryName, fileName } = this.state;
    if (valueIsEmpty(countryName)) {
      errors.countryName = 'Please enter country name';
    }
    if (valueIsEmpty(fileName)) {
      errors.fileName = 'Please enter country svg file';
    }
    return errors;
  };

  onFormSubmit = () => {
    const { countrySvgFile, fileName, countryName } = this.state;
    const { addCountryMap } = this.props;
    const fieldErrors = this.validate();
    const errorKeys = Object.keys(fieldErrors);
    if (errorKeys.length === 0) {
      const formData = new FormData();
      formData.append('countrySvgFile', countrySvgFile);
      formData.append('filename', fileName);
      formData.append('countryName', countryName);
      addCountryMap(formData);
    } else {
      this.setState({ errors: fieldErrors });
    }
  };

  onMapView = ({ name }) => {
    const { history } = this.props;
    history.push(`/matrix/states/${name}`);
  };

  listCountryMaps = (page = 1) => {
    const { fetchCountryMaps } = this.props;
    fetchCountryMaps({ page });
  };

  onUpdate = () => {};

  getCountryMaps = (data) => {
    return data.map((item) => {
      return { name: item.countryName, url: item.countrySvgFile.url };
    });
  };

  render() {
    const { countryMaps, fileName, errors, pagination } = this.state;
    const headers = ['Shape preview', 'Country ID', 'More', ''];
    const maps = this.getCountryMaps(countryMaps);
    return (
      <React.Fragment>
        <SVGForm
          onChange={this.onChange}
          onFormSubmit={this.onFormSubmit}
          headers={headers}
          {...this.props}
          fileName={fileName}
          errors={errors}
        />
        <MapListing
          Maps={maps}
          onUpdate={this.onUpdate}
          onMapView={this.onMapView}
          headers={headers}
          label="Country maps found"
          btnName="Edit"
        />
        <br /> <br />
        <Pagination
          data={pagination}
          handlePageChange={this.listCountryMaps}
          className="reports-pagination"
        />
      </React.Fragment>
    );
  }
}

export const mapStateToProps = (state) => ({
  fetchedMaps: state.countryMaps.data,
  loading: state.countryMaps.loading,
});

export const mapDispatchToProps = {
  fetchCountryMaps: mapActions.fetchCountryMap,
  addCountryMap: mapActions.addCountryMap,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Country);
