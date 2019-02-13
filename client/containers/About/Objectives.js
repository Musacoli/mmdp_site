import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from '../../utils/toastr';
import * as objectivesRequest from '../../store/actions/about/objectives';
import MarkdownEditor from '../../components/common/MarkdownEditor';
import Label from '../../components/common/Label';
import Button from '../../components/common/Button';
import '../../assets/styles/About/common/style.scss';


export class Objectives extends Component {
  state = {
    objectives: '',
    error: null,
    id: null,
    loading: false,
    updateMode: false,
  };

  componentDidMount() {
    const { getObjectives } = this.props;
    getObjectives();
  }

  static getDerivedStateFromProps(props, state) {
    const { objectives } = props;
    if (!state.updateMode) {
      return {
        ...objectives,
        updateMode: !!objectives.Objectives,
        id: objectives._id,
      };
    }
    return {
      loading: objectives.loading,
    };
  }

  handleEditorChange = (name, val) => {
    this.setState({ [name]: val });
  };

  submit = (e) => {
    e.preventDefault();
    const data = this.state;
    const { loading } = this.state;
    const { updateObjectives, createObjectives } = this.props;

    if (loading || !this.isValidData(this.state)) return;

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    if (data.updateMode) {
      updateObjectives({ id: data.id, formData });
    } else {
      createObjectives(formData);
    }
  };

  isValidData = (data) => {
    let errors = [];

    if (data.objectives.trim().length < 20) {
      errors = [
        ...errors,
        '"The Objectives" must have twenty(20) characters minimum',
      ];
    }

    if (errors.length) {
      errors.reverse().forEach((err) => toastr.error(err));
      return false;
    }
    return true;
  };

  render() {
    // eslint-disable-next-line no-shadow
    const { Objectives, loading } = this.state;
    return (
      <React.Fragment>
        <form className="about__section" onSubmit={this.submit}>
          <div className="markdown__area">
            <Label label="Objectives" htmlFor="about-markdown" />
            <div className="markdown">
              <MarkdownEditor
                value={Objectives}
                handleEditorChange={(val) =>
                  this.handleEditorChange('Objectives', val)
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

Objectives.propTypes = {
  createObjectives: PropTypes.func.isRequired,
  updateObjectives: PropTypes.func.isRequired,
  getObjectives: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  objectives: state.objectives,
});

const mapDispatchToProps = {
  createObjectives: objectivesRequest.createObjectives,
  updateObjectives: objectivesRequest.updateObjectives,
  getObjectives: objectivesRequest.getObjectives,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Objectives);
