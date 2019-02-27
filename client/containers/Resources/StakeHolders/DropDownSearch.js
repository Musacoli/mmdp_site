import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {
  getNigerianStateLGAS,
  filterSearchResults,
} from '../../../store/actions/resources/Stakeholders';

class DropdownSearchQuery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      isFetching: false,
      currentValue: '',
      isSecondary: props.isSecondary,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentValue, isSecondary } = this.state;
    const { filterByState, filterByLGA, filterResults } = this.props;
    // isSecondary is a flag to determine whether the component updates state
    // or not with new values. If secondary, the component will only display
    // content else it will actually update the redux store on value change
    if (prevState.currentValue !== currentValue && isSecondary === false) {
      // if the search value has changed update the LGA's List'
      const { getLGAs } = this.props;
      filterResults(true);
      getLGAs(currentValue);
      filterByState(currentValue);
    }
    if (prevState.currentValue !== currentValue && isSecondary === true) {
      filterResults(true);
      filterByLGA(currentValue);
    }
  }

  handleChange = (e, { value }) => {
    this.setState({ currentValue: value });
    this.setState({ searchQuery: '' });
  };

  render() {
    const { isFetching, currentValue, searchQuery } = this.state;
    const { placeHolder, options } = this.props;

    return (
      <React.Fragment>
        <Header as="h4">
          <Header.Content>
            <Dropdown
              clearable
              header={placeHolder}
              placeholder={placeHolder}
              scrolling
              onChange={this.handleChange}
              options={options}
              searchQuery={searchQuery}
              disabled={isFetching}
              loading={isFetching}
              upward={false}
              value={currentValue}
            />
          </Header.Content>
        </Header>
        <hr className="filterDivider" />
      </React.Fragment>
    );
  }
}

DropdownSearchQuery.propTypes = {
  options: PropTypes.instanceOf(Array),
  placeHolder: PropTypes.string.isRequired,
  getLGAs: PropTypes.func.isRequired,
  filterResults: PropTypes.func.isRequired,
  isSecondary: PropTypes.bool.isRequired,
  filterByState: PropTypes.func.isRequired,
  filterByLGA: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  state,
});

const mapDispatchToProps = {
  getLGAs: getNigerianStateLGAS,
  filterResults: filterSearchResults,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DropdownSearchQuery);
