import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { getNigerianStateLGAS } from '../../../store/actions/resources/Stakeholders';

class DropdownSearchQuery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      isFetching: false,
      value: [],
      isSecondary: false,
    };
  }

  componentDidMount() {
    const { isSecondary } = this.props;
    this.setState({ isSecondary });
  }

  componentDidUpdate(prevProps, prevState) {
    const { value, isSecondary } = this.state;
    // isSecondary is a flag to determine whether the component updates state
    // or not with new values. If secondary, the component will only display
    // content else it will actually update the redux store on value change
    if (prevState.value !== value && isSecondary === false) {
      // if the search value has changed update the LGA's List'
      const { getLGAs } = this.props;
      getLGAs(value);
    }
  }

  handleChange = (e, { value }) => {
    this.setState({ value });
    this.setState({ searchQuery: '' });
  };

  handleSearchChange = (e, { searchQuery }) => {
    this.setState({ searchQuery });
  };

  render() {
    const { isFetching, value, searchQuery } = this.state;
    const { placeHolder, options } = this.props;

    return (
      <React.Fragment>
        <Header as="h4">
          <Header.Content>
            <Dropdown
              multiple
              header={placeHolder}
              placeholder={placeHolder}
              scrolling
              onChange={this.handleChange}
              onSearchChange={this.handleSearchChange}
              options={options}
              search
              searchQuery={searchQuery}
              disabled={isFetching}
              loading={isFetching}
              upward={false}
              value={value}
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
  isSecondary: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  state,
});

const mapDispatchToProps = {
  getLGAs: getNigerianStateLGAS,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DropdownSearchQuery);
