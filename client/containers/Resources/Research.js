import React, { Component } from 'react';
import { connect } from 'react-redux';
import ResearchView from '../../components/Resources/Research/ResearchView';
import { addResearch } from '../../store/actions/resources/research';
import SideBarNav from '../Sidebar';

export class Research extends Component {
  state = {
    title: '',
    reportFile: '',
    fileName: '',
  };

  onChange = (e) => {
    if (e.target.name === 'reportFile' && e.target.files.length) {
      const file = e.target.files[0];
      this.setState({
        fileName: file.name || '',
        reportFile: file,
      });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    const details = this.state;
    const formData = new FormData();
    Object.keys(details).forEach((key) => {
      formData.append(key, details[key]);
    });
    this.props.addResearch(formData);
  };

  render() {
    return (
      <div className="research__container">
        <div>
          <SideBarNav />
        </div>
        <div id="research__view">
          <ResearchView
            onChange={this.onChange}
            onSubmit={this.onFormSubmit}
            fileName={this.state.fileName}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  Research: state.response,
});

const mapDispatchToProps = {
  addResearch,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Research);
