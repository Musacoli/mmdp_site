import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from '../../../utils/toastr';
import * as aboutMMDPRequest from '../../../store/actions/about';
import MarkdownEditor from '../../../components/common/MarkdownEditor';
import Label from '../../../components/About/Label';
import SectionTitle from '../../../components/About/SectionTitle';
import AboutTemplate from '../../../views/About';
import '../common/style.scss';

export class AboutMMDP extends Component {
  state = {
    about: '',
    background: '',
    error: null,
    id: null,
    loading: false,
    updateMode: false,
  };

  componentDidMount() {
    const { getAboutMMDP } = this.props;
    getAboutMMDP();
  }

  static getDerivedStateFromProps(props, state) {
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
  }

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
      formData.append(key, data[key]);
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

  render() {
    const { about, background, loading } = this.state;
    return (
      <React.Fragment>
        <SectionTitle title="About MMDP" />
        <AboutTemplate>
          <form onSubmit={this.submit}>
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
            <div className="button__area">
              <button disabled={loading} type="submit">
                Save
              </button>
            </div>
          </form>
        </AboutTemplate>
      </React.Fragment>
    );
  }
}

AboutMMDP.propTypes = {
  createAboutMMDP: PropTypes.func.isRequired,
  updateAboutMMDP: PropTypes.func.isRequired,
  getAboutMMDP: PropTypes.func.isRequired,
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
