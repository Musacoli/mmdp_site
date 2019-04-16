/* eslint-disable react/no-unused-prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, Card } from 'semantic-ui-react';
import _ from 'lodash';
import DropdownCard from '../../components/ManageDropdowns/DropdownCard';
import * as dropdownActions from '../../store/actions/manageDropdowns/dropdowns';
import SimpleLoader from '../../components/common/Loader/SimpleLoader';
import Search from '../../components/common/Search';
import EmptyView from '../../components/common/InvalidPage';

export class Dropdowns extends Component {
  static propTypes = {
    fetchDropdowns: PropTypes.func.isRequired,
    errorDescription: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    history: PropTypes.shape({}),
  };

  state = {
    search: '',
    filteredDropdowns: [],
  };

  componentDidMount() {
    const { fetchDropdowns } = this.props;
    fetchDropdowns();
  }

  getFiltered = (query) => {
    const { dropdowns } = this.props;

    // eslint-disable-next-line func-names
    const filteredDropdowns = _.filter(dropdowns, function(dropdownName) {
      return dropdownName.title.toLowerCase().indexOf(query.toLowerCase()) > -1;
    });

    this.setState({ filteredDropdowns });
  };

  handleSearch = (search) => {
    this.setState({ search });
    this.getFiltered(search);
  };

  handleSearchChange = (search) => {
    if (!search) {
      this.setState({ search, filteredDropdowns: [] });
    }
  };

  goTo = (path) => {
    const { history } = this.props;
    history.push(path);
  };

  render() {
    const { dropdowns: items, loading } = this.props;
    const { search, filteredDropdowns } = this.state;

    let dropdowns = [];

    if (search || filteredDropdowns.length > 0) {
      dropdowns = filteredDropdowns;
    } else {
      dropdowns = items;
    }

    return (
      <React.Fragment>
        <SimpleLoader loading={loading} />
        <Grid>
          <Grid.Row>
            <Grid.Column width={16}>
              <Search
                onSearch={this.handleSearch}
                onChange={this.handleSearchChange}
                className="report-search"
                placeholder="Search dropdowns"
              />
            </Grid.Column>
          </Grid.Row>
          {dropdowns && dropdowns.length ? (
            <Grid.Row>
              <Card.Group itemsPerRow={4}>
                {dropdowns
                  ? dropdowns.map((dropdown) => (
                      <DropdownCard
                        key={dropdown.id}
                        goTo={this.goTo}
                        dropdown={dropdown}
                        deleteDropdowns={this.handleDeleteDropdowns}
                        loading={loading}
                      />
                    ))
                  : null}
              </Card.Group>
            </Grid.Row>
          ) : (
            <EmptyView
              errorMessage="Searched dropdowns not found"
              errorDescription="There are no dropdowns to display for the search"
              path="/manage/dropdowns"
              pathLabel="Not Found"
            />
          )}
        </Grid>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  dropdowns: state.dropdowns.data,
  loading: state.dropdowns.loading,
});

const mapDispatchToProps = {
  fetchDropdowns: dropdownActions.fetchDropdowns,
  deleteDropdowns: dropdownActions.deleteDropdowns,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dropdowns);
