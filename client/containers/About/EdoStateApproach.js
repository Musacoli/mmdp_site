import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from '../../utils/toastr';
import * as edoStateApproachRequest from '../../store/actions/about/edoStateApproach';
import MarkdownEditor from '../../components/common/MarkdownEditor';
import Label from '../../components/common/Label';
import Button from '../../components/common/Button';
import '../../assets/styles/About/common/style.scss';

export class EdoStateApproach extends Component {
  state = {
    theEdoStateApproach: '',
    background: '',
    error: null,
    id: null,
    loading: false,
    updateMode: false,
  };

  componentDidMount() {
    const { getEdoStateApproach } = this.props;
    getEdoStateApproach();
  }

  static getDerivedStateFromProps(props, state) {
    const { edoStateApproach } = props;
    if (!state.updateMode) {
      return {
        ...edoStateApproach,
        updateMode: !!edoStateApproach.theEdoStateApproach,
        id: edoStateApproach._id,
      };
    }
    return {
      loading: edoStateApproach.loading,
    };
  }

  handleEditorChange = (name, val) => {
    this.setState({ [name]: val });
  };

  submit = (e) => {
    e.preventDefault();
    const data = this.state;
    const { loading } = this.state;
    const { updateEdoStateApproach, createEdoStateApproach } = this.props;

    if (loading || !this.isValidData(this.state)) return;

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    if (data.updateMode) {
      updateEdoStateApproach({ id: data.id, formData });
    } else {
      createEdoStateApproach(formData);
    }
  };

  isValidData = (data) => {
    let errors = [];

    if (
      !data.theEdoStateApproach ||
      data.theEdoStateApproach.trim().length < 20
    ) {
      errors = [
        ...errors,
        '"The Edo State Approach" must have twenty(20) characters minimum',
      ];
    }

    if (!data.background || data.background.trim().length < 20) {
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
    const { theEdoStateApproach, background, loading } = this.state;
    return (
      <React.Fragment>
        <form className="about__section" onSubmit={this.submit}>
          <div className="markdown__area">
            <Label label="The Edo State Approach" htmlFor="about-markdown" />
            <div className="markdown">
              <MarkdownEditor
                value={theEdoStateApproach}
                handleEditorChange={(val) =>
                  this.handleEditorChange('theEdoStateApproach', val)
                }
              />
            </div>
          </div>
          <div className="markdown__area">
            <Label label="Background" htmlFor="background-markdown" />
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
            <Button
              loading={loading}
              type="submit"
              classNames="save__btn"
              name="Save"
            />
          </div>
        </form>
      </React.Fragment>
    );
  }
}

EdoStateApproach.propTypes = {
  createEdoStateApproach: PropTypes.func.isRequired,
  updateEdoStateApproach: PropTypes.func.isRequired,
  getEdoStateApproach: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  edoStateApproach: state.edoStateApproach,
});

const mapDispatchToProps = {
  createEdoStateApproach: edoStateApproachRequest.createEdoStateApproach,
  updateEdoStateApproach: edoStateApproachRequest.updateEdoStateApproach,
  getEdoStateApproach: edoStateApproachRequest.getEdoStateApproach,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EdoStateApproach);
