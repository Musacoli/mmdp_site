import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as pillarMessageRequest from '../../store/actions/pillar';
import MarkdownEditor from '../../components/common/MarkdownEditor';
import { FileInput } from '../../components/common/Inputs/FileInput';
import { TextInput } from '../../components/common/Inputs/TextInput';
import '../../assets/styles/Pillars/index.scss';

export class PillarThree extends Component {
  state = {
    title: '',
    introduction: '',
    whatWeAreDoing: '',
    keyActivities: '',
    image1: '',
    image2: '',
    imageOneFileName: '',
    imageTwoFileName: '',
    pillarNumber: 3,
    error: null,
    id: null,
    loading: false,
    updateMode: false,
  };

  componentDidMount() {
    const { getPillar } = this.props;
    getPillar();
  }

  static getDerivedStateFromProps(props, state) {
    const { pillars } = props;
    const { title, image1, image2, ...rest } = pillars;

    let photo1 = '';
    let photo2 = '';

    if (!image1 || typeof image1.filename !== 'string') {
      photo1 = '';
    } else if (image1.filename && typeof image1.filename === 'string') {
      photo1 = image1.filename;
    }

    if (!image2 || typeof image2.filename !== 'string') {
      photo2 = '';
    } else if (image2.filename && typeof image2.filename === 'string') {
      photo2 = image2.filename;
    }

    if (!state.stateUpdated) {
      return {
        ...rest,
        title: title || '',
        imageOneFileName: state.imageOneFileName || photo1,
        imageTwoFileName: state.imageTwoFileName || photo2,
        updateMode: !!title,
        stateUpdated: !!state.title,
        id: rest._id,
      };
    }
    return {
      error: rest.error,
      loading: rest.loading,
    };
  }

  change = (e) => {
    if (e.target.name === 'image1' && e.target.files.length) {
      const file = e.target.files[0];
      this.setState({
        imageOneFileName: file.name || '',
        image1: file,
      });
    } else if (e.target.name === 'image2' && e.target.files.length) {
      const file = e.target.files[0];
      this.setState({
        imageTwoFileName: file.name || '',
        image2: file,
      });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  handleEditorChange = (name, val) => {
    this.setState({ [name]: val });
  };

  submit = (e) => {
    e.preventDefault();
    const data = this.state;

    const { updatePillar, createPillar } = this.props;

    const { loading } = this.state;
    if (loading) return;

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === 'image1' && typeof data[key] !== 'string') {
        formData.append(key, data[key]);
      }
      if (key === 'image2' && typeof data[key] !== 'string') {
        formData.append(key, data[key]);
      }
      if (key !== 'image1' && key !== 'image2') {
        formData.append(key, data[key]);
      }
    });

    if (data.updateMode) {
      updatePillar({ id: data.id, formData });
    } else {
      createPillar(formData);
    }
  };

  render() {
    const {
      title,
      introduction,
      whatWeAreDoing,
      keyActivities,
      loading,
      imageOneFileName,
      imageTwoFileName,
    } = this.state;

    return (
      <React.Fragment>
        <form onSubmit={this.submit}>
          <h4 className="section-title">Pillar title</h4>
          <div className="input__area">
            <div className="flex">
              <TextInput
                placeholder="Pillar title"
                value={title}
                id="pillarTitle"
                name="title"
                classNames="pillar__input"
                change={this.change}
              />
            </div>
          </div>
          <div className="markdown__area">
            <h4 className="section-title">Introduction</h4>
            <div className="markdown__pillar-area">
              <MarkdownEditor
                value={introduction}
                handleEditorChange={(val) =>
                  this.handleEditorChange('introduction', val)
                }
              />
            </div>
          </div>

          <div className="markdown__area">
            <h4 className="section-title">What we are doing</h4>
            <div className="markdown__pillar-area">
              <MarkdownEditor
                value={whatWeAreDoing}
                handleEditorChange={(val) =>
                  this.handleEditorChange('whatWeAreDoing', val)
                }
              />
            </div>
          </div>

          <div className="markdown__area">
            <h4 className="section-title">Key activities</h4>
            <div className="markdown__pillar-area">
              <MarkdownEditor
                value={keyActivities}
                handleEditorChange={(val) =>
                  this.handleEditorChange('keyActivities', val)
                }
              />
            </div>
          </div>
          <FileInput
            inputLabel="Attach Photo 1"
            placeholder={imageOneFileName || 'Select a photo'}
            value=""
            id="image1"
            name="image1"
            accept="image/*"
            change={this.change}
          />
          <FileInput
            inputLabel="Attach Photo 2"
            placeholder={imageTwoFileName || 'Select a photo'}
            value=""
            id="image2"
            name="image2"
            accept="image/*"
            change={this.change}
          />

          <div className="button__area">
            <button disabled={loading} type="submit">
              Save
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

PillarThree.propTypes = {
  createPillar: PropTypes.func.isRequired,
  updatePillar: PropTypes.func.isRequired,
  getPillar: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  pillars: state.pillarThreeReducer,
});

const mapDispatchToProps = {
  createPillar: pillarMessageRequest.createPillarThree,
  updatePillar: pillarMessageRequest.updatePillarThree,
  getPillar: pillarMessageRequest.getPillarThree,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PillarThree);
