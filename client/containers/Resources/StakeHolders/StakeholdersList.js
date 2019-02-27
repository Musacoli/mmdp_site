import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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

class StakeholdersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: props.stakeholdersLoading,
      searchStr: '',
      stakeHolders: props.stakeholders,
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

  static getDerivedStateFromProps(props, state) {
    // debugger;
    // logic to enable the filter by state to work
    if (props.filterStatus) {
      return null;
    }

    // update the component when it loads first
    if (
      props.stakeholders !== state.stakeholders &&
      props.filterStatus === false
    ) {
      return {
        stakeHolders: props.stakeholders,
        loading: false,
      };
    }
    // Return null to indicate no change to state.
    return null;
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
    search({ page, searchQuery: query });
  };

  applyStateFilter = (states = []) => {
    const { stakeholders } = this.props;

    if (states.length > 0) {
      const search = stakeholders.stakeholders.data.map((stakeholder) => {
        if (states.includes(stakeholder[0].basicInformation.state))
          return stakeholder;
      });
      const filtered = search.filter((element) => {
        return element !== undefined;
      });
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

  applyLGAFilter = (lgas = []) => {
    const { stakeholders } = this.props;

    if (lgas.length > 0) {
      const search = stakeholders.stakeholders.data.map((stakeholder) => {
        if (lgas.includes(stakeholder[0].beneficiaryService.localGovernment))
          return stakeholder;
      });
      const filtered = search.filter((element) => {
        return element !== undefined;
      });
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
    const { states, LGAs, stakeholders } = this.props;
    const { loading, stakeHolders } = this.state;
    if (stakeholders.stakeholders === undefined || loading) {
      return <SimpleLoader loading={loading} />;
    }
    return (
      <React.Fragment>
        <Search
          placeholder="enter search phrase"
          onSearch={this.handleSearch}
          onChange={this.handleChange}
        />
        <SearchFiltersRow
          states={states}
          LGAs={LGAs}
          filterByState={this.applyStateFilter}
          filterByLGA={this.applyLGAFilter}
        />
        <StakeHoldersCardsList items={stakeHolders.stakeholders.data} />
        <Pagination
          handlePageChange={this.fetchStakeHolders}
          data={stakeholders.stakeholders.pagination}
          className="right floated events-pagination"
        />
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
  filterStatus: state.stakeholdersDirectory.filterStatus,
});

const mapDispatchToProps = {
  getStates: getNigerianStates,
  getLGAs: getNigerianStateLGAS,
  search: searchStakeHolders,
  filterResults: filterSearchResults,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StakeholdersList);
