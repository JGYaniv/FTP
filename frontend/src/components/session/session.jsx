import React from 'react';
import SessionCSS from './session.css';

class Session extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.props.session;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
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
    // return (
    //   <p>{this.props.errors}</p>
    // )
    return (
      <ul>
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>
            {this.state.errors[error]}
          </li>
        ))}
      </ul>
    );
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

    return (
      <div className="login-container">
      
          <div className="login-form-container">
            
            <h1><a href="/">FTP</a></h1>
            <h2>{this.props.formType}</h2>
            
            <form onSubmit={this.handleSubmit} className="login-form">

              <div className="session-form">
                  <input type="email"
                    value={this.state.email}
                    onChange={this.update('email')}
                    className="session-input"
                    placeholder="alexlee@alexlee.com"
                  />

                  <input type="password"
                    value={this.state.password}
                    onChange={this.update('password')}
                    className="session-input"
                    placeholder="password"
                  /> 

                  {passwordConfirm}

                  <input className="session-submit" type="submit" value={this.props.formType}/>
                  {this.renderErrors()}
              </div>

            </form>
         
            {this.props.navLink}
          </div>
      </div>
    );
  }
}

export default Session;
