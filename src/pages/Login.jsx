import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';
import './Login.css';

class Login extends Component {
  state = {
    loginName: '',
    isLoginButtonDisabled: true,
    isLoading: false,
    logged: false,
  };

  enableLoginButton = () => {
    const { loginName } = this.state;
    const maxLength = 3;
    const loginNameInvalide = loginName.length < maxLength;

    if (loginNameInvalide) {
      this.setState({ isLoginButtonDisabled: true });
    } else {
      this.setState({ isLoginButtonDisabled: false });
    }
  };

  onInputChange = ({ name, value }) => {
    this.setState({ [name]: value }, () => {
      this.enableLoginButton();
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { loginName } = this.state;
    this.setState(
      { isLoading: true },
      async () => {
        await createUser({ name: loginName });
        this.setState({
          isLoading: false,
          logged: true,
        });
      },
    );
  };

  render() {
    const {
      loginName,
      isLoginButtonDisabled,
      isLoading,
      logged,
    } = this.state;

    return (
      <div data-testid="page-login">
        {isLoading
          ? <Loading />
          : (
            <div className="login-container">
              <form className="login-card" onSubmit={ this.handleSubmit }>
                <input
                  className="login-name-input"
                  data-testid="login-name-input"
                  type="text"
                  name="loginName"
                  value={ loginName }
                  onChange={ ({ target }) => this.onInputChange(target) }
                  placeholder="qual é o seu nome?"
                />
                <button
                  className="login-submit-button"
                  data-testid="login-submit-button"
                  type="submit"
                  disabled={ isLoginButtonDisabled }
                >
                  ENTRAR
                </button>
              </form>
            </div>
          )}
        { logged && <Redirect to="/search" /> }
      </div>
    );
  }
}

export default Login;
