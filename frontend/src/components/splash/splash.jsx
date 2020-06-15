import React from 'react';
import { Link } from 'react-router-dom';
import SplashCSS from './splash.css';
import Protest from '../../images/protest.png'

class Splash extends React.Component {
  constructor(props) {
    super(props);

  }

  demo() {
    this.props.login({email: 'Demo@demo.com', password: 'demodemo'})
  }

  render() {
    return (
      <div className="splash-container">
          <nav className="splash-nav">
            <ul>
              <li>
                navbar stuff
              </li>
              <li>
                <a href="https://www.linkedin.com/in/williamjsuh/">linkedin</a>
              </li>
              
              <li>
              <a href="https://github.com/oreodub">github</a>
              </li>
            </ul>
          </nav>


        <div className="splash-main">
          <h1>FTP</h1>
        <img  src={Protest} alt='protest' className="protest" />
          <h2>Organize your DUDES</h2>

          <div className="splash-btns">
            <Link to="/login">
              <button className="login-button">Login</button>
            </Link>

            <Link to="/signup">
              <button className="signup-button">Signup</button>
            </Link>
          </div>

        </div>

        

        <footer>
          footer stuff
        </footer>

      </div>
    )
  }
} 





export default Splash;
