import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import SearchFiltersRow from '../../../components/Resources/Stakeholders/SearchFilters';
import {
  filterSearchResults,
  getNigerianStateLGAS,
  getNigerianStates,
  searchStakeHolders,
} from '../../../store/actions/resources/Stakeholders';
import StakeHoldersCardsList from '../../../components/Resources/Stakeholders/StakeHoldersCardsList';
import Pagination from '../../../components/common/Pagination';
import SimpleLoader from '../../../components/common/Loader/SimpleLoader';
import Search from '../../../components/common/Search';
import ExportStakeHoldersCsv from './ExportStakeHoldersCSV';
import { removeStakeholderRequest } from '../../../store/actions/stakeholders/stakeholders';

class StakeholdersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: props.stakeholdersLoading,
      searchStr: '',
      stakeHolders: props.stakeholders,
      currentState: '',
    };
  }

  componentDidMount() {
    const { getStates, getLGAs } = this.props;
    // fetch stakeholder data
    this.fetchStakeHolders();
    // fetch state data
    getStates();
    getLGAs();
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentState } = this.state;
    const { getLGAs } = this.props;
    if (currentState !== prevState.currentState) {
      getLGAs({ stateId: currentState });
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.filterStatus) return null; // logic to enable the filter by state to work
    if (props.stakeholdersLoading) {
      return {
        loading: props.stakeholdersLoading,
        searchStr: state.searchStr,
        stakeHolders: props.stakeholders,
      };
    } // update the component when it loads first
    if (
      props.stakeholders !== state.stakeholders &&
      props.filterStatus === false
    ) {
      return {
        stakeHolders: props.stakeholders,
        loading: false,
      };
    } // Return null to indicate no change to state.
    return {
      loading: props.stakeholdersLoading,
      searchStr: state.searchStr,
      stakeHolders: props.stakeholders,
    };
  }

  handleSearch = (search) => {
    this.setState({ searchStr: search });
    this.fetchStakeHolders(1, search);
  };

  fetchStakeHolders = (page = 1, searchQuery = null) => {
    const { search, filterResults } = this.props;
    const { searchStr } = this.state;
    filterResults(false);
    const query = searchQuery !== null ? searchQuery : searchStr;
    search({ page, searchQuery: query, perPage: 9 });
  };

  applyFilter = (states = [], filterField = 'stateId') => {
    const { stakeholders } = this.props;

    if (states.length > 0) {
      const search = [];

      if (filterField === 'stateId') {
        this.setState({
          currentState: states,
        });
      }

      stakeholders.stakeholders.data.forEach((stakeholder) => {
        const beneficiaries = stakeholder.beneficiaries || [];
        return beneficiaries.forEach((beneficiary) => {
          // search from within stakeholder beneficiaries
          const communities = beneficiary.communities;
          communities.forEach((community) => {
            // search from within the communities array in the beneficiaries data
            if (states === community[filterField]._id) {
              search.push(stakeholder);
            }
          });
        });
      });
      const filtered = _.uniqBy(search, (e) => e._id);
      // update the state
      this.setState({
        stakeHolders: {
          stakeholders: {
            data: filtered,
          },
        },
      });
    } else {
      this.setState({ stakeHolders: stakeholders });
    }
  };

  handleChange = (search) => {
    const { filterResults } = this.props;
    filterResults(false);
    if (search === undefined) {
      this.setState({ searchStr: '' });
    } else if (!search) {
      this.setState({ searchStr: search });
      this.fetchStakeHolders(1, search);
    }
  };

  render() {
    const {
      states,
      LGAs,
      stakeholders,
      stakeholdersLoading,
      removeStakeholder,
    } = this.props;
    const { loading, stakeHolders } = this.state;
    return stakeholders.stakeholders === undefined ? (
      <SimpleLoader loading={loading} />
    ) : (
      <React.Fragment>
        <Grid columns={3}>
          <Grid.Row>
            <Grid.Column width={12}>
              <Search
                placeholder="Search stakeholder directory"
                onSearch={this.handleSearch}
                onChange={this.handleChange}
              />
            </Grid.Column>
            <Grid.Column width={3}>
              <Link to="/stakeholder-directory/add-basic-information">
                <Button className="btn-add ugly-blue small">
                  Add stakeholder
                </Button>
              </Link>
            </Grid.Column>
            <Grid.Column width={1} />
          </Grid.Row>
          <SearchFiltersRow
            states={states}
            LGAs={LGAs}
            filterByState={this.applyFilter}
            filterByLGA={this.applyFilter}
          />
          <StakeHoldersCardsList
            items={stakeHolders.stakeholders.data}
            loading={stakeholdersLoading}
            removeStakeholder={removeStakeholder}
          />
          <Grid.Row columns={3}>
            <Grid.Column width={3}>
              <ExportStakeHoldersCsv data={stakeHolders.stakeholders.data} />
            </Grid.Column>
            <Grid.Column width={7} />
            <Grid.Column width={6}>
              <Pagination
                handlePageChange={this.fetchStakeHolders}
                data={stakeholders.stakeholders.pagination}
                className="right floated events-pagination"
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </React.Fragment>
    );
  }
}

StakeholdersList.propTypes = {
  getStates: PropTypes.func.isRequired,
  getLGAs: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  states: PropTypes.instanceOf(Array),
  LGAs: PropTypes.instanceOf(Array),
  stakeholders: PropTypes.instanceOf(Object),
  stakeholdersLoading: PropTypes.bool.isRequired,
  filterResults: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  states: state.stakeholdersDirectory.payload.states,
  LGAs: state.stakeholdersDirectory.payload2.LGAs,
  stakeholders: state.stakeholdersDirectory.stakeholders,
  stakeholdersLoading: state.stakeholdersDirectory.stakeholdersLoading,
  Loading: state.stakeholdersDirectory.stakeholdersLoading,
  filterStatus: state.stakeholdersDirectory.filterStatus,
});

const mapDispatchToProps = {
  getStates: getNigerianStates,
  getLGAs: getNigerianStateLGAS,
  search: searchStakeHolders,
  filterResults: filterSearchResults,
  removeStakeholder: removeStakeholderRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StakeholdersList);
