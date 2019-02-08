import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from '../../../utils/toastr';
import * as coordinationRequest from '../../../store/actions/about';
import MarkdownEditor from '../../../components/common/MarkdownEditor';
import Label from '../../../components/common/Label';
import Button from '../../../components/common/Button';
import '../../../assets/styles/About/common/style.scss';
import '../../../assets/styles/About/Coordination/index.scss';

export class Coordination extends Component {
  state = {
    coordination: '',
    whatAreWeDoing: '',
    introToHighlights: '',
    highlight: [],
    highlightIds: [],
    error: null,
    id: null,
    loading: false,
    updateMode: false,
    numberOfInputFields: 0,
  };

  componentDidMount() {
    const { getCoordination } = this.props;
    getCoordination();
  }

  componentDidUpdate() {
    this.populateInputValue();
  }

  static getDerivedStateFromProps(props, state) {
    const { coordination } = props;
    const { highlight } = coordination;
    let numberOfInputFields = highlight.length;

    if (numberOfInputFields === 0) {
      numberOfInputFields = 1;
    }
    if (state.numberOfInputFields >= numberOfInputFields) {
      // eslint-disable-next-line
      numberOfInputFields = state.numberOfInputFields;
    }

    return {
      error: coordination.error,
      coordination: state.coordination || coordination.coordination,
      whatAreWeDoing: state.whatAreWeDoing || coordination.whatAreWeDoing,
      // eslint-disable-next-line no-underscore-dangle
      highlightIds: coordination.highlight.map((data) => data._id),
      introToHighlights:
        state.introToHighlights || coordination.introToHighlights,
      updateMode: !!coordination.coordination,
      loading: coordination.loading,
      // eslint-disable-next-line no-underscore-dangle
      id: coordination._id,
      highlight,
      numberOfInputFields,
    };
  }

  addMoreInput = () => {
    const { loading, numberOfInputFields } = this.state;
    if (!this.inputHasValue() || loading) return;
    this.setState({
      numberOfInputFields: numberOfInputFields + 1,
    });
  };

  createMoreInputField = (state) => {
    const max = state.numberOfInputFields;

    return new Array(max).fill(1).map((_, index) => {
      return (
        <input
          // eslint-disable-next-line
          key={index}
          className="input highlight__input"
          placeholder="highlight"
        />
      );
    });
  };

  populateInputValue = () => {
    const { coordination } = this.props;
    const { highlight } = coordination;
    if (!highlight.length) return;
    highlight.forEach((data, index) => {
      if (index < this.getInputElement().length) {
        this.getInputElement()[index].value = data.name;
      }
    });
  };

  handleEditorChange = (name, val) => {
    this.setState({ [name]: val });
  };

  getInputElement = () => {
    return document.querySelectorAll('input.input');
  };

  inputHasValue = () => {
    let hasValue = true;
    this.getInputElement().forEach((element) => {
      if (!element.value.trim()) {
        hasValue = false;
      }
    });
    return hasValue;
  };

  getHighlightInputValue = () => {
    let inputValues = [];
    this.getInputElement().forEach((element) => {
      if (element.value.trim()) {
        inputValues = [...inputValues, element.value.trim()];
      }
    });
    return inputValues;
  };

  submit = (e) => {
    e.preventDefault();
    const { updateCoordination, createCoordination } = this.props;
    const { loading } = this.state;

    const data = {
      ...this.state,
      highlight: this.getHighlightInputValue(),
    };

    if (loading || !this.isValidData(data)) return;

    if (data.updateMode) {
      updateCoordination({ id: data.id, data });
    } else {
      createCoordination(data);
    }
  };

  isValidData = (data) => {
    let errors = [];

    if (!data.coordination || data.coordination.trim().length < 20) {
      errors = [
        ...errors,
        '"Coordination" must have twenty(20) characters minimum',
      ];
    }

    if (!data.whatAreWeDoing || data.whatAreWeDoing.trim().length < 20) {
      errors = [
        ...errors,
        '"What we are doing" must have twenty(20) characters minimum',
      ];
    }

    if (!data.introToHighlights || data.introToHighlights.trim().length < 20) {
      errors = [
        ...errors,
        '"Introduction to highlights" must have twenty(20) characters minimum',
      ];
    }

    if (!data.highlight.length) {
      errors = [...errors, 'Add at least a "Highlight"'];
    }

    if (errors.length) {
      errors.reverse().forEach((err) => toastr.error(err));
      return false;
    }
    return true;
  };

  render() {
    const {
      coordination,
      whatAreWeDoing,
      loading,
      introToHighlights,
    } = this.state;

    return (
      <React.Fragment>
        <form className="about__section" onSubmit={this.submit}>
          <div className="markdown__area">
            <Label htmlFor="markdown" label="Coordination" />
            <div className="markdown">
              <MarkdownEditor
                value={coordination}
                handleEditorChange={(val) =>
                  this.handleEditorChange('coordination', val)
                }
              />
            </div>
          </div>
          <div className="markdown__area">
            <Label htmlFor="markdown" label="What we are doing" />
            <div className="markdown">
              <MarkdownEditor
                value={whatAreWeDoing}
                handleEditorChange={(val) =>
                  this.handleEditorChange('whatAreWeDoing', val)
                }
              />
            </div>
          </div>
          <div className="markdown__area">
            <Label htmlFor="markdown" label="Introduction to highlights" />
            <div className="markdown">
              <MarkdownEditor
                value={introToHighlights}
                handleEditorChange={(val) =>
                  this.handleEditorChange('introToHighlights', val)
                }
              />
            </div>
          </div>
          <div className="input__label">
            <Label htmlFor="markdown" label="Highlights" />
          </div>
          <div className="flex input__area">
            <div className="highlight__input">
              {this.createMoreInputField(this.state)}
            </div>
            <Button
              classNames="add__more__btn"
              click={this.addMoreInput}
              type="button"
              name="Add more"
            />
          </div>
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

Coordination.propTypes = {
  createCoordination: PropTypes.func.isRequired,
  updateCoordination: PropTypes.func.isRequired,
  getCoordination: PropTypes.func.isRequired,
  coordination: PropTypes.shape({}),
};

const mapStateToProps = (state) => ({
  coordination: state.coordination,
});

const mapDispatchToProps = {
  createCoordination: coordinationRequest.createCoordination,
  updateCoordination: coordinationRequest.updateCoordination,
  getCoordination: coordinationRequest.getCoordination,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Coordination);
