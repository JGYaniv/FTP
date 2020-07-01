import React from 'react';
import NavbarCSS from './navbar.css';
import { withRouter } from 'react-router-dom';
import flag from '../../images/flag.png';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.logoutUser = this.logoutUser.bind(this);
        this.getLinks = this.getLinks.bind(this);
    }

    logoutUser(e) {
        e.preventDefault();
        this.props.logout();
        this.props.history.push('/');
    }

    getLinks() {
        if (this.props.loggedIn) {
            return (
                <nav className="splash-nav">
                    <div><img src={flag} alt='flag' className="flag" /></div>
                    <ul>
                        {/* <li>
                            <a href="https://www.linkedin.com/in/williamjsuh/"><i className="fab fa-linkedin"></i></a>
                        </li> */}

                        <li>
                            <a href="https://github.com/JGYaniv/FTP"><i className="fab fa-github"></i></a>
                        </li>

                        <li>
                            <button className="logout-btn" onClick={this.logoutUser}>Logout</button>
                        </li>
                    </ul>
                </nav>
            );
        } else {
            return (
                <nav className="splash-nav">
                    <a href="/"><img src={flag} alt='flag' className="flag" /></a>
                    <ul>
                        {/* <li>
                            <a href="https://www.linkedin.com/in/williamjsuh/"><i className="fab fa-linkedin"></i></a>
                        </li> */}

                        <li>
                            <a href="https://github.com/JGYaniv/FTP"><i className="fab fa-github"></i></a>
                        </li>
                    </ul>
                </nav>
            );
        }
    }

    render() {
        return (
            <div>
                {this.getLinks()}
            </div>
        );
    }
}

export default withRouter(NavBar);