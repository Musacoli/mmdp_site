import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Dimmer, Loader } from 'semantic-ui-react';

const createLoaderRoot = () => {
  // for testing purpose
  const body = document.querySelector('body');
  const loaderRoot = document.createElement('div');
  loaderRoot.setAttribute('id', 'loader-root');
  body.appendChild(loaderRoot);
  return loaderRoot;
};
const loaderRoot = document.getElementById('loader-root') || createLoaderRoot();

export default class SimpleLoader extends Component {
  render() {
    const { loading } = this.props;
    return ReactDOM.createPortal(
      <Dimmer className="loader-dimmer" active={loading}>
        <Loader />
      </Dimmer>,
      loaderRoot,
    );
  }
}

SimpleLoader.propTypes = {
  loading: PropTypes.bool.isRequired,
};
