import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import SplashCSS from './splash.css';
import Protest from '../../images/protest.png'

class Splash extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: false
    }
  }


  demo() {
    this.props.login({email: 'Demo@demo.com', password: 'demodemo'})
  }

  render() {

    return (
      <div className="splash-container">

        <div className="splash-main">

          <h1 className="power">Fight The Power</h1>
          <img src={Protest} alt='protest' className="protest" />
          <h2>Organize your DUDES</h2>

          <div className="splash-btns">
            <Link to="/login">
              <button className="login-button">Login</button>
            </Link>
            <div className="btn-divider"></div>
            <Link to="/signup">
              <button className="signup-button">Signup</button>
            </Link>
          </div>

        </div>

        

        <footer>
          FTP is a lightweight CRM tool for protest organizers to communicate with fellow activists through SMS messages.
        </footer>

      </div>
    )
  }
} 





export default withRouter(Splash);
