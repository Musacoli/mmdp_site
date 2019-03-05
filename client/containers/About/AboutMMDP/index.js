import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from '../../../utils/toastr';
import * as aboutMMDPRequest from '../../../store/actions/about';
import MarkdownEditor from '../../../components/common/MarkdownEditor';
import Label from '../../../components/common/Label';
import Button from '../../../components/common/Button';
import '../../../assets/styles/About/common/style.scss';
import { FileInput } from '../../../components/common/Inputs/FileInput';

export class AboutMMDP extends Component {
  state = {
    about: '',
    background: '',
    error: null,
    id: null,
    loading: false,
    updateMode: false,
    image1: '',
    image2: '',
    imageOneFileName: '',
    imageTwoFileName: '',
  };

  componentDidMount() {
    const { getAboutMMDP } = this.props;
    getAboutMMDP();
  }

  componentDidUpdate = () => {
    const { imageOneFileName, imageTwoFileName } = this.state;
    const { aboutMMDP } = this.props;
    if (
      imageOneFileName === '' &&
      aboutMMDP.image1 &&
      aboutMMDP.image1.filename
    ) {
      this.setState({ imageOneFileName: aboutMMDP.image2.filename });
    }

    if (
      imageTwoFileName === '' &&
      aboutMMDP.image1 &&
      aboutMMDP.image1.filename
    ) {
      this.setState({ imageTwoFileName: aboutMMDP.image2.filename });
    }
  };

  static getDerivedStateFromProps = (props, state) => {
    const { aboutMMDP } = props;
    if (!state.updateMode) {
      return {
        ...aboutMMDP,
        updateMode: !!aboutMMDP.about,
        // eslint-disable-next-line no-underscore-dangle
        id: aboutMMDP._id,
      };
    }
    return {
      loading: aboutMMDP.loading,
    };
  };

  handleEditorChange = (name, val) => {
    this.setState({ [name]: val });
  };

  submit = (e) => {
    e.preventDefault();
    const data = this.state;
    const { loading } = this.state;
    const { updateAboutMMDP, createAboutMMDP } = this.props;

    if (loading || !this.isValidData(this.state)) return;

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (data[key] && !data[key].url) {
        formData.append(key, data[key]);
      }
    });

    if (data.updateMode) {
      updateAboutMMDP({ id: data.id, formData });
    } else {
      createAboutMMDP(formData);
    }
  };

  isValidData = (data) => {
    let errors = [];

    if (data.about.trim().length < 20) {
      errors = [...errors, '"About" must have twenty(20) characters minimum'];
    }

    if (data.background.trim().length < 20) {
      errors = [
        ...errors,
        '"Background" must have twenty(20) characters minimum',
      ];
    }

    if (errors.length) {
      errors.reverse().forEach((err) => toastr.error(err));
      return false;
    }
    return true;
  };

  handleChange = (e) => {
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

  render() {
    const {
      about,
      background,
      loading,
      imageOneFileName,
      imageTwoFileName,
    } = this.state;
    return (
      <React.Fragment>
        <form className="about__section" onSubmit={this.submit}>
          <div className="markdown__area">
            <Label htmlFor="about-markdown" label="About" />
            <div className="markdown">
              <MarkdownEditor
                value={about}
                handleEditorChange={(val) =>
                  this.handleEditorChange('about', val)
                }
              />
            </div>
          </div>
          <div className="markdown__area">
            <Label htmlFor="backgound-markdown" label="Background" />
            <div className="markdown">
              <MarkdownEditor
                value={background}
                handleEditorChange={(val) =>
                  this.handleEditorChange('background', val)
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
            change={this.handleChange}
          />
          <FileInput
            inputLabel="Attach Photo 2"
            placeholder={imageTwoFileName || 'Select a photo'}
            value=""
            id="image2"
            name="image2"
            accept="image/*"
            change={this.handleChange}
          />
          <Button
            classNames="save__btn"
            type="submit"
            loading={loading}
            name="Save"
          />
        </form>
      </React.Fragment>
    );
  }
}

AboutMMDP.propTypes = {
  createAboutMMDP: PropTypes.func.isRequired,
  updateAboutMMDP: PropTypes.func.isRequired,
  getAboutMMDP: PropTypes.func.isRequired,
  aboutMMDP: PropTypes.shape({}),
};

const mapStateToProps = (state) => ({
  aboutMMDP: state.aboutMMDP,
});

const mapDispatchToProps = {
  createAboutMMDP: aboutMMDPRequest.createAboutMMDP,
  updateAboutMMDP: aboutMMDPRequest.updateAboutMMDP,
  getAboutMMDP: aboutMMDPRequest.getAboutMMDP,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AboutMMDP);
