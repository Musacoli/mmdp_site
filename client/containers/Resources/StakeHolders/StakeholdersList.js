import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SearchFiltersRow from '../../../components/Resources/Stakeholders/SearchFilters';
import {
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

  componentWillMount() {
    const { getStates, getLGAs } = this.props;
    // fetch stakeholder data
    this.fetchStakeHolders();
    // fetch state data
    getStates();
    getLGAs();
  }

  componentDidMount() {
    const { loading } = this.state;
    const { stakeholders } = this.props;
    // update state once data fetching is complete
    while (loading) {
      if (typeof stakeholders === 'object') {
        this.setState({
          loading: false,
          stakeHolders: stakeholders,
        });
        break;
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { stakeholders } = this.props;
    if (prevProps.stakeholders !== stakeholders) {
      this.setState({
        stakeHolders: stakeholders,
      });
    }
  }

  handleSearch = (search) => {
    this.setState({ searchStr: search });
    this.fetchStakeHolders(1, search);
  };

  fetchStakeHolders = (page = 1, searchQuery = null) => {
    const { search } = this.props;
    const { searchStr } = this.state;
    const query = searchQuery !== null ? searchQuery : searchStr;
    search({ page, searchQuery: query });
  };

  handleChange(search) {
    if (!search) {
      this.setState({ searchStr: search });
      this.fetchStakeHolders(1, search);
    }
  }

  applyStateFilter(states) {
    const { stakeholders } = this.props;
    return stakeholders.stakeholders.data.map((stakeholder) => {
      if (states.includes(stakeholder[0].basicInformation.state))
        return stakeholder;
    });
  }

  render() {
    const { states, LGAs } = this.props;
    const { loading, stakeHolders } = this.state;
    const stakeholders = stakeHolders;
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
        <SearchFiltersRow states={states} LGAs={LGAs} />
        <StakeHoldersCardsList items={stakeholders.stakeholders.data} />
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
};

const mapStateToProps = (state) => ({
  states: state.stakeholdersDirectory.payload.states,
  LGAs: state.stakeholdersDirectory.payload2.LGAs,
  stakeholders: state.stakeholdersDirectory.stakeholders,
  stakeholdersLoading: state.stakeholdersDirectory.stakeholdersLoading,
});

const mapDispatchToProps = {
  getStates: getNigerianStates,
  getLGAs: getNigerianStateLGAS,
  search: searchStakeHolders,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StakeholdersList);
