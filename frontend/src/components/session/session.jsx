import React from 'react';
import SessionCSS from './session.css';
import {withRouter} from 'react-router-dom';

class Session extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.props.session;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
    this.demoLogin = this.demoLogin.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser === true) {
      this.props.history.push('/home');
    }
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.action(this.state);
    
  }

  
  renderErrors() {
    return this.props.errors.map(error => {
      return (
        <p className="error">{error}</p>
      )
    })
  }

  demoLogin(e) {
    e.preventDefault();
    const demoUser = { email: "demo@demo.com", password: "password" };

    this.props.action(demoUser);
  }


  render() {
    let passwordConfirm = null;
    
    if (this.props.formType === 'Signup') {
      passwordConfirm = (
        <input
          type="password"
          value={this.state.passwordConfirm}
          onChange={this.update('passwordConfirm')}
          className="session-input"
          placeholder="confirm password"
        />
      )
    }

    let demoLoginBtn;
    if (this.props.formType === 'Login') {
      demoLoginBtn = (
        <button className="session-submit" onClick={this.demoLogin}>
          Demo Login
        </button>
      );
    }

    return (
      <div className="login-container">
    
      
          <div className="login-form-container">
            
            <h1>Fight The Power</h1>
            <h2>{this.props.formType}</h2>
            
            <form onSubmit={this.handleSubmit} className="login-form">

              <div className="session-form">
                  <input type="email"
                    value={this.state.email}
                    onChange={this.update('email')}
                    className="session-input"
                    placeholder="Email"
                  />

                  <input type="password"
                    value={this.state.password}
                    onChange={this.update('password')}
                    className="session-input"
                    placeholder="Password"
                  /> 

                  {passwordConfirm}
                  {this.renderErrors()}
                  <input className="session-submit" type="submit" value={this.props.formType}/>
                  {demoLoginBtn}
              </div>

            </form>
         
            {this.props.navLink}
          </div>
      </div>
    );
  }
}

export default withRouter(Session);
