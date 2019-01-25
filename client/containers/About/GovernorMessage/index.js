import React, { Component } from 'react';
import { connect } from 'react-redux';
import toastr from '../../../utils/toastr';
import * as governorMessageRequest from '../../../store/actions/about';
import PropTypes from 'prop-types';
import MarkdownEditor from '../../../components/common/MarkdownEditor';
import { Grid } from 'Semantic-ui-react';
import { FileInput, TextInput } from '../../../components/About/Inputs';
import Label from '../../../components/About/Label';
import SectionTitle from '../../../components/About/SectionTitle';
import AboutTemplate from '../../../views/About';
import '../common/style.scss';



export class GovernorMessage extends Component {

  state = {
    governorName: "",
    governorPhoto: "",
    governorMessage: "",
    fileName: "",
    error: null,
    id: null,
    loading: false,
    updateMode: false,
  };

  componentDidMount() {
    this.props.getGovernorMessage();
  }

  static getDerivedStateFromProps(props, state) {
    let { governorPhoto, ...rest } = props.message;

    if(!governorPhoto || typeof governorPhoto.filename !== 'string') {
      governorPhoto = '';
    } else if(governorPhoto.filename && typeof governorPhoto.filename === 'string') {
      governorPhoto = governorPhoto.filename;
    } 

    if(!state.updateMode) {
      return { 
        ...rest, 
        fileName: state.fileName || governorPhoto,
        updateMode: !!rest.governorName,
        id: rest._id 
      };
    } else {
      return {
        loading: rest.loading,
      }
    }
  }

  change = (e) => {
    if(e.target.name === 'governorPhoto' && e.target.files.length) {
      const file = e.target.files[0];
      this.setState({ 
        fileName: file.name || '', 
        governorPhoto: file 
      });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  }

  handleEditorChange = (val) => {
    this.setState({ governorMessage: val });
  }

  submit = (e) => {
    e.preventDefault();
    const data = this.state
    const { updateGovernorMessage, createGovernorMessage } = this.props;
    if(this.state.loading || !this.isValidData(this.state)) return;
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if(key === 'governorPhoto' && typeof data[key] !== 'string'){
        formData.append(key, data[key]);
      }
      if(key !== 'governorPhoto'){
        formData.append(key, data[key]);
      }
    });

    if(data.updateMode){
      updateGovernorMessage({id: data.id, formData});
    } else {
      createGovernorMessage(formData);
    }
  }

  isValidData = (data) => {
    let errors = [];

    if(!data.fileName.trim().length) {
      errors = [
        ...errors, 
        '"Governor Photo" is required'
      ];
    }

    if(data.governorName.trim().length < 2) {
      errors = [
        ...errors, 
        '"Governor Name" must have two(2) characters minimum'
      ];
    }

    if(data.governorMessage.trim().length < 20) {
      errors = [
        ...errors, 
        '"Governor Message" must have twenty(20) characters minimum'
      ];
    }

    if(errors.length){
      errors.reverse().forEach(err => toastr.error(err));
      return false;
    };
    return true;
  }

  render() {
    const { governorName, governorMessage, governorPhoto, fileName, loading } = this.state;
    return (
      <React.Fragment>
        <SectionTitle title="Message from the governor" />
        <AboutTemplate>
          <form onSubmit={this.submit}>
            <div className="input__area">
              <div className="flex">
                <TextInput 
                  inputLabel="Set Governor Name"
                  placeholder="Governor name"
                  value={governorName}
                  id="governorName"
                  name="governorName"
                  change={this.change}
                />
                <FileInput
                  inputLabel="Attach Photo"
                  placeholder={fileName || 'Select a photo'}
                  value=""
                  id="governorPhoto"
                  name="governorPhoto"
                  change={this.change}
                />
              </div>
            </div>
            <div className="markdown__area">
              <Label label="Message from the governor" />
              <div className="markdown">
                <MarkdownEditor
                  value={governorMessage}
                  handleEditorChange={this.handleEditorChange}
                />
              </div>
            </div>
            <div className="button__area">
              <button disabled={loading} type="submit">Save</button>
            </div>
          </form>
        </AboutTemplate>
      </React.Fragment>
    );
  }
}

GovernorMessage.propTypes = {
  createGovernorMessage: PropTypes.func.isRequired,
  updateGovernorMessage: PropTypes.func.isRequired,
  getGovernorMessage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  message: state.governorMessage,
})

const mapDispatchToProps = {
  createGovernorMessage: governorMessageRequest.createGovernorMessage,
  updateGovernorMessage: governorMessageRequest.updateGovernorMessage,
  getGovernorMessage: governorMessageRequest.getGovernorMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(GovernorMessage);
