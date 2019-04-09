import React, { Component } from 'react';
import StateSVGForm from '../../components/Matrix/State';

// eslint-disable-next-line react/prefer-stateless-function
class StateSVG extends Component {
  state = {
    // eslint-disable-next-line react/no-unused-state
    stateSVGFile: '',
    fileName: '',
  };

  onChange = (e) => {
    if (e.target.name === 'stateSVGFile' && e.target.files.length) {
      const file = e.target.files[0];
      this.setState({
        fileName: file.name || '',
        // eslint-disable-next-line react/no-unused-state
        stateSVGFile: file,
      });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  render() {
    const { fileName } = this.state;
    return (
      <div>
        <StateSVGForm fileName={fileName} onChange={this.onChange} />
      </div>
    );
  }
}

export default StateSVG;
