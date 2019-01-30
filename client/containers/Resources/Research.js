import React, { Component } from 'react';
import ResearchView from '../../components/Resources/Research/ResearchView';

export default class Research extends Component {
  state = {
    researchTitle: '',
    researchUpload: '',
    fileName: '',
  };

  onChange = (e) => {
    if (e.target.name === 'researchUpload' && e.target.files.length) {
      const file = e.target.files[0];
      console.log(file);
      this.setState({
        fileName: file.name || '',
        researchUpload: file,
      });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };
  // onChange = (e) => {
  //   e.preventDefault();
  //   this.setState({ [e.target.name]: e.target.value });
  //   console.log('onchange');
  // };

  onFormSubmit = (e) => {
    e.preventDefault();
    const details = this.state;
    const formData = new FormData();
    // console.log(this.state);
    formData.append('file', details.researchUpload);
    this.setState({ researchUpload: formData });
    console.log('form submitted');
    console.log(this.state);
  };

  render() {
    return (
      <div>
        <ResearchView onChange={this.onChange} onSubmit={this.onFormSubmit} />
      </div>
    );
  }
}
