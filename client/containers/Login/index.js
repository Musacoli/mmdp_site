import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoginView from '../../components/LoginView';
import { loginLoading } from '../../store/actions/auth/login';
import MarkdownEditor from '../../components/common/MarkdownEditor';
import './index.scss';

export class Login extends Component {

  state = {
    editorValue: 'initial editor text',
  }

  componentDidMount() {
    const { loginLoadingAction } = this.props;
    loginLoadingAction();
  }

  handleEditorChange = (value) => {
    this.setState({ editorValue: value });
  }

  render() {
    const { loading } = this.props;
    const { editorValue } = this.state;
    return (
      <React.Fragment>
        <LoginView loading={loading} />
        <div className="markdown__area">
          <h4>{editorValue}</h4>
          <MarkdownEditor 
            value={editorValue} 
            handleEditorChange={this.handleEditorChange}
          />
        </div>
      </React.Fragment>
    );
  }
}

Login.propTypes = {
  loading: PropTypes.bool.isRequired,
  loginLoadingAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  loading: state.login.loading,
});

const mapDispatchToProps = {
  loginLoadingAction: loginLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
