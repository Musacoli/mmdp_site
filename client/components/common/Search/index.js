import React, { Component } from 'react';
import { Button, Input } from 'semantic-ui-react';
import '../../../assets/styles/components/_search.scss';
import PropTypes from 'prop-types';

class Search extends Component {
  state = {
    search: '',
  };

  handleChange = (ev) => {
    ev.preventDefault();
    const { onChange } = this.props;
    const search = ev.target.value;
    this.setState({ search });
    if (onChange) {
      onChange(search);
    }
  };

  handleSearch = (ev) => {
    ev.preventDefault();
    const { onSearch } = this.props;
    const { search } = this.state;
    if (onSearch) {
      onSearch(search);
    }
  };

  render() {
    const { placeholder, className } = this.props;

    return (
      <React.Fragment>
        <form className={className}>
          <div className="ui grid">
            <div className="twelve wide column">
              <Input
                type="text"
                className="app-search-input"
                placeholder={placeholder}
                onChange={this.handleChange}
              />
            </div>
            <div className="four wide column">
              <Button className="app-search-button" onClick={this.handleSearch}>
                Search
              </Button>
            </div>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

Search.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onSearch: PropTypes.func,
  className: PropTypes.string,
};

export default Search;
